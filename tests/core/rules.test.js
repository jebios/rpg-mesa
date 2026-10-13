import { describe, it, expect } from 'vitest';
import { buildCharacter, levelPatch, conHpAdjust, slotsFor, parseWeight, coinsToGP, derive, addClass, removeClass, setClassLevel, maxHpMulti, multiclassSlots, spellCaps, bonusSpellsFor, weaponAttacks, armorClass } from '../../src/core/rules.js';

const comp = {
  classes: [
    { id: 'guerreiro', dadoVida: 10, salvaguardas: ['for', 'con'], armas: 'Simples e Marciais', armaduras: 'Todas', subclasses: [] },
    { id: 'mago', dadoVida: 6, salvaguardas: ['int', 'sab'], armas: 'Simples', armaduras: '', subclasses: [] },
    { id: 'clerigo', dadoVida: 8, salvaguardas: ['sab', 'car'], armas: 'Simples', armaduras: 'Leves e Médias, Escudos', subclasses: [] },
  ],
  species: [{ id: 'anao', pvPorNivel: 1 }], backgrounds: [{ id: 'soldado', pericias: ['atletismo'], talentoId: 'atacante', ferramenta: 'Kit de Jogos' }],
  weapons: [
    { id: 'espada-longa', nome: 'Espada Longa', tipo: 'arma', categoria: 'Armas Marciais Corpo a Corpo', dano: '1d8 Cortante', propriedades: 'Versátil (1d10)', maestria: 'Lentidão' },
    { id: 'adaga', nome: 'Adaga', tipo: 'arma', categoria: 'Armas Simples Corpo a Corpo', dano: '1d4 Perfurante', propriedades: 'Acuidade, Leve', maestria: 'Ágil' },
    { id: 'arco-curto', nome: 'Arco Curto', tipo: 'arma', categoria: 'Armas Simples à Distância', dano: '1d6 Perfurante', propriedades: 'Munição, Duas Mãos', maestria: 'Ferroada' },
  ],
};
const ab = { for: 16, des: 12, con: 14, int: 10, sab: 10, car: 8 };

