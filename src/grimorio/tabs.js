// Abas da ficha: Ficha, Magias, Traços (classe/subclasse/espécie/antecedente), Talentos, Itens.
import { ABILITIES, COINS, fmt, levelPatch, conHpAdjust, parseWeight, inventoryOf, addClass, removeClass, setClassLevel, setSubclass } from '../core/rules.js';
import { $, esc, toast } from '../ui/util.js';
import { md, norm } from '../ui/md.js';
import { EFFECTS } from '../core/effects.js';

const ABIL_NAME = Object.fromEntries(ABILITIES);
const LIMIT = 40;
const nivelTxt = (n) => (n === 0 ? 'Truque' : `${n}º círculo`);
const uid = () => Math.random().toString(36).slice(2, 9);
const entry = (title, right, body, open = false, extra = '', action = '') =>
  `<details class="entry" ${open ? 'open' : ''} ${extra}><summary><span class="t">${title}</span><span class="row" style="gap:.4rem;flex-wrap:nowrap"><span class="lvl-badge">${right || ''}</span>${action}</span></summary><div class="body">${body}</div></details>`;
const addBtn = (attr, id, label = 'Adicionar') => `<button class="btn small primary addbtn" ${attr}="${id}" aria-label="${label}">+</button>`;

// =========================================================== FICHA
function multiclasseHtml(ch, d, ctx) {
  const S = ctx.S, C = S.comp;
  const taken = new Set(ch.build.classes.map((c) => c.classId));
  const options = C.classes.filter((c) => !taken.has(c.id));
  const extra = d.classesInfo.slice(1); // classes[0] já aparece na seção "Nível"
  return `
  <section class="card stack"><h2>Multiclasse</h2>
    <p class="empty-note" style="margin:0">Nível total: ${d.level}/20. Ao multiclassar, confira na aba Traços quais proficiências a nova classe concede (são menos do que na criação) e ajuste "Treinamento e Proficiências" à mão, se precisar.</p>
    ${extra.length ? extra.map((c) => {
      const subs = c.cls?.subclasses || [];
      return `<div class="row" style="flex-wrap:wrap;gap:.5rem;border-top:1px solid var(--border,#3332);padding-top:.5rem">
        <b class="grow">${esc(c.cls?.nome || c.classId)}</b>
        <div class="row" style="gap:.3rem"><button class="btn small" data-mcdown="${c.classId}" aria-label="Diminuir nível de ${esc(c.cls?.nome || c.classId)}">−</button>
          <span style="min-width:1.4rem;text-align:center">${c.level}</span>
          <button class="btn small" data-mcup="${c.classId}" aria-label="Subir nível de ${esc(c.cls?.nome || c.classId)}">+</button></div>
        ${subs.length ? `<select data-mcsub="${c.classId}" aria-label="Subclasse de ${esc(c.cls?.nome || c.classId)}" ${c.level < 3 ? 'disabled' : ''}>
          <option value="">—</option>${subs.map((s) => `<option value="${s.id}" ${s.id === c.subclassId ? 'selected' : ''}>${esc(s.nome)}</option>`).join('')}</select>` : ''}
        <button class="btn small danger" data-mcrm="${c.classId}">Remover</button>
      </div>`;
    }).join('') : '<p class="empty-note">Personagem de classe única.</p>'}
    ${options.length && d.level < 20 ? `<form class="row" id="addclass">
      <select id="mcnew" class="grow" aria-label="Nova classe">${options.map((c) => `<option value="${c.id}">${esc(c.nome)}</option>`).join('')}</select>
      <button class="btn primary small">+ Adicionar classe</button></form>` : ''}
  </section>`;
}
function multiclasseBind(ch, d, ctx) {
  const S = ctx.S, app = ctx.app;
  app.querySelectorAll('[data-mcup]').forEach((b) => (b.onclick = () => {
    const c = ch.build.classes.find((x) => x.classId === b.dataset.mcup);
    ctx.save(setClassLevel(ch, S.comp, b.dataset.mcup, c.level + 1));
  }));
  app.querySelectorAll('[data-mcdown]').forEach((b) => (b.onclick = () => {
    const c = ch.build.classes.find((x) => x.classId === b.dataset.mcdown);
    if (c.level <= 1) return ctx.toast('Nível mínimo 1 — use "Remover" para tirar a classe.');
    ctx.save(setClassLevel(ch, S.comp, b.dataset.mcdown, c.level - 1));
  }));
  app.querySelectorAll('[data-mcsub]').forEach((s) => (s.onchange = () => ctx.save(setSubclass(ch, S.comp, s.dataset.mcsub, s.value || null))));
  app.querySelectorAll('[data-mcrm]').forEach((b) => (b.onclick = () => {
    if (!ctx.confirmTwice(`[data-mcrm="${b.dataset.mcrm}"]`, 'Toque de novo para remover')) return;
    const p = removeClass(ch, S.comp, b.dataset.mcrm);
    if (p) ctx.save(p);
  }));
  $('#addclass') && ($('#addclass').onsubmit = (e) => {
    e.preventDefault();
    const p = addClass(ch, S.comp, $('#mcnew').value);
    if (p) { ctx.save(p); ctx.toast('Classe adicionada no nível 1.'); }
  });
}

