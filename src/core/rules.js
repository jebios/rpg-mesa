// Cálculos derivados da ficha (D&D 2024).
import { effectMods, parseMeters, fmtMeters } from './effects.js';

export const ABILITIES = [
  ['for', 'Força'], ['des', 'Destreza'], ['con', 'Constituição'],
  ['int', 'Inteligência'], ['sab', 'Sabedoria'], ['car', 'Carisma'],
];

export const SKILLS = [
  ['acrobacia', 'Acrobacia', 'des'], ['arcanismo', 'Arcanismo', 'int'],
  ['atletismo', 'Atletismo', 'for'], ['atuacao', 'Atuação', 'car'],
  ['enganacao', 'Enganação', 'car'], ['furtividade', 'Furtividade', 'des'],
  ['historia', 'História', 'int'], ['intimidacao', 'Intimidação', 'car'],
  ['intuicao', 'Intuição', 'sab'], ['investigacao', 'Investigação', 'int'],
  ['lidar-animais', 'Lidar com Animais', 'sab'], ['medicina', 'Medicina', 'sab'],
  ['natureza', 'Natureza', 'int'], ['percepcao', 'Percepção', 'sab'],
  ['persuasao', 'Persuasão', 'car'], ['prestidigitacao', 'Prestidigitação', 'des'],
  ['religiao', 'Religião', 'int'], ['sobrevivencia', 'Sobrevivência', 'sab'],
];

export const mod = (score) => Math.floor((Number(score) - 10) / 2);
export const fmt = (n) => (n >= 0 ? `+${n}` : `${n}`);
export const profBonus = (level) => 2 + Math.floor((Math.max(1, level) - 1) / 4);

// Tabela de espaços de magia do conjurador completo (níveis de personagem 1–20).
const FULL = [
  [2], [3], [4, 2], [4, 3], [4, 3, 2], [4, 3, 3], [4, 3, 3, 1], [4, 3, 3, 2],
  [4, 3, 3, 3, 1], [4, 3, 3, 3, 2], [4, 3, 3, 3, 2, 1], [4, 3, 3, 3, 2, 1],
  [4, 3, 3, 3, 2, 1, 1], [4, 3, 3, 3, 2, 1, 1], [4, 3, 3, 3, 2, 1, 1, 1],
  [4, 3, 3, 3, 2, 1, 1, 1], [4, 3, 3, 3, 2, 1, 1, 1, 1], [4, 3, 3, 3, 3, 1, 1, 1, 1],
  [4, 3, 3, 3, 3, 2, 1, 1, 1], [4, 3, 3, 3, 3, 2, 2, 1, 1],
];

/** Espaços de magia { "1": max, ... } por tipo de conjurador. */
export function spellSlotsFor(casterType, level) {
  const L = Math.min(20, Math.max(1, level));
  let row = [];
  if (casterType === 'full') row = FULL[L - 1];
  else if (casterType === 'half') row = FULL[Math.ceil(L / 2) - 1]; // regra 2024: metade arredondada p/ cima
  else if (casterType === 'pact') {
    const count = L === 1 ? 1 : L <= 10 ? 2 : L <= 16 ? 3 : 4;
    const slotLevel = Math.min(5, Math.ceil(L / 2));
    return { [slotLevel]: count };
  }
  return Object.fromEntries(row.map((n, i) => [String(i + 1), n]));
}

/** PV máximo: nível 1 = dado cheio + CON; depois média fixa (dado/2 + 1) + CON por nível. */
export function maxHp(hitDie, level, conScore, bonusPerLevel = 0) {
  const c = mod(conScore);
  const first = hitDie + c;
  const rest = (level - 1) * (hitDie / 2 + 1 + c);
  return Math.max(level, first + rest + bonusPerLevel * level);
}

