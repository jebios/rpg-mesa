// Efeitos ativos (v0.27): magias e características que mudam CA, deslocamento, resistências ou dano
// enquanto estão ativos — com contagem de rodadas. Cada efeito guardado na ficha é só
// { uid, id, nome, rounds, custom? } (state.effects); o que ele faz vem desta biblioteca.
// rounds = rodadas restantes (null = sem contagem: dura até o descanso longo ou até você encerrar).

/** Dano da Fúria do Bárbaro (2024) por nível de Bárbaro. */
export const rageDamage = (lvl) => (lvl >= 16 ? 4 : lvl >= 9 ? 3 : 2);

// mods: ac (bônus fixo), acMin (CA mínima), acBaseUnarmored (CA base sem armadura = valor + Des),
// speed (metros somados), speedMult, resist (lista), dmgFor (bônus de dano em ataques de Força).
export const EFFECTS = {
  furia: {
    nome: 'Fúria', tipo: 'Característica', classe: 'barbaro', rounds: 1, nota: 'Dura até o fim do seu próximo turno; estenda (+1) se atacar, forçar uma salvaguarda ou gastar uma Ação Bônus. Máx. 10 minutos (100 rodadas). Sem concentração nem magias.',
    mods: (ch, lvl) => ({ resist: ['Contundente', 'Cortante', 'Perfurante'], dmgFor: rageDamage(lvl), notas: ['Vantagem em testes e salvaguardas de Força'] }),
  },
  'armadura-arcana': { nome: 'Armadura Arcana', tipo: 'Magia', rounds: null, nota: 'CA base 13 + Des, enquanto o alvo não vestir armadura. 8 horas.', mods: () => ({ acBaseUnarmored: 13 }) },
  'escudo-arcano': { nome: 'Escudo Arcano', tipo: 'Magia', rounds: 1, nota: '+5 de CA até o início do seu próximo turno.', mods: () => ({ ac: 5 }) },
  'escudo-da-fe': { nome: 'Escudo da Fé', tipo: 'Magia', rounds: 100, nota: '+2 de CA. Concentração, até 10 minutos.', mods: () => ({ ac: 2 }) },
  'pele-casca': { nome: 'Pele-Casca', tipo: 'Magia', rounds: null, nota: 'CA 17 se a sua for menor. 1 hora.', mods: () => ({ acMin: 17 }) },
  'passos-largos': { nome: 'Passos Largos', tipo: 'Magia', rounds: null, nota: '+3 m de deslocamento. 1 hora.', mods: () => ({ speed: 3 }) },
};

/** Efeitos que a ficha pode ativar com um toque (características só aparecem pra quem tem a classe). */
export function availableEffects(ch) {
  const classes = (ch.build.classes || []).map((c) => c.classId);
  return Object.entries(EFFECTS).filter(([, e]) => !e.classe || classes.includes(e.classe));
}

/** Resolve os efeitos ativos da ficha em modificadores somados. */
export function effectMods(ch) {
  const out = { ac: 0, acMin: 0, acBaseUnarmored: 0, speed: 0, speedMult: 1, resist: [], dmgFor: 0, notas: [], lista: [] };
  for (const e of (ch.state?.effects || [])) {
    const lib = EFFECTS[e.id];
    const lvl = (ch.build.classes || []).filter((c) => !lib?.classe || c.classId === lib.classe).reduce((a, c) => a + c.level, 0);
    const m = lib ? lib.mods(ch, lvl) : { ac: Number(e.ac) || 0, speed: Number(e.speed) || 0 };
    out.ac += m.ac || 0;
    out.acMin = Math.max(out.acMin, m.acMin || 0);
    out.acBaseUnarmored = Math.max(out.acBaseUnarmored, m.acBaseUnarmored || 0);
    out.speed += m.speed || 0;
    out.speedMult *= m.speedMult || 1;
    out.dmgFor += m.dmgFor || 0;
    for (const r of m.resist || []) if (!out.resist.includes(r)) out.resist.push(r);
    out.notas.push(...(m.notas || []));
    out.lista.push({ ...e, nome: e.nome || lib?.nome, mods: m });
  }
  return out;
}

/** "10,5 metros" -> 10.5 */
export const parseMeters = (s) => Number(String(s || '9').replace(',', '.').match(/[\d.]+/)?.[0]) || 9;
/** 12 -> "12 metros"; 10.5 -> "10,5 metros" */
export const fmtMeters = (n) => `${String(Math.round(n * 10) / 10).replace('.', ',')} metros`;

/** Texto curto dos efeitos de um modificador, pra mostrar em fichas ("+2 CA", "+3 m"). */
export function modsChips(m) {
  const c = [];
  if (m.ac) c.push(`${m.ac > 0 ? '+' : ''}${m.ac} CA`);
  if (m.acMin) c.push(`CA mín. ${m.acMin}`);
  if (m.acBaseUnarmored) c.push(`CA base ${m.acBaseUnarmored}+Des`);
  if (m.speed) c.push(`${m.speed > 0 ? '+' : ''}${String(m.speed).replace('.', ',')} m`);
  if (m.speedMult && m.speedMult !== 1) c.push(`deslocamento ×${m.speedMult}`);
  if (m.dmgFor) c.push(`+${m.dmgFor} dano (Força)`);
  for (const r of m.resist || []) c.push(`Res. ${r}`);
  return c;
}
