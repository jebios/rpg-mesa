import{e as p,t as b,$ as m,u as x,g as B,r as O,l as M,s as E,a as I,b as P,v as z,p as H,d as F,f as N,C as q,A as V,c as R,h as G}from"./auth-C0DXKsp-.js";/* empty css             */const K=[["jogadores","🧑‍🤝‍🧑","Jogadores"],["combate","⚔️","Combate"],["npcs","🎭","NPCs"],["historia","📖","História"],["itens","🎒","Itens"]],D={};function T(s,a,n=600){clearTimeout(D[s]),D[s]=setTimeout(a,n)}const J=()=>Math.floor(Math.random()*20)+1,C=s=>s.replace(":","_");function U(s){const{S:a}=s,n=a.combat||{ordem:[],turno:0,rodada:1},d=n.ordem||[],t=i=>{if(i.startsWith("pc:")){const v=a.chars.find($=>$.id===i.slice(3));return v?{nome:v.name,tipo:"pc",ca:v.build.ac??10,pv:v.state.hp.current,pvMax:v.state.hp.max}:null}const l=a.npcs.find(v=>v.id===i.slice(4));return l?{nome:l.nome,tipo:"npc",ca:l.ca??"—",pv:l.pvAtual??0,pvMax:l.pvMax??0}:null},o=new Set(d.map(i=>i.ref)),r=[...a.chars.filter(i=>!o.has("pc:"+i.id)).map(i=>({ref:"pc:"+i.id,nome:i.name,tipo:"pc"})),...a.npcs.filter(i=>i.tipo==="combate"&&!o.has("npc:"+i.id)).map(i=>({ref:"npc:"+i.id,nome:i.nome,tipo:"npc"}))],u=[...d].map((i,l)=>({...i,i:l,r:t(i.ref)})).filter(i=>i.r).sort((i,l)=>l.iniciativa-i.iniciativa);return`<div class="stack">
    ${d.length?`<div class="card row" style="justify-content:space-between">
      <div class="row"><b style="font-size:1.1rem">Rodada ${n.rodada||1}</b>
        <button class="btn small" id="c-prev">◂ Turno</button><button class="btn small" id="c-next">Turno ▸</button></div>
      <button class="btn small danger" id="c-end">Encerrar combate</button>
    </div>`:""}
    <div class="card stack">
      <h2>Iniciativa</h2>
      ${u.length?u.map((i,l)=>`<div class="row" style="justify-content:space-between;border-bottom:1px solid var(--line);padding:.4rem 0" data-init-row="${i.ref}">
        <div class="row">${l===(n.turno||0)?'<span class="chip" style="border-color:var(--accent);color:var(--accent)">▶ agora</span>':""}
          <span>${i.r.tipo==="npc"?"🎭":"🧑"} <b>${p(i.r.nome)}</b></span></div>
        <div class="row">
          <label class="muted" style="margin:0" for="init-${C(i.ref)}">Inic.</label>
          <input id="init-${C(i.ref)}" style="width:4rem;min-height:36px;padding:.3rem" type="number" data-initval="${i.ref}" value="${i.iniciativa}" />
          <span class="muted">CA ${i.r.ca??"—"}</span>
          ${i.r.tipo==="npc"?`<input style="width:4.5rem;min-height:36px;padding:.3rem" type="number" min="0" data-npchp="${i.ref.slice(4)}" value="${i.r.pv}" /><span class="muted">/${i.r.pvMax}</span>`:`<span class="muted">${i.r.pv}/${i.r.pvMax} PV</span>`}
          <button class="btn small danger" data-rminit="${i.ref}" title="Remover">✕</button>
        </div></div>`).join(""):'<p class="empty-note">Nenhum combatente na iniciativa ainda.</p>'}
    </div>
    <div class="card stack">
      <h3>Adicionar à iniciativa</h3>
      ${r.length?r.map(i=>`<div class="row" style="justify-content:space-between">
        <span>${i.tipo==="npc"?"🎭":"🧑"} ${p(i.nome)}</span>
        <div class="row"><input style="width:4rem;min-height:36px;padding:.3rem" type="number" placeholder="d20" id="add-${C(i.ref)}" />
        <button class="btn small" data-roll="${i.ref}">🎲</button>
        <button class="btn small primary" data-addinit="${i.ref}">Adicionar</button></div></div>`).join(""):'<p class="empty-note">Todos os jogadores e NPCs de combate já estão na lista. Crie mais NPCs na aba NPCs.</p>'}
    </div>
  </div>`}function _(s){const{S:a,app:n,render:d}=s,t=()=>a.combat||{ordem:[],turno:0,rodada:1},o=i=>s.saveCombat({...t(),...i});n.querySelectorAll("[data-roll]").forEach(i=>i.onclick=()=>{const l=document.getElementById("add-"+C(i.dataset.roll));l&&(l.value=J())}),n.querySelectorAll("[data-addinit]").forEach(i=>i.onclick=()=>{const l=i.dataset.addinit,v=document.getElementById("add-"+C(l)),$=Number(v==null?void 0:v.value);if(!$&&$!==0)return b("Digite ou role a iniciativa.");const w=t();o({ordem:[...w.ordem||[],{ref:l,iniciativa:$}]})}),n.querySelectorAll("[data-rminit]").forEach(i=>i.onclick=()=>{const l=t();o({ordem:(l.ordem||[]).filter(v=>v.ref!==i.dataset.rminit)})}),n.querySelectorAll("[data-initval]").forEach(i=>i.onchange=()=>{const l=t();o({ordem:(l.ordem||[]).map(v=>v.ref===i.dataset.initval?{...v,iniciativa:Number(i.value)||0}:v)})}),n.querySelectorAll("[data-npchp]").forEach(i=>i.onchange=()=>{s.updateNpc(i.dataset.npchp,{pvAtual:Math.max(0,Number(i.value)||0)})});const r=t(),u=(r.ordem||[]).length;m("#c-prev")&&(m("#c-prev").onclick=()=>{let i=(r.turno||0)-1,l=r.rodada||1;i<0&&(i=u-1,l=Math.max(1,l-1)),o({turno:i,rodada:l})}),m("#c-next")&&(m("#c-next").onclick=()=>{let i=(r.turno||0)+1,l=r.rodada||1;i>=u&&(i=0,l+=1),o({turno:i,rodada:l})}),m("#c-end")&&(m("#c-end").onclick=()=>{confirm("Encerrar o combate e limpar a iniciativa?")&&o({ordem:[],turno:0,rodada:1})})}function Q(s){const{S:a}=s,n=t=>a.npcs.filter(o=>o.tipo===t),d=t=>`<details class="entry" data-k="npc-${t.id}" ${a.openNpc.has(t.id)?"open":""}>
    <summary><span class="t">${t.tipo==="combate"?"⚔️":"📖"} ${p(t.nome)}</span>
      <button class="btn small danger addbtn" data-delnpc="${t.id}" title="Excluir">🗑</button></summary>
    <div class="body stack">
      <div><label>Nome</label><input data-npc-f="nome" data-id="${t.id}" value="${p(t.nome)}" /></div>
      <div><label>Tipo</label><select data-npc-f="tipo" data-id="${t.id}">
        <option value="historia" ${t.tipo==="historia"?"selected":""}>História</option>
        <option value="combate" ${t.tipo==="combate"?"selected":""}>Combate</option></select></div>
      ${t.tipo==="combate"?`<div class="row">
        <div class="grow"><label>CA</label><input type="number" data-npc-f="ca" data-id="${t.id}" value="${t.ca??""}" /></div>
        <div class="grow"><label>PV máx.</label><input type="number" data-npc-f="pvMax" data-id="${t.id}" value="${t.pvMax??""}" /></div>
        <div class="grow"><label>PV atual</label><input type="number" data-npc-f="pvAtual" data-id="${t.id}" value="${t.pvAtual??""}" /></div>
        <div class="grow"><label>Bônus inic.</label><input type="number" data-npc-f="iniciativaBonus" data-id="${t.id}" value="${t.iniciativaBonus??""}" /></div>
      </div>`:""}
      <div><label>${t.tipo==="combate"?"Ações / notas de combate":"Descrição / anotações"}</label>
        <textarea rows="4" data-npc-f="descricao" data-id="${t.id}">${p(t.descricao||"")}</textarea></div>
    </div></details>`;return`<div class="stack">
    <form class="card stack" id="npcnew"><h2>Novo NPC</h2>
      <div class="row">
        <div class="grow"><label for="npc-nome">Nome</label><input id="npc-nome" required maxlength="60" placeholder="Kaelen, o Ferreiro" /></div>
        <div><label for="npc-tipo">Tipo</label><select id="npc-tipo"><option value="historia">História</option><option value="combate">Combate</option></select></div>
      </div>
      <button class="btn primary">Criar NPC</button></form>
    <div class="card stack"><h2>NPCs de história</h2>${n("historia").length?n("historia").map(d).join(""):'<p class="empty-note">Nenhum NPC de história ainda.</p>'}</div>
    <div class="card stack"><h2>NPCs de combate</h2>${n("combate").length?n("combate").map(d).join(""):'<p class="empty-note">Nenhum NPC de combate ainda.</p>'}</div>
  </div>`}function W(s){const{S:a,app:n,render:d}=s;m("#npcnew").onsubmit=async t=>{t.preventDefault();const o=m("#npc-nome").value.trim();if(!o)return;const r=m("#npc-tipo").value;try{await s.createNpc({nome:o,tipo:r,ca:null,pvMax:null,pvAtual:null,iniciativaBonus:0,descricao:""}),b("NPC criado.")}catch(u){b(u.message)}},n.querySelectorAll('details.entry[data-k^="npc-"]').forEach(t=>t.ontoggle=()=>{const o=t.dataset.k.slice(4);t.open?a.openNpc.add(o):a.openNpc.delete(o)}),n.querySelectorAll("summary .addbtn").forEach(t=>t.addEventListener("click",o=>o.preventDefault())),n.querySelectorAll("[data-delnpc]").forEach(t=>t.onclick=()=>{confirm("Excluir este NPC?")&&s.deleteNpc(t.dataset.delnpc).catch(o=>b(o.message))}),n.querySelectorAll("[data-npc-f]").forEach(t=>{const o=()=>{const r=t.dataset.npcF,u=t.dataset.id;let i=t.value;["ca","pvMax","pvAtual","iniciativaBonus"].includes(r)&&(i=i===""?null:Number(i)),s.updateNpc(u,{[r]:i}).catch(l=>b(l.message))};t.tagName==="SELECT"?t.onchange=()=>{o(),d()}:t.tagName==="TEXTAREA"?t.oninput=()=>T("npc-"+t.dataset.id+"-"+t.dataset.npcF,o,700):t.onchange=o})}function X(s){var n;const a=((n=s.S.story)==null?void 0:n.texto)||"";return`<div class="card stack">
    <h2>Anotações da campanha</h2>
    <p class="muted" style="margin:0">Escreva a história, resumos de sessão e lembretes. Só você vê esta aba.</p>
    <textarea id="story-txt" rows="18" placeholder="Sessão 1 — os aventureiros chegam a Vale Sombrio...">${p(a)}</textarea>
    <p class="muted" id="story-status" style="margin:0;font-size:.82rem">Salva automaticamente.</p>
  </div>`}function Y(s){const a=m("#story-txt");a.oninput=()=>{m("#story-status").textContent="Salvando…",T("story",()=>s.saveDmDoc("notas",{texto:a.value}).then(()=>{const n=m("#story-status");n&&(n.textContent="Salvo.")}),700)}}function Z(s){var t;const{S:a}=s,n=((t=a.itemLib)==null?void 0:t.itens)||[],d=o=>`<details class="entry" data-k="item-${o.id}" ${a.openNpc.has("i"+o.id)?"open":""}>
    <summary><span class="t">🎁 ${p(o.nome)}</span><span class="muted lvl-badge">${p(o.peso||"")}</span>
      <button class="btn small danger addbtn" data-delitem="${o.id}" title="Excluir">🗑</button></summary>
    <div class="body stack">
      ${o.descricao?`<p style="margin:0;white-space:pre-wrap">${p(o.descricao)}</p>`:""}
      <div class="row">
        <div class="grow"><label for="give-p-${o.id}">Dar para</label>
          <select id="give-p-${o.id}">${a.chars.length?a.chars.map(r=>`<option value="${r.id}">${p(r.name)}</option>`).join(""):'<option value="">Nenhum jogador na mesa</option>'}</select></div>
        <div><label for="give-q-${o.id}">Qtd.</label><input id="give-q-${o.id}" type="number" min="1" value="1" style="width:4.5rem" /></div>
        <button class="btn small primary addbtn" data-give="${o.id}" style="align-self:end">Entregar</button>
      </div>
    </div></details>`;return`<div class="stack">
    <form class="card stack" id="itemnew"><h2>Criar item</h2>
      <div><label for="it-nome">Nome</label><input id="it-nome" required maxlength="60" placeholder="Amuleto da Maré Calma" /></div>
      <div class="row">
        <div class="grow"><label for="it-peso">Peso</label><input id="it-peso" placeholder="0,2 kg" /></div>
      </div>
      <div><label for="it-desc">Descrição</label><textarea id="it-desc" rows="3" placeholder="O que o item faz, raridade, propriedades..."></textarea></div>
      <button class="btn primary">Criar item</button></form>
    <div class="card stack"><h2>Itens do Mestre</h2>${n.length?n.map(d).join(""):'<p class="empty-note">Nenhum item criado ainda. Itens do compêndio (armas, armaduras...) os jogadores já podem adicionar sozinhos pela biblioteca do Grimório.</p>'}</div>
  </div>`}function aa(s){const{S:a,app:n,render:d}=s;m("#itemnew").onsubmit=async t=>{var i;t.preventDefault();const o=m("#it-nome").value.trim();if(!o)return;const r={id:x(),nome:o,peso:m("#it-peso").value.trim(),descricao:m("#it-desc").value.trim()},u=[...((i=a.itemLib)==null?void 0:i.itens)||[],r];try{await s.saveDmDoc("itens",{itens:u}),b("Item criado.")}catch(l){b(l.message)}},n.querySelectorAll("summary .addbtn").forEach(t=>t.addEventListener("click",o=>o.preventDefault())),n.querySelectorAll("[data-delitem]").forEach(t=>t.onclick=()=>{var r;const o=(((r=a.itemLib)==null?void 0:r.itens)||[]).filter(u=>u.id!==t.dataset.delitem);s.saveDmDoc("itens",{itens:o}).catch(u=>b(u.message))}),n.querySelectorAll("[data-give]").forEach(t=>t.onclick=async()=>{var w;const o=(((w=a.itemLib)==null?void 0:w.itens)||[]).find(c=>c.id===t.dataset.give),r=document.getElementById("give-p-"+o.id),u=document.getElementById("give-q-"+o.id),i=r==null?void 0:r.value;if(!i)return b("Escolha um jogador na mesa.");const l=Math.max(1,Number(u==null?void 0:u.value)||1),v=a.chars.find(c=>c.id===i),$={id:"mestre-"+x(),nome:o.nome,peso:o.peso||"0 kg",qtd:l,notas:o.descricao||"",equipado:!1,sintonizado:!1};try{await a.be.updateCharacter(i,{inventory:[...v.inventory||[],$]}),b(`${o.nome} entregue para ${v.name}.`)}catch(c){b(c.message)}})}const h=m("#app"),e={be:null,comp:null,user:null,cid:null,camp:null,chars:[],npcs:[],story:null,combat:null,itemLib:null,tab:"jogadores",open:new Set,openNpc:new Set,inputs:{},off:[]},A=()=>`rpgmesa:dm-last:${e.user.uid}`,j=()=>{e.off.forEach(s=>s()),e.off=[]};ea().catch(s=>{h.innerHTML=`<div class="shell"><div class="card">Erro ao iniciar: ${p(s.message)}</div></div>`});async function ea(){e.be=await B(),O(e.be,h,{title:"Escudo do Mestre",subtitle:"Entre com sua conta de Mestre para gerenciar suas campanhas.",onSignedOut:()=>{j(),e.camp=null,e.cid=null,e.chars=[]}},async s=>{e.user=s,h.innerHTML='<p class="muted" style="padding:1rem">Carregando compêndio…</p>',e.comp=await M(e.be);const a=E.get(A());a?k(a):S()})}const L=()=>e.be.mode==="local"?'<p class="banner">Modo demo: dados salvos neste navegador. Abra o Grimório em outra aba (com outra conta) para ver a sincronização.</p>':"";function S(){j(),e.camp=null,e.cid=null,E.set(A(),null),e.off.push(e.be.watchMyCampaigns(s=>{var n;const a=((n=m("#cname"))==null?void 0:n.value)||"";s.sort((d,t)=>d.name.localeCompare(t.name)),h.innerHTML=`<div class="shell stack" style="max-width:640px">
      <div class="topbar" style="margin:0"><h1 style="margin:0">Escudo do Mestre</h1>${I(e.user)}</div>${L()}
      ${s.length?`<div class="card stack"><h2>Suas campanhas</h2>${s.map(d=>`<button class="btn" style="width:100%;justify-content:space-between" data-open="${d.id}"><span>${p(d.name)}</span><span class="muted">${p(d.joinCode)}</span></button>`).join("")}</div>`:""}
      <section class="card stack"><h2>Compêndio de regras</h2>
        <p style="margin:0">${e.comp.completo?`Carregado: <b>${e.comp.spells.length}</b> magias, <b>${e.comp.feats.length}</b> talentos, <b>${e.comp.classes.length}</b> classes, <b>${e.comp.species.length}</b> espécies, <b>${e.comp.backgrounds.length}</b> antecedentes, <b>${e.comp.items.length}</b> itens.`:"Ainda não importado — os jogadores veem só uma amostra."}</p>
        <label class="btn" style="width:100%">📂 Importar compendio.json<input id="compfile" type="file" accept=".json,application/json" hidden></label>
        <p class="muted" style="margin:0;font-size:.85rem">O compêndio fica no Firebase, visível só para quem faz login. Não vai para o GitHub.</p>
      </section>
      <form class="card stack" id="f"><h2>Nova campanha</h2>
        <div><label for="cname">Nome da campanha</label><input id="cname" required maxlength="60" placeholder="A Mina Perdida de Phandelver" value="${p(a)}" /></div>
        <button class="btn primary">Criar sala</button></form></div>`,P(e.be,h),h.querySelectorAll("[data-open]").forEach(d=>d.onclick=()=>k(d.dataset.open)),m("#compfile").onchange=async d=>{const t=d.target.files[0];if(t)try{const o=JSON.parse(await t.text()),r=z(o);b("Importando compêndio…"),await e.be.saveCompendium(o),e.comp=await M(e.be,{force:!0}),b(`Compêndio importado: ${r.magias} magias, ${r.talentos} talentos, ${r.classes} classes.`),S()}catch(o){b(/permission|insufficient/i.test(o.message)?"Sem permissão: só a conta de administrador pode importar o compêndio.":"Erro: "+o.message)}},m("#f").onsubmit=async d=>{d.preventDefault();try{const{id:t}=await e.be.createCampaign(m("#cname").value.trim());k(t)}catch(t){b(t.message)}}}))}function k(s){j(),e.cid=s,e.camp=null,e.chars=[],e.npcs=[],e.story=null,e.combat=null,e.itemLib=null,e.tab="jogadores",E.set(A(),s),e.off.push(e.be.watchCampaign(s,a=>{if(!a||a.dmUid!==e.user.uid)return S();e.camp=a,g()})),e.off.push(e.be.watchPartyCharacters(s,a=>{const n=Object.fromEntries(e.chars.map(d=>[d.id,d.state.hp.current+d.state.hp.temp]));e.chars=a.sort((d,t)=>d.name.localeCompare(t.name)),g(),a.forEach(d=>{var r;const t=n[d.id],o=d.state.hp.current+d.state.hp.temp;t!=null&&t!==o&&((r=document.querySelector(`[data-pc="${d.id}"]`))==null||r.classList.add(o<t?"flash-dmg":"flash-heal"))})})),e.off.push(e.be.watchNpcs(s,a=>{e.npcs=a.sort((n,d)=>n.nome.localeCompare(d.nome)),g()})),e.off.push(e.be.watchDmDoc(s,"notas",a=>{e.story=a||{texto:""},g()})),e.off.push(e.be.watchDmDoc(s,"itens",a=>{e.itemLib=a||{itens:[]},g()})),e.off.push(e.be.watchCombat(s,a=>{e.combat=a||{ordem:[],turno:0,rodada:1},g()}))}const y={get S(){return e},app:h,render:()=>g(),toast:b,createNpc:s=>e.be.createNpc(e.cid,s),updateNpc:(s,a)=>e.be.updateNpc(e.cid,s,a),deleteNpc:s=>e.be.deleteNpc(e.cid,s),saveDmDoc:(s,a)=>e.be.saveDmDoc(e.cid,s,a),saveCombat:s=>e.be.saveCombat(e.cid,s)};function g(){if(!e.camp)return;const s=Object.values(e.camp.members||{}).filter(a=>a==="player").length;H(()=>{h.innerHTML=`<div class="shell">
      <div class="topbar">
        <div><h1 style="margin:0">${p(e.camp.name)}</h1><span class="muted">${s} jogador(es) na sala · ${e.chars.length} ficha(s)</span></div>
        <div class="row"><span class="muted">Código da sala</span><span class="code" id="code">${p(e.camp.joinCode)}</span>
          <button class="btn small" id="copy">Copiar</button><button class="btn small" id="back">Campanhas</button>${I(e.user)}</div>
      </div>
      ${L()}
      <nav class="filters" role="tablist" style="margin-bottom:.75rem">${K.map(([a,n,d])=>`<button role="tab" aria-pressed="${e.tab===a}" data-tab="${a}">${n} ${d}</button>`).join("")}</nav>
      ${ta()}
    </div>`,m("#copy").onclick=()=>{var a;return(a=navigator.clipboard)==null?void 0:a.writeText(e.camp.joinCode).then(()=>b("Código copiado."))},m("#back").onclick=S,P(e.be,h),h.querySelectorAll("[data-tab]").forEach(a=>a.onclick=()=>{e.tab=a.dataset.tab,g()}),sa()})}function ta(){return e.tab==="combate"?U(y):e.tab==="npcs"?Q(y):e.tab==="historia"?X(y):e.tab==="itens"?Z(y):e.chars.length?`<div class="party">${e.chars.map(ia).join("")}</div>`:`<div class="card empty"><h2>Esperando os aventureiros…</h2><p class="muted">Peça para cada jogador entrar no Grimório com a própria conta, abrir o personagem e, na aba <b>Ficha → Mesa</b>, digitar o código <b>${p(e.camp.joinCode)}</b>.</p></div>`}function sa(){if(e.tab==="combate")return _(y);if(e.tab==="npcs")return W(y);if(e.tab==="historia")return Y(y);if(e.tab==="itens")return aa(y);oa()}function ia(s){var $,w;const a=F(s,e.comp),{hp:n,conditions:d=[],dead:t,deathSaves:o={}}=s.state,r=n.max+n.temp,u=n.current/n.max,i=u>.5?"":u>.25?"mid":"low",l=Object.entries(s.state.spellSlots||{}),v=`${(($=a.sp)==null?void 0:$.nome)??""} · ${((w=a.cls)==null?void 0:w.nome)??""} ${a.level}${a.sub?" ("+a.sub.nome+")":""}`;return`<article class="card pc stack ${t?"dead":n.current===0?"down":""}" data-pc="${s.id}">
    <div><h3>${p(s.name)}</h3><div class="meta">${p(v)} · jogador: ${p(s.ownerName||"—")}</div></div>
    <div class="hpline"><span><b>${n.current}</b> / ${n.max} PV ${n.temp?`<span style="color:var(--temp)">+${n.temp}</span>`:""}</span>
      ${t?'<span class="chip bad">MORTO</span>':n.current===0?`<span class="chip bad">Caído · ✓${o.success||0} ✗${o.fail||0}</span>`:""}</div>
    <div class="hpbar"><div class="cur ${i}" style="width:${n.current/r*100}%"></div><div class="tmp" style="width:${n.temp/r*100}%"></div></div>
    <div class="ctl">
      <input type="number" inputmode="numeric" min="0" placeholder="0" aria-label="Valor para ${p(s.name)}" data-amt="${s.id}" value="${p(e.inputs[s.id]||"")}" />
      <button class="btn danger" data-hp="dano" data-id="${s.id}" title="Dano">−</button>
      <button class="btn heal" data-hp="cura" data-id="${s.id}" title="Cura">+</button>
      <button class="btn temp" data-hp="temp" data-id="${s.id}" title="PV temporário">T</button>
    </div>
    <div class="kv"><div><b>${s.build.ac??10}</b>CA</div><div><b>${N(a.initiative)}</b>Inic.</div><div><b>${a.passivePerception}</b>Perc. pass.</div><div><b>${a.spellDC??"—"}</b>CD magia</div></div>
    ${d.length?`<div class="row">${d.map(c=>`<button class="chip bad" data-rmcond="${c}" data-id="${s.id}" title="Remover">${q[c]||c} ✕</button>`).join("")}</div>`:""}
    ${l.length?`<div class="slotrow">${l.map(([c,f])=>`<button data-slot="${c}" data-id="${s.id}" title="Clique: gastar · Shift+clique: recuperar">${c}º ${f.max-f.used}/${f.max}</button>`).join("")}</div>`:""}
    <details class="more" data-more="${s.id}" ${e.open.has(s.id)?"open":""}><summary>Ficha completa</summary>
      <div class="stack" style="margin-top:.5rem">
        <div class="abil">${V.map(([c,f])=>`<div><small>${f.slice(0,3)}</small><b>${N(a.mods[c])}</b><small>${s.build.abilities[c]} · TR ${N(a.saves[c])}</small></div>`).join("")}</div>
        <div class="skl">${a.skills.map(c=>`<div>${c.prof?"●":"○"} ${c.nome} ${N(c.bonus)}</div>`).join("")}</div>
        <select data-addcond="${s.id}" aria-label="Aplicar condição"><option value="">Aplicar condição…</option>
          ${R.filter(c=>!d.includes(c)).map(c=>`<option value="${c}">${q[c]||c}</option>`).join("")}</select>
        ${(s.build.feats||[]).length?`<div><small class="muted">Talentos</small><div style="font-size:.88rem">${s.build.feats.map(c=>{var f;return p(((f=e.comp.byId.feats[c.id])==null?void 0:f.nome)||c.id)}).join(", ")}</div></div>`:""}
        ${(s.inventory||[]).length?`<div><small class="muted">Inventário</small><div style="font-size:.88rem">${s.inventory.map(c=>`${c.equipado?"🛡️":""}${p(c.nome)}${c.qtd>1?" ×"+c.qtd:""}`).join(", ")}</div></div>`:""}
        <div><small class="muted">Moedas</small><div style="font-size:.88rem">${["pl","po","pe","pp","pc"].map(c=>{var f;return`${Number((f=s.coins)==null?void 0:f[c])||0} ${c.toUpperCase()}`}).join(" · ")}</div></div>
        ${s.notes?`<div><small class="muted">Anotações do jogador</small><div style="white-space:pre-wrap;font-size:.9rem">${p(s.notes)}</div></div>`:""}
        <ul class="log">${(s.state.log||[]).map(c=>`<li>${p(c)}</li>`).join("")}</ul>
      </div></details>
  </article>`}function oa(){const s=a=>e.chars.find(n=>n.id===a);h.querySelectorAll("[data-amt]").forEach(a=>{a.oninput=()=>e.inputs[a.dataset.amt]=a.value,a.onkeydown=n=>{n.key==="Enter"&&h.querySelector(`[data-hp="${n.shiftKey?"cura":"dano"}"][data-id="${a.dataset.amt}"]`).click()}}),h.querySelectorAll("[data-hp]").forEach(a=>a.onclick=async()=>{const n=a.dataset.id,d=Number(e.inputs[n]);if(!d)return b("Digite um valor.");e.inputs[n]="";const t=await G(e.be,n,a.dataset.hp,d,{},"Mestre"),o=s(n);b(`${o==null?void 0:o.name}: ${t.log.at(-1)??""}${t.concentrationDC&&(o!=null&&o.state.concentration)?` · Concentração CD ${t.concentrationDC}`:""}`)}),h.querySelectorAll("[data-slot]").forEach(a=>a.onclick=n=>{const d=s(a.dataset.id),t=a.dataset.slot,o=d.state.spellSlots[t],r=n.shiftKey?Math.max(0,o.used-1):Math.min(o.max,o.used+1);e.be.updateCharacter(d.id,{[`state.spellSlots.${t}.used`]:r})}),h.querySelectorAll("[data-rmcond]").forEach(a=>a.onclick=()=>{const n=s(a.dataset.id);e.be.updateCharacter(n.id,{"state.conditions":n.state.conditions.filter(d=>d!==a.dataset.rmcond)})}),h.querySelectorAll("[data-addcond]").forEach(a=>a.onchange=()=>{const n=s(a.dataset.addcond);a.value&&e.be.updateCharacter(n.id,{"state.conditions":[...n.state.conditions||[],a.value]})}),h.querySelectorAll("[data-more]").forEach(a=>a.ontoggle=()=>a.open?e.open.add(a.dataset.more):e.open.delete(a.dataset.more))}