// Metadados de conjuração que não vêm do texto do livro.
export const CLASS_META = {
  barbaro: { conjurador: 'none' }, bardo: { conjurador: 'full', atributoConjuracao: 'car' },
  bruxo: { conjurador: 'pact', atributoConjuracao: 'car' }, clerigo: { conjurador: 'full', atributoConjuracao: 'sab' },
  druida: { conjurador: 'full', atributoConjuracao: 'sab' }, feiticeiro: { conjurador: 'full', atributoConjuracao: 'car' },
  guardiao: { conjurador: 'half', atributoConjuracao: 'sab' }, guerreiro: { conjurador: 'none' },
  ladino: { conjurador: 'none' }, mago: { conjurador: 'full', atributoConjuracao: 'int' },
  monge: { conjurador: 'none' }, paladino: { conjurador: 'half', atributoConjuracao: 'car' },
  // Cozinheiro (classe homebrew): "Iniciado em Magia" concede 3 truques + 1 magia de 1º nível fixa,
  // conjurável 1x/dia sem gastar espaço — não segue a progressão de espaços/preparadas de nenhum
  // tipo oficial, então não impõe limite de truques/magias conhecidas pelo sistema de spellCaps.
  cozinheiro: { conjurador: 'none' },
  // Artífice (UA 2024): meio-conjurador (INT) — a tabela oficial de espaços de magia do Artífice
  // bate exatamente com a fórmula de meio-conjurador já usada por Paladino/Guardião (conferido
  // nível a nível), então não precisou de nenhuma tabela nova.
  artifice: { conjurador: 'half', atributoConjuracao: 'int' },
  // Arquimago (classe de prestígio, só 5 níveis): a tabela oficial mostra o total de espaços de
  // magia ACUMULADOS do personagem (pressupõe que ele já chegou lá por outra classe conjuradora
  // antes de multiclassar) — não é uma progressão isolada por nível de Arquimago, então não se
  // encaixa no cálculo automático de espaços combinados do app. Fica 'none' aqui; os espaços de
  // magia do Arquimago ficam descritos como texto na própria classe (anote manualmente na ficha).
  arquimago: { conjurador: 'none' },
};
// Subclasses que conjuram (1/3): Cavaleiro Místico e Trapaceiro Arcano.
export const THIRD_CASTERS = { 'cavaleiro-mistico': 'int', 'trapaceiro-arcano': 'int' };
const THIRD = [[], [], [2], [3], [3], [3], [4, 2], [4, 2], [4, 2], [4, 3], [4, 3], [4, 3], [4, 3, 2], [4, 3, 2], [4, 3, 2], [4, 3, 3], [4, 3, 3], [4, 3, 3], [4, 3, 3, 1], [4, 3, 3, 1]];
export const SPECIES_META = { anao: { pvPorNivel: 1 } };

export const levelOf = (ch) => ch.build.classes.reduce((a, c) => a + c.level, 0);

// Tabela oficial de truques/magias por nível de CLASSE (D&D 2024 PHB, níveis 1–20).
// cap: 'known' = o limite é sobre a lista de magias conhecidas (Bardo/Feiticeiro/Bruxo — trocam
// 1 magia por vez ao subir de nível). cap: 'prepared' = a classe tem acesso à lista inteira de
// magias (não é limitada) e o limite é só sobre quantas ficam preparadas ao mesmo tempo
// (Clérigo/Druida/Mago/Paladino/Guardião).
export const SPELL_PROGRESSION = {
  bardo: { cap: 'known', cantrips: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], known: [4, 5, 6, 7, 9, 10, 11, 12, 14, 15, 16, 16, 17, 17, 18, 18, 19, 20, 21, 22] },
  feiticeiro: { cap: 'known', cantrips: [4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6], known: [2, 4, 6, 7, 9, 10, 11, 12, 14, 15, 16, 16, 17, 17, 18, 18, 19, 20, 21, 22] },
  bruxo: { cap: 'known', cantrips: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], known: [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15], invocacoes: [1, 3, 3, 3, 5, 5, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9, 10, 10, 10] },
  clerigo: { cap: 'prepared', cantrips: [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], known: [4, 5, 6, 7, 9, 10, 11, 12, 14, 15, 16, 16, 17, 17, 18, 18, 19, 20, 21, 22] },
  druida: { cap: 'prepared', cantrips: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], known: [4, 5, 6, 7, 9, 10, 11, 12, 14, 15, 16, 16, 17, 17, 18, 18, 19, 20, 21, 22] },
  mago: { cap: 'prepared', cantrips: [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], known: [4, 5, 6, 7, 9, 10, 11, 12, 14, 15, 16, 16, 17, 18, 19, 21, 22, 23, 24, 25] },
  paladino: { cap: 'prepared', cantrips: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], known: [2, 3, 4, 5, 6, 6, 7, 7, 9, 9, 10, 10, 11, 11, 12, 12, 14, 14, 15, 15] },
  guardiao: { cap: 'prepared', cantrips: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], known: [2, 3, 4, 5, 6, 6, 7, 7, 9, 9, 10, 10, 11, 11, 12, 12, 14, 14, 15, 15] },
  artifice: { cap: 'prepared', cantrips: [2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4], known: [2, 3, 4, 5, 6, 6, 7, 7, 9, 9, 10, 10, 11, 11, 12, 12, 14, 14, 15, 15] },
};

