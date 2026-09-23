// Cálculos derivados da ficha (D&D 2024).

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

/** Monta uma ficha nova a partir das escolhas + compêndio. */
export function buildCharacter({ name, ownerUid, speciesId, classId, level, abilities }, comp) {
  const cls = comp.classes.find((c) => c.id === classId);
  const sp = comp.species.find((s) => s.id === speciesId);
  const lvl = Number(level) || 1;
  const hpMax = maxHp(cls.dadoVida, lvl, abilities.con, sp?.pvPorNivel || 0);
  const slots = spellSlotsFor(cls.conjurador, lvl);
  return {
    name, ownerUid,
    build: {
      speciesId, classes: [{ classId, level: lvl }],
      abilities, saveProfs: cls.salvaguardas, skillProfs: [],
      spellsKnown: [], spellsPrepared: [],
    },
    state: {
      hp: { current: hpMax, max: hpMax, temp: 0 },
      deathSaves: { success: 0, fail: 0 },
      conditions: [], dead: false,
      spellSlots: Object.fromEntries(Object.entries(slots).map(([k, v]) => [k, { max: v, used: 0 }])),
      hitDice: { max: lvl, used: 0, die: cls.dadoVida },
      log: [],
    },
    inventory: [],
    notes: '',
  };
}

/** Valores derivados para exibir (não são salvos). */
export function derive(ch, comp) {
  const { abilities, classes, speciesId, saveProfs = [], skillProfs = [] } = ch.build;
  const level = classes.reduce((a, c) => a + c.level, 0);
  const cls = comp.classes.find((c) => c.id === classes[0].classId);
  const sp = comp.species.find((s) => s.id === speciesId);
  const pb = profBonus(level);
  const castAb = cls?.atributoConjuracao;
  return {
    level, pb, cls, sp,
    mods: Object.fromEntries(ABILITIES.map(([k]) => [k, mod(abilities[k])])),
    saves: Object.fromEntries(ABILITIES.map(([k]) => [k, mod(abilities[k]) + (saveProfs.includes(k) ? pb : 0)])),
    skills: SKILLS.map(([id, nome, ab]) => ({ id, nome, ab, prof: skillProfs.includes(id), bonus: mod(abilities[ab]) + (skillProfs.includes(id) ? pb : 0) })),
    initiative: mod(abilities.des),
    passivePerception: 10 + mod(abilities.sab) + (skillProfs.includes('percepcao') ? pb : 0),
    spellDC: castAb ? 8 + pb + mod(abilities[castAb]) : null,
    spellAttack: castAb ? pb + mod(abilities[castAb]) : null,
    speed: sp?.deslocamento || '9 m',
  };
}
