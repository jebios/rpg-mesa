// Escudo do Mestre — painel da campanha (computador/tablet).
import { getBackend } from '../firebase/backend.js';
import { loadCompendium, validateCompendium } from '../compendium/loader.js';
import { loadItensComuns } from './itens-comuns.js';
import { ABILITIES, derive, fmt, classesLabel } from '../core/rules.js';
import { hpAction } from '../ui/hp-actions.js';
import { $, esc, store, toast, preserveFocus, setPath, skipRerenderWhileTyping, CONDITIONS, COND_LABEL } from '../ui/util.js';
import { requireLogin, accountChip, bindLogout } from '../ui/auth.js';
import {
  TABS, tabCombate, bindCombate, tabNpcs, bindNpcs, tabHistoria, bindHistoria, tabItens, bindItens, tabMusica, bindMusica,
} from './tabs.js';

const app = $('#app');
const S = {
  be: null, comp: null, itensComuns: [], user: null, cid: null, camp: null, chars: [], npcs: [], story: null, combat: null, itemLib: null, music: null, nowPlaying: null,
  tab: 'jogadores', open: new Set(), openNpc: new Set(), inputs: {}, off: [], comunsQ: '', comunsCat: 'all',
};
const lastKey = () => `rpgmesa:dm-last:${S.user.uid}`;
const stopAll = () => { S.off.forEach((f) => f()); S.off = []; };

init().catch((e) => { app.innerHTML = `<div class="shell"><div class="card">Erro ao iniciar: ${esc(e.message)}</div></div>`; });

async function init() {
  S.be = await getBackend();
  requireLogin(S.be, app, {
    title: 'Escudo do Mestre',
    subtitle: 'Entre com sua conta de Mestre para gerenciar suas campanhas.',
    onSignedOut: () => { stopAll(); S.camp = null; S.cid = null; S.chars = []; S.nowPlaying = null; syncMusicBar(); },
  }, async (user) => {
    S.user = user;
    app.innerHTML = '<p class="muted" style="padding:1rem">Carregando compêndio…</p>';
    [S.comp, S.itensComuns] = await Promise.all([loadCompendium(S.be), loadItensComuns()]);
    const last = store.get(lastKey());
    last ? openCampaign(last) : showStart();
  });
}

const demoBanner = () => (S.be.mode === 'local'
  ? '<p class="banner">Modo demo: dados salvos neste navegador. Abra o Grimório em outra aba (com outra conta) para ver a sincronização.</p>' : '');

function showStart() {
  stopAll(); S.camp = null; S.cid = null; S.nowPlaying = null; syncMusicBar();
  store.set(lastKey(), null);
  S.off.push(S.be.watchMyCampaigns((list) => {
    const typed = $('#cname')?.value || '';
    list.sort((a, b) => a.name.localeCompare(b.name));
    app.innerHTML = `<div class="shell stack" style="max-width:640px">
      <div class="topbar" style="margin:0"><h1 style="margin:0">Escudo do Mestre</h1>
        <div class="row"><a class="btn small" href="./grimorio.html" title="Ir para o Grimório do Aventureiro">📜 Grimório</a>${accountChip(S.user)}</div></div>${demoBanner()}
      ${list.length ? `<div class="card stack"><h2>Suas campanhas</h2>${list.map((c) =>
        `<button class="btn" style="width:100%;justify-content:space-between" data-open="${c.id}"><span>${esc(c.name)}</span><span class="muted">${esc(c.joinCode)}</span></button>`).join('')}</div>` : ''}
      <section class="card stack"><h2>Compêndio de regras</h2>
        <p style="margin:0">${S.comp.completo
          ? `Carregado: <b>${S.comp.spells.length}</b> magias, <b>${S.comp.feats.length}</b> talentos, <b>${S.comp.classes.length}</b> classes, <b>${S.comp.species.length}</b> espécies, <b>${S.comp.backgrounds.length}</b> antecedentes, <b>${S.comp.items.length}</b> itens.`
          : 'Ainda não importado — os jogadores veem só uma amostra.'}</p>
        <label class="btn" style="width:100%">📂 Importar compendio.json<input id="compfile" type="file" accept=".json,application/json" hidden></label>
        <p class="muted" style="margin:0;font-size:.85rem">O compêndio fica no Firebase, visível só para quem faz login. Não vai para o GitHub.</p>
      </section>
      <form class="card stack" id="f"><h2>Nova campanha</h2>
        <div><label for="cname">Nome da campanha</label><input id="cname" required maxlength="60" placeholder="A Mina Perdida de Phandelver" value="${esc(typed)}" /></div>
        <button class="btn primary">Criar sala</button></form></div>`;
    bindLogout(S.be, app);
    app.querySelectorAll('[data-open]').forEach((b) => (b.onclick = () => openCampaign(b.dataset.open)));
    $('#compfile').onchange = async (e) => {
      const file = e.target.files[0]; if (!file) return;
      try {
        const obj = JSON.parse(await file.text());
        const n = validateCompendium(obj);
        toast('Importando compêndio…');
        await S.be.saveCompendium(obj);
        S.comp = await loadCompendium(S.be, { force: true });
        toast(`Compêndio importado: ${n.magias} magias, ${n.talentos} talentos, ${n.classes} classes.`);
        showStart();
      } catch (err) {
        toast(/permission|insufficient/i.test(err.message) ? 'Sem permissão: só a conta de administrador pode importar o compêndio.' : 'Erro: ' + err.message);
      }
    };
    $('#f').onsubmit = async (e) => {
      e.preventDefault();
      try { const { id } = await S.be.createCampaign($('#cname').value.trim()); openCampaign(id); } catch (err) { toast(err.message); }
    };
  }));
}