function fichaHtml(ch, d, ctx) {
  const S = ctx.S, lvl = ch.build.classes[0].level, c0 = ch.build.classes[0];
  const subs = d.cls?.subclasses || [];
  const t = ch.build.training || {};
  return `
  <section class="card stack">
    <div class="sectiontitle"><h2 style="margin:0">${d.multiclass ? `${esc(d.cls?.nome || '')} ${lvl}` : `Nível ${lvl}`}</h2>
      <div class="row"><button class="btn small" id="lvldown" aria-label="Diminuir nível">−</button><button class="btn small primary" id="lvlup" aria-label="Subir de nível">+ Nível</button></div></div>
    ${d.multiclass ? `<p class="empty-note" style="margin:0">Classe principal (foi ela que deu o 1º dado de vida cheio). Nível total do personagem: ${d.level}.</p>` : ''}
    ${subs.length ? `<div><label for="subclass">Subclasse${lvl < 3 ? ' (a partir do nível 3)' : ''}</label>
      <select id="subclass" ${lvl < 3 ? 'disabled' : ''}><option value="">—</option>${subs.map((s) => `<option value="${s.id}" ${s.id === c0.subclassId ? 'selected' : ''}>${esc(s.nome)}</option>`).join('')}</select></div>` : ''}
    <div class="stats">
      <div><b>${fmt(d.pb)}</b><small>Proficiência</small></div>
      <div><b>${fmt(d.initiative)}</b><small>Iniciativa</small></div>
      <div><b>${esc(d.speed.replace(' metros', ' m'))}</b><small>Deslocamento</small></div>
      <div><b>${d.passivePerception}</b><small>Perc. passiva</small></div>
    </div>
    ${d.armor ? `<div class="row"><label for="acbonus" style="margin:0">Bônus extra de CA</label>
      <input id="acbonus" type="number" inputmode="numeric" style="width:6rem" value="${Number(ch.build.acBonus) || 0}" /></div>
    <p class="empty-note" style="margin:0">Classe de Armadura <b>${d.ac}</b>, calculada sozinha: ${esc(d.acDetalhe)}. Use o bônus extra para itens mágicos, estilo de luta Defesa etc. (Sem armadura/escudo equipado, vale o número digitado à mão.)</p>`
    : `<div class="row"><label for="ac" style="margin:0">Classe de Armadura</label>
      <input id="ac" type="number" inputmode="numeric" style="width:6rem" value="${ch.build.ac ?? 10}" /></div>`}
    <div class="row"><label for="hpmax" style="margin:0">PV Máximo</label>
      <input id="hpmax" type="number" inputmode="numeric" min="1" style="width:6rem" value="${ch.state.hp.max}" /></div>
    <p class="empty-note" style="margin:0">O PV máximo pode ser ajustado à mão — use o valor rolado no dado com o Mestre. Ao subir de nível, o app só soma o ganho médio da regra a esse valor.</p>
  </section>

  ${multiclasseHtml(ch, d, ctx)}

  <section class="card stack"><h2>Atributos e Salvaguardas</h2>
    <p class="empty-note">Toque em <b>Salvaguarda</b> para marcar/desmarcar proficiência.</p>
    <div class="abil2">${ABILITIES.map(([k, n]) => {
      const prof = (ch.build.saveProfs || []).includes(k);
      return `<div class="abcard">
        <small>${n}</small><b>${fmt(d.mods[k])}</b>
        <input class="abscore" data-score="${k}" type="number" inputmode="numeric" min="1" max="30" value="${ch.build.abilities[k]}" aria-label="Valor de ${n}" />
        <button class="savebtn ${prof ? 'on' : ''}" data-save="${k}" aria-pressed="${prof}">
          <span class="dot ${prof ? 'on' : ''}"></span>Salvaguarda <b>${fmt(d.saves[k])}</b></button>
      </div>`;
    }).join('')}</div>
  </section>

  <section class="card"><h2>Perícias</h2><p class="empty-note">Toque para alternar: sem proficiência → proficiente (●) → especialista (◆).</p>
    <div class="skills">${d.skills.map((s) => `<button data-skill="${s.id}" aria-pressed="${s.prof || s.exp}">
      <span class="row" style="flex-wrap:nowrap"><span class="dot ${s.exp ? 'exp' : s.prof ? 'on' : ''}"></span>${s.nome} <small class="muted">(${s.ab.toUpperCase()})</small></span><b>${fmt(s.bonus)}</b></button>`).join('')}</div>
  </section>

  <section class="card stack"><h2>Treinamento e Proficiências</h2>
    ${[['armaduras', 'Treinamento com Armaduras'], ['armas', 'Proficiência com Armas'], ['ferramentas', 'Proficiência com Ferramentas'], ['idiomas', 'Idiomas']].map(([k, n]) =>
      `<div><label for="tr-${k}">${n}</label><textarea id="tr-${k}" data-train="${k}" rows="2">${esc(t[k] || '')}</textarea></div>`).join('')}
  </section>

  <section class="card stack"><h2>Anotações</h2>
    <textarea id="notes" rows="5" placeholder="Aliados, pistas, história…">${esc(ch.notes)}</textarea></section>

  <section class="card stack"><h2>Mesa</h2>
    ${ch.campaignId
      ? `<p style="margin:0">Jogando em <b>${esc(ch.campaignName)}</b>. O Mestre dessa mesa pode ver e alterar esta ficha.</p>
         <button class="btn" id="leave-table">Sair da mesa</button>`
      : `<p class="muted" style="margin:0">Esta ficha não está em nenhuma mesa. Só você pode vê-la.</p>
         <form class="row" id="join"><input id="code" class="grow" autocomplete="off" autocapitalize="characters" placeholder="Código (ABC-123)" aria-label="Código da mesa" required style="width:auto" />
         <button class="btn primary">Entrar</button></form>`}
  </section>
  <section class="card stack"><h2>Conta</h2>
    <div class="row">${ctx.accountChip(S.user)}</div>
    <button class="btn danger small" id="delete">Apagar personagem</button>
  </section>`;
}

let timers = {};
const debounce = (k, fn, ms = 600) => { clearTimeout(timers[k]); timers[k] = setTimeout(fn, ms); };

function fichaBind(ch, d, ctx) {
  const S = ctx.S, app = ctx.app, lvl0 = ch.build.classes[0].level;
  $("#lvlup").onclick = () => d.level < 20 && ctx.save(levelPatch(ch, S.comp, lvl0 + 1)).then(() => ctx.toast(`Nível ${lvl0 + 1}! PV máximo, Dados de Vida e espaços atualizados.`));
  $("#lvldown").onclick = () => lvl0 > 1 && ctx.save(levelPatch(ch, S.comp, lvl0 - 1));
  $('#subclass') && ($('#subclass').onchange = (e) => ctx.save(levelPatch(ch, S.comp, lvl0, e.target.value || null)));
  multiclasseBind(ch, d, ctx);
  $('#ac') && ($('#ac').onchange = (e) => ctx.save({ 'build.ac': Number(e.target.value) || 10 }));
  $('#acbonus') && ($('#acbonus').onchange = (e) => ctx.save({ 'build.acBonus': Number(e.target.value) || 0 }));
  $('#hpmax').onchange = (e) => {
    const max = Math.max(1, Number(e.target.value) || 1);
    ctx.save({ 'state.hp': { ...ch.state.hp, max, current: Math.min(ch.state.hp.current, max) } });
  };
  app.querySelectorAll('[data-score]').forEach((inp) => (inp.onchange = () => {
    const v = Math.max(1, Math.min(30, Number(inp.value) || 10));
    const k = inp.dataset.score;
    const patch = { [`build.abilities.${k}`]: v };
    if (k === 'con') patch['state.hp'] = { ...ch.state.hp, ...conHpAdjust(ch, S.comp, v) };
    ctx.save(patch);
  }));
  app.querySelectorAll('[data-save]').forEach((b) => (b.onclick = () => {
    const k = b.dataset.save, cur = ch.build.saveProfs || [];
    ctx.save({ 'build.saveProfs': cur.includes(k) ? cur.filter((x) => x !== k) : [...cur, k] });
  }));
  app.querySelectorAll('[data-skill]').forEach((b) => (b.onclick = () => {
    const id = b.dataset.skill, prof = ch.build.skillProfs || [], exp = ch.build.expertise || [];
    if (exp.includes(id)) ctx.save({ 'build.expertise': exp.filter((x) => x !== id), 'build.skillProfs': prof.filter((x) => x !== id) });
    else if (prof.includes(id)) ctx.save({ 'build.expertise': [...exp, id] });
    else ctx.save({ 'build.skillProfs': [...prof, id] });
  }));
  app.querySelectorAll('[data-train]').forEach((ta) => (ta.oninput = () => debounce('tr' + ta.dataset.train, () => ctx.save({ [`build.training.${ta.dataset.train}`]: ta.value }))));
  $('#notes').oninput = (e) => debounce('notes', () => ctx.save({ notes: e.target.value }));
  ctx.bindLogout(S.be, app);
  $('#join') && ($('#join').onsubmit = async (e) => {
    e.preventDefault();
    try {
      const camp = await S.be.joinByCode($('#code').value);
      await S.be.updateCharacter(S.chId, { campaignId: camp.id, campaignName: camp.name });
      ctx.toast(`${ch.name} entrou na mesa ${camp.name}.`);
    } catch (err) { ctx.toast(err.message); }
  });
  $('#leave-table') && ($('#leave-table').onclick = () => {
    if (ctx.confirmTwice('#leave-table', 'Toque de novo para confirmar')) ctx.save({ campaignId: null, campaignName: null });
  });
  $('#delete').onclick = async () => {
    if (!ctx.confirmTwice('#delete', `Toque de novo para apagar ${ch.name}`)) return;
    const id = S.chId; await S.be.deleteCharacter(id); ctx.showHome();
  };
}