/** Limites oficiais de truques/magias/invocações conhecidas, somando cada classe (multiclasse) no
 *  seu próprio nível, mais o bônus manual de exceção (ex.: magia extra aprendida de um livro ou
 *  pergaminho — build.extraCantrips/extraSpells/extraInvocations). Cada valor fica `null` quando
 *  nenhuma classe do personagem impõe aquele limite (esconde a restrição na interface). */
export function spellCaps(build) {
  const extraCantrips = Number(build.extraCantrips) || 0;
  const extraSpells = Number(build.extraSpells) || 0;
  const extraInvocacoes = Number(build.extraInvocations) || 0;
  let cantrips = null, known = null, prepared = null, invocacoes = null;
  for (const c of build.classes || []) {
    const prog = SPELL_PROGRESSION[c.classId];
    if (!prog) continue;
    const i = Math.min(20, Math.max(1, c.level)) - 1;
    cantrips = (cantrips || 0) + (prog.cantrips[i] || 0);
    if (prog.cap === 'known') known = (known || 0) + (prog.known[i] || 0);
    else prepared = (prepared || 0) + (prog.known[i] || 0);
    if (prog.invocacoes) invocacoes = (invocacoes || 0) + prog.invocacoes[i];
  }
  return {
    cantrips: cantrips !== null ? cantrips + extraCantrips : null,
    known: known !== null ? known + extraSpells : null,
    prepared: prepared !== null ? prepared + extraSpells : null,
    invocacoes: invocacoes !== null ? invocacoes + extraInvocacoes : null,
  };
}

/** IDs de magia concedidas automaticamente por subclasse (Domínio do Clérigo, Juramento do
 *  Paladino, Pacto do Bruxo — "você sempre tem preparadas", não contam no limite de conhecidas
 *  nem no de preparadas). Soma cumulativa: ao chegar num nível da tabela, ganha as magias daquele
 *  nível E mantém as de níveis anteriores. Cada classe usa seu próprio nível (multiclasse). */
export function bonusSpellsFor(build, comp) {
  const out = new Set();
  for (const c of build.classes || []) {
    const cls = comp.byId ? comp.byId.classes[c.classId] : comp.classes.find((x) => x.id === c.classId);
    const sub = cls?.subclasses?.find((s) => s.id === c.subclassId);
    if (!sub?.magiasBonus) continue;
    for (const tier of sub.magiasBonus) {
      if (c.level >= tier.nivel) tier.spellIds.forEach((id) => out.add(id));
    }
  }
  return [...out];
}

export function casterInfo(classId, subclassId) {
  const meta = CLASS_META[classId] || { conjurador: 'none' };
  if (meta.conjurador === 'none' && THIRD_CASTERS[subclassId]) return { conjurador: 'third', atributoConjuracao: THIRD_CASTERS[subclassId] };
  return meta;
}

export function slotsFor(classId, subclassId, level) {
  const ci = casterInfo(classId, subclassId);
  if (ci.conjurador === 'third') return Object.fromEntries(THIRD[Math.min(20, level) - 1].map((n, i) => [String(i + 1), n]));
  return spellSlotsFor(ci.conjurador, level);
}

// ===================== MULTICLASSE =====================
// PV: só o 1º nível do personagem (sempre da 1ª classe escolhida) usa o dado cheio;
// todos os outros níveis — de qualquer classe — usam a média (dado/2 + 1), cada um com o
// dado da SUA classe. `classesFull` é [{ die, level }, ...] na ordem em que as classes foram
// pegas (índice 0 = classe inicial).
export function maxHpMulti(classesFull, conScore, bonusPerLevel = 0) {
  const c = mod(conScore);
  let total = 0, totalLevel = 0;
  classesFull.forEach((cd, i) => {
    const avg = Math.floor(cd.die / 2) + 1 + c;
    total += i === 0 ? cd.die + c + Math.max(0, cd.level - 1) * avg : cd.level * avg;
    totalLevel += cd.level;
  });
  total += bonusPerLevel * totalLevel;
  return Math.max(totalLevel, total);
}

/** Junta cada entrada de build.classes com o dado de vida da classe (do compêndio). */
export function classesWithDice(classes, comp) {
  return classes.map((c) => ({ classId: c.classId, level: c.level, subclassId: c.subclassId,
    die: comp.classes.find((x) => x.id === c.classId)?.dadoVida || 6 }));
}

/** Nível de conjurador combinado (regra de multiclasse): conjurador completo soma o nível
 *  inteiro, meio-conjurador soma nível/2 (arredondado p/ baixo), 1/3-conjurador (subclasses
 *  tipo Cavaleiro Místico/Trapaceiro Arcano) soma nível/3. Bruxo (Magia de Pacto) fica de fora —
 *  tem um espaço próprio, não entra nessa tabela combinada. */
