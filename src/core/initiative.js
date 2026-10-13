// Iniciativa (v0.29): o turno atual é guardado pelo combatente (`turnoRef`), não pela posição na lista.
// Assim, editar a iniciativa de alguém (que reordena a lista) ou remover um combatente não muda de quem é a vez.

/** Ordem de exibição: maior iniciativa primeiro; empate mantém a ordem em que entraram. */
export const sortOrdem = (ordem, valid = () => true) =>
  (ordem || []).map((o, i) => ({ o, i })).filter(({ o }) => valid(o))
    .sort((a, b) => (b.o.iniciativa - a.o.iniciativa) || (a.i - b.i)).map(({ o }) => o);

/** ref de quem está no turno. Combates antigos (só `turno` numérico) caem na posição da lista ordenada. */
export function currentRef(combat, valid) {
  const lista = sortOrdem(combat?.ordem, valid);
  if (!lista.length) return null;
  if (combat.turnoRef && lista.some((o) => o.ref === combat.turnoRef)) return combat.turnoRef;
  return (lista[combat?.turno || 0] || lista[0]).ref;
}

/** Avança (+1) ou volta (-1) um turno; retorna o patch { turnoRef, rodada }. */
export function stepTurn(combat, dir, valid) {
  const lista = sortOrdem(combat?.ordem, valid);
  let rodada = combat?.rodada || 1;
  if (!lista.length) return { turnoRef: null, rodada };
  const cur = currentRef(combat, valid);
  let idx = lista.findIndex((o) => o.ref === cur) + dir;
  if (idx >= lista.length) { idx = 0; rodada += 1; }
  else if (idx < 0) { idx = lista.length - 1; rodada = Math.max(1, rodada - 1); }
  return { turnoRef: lista[idx].ref, rodada };
}

/** Patch para remover um combatente; se era a vez dele, a vez passa para o próximo da lista. */
export function removeCombatant(combat, ref, valid) {
  const lista = sortOrdem(combat?.ordem, valid);
  const cur = currentRef(combat, valid);
  const ordem = (combat?.ordem || []).filter((o) => o.ref !== ref);
  let turnoRef = cur;
  if (cur === ref) {
    const i = lista.findIndex((o) => o.ref === ref);
    turnoRef = (lista[i + 1] || lista.find((o) => o.ref !== ref))?.ref ?? null;
  }
  return { ordem, turnoRef };
}

/** Patch para alterar a iniciativa de alguém sem perder de quem é a vez. */
export function setInitiative(combat, ref, valor, valid) {
  return {
    ordem: (combat?.ordem || []).map((o) => (o.ref === ref ? { ...o, iniciativa: valor } : o)),
    turnoRef: currentRef(combat, valid),
  };
}