// =========================================================== MAGIAS
function magiasHtml(ch, d, ctx) {
  const S = ctx.S, C = S.comp, ui = S.ui;
  const bonusIds = new Set(d.bonusSpells || []);
  const known = (ch.build.spellsKnown || []).filter((id) => !bonusIds.has(id)), prepared = ch.build.spellsPrepared || [];
  const bonusSpells = [...bonusIds].map((id) => C.byId.spells[id]).filter(Boolean).sort((a, b) => a.nivel - b.nivel || a.nome.localeCompare(b.nome));
  const slots = Object.entries(ch.state.spellSlots || {});
  const pactSlots = Object.entries(ch.state.pactSlots || {});
  const maxCircle = [...slots, ...pactSlots].reduce((a, [lv, s]) => (s.max > 0 ? Math.max(a, Number(lv)) : a), 0);
  const hasCaster = d.casters.length > 0;
  const mine = known.map((id) => C.byId.spells[id]).filter(Boolean).sort((a, b) => a.nivel - b.nivel || a.nome.localeCompare(b.nome));
  const byLvl = {};
  mine.forEach((s) => (byLvl[s.nivel] ||= []).push(s));
  const classIds = ch.build.classes.map((c) => c.classId);
  const classNames = d.classesInfo.map((c) => c.cls?.nome).filter(Boolean).join(' + ');
  const cap = d.spellCaps || {};
  const cantripsUsed = mine.filter((s) => s.nivel === 0).length;
  const knownUsed = mine.filter((s) => s.nivel > 0).length;
  const preparedUsed = prepared.length;
  const cantripsFull = cap.cantrips !== null && cantripsUsed >= cap.cantrips;
  const knownFull = cap.known !== null && knownUsed >= cap.known;
  const preparedFull = cap.prepared !== null && preparedUsed >= cap.prepared;
  const q = norm(ui.spellQ);
  let lib = C.spells.filter((s) => !known.includes(s.id) && !bonusIds.has(s.id)
    && (!ui.spellMine || !d.casters.length || s.classes.some((cid) => classIds.includes(cid)))
    && (ui.spellLvl === 'all' || String(s.nivel) === ui.spellLvl)
    && (!q || norm(s.nome).includes(q)));
  const total = lib.length; lib = lib.slice(0, LIMIT);
  const learnBtn = (s) => {
    const blocked = s.nivel === 0 ? cantripsFull : knownFull;
    return blocked
      ? `<button class="btn small" data-learnfull="${s.nivel === 0 ? 'truque' : 'magia'}" aria-label="Limite atingido">+</button>`
      : addBtn('data-learn', s.id, 'Adicionar ' + esc(s.nome));
  };
  const prepBtn = (s) => {
    const isPrep = prepared.includes(s.id);
    const blocked = !isPrep && preparedFull;
    return blocked
      ? `<button class="btn small" data-prepfull="1" aria-label="Limite de magias preparadas atingido">Preparar</button>`
      : `<button class="btn small" data-prep="${s.id}">${isPrep ? '✓ Preparada' : 'Preparar'}</button>`;
  };
  const fxBtn = (id) => (EFFECTS[id] ? ((ch.state.effects || []).some((e) => e.id === id) ? '<span class="chip">Efeito ativo</span>' : `<button class="btn small" data-fx="${id}">Ativar efeito (CA/desloc.)</button>`) : '');
  const spellBody = (s, owned) => `
    <div class="muted" style="font-size:.85rem">${esc(s.escola)} · ${esc(s.tempo)} · ${esc(s.alcance)}<br>${esc(s.componentes)} · ${esc(s.duracao)}</div>
    ${md(s.desc)}
    <div class="row">${owned
      ? `${s.nivel > 0 ? prepBtn(s) : ''}
         ${s.concentracao ? `<button class="btn small" data-conc="${s.id}">${ch.state.concentration === s.id ? 'Encerrar concentração' : 'Concentrar'}</button>` : ''}
         ${fxBtn(s.id)}
         <button class="btn small" data-forget="${s.id}">Remover</button>`
      : ''}</div>`;
  const tags = (s) => [s.concentracao ? 'C' : '', s.ritual ? 'R' : ''].filter(Boolean).map((x) => `<span class="chip">${x}</span>`).join(' ');
  const capBadge = (label, used, max) => max === null ? '' : `<span class="lvl-badge">${used}/${max} ${label}</span>`;
  const bonusBody = (s) => `
    <div class="muted" style="font-size:.85rem">${esc(s.escola)} · ${esc(s.tempo)} · ${esc(s.alcance)}<br>${esc(s.componentes)} · ${esc(s.duracao)}</div>
    ${md(s.desc)}
    ${s.concentracao || EFFECTS[s.id] ? `<div class="row">${s.concentracao ? `<button class="btn small" data-conc="${s.id}">${ch.state.concentration === s.id ? 'Encerrar concentração' : 'Concentrar'}</button>` : ''}${fxBtn(s.id)}</div>` : ''}`;
  return `
  ${d.casters.length ? `<section class="card stack">${d.casters.map((c) => `<div class="stats" style="grid-template-columns:repeat(3,1fr)">
    <div><b>${c.dc}</b><small>CD (${esc(c.nome)})</small></div><div><b>${fmt(c.atk)}</b><small>Ataque mágico</small></div>
    <div><b>${ABIL_NAME[c.atributoConjuracao].slice(0, 3)}</b><small>Atributo</small></div></div>`).join('')}</section>` : ''}
  ${slots.length ? `<section class="card slots"><h2>Espaços de magia${d.multiclass ? ' (combinados)' : ''}</h2>
    ${slots.map(([lv, s]) => `<div class="lvl"><span>${lv}º</span>${Array.from({ length: s.max }, (_, i) =>
      `<button class="slotpip ${i < s.used ? 'used' : ''}" data-slot="${lv}" data-i="${i}" aria-label="Espaço de ${lv}º círculo ${i + 1}${i < s.used ? ', gasto' : ''}"></button>`).join('')}</div>`).join('')}
  </section>` : ''}
  ${pactSlots.length ? `<section class="card slots"><h2>Magia de Pacto</h2>
    ${pactSlots.map(([lv, s]) => `<div class="lvl"><span>${lv}º</span>${Array.from({ length: s.max }, (_, i) =>
      `<button class="slotpip ${i < s.used ? 'used' : ''}" data-pactslot="${lv}" data-i="${i}" aria-label="Espaço de pacto ${i + 1}${i < s.used ? ', gasto' : ''}"></button>`).join('')}</div>`).join('')}
  </section>` : ''}
  ${bonusSpells.length ? `<section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Magias da Subclasse</h2><span class="lvl-badge">sempre preparadas</span></div>
    <p class="empty-note" style="margin:0">Concedidas automaticamente pela subclasse — não contam no limite de magias conhecidas/preparadas, mas ainda gastam um espaço de magia ao conjurar.</p>
    <div class="stack">${bonusSpells.map((s) => entry(`${esc(s.nome)} ${tags(s)}`, nivelTxt(s.nivel), bonusBody(s), false, `data-k="b-${s.id}"`)).join('')}</div>
  </section>` : ''}
  ${cap.cantrips !== null || cap.known !== null || cap.prepared !== null ? `<section class="card stack"><h2>Limites de magias (regra 2024)</h2>
    <div class="row" style="flex-wrap:wrap;gap:.4rem">${capBadge('truques', cantripsUsed, cap.cantrips)}${capBadge('magias conhecidas', knownUsed, cap.known)}${capBadge('preparadas', preparedUsed, cap.prepared)}</div>
    <details class="entry"><summary><span class="t">Exceção manual (magia extra de livro/pergaminho…)</span></summary><div class="body stack">
      <p class="empty-note" style="margin:0">Some ao limite oficial acima. Use quando o personagem aprendeu algo fora da regra normal.</p>
      <div class="row" style="flex-wrap:wrap">
        <div class="grow"><label for="extra-cantrips">Truques extras</label><input id="extra-cantrips" type="number" min="0" value="${ch.build.extraCantrips || 0}" /></div>
        <div class="grow"><label for="extra-spells">Magias extras</label><input id="extra-spells" type="number" min="0" value="${ch.build.extraSpells || 0}" /></div>
        ${cap.invocacoes !== null ? `<div class="grow"><label for="extra-invoc">Invocações extras</label><input id="extra-invoc" type="number" min="0" value="${ch.build.extraInvocations || 0}" /></div>` : ''}
      </div>
      <div><label for="extra-note">Motivo (opcional)</label>
        <textarea id="extra-note" rows="2" placeholder="Ex.: aprendeu com um pergaminho encontrado na masmorra">${esc(ch.build.extraSpellsNote || '')}</textarea></div>
    </div></details>
  </section>` : ''}
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Minhas magias</h2><span class="lvl-badge">${prepared.length} preparada(s)</span></div>
    ${Object.keys(byLvl).length ? Object.entries(byLvl).map(([lv, arr]) => `<h3 style="margin:.6rem 0 .2rem;color:var(--muted)">${nivelTxt(Number(lv))}</h3>
      <div class="stack" style="--gap:.4rem">${arr.map((s) => entry(`${s.nivel > 0 && prepared.includes(s.id) ? '✓ ' : ''}${esc(s.nome)} ${tags(s)}`, nivelTxt(s.nivel), spellBody(s, true), false, `data-k="m-${s.id}"`)).join('')}</div>`).join('')
      : '<p class="empty-note">Nenhuma magia ainda. Adicione pela biblioteca abaixo.</p>'}
  </section>
  <section class="card stack"><h2>Biblioteca de magias</h2>
    <input id="spellq" type="search" placeholder="Buscar magia pelo nome…" value="${esc(ui.spellQ)}" aria-label="Buscar magia" />
    <div class="filters">${['all', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].map((l) => {
      const avail = l === 'all' || (l === '0' ? hasCaster : hasCaster && Number(l) <= maxCircle);
      return `<button data-flvl="${l}" aria-pressed="${ui.spellLvl === l}" class="${!avail ? 'unavail' : ''}" ${!avail ? 'title="Ainda não disponível no seu nível"' : ''}>${l === 'all' ? 'Todas' : l === '0' ? 'Truques' : l + 'º'}</button>`;
    }).join('')}</div>
    ${hasCaster ? `<p class="empty-note" style="margin:0">Seu nível permite conjurar ${maxCircle === 0 ? 'só truques' : `truques e magias até ${maxCircle}º círculo`}. Os demais círculos aparecem esmaecidos até você subir de nível.</p>` : ''}
    ${classNames ? `<label class="chk"><input type="checkbox" id="spellmine" ${ui.spellMine ? 'checked' : ''}> Só a lista de ${esc(classNames)}</label>` : ''}
    <p class="empty-note">${total} magia(s)${total > LIMIT ? ` — mostrando ${LIMIT}, refine a busca` : ''}.</p>
    <div class="stack">${lib.map((s) => entry(`${esc(s.nome)} ${tags(s)}`, nivelTxt(s.nivel), spellBody(s, false), false, `data-k="l-${s.id}"`, learnBtn(s))).join('')}</div>
  </section>`;
}