export function multiclassCasterLevel(classes) {
  let total = 0;
  for (const c of classes) {
    const meta = CLASS_META[c.classId] || { conjurador: 'none' };
    if (meta.conjurador === 'full') total += c.level;
    else if (meta.conjurador === 'half') total += Math.floor(c.level / 2);
    else if (THIRD_CASTERS[c.subclassId]) total += Math.floor(c.level / 3);
  }
  return total;
}
export function multiclassSlots(classes) {
  const lvl = multiclassCasterLevel(classes);
  return lvl > 0 ? spellSlotsFor('full', lvl) : {};
}
/** Espaços de magia "normais": com 1 classe só, usa a tabela daquela classe (preserva a regra
 *  2024 de meio-conjurador começar no nível 1); com 2+ classes, combina pela tabela de multiclasse. */
export function combinedSlots(classes) {
  if (classes.length <= 1) { const c0 = classes[0]; return c0 ? slotsFor(c0.classId, c0.subclassId, c0.level) : {}; }
  return multiclassSlots(classes);
}
/** Magia de Pacto (Bruxo): espaços próprios, separados da tabela combinada. Só existe quando o
 *  personagem é multiclasse — um Bruxo puro já usa combinedSlots() normalmente. */
export function pactSlotsFor(classes) {
  if (classes.length < 2) return null;
  const w = classes.find((c) => (CLASS_META[c.classId] || {}).conjurador === 'pact');
  return w ? spellSlotsFor('pact', w.level) : null;
}
/** CD/ataque de magia de cada classe conjuradora do personagem (cada classe usa seu próprio
 *  atributo de conjuração). */
export function castersInfo(classes, comp, abilities, pb) {
  return classes.map((c) => {
    const ci = casterInfo(c.classId, c.subclassId);
    if (!ci.atributoConjuracao) return null;
    const cls = comp.classes.find((x) => x.id === c.classId);
    return {
      classId: c.classId, nome: cls?.nome || c.classId, atributoConjuracao: ci.atributoConjuracao, conjurador: ci.conjurador,
      dc: 8 + pb + mod(abilities[ci.atributoConjuracao]), atk: pb + mod(abilities[ci.atributoConjuracao]),
    };
  }).filter(Boolean);
}
/** Texto "Guerreiro 5 (Campeão) / Mago 3 (Evocador)" para cabeçalhos e listas. */
export function classesLabel(build, comp) {
  return build.classes.map((c) => {
    const cls = comp.byId ? comp.byId.classes[c.classId] : comp.classes.find((x) => x.id === c.classId);
    const sub = cls?.subclasses?.find((s) => s.id === c.subclassId);
    return `${cls?.nome || c.classId} ${c.level}${sub ? ' (' + sub.nome + ')' : ''}`;
  }).join(' / ');
}
/** Nome de exibição da espécie (do compêndio). */
export function speciesLabel(build, comp) {
  const sp = comp.byId ? comp.byId.species[build.speciesId] : comp.species.find((s) => s.id === build.speciesId);
  return sp?.nome || build.speciesId || '';
}
/** Recalcula PV, Dados de Vida e espaços de magia depois de qualquer mudança nas classes
 *  (subir/descer nível, trocar subclasse, adicionar/remover multiclasse). O PV soma só a
 *  diferença da média da regra ao valor atual (preserva PV ajustado à mão). */
