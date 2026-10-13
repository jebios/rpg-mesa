// Abas extras do Escudo: Combate (iniciativa), NPCs, História e Itens.
import { $, esc, toast, uid8 } from '../ui/util.js';
import { derive } from '../core/rules.js';
import { sortOrdem, currentRef, stepTurn, removeCombatant, setInitiative } from '../core/initiative.js';

export const TABS = [
  ['jogadores', '🧑‍🤝‍🧑', 'Jogadores'],
  ['combate', '⚔️', 'Combate'],
  ['npcs', '🎭', 'NPCs'],
  ['historia', '📖', 'História'],
  ['itens', '🎒', 'Itens'],
  ['musica', '🎵', 'Música'],
];

const timers = {};
function debounce(key, fn, ms = 600) {
  clearTimeout(timers[key]);
  timers[key] = setTimeout(fn, ms);
}
const rollD20 = () => Math.floor(Math.random() * 20) + 1;
const safeId = (ref) => ref.replace(':', '_'); // evita ":" em seletores/ids (não é válido em CSS sem escapar)
const norm = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// Reconhece o tipo de link de música colado pelo Mestre.
function ytId(url) {
  const m = String(url || '').match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  return m ? m[1] : null;
}
function spotifyEmbed(url) {
  const m = String(url || '').match(/open\.spotify\.com\/(track|album|playlist|artist)\/([a-zA-Z0-9]+)/);
  return m ? `https://open.spotify.com/embed/${m[1]}/${m[2]}` : null;
}
const isDirectAudio = (url) => /\.(mp3|ogg|wav|m4a|flac)(\?.*)?$/i.test(String(url || ''));
function classifyTrack(url) {
  const vid = ytId(url);
  if (vid) return { tipo: 'youtube', videoId: vid };
  const emb = spotifyEmbed(url);
  if (emb) return { tipo: 'spotify', embedUrl: emb };
  if (isDirectAudio(url)) return { tipo: 'audio' };
  return { tipo: 'link' };
}

// ============================== COMBATE ==============================
export function tabCombate(ctx) {
  const { S } = ctx;
  const combat = S.combat || { ordem: [], turno: 0, rodada: 1 };
  const ordem = combat.ordem || [];

  const resolve = (ref) => {
    if (ref.startsWith('pc:')) {
      const ch = S.chars.find((c) => c.id === ref.slice(3));
      return ch ? { nome: ch.name, tipo: 'pc', ca: derive(ch, S.comp).ac, pv: ch.state.hp.current, pvMax: ch.state.hp.max } : null;
    }
    const n = S.npcs.find((x) => x.id === ref.slice(4));
    return n ? { nome: n.nome, tipo: 'npc', ca: n.ca ?? '—', pv: n.pvAtual ?? 0, pvMax: n.pvMax ?? 0 } : null;
  };

  const inOrdem = new Set(ordem.map((o) => o.ref));
  const addable = [
    ...S.chars.filter((c) => !inOrdem.has('pc:' + c.id)).map((c) => ({ ref: 'pc:' + c.id, nome: c.name, tipo: 'pc' })),
    ...S.npcs.filter((n) => n.tipo === 'combate' && !inOrdem.has('npc:' + n.id)).map((n) => ({ ref: 'npc:' + n.id, nome: n.nome, tipo: 'npc' })),
  ];

  const sorted = sortOrdem(ordem, (o) => resolve(o.ref)).map((o) => ({ ...o, r: resolve(o.ref) }));
  const vezRef = currentRef(combat, (o) => resolve(o.ref));

  return `<div class="stack">
    ${ordem.length ? `<div class="card row" style="justify-content:space-between">
      <div class="row"><b style="font-size:1.1rem">Rodada ${combat.rodada || 1}</b>
        <button class="btn small" id="c-prev">◂ Turno</button><button class="btn small" id="c-next">Turno ▸</button></div>
      <button class="btn small danger" id="c-end">Encerrar combate</button>
    </div>` : ''}
    <div class="card stack">
      <h2>Iniciativa</h2>
      ${sorted.length ? sorted.map((o, idx) => `<div class="row" style="justify-content:space-between;border-bottom:1px solid var(--line);padding:.4rem 0" data-init-row="${o.ref}">
        <div class="row">${o.ref === vezRef ? '<span class="chip" style="border-color:var(--accent);color:var(--accent)">▶ agora</span>' : ''}
          <span>${o.r.tipo === 'npc' ? '🎭' : '🧑'} <b>${esc(o.r.nome)}</b></span></div>
        <div class="row">
          <label class="muted" style="margin:0" for="init-${safeId(o.ref)}">Inic.</label>
          <input id="init-${safeId(o.ref)}" style="width:4rem;min-height:36px;padding:.3rem" type="number" data-initval="${o.ref}" value="${o.iniciativa}" />
          <span class="muted">CA ${o.r.ca ?? '—'}</span>
          ${o.r.tipo === 'npc' ? `<input style="width:4.5rem;min-height:36px;padding:.3rem" type="number" min="0" data-npchp="${o.ref.slice(4)}" value="${o.r.pv}" /><span class="muted">/${o.r.pvMax}</span>`
            : `<span class="muted">${o.r.pv}/${o.r.pvMax} PV</span>`}
          <button class="btn small danger" data-rminit="${o.ref}" title="Remover">✕</button>
        </div></div>`).join('') : '<p class="empty-note">Nenhum combatente na iniciativa ainda.</p>'}
    </div>
    <div class="card stack">
      <h3>Adicionar à iniciativa</h3>
      ${addable.length ? addable.map((a) => `<div class="row" style="justify-content:space-between">
        <span>${a.tipo === 'npc' ? '🎭' : '🧑'} ${esc(a.nome)}</span>
        <div class="row"><input style="width:4rem;min-height:36px;padding:.3rem" type="number" placeholder="d20" id="add-${safeId(a.ref)}" />
        <button class="btn small" data-roll="${a.ref}">🎲</button>
        <button class="btn small primary" data-addinit="${a.ref}">Adicionar</button></div></div>`).join('')
        : '<p class="empty-note">Todos os jogadores e NPCs de combate já estão na lista. Crie mais NPCs na aba NPCs.</p>'}
    </div>
  </div>`;
}