function magiasBind(ch, d, ctx) {
  const S = ctx.S, app = ctx.app, ui = S.ui;
  app.querySelectorAll('[data-slot]').forEach((b) => (b.onclick = () => {
    const lv = b.dataset.slot, i = Number(b.dataset.i), s = ch.state.spellSlots[lv];
    ctx.save({ [`state.spellSlots.${lv}.used`]: i < s.used ? i : i + 1 });
  }));
  app.querySelectorAll('[data-pactslot]').forEach((b) => (b.onclick = () => {
    const lv = b.dataset.pactslot, i = Number(b.dataset.i), s = ch.state.pactSlots[lv];
    ctx.save({ [`state.pactSlots.${lv}.used`]: i < s.used ? i : i + 1 });
  }));
  $('#spellq').oninput = (e) => { ui.spellQ = e.target.value; debounce('sq', ctx.render, 250); };
  app.querySelectorAll('[data-flvl]').forEach((b) => (b.onclick = () => { ui.spellLvl = b.dataset.flvl; ctx.render(); }));
  $('#spellmine') && ($('#spellmine').onchange = (e) => { ui.spellMine = e.target.checked; ctx.render(); });
  app.querySelectorAll('[data-learn]').forEach((b) => (b.onclick = () => ctx.save({ 'build.spellsKnown': [...(ch.build.spellsKnown || []), b.dataset.learn] })));
  app.querySelectorAll('[data-learnfull]').forEach((b) => (b.onclick = () => toast(`Limite de ${b.dataset.learnfull === 'truque' ? 'truques conhecidos' : 'magias conhecidas'} atingido. Use a exceção manual acima se for o caso.`)));
  app.querySelectorAll('[data-forget]').forEach((b) => (b.onclick = () => ctx.save({
    'build.spellsKnown': (ch.build.spellsKnown || []).filter((x) => x !== b.dataset.forget),
    'build.spellsPrepared': (ch.build.spellsPrepared || []).filter((x) => x !== b.dataset.forget),
  })));
  app.querySelectorAll('[data-prep]').forEach((b) => (b.onclick = () => {
    const p = ch.build.spellsPrepared || [], id = b.dataset.prep;
    ctx.save({ 'build.spellsPrepared': p.includes(id) ? p.filter((x) => x !== id) : [...p, id] });
  }));
  app.querySelectorAll('[data-prepfull]').forEach((b) => (b.onclick = () => toast('Limite de magias preparadas atingido. Use a exceção manual acima se for o caso.')));
  $('#extra-cantrips') && ($('#extra-cantrips').onchange = (e) => ctx.save({ 'build.extraCantrips': Math.max(0, Number(e.target.value) || 0) }));
  $('#extra-spells') && ($('#extra-spells').onchange = (e) => ctx.save({ 'build.extraSpells': Math.max(0, Number(e.target.value) || 0) }));
  $('#extra-invoc') && ($('#extra-invoc').onchange = (e) => ctx.save({ 'build.extraInvocations': Math.max(0, Number(e.target.value) || 0) }));
  $('#extra-note') && ($('#extra-note').oninput = (e) => debounce('extranote', () => ctx.save({ 'build.extraSpellsNote': e.target.value })));
  app.querySelectorAll('[data-fx]').forEach((b) => (b.onclick = () => {
    const id = b.dataset.fx, lib = EFFECTS[id];
    ctx.save({ 'state.effects': [...(ch.state.effects || []), { uid: Math.random().toString(36).slice(2, 10), id, nome: lib.nome, rounds: lib.rounds }] });
    toast(`${lib.nome} ativo — CA/deslocamento ajustados. Veja em Combate › Efeitos ativos.`);
  }));
  app.querySelectorAll('[data-conc]').forEach((b) => (b.onclick = () =>
    ctx.save({ 'state.concentration': ch.state.concentration === b.dataset.conc ? null : b.dataset.conc })));
  keepOpen(app, 'spells');
}