function openCampaign(cid) {
  stopAll();
  S.cid = cid; S.camp = null; S.chars = []; S.npcs = []; S.story = null; S.combat = null; S.itemLib = null; S.music = null; S.nowPlaying = null; S.tab = 'jogadores';
  store.set(lastKey(), cid);
  S.off.push(S.be.watchCampaign(cid, (c) => {
    if (!c || c.dmUid !== S.user.uid) return showStart();
    S.camp = c; render();
  }));
  S.off.push(S.be.watchPartyCharacters(cid, (list) => {
    const before = Object.fromEntries(S.chars.map((c) => [c.id, c.state.hp.current + c.state.hp.temp]));
    S.chars = list.sort((a, b) => a.name.localeCompare(b.name));
    render();
    list.forEach((c) => {
      const b = before[c.id], now = c.state.hp.current + c.state.hp.temp;
      if (b != null && b !== now) document.querySelector(`[data-pc="${c.id}"]`)?.classList.add(now < b ? 'flash-dmg' : 'flash-heal');
    });
  }));
  S.off.push(S.be.watchNpcs(cid, (list) => { S.npcs = list.sort((a, b) => a.nome.localeCompare(b.nome)); render(); }));
  S.off.push(S.be.watchDmDoc(cid, 'notas', (doc) => { S.story = doc || { texto: '' }; render(); }));
  S.off.push(S.be.watchDmDoc(cid, 'itens', (doc) => { S.itemLib = doc || { itens: [] }; render(); }));
  S.off.push(S.be.watchCombat(cid, (doc) => { S.combat = doc || { ordem: [], turno: 0, rodada: 1 }; render(); }));
  S.off.push(S.be.watchDmDoc(cid, 'musicas', (doc) => { S.music = doc || { faixas: [] }; render(); }));
}

// Contexto compartilhado com as abas extras (tabs.js)
const ctx = {
  get S() { return S; }, app,
  render: () => render(),
  toast,
  createNpc: (data) => S.be.createNpc(S.cid, data),
  updateNpc: (id, patch) => S.be.updateNpc(S.cid, id, patch),
  deleteNpc: (id) => S.be.deleteNpc(S.cid, id),
  saveDmDoc: (docId, data) => S.be.saveDmDoc(S.cid, docId, data),
  saveCombat: (data) => S.be.saveCombat(S.cid, data),
};

