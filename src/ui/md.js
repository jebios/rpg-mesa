// Renderiza o texto do compêndio: **negrito**, _itálico_, "### título", "#### subtítulo" e linhas de tabela "| a | b".
import { esc } from './util.js';

const inline = (t) => esc(t)
  .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
  .replace(/(^|\s)_([^_]+)_(?=\s|$|[.,;:])/g, '$1<i>$2</i>');

export function md(text) {
  if (!text) return '';
  const out = [];
  for (const block of String(text).split(/\n\n+/)) {
    const lines = block.split('\n');
    if (lines.every((l) => l.startsWith('| '))) {
      out.push('<div class="mdtable"><table>' + lines.map((l) =>
        '<tr>' + l.slice(2).split(' | ').map((c) => `<td>${inline(c)}</td>`).join('') + '</tr>').join('') + '</table></div>');
      continue;
    }
    for (const l of lines) {
      if (l.startsWith('#### ')) out.push(`<h5>${inline(l.slice(5))}</h5>`);
      else if (l.startsWith('### ')) out.push(`<h4>${inline(l.slice(4))}</h4>`);
      else if (l.startsWith('| ')) out.push('<div class="mdtable"><table><tr>' + l.slice(2).split(' | ').map((c) => `<td>${inline(c)}</td>`).join('') + '</tr></table></div>');
      else if (l.startsWith('• ')) out.push(`<p class="bullet">${inline(l)}</p>`);
      else out.push(`<p>${inline(l)}</p>`);
    }
  }
  return `<div class="md">${out.join('')}</div>`;
}

/** Busca sem acento/maiúsculas. */
export const norm = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