// Mantém abertos os <details> que o usuário abriu, entre redesenhos.
const openState = {};
function keepOpen(app, key) {
  app.querySelectorAll('summary .addbtn').forEach((b) => b.addEventListener('click', (e) => e.preventDefault()));
  const set = (openState[key] ||= new Set());
  app.querySelectorAll('details.entry').forEach((dt, i) => {
    const k = dt.dataset.k || dt.querySelector('summary .t')?.textContent || i;
    if (set.has(k)) dt.open = true;
    dt.addEventListener('toggle', () => (dt.open ? set.add(k) : set.delete(k)));
  });
}

// =========================================================== TRAÇOS (classe, subclasse, espécie, antecedente)
// Uma seção "Características de X" + "Subclasse" por classe (a principal e cada multiclasse).
function classeSectionHtml(ch, cinfo, d, ctx) {
  const { cls, sub, level: lvl, classId } = cinfo;
  if (!cls) return `<section class="card">Classe "${esc(classId)}" não encontrada no compêndio.</section>`;
  const nome = cls.nome;
  const feats = (cls.caracteristicas || []);
  const have = feats.filter((f) => f.nivel <= lvl), next = feats.filter((f) => f.nivel > lvl);
  const chosenOps = ch.build.opcoes || [];
  const invocCap = classId === 'bruxo' ? d.spellCaps?.invocacoes ?? null : null;
  return `
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Características de ${esc(nome)}</h2><span class="lvl-badge">nível ${lvl}</span></div>
    ${have.length ? have.map((f) => entry(esc(f.nome), `Nível ${f.nivel}`, md(f.desc))).join('') : '<p class="empty-note">Importe o compêndio completo para ver as características.</p>'}
    ${next.length ? `<details class="entry"><summary><span class="t muted">Próximos níveis (${next.length})</span></summary><div class="body stack">
      ${next.map((f) => entry(esc(f.nome), `Nível ${f.nivel}`, md(f.desc))).join('')}</div></details>` : ''}
  </section>
  ${(cls.opcoes || []).map((op) => {
    const isInvoc = classId === 'bruxo' && /Invoca/i.test(op.titulo);
    const used = isInvoc ? op.itens.filter((it) => chosenOps.includes(it.id)).length : null;
    const full = isInvoc && invocCap !== null && used >= invocCap;
    return `<section class="card stack"><div class="sectiontitle"><h2 style="margin:0">${esc(op.titulo.replace('Opções de ', ''))} (${esc(nome)})</h2>${isInvoc && invocCap !== null ? `<span class="lvl-badge">${used}/${invocCap}</span>` : ''}</div>
    ${op.itens.filter((it) => chosenOps.includes(it.id)).map((it) => entry('✓ ' + esc(it.nome), '', md(it.desc) + `<button class="btn small" data-unop="${it.id}">Remover</button>`)).join('') || '<p class="empty-note">Nenhuma escolhida.</p>'}
    <details class="entry"><summary><span class="t">Escolher ${esc(op.titulo.replace('Opções de ', '').toLowerCase())}</span><span class="lvl-badge">${op.itens.length}</span></summary><div class="body stack">
      ${op.itens.filter((it) => !chosenOps.includes(it.id)).map((it) => entry(esc(it.nome), '', md(it.desc), false, `data-k="o-${classId}-${it.id}"`,
        full ? `<button class="btn small" data-opfull="1" aria-label="Limite de invocações atingido">+</button>` : addBtn('data-op', it.id, 'Escolher ' + esc(it.nome)))).join('')}
    </div></details></section>`;
  }).join('')}
  <section class="card stack"><h2>Subclasse de ${esc(nome)}${sub ? ': ' + esc(sub.nome) : ''}</h2>
    ${sub ? (sub.caracteristicas || []).map((f) => entry(`${f.nivel > lvl ? '🔒 ' : ''}${esc(f.nome)}`, `Nível ${f.nivel}`, md(f.desc))).join('')
      : `<p class="empty-note">${lvl < 3 ? 'A subclasse é escolhida no nível 3.' : 'Escolha a subclasse na aba Ficha (ou em Multiclasse, para uma classe secundária).'}</p>
         ${(cls.subclasses || []).map((s) => entry(esc(s.nome), '', md(s.intro))).join('')}`}
  </section>`;
}
function classeHtml(ch, d, ctx) {
  const sp = d.sp, bg = d.bg, spNome = d.speciesLabel || sp?.nome || 'espécie';
  return `
  ${d.classesInfo.map((cinfo) => classeSectionHtml(ch, cinfo, d, ctx)).join('')}
  <section class="card stack"><h2>Traços de ${esc(spNome)}</h2>
    ${sp && spNome !== sp.nome ? `<p class="empty-note" style="margin:0">Usa as regras de ${esc(sp.nome)}.</p>` : ''}
    <p class="empty-note">${esc(sp?.tipo || '')} · ${esc(sp?.tamanho || '')} · Deslocamento ${esc(sp?.deslocamento || '')}</p>
    ${(sp?.tracos || []).filter((t) => t.nome !== 'Detalhes').map((t) => entry(esc(t.nome), '', md(t.desc))).join('') || '<p class="empty-note">Sem traços no compêndio.</p>'}
  </section>
  ${bg ? `<section class="card stack"><h2>Antecedente: ${esc(bg.nome)}</h2>
    <p style="margin:0;font-size:.92rem"><b>Atributos:</b> ${bg.atributos.map((a) => ABIL_NAME[a]).join(', ')}<br>
    <b>Talento:</b> ${esc(bg.talento)}<br><b>Ferramenta:</b> ${esc(bg.ferramenta)}<br><b>Equipamento:</b> ${esc(bg.equipamento)}</p></section>` : ''}
`;
}
function classeBind(ch, d, ctx) {
  const app = ctx.app, ops = ch.build.opcoes || [];
  app.querySelectorAll('[data-op]').forEach((b) => (b.onclick = () => ctx.save({ 'build.opcoes': [...ops, b.dataset.op] })));
  app.querySelectorAll('[data-unop]').forEach((b) => (b.onclick = () => ctx.save({ 'build.opcoes': ops.filter((x) => x !== b.dataset.unop) })));
  app.querySelectorAll('[data-opfull]').forEach((b) => (b.onclick = () => toast('Limite de invocações místicas atingido. Use a exceção manual na aba Magias se for o caso.')));
  keepOpen(app, 'classe');
}