export function classesPatch(ch, comp, newClasses) {
  const conScore = ch.build.abilities.con;
  const oldWithDice = classesWithDice(ch.build.classes, comp);
  const newWithDice = classesWithDice(newClasses, comp);
  const newBuildTmp = { ...ch.build, classes: newClasses };
  const prevSuggested = maxHpMulti(oldWithDice, conScore, hpBonusPerLevel(ch.build));
  const newSuggested = maxHpMulti(newWithDice, conScore, hpBonusPerLevel(newBuildTmp));
  const totalLevel = newClasses.reduce((a, c) => a + c.level, 0);
  const newMax = Math.max(totalLevel, ch.state.hp.max + (newSuggested - prevSuggested));
  const lost = ch.state.hp.max - ch.state.hp.current;

  const oldByClass = ch.state.hitDice?.byClass || (ch.state.hitDice ? [{ classId: ch.build.classes[0]?.classId, die: ch.state.hitDice.die, used: ch.state.hitDice.used }] : []);
  const byClass = newWithDice.map((cd) => {
    const prev = oldByClass.find((h) => h.classId === cd.classId);
    return { classId: cd.classId, die: cd.die, max: cd.level, used: Math.min(prev?.used || 0, cd.level) };
  });

  const slots = combinedSlots(newClasses);
  const oldSlots = ch.state.spellSlots || {};
  const patch = {
    'build.classes': newClasses,
    'state.hp': { ...ch.state.hp, max: newMax, current: Math.max(0, Math.min(newMax, newMax - lost)) },
    'state.hitDice': { byClass, max: byClass.reduce((a, h) => a + h.max, 0), used: byClass.reduce((a, h) => a + h.used, 0), die: byClass[0]?.die },
    'state.spellSlots': Object.fromEntries(Object.entries(slots).map(([k, v]) => [k, { max: v, used: Math.min(oldSlots[k]?.used || 0, v) }])),
  };
  const pact = pactSlotsFor(newClasses);
  const oldPact = ch.state.pactSlots || {};
  patch['state.pactSlots'] = pact
    ? Object.fromEntries(Object.entries(pact).map(([k, v]) => [k, { max: v, used: Math.min(oldPact[k]?.used || 0, v) }]))
    : {};
  return patch;
}
/** Adiciona uma nova classe (multiclasse) no nível 1. Não altera a classe já existente. */
export function addClass(ch, comp, classId) {
  if (ch.build.classes.some((c) => c.classId === classId)) return null;
  return classesPatch(ch, comp, [...ch.build.classes, { classId, level: 1, subclassId: null }]);
}
/** Remove uma classe multiclasse (nunca a última / a inicial, índice 0). */
export function removeClass(ch, comp, classId) {
  if (ch.build.classes.length < 2) return null;
  const idx = ch.build.classes.findIndex((c) => c.classId === classId);
  if (idx <= 0) return null; // não remove a classe inicial
  return classesPatch(ch, comp, ch.build.classes.filter((c) => c.classId !== classId));
}
/** Muda o nível de uma classe específica (1–20, sem passar do nível total de personagem 20). */
export function setClassLevel(ch, comp, classId, newLevel) {
  const others = ch.build.classes.filter((c) => c.classId !== classId).reduce((a, c) => a + c.level, 0);
  const lvl = Math.max(1, Math.min(20 - others, newLevel));
  const newClasses = ch.build.classes.map((c) => (c.classId === classId ? { ...c, level: lvl } : c));
  return classesPatch(ch, comp, newClasses);
}
/** Muda a subclasse de uma classe específica. */
export function setSubclass(ch, comp, classId, subclassId) {
  const newClasses = ch.build.classes.map((c) => (c.classId === classId ? { ...c, subclassId: subclassId || null } : c));
  return classesPatch(ch, comp, newClasses);
}

/** Extras de PV máximo vindos de espécie e talentos (Vigoroso). */
export function hpBonusPerLevel(build) {
  let b = SPECIES_META[build.speciesId]?.pvPorNivel || 0;
  if ((build.feats || []).some((f) => f.id === 'vigoroso')) b += 2;
  return b;
}

/** Monta uma ficha nova a partir das escolhas + compêndio. */
export function buildCharacter(o, comp) {
  const { name, ownerUid, speciesId, classId, level, abilities, backgroundId = null, skillProfs = [], feats = [] } = o;
  const cls = comp.classes.find((c) => c.id === classId);
  const bg = comp.backgrounds?.find((b) => b.id === backgroundId);
  const lvl = Number(level) || 1;
  const build = {
    speciesId, backgroundId, classes: [{ classId, level: lvl, subclassId: null }],
    abilities, saveProfs: [...(cls.salvaguardas || [])],
    skillProfs: [...new Set([...skillProfs, ...(bg?.pericias || [])])], expertise: [],
    feats: [...(bg?.talentoId ? [{ id: bg.talentoId, origem: 'Antecedente' }] : []), ...feats],
    training: {
      armas: cls.armas || '', armaduras: cls.armaduras || '',
      ferramentas: [cls.ferramentas, bg?.ferramenta].filter(Boolean).join('; '),
      idiomas: 'Comum',
    },
    spellsKnown: [], spellsPrepared: [], ac: 10 + mod(abilities.des),
  };
  const hpMax = maxHp(cls.dadoVida, lvl, abilities.con, hpBonusPerLevel(build));
  const slots = slotsFor(classId, null, lvl);
  return {
    name, ownerUid, build,
    state: {
      hp: { current: hpMax, max: hpMax, temp: 0 },
      deathSaves: { success: 0, fail: 0 },
      conditions: [], dead: false, concentration: null,
      spellSlots: Object.fromEntries(Object.entries(slots).map(([k, v]) => [k, { max: v, used: 0 }])),
      pactSlots: {},
      hitDice: { byClass: [{ classId, die: cls.dadoVida, max: lvl, used: 0 }], max: lvl, used: 0, die: cls.dadoVida },
      log: [],
    },
    inventory: [], coins: { pc: 0, pp: 0, pe: 0, po: 0, pl: 0 },
    notes: '',
  };
}