// Player de música fixo, fora do #app: assim ele não é recriado (e a música não reinicia)
// toda vez que outra coisa muda na campanha e a tela é redesenhada.
let playingId = null;
function musicBar() {
  let bar = document.getElementById('music-bar');
  if (!bar) { bar = document.createElement('div'); bar.id = 'music-bar'; document.body.appendChild(bar); }
  return bar;
}
function syncMusicBar() {
  const bar = musicBar();
  const np = S.nowPlaying;
  if (!np) { bar.classList.remove('show'); bar.innerHTML = ''; playingId = null; return; }
  if (playingId === np.id) return; // mesma faixa: não recriar o player
  playingId = np.id;
  bar.classList.add('show');
  let media = '';
  if (np.tipo === 'youtube') media = `<iframe src="https://www.youtube.com/embed/${np.videoId}?autoplay=1&controls=1" allow="autoplay" style="width:200px;height:60px;border:0;border-radius:8px" title="Player"></iframe>`;
  else if (np.tipo === 'spotify') media = `<iframe src="${esc(np.embedUrl)}?utm_source=generator" width="260" height="80" style="border:0;border-radius:8px" allow="autoplay; encrypted-media" title="Player"></iframe>`;
  else if (np.tipo === 'audio') media = `<audio src="${esc(np.url)}" autoplay loop controls style="width:220px"></audio>`;
  bar.innerHTML = `<div class="row" style="align-items:center;gap:.6rem;flex-wrap:nowrap">
    <div style="min-width:0"><b style="display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:140px">${esc(np.nome)}</b><span class="muted" style="font-size:.78rem">${esc(np.categoria || '')}</span></div>
    ${media}<button class="btn small danger" id="mb-stop">✕</button></div>`;
  $('#mb-stop', bar).onclick = () => { S.nowPlaying = null; render(); };
}

function render() {
  if (!S.camp) { syncMusicBar(); return; }
  if (skipRerenderWhileTyping(render)) return;
  const players = Object.values(S.camp.members || {}).filter((r) => r === 'player').length;
  preserveFocus(() => {
    app.innerHTML = `<div class="shell">
      <div class="topbar">
        <div><h1 style="margin:0">${esc(S.camp.name)}</h1><span class="muted">${players} jogador(es) na sala · ${S.chars.length} ficha(s)</span></div>
        <div class="row"><span class="muted">Código da sala</span><span class="code" id="code">${esc(S.camp.joinCode)}</span>
          <button class="btn small" id="copy">Copiar</button><button class="btn small" id="back">Campanhas</button>
          <a class="btn small" href="./grimorio.html" title="Ir para o Grimório do Aventureiro">📜</a>${accountChip(S.user)}</div>
      </div>
      ${demoBanner()}
      <nav class="filters" role="tablist" style="margin-bottom:.75rem">${TABS.map(([id, ico, n]) =>
        `<button role="tab" aria-pressed="${S.tab === id}" data-tab="${id}">${ico} ${n}</button>`).join('')}</nav>
      ${body()}
    </div>`;
    $('#copy').onclick = () => navigator.clipboard?.writeText(S.camp.joinCode).then(() => toast('Código copiado.'));
    $('#back').onclick = showStart;
    bindLogout(S.be, app);
    app.querySelectorAll('[data-tab]').forEach((b) => (b.onclick = () => { S.tab = b.dataset.tab; render(); }));
    bindBody();
  });
  syncMusicBar();
}

function body() {
  if (S.tab === 'combate') return tabCombate(ctx);
  if (S.tab === 'npcs') return tabNpcs(ctx);
  if (S.tab === 'historia') return tabHistoria(ctx);
  if (S.tab === 'itens') return tabItens(ctx);
  if (S.tab === 'musica') return tabMusica(ctx);
  return S.chars.length ? `<div class="party">${S.chars.map(card).join('')}</div>`
    : `<div class="card empty"><h2>Esperando os aventureiros…</h2><p class="muted">Peça para cada jogador entrar no Grimório com a própria conta, abrir o personagem e, na aba <b>Ficha → Mesa</b>, digitar o código <b>${esc(S.camp.joinCode)}</b>.</p></div>`;
}

function bindBody() {
  if (S.tab === 'combate') return bindCombate(ctx);
  if (S.tab === 'npcs') return bindNpcs(ctx);
  if (S.tab === 'historia') return bindHistoria(ctx);
  if (S.tab === 'itens') return bindItens(ctx);
  if (S.tab === 'musica') return bindMusica(ctx);
  bindJogadores();
}