// =========================================================== TALENTOS
const CATS = ['Origem', 'Geral', 'Estilo de Luta', 'Dádiva Épica'];
function talentosHtml(ch, d, ctx) {
  const S = ctx.S, C = S.comp, ui = S.ui;
  const mine = ch.build.feats || [];
  const q = norm(ui.featQ);
  let lib = C.feats.filter((f) => (f.repetivel || !mine.some((m) => m.id === f.id))
    && (ui.featCat === 'all' || f.categoria === ui.featCat) && (!q || norm(f.nome).includes(q) || norm(f.prereq).includes(q)));
  const total = lib.length; lib = lib.slice(0, LIMIT);
  return `
  <section class="card stack"><h2>Meus talentos</h2>
    ${mine.length ? mine.map((m, i) => {
      const f = C.byId.feats[m.id];
      return entry(esc(f?.nome || m.id), esc(m.origem || f?.categoria || ''),
        (f ? `<p class="empty-note">${esc(f.categoria)}${f.prereq ? ' · Pré-requisito: ' + esc(f.prereq) : ''}</p>${md(f.desc)}` : '<p class="empty-note">Talento fora do compêndio.</p>')
        + `<button class="btn small" data-unfeat="${i}">Remover</button>`);
    }).join('') : '<p class="empty-note">Nenhum talento. Seu antecedente concede um talento de Origem.</p>'}
  </section>
  <section class="card stack"><h2>Biblioteca de talentos</h2>
    <input id="featq" type="search" placeholder="Buscar talento…" value="${esc(ui.featQ)}" aria-label="Buscar talento" />
    <div class="filters">${['all', ...CATS].map((c) => `<button data-fcat="${c}" aria-pressed="${ui.featCat === c}">${c === 'all' ? 'Todos' : c}</button>`).join('')}</div>
    <p class="empty-note">${total} talento(s)${total > LIMIT ? ` — mostrando ${LIMIT}` : ''}.</p>
    ${lib.map((f) => entry(esc(f.nome), esc(f.categoria),
      `${f.prereq ? `<p class="empty-note">Pré-requisito: ${esc(f.prereq)}</p>` : ''}${md(f.desc)}`, false, `data-k="f-${f.id}"`, addBtn('data-feat', f.id, 'Adicionar ' + esc(f.nome)))).join('')}
    ${!C.feats.length ? '<p class="empty-note">Importe o compêndio completo para usar a biblioteca de talentos.</p>' : ''}
  </section>`;
}
function talentosBind(ch, d, ctx) {
  const S = ctx.S, app = ctx.app, mine = ch.build.feats || [];
  $('#featq').oninput = (e) => { S.ui.featQ = e.target.value; debounce('fq', ctx.render, 250); };
  app.querySelectorAll('[data-fcat]').forEach((b) => (b.onclick = () => { S.ui.featCat = b.dataset.fcat; ctx.render(); }));
  app.querySelectorAll('[data-feat]').forEach((b) => (b.onclick = () => {
    ctx.save({ 'build.feats': [...mine, { id: b.dataset.feat, origem: 'Escolhido' }] });
    ctx.toast('Talento adicionado. Aplique aumentos de atributo na aba Ficha, se houver.');
  }));
  app.querySelectorAll('[data-unfeat]').forEach((b) => (b.onclick = () => ctx.save({ 'build.feats': mine.filter((_, i) => i !== Number(b.dataset.unfeat)) })));
  keepOpen(app, 'feats');
}

