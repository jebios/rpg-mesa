export const $ = (sel, root = document) => root.querySelector(sel);
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const store = {
  get(k, d = null) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};
export function toast(msg) {
  let t = document.getElementById('toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; t.setAttribute('role', 'status'); document.body.append(t); }
  t.textContent = msg; t.classList.add('show');
  clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 2600);
}
// Refaz o innerHTML preservando foco, seleção de texto e posição de rolagem (evita "pular" ao digitar).
// Reentrante-seguro: se um rebuild já estiver em andamento (ex.: um evento "change" dispara um
// commit síncrono que por sua vez dispara outro snapshot/render antes do primeiro terminar), a
// nova chamada não mexe no DOM no meio da anterior — ela só marca que precisa rodar de novo, e o
// próprio preserveFocus refaz assim que o rebuild atual libera. Evita o erro do navegador
// "the node to be removed is no longer a child of this node" ao trocar innerHTML duas vezes
// sobrepostas.
let busy = false, queued = false, lastRebuild = null;
export function preserveFocus(rebuild) {
  lastRebuild = rebuild;
  if (busy) { queued = true; return; }
  busy = true;
  try {
    const a = document.activeElement, focusId = a?.id;
    const sel = a && 'selectionStart' in a ? [a.selectionStart, a.selectionEnd] : null;
    const scrollY = window.scrollY;
    rebuild();
    if (focusId) {
      const el = document.getElementById(focusId);
      if (el) { el.focus(); if (sel && 'setSelectionRange' in el) { try { el.setSelectionRange(...sel); } catch {} } }
    }
    window.scrollTo(0, scrollY);
  } finally {
    busy = false;
    if (queued) { queued = false; preserveFocus(lastRebuild); }
  }
}
// Aplica um patch de caminhos "com.ponto" (o mesmo formato salvo no banco, ex.: "state.hp") direto
// num objeto local, sem mutar o original — usado para refletir na hora escritas que passam por
// transação (hp-actions.js) e cujo listener em tempo real pode demorar a confirmar de volta.
export function setPath(obj, path, value) {
  const keys = path.split('.');
  let o = obj;
  keys.slice(0, -1).forEach((k) => { o[k] = o[k] && typeof o[k] === 'object' ? o[k] : {}; o = o[k]; });
  o[keys.at(-1)] = value;
}
// Enquanto o jogador/Mestre está digitando numa <textarea> longa (Anotações, História, descrição
// de NPC etc.), pedidos de redesenho disparados pelo ECO da própria gravação no banco (o listener
// em tempo real confirmando o que acabou de ser salvo) são adiados em vez de rodarem na hora: trocar
// o innerHTML sempre recria o elemento, o que reseta a rolagem interna da textarea pro topo e, no
// celular, fecha o teclado virtual (o navegador só reabre o teclado com foco disparado por um toque
// do usuário, não por um foco dado via código depois que o elemento original foi destruído) — dando
// a impressão de que "parou de deixar escrever". Como o estado (S.*) já foi atualizado antes desta
// chamada, o redesenho pendente roda assim que o campo perde o foco (ou por qualquer outro gatilho
// que aconteça depois), mostrando tudo certinho sem interromper quem está digitando.
let pendingBlurEl = null, pendingBlurRerender = null;
export function skipRerenderWhileTyping(doRender) {
  const el = document.activeElement;
  if (!el || el.tagName !== 'TEXTAREA') return false;
  pendingBlurRerender = doRender;
  if (pendingBlurEl !== el) {
    pendingBlurEl = el;
    el.addEventListener('blur', function onBlur() {
      el.removeEventListener('blur', onBlur);
      if (pendingBlurEl === el) { pendingBlurEl = null; pendingBlurRerender?.(); pendingBlurRerender = null; }
    }, { once: true });
  }
  return true;
}
export const uid8 = () => Math.random().toString(36).slice(2, 10);
export const CONDITIONS = ['agarrado', 'amedrontado', 'atordoado', 'caido', 'cego', 'enfeiticado', 'envenenado',
  'impedido', 'incapacitado', 'inconsciente', 'invisivel', 'paralisado', 'petrificado', 'surdo', 'estabilizado'];
export const COND_LABEL = { caido: 'caído', enfeiticado: 'enfeitiçado', invisivel: 'invisível' };