export function bindCombate(ctx) {
  const { S, app, render } = ctx;
  const combat = () => S.combat || { ordem: [], turno: 0, rodada: 1 };
  const save = (patch) => ctx.saveCombat({ ...combat(), ...patch });
  const valid = (o) => (o.ref.startsWith('pc:') ? S.chars.some((c) => c.id === o.ref.slice(3)) : S.npcs.some((x) => x.id === o.ref.slice(4)));

  app.querySelectorAll('[data-roll]').forEach((b) => (b.onclick = () => {
    const input = document.getElementById('add-' + safeId(b.dataset.roll));
    if (input) input.value = rollD20();
  }));
  app.querySelectorAll('[data-addinit]').forEach((b) => (b.onclick = () => {
    const ref = b.dataset.addinit;
    const input = document.getElementById('add-' + safeId(ref));
    const val = Number(input?.value);
    if (!val && val !== 0) return toast('Digite ou role a iniciativa.');
    const c = combat();
    const pin = !c.turnoRef && (c.turno || 0) > 0 ? { turnoRef: currentRef(c, valid) } : {}; // combate antigo em andamento: fixa de quem é a vez
    save({ ordem: [...(c.ordem || []), { ref, iniciativa: val }], ...pin });
  }));
  app.querySelectorAll('[data-rminit]').forEach((b) => (b.onclick = () => {
    save(removeCombatant(combat(), b.dataset.rminit, valid));
  }));
  app.querySelectorAll('[data-initval]').forEach((i) => (i.onchange = () => {
    save(setInitiative(combat(), i.dataset.initval, Number(i.value) || 0, valid));
  }));
  app.querySelectorAll('[data-npchp]').forEach((i) => (i.onchange = () => {
    ctx.updateNpc(i.dataset.npchp, { pvAtual: Math.max(0, Number(i.value) || 0) });
  }));
  $('#c-prev') && ($('#c-prev').onclick = () => save(stepTurn(combat(), -1, valid)));
  $('#c-next') && ($('#c-next').onclick = () => save(stepTurn(combat(), 1, valid)));
  $('#c-end') && ($('#c-end').onclick = () => { if (confirm('Encerrar o combate e limpar a iniciativa?')) save({ ordem: [], turno: 0, turnoRef: null, rodada: 1 }); });
}

