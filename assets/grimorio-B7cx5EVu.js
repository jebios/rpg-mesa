import"./pwa-DNJwNots.js";import{e as u,A as D,$ as b,j as Y,f as N,k as V,m as ra,n as J,o as da,q as ua,w as ma,S as pa,g as ba,r as va,l as $a,s as x,a as la,b as na,x as fa,t as A,c as ha,d as ga,C as X,h as ya,i as R,y as Z}from"./auth-DIWDf66d.js";function aa(e){const i=String(e).replace(/\s/g,"").match(/^(\d*)d(\d+)([+-]\d+)?$/i);if(!i)return null;const a=Number(i[1]||1),c=Number(i[2]),t=Number(i[3]||0),o=Array.from({length:a},()=>1+Math.floor(Math.random()*c));return{rolls:o,bonus:t,total:o.reduce((s,d)=>s+d,0)+t}}const P=e=>u(e).replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>").replace(/(^|\s)_([^_]+)_(?=\s|$|[.,;:])/g,"$1<i>$2</i>");function C(e){if(!e)return"";const i=[];for(const a of String(e).split(/\n\n+/)){const c=a.split(`
`);if(c.every(t=>t.startsWith("| "))){i.push('<div class="mdtable"><table>'+c.map(t=>"<tr>"+t.slice(2).split(" | ").map(o=>`<td>${P(o)}</td>`).join("")+"</tr>").join("")+"</table></div>");continue}for(const t of c)t.startsWith("#### ")?i.push(`<h5>${P(t.slice(5))}</h5>`):t.startsWith("### ")?i.push(`<h4>${P(t.slice(4))}</h4>`):t.startsWith("| ")?i.push('<div class="mdtable"><table><tr>'+t.slice(2).split(" | ").map(o=>`<td>${P(o)}</td>`).join("")+"</tr></table></div>"):t.startsWith("• ")?i.push(`<p class="bullet">${P(t)}</p>`):i.push(`<p>${P(t)}</p>`)}return`<div class="md">${i.join("")}</div>`}const T=e=>String(e||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(),oa=Object.fromEntries(D),B=40,Q=e=>e===0?"Truque":`${e}º círculo`,ea=()=>Math.random().toString(36).slice(2,9),E=(e,i,a,c=!1,t="",o="")=>`<details class="entry" ${c?"open":""} ${t}><summary><span class="t">${e}</span><span class="row" style="gap:.4rem;flex-wrap:nowrap"><span class="lvl-badge">${i||""}</span>${o}</span></summary><div class="body">${a}</div></details>`,K=(e,i,a="Adicionar")=>`<button class="btn small primary addbtn" ${e}="${i}" aria-label="${a}">+</button>`;function wa(e,i,a){const c=a.S,t=c.comp,o=new Set(e.build.classes.map(r=>r.classId)),s=t.classes.filter(r=>!o.has(r.id)),d=i.classesInfo.slice(1);return`
  <section class="card stack"><h2>Multiclasse</h2>
    <p class="empty-note" style="margin:0">Nível total: ${i.level}/20. Ao multiclassar, confira na aba Traços quais proficiências a nova classe concede (são menos do que na criação) e ajuste "Treinamento e Proficiências" à mão, se precisar.</p>
    ${d.length?d.map(r=>{var n,m,l,y,q;const f=((n=r.cls)==null?void 0:n.subclasses)||[];return`<div class="row" style="flex-wrap:wrap;gap:.5rem;border-top:1px solid var(--border,#3332);padding-top:.5rem">
        <b class="grow">${u(((m=r.cls)==null?void 0:m.nome)||r.classId)}</b>
        <div class="row" style="gap:.3rem"><button class="btn small" data-mcdown="${r.classId}" aria-label="Diminuir nível de ${u(((l=r.cls)==null?void 0:l.nome)||r.classId)}">−</button>
          <span style="min-width:1.4rem;text-align:center">${r.level}</span>
          <button class="btn small" data-mcup="${r.classId}" aria-label="Subir nível de ${u(((y=r.cls)==null?void 0:y.nome)||r.classId)}">+</button></div>
        ${f.length?`<select data-mcsub="${r.classId}" aria-label="Subclasse de ${u(((q=r.cls)==null?void 0:q.nome)||r.classId)}" ${r.level<3?"disabled":""}>
          <option value="">—</option>${f.map(v=>`<option value="${v.id}" ${v.id===r.subclassId?"selected":""}>${u(v.nome)}</option>`).join("")}</select>`:""}
        <button class="btn small danger" data-mcrm="${r.classId}">Remover</button>
      </div>`}).join(""):'<p class="empty-note">Personagem de classe única.</p>'}
    ${s.length&&i.level<20?`<form class="row" id="addclass">
      <select id="mcnew" class="grow" aria-label="Nova classe">${s.map(r=>`<option value="${r.id}">${u(r.nome)}</option>`).join("")}</select>
      <button class="btn primary small">+ Adicionar classe</button></form>`:""}
  </section>`}function Sa(e,i,a){const c=a.S,t=a.app;t.querySelectorAll("[data-mcup]").forEach(o=>o.onclick=()=>{const s=e.build.classes.find(d=>d.classId===o.dataset.mcup);a.save(J(e,c.comp,o.dataset.mcup,s.level+1))}),t.querySelectorAll("[data-mcdown]").forEach(o=>o.onclick=()=>{const s=e.build.classes.find(d=>d.classId===o.dataset.mcdown);if(s.level<=1)return a.toast('Nível mínimo 1 — use "Remover" para tirar a classe.');a.save(J(e,c.comp,o.dataset.mcdown,s.level-1))}),t.querySelectorAll("[data-mcsub]").forEach(o=>o.onchange=()=>a.save(da(e,c.comp,o.dataset.mcsub,o.value||null))),t.querySelectorAll("[data-mcrm]").forEach(o=>o.onclick=()=>{if(!a.confirmTwice(`[data-mcrm="${o.dataset.mcrm}"]`,"Toque de novo para remover"))return;const s=ua(e,c.comp,o.dataset.mcrm);s&&a.save(s)}),b("#addclass")&&(b("#addclass").onsubmit=o=>{o.preventDefault();const s=ma(e,c.comp,b("#mcnew").value);s&&(a.save(s),a.toast("Classe adicionada no nível 1."))})}function ka(e,i,a){var r,f;const c=a.S,t=e.build.classes[0].level,o=e.build.classes[0],s=((r=i.cls)==null?void 0:r.subclasses)||[],d=e.build.training||{};return`
  <section class="card stack">
    <div class="sectiontitle"><h2 style="margin:0">${i.multiclass?`${u(((f=i.cls)==null?void 0:f.nome)||"")} ${t}`:`Nível ${t}`}</h2>
      <div class="row"><button class="btn small" id="lvldown" aria-label="Diminuir nível">−</button><button class="btn small primary" id="lvlup" aria-label="Subir de nível">+ Nível</button></div></div>
    ${i.multiclass?`<p class="empty-note" style="margin:0">Classe principal (foi ela que deu o 1º dado de vida cheio). Nível total do personagem: ${i.level}.</p>`:""}
    ${s.length?`<div><label for="subclass">Subclasse${t<3?" (a partir do nível 3)":""}</label>
      <select id="subclass" ${t<3?"disabled":""}><option value="">—</option>${s.map(n=>`<option value="${n.id}" ${n.id===o.subclassId?"selected":""}>${u(n.nome)}</option>`).join("")}</select></div>`:""}
    <div class="stats">
      <div><b>${N(i.pb)}</b><small>Proficiência</small></div>
      <div><b>${N(i.initiative)}</b><small>Iniciativa</small></div>
      <div><b>${u(i.speed.replace(" metros"," m"))}</b><small>Deslocamento</small></div>
      <div><b>${i.passivePerception}</b><small>Perc. passiva</small></div>
    </div>
    <div class="row"><label for="ac" style="margin:0">Classe de Armadura</label>
      <input id="ac" type="number" inputmode="numeric" style="width:6rem" value="${e.build.ac??10}" /></div>
    <div class="row"><label for="hpmax" style="margin:0">PV Máximo</label>
      <input id="hpmax" type="number" inputmode="numeric" min="1" style="width:6rem" value="${e.state.hp.max}" /></div>
    <p class="empty-note" style="margin:0">O PV máximo pode ser ajustado à mão — use o valor rolado no dado com o Mestre. Ao subir de nível, o app só soma o ganho médio da regra a esse valor.</p>
  </section>

  ${wa(e,i,a)}

  <section class="card stack"><h2>Atributos e Salvaguardas</h2>
    <p class="empty-note">Toque em <b>Salvaguarda</b> para marcar/desmarcar proficiência.</p>
    <div class="abil2">${D.map(([n,m])=>{const l=(e.build.saveProfs||[]).includes(n);return`<div class="abcard">
        <small>${m}</small><b>${N(i.mods[n])}</b>
        <input class="abscore" data-score="${n}" type="number" inputmode="numeric" min="1" max="30" value="${e.build.abilities[n]}" aria-label="Valor de ${m}" />
        <button class="savebtn ${l?"on":""}" data-save="${n}" aria-pressed="${l}">
          <span class="dot ${l?"on":""}"></span>Salvaguarda <b>${N(i.saves[n])}</b></button>
      </div>`}).join("")}</div>
  </section>

  <section class="card"><h2>Perícias</h2><p class="empty-note">Toque para alternar: sem proficiência → proficiente (●) → especialista (◆).</p>
    <div class="skills">${i.skills.map(n=>`<button data-skill="${n.id}" aria-pressed="${n.prof||n.exp}">
      <span class="row" style="flex-wrap:nowrap"><span class="dot ${n.exp?"exp":n.prof?"on":""}"></span>${n.nome} <small class="muted">(${n.ab.toUpperCase()})</small></span><b>${N(n.bonus)}</b></button>`).join("")}</div>
  </section>

  <section class="card stack"><h2>Treinamento e Proficiências</h2>
    ${[["armaduras","Treinamento com Armaduras"],["armas","Proficiência com Armas"],["ferramentas","Proficiência com Ferramentas"],["idiomas","Idiomas"]].map(([n,m])=>`<div><label for="tr-${n}">${m}</label><textarea id="tr-${n}" data-train="${n}" rows="2">${u(d[n]||"")}</textarea></div>`).join("")}
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
    <div class="row">${a.accountChip(c.user)}</div>
    <button class="btn danger small" id="delete">Apagar personagem</button>
  </section>`}let sa={};const L=(e,i,a=600)=>{clearTimeout(sa[e]),sa[e]=setTimeout(i,a)};function qa(e,i,a){const c=a.S,t=a.app,o=e.build.classes[0].level;b("#lvlup").onclick=()=>i.level<20&&a.save(V(e,c.comp,o+1)).then(()=>a.toast(`Nível ${o+1}! PV máximo, Dados de Vida e espaços atualizados.`)),b("#lvldown").onclick=()=>o>1&&a.save(V(e,c.comp,o-1)),b("#subclass")&&(b("#subclass").onchange=s=>a.save(V(e,c.comp,o,s.target.value||null))),Sa(e,i,a),b("#ac").onchange=s=>a.save({"build.ac":Number(s.target.value)||10}),b("#hpmax").onchange=s=>{const d=Math.max(1,Number(s.target.value)||1);a.save({"state.hp":{...e.state.hp,max:d,current:Math.min(e.state.hp.current,d)}})},t.querySelectorAll("[data-score]").forEach(s=>s.onchange=()=>{const d=Math.max(1,Math.min(30,Number(s.value)||10)),r=s.dataset.score,f={[`build.abilities.${r}`]:d};r==="con"&&(f["state.hp"]={...e.state.hp,...ra(e,c.comp,d)}),a.save(f)}),t.querySelectorAll("[data-save]").forEach(s=>s.onclick=()=>{const d=s.dataset.save,r=e.build.saveProfs||[];a.save({"build.saveProfs":r.includes(d)?r.filter(f=>f!==d):[...r,d]})}),t.querySelectorAll("[data-skill]").forEach(s=>s.onclick=()=>{const d=s.dataset.skill,r=e.build.skillProfs||[],f=e.build.expertise||[];f.includes(d)?a.save({"build.expertise":f.filter(n=>n!==d),"build.skillProfs":r.filter(n=>n!==d)}):r.includes(d)?a.save({"build.expertise":[...f,d]}):a.save({"build.skillProfs":[...r,d]})}),t.querySelectorAll("[data-train]").forEach(s=>s.oninput=()=>L("tr"+s.dataset.train,()=>a.save({[`build.training.${s.dataset.train}`]:s.value}))),b("#notes").oninput=s=>L("notes",()=>a.save({notes:s.target.value})),a.bindLogout(c.be,t),b("#join")&&(b("#join").onsubmit=async s=>{s.preventDefault();try{const d=await c.be.joinByCode(b("#code").value);await c.be.updateCharacter(c.chId,{campaignId:d.id,campaignName:d.name}),a.toast(`${e.name} entrou na mesa ${d.name}.`)}catch(d){a.toast(d.message)}}),b("#leave-table")&&(b("#leave-table").onclick=()=>{a.confirmTwice("#leave-table","Toque de novo para confirmar")&&a.save({campaignId:null,campaignName:null})}),b("#delete").onclick=async()=>{if(!a.confirmTwice("#delete",`Toque de novo para apagar ${e.name}`))return;const s=c.chId;await c.be.deleteCharacter(s),a.showHome()}}function Aa(e,i,a){const c=a.S,t=c.comp,o=c.ui,s=e.build.spellsKnown||[],d=e.build.spellsPrepared||[],r=Object.entries(e.state.spellSlots||{}),f=Object.entries(e.state.pactSlots||{}),n=s.map(p=>t.byId.spells[p]).filter(Boolean).sort((p,h)=>p.nivel-h.nivel||p.nome.localeCompare(h.nome)),m={};n.forEach(p=>{var h;return(m[h=p.nivel]||(m[h]=[])).push(p)});const l=e.build.classes.map(p=>p.classId),y=i.classesInfo.map(p=>{var h;return(h=p.cls)==null?void 0:h.nome}).filter(Boolean).join(" + "),q=T(o.spellQ);let v=t.spells.filter(p=>!s.includes(p.id)&&(!o.spellMine||!i.casters.length||p.classes.some(h=>l.includes(h)))&&(o.spellLvl==="all"||String(p.nivel)===o.spellLvl)&&(!q||T(p.nome).includes(q)));const g=v.length;v=v.slice(0,B);const S=(p,h)=>`
    <div class="muted" style="font-size:.85rem">${u(p.escola)} · ${u(p.tempo)} · ${u(p.alcance)}<br>${u(p.componentes)} · ${u(p.duracao)}</div>
    ${C(p.desc)}
    <div class="row">${h?`${p.nivel>0?`<button class="btn small" data-prep="${p.id}">${d.includes(p.id)?"✓ Preparada":"Preparar"}</button>`:""}
         ${p.concentracao?`<button class="btn small" data-conc="${p.id}">${e.state.concentration===p.id?"Encerrar concentração":"Concentrar"}</button>`:""}
         <button class="btn small" data-forget="${p.id}">Remover</button>`:""}</div>`,w=p=>[p.concentracao?"C":"",p.ritual?"R":""].filter(Boolean).map(h=>`<span class="chip">${h}</span>`).join(" ");return`
  ${i.casters.length?`<section class="card stack">${i.casters.map(p=>`<div class="stats" style="grid-template-columns:repeat(3,1fr)">
    <div><b>${p.dc}</b><small>CD (${u(p.nome)})</small></div><div><b>${N(p.atk)}</b><small>Ataque mágico</small></div>
    <div><b>${oa[p.atributoConjuracao].slice(0,3)}</b><small>Atributo</small></div></div>`).join("")}</section>`:""}
  ${r.length?`<section class="card slots"><h2>Espaços de magia${i.multiclass?" (combinados)":""}</h2>
    ${r.map(([p,h])=>`<div class="lvl"><span>${p}º</span>${Array.from({length:h.max},(I,j)=>`<button class="slotpip ${j<h.used?"used":""}" data-slot="${p}" data-i="${j}" aria-label="Espaço de ${p}º círculo ${j+1}${j<h.used?", gasto":""}"></button>`).join("")}</div>`).join("")}
  </section>`:""}
  ${f.length?`<section class="card slots"><h2>Magia de Pacto</h2>
    ${f.map(([p,h])=>`<div class="lvl"><span>${p}º</span>${Array.from({length:h.max},(I,j)=>`<button class="slotpip ${j<h.used?"used":""}" data-pactslot="${p}" data-i="${j}" aria-label="Espaço de pacto ${j+1}${j<h.used?", gasto":""}"></button>`).join("")}</div>`).join("")}
  </section>`:""}
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Minhas magias</h2><span class="lvl-badge">${d.length} preparada(s)</span></div>
    ${Object.keys(m).length?Object.entries(m).map(([p,h])=>`<h3 style="margin:.6rem 0 .2rem;color:var(--muted)">${Q(Number(p))}</h3>
      <div class="stack" style="--gap:.4rem">${h.map(I=>E(`${I.nivel>0&&d.includes(I.id)?"✓ ":""}${u(I.nome)} ${w(I)}`,Q(I.nivel),S(I,!0),!1,`data-k="m-${I.id}"`)).join("")}</div>`).join(""):'<p class="empty-note">Nenhuma magia ainda. Adicione pela biblioteca abaixo.</p>'}
  </section>
  <section class="card stack"><h2>Biblioteca de magias</h2>
    <input id="spellq" type="search" placeholder="Buscar magia pelo nome…" value="${u(o.spellQ)}" aria-label="Buscar magia" />
    <div class="filters">${["all","0","1","2","3","4","5","6","7","8","9"].map(p=>`<button data-flvl="${p}" aria-pressed="${o.spellLvl===p}">${p==="all"?"Todas":p==="0"?"Truques":p+"º"}</button>`).join("")}</div>
    ${y?`<label class="chk"><input type="checkbox" id="spellmine" ${o.spellMine?"checked":""}> Só a lista de ${u(y)}</label>`:""}
    <p class="empty-note">${g} magia(s)${g>B?` — mostrando ${B}, refine a busca`:""}.</p>
    <div class="stack">${v.map(p=>E(`${u(p.nome)} ${w(p)}`,Q(p.nivel),S(p,!1),!1,`data-k="l-${p.id}"`,K("data-learn",p.id,"Adicionar "+u(p.nome)))).join("")}</div>
  </section>`}function Ea(e,i,a){const c=a.S,t=a.app,o=c.ui;t.querySelectorAll("[data-slot]").forEach(s=>s.onclick=()=>{const d=s.dataset.slot,r=Number(s.dataset.i),f=e.state.spellSlots[d];a.save({[`state.spellSlots.${d}.used`]:r<f.used?r:r+1})}),t.querySelectorAll("[data-pactslot]").forEach(s=>s.onclick=()=>{const d=s.dataset.pactslot,r=Number(s.dataset.i),f=e.state.pactSlots[d];a.save({[`state.pactSlots.${d}.used`]:r<f.used?r:r+1})}),b("#spellq").oninput=s=>{o.spellQ=s.target.value,L("sq",a.render,250)},t.querySelectorAll("[data-flvl]").forEach(s=>s.onclick=()=>{o.spellLvl=s.dataset.flvl,a.render()}),b("#spellmine")&&(b("#spellmine").onchange=s=>{o.spellMine=s.target.checked,a.render()}),t.querySelectorAll("[data-learn]").forEach(s=>s.onclick=()=>a.save({"build.spellsKnown":[...e.build.spellsKnown||[],s.dataset.learn]})),t.querySelectorAll("[data-forget]").forEach(s=>s.onclick=()=>a.save({"build.spellsKnown":(e.build.spellsKnown||[]).filter(d=>d!==s.dataset.forget),"build.spellsPrepared":(e.build.spellsPrepared||[]).filter(d=>d!==s.dataset.forget)})),t.querySelectorAll("[data-prep]").forEach(s=>s.onclick=()=>{const d=e.build.spellsPrepared||[],r=s.dataset.prep;a.save({"build.spellsPrepared":d.includes(r)?d.filter(f=>f!==r):[...d,r]})}),t.querySelectorAll("[data-conc]").forEach(s=>s.onclick=()=>a.save({"state.concentration":e.state.concentration===s.dataset.conc?null:s.dataset.conc})),H(t,"spells")}const _={};function H(e,i){e.querySelectorAll("summary .addbtn").forEach(c=>c.addEventListener("click",t=>t.preventDefault()));const a=_[i]||(_[i]=new Set);e.querySelectorAll("details.entry").forEach((c,t)=>{var s;const o=c.dataset.k||((s=c.querySelector("summary .t"))==null?void 0:s.textContent)||t;a.has(o)&&(c.open=!0),c.addEventListener("toggle",()=>c.open?a.add(o):a.delete(o))})}function Ca(e,i,a){const{cls:c,sub:t,level:o,classId:s}=i;if(!c)return`<section class="card">Classe "${u(s)}" não encontrada no compêndio.</section>`;const d=c.caracteristicas||[],r=d.filter(m=>m.nivel<=o),f=d.filter(m=>m.nivel>o),n=e.build.opcoes||[];return`
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Características de ${u(c.nome)}</h2><span class="lvl-badge">nível ${o}</span></div>
    ${r.length?r.map(m=>E(u(m.nome),`Nível ${m.nivel}`,C(m.desc))).join(""):'<p class="empty-note">Importe o compêndio completo para ver as características.</p>'}
    ${f.length?`<details class="entry"><summary><span class="t muted">Próximos níveis (${f.length})</span></summary><div class="body stack">
      ${f.map(m=>E(u(m.nome),`Nível ${m.nivel}`,C(m.desc))).join("")}</div></details>`:""}
  </section>
  ${(c.opcoes||[]).map(m=>`<section class="card stack"><h2>${u(m.titulo.replace("Opções de ",""))} (${u(c.nome)})</h2>
    ${m.itens.filter(l=>n.includes(l.id)).map(l=>E("✓ "+u(l.nome),"",C(l.desc)+`<button class="btn small" data-unop="${l.id}">Remover</button>`)).join("")||'<p class="empty-note">Nenhuma escolhida.</p>'}
    <details class="entry"><summary><span class="t">Escolher ${u(m.titulo.replace("Opções de ","").toLowerCase())}</span><span class="lvl-badge">${m.itens.length}</span></summary><div class="body stack">
      ${m.itens.filter(l=>!n.includes(l.id)).map(l=>E(u(l.nome),"",C(l.desc),!1,`data-k="o-${s}-${l.id}"`,K("data-op",l.id,"Escolher "+u(l.nome)))).join("")}
    </div></details></section>`).join("")}
  <section class="card stack"><h2>Subclasse de ${u(c.nome)}${t?": "+u(t.nome):""}</h2>
    ${t?(t.caracteristicas||[]).map(m=>E(`${m.nivel>o?"🔒 ":""}${u(m.nome)}`,`Nível ${m.nivel}`,C(m.desc))).join(""):`<p class="empty-note">${o<3?"A subclasse é escolhida no nível 3.":"Escolha a subclasse na aba Ficha (ou em Multiclasse, para uma classe secundária)."}</p>
         ${(c.subclasses||[]).map(m=>E(u(m.nome),"",C(m.intro))).join("")}`}
  </section>`}function Ia(e,i,a){const c=i.sp,t=i.bg;return`
  ${i.classesInfo.map(o=>Ca(e,o)).join("")}
  <section class="card stack"><h2>Traços de ${u((c==null?void 0:c.nome)||"espécie")}</h2>
    <p class="empty-note">${u((c==null?void 0:c.tipo)||"")} · ${u((c==null?void 0:c.tamanho)||"")} · Deslocamento ${u((c==null?void 0:c.deslocamento)||"")}</p>
    ${((c==null?void 0:c.tracos)||[]).filter(o=>o.nome!=="Detalhes").map(o=>E(u(o.nome),"",C(o.desc))).join("")||'<p class="empty-note">Sem traços no compêndio.</p>'}
  </section>
  ${t?`<section class="card stack"><h2>Antecedente: ${u(t.nome)}</h2>
    <p style="margin:0;font-size:.92rem"><b>Atributos:</b> ${t.atributos.map(o=>oa[o]).join(", ")}<br>
    <b>Talento:</b> ${u(t.talento)}<br><b>Ferramenta:</b> ${u(t.ferramenta)}<br><b>Equipamento:</b> ${u(t.equipamento)}</p></section>`:""}`}function ja(e,i,a){const c=a.app,t=e.build.opcoes||[];c.querySelectorAll("[data-op]").forEach(o=>o.onclick=()=>a.save({"build.opcoes":[...t,o.dataset.op]})),c.querySelectorAll("[data-unop]").forEach(o=>o.onclick=()=>a.save({"build.opcoes":t.filter(s=>s!==o.dataset.unop)})),H(c,"classe")}const Na=["Origem","Geral","Estilo de Luta","Dádiva Épica"];function Ma(e,i,a){const c=a.S,t=c.comp,o=c.ui,s=e.build.feats||[],d=T(o.featQ);let r=t.feats.filter(n=>(n.repetivel||!s.some(m=>m.id===n.id))&&(o.featCat==="all"||n.categoria===o.featCat)&&(!d||T(n.nome).includes(d)||T(n.prereq).includes(d)));const f=r.length;return r=r.slice(0,B),`
  <section class="card stack"><h2>Meus talentos</h2>
    ${s.length?s.map((n,m)=>{const l=t.byId.feats[n.id];return E(u((l==null?void 0:l.nome)||n.id),u(n.origem||(l==null?void 0:l.categoria)||""),(l?`<p class="empty-note">${u(l.categoria)}${l.prereq?" · Pré-requisito: "+u(l.prereq):""}</p>${C(l.desc)}`:'<p class="empty-note">Talento fora do compêndio.</p>')+`<button class="btn small" data-unfeat="${m}">Remover</button>`)}).join(""):'<p class="empty-note">Nenhum talento. Seu antecedente concede um talento de Origem.</p>'}
  </section>
  <section class="card stack"><h2>Biblioteca de talentos</h2>
    <input id="featq" type="search" placeholder="Buscar talento…" value="${u(o.featQ)}" aria-label="Buscar talento" />
    <div class="filters">${["all",...Na].map(n=>`<button data-fcat="${n}" aria-pressed="${o.featCat===n}">${n==="all"?"Todos":n}</button>`).join("")}</div>
    <p class="empty-note">${f} talento(s)${f>B?` — mostrando ${B}`:""}.</p>
    ${r.map(n=>E(u(n.nome),u(n.categoria),`${n.prereq?`<p class="empty-note">Pré-requisito: ${u(n.prereq)}</p>`:""}${C(n.desc)}`,!1,`data-k="f-${n.id}"`,K("data-feat",n.id,"Adicionar "+u(n.nome)))).join("")}
    ${t.feats.length?"":'<p class="empty-note">Importe o compêndio completo para usar a biblioteca de talentos.</p>'}
  </section>`}function Da(e,i,a){const c=a.S,t=a.app,o=e.build.feats||[];b("#featq").oninput=s=>{c.ui.featQ=s.target.value,L("fq",a.render,250)},t.querySelectorAll("[data-fcat]").forEach(s=>s.onclick=()=>{c.ui.featCat=s.dataset.fcat,a.render()}),t.querySelectorAll("[data-feat]").forEach(s=>s.onclick=()=>{a.save({"build.feats":[...o,{id:s.dataset.feat,origem:"Escolhido"}]}),a.toast("Talento adicionado. Aplique aumentos de atributo na aba Ficha, se houver.")}),t.querySelectorAll("[data-unfeat]").forEach(s=>s.onclick=()=>a.save({"build.feats":o.filter((d,r)=>r!==Number(s.dataset.unfeat))})),H(t,"feats")}function Ta(e,i,a){const c=a.S,t=c.comp,o=c.ui,s=e.inventory||[],d=e.coins||{},r=T(o.itemQ),f=r.length>=2?t.items.filter(l=>T(l.nome).includes(r)).slice(0,25):[],n=Math.min(100,Math.round(i.weight/i.carry*100)),m=l=>l.tipo==="arma"?`${u(l.dano)} · ${u(l.propriedades)} · Maestria: ${u(l.maestria)}`:l.tipo==="armadura"?`CA ${u(l.ca)}${l.forca&&l.forca!=="—"?" · "+u(l.forca):""}${l.furtividade==="Desvantagem"?" · Desv. Furtividade":""}`:"";return`
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Bolsa de moedas</h2><span class="lvl-badge">≈ ${i.coinsGP.toLocaleString("pt-BR",{maximumFractionDigits:2})} PO</span></div>
    <div class="coins">${Y.map(([l,y,q])=>`<label class="coin coin-${l}"><span>${y}</span>
      <input type="number" inputmode="numeric" min="0" data-coin="${l}" value="${Number(d[l])||0}" aria-label="${q}" /></label>`).join("")}</div>
    <form class="row" id="coinop">
      <input id="coinamt" type="number" inputmode="numeric" min="1" placeholder="Qtd." style="width:5.5rem" aria-label="Quantidade" />
      <select id="coinkind" style="width:5.5rem" aria-label="Moeda">${Y.map(([l,y])=>`<option value="${l}" ${l==="po"?"selected":""}>${y}</option>`).join("")}</select>
      <button class="btn heal small" data-cop="+">Receber</button><button class="btn danger small" data-cop="-">Gastar</button>
    </form>
  </section>
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Inventário</h2><span class="lvl-badge">${i.weight.toLocaleString("pt-BR",{maximumFractionDigits:1})} / ${i.carry} kg</span></div>
    <div class="hpbar" aria-hidden="true"><div class="cur ${n>100?"low":n>75?"mid":""}" style="width:${n}%"></div></div>
    ${s.length?s.map(l=>{const y=l.itemId?t.byId.weapons[l.itemId]||t.byId.armor[l.itemId]||t.byId.gear[l.itemId]:null;return E(`${l.equipado?"🛡️ ":""}${u(l.nome)}${Number(l.qtd)>1?` <span class="muted">×${l.qtd}</span>`:""}`,u(l.peso||""),`${y?`<p class="empty-note">${m(y)}${y.custo?" · "+u(y.custo):""}</p>${y.desc?C(y.desc):""}`:""}
        <div class="row">
          <button class="btn small" data-qty="${l.uid}" data-d="-1">−</button><b>${l.qtd}</b><button class="btn small" data-qty="${l.uid}" data-d="1">+</button>
          <label class="chk"><input type="checkbox" data-equip="${l.uid}" ${l.equipado?"checked":""}> Equipado</label>
          <label class="chk"><input type="checkbox" data-attune="${l.uid}" ${l.sintonizado?"checked":""}> Sintonizado</label>
        </div>
        <input data-inote="${l.uid}" id="inote-${l.uid}" value="${u(l.notas||"")}" placeholder="Notas (cargas, efeitos…)" aria-label="Notas do item" />
        <button class="btn small danger" data-rmitem="${l.uid}">Remover item</button>`,!1,`data-k="i-${l.uid}"`)}).join(""):'<p class="empty-note">Inventário vazio.</p>'}
  </section>
  <section class="card stack"><h2>Adicionar item</h2>
    <input id="itemq" type="search" placeholder="Buscar armas, armaduras, equipamento… (2+ letras)" value="${u(o.itemQ)}" aria-label="Buscar item" />
    ${f.map(l=>`<div class="libitem"><div class="info"><b>${u(l.nome)}</b><small>${u(l.custo||"")}${l.peso?" · "+u(l.peso):""} ${m(l)?"· "+m(l):""}</small></div>
      <button class="btn small primary" data-additem="${l.id}">+</button></div>`).join("")}
    ${r.length>=2&&!f.length?'<p class="empty-note">Nada encontrado — use o item personalizado abaixo.</p>':""}
    <form class="row" id="custom">
      <input id="cname" class="grow" placeholder="Item personalizado" required style="width:auto" aria-label="Nome do item" />
      <input id="cweight" placeholder="kg" inputmode="decimal" style="width:4.5rem" aria-label="Peso em kg" />
      <button class="btn small">Adicionar</button>
    </form>
  </section>`}function Pa(e,i,a){const c=a.S,t=a.app,o=c.comp,s=e.inventory||[],d={pc:0,pp:0,pe:0,po:0,pl:0,...e.coins||{}},r=n=>a.save({inventory:n});t.querySelectorAll("[data-coin]").forEach(n=>n.onchange=()=>a.save({coins:{...d,[n.dataset.coin]:Math.max(0,Number(n.value)||0)}})),t.querySelectorAll("[data-cop]").forEach(n=>n.onclick=m=>{m.preventDefault();const l=Number(b("#coinamt").value),y=b("#coinkind").value;if(!l)return a.toast("Digite a quantidade.");const q=d[y]+(n.dataset.cop==="+"?l:-l);if(q<0)return a.toast(`Não há ${l} ${y.toUpperCase()} suficientes.`);a.save({coins:{...d,[y]:q}})}),b("#itemq").oninput=n=>{c.ui.itemQ=n.target.value,L("iq",a.render,250)},t.querySelectorAll("[data-additem]").forEach(n=>n.onclick=()=>{const m=o.items.find(y=>y.id===n.dataset.additem),l=s.find(y=>y.itemId===m.id);r(l?s.map(y=>y===l?{...y,qtd:Number(y.qtd)+1}:y):[...s,{uid:ea(),itemId:m.id,nome:m.nome,qtd:1,peso:m.peso||"",equipado:!1,sintonizado:!1,notas:""}]),a.toast(`${m.nome} adicionado.`)}),b("#custom").onsubmit=n=>{n.preventDefault();const m=b("#cweight").value.trim();r([...s,{uid:ea(),itemId:null,nome:b("#cname").value.trim(),qtd:1,peso:m?`${m} kg`:"",equipado:!1,sintonizado:!1,notas:""}])};const f=(n,m)=>r(s.map(l=>l.uid===n?m(l):l));t.querySelectorAll("[data-qty]").forEach(n=>n.onclick=()=>f(n.dataset.qty,m=>({...m,qtd:Math.max(0,Number(m.qtd)+Number(n.dataset.d))}))),t.querySelectorAll("[data-equip]").forEach(n=>n.onchange=()=>f(n.dataset.equip,m=>({...m,equipado:n.checked}))),t.querySelectorAll("[data-attune]").forEach(n=>n.onchange=()=>{if(n.checked&&s.filter(m=>m.sintonizado).length>=3)return n.checked=!1,a.toast("Limite de 3 itens sintonizados.");f(n.dataset.attune,m=>({...m,sintonizado:n.checked}))}),t.querySelectorAll("[data-inote]").forEach(n=>n.oninput=()=>L("in"+n.dataset.inote,()=>f(n.dataset.inote,m=>({...m,notas:n.value})))),t.querySelectorAll("[data-rmitem]").forEach(n=>n.onclick=()=>r(s.filter(m=>m.uid!==n.dataset.rmitem))),H(t,"itens")}const Ba={ficha:{html:ka,bind:qa},magias:{html:Aa,bind:Ea},classe:{html:Ia,bind:ja},talentos:{html:Ma,bind:Da},itens:{html:Ta,bind:Pa}},k=b("#app"),$={be:null,comp:null,user:null,chId:null,ch:null,tab:"combate",amount:"",off:[],prevHp:null,ui:{spellQ:"",spellLvl:"all",spellMine:!0,featQ:"",featCat:"all",itemQ:"",libOpen:{}}},G=()=>`rpgmesa:last:${$.user.uid}`,z=()=>{$.off.forEach(e=>e()),$.off=[]},ta=Object.fromEntries(pa.map(([e,i])=>[e,i])),F=Object.fromEntries(D);La().catch(e=>{k.innerHTML=`<div class="wrap"><div class="card">Erro ao iniciar: ${u(e.message)}</div></div>`});async function La(){$.be=await ba(),va($.be,k,{title:"Grimório do Aventureiro",subtitle:"Entre com sua conta para acessar seus personagens em qualquer aparelho.",onSignedOut:()=>{z(),$.ch=null,$.chId=null,$.prevHp=null}},async e=>{$.user=e,k.innerHTML='<p class="muted" style="padding:1rem">Carregando compêndio…</p>',$.comp=await $a($.be);const i=x.get(G());i?W(i):O()})}const ia=()=>$.be.mode==="local"?'<p class="banner">Modo demo: os dados ficam neste navegador. Abra o Escudo em outra aba para testar a sincronização.</p>':"",Oa=()=>$.comp.completo?"":'<p class="banner">Biblioteca reduzida: o Mestre ainda não importou o compêndio completo no Escudo.</p>';function O(){z(),$.chId=null,$.ch=null,x.set(G(),null);let e=!1;$.off.push($.be.watchMyCharacters(i=>{b("#build")||(i.sort((a,c)=>a.name.localeCompare(c.name)),k.innerHTML=`<header class="top"><div class="row"><div class="grow name">Meus personagens</div>
      <a class="btn small" href="./escudo.html" title="Ir para o Escudo do Mestre">🛡️ Escudo</a>${la($.user)}</div></header>
    <main class="wrap stack">${ia()}${Oa()}
      ${i.map(a=>`<button class="charbtn" data-open="${a.id}">
        <span><b>${u(a.name)}</b><br><small class="muted">${u(ca(a))}</small></span>
        <span class="chip">${a.campaignName?"🎲 "+u(a.campaignName):"Sem mesa"}</span></button>`).join("")}
      ${i.length?"":'<div class="card"><p style="margin:0">Você ainda não tem personagens. Crie o primeiro abaixo — ele fica salvo na sua conta.</p></div>'}
      <button class="btn primary" id="newchar" style="width:100%">+ Novo personagem</button>
    </main>`,na($.be,k),k.querySelectorAll("[data-open]").forEach(a=>a.onclick=()=>W(a.dataset.open)),b("#newchar").onclick=()=>Ha(),!i.length&&!e&&(e=!0))}))}function Ha(){z();const e=$.comp,i=[15,14,13,12,10,8];k.innerHTML=`<header class="top"><div class="row"><button class="btn small" id="back" aria-label="Voltar">◀</button><div class="grow name">Novo personagem</div></div></header>
  <main class="wrap stack">
  <form class="stack" id="build">
    <section class="card stack">
      <div><label for="name">Nome</label><input id="name" name="name" required maxlength="40" /></div>
      <div class="row">
        <div class="grow"><label for="species">Espécie</label><select id="species" name="species">
          ${e.species.map(v=>`<option value="${v.id}">${u(v.nome)}</option>`).join("")}</select></div>
        <div style="width:5.5rem"><label for="level">Nível</label><input id="level" name="level" type="number" inputmode="numeric" min="1" max="20" value="1" /></div>
      </div>
      <div><label for="class">Classe</label><select id="class" name="class">
        ${e.classes.map(v=>`<option value="${v.id}">${u(v.nome)}</option>`).join("")}</select></div>
      <div id="classinfo"></div>
    </section>
    ${e.backgrounds.length?`<section class="card stack">
      <div><label for="bg">Antecedente</label><select id="bg" name="bg">
        ${e.backgrounds.map(v=>`<option value="${v.id}">${u(v.nome)}</option>`).join("")}</select></div>
      <div id="bginfo"></div>
    </section>`:""}
    <section class="card stack">
      <h2>Atributos</h2>
      <div class="seg" role="tablist">
        <button type="button" role="tab" aria-selected="true" data-abmode="array">Array Padrão</button>
        <button type="button" role="tab" aria-selected="false" data-abmode="buy">Compra de Pontos</button>
      </div>
      <p class="muted" id="abmode-help" style="margin:0;font-size:.9rem">Valores base (Array Padrão: 15, 14, 13, 12, 10, 8). Edite livremente, se preferir. O bônus do antecedente é somado automaticamente.</p>
      <p class="empty-note" id="abpts" style="display:none;margin:0"></p>
      <div class="ab-inputs" id="ab-inputs"></div>
    </section>
    <button class="btn primary" style="width:100%">Criar ficha</button>
  </form></main>`,b("#back").onclick=O;const a=b("#build"),c=()=>e.byId.classes[a.class.value],t=()=>{var v,g;return(g=e.byId.backgrounds)==null?void 0:g[(v=a.bg)==null?void 0:v.value]};function o(){var S;const v=c(),g=(S=v.periciasOpcoes)!=null&&S.length?v.periciasOpcoes:[];b("#classinfo").innerHTML=`
      <p class="muted" style="margin:.2rem 0;font-size:.88rem">Dado de Vida d${v.dadoVida} · Salvaguardas: ${(v.salvaguardas||[]).map(w=>F[w]).join(", ")}</p>
      ${g.length?`<div><label>Perícias da classe — escolha ${v.periciasEscolha} <span id="skcount"></span></label>
        <div class="checks">${g.map(w=>`<label class="chk"><input type="checkbox" name="sk" value="${w}"> ${ta[w]}</label>`).join("")}</div></div>`:""}`,a.querySelectorAll("[name=sk]").forEach(w=>w.onchange=s),s()}function s(){var p;const v=c(),g=((p=t())==null?void 0:p.pericias)||[],S=[...a.querySelectorAll("[name=sk]")];S.forEach(h=>{g.includes(h.value)&&(h.checked=!1,h.disabled=!0,h.parentElement.title="Já vem do antecedente")});const w=S.filter(h=>h.checked).length;S.forEach(h=>{g.includes(h.value)||(h.disabled=!h.checked&&w>=v.periciasEscolha)}),b("#skcount")&&(b("#skcount").textContent=`(${w}/${v.periciasEscolha})`)}function d(){const v=t();if(!v)return;const g=e.byId.feats[v.talentoId];b("#bginfo").innerHTML=`
      <p style="margin:.2rem 0;font-size:.9rem"><b>Perícias:</b> ${v.pericias.map(S=>ta[S]).join(", ")}<br>
      <b>Talento:</b> ${u((g==null?void 0:g.nome)||v.talento)}<br><b>Ferramenta:</b> ${u(v.ferramenta)}</p>
      <div class="row">
        <div class="grow"><label for="plus2">+2 em</label><select id="plus2">${v.atributos.map(S=>`<option value="${S}">${F[S]}</option>`).join("")}<option value="all">+1 nos três</option></select></div>
        <div class="grow" id="plus1wrap"><label for="plus1">+1 em</label><select id="plus1">${v.atributos.map((S,w)=>`<option value="${S}" ${w===1?"selected":""}>${F[S]}</option>`).join("")}</select></div>
      </div>
      <details class="entry"><summary><span class="t">Equipamento do antecedente</span></summary><div class="body">${u(v.equipamento)}</div></details>`,b("#plus2").onchange=b("#plus1").onchange=f,f(),s()}function r(){const v=t(),g={};if(!v)return g;const S=b("#plus2").value;if(S==="all")v.atributos.forEach(w=>g[w]=1);else{g[S]=2;const w=b("#plus1").value;w!==S&&(g[w]=(g[w]||0)+1)}return g}function f(){const v=r();b("#plus1wrap")&&(b("#plus1wrap").style.visibility=b("#plus2").value==="all"?"hidden":""),a.querySelectorAll(".abfinal").forEach(g=>{const S=g.dataset.ab,w=Math.min(20,Number(a[S].value)+(v[S]||0));g.textContent=v[S]?`→ ${w} (${N(Z(w))})`:`(${N(Z(w))})`})}const n=27,m={8:0,9:1,10:2,11:3,12:4,13:5,14:7,15:9},l=v=>m[v]??0;let y="array";function q(){const v=y==="buy";if(b("#ab-inputs").innerHTML=D.map(([g,S],w)=>{const p=document.getElementById("ab-"+g),h=p?p.value:v?8:i[w];return`<div><label for="ab-${g}">${S} <b class="abfinal" data-ab="${g}"></b></label>
        <div class="row" style="align-items:center;gap:.4rem;flex-wrap:nowrap">
          ${v?`<button type="button" class="btn small" data-abdown="${g}" aria-label="Diminuir ${S}">−</button>`:""}
          <input id="ab-${g}" name="${g}" type="number" inputmode="numeric" min="${v?8:3}" max="${v?15:20}"
            value="${h}" ${v?'readonly style="width:3.5rem;text-align:center"':""} />
          ${v?`<button type="button" class="btn small" data-abup="${g}" aria-label="Aumentar ${S}">+</button>`:""}
        </div></div>`}).join(""),v){const g=D.reduce((w,[p])=>w+l(Number(a[p].value)),0),S=n-g;b("#abpts").style.display="",b("#abpts").textContent=`${S} de ${n} pontos restantes`,a.querySelectorAll("[data-abup]").forEach(w=>w.onclick=()=>{const p=w.dataset.abup,h=Number(a[p].value);if(!(h>=15)){if(g+(l(h+1)-l(h))>n)return A("Sem pontos suficientes.");a[p].value=h+1,q()}}),a.querySelectorAll("[data-abdown]").forEach(w=>w.onclick=()=>{const p=w.dataset.abdown,h=Number(a[p].value);h<=8||(a[p].value=h-1,q())})}else b("#abpts").style.display="none",D.forEach(([g])=>a[g].oninput=f);f()}k.querySelectorAll("[data-abmode]").forEach(v=>v.onclick=()=>{v.dataset.abmode!==y&&(y=v.dataset.abmode,k.querySelectorAll("[data-abmode]").forEach(g=>g.setAttribute("aria-selected",String(g.dataset.abmode===y))),b("#abmode-help").textContent=y==="buy"?`Compra de pontos: comece com 8 em tudo e gaste os ${n} pontos (custo 9=1, 10=2, 11=3, 12=4, 13=5, 14=7, 15=9). Máximo 15 antes dos bônus do antecedente.`:"Valores base (Array Padrão: 15, 14, 13, 12, 10, 8). Edite livremente, se preferir. O bônus do antecedente é somado automaticamente.",D.forEach(([g],S)=>{const w=document.getElementById("ab-"+g);w&&(w.value=y==="buy"?8:i[S])}),q())}),a.class.onchange=o,a.bg&&(a.bg.onchange=d),o(),d(),q(),a.onsubmit=async v=>{var p;v.preventDefault();const g=r(),S=Object.fromEntries(D.map(([h])=>[h,Math.min(20,Number(a[h].value)+(g[h]||0))])),w=fa({name:a.name.value.trim(),ownerUid:$.user.uid,speciesId:a.species.value,classId:a.class.value,level:Number(a.level.value),abilities:S,backgroundId:((p=a.bg)==null?void 0:p.value)||null,skillProfs:[...a.querySelectorAll("[name=sk]:checked")].map(h=>h.value)},e);try{W(await $.be.createCharacter(w))}catch(h){A(h.message)}}}const ca=e=>{const i=$.comp.byId.species[e.build.speciesId];return`${(i==null?void 0:i.nome)??""} · ${ha(e.build,$.comp)}`};function W(e){z(),$.chId=e,$.prevHp=null,x.set(G(),e),$.off.push($.be.watchCharacter(e,i=>{if(!i)return O();const a=$.prevHp;if($.prevHp=i.state.hp.current+i.state.hp.temp,$.ch=i,U(),a!=null&&a!==$.prevHp){const c=b("#hpcard");c==null||c.classList.add($.prevHp<a?"flash-dmg":"flash-heal"),navigator.vibrate&&$.prevHp<a&&navigator.vibrate(80)}}))}const za=[["combate","❤️","Combate"],["ficha","📜","Ficha"],["magias","✨","Magias"],["classe","🛡️","Traços"],["talentos","⭐","Talentos"],["itens","🎒","Itens"]],M={get S(){return $},app:k,render:()=>U(),save:e=>$.be.updateCharacter($.chId,e).catch(i=>A(i.message)),toast:A,showHome:()=>O(),confirmTwice:Va,accountChip:la,bindLogout:na};function U(){const e=$.ch,i=ga(e,$.comp),a=document.activeElement,c=a==null?void 0:a.id,t=a&&"selectionStart"in a?[a.selectionStart,a.selectionEnd]:null,o=window.scrollY,s={combate:{html:Ra,bind:Qa},...Ba},d=s[$.tab]||s.combate;if(k.innerHTML=`
    <header class="top">
      <div class="row"><button class="btn small" id="home" aria-label="Meus personagens">◀</button>
        <div class="grow"><div class="name">${u(e.name)}</div>
        <div class="mini"><span>${u(ca(e))}</span>${e.campaignName?`<span>🎲 ${u(e.campaignName)}</span>`:""}</div></div>
        <div class="mini"><span>CA <b>${e.build.ac??10}</b></span><span>PV <b>${e.state.hp.current}/${e.state.hp.max}</b></span></div>
        <a class="btn small" href="./escudo.html" title="Ir para o Escudo do Mestre">🛡️</a></div>
    </header>
    <main class="wrap stack">${ia()}${d.html(e,i,M)}</main>
    <nav class="tabs" role="tablist">${za.map(([r,f,n])=>`<button role="tab" aria-selected="${$.tab===r}" data-tab="${r}"><span class="ico" aria-hidden="true">${f}</span>${n}</button>`).join("")}</nav>`,k.querySelectorAll("[data-tab]").forEach(r=>r.onclick=()=>{$.tab=r.dataset.tab,U(),window.scrollTo(0,0)}),b("#home").onclick=O,d.bind(e,i,M),window.scrollTo(0,o),c){const r=document.getElementById(c);if(r&&(r.focus({preventScroll:!0}),t&&"setSelectionRange"in r))try{r.setSelectionRange(...t)}catch{}}}function Va(e,i){const a=b(e);if(a.dataset.armed)return!0;a.dataset.armed="1";const c=a.textContent;return a.textContent=i,setTimeout(()=>{a.isConnected&&(delete a.dataset.armed,a.textContent=c)},3e3),!1}function Ra(e,i){const{hp:a,deathSaves:c={success:0,fail:0},conditions:t=[],dead:o}=e.state,s=a.max+a.temp,d=Math.round(a.current/s*100),r=Math.round(a.temp/s*100),f=a.current/a.max>.5?"":a.current/a.max>.25?"mid":"low",n=a.current===0&&!o,m=e.state.concentration?$.comp.byId.spells[e.state.concentration]:null;return`
  <section class="card stack" id="hpcard">
    <div class="hp-big"><div class="num">${a.current}<small> / ${a.max}</small></div>
      ${a.temp?`<div class="tmpv">+${a.temp} temporários</div>`:""}
      ${o?'<div class="chip bad" style="margin-top:.4rem">MORTO</div>':""}</div>
    <div class="hpbar" aria-hidden="true"><div class="cur ${f}" style="width:${d}%"></div><div class="tmp" style="width:${r}%"></div></div>
    <input id="amount" class="amount" type="number" inputmode="numeric" min="0" placeholder="0" value="${u($.amount)}" aria-label="Valor" />
    <div class="quick">${[1,2,5,10,"C"].map(l=>`<button class="btn small" data-q="${l}">${l==="C"?"Limpar":"+"+l}</button>`).join("")}</div>
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
    <div><b>${N(i.initiative)}</b><small>Iniciativa</small></div>
    <div><b>${u(i.speed.replace(" metros"," m"))}</b><small>Deslocamento</small></div>
    <div><b>${i.passivePerception}</b><small>Perc. passiva</small></div>
  </div></section>
  ${m?`<p class="banner">Concentrando em: <b>${u(m.nome)}</b> <button class="btn small" id="endconc" style="margin-left:.5rem">Encerrar</button></p>`:""}
  ${n?`<section class="card stack"><h2>Testes contra a morte</h2>
    <div class="saves"><div><small class="muted">Sucessos</small><div class="pips">${[0,1,2].map(l=>`<span class="pip ${l<c.success?"s":""}"></span>`).join("")}</div></div>
      <div><small class="muted">Falhas</small><div class="pips">${[0,1,2].map(l=>`<span class="pip ${l<c.fail?"f":""}"></span>`).join("")}</div></div></div>
    <button class="btn primary" id="roll-death" style="width:100%">Rolar d20</button></section>`:""}
  <section class="card stack"><h2>Condições</h2>
    <div class="row">${t.map(l=>`<button class="chip bad" data-rmcond="${l}" aria-label="Remover ${l}">${X[l]||l} ✕</button>`).join("")||'<span class="muted">Nenhuma</span>'}</div>
    <div class="row"><select id="addcond" class="grow" aria-label="Adicionar condição"><option value="">Adicionar condição…</option>
      ${ya.filter(l=>!t.includes(l)).map(l=>`<option value="${l}">${X[l]||l}</option>`).join("")}</select></div>
  </section>
  <section class="card stack"><h2>Descanso</h2>
    ${(e.state.hitDice.byClass||[]).length>1?e.state.hitDice.byClass.map(l=>{const y=$.comp.byId.classes[l.classId];return`<div class="row" style="justify-content:space-between"><span class="muted">${u((y==null?void 0:y.nome)||l.classId)}: ${l.max-l.used}/${l.max} (d${l.die})</span>
            <button class="btn small" data-shortclass="${l.classId}">Gastar</button></div>`}).join(""):`<p class="muted" style="margin:0">Dados de Vida: ${e.state.hitDice.max-e.state.hitDice.used}/${e.state.hitDice.max} (d${e.state.hitDice.die})</p>
         <div class="row"><button class="btn grow" id="short">Gastar 1 Dado de Vida</button></div>`}
    <div class="row"><button class="btn grow" id="long">Descanso Longo</button></div>
  </section>
  <section class="card"><h2>Registro</h2><ul class="log">${(e.state.log||[]).map(l=>`<li>${u(l)}</li>`).join("")||"<li>—</li>"}</ul></section>`}function Qa(e,i){const a=b("#amount");a.oninput=()=>$.amount=a.value,k.querySelectorAll("[data-q]").forEach(t=>t.onclick=()=>{$.amount=t.dataset.q==="C"?"":String((Number($.amount)||0)+Number(t.dataset.q)),a.value=$.amount}),k.querySelectorAll("[data-act]").forEach(t=>t.onclick=async()=>{const o=Number($.amount);if(!o)return A("Digite um valor.");const s={resistant:b("#o-res").checked,vulnerable:b("#o-vul").checked,critical:b("#o-crit").checked};$.amount="";const d=await R($.be,$.chId,t.dataset.act,o,s,e.name);d.concentrationDC&&e.state.concentration?A(`Teste de Concentração: CD ${d.concentrationDC}`):d.log.length&&A(d.log.at(-1))}),b("#endconc")&&(b("#endconc").onclick=()=>M.save({"state.concentration":null})),b("#roll-death")&&(b("#roll-death").onclick=async()=>{const t=aa("1d20").total,o=await R($.be,$.chId,"morte",t,{},e.name);A(`d20 = ${t}. ${o.log.at(-1)??""}`)}),k.querySelectorAll("[data-rmcond]").forEach(t=>t.onclick=()=>M.save({"state.conditions":e.state.conditions.filter(o=>o!==t.dataset.rmcond)})),b("#addcond").onchange=t=>t.target.value&&M.save({"state.conditions":[...e.state.conditions,t.target.value]});const c=async(t,o)=>{const s=aa(`1d${t}`).total+i.mods.con;await o();const d=await R($.be,$.chId,"cura",Math.max(0,s),{},e.name);A(`Dado de Vida: ${s}. ${d.log[0]??""}`)};b("#short")&&(b("#short").onclick=()=>{const t=e.state.hitDice;if(t.used>=t.max)return A("Sem Dados de Vida disponíveis.");c(t.die,()=>M.save({"state.hitDice.used":t.used+1}))}),k.querySelectorAll("[data-shortclass]").forEach(t=>t.onclick=()=>{const o=e.state.hitDice.byClass,s=o.findIndex(f=>f.classId===t.dataset.shortclass),d=o[s];if(d.used>=d.max)return A("Sem Dados de Vida dessa classe.");const r=o.map((f,n)=>n===s?{...f,used:f.used+1}:f);c(d.die,()=>M.save({"state.hitDice.byClass":r,"state.hitDice.used":r.reduce((f,n)=>f+n.used,0)}))}),b("#long").onclick=async()=>{const t=Object.fromEntries(Object.entries(e.state.spellSlots||{}).map(([d,r])=>[d,{...r,used:0}])),o=Object.fromEntries(Object.entries(e.state.pactSlots||{}).map(([d,r])=>[d,{...r,used:0}])),s=(e.state.hitDice.byClass||[]).map(d=>({...d,used:0}));await M.save({"state.hp":{...e.state.hp,current:e.state.hp.max,temp:0},"state.spellSlots":t,"state.pactSlots":o,"state.hitDice":{...e.state.hitDice,byClass:s,used:0},"state.deathSaves":{success:0,fail:0},"state.conditions":e.state.conditions.filter(d=>!["inconsciente","estabilizado"].includes(d))}),A("Descanso longo concluído.")}}
