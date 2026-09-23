import { describe, it, expect } from 'vitest';
import { applyDamage, heal, setTempHp, deathSave } from '../../src/core/hp.js';
import { spellSlotsFor, maxHp, profBonus } from '../../src/core/rules.js';

const base = (current = 20, max = 20, temp = 0) => ({
  hp: { current, max, temp }, deathSaves: { success: 0, fail: 0 }, conditions: [], dead: false,
});

describe('dano', () => {
  it('PV temporário absorve primeiro', () => {
    const { state } = applyDamage(base(20, 20, 5), 8);
    expect(state.hp).toEqual({ current: 17, max: 20, temp: 0 });
  });
  it('cair a 0 deixa inconsciente', () => {
    const { state } = applyDamage(base(10), 15);
    expect(state.hp.current).toBe(0);
    expect(state.conditions).toContain('inconsciente');
    expect(state.dead).toBe(false);
  });
  it('morte instantânea quando o excedente ≥ PV máximo', () => {
    expect(applyDamage(base(10, 20), 30).state.dead).toBe(true);
    expect(applyDamage(base(10, 20), 29).state.dead).toBe(false);
  });
  it('dano com 0 PV conta falha; crítico conta 2', () => {
    const down = applyDamage(base(5), 5).state;
    expect(applyDamage(down, 3).state.deathSaves.fail).toBe(1);
    expect(applyDamage(down, 3, { critical: true }).state.deathSaves.fail).toBe(2);
  });
  it('resistência e vulnerabilidade', () => {
    expect(applyDamage(base(), 9, { resistant: true }).state.hp.current).toBe(16);
    expect(applyDamage(base(), 4, { vulnerable: true }).state.hp.current).toBe(12);
  });
  it('CD de concentração = máx(10, metade)', () => {
    expect(applyDamage(base(50, 50), 8).concentrationDC).toBe(10);
    expect(applyDamage(base(50, 50), 30).concentrationDC).toBe(15);
  });
});

describe('cura e temporários', () => {
  it('cura não passa do máximo e não mexe no temporário', () => {
    const { state } = heal(base(15, 20, 3), 10);
    expect(state.hp).toEqual({ current: 20, max: 20, temp: 3 });
  });
  it('cura com 0 PV acorda e zera testes de morte', () => {
    let s = applyDamage(base(5), 5).state;
    s = applyDamage(s, 1).state;
    s = heal(s, 4).state;
    expect(s.hp.current).toBe(4);
    expect(s.deathSaves.fail).toBe(0);
    expect(s.conditions).not.toContain('inconsciente');
  });
  it('temporários não acumulam', () => {
    expect(setTempHp(base(20, 20, 8), 5).state.hp.temp).toBe(8);
    expect(setTempHp(base(20, 20, 3), 5).state.hp.temp).toBe(5);
  });
});

describe('testes contra a morte', () => {
  const down = () => applyDamage(base(5), 5).state;
  it('20 natural volta com 1 PV', () => expect(deathSave(down(), 20).state.hp.current).toBe(1));
  it('3 sucessos estabiliza', () => {
    let s = down();
    for (let i = 0; i < 3; i++) s = deathSave(s, 12).state;
    expect(s.conditions).toContain('estabilizado');
  });
});

describe('regras derivadas', () => {
  it('bônus de proficiência', () => {
    expect([1, 4, 5, 9, 13, 17, 20].map(profBonus)).toEqual([2, 2, 3, 4, 5, 6, 6]);
  });
  it('espaços de magia', () => {
    expect(spellSlotsFor('full', 5)).toEqual({ 1: 4, 2: 3, 3: 2 });
    expect(spellSlotsFor('half', 1)).toEqual({ 1: 2 });
    expect(spellSlotsFor('half', 5)).toEqual({ 1: 4, 2: 2 });
    expect(spellSlotsFor('pact', 5)).toEqual({ 3: 2 });
    expect(spellSlotsFor('none', 5)).toEqual({});
  });
  it('PV máximo (guerreiro d10, CON 14, nível 3)', () => {
    expect(maxHp(10, 3, 14)).toBe(10 + 2 + 2 * (6 + 2));
  });
});
