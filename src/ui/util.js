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
export const CONDITIONS = ['agarrado', 'amedrontado', 'atordoado', 'caido', 'cego', 'enfeiticado', 'envenenado',
  'impedido', 'incapacitado', 'inconsciente', 'invisivel', 'paralisado', 'petrificado', 'surdo', 'estabilizado'];
export const COND_LABEL = { caido: 'caído', enfeiticado: 'enfeitiçado', invisivel: 'invisível' };