/** Patch para mudar nível/subclasse da classe PRINCIPAL (índice 0) mantendo o dano sofrido e
 *  os espaços gastos. Se o personagem for multiclasse, os espaços de magia já saem combinados
 *  (classesPatch olha para todas as classes, não só a principal). PV somado pela MÉDIA da
 *  regra (não recalculado do zero), para respeitar um PV editado manualmente na mesa. */
export function levelPatch(ch, comp, newLevel, subclassId) {
  const c0 = ch.build.classes[0];
  const others = ch.build.classes.slice(1).reduce((a, c) => a + c.level, 0);
  const lvl = Math.max(1, Math.min(20 - others, newLevel));
  const sub = subclassId === undefined ? c0.subclassId ?? null : subclassId;
  const newClasses = [{ ...c0, level: lvl, subclassId: sub }, ...ch.build.classes.slice(1)];
  return classesPatch(ch, comp, newClasses);
}

/** Patch de PV ao mudar CONSTITUIÇÃO: soma só a diferença da média da regra ao PV
 *  máximo atual (que pode já ter sido editado manualmente), sem recalcular do zero.
 *  Considera todas as classes (multiclasse inclusive). */
export function conHpAdjust(ch, comp, newCon) {
  const withDice = classesWithDice(ch.build.classes, comp);
  const totalLevel = ch.build.classes.reduce((a, c) => a + c.level, 0);
  const prevSuggested = maxHpMulti(withDice, ch.build.abilities.con, hpBonusPerLevel(ch.build));
  const newSuggested = maxHpMulti(withDice, newCon, hpBonusPerLevel(ch.build));
  const newMax = Math.max(totalLevel, ch.state.hp.max + (newSuggested - prevSuggested));
  const lost = ch.state.hp.max - ch.state.hp.current;
  return { max: newMax, current: Math.max(0, Math.min(newMax, newMax - lost)) };
}

/** Valores derivados para exibir (não são salvos). */
export function derive(ch, comp) {
  const { abilities, classes, speciesId, saveProfs = [], skillProfs = [], expertise = [] } = ch.build;
  const level = levelOf(ch);
  const c0 = classes[0];
  const cls = comp.classes.find((c) => c.id === c0.classId);
  const sub = cls?.subclasses?.find((s) => s.id === c0.subclassId);
  const sp = comp.species.find((s) => s.id === speciesId);
  const bg = comp.backgrounds?.find((b) => b.id === ch.build.backgroundId);
  const pb = profBonus(level);
  const ci = casterInfo(c0.classId, c0.subclassId);
  const castAb = ci.atributoConjuracao;
  const skillBonus = (id, ab) => mod(abilities[ab]) + (expertise.includes(id) ? pb * 2 : skillProfs.includes(id) ? pb : 0);
  const weight = (ch.inventory || []).reduce((a, it) => a + parseWeight(it.peso) * (Number(it.qtd) || 0), 0);
  const multiclass = classes.length > 1;
  const fx = effectMods(ch);
  // uma seção de Traços por classe (a principal + cada multiclasse)
  const classesInfo = classes.map((c, i) => ({
    ...c, i, cls: comp.classes.find((x) => x.id === c.classId),
    sub: comp.classes.find((x) => x.id === c.classId)?.subclasses?.find((s) => s.id === c.subclassId),
  }));
  const out = {
    level, pb, cls, sub, sp, bg, caster: ci, multiclass, classesInfo,
    casters: castersInfo(classes, comp, abilities, pb),
    label: classesLabel(ch.build, comp),
    speciesLabel: speciesLabel(ch.build, comp),
    spellCaps: spellCaps(ch.build),
    bonusSpells: bonusSpellsFor(ch.build, comp),
    mods: Object.fromEntries(ABILITIES.map(([k]) => [k, mod(abilities[k])])),
    saves: Object.fromEntries(ABILITIES.map(([k]) => [k, mod(abilities[k]) + (saveProfs.includes(k) ? pb : 0)])),
    skills: SKILLS.map(([id, nome, ab]) => ({ id, nome, ab, prof: skillProfs.includes(id), exp: expertise.includes(id), bonus: skillBonus(id, ab) })),
    initiative: mod(abilities.des) + ((ch.build.feats || []).some((f) => f.id === 'alerta') ? pb : 0),
    passivePerception: 10 + skillBonus('percepcao', 'sab'),
    spellDC: castAb ? 8 + pb + mod(abilities[castAb]) : null,
    spellAttack: castAb ? pb + mod(abilities[castAb]) : null,
    speed: sp?.deslocamento || '9 metros',
    fx,
    resist: fx.resist,
    weight, carry: (abilities.for || 10) * 7,
    coinsGP: coinsToGP(ch.coins),
  };
  out.armor = armorClass(ch, comp, out);
  out.ac = out.armor ? out.armor.ac : (ch.build.ac ?? 10);
  const acParts = out.armor ? [out.armor.detalhe] : [];
  for (const e of fx.lista) { if (e.mods.ac) { out.ac += e.mods.ac; acParts.push(`${e.nome} ${e.mods.ac > 0 ? '+' : ''}${e.mods.ac}`); } }
  if (fx.acMin > out.ac) { out.ac = fx.acMin; acParts.push(`CA mínima ${fx.acMin}`); }
  out.acDetalhe = acParts.join(' · ');
  // Deslocamento: passivos de talentos/classe + efeitos ativos
  const worn = wornArmor(ch, comp);
  const feats = (ch.build.feats || []).map((f) => f.id);
  const lvlOf = (id) => classes.filter((c) => c.classId === id).reduce((a, c) => a + c.level, 0);
  let m = parseMeters(out.speed);
  const baseM = m;
  if (feats.includes('velocista')) m += 3;
  if (feats.includes('dadiva-da-velocidade')) m += 9;
  if (lvlOf('barbaro') >= 5 && !worn.heavy) m += 3;
  const lm = lvlOf('monge');
  if (lm >= 2 && !worn.body && !worn.shield) m += lm >= 18 ? 9 : lm >= 14 ? 7.5 : lm >= 10 ? 6 : lm >= 6 ? 4.5 : 3;
  m = (m + fx.speed) * fx.speedMult;
  if (m !== baseM) out.speed = fmtMeters(m);
  return out;
}