// ================================ NPCs ================================
export function tabNpcs(ctx) {
  const { S } = ctx;
  const list = (tipo) => S.npcs.filter((n) => n.tipo === tipo);
  const row = (n) => `<details class="entry" data-k="npc-${n.id}" ${S.openNpc.has(n.id) ? 'open' : ''}>
    <summary><span class="t">${n.tipo === 'combate' ? '⚔️' : '📖'} ${esc(n.nome)}</span>
      <button class="btn small danger addbtn" data-delnpc="${n.id}" title="Excluir">🗑</button></summary>
    <div class="body stack">
      <div><label>Nome</label><input data-npc-f="nome" data-id="${n.id}" value="${esc(n.nome)}" /></div>
      <div><label>Tipo</label><select data-npc-f="tipo" data-id="${n.id}">
        <option value="historia" ${n.tipo === 'historia' ? 'selected' : ''}>História</option>
        <option value="combate" ${n.tipo === 'combate' ? 'selected' : ''}>Combate</option></select></div>
      ${n.tipo === 'combate' ? `<div class="row">
        <div class="grow"><label>CA</label><input type="number" data-npc-f="ca" data-id="${n.id}" value="${n.ca ?? ''}" /></div>
        <div class="grow"><label>PV máx.</label><input type="number" data-npc-f="pvMax" data-id="${n.id}" value="${n.pvMax ?? ''}" /></div>
        <div class="grow"><label>PV atual</label><input type="number" data-npc-f="pvAtual" data-id="${n.id}" value="${n.pvAtual ?? ''}" /></div>
        <div class="grow"><label>Bônus inic.</label><input type="number" data-npc-f="iniciativaBonus" data-id="${n.id}" value="${n.iniciativaBonus ?? ''}" /></div>
      </div>` : ''}
      <div><label>${n.tipo === 'combate' ? 'Ações / notas de combate' : 'Descrição / anotações'}</label>
        <textarea rows="4" data-npc-f="descricao" data-id="${n.id}">${esc(n.descricao || '')}</textarea></div>
    </div></details>`;
  return `<div class="stack">
    <form class="card stack" id="npcnew"><h2>Novo NPC</h2>
      <div class="row">
        <div class="grow"><label for="npc-nome">Nome</label><input id="npc-nome" required maxlength="60" placeholder="Kaelen, o Ferreiro" /></div>
        <div><label for="npc-tipo">Tipo</label><select id="npc-tipo"><option value="historia">História</option><option value="combate">Combate</option></select></div>
      </div>
      <button class="btn primary">Criar NPC</button></form>
    <div class="card stack"><h2>NPCs de história</h2>${list('historia').length ? list('historia').map(row).join('') : '<p class="empty-note">Nenhum NPC de história ainda.</p>'}</div>
    <div class="card stack"><h2>NPCs de combate</h2>${list('combate').length ? list('combate').map(row).join('') : '<p class="empty-note">Nenhum NPC de combate ainda.</p>'}</div>
  </div>`;
}

export function bindNpcs(ctx) {
  const { S, app, render } = ctx;
  $('#npcnew').onsubmit = async (e) => {
    e.preventDefault();
    const nome = $('#npc-nome').value.trim(); if (!nome) return;
    const tipo = $('#npc-tipo').value;
    try {
      await ctx.createNpc({ nome, tipo, ca: null, pvMax: null, pvAtual: null, iniciativaBonus: 0, descricao: '' });
      toast('NPC criado.');
    } catch (err) { toast(err.message); }
  };
  app.querySelectorAll('details.entry[data-k^="npc-"]').forEach((d) => (d.ontoggle = () => {
    const id = d.dataset.k.slice(4);
    d.open ? S.openNpc.add(id) : S.openNpc.delete(id);
  }));
  app.querySelectorAll('summary .addbtn').forEach((b) => b.addEventListener('click', (e) => e.preventDefault()));
  app.querySelectorAll('[data-delnpc]').forEach((b) => (b.onclick = () => {
    if (confirm('Excluir este NPC?')) ctx.deleteNpc(b.dataset.delnpc).catch((err) => toast(err.message));
  }));
  app.querySelectorAll('[data-npc-f]').forEach((el) => {
    const commit = () => {
      const field = el.dataset.npcF, id = el.dataset.id;
      let v = el.value;
      if (['ca', 'pvMax', 'pvAtual', 'iniciativaBonus'].includes(field)) v = v === '' ? null : Number(v);
      ctx.updateNpc(id, { [field]: v }).catch((err) => toast(err.message));
    };
    if (el.tagName === 'SELECT') el.onchange = () => { commit(); render(); };
    else if (el.tagName === 'TEXTAREA') el.oninput = () => debounce('npc-' + el.dataset.id + '-' + el.dataset.npcF, commit, 700);
    else el.onchange = commit;
  });
}