// =========================================================== ITENS (inventário + bolsa de moedas)
function itensHtml(ch, d, ctx) {
  const S = ctx.S, C = S.comp, ui = S.ui;
  const inv = inventoryOf(ch), coins = ch.coins || {};
  const q = norm(ui.itemQ);
  const lib = q.length >= 2 ? C.items.filter((it) => norm(it.nome).includes(q)).slice(0, 25) : [];
  const pct = Math.min(100, Math.round((d.weight / d.carry) * 100));
  const itemInfo = (it) => {
    if (it.tipo === 'arma') return `${esc(it.dano)} · ${esc(it.propriedades)} · Maestria: ${esc(it.maestria)}`;
    if (it.tipo === 'armadura') return `CA ${esc(it.ca)}${it.forca && it.forca !== '—' ? ' · ' + esc(it.forca) : ''}${it.furtividade === 'Desvantagem' ? ' · Desv. Furtividade' : ''}`;
    return '';
  };
  const refOf = (it) => (it.itemId ? C.byId.weapons[it.itemId] || C.byId.armor[it.itemId] || C.byId.gear[it.itemId] : null);
  const isPotion = (it, ref) => /po[çc][aã]o|elixir|antídoto/i.test(it.nome || ref?.nome || '');
  const CUSTOM_GROUP = { arma: 'Armas', armadura: 'Armaduras', pocao: 'Poções' };
  const groupOf = (it) => {
    const ref = refOf(it);
    if (ref?.tipo === 'arma') return 'Armas';
    if (ref?.tipo === 'armadura') return 'Armaduras';
    if (!ref && CUSTOM_GROUP[it.categoria]) return CUSTOM_GROUP[it.categoria];
    if (isPotion(it, ref)) return 'Poções';
    return 'Outros';
  };
  const customInfo = (it) => {
    if (it.categoria === 'arma' && it.dano) return `${esc(it.dano)}${it.ranged ? ' · À distância' : ''}${it.finesse ? ' · Acuidade' : ''}`;
    if (it.categoria === 'armadura' && Number(it.ca)) return `CA ${it.ca}${it.caDex ? ` + Destreza${it.caDexMax != null && it.caDexMax !== '' ? ` (máx ${it.caDexMax})` : ''}` : ''}`;
    return '';
  };
  const itemCard = (it) => {
    const ref = refOf(it);
    const custom = !ref && customInfo(it);
    return entry(`${it.equipado ? '🛡️ ' : ''}${esc(it.nome)}${Number(it.qtd) > 1 ? ` <span class="muted">×${it.qtd}</span>` : ''}`, esc(it.peso || ''),
      `${ref ? `<p class="empty-note">${itemInfo(ref)}${ref.custo ? ' · ' + esc(ref.custo) : ''}</p>${ref.desc ? md(ref.desc) : ''}` : custom ? `<p class="empty-note">${custom}</p>` : ''}
      <div class="row">
        <button class="btn small" data-qty="${it.uid}" data-d="-1">−</button><b>${it.qtd}</b><button class="btn small" data-qty="${it.uid}" data-d="1">+</button>
        <label class="chk"><input type="checkbox" data-equip="${it.uid}" ${it.equipado ? 'checked' : ''}> Equipado</label>
        <label class="chk"><input type="checkbox" data-attune="${it.uid}" ${it.sintonizado ? 'checked' : ''}> Sintonizado</label>
      </div>
      <input data-inote="${it.uid}" id="inote-${it.uid}" value="${esc(it.notas || '')}" placeholder="Notas (cargas, efeitos…)" aria-label="Notas do item" />
      <button class="btn small danger" data-rmitem="${it.uid}">Remover item</button>`, false, `data-k="i-${it.uid}"`);
  };
  const GROUPS = ['Armas', 'Armaduras', 'Poções', 'Outros'];
  const byGroup = Object.fromEntries(GROUPS.map((g) => [g, inv.filter((it) => groupOf(it) === g)]));
  return `
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Bolsa de moedas</h2><span class="lvl-badge">≈ ${d.coinsGP.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} PO</span></div>
    <div class="coins">${COINS.map(([k, sig, nome]) => `<label class="coin coin-${k}"><span>${sig}</span>
      <input type="number" inputmode="numeric" min="0" data-coin="${k}" value="${Number(coins[k]) || 0}" aria-label="${nome}" /></label>`).join('')}</div>
    <form class="row" id="coinop">
      <input id="coinamt" type="number" inputmode="numeric" min="1" placeholder="Qtd." style="width:5.5rem" aria-label="Quantidade" />
      <select id="coinkind" style="width:5.5rem" aria-label="Moeda">${COINS.map(([k, sig]) => `<option value="${k}" ${k === 'po' ? 'selected' : ''}>${sig}</option>`).join('')}</select>
      <button class="btn heal small" data-cop="+">Receber</button><button class="btn danger small" data-cop="-">Gastar</button>
    </form>
  </section>
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Inventário</h2><span class="lvl-badge">${d.weight.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} / ${d.carry} kg</span></div>
    <div class="hpbar" aria-hidden="true"><div class="cur ${pct > 100 ? 'low' : pct > 75 ? 'mid' : ''}" style="width:${pct}%"></div></div>
    ${inv.length ? GROUPS.filter((g) => byGroup[g].length).map((g) => `
      <div class="inv-divider"><span>${g}</span><span class="muted">${byGroup[g].length}</span></div>
      ${byGroup[g].map(itemCard).join('')}`).join('') : '<p class="empty-note">Inventário vazio.</p>'}
  </section>
  <section class="card stack"><h2>Adicionar item</h2>
    <input id="itemq" type="search" placeholder="Buscar armas, armaduras, equipamento… (2+ letras)" value="${esc(ui.itemQ)}" aria-label="Buscar item" />
    ${lib.map((it) => `<div class="libitem"><div class="info"><b>${esc(it.nome)}</b><small>${esc(it.custo || '')}${it.peso ? ' · ' + esc(it.peso) : ''} ${itemInfo(it) ? '· ' + itemInfo(it) : ''}</small></div>
      <button class="btn small primary" data-additem="${it.id}">+</button></div>`).join('')}
    ${q.length >= 2 && !lib.length ? '<p class="empty-note">Nada encontrado — crie um item personalizado abaixo.</p>' : ''}
    <form class="stack" id="custom">
      <p class="empty-note" style="margin:0">Não achou na busca? Crie um item personalizado:</p>
      <div class="row" style="flex-wrap:wrap;gap:.5rem">
        <input id="cname" class="grow" placeholder="Nome do item" required style="width:auto" aria-label="Nome do item" />
        <select id="ccat" aria-label="Categoria do item">
          <option value="outro">Outro</option>
          <option value="arma">Arma</option>
          <option value="armadura">Armadura</option>
          <option value="pocao">Poção</option>
        </select>
      </div>
      <div class="row" style="flex-wrap:wrap;gap:.5rem">
        <input id="cweight" placeholder="Peso (kg)" inputmode="decimal" style="width:7rem" aria-label="Peso em kg" />
        <input id="cqty" type="number" min="1" inputmode="numeric" value="1" placeholder="Qtd." style="width:5.5rem" aria-label="Quantidade" />
      </div>
      <div id="c-arma-fields" class="stack" style="display:none">
        <input id="cdano" placeholder="Dano (ex.: 1d6 Cortante) — pra aparecer no cálculo de ataque" aria-label="Dano da arma" />
        <div class="row" style="gap:1rem;flex-wrap:wrap">
          <label class="chk"><input type="checkbox" id="cranged"> À distância (usa Destreza)</label>
          <label class="chk"><input type="checkbox" id="cfinesse"> Acuidade (usa o maior de Força/Destreza)</label>
        </div>
      </div>
      <div id="c-armadura-fields" class="stack" style="display:none">
        <div class="row" style="flex-wrap:wrap;gap:.5rem;align-items:center">
          <input id="ccabase" type="number" inputmode="numeric" placeholder="CA base" style="width:6rem" aria-label="CA base da armadura" />
          <label class="chk"><input type="checkbox" id="ccadex" checked> + Destreza</label>
          <input id="ccadexmax" type="number" inputmode="numeric" placeholder="Limite Des. (opcional)" style="width:9.5rem" aria-label="Limite do bônus de Destreza" />
        </div>
        <p class="empty-note" style="margin:0">Um item sem "+ Destreza" marcado entra como bônus fixo (ex.: um escudo, CA +2) — pra aparecer na Classe de Armadura calculada.</p>
      </div>
      <input id="cdetail" placeholder="Notas, efeito… (opcional)" aria-label="Detalhes do item" />
      <button class="btn small primary">+ Adicionar item personalizado</button>
    </form>
  </section>`;
}
function itensBind(ch, d, ctx) {
  const S = ctx.S, app = ctx.app, C = S.comp;
  const inv = inventoryOf(ch), coins = { pc: 0, pp: 0, pe: 0, po: 0, pl: 0, ...(ch.coins || {}) };
  const saveInv = (list) => ctx.save({ inventory: list });
  app.querySelectorAll('[data-coin]').forEach((inp) => (inp.onchange = () => ctx.save({ coins: { ...coins, [inp.dataset.coin]: Math.max(0, Number(inp.value) || 0) } })));
  app.querySelectorAll('[data-cop]').forEach((b) => (b.onclick = (e) => {
    e.preventDefault();
    const n = Number($('#coinamt').value), k = $('#coinkind').value;
    if (!n) return ctx.toast('Digite a quantidade.');
    const v = coins[k] + (b.dataset.cop === '+' ? n : -n);
    if (v < 0) return ctx.toast(`Não há ${n} ${k.toUpperCase()} suficientes.`);
    ctx.save({ coins: { ...coins, [k]: v } });
  }));
  $('#itemq').oninput = (e) => { S.ui.itemQ = e.target.value; debounce('iq', ctx.render, 250); };
  app.querySelectorAll('[data-additem]').forEach((b) => (b.onclick = () => {
    const it = C.items.find((x) => x.id === b.dataset.additem);
    const same = inv.find((x) => x.itemId === it.id);
    saveInv(same ? inv.map((x) => (x === same ? { ...x, qtd: Number(x.qtd) + 1 } : x))
      : [...inv, { uid: uid(), itemId: it.id, nome: it.nome, qtd: 1, peso: it.peso || '', equipado: false, sintonizado: false, notas: '' }]);
    ctx.toast(`${it.nome} adicionado.`);
  }));
  const toggleCatFields = () => {
    const v = $('#ccat').value;
    $('#c-arma-fields').style.display = v === 'arma' ? '' : 'none';
    $('#c-armadura-fields').style.display = v === 'armadura' ? '' : 'none';
  };
  $('#ccat').onchange = toggleCatFields;
  toggleCatFields();
  $('#custom').onsubmit = (e) => {
    e.preventDefault();
    const nome = $('#cname').value.trim();
    if (!nome) return;
    const w = $('#cweight').value.trim();
    const qtd = Math.max(1, Number($('#cqty').value) || 1);
    const categoria = $('#ccat').value;
    const item = { uid: uid(), itemId: null, nome, categoria, qtd, peso: w ? `${w} kg` : '', equipado: false, sintonizado: false, notas: $('#cdetail').value.trim() };
    if (categoria === 'arma') {
      const dano = $('#cdano').value.trim();
      if (dano) item.dano = dano;
      item.ranged = $('#cranged').checked;
      item.finesse = $('#cfinesse').checked;
    } else if (categoria === 'armadura') {
      const ca = Number($('#ccabase').value);
      if (ca) item.ca = ca;
      item.caDex = $('#ccadex').checked;
      const caDexMax = $('#ccadexmax').value.trim();
      if (caDexMax) item.caDexMax = Number(caDexMax);
    }
    saveInv([...inv, item]);
    ctx.toast(`${nome} adicionado.`);
  };
  const upd = (id, fn) => saveInv(inv.map((x) => (x.uid === id ? fn(x) : x)));
  app.querySelectorAll('[data-qty]').forEach((b) => (b.onclick = () => upd(b.dataset.qty, (x) => ({ ...x, qtd: Math.max(0, Number(x.qtd) + Number(b.dataset.d)) }))));
  app.querySelectorAll('[data-equip]').forEach((c) => (c.onchange = () => upd(c.dataset.equip, (x) => ({ ...x, equipado: c.checked }))));
  app.querySelectorAll('[data-attune]').forEach((c) => (c.onchange = () => {
    if (c.checked && inv.filter((x) => x.sintonizado).length >= 3) { c.checked = false; return ctx.toast('Limite de 3 itens sintonizados.'); }
    upd(c.dataset.attune, (x) => ({ ...x, sintonizado: c.checked }));
  }));
  app.querySelectorAll('[data-inote]').forEach((i) => (i.oninput = () => debounce('in' + i.dataset.inote, () => upd(i.dataset.inote, (x) => ({ ...x, notas: i.value })))));
  app.querySelectorAll('[data-rmitem]').forEach((b) => (b.onclick = () => saveInv(inv.filter((x) => x.uid !== b.dataset.rmitem))));
  keepOpen(app, 'itens');
}

export const TAB_VIEWS = {
  ficha: { html: fichaHtml, bind: fichaBind },
  magias: { html: magiasHtml, bind: magiasBind },
  classe: { html: classeHtml, bind: classeBind },
  talentos: { html: talentosHtml, bind: talentosBind },
  itens: { html: itensHtml, bind: itensBind },
};
export { parseWeight };
