// Motor de Pontos de Vida — regras do D&D 2024 (Livro do Jogador, "Dano e Cura").
// Funções PURAS: recebem o `state` da ficha e devolvem um novo `state`. Sem Firebase aqui.

const clone = (s) => ({
  ...s,
  hp: { ...s.hp },
  deathSaves: { success: 0, fail: 0, ...(s.deathSaves || {}) },
  conditions: [...(s.conditions || [])],
});

const addCond = (list, c) => (list.includes(c) ? list : [...list, c]);
const delCond = (list, c) => list.filter((x) => x !== c);

/**
 * Aplica dano.
 * @param {object} state  { hp:{current,max,temp}, deathSaves, conditions, dead }
 * @param {number} amount dano bruto
 * @param {object} opts   { critical, resistant, vulnerable }
 * @returns {{state, log:string[], concentrationDC:number|null}}
 */
export function applyDamage(state, amount, opts = {}) {
  const s = clone(state);
  const log = [];
  let dmg = Math.max(0, Math.floor(Number(amount) || 0));
  if (opts.resistant) { dmg = Math.floor(dmg / 2); log.push(`Resistência: dano reduzido para ${dmg}.`); }
  if (opts.vulnerable) { dmg = dmg * 2; log.push(`Vulnerabilidade: dano dobrado para ${dmg}.`); }
  if (s.dead || dmg === 0) return { state: s, log, concentrationDC: null };

  // Já está com 0 PV: cada dano = 1 falha no teste de morte (crítico = 2).
  if (s.hp.current === 0) {
    if (dmg >= s.hp.max) {
      s.dead = true;
      log.push('Dano maciço com 0 PV: morte instantânea.');
    } else {
      s.deathSaves.fail += opts.critical ? 2 : 1;
      log.push(`Sofreu dano com 0 PV: ${opts.critical ? 2 : 1} falha(s) no teste contra a morte.`);
      if (s.deathSaves.fail >= 3) { s.deathSaves.fail = 3; s.dead = true; log.push('3 falhas: o personagem morreu.'); }
    }
    s.conditions = delCond(s.conditions, 'estabilizado');
    return { state: s, log, concentrationDC: null };
  }

  const concentrationDC = Math.min(30, Math.max(10, Math.floor(dmg / 2)));

  // PV temporários absorvem primeiro.
  const absorbed = Math.min(s.hp.temp, dmg);
  if (absorbed) { s.hp.temp -= absorbed; dmg -= absorbed; log.push(`PV temporários absorveram ${absorbed}.`); }

  const overflow = dmg - s.hp.current;
  s.hp.current = Math.max(0, s.hp.current - dmg);
  if (dmg) log.push(`Sofreu ${dmg} de dano (${s.hp.current}/${s.hp.max} PV).`);

  if (s.hp.current === 0) {
    if (overflow >= s.hp.max) {
      s.dead = true;
      log.push(`Dano restante (${overflow}) ≥ PV máximo: morte instantânea.`);
    } else {
      s.conditions = addCond(s.conditions, 'inconsciente');
      s.deathSaves = { success: 0, fail: 0 };
      log.push('Caiu a 0 PV: inconsciente. Faça testes contra a morte.');
    }
  }
  return { state: s, log, concentrationDC };
}

/** Cura. Não afeta PV temporário. Com 0 PV, recupera a consciência e zera testes de morte. */
export function heal(state, amount) {
  const s = clone(state);
  const log = [];
  const n = Math.max(0, Math.floor(Number(amount) || 0));
  if (s.dead || n === 0) return { state: s, log };
  const before = s.hp.current;
  s.hp.current = Math.min(s.hp.max, s.hp.current + n);
  log.push(`Recuperou ${s.hp.current - before} PV (${s.hp.current}/${s.hp.max}).`);
  if (before === 0) {
    s.deathSaves = { success: 0, fail: 0 };
    s.conditions = delCond(delCond(s.conditions, 'inconsciente'), 'estabilizado');
    log.push('Recuperou a consciência.');
  }
  return { state: s, log };
}

/** PV temporários não se acumulam: mantém o maior valor. */
export function setTempHp(state, amount) {
  const s = clone(state);
  const n = Math.max(0, Math.floor(Number(amount) || 0));
  const log = [];
  if (n > s.hp.temp) { s.hp.temp = n; log.push(`PV temporários: ${n}.`); }
  else log.push(`PV temporários não acumulam — mantidos ${s.hp.temp}.`);
  return { state: s, log };
}

/** Resultado de um teste contra a morte (d20). */
export function deathSave(state, roll) {
  const s = clone(state);
  const log = [];
  if (s.dead || s.hp.current > 0) return { state: s, log };
  if (roll === 20) {
    s.hp.current = 1;
    s.deathSaves = { success: 0, fail: 0 };
    s.conditions = delCond(delCond(s.conditions, 'inconsciente'), 'estabilizado');
    log.push('20 natural: recupera 1 PV e acorda!');
  } else if (roll === 1) {
    s.deathSaves.fail += 2; log.push('1 natural: 2 falhas.');
  } else if (roll >= 10) {
    s.deathSaves.success += 1; log.push('Sucesso.');
  } else {
    s.deathSaves.fail += 1; log.push('Falha.');
  }
  if (s.deathSaves.fail >= 3) { s.deathSaves.fail = 3; s.dead = true; log.push('3 falhas: o personagem morreu.'); }
  else if (s.deathSaves.success >= 3) {
    s.deathSaves = { success: 0, fail: 0 };
    s.conditions = addCond(s.conditions, 'estabilizado');
    log.push('3 sucessos: estabilizado (continua inconsciente com 0 PV).');
  }
  return { state: s, log };
}