// =============================== HISTÓRIA ===============================
export function tabHistoria(ctx) {
  const texto = ctx.S.story?.texto || '';
  return `<div class="card stack">
    <h2>Anotações da campanha</h2>
    <p class="muted" style="margin:0">Escreva a história, resumos de sessão e lembretes. Só você vê esta aba.</p>
    <textarea id="story-txt" rows="18" placeholder="Sessão 1 — os aventureiros chegam a Vale Sombrio...">${esc(texto)}</textarea>
    <p class="muted" id="story-status" style="margin:0;font-size:.82rem">Salva automaticamente.</p>
  </div>`;
}
export function bindHistoria(ctx) {
  const ta = $('#story-txt');
  ta.oninput = () => {
    $('#story-status').textContent = 'Salvando…';
    debounce('story', () => ctx.saveDmDoc('notas', { texto: ta.value }).then(() => { const s = $('#story-status'); if (s) s.textContent = 'Salvo.'; }), 700);
  };
}

// ================================ ITENS ================================
const slug = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const COMUNS_CATS = ['Armas', 'Armaduras', 'Recipientes', 'Luz e Fogo', 'Comida e Bebida', 'Ferramentas de Ofício', 'Kits e Instrumentos', 'Pacotes de Aventureiro'];

export function tabItens(ctx) {
  const { S } = ctx;
  const itens = S.itemLib?.itens || [];
  const row = (it) => `<details class="entry" data-k="item-${it.id}" ${S.openNpc.has('i' + it.id) ? 'open' : ''}>
    <summary><span class="t">🎁 ${esc(it.nome)}</span><span class="muted lvl-badge">${esc(it.peso || '')}</span>
      <button class="btn small danger addbtn" data-delitem="${it.id}" title="Excluir">🗑</button></summary>
    <div class="body stack">
      ${it.descricao ? `<p style="margin:0;white-space:pre-wrap">${esc(it.descricao)}</p>` : ''}
      <div class="row">
        <div class="grow"><label for="give-p-${it.id}">Dar para</label>
          <select id="give-p-${it.id}">${S.chars.length ? S.chars.map((c) => `<option value="${c.id}">${esc(c.name)}</option>`).join('') : '<option value="">Nenhum jogador na mesa</option>'}</select></div>
        <div><label for="give-q-${it.id}">Qtd.</label><input id="give-q-${it.id}" type="number" min="1" value="1" style="width:4.5rem" /></div>
        <button class="btn small primary addbtn" data-give="${it.id}" style="align-self:end">Entregar</button>
      </div>
    </div></details>`;

  const q = norm(S.comunsQ || ''), cat = S.comunsCat || 'all';
  const comuns = (S.itensComuns || []).filter((it) =>
    (cat === 'all' || it.categoria === cat) && (!q || norm(it.nome).includes(q)));
  const jaTem = new Set(itens.map((it) => slug(it.nome)));
  const comunsRow = (it) => {
    const has = jaTem.has(slug(it.nome));
    return `<div class="libitem">
      <div class="info"><span>${esc(it.nome)}</span>
        <small>${[it.categoria, it.peso, it.preco].filter(Boolean).join(' · ')}${it.descricao ? ' — ' + esc(it.descricao) : ''}</small></div>
      <button class="btn small ${has ? '' : 'primary'}" data-addcommon="${slug(it.nome)}" ${has ? 'disabled title="Já está na sua lista"' : ''}>${has ? '✓' : '+'}</button>
    </div>`;
  };

  return `<div class="stack">
    <form class="card stack" id="itemnew"><h2>Criar item</h2>
      <div><label for="it-nome">Nome</label><input id="it-nome" required maxlength="60" placeholder="Amuleto da Maré Calma" /></div>
      <div class="row">
        <div class="grow"><label for="it-peso">Peso</label><input id="it-peso" placeholder="0,2 kg" /></div>
      </div>
      <div><label for="it-desc">Descrição</label><textarea id="it-desc" rows="3" placeholder="O que o item faz, raridade, propriedades..."></textarea></div>
      <button class="btn primary">Criar item</button></form>
    <div class="card stack"><h2>Itens do Mestre</h2>${itens.length ? itens.map(row).join('') : '<p class="empty-note">Nenhum item criado ainda. Itens do compêndio (armas, armaduras...) os jogadores já podem adicionar sozinhos pela biblioteca do Grimório.</p>'}</div>
    <div class="card stack">
      <div class="sectiontitle"><h2 style="margin:0">📋 Itens comuns</h2><span class="muted lvl-badge">Escudo do Mestre — clique + para adicionar à sua lista</span></div>
      <input id="comuns-q" placeholder="Buscar (mochila, tocha, pacote...)" value="${esc(S.comunsQ || '')}" />
      <div class="filters">
        <button aria-pressed="${cat === 'all'}" data-comuns-cat="all">Todas</button>
        ${COMUNS_CATS.map((c) => `<button aria-pressed="${cat === c}" data-comuns-cat="${esc(c)}">${esc(c)}</button>`).join('')}
      </div>
      ${comuns.length ? comuns.map(comunsRow).join('') : '<p class="empty-note">Nenhum item comum encontrado com esse filtro.</p>'}
    </div>
  </div>`;
}
export function bindItens(ctx) {
  const { S, app, render } = ctx;
  $('#itemnew').onsubmit = async (e) => {
    e.preventDefault();
    const nome = $('#it-nome').value.trim(); if (!nome) return;
    const item = { id: uid8(), nome, peso: $('#it-peso').value.trim(), descricao: $('#it-desc').value.trim() };
    const itens = [...(S.itemLib?.itens || []), item];
    try { await ctx.saveDmDoc('itens', { itens }); toast('Item criado.'); } catch (err) { toast(err.message); }
  };
  $('#comuns-q').oninput = () => { S.comunsQ = $('#comuns-q').value; debounce('comuns-q', render, 300); };
  app.querySelectorAll('[data-comuns-cat]').forEach((b) => (b.onclick = () => { S.comunsCat = b.dataset.comunsCat; render(); }));
  app.querySelectorAll('[data-addcommon]').forEach((b) => (b.onclick = async () => {
    const it = (S.itensComuns || []).find((x) => slug(x.nome) === b.dataset.addcommon);
    if (!it) return;
    if ((S.itemLib?.itens || []).some((x) => slug(x.nome) === slug(it.nome))) return;
    const descricao = [it.preco ? `Preço de referência: ${it.preco}.` : '', it.descricao || ''].filter(Boolean).join(' ');
    const item = { id: uid8(), nome: it.nome, peso: it.peso || '', descricao };
    const itens = [...(S.itemLib?.itens || []), item];
    try { await ctx.saveDmDoc('itens', { itens }); toast(`"${it.nome}" adicionado à sua lista.`); } catch (err) { toast(err.message); }
  }));
  app.querySelectorAll('summary .addbtn').forEach((b) => b.addEventListener('click', (e) => e.preventDefault()));
  app.querySelectorAll('[data-delitem]').forEach((b) => (b.onclick = () => {
    const itens = (S.itemLib?.itens || []).filter((it) => it.id !== b.dataset.delitem);
    ctx.saveDmDoc('itens', { itens }).catch((err) => toast(err.message));
  }));
  app.querySelectorAll('[data-give]').forEach((b) => (b.onclick = async () => {
    const it = (S.itemLib?.itens || []).find((x) => x.id === b.dataset.give);
    const sel = document.getElementById('give-p-' + it.id), qtyEl = document.getElementById('give-q-' + it.id);
    const chId = sel?.value; if (!chId) return toast('Escolha um jogador na mesa.');
    const qtd = Math.max(1, Number(qtyEl?.value) || 1);
    const ch = S.chars.find((c) => c.id === chId);
    const novo = { uid: 'mestre-' + uid8(), itemId: null, nome: it.nome, qtd, peso: it.peso || '0 kg', equipado: false, sintonizado: false, notas: it.descricao || '' };
    try {
      // transação: lê o inventário atual no servidor e acrescenta, sem apagar edição simultânea do jogador
      await S.be.mutateCharacter(chId, (cur) => ({ inventory: [...(cur.inventory || []), novo] }));
      toast(`${it.nome} entregue para ${ch.name}.`);
    } catch (err) { toast(err.message); }
  }));
}

