import"./pwa-DNJwNots.js";import{e as r,A as D,$ as b,j as Y,f as j,k as V,m as ra,n as J,o as da,q as ma,w as ua,S as pa,g as ba,r as va,l as $a,s as F,a as la,b as oa,x as ha,t as A,y as fa,c as ga,d as ya,C as X,h as wa,i as x,z as Z}from"./auth-BilmUCeb.js";function aa(e){const n=String(e).replace(/\s/g,"").match(/^(\d*)d(\d+)([+-]\d+)?$/i);if(!n)return null;const a=Number(n[1]||1),i=Number(n[2]),t=Number(n[3]||0),o=Array.from({length:a},()=>1+Math.floor(Math.random()*i));return{rolls:o,bonus:t,total:o.reduce((s,m)=>s+m,0)+t}}const T=e=>r(e).replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>").replace(/(^|\s)_([^_]+)_(?=\s|$|[.,;:])/g,"$1<i>$2</i>");function C(e){if(!e)return"";const n=[];for(const a of String(e).split(/\n\n+/)){const i=a.split(`
`);if(i.every(t=>t.startsWith("| "))){n.push('<div class="mdtable"><table>'+i.map(t=>"<tr>"+t.slice(2).split(" | ").map(o=>`<td>${T(o)}</td>`).join("")+"</tr>").join("")+"</table></div>");continue}for(const t of i)t.startsWith("#### ")?n.push(`<h5>${T(t.slice(5))}</h5>`):t.startsWith("### ")?n.push(`<h4>${T(t.slice(4))}</h4>`):t.startsWith("| ")?n.push('<div class="mdtable"><table><tr>'+t.slice(2).split(" | ").map(o=>`<td>${T(o)}</td>`).join("")+"</tr></table></div>"):t.startsWith("• ")?n.push(`<p class="bullet">${T(t)}</p>`):n.push(`<p>${T(t)}</p>`)}return`<div class="md">${n.join("")}</div>`}const z=e=>String(e||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(),na=Object.fromEntries(D),L=40,R=e=>e===0?"Truque":`${e}º círculo`,ea=()=>Math.random().toString(36).slice(2,9),E=(e,n,a,i=!1,t="",o="")=>`<details class="entry" ${i?"open":""} ${t}><summary><span class="t">${e}</span><span class="row" style="gap:.4rem;flex-wrap:nowrap"><span class="lvl-badge">${n||""}</span>${o}</span></summary><div class="body">${a}</div></details>`,K=(e,n,a="Adicionar")=>`<button class="btn small primary addbtn" ${e}="${n}" aria-label="${a}">+</button>`;function ka(e,n,a){const i=a.S,t=i.comp,o=new Set(e.build.classes.map(c=>c.classId)),s=t.classes.filter(c=>!o.has(c.id)),m=n.classesInfo.slice(1);return`
  <section class="card stack"><h2>Multiclasse</h2>
    <p class="empty-note" style="margin:0">Nível total: ${n.level}/20. Ao multiclassar, confira na aba Traços quais proficiências a nova classe concede (são menos do que na criação) e ajuste "Treinamento e Proficiências" à mão, se precisar.</p>
    ${m.length?m.map(c=>{var d,f,l,p,g;const h=((d=c.cls)==null?void 0:d.subclasses)||[];return`<div class="row" style="flex-wrap:wrap;gap:.5rem;border-top:1px solid var(--border,#3332);padding-top:.5rem">
        <b class="grow">${r(((f=c.cls)==null?void 0:f.nome)||c.classId)}</b>
        <div class="row" style="gap:.3rem"><button class="btn small" data-mcdown="${c.classId}" aria-label="Diminuir nível de ${r(((l=c.cls)==null?void 0:l.nome)||c.classId)}">−</button>
          <span style="min-width:1.4rem;text-align:center">${c.level}</span>
          <button class="btn small" data-mcup="${c.classId}" aria-label="Subir nível de ${r(((p=c.cls)==null?void 0:p.nome)||c.classId)}">+</button></div>
        ${h.length?`<select data-mcsub="${c.classId}" aria-label="Subclasse de ${r(((g=c.cls)==null?void 0:g.nome)||c.classId)}" ${c.level<3?"disabled":""}>
          <option value="">—</option>${h.map(v=>`<option value="${v.id}" ${v.id===c.subclassId?"selected":""}>${r(v.nome)}</option>`).join("")}</select>`:""}
        <button class="btn small danger" data-mcrm="${c.classId}">Remover</button>
      </div>`}).join(""):'<p class="empty-note">Personagem de classe única.</p>'}
    ${s.length&&n.level<20?`<form class="row" id="addclass">
      <select id="mcnew" class="grow" aria-label="Nova classe">${s.map(c=>`<option value="${c.id}">${r(c.nome)}</option>`).join("")}</select>
      <button class="btn primary small">+ Adicionar classe</button></form>`:""}
  </section>`}function Sa(e,n,a){const i=a.S,t=a.app;t.querySelectorAll("[data-mcup]").forEach(o=>o.onclick=()=>{const s=e.build.classes.find(m=>m.classId===o.dataset.mcup);a.save(J(e,i.comp,o.dataset.mcup,s.level+1))}),t.querySelectorAll("[data-mcdown]").forEach(o=>o.onclick=()=>{const s=e.build.classes.find(m=>m.classId===o.dataset.mcdown);if(s.level<=1)return a.toast('Nível mínimo 1 — use "Remover" para tirar a classe.');a.save(J(e,i.comp,o.dataset.mcdown,s.level-1))}),t.querySelectorAll("[data-mcsub]").forEach(o=>o.onchange=()=>a.save(da(e,i.comp,o.dataset.mcsub,o.value||null))),t.querySelectorAll("[data-mcrm]").forEach(o=>o.onclick=()=>{if(!a.confirmTwice(`[data-mcrm="${o.dataset.mcrm}"]`,"Toque de novo para remover"))return;const s=ma(e,i.comp,o.dataset.mcrm);s&&a.save(s)}),b("#addclass")&&(b("#addclass").onsubmit=o=>{o.preventDefault();const s=ua(e,i.comp,b("#mcnew").value);s&&(a.save(s),a.toast("Classe adicionada no nível 1."))})}function qa(e,n,a){var c,h,d,f,l,p;const i=a.S,t=e.build.classes[0].level,o=e.build.classes[0],s=((c=n.cls)==null?void 0:c.subclasses)||[],m=e.build.training||{};return`
  <section class="card stack">
    <div class="sectiontitle"><h2 style="margin:0">${n.multiclass?`${r(o.nomePersonalizado||((h=n.cls)==null?void 0:h.nome)||"")} ${t}`:`Nível ${t}`}</h2>
      <div class="row"><button class="btn small" id="lvldown" aria-label="Diminuir nível">−</button><button class="btn small primary" id="lvlup" aria-label="Subir de nível">+ Nível</button></div></div>
    ${n.multiclass?`<p class="empty-note" style="margin:0">Classe principal (foi ela que deu o 1º dado de vida cheio). Nível total do personagem: ${n.level}.</p>`:""}
    ${s.length?`<div><label for="subclass">Subclasse${t<3?" (a partir do nível 3)":""}</label>
      <select id="subclass" ${t<3?"disabled":""}><option value="">—</option>${s.map(g=>`<option value="${g.id}" ${g.id===o.subclassId?"selected":""}>${r(g.nome)}</option>`).join("")}</select></div>`:""}
    <div class="stats">
      <div><b>${j(n.pb)}</b><small>Proficiência</small></div>
      <div><b>${j(n.initiative)}</b><small>Iniciativa</small></div>
      <div><b>${r(n.speed.replace(" metros"," m"))}</b><small>Deslocamento</small></div>
      <div><b>${n.passivePerception}</b><small>Perc. passiva</small></div>
    </div>
    <div class="row"><label for="ac" style="margin:0">Classe de Armadura</label>
      <input id="ac" type="number" inputmode="numeric" style="width:6rem" value="${e.build.ac??10}" /></div>
    <div class="row"><label for="hpmax" style="margin:0">PV Máximo</label>
      <input id="hpmax" type="number" inputmode="numeric" min="1" style="width:6rem" value="${e.state.hp.max}" /></div>
    <p class="empty-note" style="margin:0">O PV máximo pode ser ajustado à mão — use o valor rolado no dado com o Mestre. Ao subir de nível, o app só soma o ganho médio da regra a esse valor.</p>
  </section>

  ${ka(e,n,a)}

  <section class="card stack"><h2>Personalização de espécie/classe</h2>
    <p class="empty-note" style="margin:0">Pra jogar uma espécie ou classe alternativa/homebrew, dê um nome personalizado aqui — os números continuam vindo da opção escolhida na criação (${r(((d=n.sp)==null?void 0:d.nome)||"")} / ${r(((f=n.cls)==null?void 0:f.nome)||"")}).</p>
    <div class="row">
      <div class="grow"><label for="pz-sp">Nome da espécie</label>
        <input id="pz-sp" maxlength="60" placeholder="${r(((l=n.sp)==null?void 0:l.nome)||"")}" value="${r(e.build.speciesNomePersonalizado||"")}" /></div>
      <div class="grow"><label for="pz-cl">Nome da classe</label>
        <input id="pz-cl" maxlength="60" placeholder="${r(((p=n.cls)==null?void 0:p.nome)||"")}" value="${r(o.nomePersonalizado||"")}" /></div>
    </div>
    <div><label for="pz-note">Notas da personalização</label>
      <textarea id="pz-note" rows="2" placeholder="O que muda nessa versão (aparência, traços trocados…)">${r(e.build.customNote||"")}</textarea></div>
  </section>

  <section class="card stack"><h2>Atributos e Salvaguardas</h2>
    <p class="empty-note">Toque em <b>Salvaguarda</b> para marcar/desmarcar proficiência.</p>
    <div class="abil2">${D.map(([g,v])=>{const w=(e.build.saveProfs||[]).includes(g);return`<div class="abcard">
        <small>${v}</small><b>${j(n.mods[g])}</b>
        <input class="abscore" data-score="${g}" type="number" inputmode="numeric" min="1" max="30" value="${e.build.abilities[g]}" aria-label="Valor de ${v}" />
        <button class="savebtn ${w?"on":""}" data-save="${g}" aria-pressed="${w}">
          <span class="dot ${w?"on":""}"></span>Salvaguarda <b>${j(n.saves[g])}</b></button>
      </div>`}).join("")}</div>
  </section>

  <section class="card"><h2>Perícias</h2><p class="empty-note">Toque para alternar: sem proficiência → proficiente (●) → especialista (◆).</p>
    <div class="skills">${n.skills.map(g=>`<button data-skill="${g.id}" aria-pressed="${g.prof||g.exp}">
      <span class="row" style="flex-wrap:nowrap"><span class="dot ${g.exp?"exp":g.prof?"on":""}"></span>${g.nome} <small class="muted">(${g.ab.toUpperCase()})</small></span><b>${j(g.bonus)}</b></button>`).join("")}</div>
  </section>

  <section class="card stack"><h2>Treinamento e Proficiências</h2>
    ${[["armaduras","Treinamento com Armaduras"],["armas","Proficiência com Armas"],["ferramentas","Proficiência com Ferramentas"],["idiomas","Idiomas"]].map(([g,v])=>`<div><label for="tr-${g}">${v}</label><textarea id="tr-${g}" data-train="${g}" rows="2">${r(m[g]||"")}</textarea></div>`).join("")}
  </section>

  <section class="card stack"><h2>Anotações</h2>
    <textarea id="notes" rows="5" placeholder="Aliados, pistas, história…">${r(e.notes)}</textarea></section>

  <section class="card stack"><h2>Mesa</h2>
    ${e.campaignId?`<p style="margin:0">Jogando em <b>${r(e.campaignName)}</b>. O Mestre dessa mesa pode ver e alterar esta ficha.</p>
         <button class="btn" id="leave-table">Sair da mesa</button>`:`<p class="muted" style="margin:0">Esta ficha não está em nenhuma mesa. Só você pode vê-la.</p>
         <form class="row" id="join"><input id="code" class="grow" autocomplete="off" autocapitalize="characters" placeholder="Código (ABC-123)" aria-label="Código da mesa" required style="width:auto" />
         <button class="btn primary">Entrar</button></form>`}
  </section>
  <section class="card stack"><h2>Conta</h2>
    <div class="row">${a.accountChip(i.user)}</div>
    <button class="btn danger small" id="delete">Apagar personagem</button>
  </section>`}let sa={};const P=(e,n,a=600)=>{clearTimeout(sa[e]),sa[e]=setTimeout(n,a)};function Aa(e,n,a){const i=a.S,t=a.app,o=e.build.classes[0].level;b("#lvlup").onclick=()=>n.level<20&&a.save(V(e,i.comp,o+1)).then(()=>a.toast(`Nível ${o+1}! PV máximo, Dados de Vida e espaços atualizados.`)),b("#lvldown").onclick=()=>o>1&&a.save(V(e,i.comp,o-1)),b("#subclass")&&(b("#subclass").onchange=s=>a.save(V(e,i.comp,o,s.target.value||null))),Sa(e,n,a),b("#pz-sp").oninput=s=>P("pzsp",()=>a.save({"build.speciesNomePersonalizado":s.target.value.trim()||null})),b("#pz-cl").oninput=s=>P("pzcl",()=>{const m=e.build.classes.map((c,h)=>h===0?{...c,nomePersonalizado:b("#pz-cl").value.trim()||null}:c);a.save({"build.classes":m})}),b("#pz-note").oninput=s=>P("pznote",()=>a.save({"build.customNote":s.target.value})),b("#ac").onchange=s=>a.save({"build.ac":Number(s.target.value)||10}),b("#hpmax").onchange=s=>{const m=Math.max(1,Number(s.target.value)||1);a.save({"state.hp":{...e.state.hp,max:m,current:Math.min(e.state.hp.current,m)}})},t.querySelectorAll("[data-score]").forEach(s=>s.onchange=()=>{const m=Math.max(1,Math.min(30,Number(s.value)||10)),c=s.dataset.score,h={[`build.abilities.${c}`]:m};c==="con"&&(h["state.hp"]={...e.state.hp,...ra(e,i.comp,m)}),a.save(h)}),t.querySelectorAll("[data-save]").forEach(s=>s.onclick=()=>{const m=s.dataset.save,c=e.build.saveProfs||[];a.save({"build.saveProfs":c.includes(m)?c.filter(h=>h!==m):[...c,m]})}),t.querySelectorAll("[data-skill]").forEach(s=>s.onclick=()=>{const m=s.dataset.skill,c=e.build.skillProfs||[],h=e.build.expertise||[];h.includes(m)?a.save({"build.expertise":h.filter(d=>d!==m),"build.skillProfs":c.filter(d=>d!==m)}):c.includes(m)?a.save({"build.expertise":[...h,m]}):a.save({"build.skillProfs":[...c,m]})}),t.querySelectorAll("[data-train]").forEach(s=>s.oninput=()=>P("tr"+s.dataset.train,()=>a.save({[`build.training.${s.dataset.train}`]:s.value}))),b("#notes").oninput=s=>P("notes",()=>a.save({notes:s.target.value})),a.bindLogout(i.be,t),b("#join")&&(b("#join").onsubmit=async s=>{s.preventDefault();try{const m=await i.be.joinByCode(b("#code").value);await i.be.updateCharacter(i.chId,{campaignId:m.id,campaignName:m.name}),a.toast(`${e.name} entrou na mesa ${m.name}.`)}catch(m){a.toast(m.message)}}),b("#leave-table")&&(b("#leave-table").onclick=()=>{a.confirmTwice("#leave-table","Toque de novo para confirmar")&&a.save({campaignId:null,campaignName:null})}),b("#delete").onclick=async()=>{if(!a.confirmTwice("#delete",`Toque de novo para apagar ${e.name}`))return;const s=i.chId;await i.be.deleteCharacter(s),a.showHome()}}function Ea(e,n,a){const i=a.S,t=i.comp,o=i.ui,s=e.build.spellsKnown||[],m=e.build.spellsPrepared||[],c=Object.entries(e.state.spellSlots||{}),h=Object.entries(e.state.pactSlots||{}),d=s.map(u=>t.byId.spells[u]).filter(Boolean).sort((u,y)=>u.nivel-y.nivel||u.nome.localeCompare(y.nome)),f={};d.forEach(u=>{var y;return(f[y=u.nivel]||(f[y]=[])).push(u)});const l=e.build.classes.map(u=>u.classId),p=n.classesInfo.map(u=>{var y;return(y=u.cls)==null?void 0:y.nome}).filter(Boolean).join(" + "),g=z(o.spellQ);let v=t.spells.filter(u=>!s.includes(u.id)&&(!o.spellMine||!n.casters.length||u.classes.some(y=>l.includes(y)))&&(o.spellLvl==="all"||String(u.nivel)===o.spellLvl)&&(!g||z(u.nome).includes(g)));const w=v.length;v=v.slice(0,L);const S=(u,y)=>`
    <div class="muted" style="font-size:.85rem">${r(u.escola)} · ${r(u.tempo)} · ${r(u.alcance)}<br>${r(u.componentes)} · ${r(u.duracao)}</div>
    ${C(u.desc)}
    <div class="row">${y?`${u.nivel>0?`<button class="btn small" data-prep="${u.id}">${m.includes(u.id)?"✓ Preparada":"Preparar"}</button>`:""}
         ${u.concentracao?`<button class="btn small" data-conc="${u.id}">${e.state.concentration===u.id?"Encerrar concentração":"Concentrar"}</button>`:""}
         <button class="btn small" data-forget="${u.id}">Remover</button>`:""}</div>`,k=u=>[u.concentracao?"C":"",u.ritual?"R":""].filter(Boolean).map(y=>`<span class="chip">${y}</span>`).join(" ");return`
  ${n.casters.length?`<section class="card stack">${n.casters.map(u=>`<div class="stats" style="grid-template-columns:repeat(3,1fr)">
    <div><b>${u.dc}</b><small>CD (${r(u.nome)})</small></div><div><b>${j(u.atk)}</b><small>Ataque mágico</small></div>
    <div><b>${na[u.atributoConjuracao].slice(0,3)}</b><small>Atributo</small></div></div>`).join("")}</section>`:""}
  ${c.length?`<section class="card slots"><h2>Espaços de magia${n.multiclass?" (combinados)":""}</h2>
    ${c.map(([u,y])=>`<div class="lvl"><span>${u}º</span>${Array.from({length:y.max},(I,N)=>`<button class="slotpip ${N<y.used?"used":""}" data-slot="${u}" data-i="${N}" aria-label="Espaço de ${u}º círculo ${N+1}${N<y.used?", gasto":""}"></button>`).join("")}</div>`).join("")}
  </section>`:""}
  ${h.length?`<section class="card slots"><h2>Magia de Pacto</h2>
    ${h.map(([u,y])=>`<div class="lvl"><span>${u}º</span>${Array.from({length:y.max},(I,N)=>`<button class="slotpip ${N<y.used?"used":""}" data-pactslot="${u}" data-i="${N}" aria-label="Espaço de pacto ${N+1}${N<y.used?", gasto":""}"></button>`).join("")}</div>`).join("")}
  </section>`:""}
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Minhas magias</h2><span class="lvl-badge">${m.length} preparada(s)</span></div>
    ${Object.keys(f).length?Object.entries(f).map(([u,y])=>`<h3 style="margin:.6rem 0 .2rem;color:var(--muted)">${R(Number(u))}</h3>
      <div class="stack" style="--gap:.4rem">${y.map(I=>E(`${I.nivel>0&&m.includes(I.id)?"✓ ":""}${r(I.nome)} ${k(I)}`,R(I.nivel),S(I,!0),!1,`data-k="m-${I.id}"`)).join("")}</div>`).join(""):'<p class="empty-note">Nenhuma magia ainda. Adicione pela biblioteca abaixo.</p>'}
  </section>
  <section class="card stack"><h2>Biblioteca de magias</h2>
    <input id="spellq" type="search" placeholder="Buscar magia pelo nome…" value="${r(o.spellQ)}" aria-label="Buscar magia" />
    <div class="filters">${["all","0","1","2","3","4","5","6","7","8","9"].map(u=>`<button data-flvl="${u}" aria-pressed="${o.spellLvl===u}">${u==="all"?"Todas":u==="0"?"Truques":u+"º"}</button>`).join("")}</div>
    ${p?`<label class="chk"><input type="checkbox" id="spellmine" ${o.spellMine?"checked":""}> Só a lista de ${r(p)}</label>`:""}
    <p class="empty-note">${w} magia(s)${w>L?` — mostrando ${L}, refine a busca`:""}.</p>
    <div class="stack">${v.map(u=>E(`${r(u.nome)} ${k(u)}`,R(u.nivel),S(u,!1),!1,`data-k="l-${u.id}"`,K("data-learn",u.id,"Adicionar "+r(u.nome)))).join("")}</div>
  </section>`}function Ca(e,n,a){const i=a.S,t=a.app,o=i.ui;t.querySelectorAll("[data-slot]").forEach(s=>s.onclick=()=>{const m=s.dataset.slot,c=Number(s.dataset.i),h=e.state.spellSlots[m];a.save({[`state.spellSlots.${m}.used`]:c<h.used?c:c+1})}),t.querySelectorAll("[data-pactslot]").forEach(s=>s.onclick=()=>{const m=s.dataset.pactslot,c=Number(s.dataset.i),h=e.state.pactSlots[m];a.save({[`state.pactSlots.${m}.used`]:c<h.used?c:c+1})}),b("#spellq").oninput=s=>{o.spellQ=s.target.value,P("sq",a.render,250)},t.querySelectorAll("[data-flvl]").forEach(s=>s.onclick=()=>{o.spellLvl=s.dataset.flvl,a.render()}),b("#spellmine")&&(b("#spellmine").onchange=s=>{o.spellMine=s.target.checked,a.render()}),t.querySelectorAll("[data-learn]").forEach(s=>s.onclick=()=>a.save({"build.spellsKnown":[...e.build.spellsKnown||[],s.dataset.learn]})),t.querySelectorAll("[data-forget]").forEach(s=>s.onclick=()=>a.save({"build.spellsKnown":(e.build.spellsKnown||[]).filter(m=>m!==s.dataset.forget),"build.spellsPrepared":(e.build.spellsPrepared||[]).filter(m=>m!==s.dataset.forget)})),t.querySelectorAll("[data-prep]").forEach(s=>s.onclick=()=>{const m=e.build.spellsPrepared||[],c=s.dataset.prep;a.save({"build.spellsPrepared":m.includes(c)?m.filter(h=>h!==c):[...m,c]})}),t.querySelectorAll("[data-conc]").forEach(s=>s.onclick=()=>a.save({"state.concentration":e.state.concentration===s.dataset.conc?null:s.dataset.conc})),O(t,"spells")}const Q={};function O(e,n){e.querySelectorAll("summary .addbtn").forEach(i=>i.addEventListener("click",t=>t.preventDefault()));const a=Q[n]||(Q[n]=new Set);e.querySelectorAll("details.entry").forEach((i,t)=>{var s;const o=i.dataset.k||((s=i.querySelector("summary .t"))==null?void 0:s.textContent)||t;a.has(o)&&(i.open=!0),i.addEventListener("toggle",()=>i.open?a.add(o):a.delete(o))})}function Ia(e,n,a){const{cls:i,sub:t,level:o,classId:s,nomePersonalizado:m}=n;if(!i)return`<section class="card">Classe "${r(s)}" não encontrada no compêndio.</section>`;const c=m||i.nome,h=i.caracteristicas||[],d=h.filter(p=>p.nivel<=o),f=h.filter(p=>p.nivel>o),l=e.build.opcoes||[];return`
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Características de ${r(c)}</h2><span class="lvl-badge">nível ${o}</span></div>
    ${m?`<p class="empty-note" style="margin:0">Usa as regras de ${r(i.nome)}.</p>`:""}
    ${d.length?d.map(p=>E(r(p.nome),`Nível ${p.nivel}`,C(p.desc))).join(""):'<p class="empty-note">Importe o compêndio completo para ver as características.</p>'}
    ${f.length?`<details class="entry"><summary><span class="t muted">Próximos níveis (${f.length})</span></summary><div class="body stack">
      ${f.map(p=>E(r(p.nome),`Nível ${p.nivel}`,C(p.desc))).join("")}</div></details>`:""}
  </section>
  ${(i.opcoes||[]).map(p=>`<section class="card stack"><h2>${r(p.titulo.replace("Opções de ",""))} (${r(c)})</h2>
    ${p.itens.filter(g=>l.includes(g.id)).map(g=>E("✓ "+r(g.nome),"",C(g.desc)+`<button class="btn small" data-unop="${g.id}">Remover</button>`)).join("")||'<p class="empty-note">Nenhuma escolhida.</p>'}
    <details class="entry"><summary><span class="t">Escolher ${r(p.titulo.replace("Opções de ","").toLowerCase())}</span><span class="lvl-badge">${p.itens.length}</span></summary><div class="body stack">
      ${p.itens.filter(g=>!l.includes(g.id)).map(g=>E(r(g.nome),"",C(g.desc),!1,`data-k="o-${s}-${g.id}"`,K("data-op",g.id,"Escolher "+r(g.nome)))).join("")}
    </div></details></section>`).join("")}
  <section class="card stack"><h2>Subclasse de ${r(c)}${t?": "+r(t.nome):""}</h2>
    ${t?(t.caracteristicas||[]).map(p=>E(`${p.nivel>o?"🔒 ":""}${r(p.nome)}`,`Nível ${p.nivel}`,C(p.desc))).join(""):`<p class="empty-note">${o<3?"A subclasse é escolhida no nível 3.":"Escolha a subclasse na aba Ficha (ou em Multiclasse, para uma classe secundária)."}</p>
         ${(i.subclasses||[]).map(p=>E(r(p.nome),"",C(p.intro))).join("")}`}
  </section>`}function Na(e,n,a){const i=n.sp,t=n.bg,o=n.speciesLabel||(i==null?void 0:i.nome)||"espécie";return`
  ${n.classesInfo.map(s=>Ia(e,s)).join("")}
  <section class="card stack"><h2>Traços de ${r(o)}</h2>
    ${i&&o!==i.nome?`<p class="empty-note" style="margin:0">Usa as regras de ${r(i.nome)}.</p>`:""}
    <p class="empty-note">${r((i==null?void 0:i.tipo)||"")} · ${r((i==null?void 0:i.tamanho)||"")} · Deslocamento ${r((i==null?void 0:i.deslocamento)||"")}</p>
    ${((i==null?void 0:i.tracos)||[]).filter(s=>s.nome!=="Detalhes").map(s=>E(r(s.nome),"",C(s.desc))).join("")||'<p class="empty-note">Sem traços no compêndio.</p>'}
  </section>
  ${t?`<section class="card stack"><h2>Antecedente: ${r(t.nome)}</h2>
    <p style="margin:0;font-size:.92rem"><b>Atributos:</b> ${t.atributos.map(s=>na[s]).join(", ")}<br>
    <b>Talento:</b> ${r(t.talento)}<br><b>Ferramenta:</b> ${r(t.ferramenta)}<br><b>Equipamento:</b> ${r(t.equipamento)}</p></section>`:""}
  ${e.build.customNote?`<section class="card stack"><h2>Notas da personalização</h2><p style="margin:0;white-space:pre-wrap">${r(e.build.customNote)}</p></section>`:""}`}function ja(e,n,a){const i=a.app,t=e.build.opcoes||[];i.querySelectorAll("[data-op]").forEach(o=>o.onclick=()=>a.save({"build.opcoes":[...t,o.dataset.op]})),i.querySelectorAll("[data-unop]").forEach(o=>o.onclick=()=>a.save({"build.opcoes":t.filter(s=>s!==o.dataset.unop)})),O(i,"classe")}const Pa=["Origem","Geral","Estilo de Luta","Dádiva Épica"];function Ma(e,n,a){const i=a.S,t=i.comp,o=i.ui,s=e.build.feats||[],m=z(o.featQ);let c=t.feats.filter(d=>(d.repetivel||!s.some(f=>f.id===d.id))&&(o.featCat==="all"||d.categoria===o.featCat)&&(!m||z(d.nome).includes(m)||z(d.prereq).includes(m)));const h=c.length;return c=c.slice(0,L),`
  <section class="card stack"><h2>Meus talentos</h2>
    ${s.length?s.map((d,f)=>{const l=t.byId.feats[d.id];return E(r((l==null?void 0:l.nome)||d.id),r(d.origem||(l==null?void 0:l.categoria)||""),(l?`<p class="empty-note">${r(l.categoria)}${l.prereq?" · Pré-requisito: "+r(l.prereq):""}</p>${C(l.desc)}`:'<p class="empty-note">Talento fora do compêndio.</p>')+`<button class="btn small" data-unfeat="${f}">Remover</button>`)}).join(""):'<p class="empty-note">Nenhum talento. Seu antecedente concede um talento de Origem.</p>'}
  </section>
  <section class="card stack"><h2>Biblioteca de talentos</h2>
    <input id="featq" type="search" placeholder="Buscar talento…" value="${r(o.featQ)}" aria-label="Buscar talento" />
    <div class="filters">${["all",...Pa].map(d=>`<button data-fcat="${d}" aria-pressed="${o.featCat===d}">${d==="all"?"Todos":d}</button>`).join("")}</div>
    <p class="empty-note">${h} talento(s)${h>L?` — mostrando ${L}`:""}.</p>
    ${c.map(d=>E(r(d.nome),r(d.categoria),`${d.prereq?`<p class="empty-note">Pré-requisito: ${r(d.prereq)}</p>`:""}${C(d.desc)}`,!1,`data-k="f-${d.id}"`,K("data-feat",d.id,"Adicionar "+r(d.nome)))).join("")}
    ${t.feats.length?"":'<p class="empty-note">Importe o compêndio completo para usar a biblioteca de talentos.</p>'}
  </section>`}function Da(e,n,a){const i=a.S,t=a.app,o=e.build.feats||[];b("#featq").oninput=s=>{i.ui.featQ=s.target.value,P("fq",a.render,250)},t.querySelectorAll("[data-fcat]").forEach(s=>s.onclick=()=>{i.ui.featCat=s.dataset.fcat,a.render()}),t.querySelectorAll("[data-feat]").forEach(s=>s.onclick=()=>{a.save({"build.feats":[...o,{id:s.dataset.feat,origem:"Escolhido"}]}),a.toast("Talento adicionado. Aplique aumentos de atributo na aba Ficha, se houver.")}),t.querySelectorAll("[data-unfeat]").forEach(s=>s.onclick=()=>a.save({"build.feats":o.filter((m,c)=>c!==Number(s.dataset.unfeat))})),O(t,"feats")}function za(e,n,a){const i=a.S,t=i.comp,o=i.ui,s=e.inventory||[],m=e.coins||{},c=z(o.itemQ),h=c.length>=2?t.items.filter(l=>z(l.nome).includes(c)).slice(0,25):[],d=Math.min(100,Math.round(n.weight/n.carry*100)),f=l=>l.tipo==="arma"?`${r(l.dano)} · ${r(l.propriedades)} · Maestria: ${r(l.maestria)}`:l.tipo==="armadura"?`CA ${r(l.ca)}${l.forca&&l.forca!=="—"?" · "+r(l.forca):""}${l.furtividade==="Desvantagem"?" · Desv. Furtividade":""}`:"";return`
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Bolsa de moedas</h2><span class="lvl-badge">≈ ${n.coinsGP.toLocaleString("pt-BR",{maximumFractionDigits:2})} PO</span></div>
    <div class="coins">${Y.map(([l,p,g])=>`<label class="coin coin-${l}"><span>${p}</span>
      <input type="number" inputmode="numeric" min="0" data-coin="${l}" value="${Number(m[l])||0}" aria-label="${g}" /></label>`).join("")}</div>
    <form class="row" id="coinop">
      <input id="coinamt" type="number" inputmode="numeric" min="1" placeholder="Qtd." style="width:5.5rem" aria-label="Quantidade" />
      <select id="coinkind" style="width:5.5rem" aria-label="Moeda">${Y.map(([l,p])=>`<option value="${l}" ${l==="po"?"selected":""}>${p}</option>`).join("")}</select>
      <button class="btn heal small" data-cop="+">Receber</button><button class="btn danger small" data-cop="-">Gastar</button>
    </form>
  </section>
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Inventário</h2><span class="lvl-badge">${n.weight.toLocaleString("pt-BR",{maximumFractionDigits:1})} / ${n.carry} kg</span></div>
    <div class="hpbar" aria-hidden="true"><div class="cur ${d>100?"low":d>75?"mid":""}" style="width:${d}%"></div></div>
    ${s.length?s.map(l=>{const p=l.itemId?t.byId.weapons[l.itemId]||t.byId.armor[l.itemId]||t.byId.gear[l.itemId]:null;return E(`${l.equipado?"🛡️ ":""}${r(l.nome)}${Number(l.qtd)>1?` <span class="muted">×${l.qtd}</span>`:""}`,r(l.peso||""),`${p?`<p class="empty-note">${f(p)}${p.custo?" · "+r(p.custo):""}</p>${p.desc?C(p.desc):""}`:""}
        <div class="row">
          <button class="btn small" data-qty="${l.uid}" data-d="-1">−</button><b>${l.qtd}</b><button class="btn small" data-qty="${l.uid}" data-d="1">+</button>
          <label class="chk"><input type="checkbox" data-equip="${l.uid}" ${l.equipado?"checked":""}> Equipado</label>
          <label class="chk"><input type="checkbox" data-attune="${l.uid}" ${l.sintonizado?"checked":""}> Sintonizado</label>
        </div>
        <input data-inote="${l.uid}" id="inote-${l.uid}" value="${r(l.notas||"")}" placeholder="Notas (cargas, efeitos…)" aria-label="Notas do item" />
        <button class="btn small danger" data-rmitem="${l.uid}">Remover item</button>`,!1,`data-k="i-${l.uid}"`)}).join(""):'<p class="empty-note">Inventário vazio.</p>'}
  </section>
  <section class="card stack"><h2>Adicionar item</h2>
    <input id="itemq" type="search" placeholder="Buscar armas, armaduras, equipamento… (2+ letras)" value="${r(o.itemQ)}" aria-label="Buscar item" />
    ${h.map(l=>`<div class="libitem"><div class="info"><b>${r(l.nome)}</b><small>${r(l.custo||"")}${l.peso?" · "+r(l.peso):""} ${f(l)?"· "+f(l):""}</small></div>
      <button class="btn small primary" data-additem="${l.id}">+</button></div>`).join("")}
    ${c.length>=2&&!h.length?'<p class="empty-note">Nada encontrado — use o item personalizado abaixo.</p>':""}
    <form class="row" id="custom">
      <input id="cname" class="grow" placeholder="Item personalizado" required style="width:auto" aria-label="Nome do item" />
      <input id="cweight" placeholder="kg" inputmode="decimal" style="width:4.5rem" aria-label="Peso em kg" />
      <button class="btn small">Adicionar</button>
    </form>
  </section>`}function Ta(e,n,a){const i=a.S,t=a.app,o=i.comp,s=e.inventory||[],m={pc:0,pp:0,pe:0,po:0,pl:0,...e.coins||{}},c=d=>a.save({inventory:d});t.querySelectorAll("[data-coin]").forEach(d=>d.onchange=()=>a.save({coins:{...m,[d.dataset.coin]:Math.max(0,Number(d.value)||0)}})),t.querySelectorAll("[data-cop]").forEach(d=>d.onclick=f=>{f.preventDefault();const l=Number(b("#coinamt").value),p=b("#coinkind").value;if(!l)return a.toast("Digite a quantidade.");const g=m[p]+(d.dataset.cop==="+"?l:-l);if(g<0)return a.toast(`Não há ${l} ${p.toUpperCase()} suficientes.`);a.save({coins:{...m,[p]:g}})}),b("#itemq").oninput=d=>{i.ui.itemQ=d.target.value,P("iq",a.render,250)},t.querySelectorAll("[data-additem]").forEach(d=>d.onclick=()=>{const f=o.items.find(p=>p.id===d.dataset.additem),l=s.find(p=>p.itemId===f.id);c(l?s.map(p=>p===l?{...p,qtd:Number(p.qtd)+1}:p):[...s,{uid:ea(),itemId:f.id,nome:f.nome,qtd:1,peso:f.peso||"",equipado:!1,sintonizado:!1,notas:""}]),a.toast(`${f.nome} adicionado.`)}),b("#custom").onsubmit=d=>{d.preventDefault();const f=b("#cweight").value.trim();c([...s,{uid:ea(),itemId:null,nome:b("#cname").value.trim(),qtd:1,peso:f?`${f} kg`:"",equipado:!1,sintonizado:!1,notas:""}])};const h=(d,f)=>c(s.map(l=>l.uid===d?f(l):l));t.querySelectorAll("[data-qty]").forEach(d=>d.onclick=()=>h(d.dataset.qty,f=>({...f,qtd:Math.max(0,Number(f.qtd)+Number(d.dataset.d))}))),t.querySelectorAll("[data-equip]").forEach(d=>d.onchange=()=>h(d.dataset.equip,f=>({...f,equipado:d.checked}))),t.querySelectorAll("[data-attune]").forEach(d=>d.onchange=()=>{if(d.checked&&s.filter(f=>f.sintonizado).length>=3)return d.checked=!1,a.toast("Limite de 3 itens sintonizados.");h(d.dataset.attune,f=>({...f,sintonizado:d.checked}))}),t.querySelectorAll("[data-inote]").forEach(d=>d.oninput=()=>P("in"+d.dataset.inote,()=>h(d.dataset.inote,f=>({...f,notas:d.value})))),t.querySelectorAll("[data-rmitem]").forEach(d=>d.onclick=()=>c(s.filter(f=>f.uid!==d.dataset.rmitem))),O(t,"itens")}const La={ficha:{html:qa,bind:Aa},magias:{html:Ea,bind:Ca},classe:{html:Na,bind:ja},talentos:{html:Ma,bind:Da},itens:{html:za,bind:Ta}},q=b("#app"),$={be:null,comp:null,user:null,chId:null,ch:null,tab:"combate",amount:"",off:[],prevHp:null,ui:{spellQ:"",spellLvl:"all",spellMine:!0,featQ:"",featCat:"all",itemQ:"",libOpen:{}}},G=()=>`rpgmesa:last:${$.user.uid}`,H=()=>{$.off.forEach(e=>e()),$.off=[]},ta=Object.fromEntries(pa.map(([e,n])=>[e,n])),_=Object.fromEntries(D);Ba().catch(e=>{q.innerHTML=`<div class="wrap"><div class="card">Erro ao iniciar: ${r(e.message)}</div></div>`});async function Ba(){$.be=await ba(),va($.be,q,{title:"Grimório do Aventureiro",subtitle:"Entre com sua conta para acessar seus personagens em qualquer aparelho.",onSignedOut:()=>{H(),$.ch=null,$.chId=null,$.prevHp=null}},async e=>{$.user=e,q.innerHTML='<p class="muted" style="padding:1rem">Carregando compêndio…</p>',$.comp=await $a($.be);const n=F.get(G());n?U(n):B()})}const ia=()=>$.be.mode==="local"?'<p class="banner">Modo demo: os dados ficam neste navegador. Abra o Escudo em outra aba para testar a sincronização.</p>':"",Oa=()=>$.comp.completo?"":'<p class="banner">Biblioteca reduzida: o Mestre ainda não importou o compêndio completo no Escudo.</p>';function B(){H(),$.chId=null,$.ch=null,F.set(G(),null);let e=!1;$.off.push($.be.watchMyCharacters(n=>{b("#build")||(n.sort((a,i)=>a.name.localeCompare(i.name)),q.innerHTML=`<header class="top"><div class="row"><div class="grow name">Meus personagens</div>
      <a class="btn small" href="./escudo.html" title="Ir para o Escudo do Mestre">🛡️ Escudo</a>${la($.user)}</div></header>
    <main class="wrap stack">${ia()}${Oa()}
      ${n.map(a=>`<button class="charbtn" data-open="${a.id}">
        <span><b>${r(a.name)}</b><br><small class="muted">${r(ca(a))}</small></span>
        <span class="chip">${a.campaignName?"🎲 "+r(a.campaignName):"Sem mesa"}</span></button>`).join("")}
      ${n.length?"":'<div class="card"><p style="margin:0">Você ainda não tem personagens. Crie o primeiro abaixo — ele fica salvo na sua conta.</p></div>'}
      <button class="btn primary" id="newchar" style="width:100%">+ Novo personagem</button>
    </main>`,oa($.be,q),q.querySelectorAll("[data-open]").forEach(a=>a.onclick=()=>U(a.dataset.open)),b("#newchar").onclick=()=>Ha(),!n.length&&!e&&(e=!0))}))}function Ha(){H();const e=$.comp,n=[15,14,13,12,10,8];q.innerHTML=`<header class="top"><div class="row"><button class="btn small" id="back" aria-label="Voltar">◀</button><div class="grow name">Novo personagem</div></div></header>
  <main class="wrap stack">
  <form class="stack" id="build">
    <section class="card stack">
      <div><label for="name">Nome</label><input id="name" name="name" required maxlength="40" /></div>
      <div class="row">
        <div class="grow"><label for="species">Espécie</label><select id="species" name="species">
          ${e.species.map(v=>`<option value="${v.id}">${r(v.nome)}</option>`).join("")}</select></div>
        <div style="width:5.5rem"><label for="level">Nível</label><input id="level" name="level" type="number" inputmode="numeric" min="1" max="20" value="1" /></div>
      </div>
      <div><label for="speciesnome">Nome personalizado da espécie (opcional)</label>
        <input id="speciesnome" name="speciesnome" maxlength="60" placeholder="Ex.: Genasi da Terra" /></div>
      <div><label for="class">Classe</label><select id="class" name="class">
        ${e.classes.map(v=>`<option value="${v.id}">${r(v.nome)}</option>`).join("")}</select></div>
      <div><label for="classnome">Nome personalizado da classe (opcional)</label>
        <input id="classnome" name="classnome" maxlength="60" placeholder="Ex.: Arcanista" /></div>
      <p class="muted" style="margin:0;font-size:.85rem">Pra usar uma espécie ou classe alternativa/homebrew que não está na lista, escolha acima a mais parecida em regras — é dela que vêm os números — e dê um nome personalizado aqui, que aparece no lugar do nome oficial em toda a ficha.</p>
      <div><label for="customnote">Notas da personalização (opcional)</label>
        <textarea id="customnote" name="customnote" rows="2" placeholder="O que muda nessa versão (aparência, traços trocados…)"></textarea></div>
      <div id="classinfo"></div>
    </section>
    ${e.backgrounds.length?`<section class="card stack">
      <div><label for="bg">Antecedente</label><select id="bg" name="bg">
        ${e.backgrounds.map(v=>`<option value="${v.id}">${r(v.nome)}</option>`).join("")}</select></div>
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
  </form></main>`,b("#back").onclick=B;const a=b("#build"),i=()=>e.byId.classes[a.class.value],t=()=>{var v,w;return(w=e.byId.backgrounds)==null?void 0:w[(v=a.bg)==null?void 0:v.value]};function o(){var S;const v=i(),w=(S=v.periciasOpcoes)!=null&&S.length?v.periciasOpcoes:[];b("#classinfo").innerHTML=`
      <p class="muted" style="margin:.2rem 0;font-size:.88rem">Dado de Vida d${v.dadoVida} · Salvaguardas: ${(v.salvaguardas||[]).map(k=>_[k]).join(", ")}</p>
      ${w.length?`<div><label>Perícias da classe — escolha ${v.periciasEscolha} <span id="skcount"></span></label>
        <div class="checks">${w.map(k=>`<label class="chk"><input type="checkbox" name="sk" value="${k}"> ${ta[k]}</label>`).join("")}</div></div>`:""}`,a.querySelectorAll("[name=sk]").forEach(k=>k.onchange=s),s()}function s(){var u;const v=i(),w=((u=t())==null?void 0:u.pericias)||[],S=[...a.querySelectorAll("[name=sk]")];S.forEach(y=>{w.includes(y.value)&&(y.checked=!1,y.disabled=!0,y.parentElement.title="Já vem do antecedente")});const k=S.filter(y=>y.checked).length;S.forEach(y=>{w.includes(y.value)||(y.disabled=!y.checked&&k>=v.periciasEscolha)}),b("#skcount")&&(b("#skcount").textContent=`(${k}/${v.periciasEscolha})`)}function m(){const v=t();if(!v)return;const w=e.byId.feats[v.talentoId];b("#bginfo").innerHTML=`
      <p style="margin:.2rem 0;font-size:.9rem"><b>Perícias:</b> ${v.pericias.map(S=>ta[S]).join(", ")}<br>
      <b>Talento:</b> ${r((w==null?void 0:w.nome)||v.talento)}<br><b>Ferramenta:</b> ${r(v.ferramenta)}</p>
      <div class="row">
        <div class="grow"><label for="plus2">+2 em</label><select id="plus2">${v.atributos.map(S=>`<option value="${S}">${_[S]}</option>`).join("")}<option value="all">+1 nos três</option></select></div>
        <div class="grow" id="plus1wrap"><label for="plus1">+1 em</label><select id="plus1">${v.atributos.map((S,k)=>`<option value="${S}" ${k===1?"selected":""}>${_[S]}</option>`).join("")}</select></div>
      </div>
      <details class="entry"><summary><span class="t">Equipamento do antecedente</span></summary><div class="body">${r(v.equipamento)}</div></details>`,b("#plus2").onchange=b("#plus1").onchange=h,h(),s()}function c(){const v=t(),w={};if(!v)return w;const S=b("#plus2").value;if(S==="all")v.atributos.forEach(k=>w[k]=1);else{w[S]=2;const k=b("#plus1").value;k!==S&&(w[k]=(w[k]||0)+1)}return w}function h(){const v=c();b("#plus1wrap")&&(b("#plus1wrap").style.visibility=b("#plus2").value==="all"?"hidden":""),a.querySelectorAll(".abfinal").forEach(w=>{const S=w.dataset.ab,k=Math.min(20,Number(a[S].value)+(v[S]||0));w.textContent=v[S]?`→ ${k} (${j(Z(k))})`:`(${j(Z(k))})`})}const d=27,f={8:0,9:1,10:2,11:3,12:4,13:5,14:7,15:9},l=v=>f[v]??0;let p="array";function g(){const v=p==="buy";if(b("#ab-inputs").innerHTML=D.map(([w,S],k)=>{const u=document.getElementById("ab-"+w),y=u?u.value:v?8:n[k];return`<div><label for="ab-${w}">${S} <b class="abfinal" data-ab="${w}"></b></label>
        <div class="row" style="align-items:center;gap:.4rem;flex-wrap:nowrap">
          ${v?`<button type="button" class="btn small" data-abdown="${w}" aria-label="Diminuir ${S}">−</button>`:""}
          <input id="ab-${w}" name="${w}" type="number" inputmode="numeric" min="${v?8:3}" max="${v?15:20}"
            value="${y}" ${v?'readonly style="width:3.5rem;text-align:center"':""} />
          ${v?`<button type="button" class="btn small" data-abup="${w}" aria-label="Aumentar ${S}">+</button>`:""}
        </div></div>`}).join(""),v){const w=D.reduce((k,[u])=>k+l(Number(a[u].value)),0),S=d-w;b("#abpts").style.display="",b("#abpts").textContent=`${S} de ${d} pontos restantes`,a.querySelectorAll("[data-abup]").forEach(k=>k.onclick=()=>{const u=k.dataset.abup,y=Number(a[u].value);if(!(y>=15)){if(w+(l(y+1)-l(y))>d)return A("Sem pontos suficientes.");a[u].value=y+1,g()}}),a.querySelectorAll("[data-abdown]").forEach(k=>k.onclick=()=>{const u=k.dataset.abdown,y=Number(a[u].value);y<=8||(a[u].value=y-1,g())})}else b("#abpts").style.display="none",D.forEach(([w])=>a[w].oninput=h);h()}q.querySelectorAll("[data-abmode]").forEach(v=>v.onclick=()=>{v.dataset.abmode!==p&&(p=v.dataset.abmode,q.querySelectorAll("[data-abmode]").forEach(w=>w.setAttribute("aria-selected",String(w.dataset.abmode===p))),b("#abmode-help").textContent=p==="buy"?`Compra de pontos: comece com 8 em tudo e gaste os ${d} pontos (custo 9=1, 10=2, 11=3, 12=4, 13=5, 14=7, 15=9). Máximo 15 antes dos bônus do antecedente.`:"Valores base (Array Padrão: 15, 14, 13, 12, 10, 8). Edite livremente, se preferir. O bônus do antecedente é somado automaticamente.",D.forEach(([w],S)=>{const k=document.getElementById("ab-"+w);k&&(k.value=p==="buy"?8:n[S])}),g())}),a.class.onchange=o,a.bg&&(a.bg.onchange=m),o(),m(),g(),a.onsubmit=async v=>{var u;v.preventDefault();const w=c(),S=Object.fromEntries(D.map(([y])=>[y,Math.min(20,Number(a[y].value)+(w[y]||0))])),k=ha({name:a.name.value.trim(),ownerUid:$.user.uid,speciesId:a.species.value,classId:a.class.value,level:Number(a.level.value),abilities:S,backgroundId:((u=a.bg)==null?void 0:u.value)||null,skillProfs:[...a.querySelectorAll("[name=sk]:checked")].map(y=>y.value),speciesNomePersonalizado:a.speciesnome.value.trim()||null,classNomePersonalizado:a.classnome.value.trim()||null,customNote:a.customnote.value.trim()},e);try{U(await $.be.createCharacter(k))}catch(y){A(y.message)}}}const ca=e=>`${fa(e.build,$.comp)} · ${ga(e.build,$.comp)}`;function U(e){H(),$.chId=e,$.prevHp=null,F.set(G(),e),$.off.push($.be.watchCharacter(e,n=>{if(!n)return B();const a=$.prevHp;if($.prevHp=n.state.hp.current+n.state.hp.temp,$.ch=n,W(),a!=null&&a!==$.prevHp){const i=b("#hpcard");i==null||i.classList.add($.prevHp<a?"flash-dmg":"flash-heal"),navigator.vibrate&&$.prevHp<a&&navigator.vibrate(80)}}))}const Va=[["combate","❤️","Combate"],["ficha","📜","Ficha"],["magias","✨","Magias"],["classe","🛡️","Traços"],["talentos","⭐","Talentos"],["itens","🎒","Itens"]],M={get S(){return $},app:q,render:()=>W(),save:e=>$.be.updateCharacter($.chId,e).catch(n=>A(n.message)),toast:A,showHome:()=>B(),confirmTwice:xa,accountChip:la,bindLogout:oa};function W(){const e=$.ch,n=ya(e,$.comp),a=document.activeElement,i=a==null?void 0:a.id,t=a&&"selectionStart"in a?[a.selectionStart,a.selectionEnd]:null,o=window.scrollY,s={combate:{html:Ra,bind:Qa},...La},m=s[$.tab]||s.combate;if(q.innerHTML=`
    <header class="top">
      <div class="row"><button class="btn small" id="home" aria-label="Meus personagens">◀</button>
        <div class="grow"><div class="name">${r(e.name)}</div>
        <div class="mini"><span>${r(ca(e))}</span>${e.campaignName?`<span>🎲 ${r(e.campaignName)}</span>`:""}</div></div>
        <div class="mini"><span>CA <b>${e.build.ac??10}</b></span><span>PV <b>${e.state.hp.current}/${e.state.hp.max}</b></span></div>
        <a class="btn small" href="./escudo.html" title="Ir para o Escudo do Mestre">🛡️</a></div>
    </header>
    <main class="wrap stack">${ia()}${m.html(e,n,M)}</main>
    <nav class="tabs" role="tablist">${Va.map(([c,h,d])=>`<button role="tab" aria-selected="${$.tab===c}" data-tab="${c}"><span class="ico" aria-hidden="true">${h}</span>${d}</button>`).join("")}</nav>`,q.querySelectorAll("[data-tab]").forEach(c=>c.onclick=()=>{$.tab=c.dataset.tab,W(),window.scrollTo(0,0)}),b("#home").onclick=B,m.bind(e,n,M),window.scrollTo(0,o),i){const c=document.getElementById(i);if(c&&(c.focus({preventScroll:!0}),t&&"setSelectionRange"in c))try{c.setSelectionRange(...t)}catch{}}}function xa(e,n){const a=b(e);if(a.dataset.armed)return!0;a.dataset.armed="1";const i=a.textContent;return a.textContent=n,setTimeout(()=>{a.isConnected&&(delete a.dataset.armed,a.textContent=i)},3e3),!1}function Ra(e,n){const{hp:a,deathSaves:i={success:0,fail:0},conditions:t=[],dead:o}=e.state,s=a.max+a.temp,m=Math.round(a.current/s*100),c=Math.round(a.temp/s*100),h=a.current/a.max>.5?"":a.current/a.max>.25?"mid":"low",d=a.current===0&&!o,f=e.state.concentration?$.comp.byId.spells[e.state.concentration]:null;return`
  <section class="card stack" id="hpcard">
    <div class="hp-big"><div class="num">${a.current}<small> / ${a.max}</small></div>
      ${a.temp?`<div class="tmpv">+${a.temp} temporários</div>`:""}
      ${o?'<div class="chip bad" style="margin-top:.4rem">MORTO</div>':""}</div>
    <div class="hpbar" aria-hidden="true"><div class="cur ${h}" style="width:${m}%"></div><div class="tmp" style="width:${c}%"></div></div>
    <input id="amount" class="amount" type="number" inputmode="numeric" min="0" placeholder="0" value="${r($.amount)}" aria-label="Valor" />
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
    <div><b>${j(n.initiative)}</b><small>Iniciativa</small></div>
    <div><b>${r(n.speed.replace(" metros"," m"))}</b><small>Deslocamento</small></div>
    <div><b>${n.passivePerception}</b><small>Perc. passiva</small></div>
  </div></section>
  ${f?`<p class="banner">Concentrando em: <b>${r(f.nome)}</b> <button class="btn small" id="endconc" style="margin-left:.5rem">Encerrar</button></p>`:""}
  ${d?`<section class="card stack"><h2>Testes contra a morte</h2>
    <div class="saves"><div><small class="muted">Sucessos</small><div class="pips">${[0,1,2].map(l=>`<span class="pip ${l<i.success?"s":""}"></span>`).join("")}</div></div>
      <div><small class="muted">Falhas</small><div class="pips">${[0,1,2].map(l=>`<span class="pip ${l<i.fail?"f":""}"></span>`).join("")}</div></div></div>
    <button class="btn primary" id="roll-death" style="width:100%">Rolar d20</button></section>`:""}
  <section class="card stack"><h2>Condições</h2>
    <div class="row">${t.map(l=>`<button class="chip bad" data-rmcond="${l}" aria-label="Remover ${l}">${X[l]||l} ✕</button>`).join("")||'<span class="muted">Nenhuma</span>'}</div>
    <div class="row"><select id="addcond" class="grow" aria-label="Adicionar condição"><option value="">Adicionar condição…</option>
      ${wa.filter(l=>!t.includes(l)).map(l=>`<option value="${l}">${X[l]||l}</option>`).join("")}</select></div>
  </section>
  <section class="card stack"><h2>Descanso</h2>
    ${(e.state.hitDice.byClass||[]).length>1?e.state.hitDice.byClass.map(l=>{const p=$.comp.byId.classes[l.classId];return`<div class="row" style="justify-content:space-between"><span class="muted">${r((p==null?void 0:p.nome)||l.classId)}: ${l.max-l.used}/${l.max} (d${l.die})</span>
            <button class="btn small" data-shortclass="${l.classId}">Gastar</button></div>`}).join(""):`<p class="muted" style="margin:0">Dados de Vida: ${e.state.hitDice.max-e.state.hitDice.used}/${e.state.hitDice.max} (d${e.state.hitDice.die})</p>
         <div class="row"><button class="btn grow" id="short">Gastar 1 Dado de Vida</button></div>`}
    <div class="row"><button class="btn grow" id="long">Descanso Longo</button></div>
  </section>
  <section class="card"><h2>Registro</h2><ul class="log">${(e.state.log||[]).map(l=>`<li>${r(l)}</li>`).join("")||"<li>—</li>"}</ul></section>`}function Qa(e,n){const a=b("#amount");a.oninput=()=>$.amount=a.value,q.querySelectorAll("[data-q]").forEach(t=>t.onclick=()=>{$.amount=t.dataset.q==="C"?"":String((Number($.amount)||0)+Number(t.dataset.q)),a.value=$.amount}),q.querySelectorAll("[data-act]").forEach(t=>t.onclick=async()=>{const o=Number($.amount);if(!o)return A("Digite um valor.");const s={resistant:b("#o-res").checked,vulnerable:b("#o-vul").checked,critical:b("#o-crit").checked};$.amount="";const m=await x($.be,$.chId,t.dataset.act,o,s,e.name);m.concentrationDC&&e.state.concentration?A(`Teste de Concentração: CD ${m.concentrationDC}`):m.log.length&&A(m.log.at(-1))}),b("#endconc")&&(b("#endconc").onclick=()=>M.save({"state.concentration":null})),b("#roll-death")&&(b("#roll-death").onclick=async()=>{const t=aa("1d20").total,o=await x($.be,$.chId,"morte",t,{},e.name);A(`d20 = ${t}. ${o.log.at(-1)??""}`)}),q.querySelectorAll("[data-rmcond]").forEach(t=>t.onclick=()=>M.save({"state.conditions":e.state.conditions.filter(o=>o!==t.dataset.rmcond)})),b("#addcond").onchange=t=>t.target.value&&M.save({"state.conditions":[...e.state.conditions,t.target.value]});const i=async(t,o)=>{const s=aa(`1d${t}`).total+n.mods.con;await o();const m=await x($.be,$.chId,"cura",Math.max(0,s),{},e.name);A(`Dado de Vida: ${s}. ${m.log[0]??""}`)};b("#short")&&(b("#short").onclick=()=>{const t=e.state.hitDice;if(t.used>=t.max)return A("Sem Dados de Vida disponíveis.");i(t.die,()=>M.save({"state.hitDice.used":t.used+1}))}),q.querySelectorAll("[data-shortclass]").forEach(t=>t.onclick=()=>{const o=e.state.hitDice.byClass,s=o.findIndex(h=>h.classId===t.dataset.shortclass),m=o[s];if(m.used>=m.max)return A("Sem Dados de Vida dessa classe.");const c=o.map((h,d)=>d===s?{...h,used:h.used+1}:h);i(m.die,()=>M.save({"state.hitDice.byClass":c,"state.hitDice.used":c.reduce((h,d)=>h+d.used,0)}))}),b("#long").onclick=async()=>{const t=Object.fromEntries(Object.entries(e.state.spellSlots||{}).map(([m,c])=>[m,{...c,used:0}])),o=Object.fromEntries(Object.entries(e.state.pactSlots||{}).map(([m,c])=>[m,{...c,used:0}])),s=(e.state.hitDice.byClass||[]).map(m=>({...m,used:0}));await M.save({"state.hp":{...e.state.hp,current:e.state.hp.max,temp:0},"state.spellSlots":t,"state.pactSlots":o,"state.hitDice":{...e.state.hitDice,byClass:s,used:0},"state.deathSaves":{success:0,fail:0},"state.conditions":e.state.conditions.filter(m=>!["inconsciente","estabilizado"].includes(m))}),A("Descanso longo concluído.")}}