function card(ch) {
  const d = derive(ch, S.comp);
  const { hp, conditions = [], dead, deathSaves: ds = {} } = ch.state;
  const total = hp.max + hp.temp;
  const r = hp.current / hp.max, lvl = r > .5 ? '' : r > .25 ? 'mid' : 'low';
  const slots = Object.entries(ch.state.spellSlots || {});
  const cls = `${d.speciesLabel} · ${classesLabel(ch.build, S.comp)}`;
  return `<article class="card pc stack ${dead ? 'dead' : hp.current === 0 ? 'down' : ''}" data-pc="${ch.id}">
    <div><h3>${esc(ch.name)}</h3><div class="meta">${esc(cls)} · jogador: ${esc(ch.ownerName || '—')}</div></div>
    <div class="hpline"><span><b>${hp.current}</b> / ${hp.max} PV ${hp.temp ? `<span style="color:var(--temp)">+${hp.temp}</span>` : ''}</span>
      ${dead ? '<span class="chip bad">MORTO</span>' : hp.current === 0 ? `<span class="chip bad">Caído · ✓${ds.success || 0} ✗${ds.fail || 0}</span>` : ''}</div>
    <div class="hpbar"><div class="cur ${lvl}" style="width:${(hp.current / total) * 100}%"></div><div class="tmp" style="width:${(hp.temp / total) * 100}%"></div></div>
    <div class="ctl">
      <input type="number" inputmode="numeric" min="0" placeholder="0" aria-label="Valor para ${esc(ch.name)}" data-amt="${ch.id}" value="${esc(S.inputs[ch.id] || '')}" />
      <button class="btn danger" data-hp="dano" data-id="${ch.id}" title="Dano">−</button>
      <button class="btn heal" data-hp="cura" data-id="${ch.id}" title="Cura">+</button>
      <button class="btn temp" data-hp="temp" data-id="${ch.id}" title="PV temporário">T</button>
    </div>
    <div class="kv"><div><b>${d.ac}</b>CA</div><div><b>${fmt(d.initiative)}</b>Inic.</div><div><b>${d.passivePerception}</b>Perc. pass.</div><div><b>${d.spellDC ?? '—'}</b>CD magia</div></div>
    ${d.fx.lista.length ? `<div class="row">${d.fx.lista.map((e) => `<span class="chip">${esc(e.nome)}${e.rounds != null ? ` · ${e.rounds}r` : ''}</span>`).join('')}</div>` : ''}
    ${conditions.length ? `<div class="row">${conditions.map((c) => `<button class="chip bad" data-rmcond="${c}" data-id="${ch.id}" title="Remover">${COND_LABEL[c] || c} ✕</button>`).join('')}</div>` : ''}
    ${slots.length ? `<div class="slotrow">${slots.map(([lv, s]) =>
      `<button data-slot="${lv}" data-id="${ch.id}" title="Clique: gastar · Shift+clique: recuperar">${lv}º ${s.max - s.used}/${s.max}</button>`).join('')}</div>` : ''}
    <details class="more" data-more="${ch.id}" ${S.open.has(ch.id) ? 'open' : ''}><summary>Ficha completa</summary>
      <div class="stack" style="margin-top:.5rem">
        <div class="row"><label for="hpmax-${ch.id}" style="margin:0">PV máximo</label>
          <input id="hpmax-${ch.id}" data-hpmax="${ch.id}" type="number" inputmode="numeric" min="1" style="width:5.5rem" value="${hp.max}" />
          <span class="muted" style="font-size:.8rem">rolado no dado com o jogador</span></div>
        <div class="abil">${ABILITIES.map(([k, n]) => `<div><small>${n.slice(0, 3)}</small><b>${fmt(d.mods[k])}</b><small>${ch.build.abilities[k]} · TR ${fmt(d.saves[k])}</small></div>`).join('')}</div>
        <div class="skl">${d.skills.map((s) => `<div>${s.prof ? '●' : '○'} ${s.nome} ${fmt(s.bonus)}</div>`).join('')}</div>
        <select data-addcond="${ch.id}" aria-label="Aplicar condição"><option value="">Aplicar condição…</option>
          ${CONDITIONS.filter((c) => !conditions.includes(c)).map((c) => `<option value="${c}">${COND_LABEL[c] || c}</option>`).join('')}</select>
        ${(ch.build.feats || []).length ? `<div><small class="muted">Talentos</small><div style="font-size:.88rem">${ch.build.feats.map((f) => esc(S.comp.byId.feats[f.id]?.nome || f.id)).join(', ')}</div></div>` : ''}
        ${(ch.inventory || []).length ? `<div><small class="muted">Inventário</small><div style="font-size:.88rem">${ch.inventory.map((it) => `${it.equipado ? '🛡️' : ''}${esc(it.nome)}${it.qtd > 1 ? ' ×' + it.qtd : ''}`).join(', ')}</div></div>` : ''}
        <div><small class="muted">Moedas</small><div style="font-size:.88rem">${['pl', 'po', 'pe', 'pp', 'pc'].map((k) => `${Number(ch.coins?.[k]) || 0} ${k.toUpperCase()}`).join(' · ')}</div></div>
        ${ch.notes ? `<div><small class="muted">Anotações do jogador</small><div style="white-space:pre-wrap;font-size:.9rem">${esc(ch.notes)}</div></div>` : ''}
        <ul class="log">${(ch.state.log || []).map((l) => `<li>${esc(l)}</li>`).join('')}</ul>
      </div></details>
  </article>`;
}

