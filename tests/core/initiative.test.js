import { describe, it, expect } from 'vitest';
import { sortOrdem, currentRef, stepTurn, removeCombatant, setInitiative } from '../../src/core/initiative.js';

const base = () => ({ ordem: [{ ref: 'a', iniciativa: 10 }, { ref: 'b', iniciativa: 15 }, { ref: 'c', iniciativa: 5 }], turnoRef: 'a', rodada: 1 });

describe('iniciativa por referência (v0.29)', () => {
  it('ordena por iniciativa e mantém empates estáveis', () => {
    expect(sortOrdem([{ ref: 'x', iniciativa: 3 }, { ref: 'y', iniciativa: 3 }, { ref: 'z', iniciativa: 9 }]).map((o) => o.ref)).toEqual(['z', 'x', 'y']);
  });
  it('editar iniciativa não muda de quem é a vez', () => {
    const c = base();
    const p = setInitiative(c, 'c', 99, undefined);
    const novo = { ...c, ...p };
    expect(sortOrdem(novo.ordem)[0].ref).toBe('c');
    expect(currentRef(novo)).toBe('a');
  });
  it('avança, volta e conta rodadas', () => {
    let c = { ...base(), turnoRef: 'b' };           // ordem: b, a, c
    c = { ...c, ...stepTurn(c, 1) }; expect(c.turnoRef).toBe('a');
    c = { ...c, ...stepTurn(c, 1) }; expect(c.turnoRef).toBe('c');
    c = { ...c, ...stepTurn(c, 1) }; expect([c.turnoRef, c.rodada]).toEqual(['b', 2]);
    c = { ...c, ...stepTurn(c, -1) }; expect([c.turnoRef, c.rodada]).toEqual(['c', 1]);
  });
  it('remover outro combatente mantém a vez; remover quem está na vez passa para o próximo', () => {
    const c = { ...base(), turnoRef: 'a' };
    expect(removeCombatant(c, 'b').turnoRef).toBe('a');
    expect(removeCombatant(c, 'a').turnoRef).toBe('c');
    expect(removeCombatant({ ...c, turnoRef: 'c' }, 'c').turnoRef).toBe('b');
    expect(removeCombatant({ ordem: [{ ref: 'a', iniciativa: 1 }], turnoRef: 'a' }, 'a').turnoRef).toBeNull();
  });
  it('combate antigo (só turno numérico) usa a posição na lista ordenada', () => {
    expect(currentRef({ ordem: base().ordem, turno: 1 })).toBe('a');
  });
});