// =============================== MÚSICA ===============================
const CAT_ORDEM = ['Tensão', 'Batalha', 'Taverna', 'Livre'];
export function tabMusica(ctx) {
  const { S } = ctx;
  const faixas = S.music?.faixas || [];
  const cats = [...new Set(faixas.map((f) => f.categoria || 'Livre'))];
  const sortedCats = [...CAT_ORDEM.filter((c) => cats.includes(c)), ...cats.filter((c) => !CAT_ORDEM.includes(c))];
  const np = S.nowPlaying;
  return `<div class="stack">
    <div class="card stack">
      <h2>🎵 Tocando agora</h2>
      ${np ? `<div class="row" style="justify-content:space-between">
        <div><b>${esc(np.nome)}</b><div class="muted" style="font-size:.85rem">${esc(np.categoria || '')} · o player fica fixo no canto da tela, em qualquer aba</div></div>
        <button class="btn small danger" id="m-stop">Parar</button>
      </div>` : '<p class="empty-note">Nada tocando. Escolha uma faixa na lista abaixo.</p>'}
    </div>
    <form class="card stack" id="musnew"><h2>Adicionar música</h2>
      <div><label for="mus-nome">Nome</label><input id="mus-nome" required maxlength="60" placeholder="Combate — orquestra épica" /></div>
      <div><label for="mus-cat">Categoria</label><input id="mus-cat" list="mus-cats" placeholder="Livre" />
        <datalist id="mus-cats"><option value="Tensão"><option value="Batalha"><option value="Taverna"><option value="Livre"></datalist></div>
      <div><label for="mus-url">Link (YouTube, Spotify ou áudio direto .mp3/.ogg)</label><input id="mus-url" required placeholder="https://www.youtube.com/watch?v=..." /></div>
      <button class="btn primary">Adicionar</button></form>
    ${sortedCats.length ? sortedCats.map((cat) => `<div class="card stack"><h2>${esc(cat)}</h2>
      ${faixas.filter((f) => (f.categoria || 'Livre') === cat).map((f) => `<div class="row" style="justify-content:space-between;border-bottom:1px solid var(--line);padding:.4rem 0">
        <span>${{ youtube: '📺', spotify: '🟢', audio: '🎧', link: '🔗' }[f.tipo] || '🎵'} ${esc(f.nome)}</span>
        <div class="row"><button class="btn small primary" data-play="${f.id}">▶</button><button class="btn small danger" data-delmus="${f.id}">🗑</button></div>
      </div>`).join('')}
    </div>`).join('') : '<div class="card"><p class="empty-note">Nenhuma música ainda. Cole um link do YouTube (ex.: "tavern ambience 1 hour"), do Spotify ou um .mp3 direto.</p></div>'}
  </div>`;
}