// Aplica na hora, no array local S.chars, o `patch` devolvido por uma ação de PV (hp-actions.js)
// — essas ações rodam numa transação do Firestore, e o listener em tempo real
// (watchPartyCharacters) pode demorar bastante pra refletir a mudança de volta; sem isso, o Mestre
// só via o PV do jogador mudar depois de atualizar a página. Quando o snapshot real chegar depois,
// ele só confirma o mesmo estado.
function applyHpPatchLocal(id, patch) {
  if (!patch) return;
  S.chars = S.chars.map((c) => {
    if (c.id !== id) return c;
    const clone = structuredClone(c);
    Object.entries(patch).forEach(([p, v]) => setPath(clone, p, v));
    return clone;
  });
  render();
}

function bindJogadores() {
  const byId = (id) => S.chars.find((c) => c.id === id);
  app.querySelectorAll('[data-amt]').forEach((i) => {
    i.oninput = () => (S.inputs[i.dataset.amt] = i.value);
    i.onkeydown = (e) => { if (e.key === 'Enter') app.querySelector(`[data-hp="${e.shiftKey ? 'cura' : 'dano'}"][data-id="${i.dataset.amt}"]`).click(); };
  });
  app.querySelectorAll('[data-hp]').forEach((b) => (b.onclick = async () => {
    const id = b.dataset.id, n = Number(S.inputs[id]);
    if (!n) return toast('Digite um valor.');
    S.inputs[id] = '';
    const ch0 = byId(id);
    const r = await hpAction(S.be, id, b.dataset.hp, n, {}, 'Mestre');
    applyHpPatchLocal(id, r.patch);
    toast(`${ch0?.name}: ${r.log.at(-1) ?? ''}${r.concentrationDC && ch0?.state.concentration ? ` · Concentração CD ${r.concentrationDC}` : ''}`);
  }));
  app.querySelectorAll('[data-hpmax]').forEach((i) => (i.onchange = () => {
    const ch = byId(i.dataset.hpmax), max = Math.max(1, Number(i.value) || 1);
    S.be.updateCharacter(ch.id, { 'state.hp': { ...ch.state.hp, max, current: Math.min(ch.state.hp.current, max) } });
  }));
  app.querySelectorAll('[data-slot]').forEach((b) => (b.onclick = (e) => {
    const ch = byId(b.dataset.id), lv = b.dataset.slot, s = ch.state.spellSlots[lv];
    const used = e.shiftKey ? Math.max(0, s.used - 1) : Math.min(s.max, s.used + 1);
    S.be.updateCharacter(ch.id, { [`state.spellSlots.${lv}.used`]: used });
  }));
  app.querySelectorAll('[data-rmcond]').forEach((b) => (b.onclick = () => {
    const ch = byId(b.dataset.id);
    S.be.updateCharacter(ch.id, { 'state.conditions': ch.state.conditions.filter((c) => c !== b.dataset.rmcond) });
  }));
  app.querySelectorAll('[data-addcond]').forEach((s) => (s.onchange = () => {
    const ch = byId(s.dataset.addcond);
    if (s.value) S.be.updateCharacter(ch.id, { 'state.conditions': [...(ch.state.conditions || []), s.value] });
  }));
  app.querySelectorAll('[data-more]').forEach((d) => (d.ontoggle = () => (d.open ? S.open.add(d.dataset.more) : S.open.delete(d.dataset.more))));
}
