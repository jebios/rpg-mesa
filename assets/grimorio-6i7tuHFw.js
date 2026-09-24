import"./pwa-DNJwNots.js";import{e as u,A as D,$ as v,j as J,f as I,k as O,m as ra,n as Y,o as da,q as ma,w as ua,S as pa,g as ba,r as va,l as $a,s as Q,a as la,b as na,x as ha,t as S,c as fa,d as ga,C as X,h as ya,i as H,y as Z}from"./auth-DIWDf66d.js";function aa(e){const c=String(e).replace(/\s/g,"").match(/^(\d*)d(\d+)([+-]\d+)?$/i);if(!c)return null;const a=Number(c[1]||1),r=Number(c[2]),n=Number(c[3]||0),o=Array.from({length:a},()=>1+Math.floor(Math.random()*r));return{rolls:o,bonus:n,total:o.reduce((l,m)=>l+m,0)+n}}const N=e=>u(e).replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>").replace(/(^|\s)_([^_]+)_(?=\s|$|[.,;:])/g,"$1<i>$2</i>");function q(e){if(!e)return"";const c=[];for(const a of String(e).split(/\n\n+/)){const r=a.split(`
`);if(r.every(n=>n.startsWith("| "))){c.push('<div class="mdtable"><table>'+r.map(n=>"<tr>"+n.slice(2).split(" | ").map(o=>`<td>${N(o)}</td>`).join("")+"</tr>").join("")+"</table></div>");continue}for(const n of r)n.startsWith("#### ")?c.push(`<h5>${N(n.slice(5))}</h5>`):n.startsWith("### ")?c.push(`<h4>${N(n.slice(4))}</h4>`):n.startsWith("| ")?c.push('<div class="mdtable"><table><tr>'+n.slice(2).split(" | ").map(o=>`<td>${N(o)}</td>`).join("")+"</tr></table></div>"):n.startsWith("• ")?c.push(`<p class="bullet">${N(n)}</p>`):c.push(`<p>${N(n)}</p>`)}return`<div class="md">${c.join("")}</div>`}const j=e=>String(e||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(),oa=Object.fromEntries(D),M=40,z=e=>e===0?"Truque":`${e}º círculo`,ea=()=>Math.random().toString(36).slice(2,9),k=(e,c,a,r=!1,n="",o="")=>`<details class="entry" ${r?"open":""} ${n}><summary><span class="t">${e}</span><span class="row" style="gap:.4rem;flex-wrap:nowrap"><span class="lvl-badge">${c||""}</span>${o}</span></summary><div class="body">${a}</div></details>`,F=(e,c,a="Adicionar")=>`<button class="btn small primary addbtn" ${e}="${c}" aria-label="${a}">+</button>`;function wa(e,c,a){const r=a.S,n=r.comp,o=new Set(e.build.classes.map(d=>d.classId)),l=n.classes.filter(d=>!o.has(d.id)),m=c.classesInfo.slice(1);return`
  <section class="card stack"><h2>Multiclasse</h2>
    <p class="empty-note" style="margin:0">Nível total: ${c.level}/20. Ao multiclassar, confira na aba Traços quais proficiências a nova classe concede (são menos do que na criação) e ajuste "Treinamento e Proficiências" à mão, se precisar.</p>
    ${m.length?m.map(d=>{var s,i,t,b,y;const h=((s=d.cls)==null?void 0:s.subclasses)||[];return`<div class="row" style="flex-wrap:wrap;gap:.5rem;border-top:1px solid var(--border,#3332);padding-top:.5rem">
        <b class="grow">${u(((i=d.cls)==null?void 0:i.nome)||d.classId)}</b>
        <div class="row" style="gap:.3rem"><button class="btn small" data-mcdown="${d.classId}" aria-label="Diminuir nível de ${u(((t=d.cls)==null?void 0:t.nome)||d.classId)}">−</button>
          <span style="min-width:1.4rem;text-align:center">${d.level}</span>
          <button class="btn small" data-mcup="${d.classId}" aria-label="Subir nível de ${u(((b=d.cls)==null?void 0:b.nome)||d.classId)}">+</button></div>
        ${h.length?`<select data-mcsub="${d.classId}" aria-label="Subclasse de ${u(((y=d.cls)==null?void 0:y.nome)||d.classId)}" ${d.level<3?"disabled":""}>
          <option value="">—</option>${h.map(f=>`<option value="${f.id}" ${f.id===d.subclassId?"selected":""}>${u(f.nome)}</option>`).join("")}</select>`:""}
        <button class="btn small danger" data-mcrm="${d.classId}">Remover</button>
      </div>`}).join(""):'<p class="empty-note">Personagem de classe única.</p>'}
    ${l.length&&c.level<20?`<form class="row" id="addclass">
      <select id="mcnew" class="grow" aria-label="Nova classe">${l.map(d=>`<option value="${d.id}">${u(d.nome)}</option>`).join("")}</select>
      <button class="btn primary small">+ Adicionar classe</button></form>`:""}
  </section>`}function ka(e,c,a){const r=a.S,n=a.app;n.querySelectorAll("[data-mcup]").forEach(o=>o.onclick=()=>{const l=e.build.classes.find(m=>m.classId===o.dataset.mcup);a.save(Y(e,r.comp,o.dataset.mcup,l.level+1))}),n.querySelectorAll("[data-mcdown]").forEach(o=>o.onclick=()=>{const l=e.build.classes.find(m=>m.classId===o.dataset.mcdown);if(l.level<=1)return a.toast('Nível mínimo 1 — use "Remover" para tirar a classe.');a.save(Y(e,r.comp,o.dataset.mcdown,l.level-1))}),n.querySelectorAll("[data-mcsub]").forEach(o=>o.onchange=()=>a.save(da(e,r.comp,o.dataset.mcsub,o.value||null))),n.querySelectorAll("[data-mcrm]").forEach(o=>o.onclick=()=>{if(!a.confirmTwice(`[data-mcrm="${o.dataset.mcrm}"]`,"Toque de novo para remover"))return;const l=ma(e,r.comp,o.dataset.mcrm);l&&a.save(l)}),v("#addclass")&&(v("#addclass").onsubmit=o=>{o.preventDefault();const l=ua(e,r.comp,v("#mcnew").value);l&&(a.save(l),a.toast("Classe adicionada no nível 1."))})}function Sa(e,c,a){var d,h;const r=a.S,n=e.build.classes[0].level,o=e.build.classes[0],l=((d=c.cls)==null?void 0:d.subclasses)||[],m=e.build.training||{};return`
  <section class="card stack">
    <div class="sectiontitle"><h2 style="margin:0">${c.multiclass?`${u(((h=c.cls)==null?void 0:h.nome)||"")} ${n}`:`Nível ${n}`}</h2>
      <div class="row"><button class="btn small" id="lvldown" aria-label="Diminuir nível">−</button><button class="btn small primary" id="lvlup" aria-label="Subir de nível">+ Nível</button></div></div>
    ${c.multiclass?`<p class="empty-note" style="margin:0">Classe principal (foi ela que deu o 1º dado de vida cheio). Nível total do personagem: ${c.level}.</p>`:""}
    ${l.length?`<div><label for="subclass">Subclasse${n<3?" (a partir do nível 3)":""}</label>
      <select id="subclass" ${n<3?"disabled":""}><option value="">—</option>${l.map(s=>`<option value="${s.id}" ${s.id===o.subclassId?"selected":""}>${u(s.nome)}</option>`).join("")}</select></div>`:""}
    <div class="stats">
      <div><b>${I(c.pb)}</b><small>Proficiência</small></div>
      <div><b>${I(c.initiative)}</b><small>Iniciativa</small></div>
      <div><b>${u(c.speed.replace(" metros"," m"))}</b><small>Deslocamento</small></div>
      <div><b>${c.passivePerception}</b><small>Perc. passiva</small></div>
    </div>
    <div class="row"><label for="ac" style="margin:0">Classe de Armadura</label>
      <input id="ac" type="number" inputmode="numeric" style="width:6rem" value="${e.build.ac??10}" /></div>
    <div class="row"><label for="hpmax" style="margin:0">PV Máximo</label>
      <input id="hpmax" type="number" inputmode="numeric" min="1" style="width:6rem" value="${e.state.hp.max}" /></div>
    <p class="empty-note" style="margin:0">O PV máximo pode ser ajustado à mão — use o valor rolado no dado com o Mestre. Ao subir de nível, o app só soma o ganho médio da regra a esse valor.</p>
  </section>

  ${wa(e,c,a)}

  <section class="card stack"><h2>Atributos e Salvaguardas</h2>
    <p class="empty-note">Toque em <b>Salvaguarda</b> para marcar/desmarcar proficiência.</p>
    <div class="abil2">${D.map(([s,i])=>{const t=(e.build.saveProfs||[]).includes(s);return`<div class="abcard">
        <small>${i}</small><b>${I(c.mods[s])}</b>
        <input class="abscore" data-score="${s}" type="number" inputmode="numeric" min="1" max="30" value="${e.build.abilities[s]}" aria-label="Valor de ${i}" />
        <button class="savebtn ${t?"on":""}" data-save="${s}" aria-pressed="${t}">
          <span class="dot ${t?"on":""}"></span>Salvaguarda <b>${I(c.saves[s])}</b></button>
      </div>`}).join("")}</div>
  </section>

  <section class="card"><h2>Perícias</h2><p class="empty-note">Toque para alternar: sem proficiência → proficiente (●) → especialista (◆).</p>
    <div class="skills">${c.skills.map(s=>`<button data-skill="${s.id}" aria-pressed="${s.prof||s.exp}">
      <span class="row" style="flex-wrap:nowrap"><span class="dot ${s.exp?"exp":s.prof?"on":""}"></span>${s.nome} <small class="muted">(${s.ab.toUpperCase()})</small></span><b>${I(s.bonus)}</b></button>`).join("")}</div>
  </section>

  <section class="card stack"><h2>Treinamento e Proficiências</h2>
    ${[["armaduras","Treinamento com Armaduras"],["armas","Proficiência com Armas"],["ferramentas","Proficiência com Ferramentas"],["idiomas","Idiomas"]].map(([s,i])=>`<div><label for="tr-${s}">${i}</label><textarea id="tr-${s}" data-train="${s}" rows="2">${u(m[s]||"")}</textarea></div>`).join("")}
  </section>

  <section class="card stack"><h2>Anotações</h2>
    <textarea id="notes" rows="5" placeholder="Aliados, pistas, história…">${u(e.notes)}</textarea></section>

  <section class="card stack"><h2>Mesa</h2>
    ${e.campaignId?`<p style="margin:0">Jogando em <b>${u(e.campaignName)}</b>. O Mestre dessa mesa pode ver e alterar esta ficha.</p>
         <button class="btn" id="leave-table">Sair da mesa</button>`:`<p class="muted" style="margin:0">Esta ficha não está em nenhuma mesa. Só você pode vê-la.</p>
         <form class="row" id="join"><input id="code" class="grow" autocomplete="off" autocapitalize="characters" placeholder="Código (ABC-123)" aria-label="Código da mesa" required style="width:auto" />
         <button class="btn primary">Entrar</button></form>`}
  </section>
  <section class="card stack"><h2>Conta</h2>
    <div class="row">${a.accountChip(r.user)}</div>
    <button class="btn danger small" id="delete">Apagar personagem</button>
  </section>`}let sa={};const T=(e,c,a=600)=>{clearTimeout(sa[e]),sa[e]=setTimeout(c,a)};function qa(e,c,a){const r=a.S,n=a.app,o=e.build.classes[0].level;v("#lvlup").onclick=()=>c.level<20&&a.save(O(e,r.comp,o+1)).then(()=>a.toast(`Nível ${o+1}! PV máximo, Dados de Vida e espaços atualizados.`)),v("#lvldown").onclick=()=>o>1&&a.save(O(e,r.comp,o-1)),v("#subclass")&&(v("#subclass").onchange=l=>a.save(O(e,r.comp,o,l.target.value||null))),ka(e,c,a),v("#ac").onchange=l=>a.save({"build.ac":Number(l.target.value)||10}),v("#hpmax").onchange=l=>{const m=Math.max(1,Number(l.target.value)||1);a.save({"state.hp":{...e.state.hp,max:m,current:Math.min(e.state.hp.current,m)}})},n.querySelectorAll("[data-score]").forEach(l=>l.onchange=()=>{const m=Math.max(1,Math.min(30,Number(l.value)||10)),d=l.dataset.score,h={[`build.abilities.${d}`]:m};d==="con"&&(h["state.hp"]={...e.state.hp,...ra(e,r.comp,m)}),a.save(h)}),n.querySelectorAll("[data-save]").forEach(l=>l.onclick=()=>{const m=l.dataset.save,d=e.build.saveProfs||[];a.save({"build.saveProfs":d.includes(m)?d.filter(h=>h!==m):[...d,m]})}),n.querySelectorAll("[data-skill]").forEach(l=>l.onclick=()=>{const m=l.dataset.skill,d=e.build.skillProfs||[],h=e.build.expertise||[];h.includes(m)?a.save({"build.expertise":h.filter(s=>s!==m),"build.skillProfs":d.filter(s=>s!==m)}):d.includes(m)?a.save({"build.expertise":[...h,m]}):a.save({"build.skillProfs":[...d,m]})}),n.querySelectorAll("[data-train]").forEach(l=>l.oninput=()=>T("tr"+l.dataset.train,()=>a.save({[`build.training.${l.dataset.train}`]:l.value}))),v("#notes").oninput=l=>T("notes",()=>a.save({notes:l.target.value})),a.bindLogout(r.be,n),v("#join")&&(v("#join").onsubmit=async l=>{l.preventDefault();try{const m=await r.be.joinByCode(v("#code").value);await r.be.updateCharacter(r.chId,{campaignId:m.id,campaignName:m.name}),a.toast(`${e.name} entrou na mesa ${m.name}.`)}catch(m){a.toast(m.message)}}),v("#leave-table")&&(v("#leave-table").onclick=()=>{a.confirmTwice("#leave-table","Toque de novo para confirmar")&&a.save({campaignId:null,campaignName:null})}),v("#delete").onclick=async()=>{if(!a.confirmTwice("#delete",`Toque de novo para apagar ${e.name}`))return;const l=r.chId;await r.be.deleteCharacter(l),a.showHome()}}function Aa(e,c,a){const r=a.S,n=r.comp,o=r.ui,l=e.build.spellsKnown||[],m=e.build.spellsPrepared||[],d=Object.entries(e.state.spellSlots||{}),h=Object.entries(e.state.pactSlots||{}),s=l.map(p=>n.byId.spells[p]).filter(Boolean).sort((p,g)=>p.nivel-g.nivel||p.nome.localeCompare(g.nome)),i={};s.forEach(p=>{var g;return(i[g=p.nivel]||(i[g]=[])).push(p)});const t=e.build.classes.map(p=>p.classId),b=c.classesInfo.map(p=>{var g;return(g=p.cls)==null?void 0:g.nome}).filter(Boolean).join(" + "),y=j(o.spellQ);let f=n.spells.filter(p=>!l.includes(p.id)&&(!o.spellMine||!c.casters.length||p.classes.some(g=>t.includes(g)))&&(o.spellLvl==="all"||String(p.nivel)===o.spellLvl)&&(!y||j(p.nome).includes(y)));const G=f.length;f=f.slice(0,M);const W=(p,g)=>`
    <div class="muted" style="font-size:.85rem">${u(p.escola)} · ${u(p.tempo)} · ${u(p.alcance)}<br>${u(p.componentes)} · ${u(p.duracao)}</div>
    ${q(p.desc)}
    <div class="row">${g?`${p.nivel>0?`<button class="btn small" data-prep="${p.id}">${m.includes(p.id)?"✓ Preparada":"Preparar"}</button>`:""}
         ${p.concentracao?`<button class="btn small" data-conc="${p.id}">${e.state.concentration===p.id?"Encerrar concentração":"Concentrar"}</button>`:""}
         <button class="btn small" data-forget="${p.id}">Remover</button>`:""}</div>`,U=p=>[p.concentracao?"C":"",p.ritual?"R":""].filter(Boolean).map(g=>`<span class="chip">${g}</span>`).join(" ");return`
  ${c.casters.length?`<section class="card stack">${c.casters.map(p=>`<div class="stats" style="grid-template-columns:repeat(3,1fr)">
    <div><b>${p.dc}</b><small>CD (${u(p.nome)})</small></div><div><b>${I(p.atk)}</b><small>Ataque mágico</small></div>
    <div><b>${oa[p.atributoConjuracao].slice(0,3)}</b><small>Atributo</small></div></div>`).join("")}</section>`:""}
  ${d.length?`<section class="card slots"><h2>Espaços de magia${c.multiclass?" (combinados)":""}</h2>
    ${d.map(([p,g])=>`<div class="lvl"><span>${p}º</span>${Array.from({length:g.max},(A,E)=>`<button class="slotpip ${E<g.used?"used":""}" data-slot="${p}" data-i="${E}" aria-label="Espaço de ${p}º círculo ${E+1}${E<g.used?", gasto":""}"></button>`).join("")}</div>`).join("")}
  </section>`:""}
  ${h.length?`<section class="card slots"><h2>Magia de Pacto</h2>
    ${h.map(([p,g])=>`<div class="lvl"><span>${p}º</span>${Array.from({length:g.max},(A,E)=>`<button class="slotpip ${E<g.used?"used":""}" data-pactslot="${p}" data-i="${E}" aria-label="Espaço de pacto ${E+1}${E<g.used?", gasto":""}"></button>`).join("")}</div>`).join("")}
  </section>`:""}
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Minhas magias</h2><span class="lvl-badge">${m.length} preparada(s)</span></div>
    ${Object.keys(i).length?Object.entries(i).map(([p,g])=>`<h3 style="margin:.6rem 0 .2rem;color:var(--muted)">${z(Number(p))}</h3>
      <div class="stack" style="--gap:.4rem">${g.map(A=>k(`${A.nivel>0&&m.includes(A.id)?"✓ ":""}${u(A.nome)} ${U(A)}`,z(A.nivel),W(A,!0),!1,`data-k="m-${A.id}"`)).join("")}</div>`).join(""):'<p class="empty-note">Nenhuma magia ainda. Adicione pela biblioteca abaixo.</p>'}
  </section>
  <section class="card stack"><h2>Biblioteca de magias</h2>
    <input id="spellq" type="search" placeholder="Buscar magia pelo nome…" value="${u(o.spellQ)}" aria-label="Buscar magia" />
    <div class="filters">${["all","0","1","2","3","4","5","6","7","8","9"].map(p=>`<button data-flvl="${p}" aria-pressed="${o.spellLvl===p}">${p==="all"?"Todas":p==="0"?"Truques":p+"º"}</button>`).join("")}</div>
    ${b?`<label class="chk"><input type="checkbox" id="spellmine" ${o.spellMine?"checked":""}> Só a lista de ${u(b)}</label>`:""}
    <p class="empty-note">${G} magia(s)${G>M?` — mostrando ${M}, refine a busca`:""}.</p>
    <div class="stack">${f.map(p=>k(`${u(p.nome)} ${U(p)}`,z(p.nivel),W(p,!1),!1,`data-k="l-${p.id}"`,F("data-learn",p.id,"Adicionar "+u(p.nome)))).join("")}</div>
  </section>`}function Ea(e,c,a){const r=a.S,n=a.app,o=r.ui;n.querySelectorAll("[data-slot]").forEach(l=>l.onclick=()=>{const m=l.dataset.slot,d=Number(l.dataset.i),h=e.state.spellSlots[m];a.save({[`state.spellSlots.${m}.used`]:d<h.used?d:d+1})}),n.querySelectorAll("[data-pactslot]").forEach(l=>l.onclick=()=>{const m=l.dataset.pactslot,d=Number(l.dataset.i),h=e.state.pactSlots[m];a.save({[`state.pactSlots.${m}.used`]:d<h.used?d:d+1})}),v("#spellq").oninput=l=>{o.spellQ=l.target.value,T("sq",a.render,250)},n.querySelectorAll("[data-flvl]").forEach(l=>l.onclick=()=>{o.spellLvl=l.dataset.flvl,a.render()}),v("#spellmine")&&(v("#spellmine").onchange=l=>{o.spellMine=l.target.checked,a.render()}),n.querySelectorAll("[data-learn]").forEach(l=>l.onclick=()=>a.save({"build.spellsKnown":[...e.build.spellsKnown||[],l.dataset.learn]})),n.querySelectorAll("[data-forget]").forEach(l=>l.onclick=()=>a.save({"build.spellsKnown":(e.build.spellsKnown||[]).filter(m=>m!==l.dataset.forget),"build.spellsPrepared":(e.build.spellsPrepared||[]).filter(m=>m!==l.dataset.forget)})),n.querySelectorAll("[data-prep]").forEach(l=>l.onclick=()=>{const m=e.build.spellsPrepared||[],d=l.dataset.prep;a.save({"build.spellsPrepared":m.includes(d)?m.filter(h=>h!==d):[...m,d]})}),n.querySelectorAll("[data-conc]").forEach(l=>l.onclick=()=>a.save({"state.concentration":e.state.concentration===l.dataset.conc?null:l.dataset.conc})),L(n,"spells")}const V={};function L(e,c){e.querySelectorAll("summary .addbtn").forEach(r=>r.addEventListener("click",n=>n.preventDefault()));const a=V[c]||(V[c]=new Set);e.querySelectorAll("details.entry").forEach((r,n)=>{var l;const o=r.dataset.k||((l=r.querySelector("summary .t"))==null?void 0:l.textContent)||n;a.has(o)&&(r.open=!0),r.addEventListener("toggle",()=>r.open?a.add(o):a.delete(o))})}function Ia(e,c,a){const{cls:r,sub:n,level:o,classId:l}=c;if(!r)return`<section class="card">Classe "${u(l)}" não encontrada no compêndio.</section>`;const m=r.caracteristicas||[],d=m.filter(i=>i.nivel<=o),h=m.filter(i=>i.nivel>o),s=e.build.opcoes||[];return`
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Características de ${u(r.nome)}</h2><span class="lvl-badge">nível ${o}</span></div>
    ${d.length?d.map(i=>k(u(i.nome),`Nível ${i.nivel}`,q(i.desc))).join(""):'<p class="empty-note">Importe o compêndio completo para ver as características.</p>'}
    ${h.length?`<details class="entry"><summary><span class="t muted">Próximos níveis (${h.length})</span></summary><div class="body stack">
      ${h.map(i=>k(u(i.nome),`Nível ${i.nivel}`,q(i.desc))).join("")}</div></details>`:""}
  </section>
  ${(r.opcoes||[]).map(i=>`<section class="card stack"><h2>${u(i.titulo.replace("Opções de ",""))} (${u(r.nome)})</h2>
    ${i.itens.filter(t=>s.includes(t.id)).map(t=>k("✓ "+u(t.nome),"",q(t.desc)+`<button class="btn small" data-unop="${t.id}">Remover</button>`)).join("")||'<p class="empty-note">Nenhuma escolhida.</p>'}
    <details class="entry"><summary><span class="t">Escolher ${u(i.titulo.replace("Opções de ","").toLowerCase())}</span><span class="lvl-badge">${i.itens.length}</span></summary><div class="body stack">
      ${i.itens.filter(t=>!s.includes(t.id)).map(t=>k(u(t.nome),"",q(t.desc),!1,`data-k="o-${l}-${t.id}"`,F("data-op",t.id,"Escolher "+u(t.nome)))).join("")}
    </div></details></section>`).join("")}
  <section class="card stack"><h2>Subclasse de ${u(r.nome)}${n?": "+u(n.nome):""}</h2>
    ${n?(n.caracteristicas||[]).map(i=>k(`${i.nivel>o?"🔒 ":""}${u(i.nome)}`,`Nível ${i.nivel}`,q(i.desc))).join(""):`<p class="empty-note">${o<3?"A subclasse é escolhida no nível 3.":"Escolha a subclasse na aba Ficha (ou em Multiclasse, para uma classe secundária)."}</p>
         ${(r.subclasses||[]).map(i=>k(u(i.nome),"",q(i.intro))).join("")}`}
  </section>`}function Ca(e,c,a){const r=c.sp,n=c.bg;return`
  ${c.classesInfo.map(o=>Ia(e,o)).join("")}
  <section class="card stack"><h2>Traços de ${u((r==null?void 0:r.nome)||"espécie")}</h2>
    <p class="empty-note">${u((r==null?void 0:r.tipo)||"")} · ${u((r==null?void 0:r.tamanho)||"")} · Deslocamento ${u((r==null?void 0:r.deslocamento)||"")}</p>
    ${((r==null?void 0:r.tracos)||[]).filter(o=>o.nome!=="Detalhes").map(o=>k(u(o.nome),"",q(o.desc))).join("")||'<p class="empty-note">Sem traços no compêndio.</p>'}
  </section>
  ${n?`<section class="card stack"><h2>Antecedente: ${u(n.nome)}</h2>
    <p style="margin:0;font-size:.92rem"><b>Atributos:</b> ${n.atributos.map(o=>oa[o]).join(", ")}<br>
    <b>Talento:</b> ${u(n.talento)}<br><b>Ferramenta:</b> ${u(n.ferramenta)}<br><b>Equipamento:</b> ${u(n.equipamento)}</p></section>`:""}`}function ja(e,c,a){const r=a.app,n=e.build.opcoes||[];r.querySelectorAll("[data-op]").forEach(o=>o.onclick=()=>a.save({"build.opcoes":[...n,o.dataset.op]})),r.querySelectorAll("[data-unop]").forEach(o=>o.onclick=()=>a.save({"build.opcoes":n.filter(l=>l!==o.dataset.unop)})),L(r,"classe")}const Na=["Origem","Geral","Estilo de Luta","Dádiva Épica"];function Da(e,c,a){const r=a.S,n=r.comp,o=r.ui,l=e.build.feats||[],m=j(o.featQ);let d=n.feats.filter(s=>(s.repetivel||!l.some(i=>i.id===s.id))&&(o.featCat==="all"||s.categoria===o.featCat)&&(!m||j(s.nome).includes(m)||j(s.prereq).includes(m)));const h=d.length;return d=d.slice(0,M),`
  <section class="card stack"><h2>Meus talentos</h2>
    ${l.length?l.map((s,i)=>{const t=n.byId.feats[s.id];return k(u((t==null?void 0:t.nome)||s.id),u(s.origem||(t==null?void 0:t.categoria)||""),(t?`<p class="empty-note">${u(t.categoria)}${t.prereq?" · Pré-requisito: "+u(t.prereq):""}</p>${q(t.desc)}`:'<p class="empty-note">Talento fora do compêndio.</p>')+`<button class="btn small" data-unfeat="${i}">Remover</button>`)}).join(""):'<p class="empty-note">Nenhum talento. Seu antecedente concede um talento de Origem.</p>'}
  </section>
  <section class="card stack"><h2>Biblioteca de talentos</h2>
    <input id="featq" type="search" placeholder="Buscar talento…" value="${u(o.featQ)}" aria-label="Buscar talento" />
    <div class="filters">${["all",...Na].map(s=>`<button data-fcat="${s}" aria-pressed="${o.featCat===s}">${s==="all"?"Todos":s}</button>`).join("")}</div>
    <p class="empty-note">${h} talento(s)${h>M?` — mostrando ${M}`:""}.</p>
    ${d.map(s=>k(u(s.nome),u(s.categoria),`${s.prereq?`<p class="empty-note">Pré-requisito: ${u(s.prereq)}</p>`:""}${q(s.desc)}`,!1,`data-k="f-${s.id}"`,F("data-feat",s.id,"Adicionar "+u(s.nome)))).join("")}
    ${n.feats.length?"":'<p class="empty-note">Importe o compêndio completo para usar a biblioteca de talentos.</p>'}
  </section>`}function Ma(e,c,a){const r=a.S,n=a.app,o=e.build.feats||[];v("#featq").oninput=l=>{r.ui.featQ=l.target.value,T("fq",a.render,250)},n.querySelectorAll("[data-fcat]").forEach(l=>l.onclick=()=>{r.ui.featCat=l.dataset.fcat,a.render()}),n.querySelectorAll("[data-feat]").forEach(l=>l.onclick=()=>{a.save({"build.feats":[...o,{id:l.dataset.feat,origem:"Escolhido"}]}),a.toast("Talento adicionado. Aplique aumentos de atributo na aba Ficha, se houver.")}),n.querySelectorAll("[data-unfeat]").forEach(l=>l.onclick=()=>a.save({"build.feats":o.filter((m,d)=>d!==Number(l.dataset.unfeat))})),L(n,"feats")}function Ta(e,c,a){const r=a.S,n=r.comp,o=r.ui,l=e.inventory||[],m=e.coins||{},d=j(o.itemQ),h=d.length>=2?n.items.filter(t=>j(t.nome).includes(d)).slice(0,25):[],s=Math.min(100,Math.round(c.weight/c.carry*100)),i=t=>t.tipo==="arma"?`${u(t.dano)} · ${u(t.propriedades)} · Maestria: ${u(t.maestria)}`:t.tipo==="armadura"?`CA ${u(t.ca)}${t.forca&&t.forca!=="—"?" · "+u(t.forca):""}${t.furtividade==="Desvantagem"?" · Desv. Furtividade":""}`:"";return`
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Bolsa de moedas</h2><span class="lvl-badge">≈ ${c.coinsGP.toLocaleString("pt-BR",{maximumFractionDigits:2})} PO</span></div>
    <div class="coins">${J.map(([t,b,y])=>`<label class="coin coin-${t}"><span>${b}</span>
      <input type="number" inputmode="numeric" min="0" data-coin="${t}" value="${Number(m[t])||0}" aria-label="${y}" /></label>`).join("")}</div>
    <form class="row" id="coinop">
      <input id="coinamt" type="number" inputmode="numeric" min="1" placeholder="Qtd." style="width:5.5rem" aria-label="Quantidade" />
      <select id="coinkind" style="width:5.5rem" aria-label="Moeda">${J.map(([t,b])=>`<option value="${t}" ${t==="po"?"selected":""}>${b}</option>`).join("")}</select>
      <button class="btn heal small" data-cop="+">Receber</button><button class="btn danger small" data-cop="-">Gastar</button>
    </form>
  </section>
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Inventário</h2><span class="lvl-badge">${c.weight.toLocaleString("pt-BR",{maximumFractionDigits:1})} / ${c.carry} kg</span></div>
    <div class="hpbar" aria-hidden="true"><div class="cur ${s>100?"low":s>75?"mid":""}" style="width:${s}%"></div></div>
    ${l.length?l.map(t=>{const b=t.itemId?n.byId.weapons[t.itemId]||n.byId.armor[t.itemId]||n.byId.gear[t.itemId]:null;return k(`${t.equipado?"🛡️ ":""}${u(t.nome)}${Number(t.qtd)>1?` <span class="muted">×${t.qtd}</span>`:""}`,u(t.peso||""),`${b?`<p class="empty-note">${i(b)}${b.custo?" · "+u(b.custo):""}</p>${b.desc?q(b.desc):""}`:""}
        <div class="row">
          <button class="btn small" data-qty="${t.uid}" data-d="-1">−</button><b>${t.qtd}</b><button class="btn small" data-qty="${t.uid}" data-d="1">+</button>
          <label class="chk"><input type="checkbox" data-equip="${t.uid}" ${t.equipado?"checked":""}> Equipado</label>
          <label class="chk"><input type="checkbox" data-attune="${t.uid}" ${t.sintonizado?"checked":""}> Sintonizado</label>
        </div>
        <input data-inote="${t.uid}" id="inote-${t.uid}" value="${u(t.notas||"")}" placeholder="Notas (cargas, efeitos…)" aria-label="Notas do item" />
        <button class="btn small danger" data-rmitem="${t.uid}">Remover item</button>`,!1,`data-k="i-${t.uid}"`)}).join(""):'<p class="empty-note">Inventário vazio.</p>'}
  </section>
  <section class="card stack"><h2>Adicionar item</h2>
    <input id="itemq" type="search" placeholder="Buscar armas, armaduras, equipamento… (2+ letras)" value="${u(o.itemQ)}" aria-label="Buscar item" />
    ${h.map(t=>`<div class="libitem"><div class="info"><b>${u(t.nome)}</b><small>${u(t.custo||"")}${t.peso?" · "+u(t.peso):""} ${i(t)?"· "+i(t):""}</small></div>
      <button class="btn small primary" data-additem="${t.id}">+</button></div>`).join("")}
    ${d.length>=2&&!h.length?'<p class="empty-note">Nada encontrado — use o item personalizado abaixo.</p>':""}
    <form class="row" id="custom">
      <input id="cname" class="grow" placeholder="Item personalizado" required style="width:auto" aria-label="Nome do item" />
      <input id="cweight" placeholder="kg" inputmode="decimal" style="width:4.5rem" aria-label="Peso em kg" />
      <button class="btn small">Adicionar</button>
    </form>
  </section>`}function Pa(e,c,a){const r=a.S,n=a.app,o=r.comp,l=e.inventory||[],m={pc:0,pp:0,pe:0,po:0,pl:0,...e.coins||{}},d=s=>a.save({inventory:s});n.querySelectorAll("[data-coin]").forEach(s=>s.onchange=()=>a.save({coins:{...m,[s.dataset.coin]:Math.max(0,Number(s.value)||0)}})),n.querySelectorAll("[data-cop]").forEach(s=>s.onclick=i=>{i.preventDefault();const t=Number(v("#coinamt").value),b=v("#coinkind").value;if(!t)return a.toast("Digite a quantidade.");const y=m[b]+(s.dataset.cop==="+"?t:-t);if(y<0)return a.toast(`Não há ${t} ${b.toUpperCase()} suficientes.`);a.save({coins:{...m,[b]:y}})}),v("#itemq").oninput=s=>{r.ui.itemQ=s.target.value,T("iq",a.render,250)},n.querySelectorAll("[data-additem]").forEach(s=>s.onclick=()=>{const i=o.items.find(b=>b.id===s.dataset.additem),t=l.find(b=>b.itemId===i.id);d(t?l.map(b=>b===t?{...b,qtd:Number(b.qtd)+1}:b):[...l,{uid:ea(),itemId:i.id,nome:i.nome,qtd:1,peso:i.peso||"",equipado:!1,sintonizado:!1,notas:""}]),a.toast(`${i.nome} adicionado.`)}),v("#custom").onsubmit=s=>{s.preventDefault();const i=v("#cweight").value.trim();d([...l,{uid:ea(),itemId:null,nome:v("#cname").value.trim(),qtd:1,peso:i?`${i} kg`:"",equipado:!1,sintonizado:!1,notas:""}])};const h=(s,i)=>d(l.map(t=>t.uid===s?i(t):t));n.querySelectorAll("[data-qty]").forEach(s=>s.onclick=()=>h(s.dataset.qty,i=>({...i,qtd:Math.max(0,Number(i.qtd)+Number(s.dataset.d))}))),n.querySelectorAll("[data-equip]").forEach(s=>s.onchange=()=>h(s.dataset.equip,i=>({...i,equipado:s.checked}))),n.querySelectorAll("[data-attune]").forEach(s=>s.onchange=()=>{if(s.checked&&l.filter(i=>i.sintonizado).length>=3)return s.checked=!1,a.toast("Limite de 3 itens sintonizados.");h(s.dataset.attune,i=>({...i,sintonizado:s.checked}))}),n.querySelectorAll("[data-inote]").forEach(s=>s.oninput=()=>T("in"+s.dataset.inote,()=>h(s.dataset.inote,i=>({...i,notas:s.value})))),n.querySelectorAll("[data-rmitem]").forEach(s=>s.onclick=()=>d(l.filter(i=>i.uid!==s.dataset.rmitem))),L(n,"itens")}const La={ficha:{html:Sa,bind:qa},magias:{html:Aa,bind:Ea},classe:{html:Ca,bind:ja},talentos:{html:Da,bind:Ma},itens:{html:Ta,bind:Pa}},w=v("#app"),$={be:null,comp:null,user:null,chId:null,ch:null,tab:"combate",amount:"",off:[],prevHp:null,ui:{spellQ:"",spellLvl:"all",spellMine:!0,featQ:"",featCat:"all",itemQ:"",libOpen:{}}},_=()=>`rpgmesa:last:${$.user.uid}`,B=()=>{$.off.forEach(e=>e()),$.off=[]},ta=Object.fromEntries(pa.map(([e,c])=>[e,c])),R=Object.fromEntries(D);Ba().catch(e=>{w.innerHTML=`<div class="wrap"><div class="card">Erro ao iniciar: ${u(e.message)}</div></div>`});async function Ba(){$.be=await ba(),va($.be,w,{title:"Grimório do Aventureiro",subtitle:"Entre com sua conta para acessar seus personagens em qualquer aparelho.",onSignedOut:()=>{B(),$.ch=null,$.chId=null,$.prevHp=null}},async e=>{$.user=e,w.innerHTML='<p class="muted" style="padding:1rem">Carregando compêndio…</p>',$.comp=await $a($.be);const c=Q.get(_());c?K(c):P()})}const ia=()=>$.be.mode==="local"?'<p class="banner">Modo demo: os dados ficam neste navegador. Abra o Escudo em outra aba para testar a sincronização.</p>':"",Oa=()=>$.comp.completo?"":'<p class="banner">Biblioteca reduzida: o Mestre ainda não importou o compêndio completo no Escudo.</p>';function P(){B(),$.chId=null,$.ch=null,Q.set(_(),null);let e=!1;$.off.push($.be.watchMyCharacters(c=>{v("#build")||(c.sort((a,r)=>a.name.localeCompare(r.name)),w.innerHTML=`<header class="top"><div class="row"><div class="grow name">Meus personagens</div>
      <a class="btn small" href="./escudo.html" title="Ir para o Escudo do Mestre">🛡️ Escudo</a>${la($.user)}</div></header>
    <main class="wrap stack">${ia()}${Oa()}
      ${c.map(a=>`<button class="charbtn" data-open="${a.id}">
        <span><b>${u(a.name)}</b><br><small class="muted">${u(ca(a))}</small></span>
        <span class="chip">${a.campaignName?"🎲 "+u(a.campaignName):"Sem mesa"}</span></button>`).join("")}
      ${c.length?"":'<div class="card"><p style="margin:0">Você ainda não tem personagens. Crie o primeiro abaixo — ele fica salvo na sua conta.</p></div>'}
      <button class="btn primary" id="newchar" style="width:100%">+ Novo personagem</button>
    </main>`,na($.be,w),w.querySelectorAll("[data-open]").forEach(a=>a.onclick=()=>K(a.dataset.open)),v("#newchar").onclick=()=>Ha(),!c.length&&!e&&(e=!0))}))}function Ha(){B();const e=$.comp,c=[15,14,13,12,10,8];w.innerHTML=`<header class="top"><div class="row"><button class="btn small" id="back" aria-label="Voltar">◀</button><div class="grow name">Novo personagem</div></div></header>
  <main class="wrap stack">
  <form class="stack" id="build">
    <section class="card stack">
      <div><label for="name">Nome</label><input id="name" name="name" required maxlength="40" /></div>
      <div class="row">
        <div class="grow"><label for="species">Espécie</label><select id="species" name="species">
          ${e.species.map(s=>`<option value="${s.id}">${u(s.nome)}</option>`).join("")}</select></div>
        <div style="width:5.5rem"><label for="level">Nível</label><input id="level" name="level" type="number" inputmode="numeric" min="1" max="20" value="1" /></div>
      </div>
      <div><label for="class">Classe</label><select id="class" name="class">
        ${e.classes.map(s=>`<option value="${s.id}">${u(s.nome)}</option>`).join("")}</select></div>
      <div id="classinfo"></div>
    </section>
    ${e.backgrounds.length?`<section class="card stack">
      <div><label for="bg">Antecedente</label><select id="bg" name="bg">
        ${e.backgrounds.map(s=>`<option value="${s.id}">${u(s.nome)}</option>`).join("")}</select></div>
      <div id="bginfo"></div>
    </section>`:""}
    <section class="card stack">
      <h2>Atributos</h2>
      <p class="muted" style="margin:0;font-size:.9rem">Valores base (Modo Padrão: 15, 14, 13, 12, 10, 8). O bônus do antecedente é somado automaticamente.</p>
      <div class="ab-inputs">${D.map(([s,i],t)=>`<div><label for="ab-${s}">${i} <b class="abfinal" data-ab="${s}"></b></label>
        <input id="ab-${s}" name="${s}" type="number" inputmode="numeric" min="3" max="20" value="${c[t]}" /></div>`).join("")}</div>
    </section>
    <button class="btn primary" style="width:100%">Criar ficha</button>
  </form></main>`,v("#back").onclick=P;const a=v("#build"),r=()=>e.byId.classes[a.class.value],n=()=>{var s,i;return(i=e.byId.backgrounds)==null?void 0:i[(s=a.bg)==null?void 0:s.value]};function o(){var t;const s=r(),i=(t=s.periciasOpcoes)!=null&&t.length?s.periciasOpcoes:[];v("#classinfo").innerHTML=`
      <p class="muted" style="margin:.2rem 0;font-size:.88rem">Dado de Vida d${s.dadoVida} · Salvaguardas: ${(s.salvaguardas||[]).map(b=>R[b]).join(", ")}</p>
      ${i.length?`<div><label>Perícias da classe — escolha ${s.periciasEscolha} <span id="skcount"></span></label>
        <div class="checks">${i.map(b=>`<label class="chk"><input type="checkbox" name="sk" value="${b}"> ${ta[b]}</label>`).join("")}</div></div>`:""}`,a.querySelectorAll("[name=sk]").forEach(b=>b.onchange=l),l()}function l(){var y;const s=r(),i=((y=n())==null?void 0:y.pericias)||[],t=[...a.querySelectorAll("[name=sk]")];t.forEach(f=>{i.includes(f.value)&&(f.checked=!1,f.disabled=!0,f.parentElement.title="Já vem do antecedente")});const b=t.filter(f=>f.checked).length;t.forEach(f=>{i.includes(f.value)||(f.disabled=!f.checked&&b>=s.periciasEscolha)}),v("#skcount")&&(v("#skcount").textContent=`(${b}/${s.periciasEscolha})`)}function m(){const s=n();if(!s)return;const i=e.byId.feats[s.talentoId];v("#bginfo").innerHTML=`
      <p style="margin:.2rem 0;font-size:.9rem"><b>Perícias:</b> ${s.pericias.map(t=>ta[t]).join(", ")}<br>
      <b>Talento:</b> ${u((i==null?void 0:i.nome)||s.talento)}<br><b>Ferramenta:</b> ${u(s.ferramenta)}</p>
      <div class="row">
        <div class="grow"><label for="plus2">+2 em</label><select id="plus2">${s.atributos.map(t=>`<option value="${t}">${R[t]}</option>`).join("")}<option value="all">+1 nos três</option></select></div>
        <div class="grow" id="plus1wrap"><label for="plus1">+1 em</label><select id="plus1">${s.atributos.map((t,b)=>`<option value="${t}" ${b===1?"selected":""}>${R[t]}</option>`).join("")}</select></div>
      </div>
      <details class="entry"><summary><span class="t">Equipamento do antecedente</span></summary><div class="body">${u(s.equipamento)}</div></details>`,v("#plus2").onchange=v("#plus1").onchange=h,h(),l()}function d(){const s=n(),i={};if(!s)return i;const t=v("#plus2").value;if(t==="all")s.atributos.forEach(b=>i[b]=1);else{i[t]=2;const b=v("#plus1").value;b!==t&&(i[b]=(i[b]||0)+1)}return i}function h(){const s=d();v("#plus1wrap")&&(v("#plus1wrap").style.visibility=v("#plus2").value==="all"?"hidden":""),a.querySelectorAll(".abfinal").forEach(i=>{const t=i.dataset.ab,b=Math.min(20,Number(a[t].value)+(s[t]||0));i.textContent=s[t]?`→ ${b} (${I(Z(b))})`:`(${I(Z(b))})`})}a.class.onchange=o,a.bg&&(a.bg.onchange=m),D.forEach(([s])=>a[s].oninput=h),o(),m(),h(),a.onsubmit=async s=>{var y;s.preventDefault();const i=d(),t=Object.fromEntries(D.map(([f])=>[f,Math.min(20,Number(a[f].value)+(i[f]||0))])),b=ha({name:a.name.value.trim(),ownerUid:$.user.uid,speciesId:a.species.value,classId:a.class.value,level:Number(a.level.value),abilities:t,backgroundId:((y=a.bg)==null?void 0:y.value)||null,skillProfs:[...a.querySelectorAll("[name=sk]:checked")].map(f=>f.value)},e);try{K(await $.be.createCharacter(b))}catch(f){S(f.message)}}}const ca=e=>{const c=$.comp.byId.species[e.build.speciesId];return`${(c==null?void 0:c.nome)??""} · ${fa(e.build,$.comp)}`};function K(e){B(),$.chId=e,$.prevHp=null,Q.set(_(),e),$.off.push($.be.watchCharacter(e,c=>{if(!c)return P();const a=$.prevHp;if($.prevHp=c.state.hp.current+c.state.hp.temp,$.ch=c,x(),a!=null&&a!==$.prevHp){const r=v("#hpcard");r==null||r.classList.add($.prevHp<a?"flash-dmg":"flash-heal"),navigator.vibrate&&$.prevHp<a&&navigator.vibrate(80)}}))}const za=[["combate","❤️","Combate"],["ficha","📜","Ficha"],["magias","✨","Magias"],["classe","🛡️","Traços"],["talentos","⭐","Talentos"],["itens","🎒","Itens"]],C={get S(){return $},app:w,render:()=>x(),save:e=>$.be.updateCharacter($.chId,e).catch(c=>S(c.message)),toast:S,showHome:()=>P(),confirmTwice:Va,accountChip:la,bindLogout:na};function x(){const e=$.ch,c=ga(e,$.comp),a=document.activeElement,r=a==null?void 0:a.id,n=a&&"selectionStart"in a?[a.selectionStart,a.selectionEnd]:null,o=window.scrollY,l={combate:{html:Ra,bind:Qa},...La},m=l[$.tab]||l.combate;if(w.innerHTML=`
    <header class="top">
      <div class="row"><button class="btn small" id="home" aria-label="Meus personagens">◀</button>
        <div class="grow"><div class="name">${u(e.name)}</div>
        <div class="mini"><span>${u(ca(e))}</span>${e.campaignName?`<span>🎲 ${u(e.campaignName)}</span>`:""}</div></div>
        <div class="mini"><span>CA <b>${e.build.ac??10}</b></span><span>PV <b>${e.state.hp.current}/${e.state.hp.max}</b></span></div>
        <a class="btn small" href="./escudo.html" title="Ir para o Escudo do Mestre">🛡️</a></div>
    </header>
    <main class="wrap stack">${ia()}${m.html(e,c,C)}</main>
    <nav class="tabs" role="tablist">${za.map(([d,h,s])=>`<button role="tab" aria-selected="${$.tab===d}" data-tab="${d}"><span class="ico" aria-hidden="true">${h}</span>${s}</button>`).join("")}</nav>`,w.querySelectorAll("[data-tab]").forEach(d=>d.onclick=()=>{$.tab=d.dataset.tab,x(),window.scrollTo(0,0)}),v("#home").onclick=P,m.bind(e,c,C),window.scrollTo(0,o),r){const d=document.getElementById(r);if(d&&(d.focus({preventScroll:!0}),n&&"setSelectionRange"in d))try{d.setSelectionRange(...n)}catch{}}}function Va(e,c){const a=v(e);if(a.dataset.armed)return!0;a.dataset.armed="1";const r=a.textContent;return a.textContent=c,setTimeout(()=>{a.isConnected&&(delete a.dataset.armed,a.textContent=r)},3e3),!1}function Ra(e,c){const{hp:a,deathSaves:r={success:0,fail:0},conditions:n=[],dead:o}=e.state,l=a.max+a.temp,m=Math.round(a.current/l*100),d=Math.round(a.temp/l*100),h=a.current/a.max>.5?"":a.current/a.max>.25?"mid":"low",s=a.current===0&&!o,i=e.state.concentration?$.comp.byId.spells[e.state.concentration]:null;return`
  <section class="card stack" id="hpcard">
    <div class="hp-big"><div class="num">${a.current}<small> / ${a.max}</small></div>
      ${a.temp?`<div class="tmpv">+${a.temp} temporários</div>`:""}
      ${o?'<div class="chip bad" style="margin-top:.4rem">MORTO</div>':""}</div>
    <div class="hpbar" aria-hidden="true"><div class="cur ${h}" style="width:${m}%"></div><div class="tmp" style="width:${d}%"></div></div>
    <input id="amount" class="amount" type="number" inputmode="numeric" min="0" placeholder="0" value="${u($.amount)}" aria-label="Valor" />
    <div class="quick">${[1,2,5,10,"C"].map(t=>`<button class="btn small" data-q="${t}">${t==="C"?"Limpar":"+"+t}</button>`).join("")}</div>
    <div class="toggles">
      <label><input type="checkbox" id="o-res" /> Resistência</label>
      <label><input type="checkbox" id="o-vul" /> Vulnerável</label>
      <label><input type="checkbox" id="o-crit" /> Crítico</label>
    </div>
    <div class="hp-actions">
      <button class="btn danger" data-act="dano">Dano</button>
      <button class="btn heal" data-act="cura">Cura</button>
      <button class="btn temp" data-act="temp">PV Temp.</button>
    </div>
  </section>
  <section class="card"><div class="stats">
    <div><b>${e.build.ac??10}</b><small>CA</small></div>
    <div><b>${I(c.initiative)}</b><small>Iniciativa</small></div>
    <div><b>${u(c.speed.replace(" metros"," m"))}</b><small>Deslocamento</small></div>
    <div><b>${c.passivePerception}</b><small>Perc. passiva</small></div>
  </div></section>
  ${i?`<p class="banner">Concentrando em: <b>${u(i.nome)}</b> <button class="btn small" id="endconc" style="margin-left:.5rem">Encerrar</button></p>`:""}
  ${s?`<section class="card stack"><h2>Testes contra a morte</h2>
    <div class="saves"><div><small class="muted">Sucessos</small><div class="pips">${[0,1,2].map(t=>`<span class="pip ${t<r.success?"s":""}"></span>`).join("")}</div></div>
      <div><small class="muted">Falhas</small><div class="pips">${[0,1,2].map(t=>`<span class="pip ${t<r.fail?"f":""}"></span>`).join("")}</div></div></div>
    <button class="btn primary" id="roll-death" style="width:100%">Rolar d20</button></section>`:""}
  <section class="card stack"><h2>Condições</h2>
    <div class="row">${n.map(t=>`<button class="chip bad" data-rmcond="${t}" aria-label="Remover ${t}">${X[t]||t} ✕</button>`).join("")||'<span class="muted">Nenhuma</span>'}</div>
    <div class="row"><select id="addcond" class="grow" aria-label="Adicionar condição"><option value="">Adicionar condição…</option>
      ${ya.filter(t=>!n.includes(t)).map(t=>`<option value="${t}">${X[t]||t}</option>`).join("")}</select></div>
  </section>
  <section class="card stack"><h2>Descanso</h2>
    ${(e.state.hitDice.byClass||[]).length>1?e.state.hitDice.byClass.map(t=>{const b=$.comp.byId.classes[t.classId];return`<div class="row" style="justify-content:space-between"><span class="muted">${u((b==null?void 0:b.nome)||t.classId)}: ${t.max-t.used}/${t.max} (d${t.die})</span>
            <button class="btn small" data-shortclass="${t.classId}">Gastar</button></div>`}).join(""):`<p class="muted" style="margin:0">Dados de Vida: ${e.state.hitDice.max-e.state.hitDice.used}/${e.state.hitDice.max} (d${e.state.hitDice.die})</p>
         <div class="row"><button class="btn grow" id="short">Gastar 1 Dado de Vida</button></div>`}
    <div class="row"><button class="btn grow" id="long">Descanso Longo</button></div>
  </section>
  <section class="card"><h2>Registro</h2><ul class="log">${(e.state.log||[]).map(t=>`<li>${u(t)}</li>`).join("")||"<li>—</li>"}</ul></section>`}function Qa(e,c){const a=v("#amount");a.oninput=()=>$.amount=a.value,w.querySelectorAll("[data-q]").forEach(n=>n.onclick=()=>{$.amount=n.dataset.q==="C"?"":String((Number($.amount)||0)+Number(n.dataset.q)),a.value=$.amount}),w.querySelectorAll("[data-act]").forEach(n=>n.onclick=async()=>{const o=Number($.amount);if(!o)return S("Digite um valor.");const l={resistant:v("#o-res").checked,vulnerable:v("#o-vul").checked,critical:v("#o-crit").checked};$.amount="";const m=await H($.be,$.chId,n.dataset.act,o,l,e.name);m.concentrationDC&&e.state.concentration?S(`Teste de Concentração: CD ${m.concentrationDC}`):m.log.length&&S(m.log.at(-1))}),v("#endconc")&&(v("#endconc").onclick=()=>C.save({"state.concentration":null})),v("#roll-death")&&(v("#roll-death").onclick=async()=>{const n=aa("1d20").total,o=await H($.be,$.chId,"morte",n,{},e.name);S(`d20 = ${n}. ${o.log.at(-1)??""}`)}),w.querySelectorAll("[data-rmcond]").forEach(n=>n.onclick=()=>C.save({"state.conditions":e.state.conditions.filter(o=>o!==n.dataset.rmcond)})),v("#addcond").onchange=n=>n.target.value&&C.save({"state.conditions":[...e.state.conditions,n.target.value]});const r=async(n,o)=>{const l=aa(`1d${n}`).total+c.mods.con;await o();const m=await H($.be,$.chId,"cura",Math.max(0,l),{},e.name);S(`Dado de Vida: ${l}. ${m.log[0]??""}`)};v("#short")&&(v("#short").onclick=()=>{const n=e.state.hitDice;if(n.used>=n.max)return S("Sem Dados de Vida disponíveis.");r(n.die,()=>C.save({"state.hitDice.used":n.used+1}))}),w.querySelectorAll("[data-shortclass]").forEach(n=>n.onclick=()=>{const o=e.state.hitDice.byClass,l=o.findIndex(h=>h.classId===n.dataset.shortclass),m=o[l];if(m.used>=m.max)return S("Sem Dados de Vida dessa classe.");const d=o.map((h,s)=>s===l?{...h,used:h.used+1}:h);r(m.die,()=>C.save({"state.hitDice.byClass":d,"state.hitDice.used":d.reduce((h,s)=>h+s.used,0)}))}),v("#long").onclick=async()=>{const n=Object.fromEntries(Object.entries(e.state.spellSlots||{}).map(([m,d])=>[m,{...d,used:0}])),o=Object.fromEntries(Object.entries(e.state.pactSlots||{}).map(([m,d])=>[m,{...d,used:0}])),l=(e.state.hitDice.byClass||[]).map(m=>({...m,used:0}));await C.save({"state.hp":{...e.state.hp,current:e.state.hp.max,temp:0},"state.spellSlots":n,"state.pactSlots":o,"state.hitDice":{...e.state.hitDice,byClass:l,used:0},"state.deathSaves":{success:0,fail:0},"state.conditions":e.state.conditions.filter(m=>!["inconsciente","estabilizado"].includes(m))}),S("Descanso longo concluído.")}}