describe('ficha', () => {
  it('antecedente dá perícia, talento e ferramenta', () => {
    const ch = buildCharacter({ name: 'A', ownerUid: 'u', speciesId: 'anao', classId: 'guerreiro', level: 1, abilities: ab, backgroundId: 'soldado', skillProfs: ['percepcao'] }, comp);
    expect(ch.build.skillProfs).toEqual(['percepcao', 'atletismo']);
    expect(ch.build.feats[0].id).toBe('atacante');
    expect(ch.build.training.ferramentas).toContain('Kit de Jogos');
    expect(ch.state.hp.max).toBe(10 + 2 + 1); // anão +1
  });
  it('subir de nível mantém o dano sofrido', () => {
    const ch = buildCharacter({ name: 'A', ownerUid: 'u', speciesId: 'anao', classId: 'guerreiro', level: 1, abilities: ab }, comp);
    ch.state.hp.current = 5; // 8 de dano
    const p = levelPatch(ch, comp, 2);
    expect(p['state.hp'].max).toBe(13 + 6 + 2 + 1);
    expect(p['state.hp'].current).toBe(p['state.hp'].max - 8);
    expect(p['state.hitDice'].max).toBe(2);
  });
  it('PV máximo editado manualmente (dado rolado na mesa) é preservado ao subir de nível', () => {
    const ch = buildCharacter({ name: 'A', ownerUid: 'u', speciesId: 'anao', classId: 'guerreiro', level: 1, abilities: ab }, comp);
    // grupo rolou o dado e ajustou o PV máximo à mão em vez da média da regra (13)
    ch.state.hp.max = 16; ch.state.hp.current = 16;
    const p = levelPatch(ch, comp, 2);
    // nível 2 soma só o ganho médio (22 - 13 = 9) ao valor editado (16), não recalcula do zero
    expect(p['state.hp'].max).toBe(16 + 9);
  });
  it('conHpAdjust soma só a diferença ao mudar CON, preservando PV manual', () => {
    const ch = buildCharacter({ name: 'A', ownerUid: 'u', speciesId: 'anao', classId: 'guerreiro', level: 1, abilities: ab }, comp);
    ch.state.hp.max = 16; ch.state.hp.current = 16; // ajustado à mão
    const patch = conHpAdjust(ch, comp, 16); // CON 14 -> 16 (mod +2 -> +3, ganha +1)
    expect(patch.max).toBe(17);
    expect(patch.current).toBe(17);
  });
  it('addClass adiciona multiclasse no nível 1 sem mexer na classe principal', () => {
    // espécie sem bônus de PV por nível, pra simplificar a conta
    let ch = buildCharacter({ name: 'A', ownerUid: 'u', speciesId: 'humano', classId: 'guerreiro', level: 5, abilities: ab }, comp);
    const patch = addClass(ch, comp, 'mago');
    expect(patch['build.classes']).toEqual([{ classId: 'guerreiro', level: 5, subclassId: null }, { classId: 'mago', level: 1, subclassId: null }]);
    // Guerreiro 5 sozinho: 10+2 + 4*(5+1+2) = 44. Multiclasse soma só o novo nível (mago d6): + (3+1+2) = 6 -> 50
    expect(patch['state.hp'].max).toBe(44 + 6);
    expect(patch['state.hitDice'].byClass).toEqual([{ classId: 'guerreiro', die: 10, max: 5, used: 0 }, { classId: 'mago', die: 6, max: 1, used: 0 }]);
  });
  it('addClass não deixa adicionar a mesma classe duas vezes', () => {
    const ch = buildCharacter({ name: 'A', ownerUid: 'u', speciesId: 'anao', classId: 'guerreiro', level: 1, abilities: ab }, comp);
    expect(addClass(ch, comp, 'guerreiro')).toBeNull();
  });
  it('removeClass tira a multiclasse e não deixa remover a classe inicial', () => {
    let ch = buildCharacter({ name: 'A', ownerUid: 'u', speciesId: 'anao', classId: 'guerreiro', level: 3, abilities: ab }, comp);
    ch = { ...ch, build: { ...ch.build, classes: [...ch.build.classes] } };
    const added = addClass(ch, comp, 'mago');
    ch.build.classes = added['build.classes']; ch.state.hp = added['state.hp'];
    expect(removeClass(ch, comp, 'guerreiro')).toBeNull(); // não pode remover a inicial
    const patch = removeClass(ch, comp, 'mago');
    expect(patch['build.classes']).toEqual([{ classId: 'guerreiro', level: 3, subclassId: null }]);
  });
  it('espaços de magia de multiclasse combinam pela tabela (guerreiro não conta, só a metade/inteiro dos conjuradores)', () => {
    const classes = [{ classId: 'guerreiro', level: 6, subclassId: null }, { classId: 'mago', level: 4, subclassId: null }];
    // nível de conjurador combinado = 0 (guerreiro) + 4 (mago, conjurador completo) = 4
    expect(multiclassSlots(classes)).toEqual(slotsFor('mago', null, 4));
  });
  it('maxHpMulti: só o 1º nível do personagem usa o dado cheio, o resto usa a média de cada classe', () => {
    // guerreiro 1 (d10) + mago 1 (d6), CON 14 (+2): 10+2 (nível1 guerreiro) + (3+1+2) (nível1 mago, é o 2º nível do personagem, média)
    const total = maxHpMulti([{ die: 10, level: 1 }, { die: 6, level: 1 }], 14);
    expect(total).toBe(12 + 6);
  });
  it('Cavaleiro Místico ganha espaços no nível 3', () => {
    expect(slotsFor('guerreiro', null, 3)).toEqual({});
    expect(slotsFor('guerreiro', 'cavaleiro-mistico', 3)).toEqual({ 1: 2 });
    expect(slotsFor('guerreiro', 'cavaleiro-mistico', 7)).toEqual({ 1: 4, 2: 2 });
  });
  it('peso, carga e moedas', () => {
    expect(parseWeight('1,5 kg')).toBe(1.5);
    expect(parseWeight('150 g')).toBeCloseTo(0.15);
    expect(coinsToGP({ pl: 1, po: 2, pp: 5, pc: 10 })).toBeCloseTo(12.6);
    const ch = buildCharacter({ name: 'A', ownerUid: 'u', speciesId: 'anao', classId: 'guerreiro', level: 1, abilities: ab }, comp);
    ch.inventory = [{ peso: '3 kg', qtd: 2 }];
    const d = derive(ch, comp);
    expect(d.weight).toBe(6); expect(d.carry).toBe(16 * 7);
  });

  it('spellCaps: bruxo nível 5 limita truques/magias conhecidas e invocações (tabela 2024)', () => {
    const caps = spellCaps({ classes: [{ classId: 'bruxo', level: 5 }] });
    expect(caps).toEqual({ cantrips: 3, known: 6, prepared: null, invocacoes: 5 });
  });
  it('spellCaps: mago (classe "prepared") não limita a lista conhecida, só as preparadas', () => {
    const caps = spellCaps({ classes: [{ classId: 'mago', level: 5 }] });
    expect(caps).toEqual({ cantrips: 4, known: null, prepared: 9, invocacoes: null });
  });
  it('spellCaps: exceção manual soma ao limite oficial', () => {
    const caps = spellCaps({ classes: [{ classId: 'bruxo', level: 5 }], extraCantrips: 1, extraSpells: 2, extraInvocations: 1 });
    expect(caps).toEqual({ cantrips: 4, known: 8, prepared: null, invocacoes: 6 });
  });
  it('spellCaps: multiclasse soma o limite de cada classe no seu próprio nível', () => {
    const caps = spellCaps({ classes: [{ classId: 'bardo', level: 3 }, { classId: 'clerigo', level: 2 }] });
    // bardo nv3: truques 2, conhecidas 6 | clérigo nv2: truques 3, preparadas 5
    expect(caps).toEqual({ cantrips: 5, known: 6, prepared: 5, invocacoes: null });
  });
  it('spellCaps: classe não conjuradora (guerreiro) não impõe nenhum limite', () => {
    const caps = spellCaps({ classes: [{ classId: 'guerreiro', level: 5 }] });
    expect(caps).toEqual({ cantrips: null, known: null, prepared: null, invocacoes: null });
  });

  it('bonusSpellsFor: dá as magias de domínio/juramento/pacto acumuladas até o nível atual', () => {
    const compBonus = {
      classes: [
        { id: 'clerigo', subclasses: [{ id: 'dominio-da-vida', magiasBonus: [
          { nivel: 3, spellIds: ['auxilio', 'bencao'] }, { nivel: 5, spellIds: ['revivificar'] },
        ] }] },
      ],
    };
    expect(bonusSpellsFor({ classes: [{ classId: 'clerigo', level: 3, subclassId: 'dominio-da-vida' }] }, compBonus))
      .toEqual(['auxilio', 'bencao']);
    expect(bonusSpellsFor({ classes: [{ classId: 'clerigo', level: 5, subclassId: 'dominio-da-vida' }] }, compBonus))
      .toEqual(['auxilio', 'bencao', 'revivificar']);
  });
  it('bonusSpellsFor: sem subclasse escolhida ou subclasse sem magiasBonus não dá nada', () => {
    const compBonus = { classes: [{ id: 'clerigo', subclasses: [{ id: 'dominio-da-vida', magiasBonus: [{ nivel: 3, spellIds: ['auxilio'] }] }] }] };
    expect(bonusSpellsFor({ classes: [{ classId: 'clerigo', level: 5, subclassId: null }] }, compBonus)).toEqual([]);
    expect(bonusSpellsFor({ classes: [{ classId: 'clerigo', level: 2, subclassId: 'dominio-da-vida' }] }, compBonus)).toEqual([]);
  });

  it('weaponAttacks: arma corpo a corpo comum usa Força; à distância usa Destreza; Acuidade usa o maior', () => {
    const ch = buildCharacter({ name: 'A', ownerUid: 'u', speciesId: 'anao', classId: 'guerreiro', level: 1, abilities: ab }, comp);
    ch.inventory = [
      { uid: '1', itemId: 'espada-longa', nome: 'Espada Longa', equipado: true },
      { uid: '2', itemId: 'adaga', nome: 'Adaga', equipado: true },
      { uid: '3', itemId: 'arco-curto', nome: 'Arco Curto', equipado: true },
      { uid: '4', itemId: 'adaga', nome: 'Adaga na mochila', equipado: false }, // não equipada: fora da lista
    ];
    const d = derive(ch, comp);
    const atks = weaponAttacks(ch, comp, d);
    expect(atks.map((a) => a.nome)).toEqual(['Espada Longa', 'Adaga', 'Arco Curto']);
    // for 16 -> mod +3, des 12 -> mod +1, pb nível 1 = +2
    expect(atks[0]).toMatchObject({ ability: 'for', atk: 5, dice: '1d8', dmgType: 'Cortante', dmgBonus: 3 });
    expect(atks[1]).toMatchObject({ ability: 'for', atk: 5, dice: '1d4', dmgType: 'Perfurante', dmgBonus: 3 }); // Acuidade: For(3) > Des(1)
    expect(atks[2]).toMatchObject({ ability: 'des', atk: 3, dice: '1d6', dmgType: 'Perfurante', dmgBonus: 1 });
  });
  it('weaponAttacks: sem nenhuma arma equipada, devolve lista vazia', () => {
    const ch = buildCharacter({ name: 'A', ownerUid: 'u', speciesId: 'anao', classId: 'guerreiro', level: 1, abilities: ab }, comp);
    const d = derive(ch, comp);
    expect(weaponAttacks(ch, comp, d)).toEqual([]);
  });
  it('weaponAttacks: arma personalizada (v0.24) com Dano preenchido entra no cálculo', () => {
    const ch = buildCharacter({ name: 'A', ownerUid: 'u', speciesId: 'anao', classId: 'guerreiro', level: 1, abilities: ab }, comp);
    ch.inventory = [
      { uid: '1', itemId: null, nome: 'Lança Rústica', categoria: 'arma', dano: '1d6 Perfurante', equipado: true },
      { uid: '2', itemId: null, nome: 'Adaga Improvisada', categoria: 'arma', dano: '1d4 Perfurante', finesse: true, equipado: true },
      { uid: '3', itemId: null, nome: 'Funda', categoria: 'arma', dano: '1d4 Contundente', ranged: true, equipado: true },
      { uid: '4', itemId: null, nome: 'Sem dano preenchido', categoria: 'arma', equipado: true }, // sem `dano`: fora da lista calculada
    ];
    const d = derive(ch, comp);
    const atks = weaponAttacks(ch, comp, d);
    expect(atks.map((a) => a.nome)).toEqual(['Lança Rústica', 'Adaga Improvisada', 'Funda']);
    expect(atks[0]).toMatchObject({ ability: 'for', atk: 5, dice: '1d6', dmgType: 'Perfurante', dmgBonus: 3 });
    expect(atks[1]).toMatchObject({ ability: 'for', atk: 5, dice: '1d4', dmgType: 'Perfurante', dmgBonus: 3 }); // Acuidade: For > Des
    expect(atks[2]).toMatchObject({ ability: 'des', atk: 3, dice: '1d4', dmgType: 'Contundente', dmgBonus: 1 });
  });
  it('armorClass (v0.26): armadura do compêndio, escudo, limite de Des e Defesa sem Armadura', () => {
    const comp2 = { ...comp, classes: [...comp.classes, { id: 'barbaro', dadoVida: 12, salvaguardas: ['for', 'con'], subclasses: [] }], armor: [
      { id: 'couro', nome: 'Couro', categoria: 'Armadura Leve (1 Minuto)', ca: '11 + modificador de Des' },
      { id: 'escamas', nome: 'Loriga de Escamas', categoria: 'Armadura Média (5 Minutos)', ca: '14 + Modificador de Des (máx. 2)' },
      { id: 'malha', nome: 'Cota de Malha', categoria: 'Armadura Pesada (10 Minutos)', ca: '16' },
      { id: 'escudo', nome: 'Escudo', categoria: 'Escudo (Ação Usar Objeto)', ca: '2' },
    ] };
    const mk = (cls, inv) => { const c = buildCharacter({ name: 'A', ownerUid: 'u', speciesId: 'anao', classId: cls, level: 1, abilities: { for: 10, des: 16, con: 14, int: 10, sab: 12, car: 10 } }, comp2); c.inventory = inv; return c; };
    const ac = (c) => armorClass(c, comp2, derive(c, comp2));
    expect(ac(mk('guerreiro', []))).toBeNull();
    expect(ac(mk('guerreiro', [{ itemId: 'couro', equipado: true }])).ac).toBe(14);
    expect(ac(mk('guerreiro', [{ itemId: 'escamas', equipado: true }])).ac).toBe(16);
    expect(ac(mk('guerreiro', [{ itemId: 'malha', equipado: true }, { itemId: 'escudo', equipado: true }])).ac).toBe(18);
    expect(ac(mk('guerreiro', [{ itemId: 'malha', equipado: false }, { itemId: 'escudo', equipado: true }])).ac).toBe(15);
    expect(ac(mk('barbaro', [{ itemId: 'escudo', equipado: true }])).ac).toBe(10 + 3 + 2 + 2);
    const c = mk('guerreiro', [{ itemId: 'malha', equipado: true }]); c.build.acBonus = 1;
    expect(ac(c).ac).toBe(17);
  });
  it('armorClass: armadura personalizada (base + Des com limite) e escudo fixo', () => {
    const ch = buildCharacter({ name: 'A', ownerUid: 'u', speciesId: 'anao', classId: 'guerreiro', level: 1, abilities: { for: 10, des: 16, con: 10, int: 10, sab: 10, car: 10 } }, comp);
    ch.inventory = [
      { uid: '1', itemId: null, nome: 'Peitoral', categoria: 'armadura', ca: 11, caDex: true, caDexMax: 2, equipado: true },
      { uid: '2', itemId: null, nome: 'Broquel', categoria: 'armadura', ca: 2, equipado: true },
    ];
    expect(armorClass(ch, comp, derive(ch, comp)).ac).toBe(11 + 2 + 2);
  });
});