/** Ataques com as armas equipadas no inventário: bônus de ataque (Proficiência + atributo) e
 *  dano (dado da arma + atributo), prontos pra rolar na mesa sem fazer conta. Usa Destreza pra
 *  armas à distância, Força pra corpo a corpo — exceto armas com a propriedade Acuidade, que
 *  usam o maior entre Força e Destreza (regra 2024 de armas com acuidade). Sempre assume
 *  proficiência (o app não modela treinamento com armas limitado, só como texto livre em
 *  "Treinamento e Proficiências" — ver Próximos passos). */
export function weaponAttacks(ch, comp, d) {
  return (ch.inventory || [])
    .filter((it) => it.equipado && (it.itemId || (it.categoria === 'arma' && it.dano)))
    .map((it) => {
      const w = it.itemId ? (comp.byId?.weapons?.[it.itemId] || comp.weapons?.find((x) => x.id === it.itemId)) : null;
      // item personalizado (v0.24): sem entrada no compêndio, mas com "Dano" preenchido no formulário —
      // usa os campos ranged/finesse marcados à mão em vez de tentar interpretar texto livre de propriedades.
      const custom = !w && it.categoria === 'arma' && it.dano;
      if (!w && !custom) return null;
      if (w && w.tipo !== 'arma') return null;
      const props = String((w ? w.propriedades : it.propriedades) || '');
      const ranged = w ? /à Distância/i.test(w.categoria || '') : !!it.ranged;
      const finesse = w ? /Acuidade/i.test(props) : !!it.finesse;
      const ability = ranged ? 'des' : finesse ? (d.mods.des > d.mods.for ? 'des' : 'for') : 'for';
      const abMod = d.mods[ability];
      const danoStr = w ? w.dano : it.dano;
      const [, dice = danoStr, dmgType = ''] = String(danoStr || '').match(/^(\d+d\d+)\s*(.*)$/i) || [];
      return {
        uid: it.uid, nome: it.nome || w?.nome, ability,
        atk: abMod + d.pb, dice, dmgType, dmgBonus: abMod + (ability === 'for' ? (d.fx?.dmgFor || 0) : 0),
        propriedades: props, maestria: w?.maestria,
      };
    })
    .filter(Boolean);
}