export function bindMusica(ctx) {
  const { S, app, render } = ctx;
  $('#musnew').onsubmit = async (e) => {
    e.preventDefault();
    const nome = $('#mus-nome').value.trim(), url = $('#mus-url').value.trim();
    const categoria = $('#mus-cat').value.trim() || 'Livre';
    if (!nome || !url) return;
    const faixa = { id: uid8(), nome, categoria, url, ...classifyTrack(url) };
    if (faixa.tipo === 'link' && !confirm('Não consegui reconhecer este link como YouTube, Spotify ou áudio direto. Adicionar mesmo assim? (vai abrir em outra aba ao tocar)')) return;
    const faixas = [...(S.music?.faixas || []), faixa];
    try { await ctx.saveDmDoc('musicas', { faixas }); toast('Música adicionada.'); } catch (err) { toast(err.message); }
  };
  app.querySelectorAll('[data-play]').forEach((b) => (b.onclick = () => {
    const f = (S.music?.faixas || []).find((x) => x.id === b.dataset.play);
    if (!f) return;
    if (f.tipo === 'link') { window.open(f.url, '_blank', 'noopener'); return; }
    S.nowPlaying = f; render();
  }));
  $('#m-stop') && ($('#m-stop').onclick = () => { S.nowPlaying = null; render(); });
  app.querySelectorAll('[data-delmus]').forEach((b) => (b.onclick = () => {
    const faixas = (S.music?.faixas || []).filter((f) => f.id !== b.dataset.delmus);
    if (S.nowPlaying?.id === b.dataset.delmus) S.nowPlaying = null;
    ctx.saveDmDoc('musicas', { faixas }).catch((err) => toast(err.message));
  }));
}