describe('efeitos ativos (v0.27)', () => {
  const ab = { for: 16, des: 14, con: 14, int: 10, sab: 10, car: 10 };
  const compFx = { ...comp, classes: [...comp.classes, { id: 'barbaro', dadoVida: 12, salvaguardas: ['for', 'con'], subclasses: [] }, { id: 'monge', dadoVida: 8, salvaguardas: ['for', 'des'], subclasses: [] }],
    armor: [{ id: 'malha', nome: 'Cota de Malha', categoria: 'Armadura Pesada', ca: '16' }, { id: 'escudo', nome: 'Escudo', categoria: 'Escudo', ca: '2' }] };
  const mk = (cls, lvl, extra = {}) => { const c = buildCharacter({ name: 'A', ownerUid: 'u', speciesId: 'anao', classId: cls, level: lvl, abilities: ab }, compFx); Object.assign(c, extra); return c; };
  it('Fúria: resistências + dano de Força (+2 no nível 1) e expira no contador', () => {
    const ch = mk('barbaro', 1, { inventory: [{ uid: '1', itemId: 'espada-longa', equipado: true }] });
    ch.state.effects = [{ uid: 'f', id: 'furia', nome: 'Fúria', rounds: 3 }];
    const d = derive(ch, compFx);
    expect(d.resist).toEqual(['Contundente', 'Cortante', 'Perfurante']);
    expect(weaponAttacks(ch, compFx, d)[0].dmgBonus).toBe(3 + 2);
  });
  it('Escudo Arcano +5 CA, Pele-Casca CA mín. 17 e Armadura Arcana 13+Des', () => {
    const ch = mk('mago', 1);
    expect(derive(ch, compFx).ac).toBe(12);
    ch.state.effects = [{ uid: 'a', id: 'escudo-arcano', rounds: 1 }];
    expect(derive(ch, compFx).ac).toBe(17);
    ch.state.effects = [{ uid: 'p', id: 'pele-casca', rounds: null }];
    expect(derive(ch, compFx).ac).toBe(17);
    ch.state.effects = [{ uid: 'r', id: 'armadura-arcana', rounds: null }];
    expect(derive(ch, compFx).ac).toBe(15);
  });
  it('deslocamento: Passos Largos, Velocista, Movimento Rápido (sem armadura pesada) e Movimento sem Armadura', () => {
    const ch = mk('guerreiro', 1);
    expect(derive(ch, compFx).speed).toBe('9 metros');
    ch.state.effects = [{ uid: 'l', id: 'passos-largos', rounds: null }];
    ch.build.feats.push({ id: 'velocista' });
    expect(derive(ch, compFx).speed).toBe('15 metros');
    const b = mk('barbaro', 5);
    expect(derive(b, compFx).speed).toBe('12 metros');
    b.inventory = [{ itemId: 'malha', equipado: true }];
    expect(derive(b, compFx).speed).toBe('9 metros');
    const m = mk('monge', 6);
    expect(derive(m, compFx).speed).toBe('13,5 metros');
    m.inventory = [{ itemId: 'escudo', equipado: true }];
    expect(derive(m, compFx).speed).toBe('9 metros');
  });
  it('efeito personalizado soma CA e deslocamento', () => {
    const ch = mk('guerreiro', 1);
    ch.state.effects = [{ uid: 'c', id: 'custom', nome: 'Bênção', rounds: 5, ac: 1, speed: 1.5 }];
    const d = derive(ch, compFx);
    expect(d.ac).toBe(ch.build.ac + 1);
    expect(d.speed).toBe('10,5 metros');
  });
});

describe('inventoryOf (v0.28)', () => {
  it('garante uid em itens legados com id', async () => {
    const { inventoryOf } = await import('../../src/core/rules.js');
    const r = inventoryOf({ inventory: [{ id: 'mestre-x', nome: 'A' }, { uid: 'u1', nome: 'B' }] });
    expect(r[0].uid).toBe('mestre-x');
    expect(r[1].uid).toBe('u1');
  });
});