/** Classe de Armadura calculada a partir do que está EQUIPADO no inventário (v0.26): armadura do
 *  compêndio (interpreta o texto da CA, ex.: "14 + Modificador de Des (máx. 2)"), escudo e itens
 *  personalizados (categoria "armadura" com CA base). Regras: só 1 armadura de corpo (a primeira
 *  equipada) e só 1 escudo (o primeiro); sem armadura de corpo, usa 10 + Des (ou a Defesa sem Armadura
 *  do Bárbaro/Monge). Devolve null quando não há armadura nem escudo equipados — aí vale a CA manual.
 *  `detalhe` é o texto "Cota de Malha 16 + Escudo 2" mostrado na ficha. O bônus extra manual
 *  (build.acBonus: item mágico, estilo de luta Defesa etc.) é somado por cima. */
/** Peças de armadura/escudo equipadas (compêndio ou personalizadas), já interpretadas. */
export function wornArmor(ch, comp) {
  const parts = [];
  for (const it of (ch.inventory || [])) {
    if (!it.equipado) continue;
    const a = it.itemId ? (comp.byId?.armor?.[it.itemId] || comp.armor?.find((x) => x.id === it.itemId)) : null;
    if (a) {
      const base = parseInt(String(a.ca).match(/\d+/)?.[0], 10);
      if (!base) continue;
      const shield = /^escudo/i.test(a.categoria || '') || a.id === 'escudo';
      const capM = String(a.ca).match(/m[áa]x\.?\s*(\d+)/i);
      parts.push({ nome: a.nome || it.nome, shield, base, heavy: /pesada/i.test(a.categoria || ''), dex: !shield && /des/i.test(a.ca), cap: capM ? Number(capM[1]) : null });
    } else if (it.categoria === 'armadura' && Number(it.ca)) {
      const base = Number(it.ca);
      const shield = !it.caDex && base < 10;
      parts.push({ nome: it.nome, shield, base, heavy: false, dex: !shield && !!it.caDex, cap: it.caDexMax != null && it.caDexMax !== '' ? Number(it.caDexMax) : null });
    }
  }
  const body = parts.find((x) => !x.shield) || null;
  const shield = parts.find((x) => x.shield) || null;
  return { body, shield, heavy: !!body?.heavy };
}

export function armorClass(ch, comp, d) {
  const dex = d.mods.des;
  const { body, shield } = wornArmor(ch, comp);
  const arcana = effectMods(ch).acBaseUnarmored; // Armadura Arcana: CA base 13 + Des sem armadura
  if (!body && !shield && !arcana) return null;
  let ac, nome;
  if (body) {
    ac = body.base + (body.dex ? (body.cap != null ? Math.min(dex, body.cap) : dex) : 0);
    nome = `${body.nome} ${ac}`;
  } else {
    const ids = (ch.build.classes || []).map((c) => c.classId);
    const extra = ids.includes('barbaro') ? ['con', 'Defesa sem Armadura'] : ids.includes('monge') && !shield ? ['sab', 'Defesa sem Armadura'] : null;
    ac = 10 + dex + (extra ? d.mods[extra[0]] : 0);
    nome = `${extra ? extra[1] : 'Sem armadura'} ${ac}`;
    if (arcana && arcana + dex > ac) { ac = arcana + dex; nome = `Armadura Arcana ${ac}`; }
  }
  if (shield) { ac += shield.base; nome += ` + ${shield.nome} ${shield.base}`; }
  if (body && (ch.build.feats || []).some((f) => f.id === 'defensivo')) { ac += 1; nome += ' + Defensivo 1'; }
  const bonus = Number(ch.build.acBonus) || 0;
  if (bonus) { ac += bonus; nome += ` ${bonus > 0 ? '+' : '−'} ${Math.abs(bonus)} (extra)`; }
  return { ac, detalhe: nome };
}

/** "1,5 kg" -> 1.5 ; "150 g" -> 0.15 */
export function parseWeight(w) {
  if (typeof w === 'number') return w;
  const m = String(w || '').replace(',', '.').match(/([\d.]+)\s*(kg|g)?/i);
  if (!m) return 0;
  return m[2]?.toLowerCase() === 'g' ? Number(m[1]) / 1000 : Number(m[1]);
}
export const COINS = [['pl', 'PL', 'Platina', 10], ['po', 'PO', 'Ouro', 1], ['pe', 'PE', 'Electro', 0.5], ['pp', 'PP', 'Prata', 0.1], ['pc', 'PC', 'Cobre', 0.01]];
export const coinsToGP = (c = {}) => COINS.reduce((a, [k, , , v]) => a + (Number(c[k]) || 0) * v, 0);

/** Inventário com `uid` garantido: itens entregues pelo Mestre antes da v0.28 usavam `id` (corrigido na leitura). */
export const inventoryOf = (ch) => (ch.inventory || []).map((it) => (it.uid ? it : { ...it, uid: it.id || 'legado-' + (it.nome || '') }));
