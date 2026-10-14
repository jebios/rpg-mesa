// Ações de PV compartilhadas entre Grimório e Escudo (executadas em transação).
import { applyDamage, heal, setTempHp, deathSave } from '../core/hp.js';

const OPS = {
  dano: (s, n, o) => applyDamage(s, n, o),
  cura: (s, n) => heal(s, n),
  temp: (s, n) => setTempHp(s, n),
  morte: (s, n) => deathSave(s, n),
};

export async function hpAction(backend, chId, kind, amount, opts = {}, who = '') {
  let result, patch;
  await backend.mutateCharacter(chId, (ch) => {
    result = OPS[kind](ch.state, amount, opts);
    const ns = result.state;
    const stamp = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const log = [...result.log.map((l) => `${stamp} ${who ? who + ': ' : ''}${l}`), ...(ch.state.log || [])].slice(0, 12);
    patch = {
      'state.hp': ns.hp, 'state.deathSaves': ns.deathSaves,
      'state.conditions': ns.conditions, 'state.dead': !!ns.dead, 'state.log': log,
    };
    return patch;
  });
  // `mutateCharacter` roda numa transação: o servidor confirma a escrita, mas o listener em
  // tempo real (onSnapshot) pode demorar bem mais que uma escrita comum pra refletir de volta
  // no app (o SDK não aplica o resultado de transações no cache local de forma otimista, como
  // faz com updateCharacter normal). Por isso devolvemos o `patch` pronto — quem chamou aplica
  // na hora, direto no estado local, sem esperar o próximo snapshot pra ver a mudança na tela.
  return { ...result, patch };
}
