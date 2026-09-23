// Escudo do Mestre — painel da campanha (computador/tablet).
import { getBackend } from '../firebase/backend.js';
import { loadCompendium } from '../compendium/loader.js';
import { ABILITIES, derive, fmt } from '../core/rules.js';
import { hpAction } from '../ui/hp-actions.js';
import { $, esc, store, toast, CONDITIONS, COND_LABEL } from '../ui/util.js';
import { requireLogin, accountChip, bindLogout } from '../ui/auth.js';

const app = $('#app');
const S = { be: null, comp: null, user: null, cid: null, camp: null, chars: [], open: new Set(), inputs: {}, off: [] };
const lastKey = () => `rpgmesa:dm-last:${S.user.uid}`;
const stopAll = () => { S.off.forEach((f) => f()); S.off = []; };

init().catch((e) => { app.innerHTML = `<div class="shell"><div class="card">Erro ao iniciar: ${esc(e.message)}</div></div>`; });

async function init() {
  [S.be, S.comp] = await Promise.all([getBackend(), loadCompendium()]);
  requireLogin(S.be, app, {
    title: 'Escudo do Mestre',
    subtitle: 'Entre com sua conta de Mestre para gerenciar suas campanhas.',
    onSignedOut: () => { stopAll(); S.camp = null; S.cid = null; S.chars = []; },
  }, (user) => {
    S.user = user;
    const last = store.get(lastKey());
    last ? openCampaign(last) : showStart();
  });
}

const demoBanner = () => (S.be.mode === 'local'
  ? '<p class="banner">Modo demo: dados salvos neste navegador. Abra o Grimório em outra aba (com outra conta) para ver a sincronização.</p>' : '');

function showStart() {
  stopAll(); S.camp = null; S.cid = null;
  store.set(lastKey(), null);
  S.off.push(S.be.watchMyCampaigns((list) => {
    const typed = $('#cname')?.value || '';
    list.sort((a, b) => a.name.localeCompare(b.name));
    app.innerHTML = `<div class="shell stack" style="max-width:640px">
      <div class="topbar" style="margin:0"><h1 style="margin:0">Escudo do Mestre</h1>${accountChip(S.user)}</div>${demoBanner()}
      ${list.length ? `<div class="card stack"><h2>Suas campanhas</h2>${list.map((c) =>
        `<button class="btn" style="width:100%;justify-content:space-between" data-open="${c.id}"><span>${esc(c.name)}</span><span class="muted">${esc(c.joinCode)}</span></button>`).join('')}</div>` : ''}
      <form class="card stack" id="f"><h2>Nova campanha</h2>
        <div><label for="cname">Nome da campanha</label><input id="cname" required maxlength="60" placeholder="A Mina Perdida de Phandelver" value="${esc(typed)}" /></div>
        <button class="btn primary">Criar sala</button></form></div>`;
    bindLogout(S.be, app);
    app.querySelectorAll('[data-open]').forEach((b) => (b.onclick = () => openCampaign(b.dataset.open)));
    $('#f').onsubmit = async (e) => {
      e.preventDefault();
      try { const { id } = await S.be.createCampaign($('#cname').value.trim()); openCampaign(id); } catch (err) { toast(err.message); }
    };
  }));
}

function openCampaign(cid) {
  stopAll();
  S.cid = cid; S.camp = null; S.chars = [];
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
}

function render() {
  if (!S.camp) return;
  const players = Object.values(S.camp.members || {}).filter((r) => r === 'player').length;
  app.innerHTML = `<div class="shell">
    <div class="topbar">
      <div><h1 style="margin:0">${esc(S.camp.name)}</h1><span class="muted">${players} jogador(es) na sala · ${S.chars.length} ficha(s)</span></div>
      <div class="row"><span class="muted">Código da sala</span><span class="code" id="code">${esc(S.camp.joinCode)}</span>
        <button class="btn small" id="copy">Copiar</button><button class="btn small" id="back">Campanhas</button>${accountChip(S.user)}</div>
    </div>
    ${demoBanner()}
    ${S.chars.length ? `<div class="party">${S.chars.map(card).join('')}</div>`
      : `<div class="card empty"><h2>Esperando os aventureiros…</h2><p class="muted">Peça para cada jogador entrar no Grimório com a própria conta, abrir o personagem e, na aba <b>Ficha → Mesa</b>, digitar o código <b>${esc(S.camp.joinCode)}</b>.</p></div>`}
  </div>`;
  bindAll();
}

function card(ch) {
  const d = derive(ch, S.comp);
  const { hp, conditions = [], dead, deathSaves: ds = {} } = ch.state;
  const total = hp.max + hp.temp;
  const r = hp.current / hp.max, lvl = r > .5 ? '' : r > .25 ? 'mid' : 'low';
  const slots = Object.entries(ch.state.spellSlots || {});
  const cls = `${d.sp?.nome ?? ''} · ${d.cls?.nome ?? ''} ${d.level}`;
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
    <div class="kv"><div><b>${ch.build.ac ?? 10}</b>CA</div><div><b>${fmt(d.initiative)}</b>Inic.</div><div><b>${d.passivePerception}</b>Perc. pass.</div><div><b>${d.spellDC ?? '—'}</b>CD magia</div></div>
    ${conditions.length ? `<div class="row">${conditions.map((c) => `<button class="chip bad" data-rmcond="${c}" data-id="${ch.id}" title="Remover">${COND_LABEL[c] || c} ✕</button>`).join('')}</div>` : ''}
    ${slots.length ? `<div class="slotrow">${slots.map(([lv, s]) =>
      `<button data-slot="${lv}" data-id="${ch.id}" title="Clique: gastar · Shift+clique: recuperar">${lv}º ${s.max - s.used}/${s.max}</button>`).join('')}</div>` : ''}
    <details class="more" data-more="${ch.id}" ${S.open.has(ch.id) ? 'open' : ''}><summary>Ficha completa</summary>
      <div class="stack" style="margin-top:.5rem">
        <div class="abil">${ABILITIES.map(([k, n]) => `<div><small>${n.slice(0, 3)}</small><b>${fmt(d.mods[k])}</b><small>${ch.build.abilities[k]} · TR ${fmt(d.saves[k])}</small></div>`).join('')}</div>
        <div class="skl">${d.skills.map((s) => `<div>${s.prof ? '●' : '○'} ${s.nome} ${fmt(s.bonus)}</div>`).join('')}</div>
        <select data-addcond="${ch.id}" aria-label="Aplicar condição"><option value="">Aplicar condição…</option>
          ${CONDITIONS.filter((c) => !conditions.includes(c)).map((c) => `<option value="${c}">${COND_LABEL[c] || c}</option>`).join('')}</select>
        ${ch.notes ? `<div><small class="muted">Anotações do jogador</small><div style="white-space:pre-wrap;font-size:.9rem">${esc(ch.notes)}</div></div>` : ''}
        <ul class="log">${(ch.state.log || []).map((l) => `<li>${esc(l)}</li>`).join('')}</ul>
      </div></details>
  </article>`;
}

function bindAll() {
  $('#copy').onclick = () => navigator.clipboard?.writeText(S.camp.joinCode).then(() => toast('Código copiado.'));
  $('#back').onclick = showStart;
  bindLogout(S.be, app);
  const byId = (id) => S.chars.find((c) => c.id === id);
  app.querySelectorAll('[data-amt]').forEach((i) => {
    i.oninput = () => (S.inputs[i.dataset.amt] = i.value);
    i.onkeydown = (e) => { if (e.key === 'Enter') app.querySelector(`[data-hp="${e.shiftKey ? 'cura' : 'dano'}"][data-id="${i.dataset.amt}"]`).click(); };
  });
  app.querySelectorAll('[data-hp]').forEach((b) => (b.onclick = async () => {
    const id = b.dataset.id, n = Number(S.inputs[id]);
    if (!n) return toast('Digite um valor.');
    S.inputs[id] = '';
    const r = await hpAction(S.be, id, b.dataset.hp, n, {}, 'Mestre');
    const ch = byId(id);
    toast(`${ch?.name}: ${r.log.at(-1) ?? ''}${r.concentrationDC && ch?.state.concentration ? ` · Concentração CD ${r.concentrationDC}` : ''}`);
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
