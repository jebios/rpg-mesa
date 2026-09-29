import"./pwa-JyTihLW-.js";import{e as c,A as z,$ as b,m as oa,t as C,h as N,n as G,o as Ea,q as ia,w as Aa,x as Ca,y as Ia,S as Na,g as ja,r as Ma,l as Pa,s as X,a as ba,b as va,z as xa,B as Ta,f as za,c as Da,d as Ba,C as ca,i as La,j as K,D as Oa,k as Ha,E as ra}from"./auth-BweszVwO.js";function da(s){const o=String(s).replace(/\s/g,"").match(/^(\d*)d(\d+)([+-]\d+)?$/i);if(!o)return null;const a=Number(o[1]||1),d=Number(o[2]),t=Number(o[3]||0),i=Array.from({length:a},()=>1+Math.floor(Math.random()*d));return{rolls:i,bonus:t,total:i.reduce((e,r)=>e+r,0)+t}}const B=s=>c(s).replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>").replace(/(^|\s)_([^_]+)_(?=\s|$|[.,;:])/g,"$1<i>$2</i>");function M(s){if(!s)return"";const o=[];for(const a of String(s).split(/\n\n+/)){const d=a.split(`
`);if(d.every(t=>t.startsWith("| "))){o.push('<div class="mdtable"><table>'+d.map(t=>"<tr>"+t.slice(2).split(" | ").map(i=>`<td>${B(i)}</td>`).join("")+"</tr>").join("")+"</table></div>");continue}for(const t of d)t.startsWith("#### ")?o.push(`<h5>${B(t.slice(5))}</h5>`):t.startsWith("### ")?o.push(`<h4>${B(t.slice(4))}</h4>`):t.startsWith("| ")?o.push('<div class="mdtable"><table><tr>'+t.slice(2).split(" | ").map(i=>`<td>${B(i)}</td>`).join("")+"</tr></table></div>"):t.startsWith("• ")?o.push(`<p class="bullet">${B(t)}</p>`):o.push(`<p>${B(t)}</p>`)}return`<div class="md">${o.join("")}</div>`}const D=s=>String(s||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(),$a=Object.fromEntries(z),L=40,R=s=>s===0?"Truque":`${s}º círculo`,ua=()=>Math.random().toString(36).slice(2,9),j=(s,o,a,d=!1,t="",i="")=>`<details class="entry" ${d?"open":""} ${t}><summary><span class="t">${s}</span><span class="row" style="gap:.4rem;flex-wrap:nowrap"><span class="lvl-badge">${o||""}</span>${i}</span></summary><div class="body">${a}</div></details>`,Z=(s,o,a="Adicionar")=>`<button class="btn small primary addbtn" ${s}="${o}" aria-label="${a}">+</button>`;function Va(s,o,a){const d=a.S,t=d.comp,i=new Set(s.build.classes.map(n=>n.classId)),e=t.classes.filter(n=>!i.has(n.id)),r=o.classesInfo.slice(1);return`
  <section class="card stack"><h2>Multiclasse</h2>
    <p class="empty-note" style="margin:0">Nível total: ${o.level}/20. Ao multiclassar, confira na aba Traços quais proficiências a nova classe concede (são menos do que na criação) e ajuste "Treinamento e Proficiências" à mão, se precisar.</p>
    ${r.length?r.map(n=>{var m,g,l,y,k;const h=((m=n.cls)==null?void 0:m.subclasses)||[];return`<div class="row" style="flex-wrap:wrap;gap:.5rem;border-top:1px solid var(--border,#3332);padding-top:.5rem">
        <b class="grow">${c(((g=n.cls)==null?void 0:g.nome)||n.classId)}</b>
        <div class="row" style="gap:.3rem"><button class="btn small" data-mcdown="${n.classId}" aria-label="Diminuir nível de ${c(((l=n.cls)==null?void 0:l.nome)||n.classId)}">−</button>
          <span style="min-width:1.4rem;text-align:center">${n.level}</span>
          <button class="btn small" data-mcup="${n.classId}" aria-label="Subir nível de ${c(((y=n.cls)==null?void 0:y.nome)||n.classId)}">+</button></div>
        ${h.length?`<select data-mcsub="${n.classId}" aria-label="Subclasse de ${c(((k=n.cls)==null?void 0:k.nome)||n.classId)}" ${n.level<3?"disabled":""}>
          <option value="">—</option>${h.map(v=>`<option value="${v.id}" ${v.id===n.subclassId?"selected":""}>${c(v.nome)}</option>`).join("")}</select>`:""}
        <button class="btn small danger" data-mcrm="${n.classId}">Remover</button>
      </div>`}).join(""):'<p class="empty-note">Personagem de classe única.</p>'}
    ${e.length&&o.level<20?`<form class="row" id="addclass">
      <select id="mcnew" class="grow" aria-label="Nova classe">${e.map(n=>`<option value="${n.id}">${c(n.nome)}</option>`).join("")}</select>
      <button class="btn primary small">+ Adicionar classe</button></form>`:""}
  </section>`}function Ra(s,o,a){const d=a.S,t=a.app;t.querySelectorAll("[data-mcup]").forEach(i=>i.onclick=()=>{const e=s.build.classes.find(r=>r.classId===i.dataset.mcup);a.save(ia(s,d.comp,i.dataset.mcup,e.level+1))}),t.querySelectorAll("[data-mcdown]").forEach(i=>i.onclick=()=>{const e=s.build.classes.find(r=>r.classId===i.dataset.mcdown);if(e.level<=1)return a.toast('Nível mínimo 1 — use "Remover" para tirar a classe.');a.save(ia(s,d.comp,i.dataset.mcdown,e.level-1))}),t.querySelectorAll("[data-mcsub]").forEach(i=>i.onchange=()=>a.save(Aa(s,d.comp,i.dataset.mcsub,i.value||null))),t.querySelectorAll("[data-mcrm]").forEach(i=>i.onclick=()=>{if(!a.confirmTwice(`[data-mcrm="${i.dataset.mcrm}"]`,"Toque de novo para remover"))return;const e=Ca(s,d.comp,i.dataset.mcrm);e&&a.save(e)}),b("#addclass")&&(b("#addclass").onsubmit=i=>{i.preventDefault();const e=Ia(s,d.comp,b("#mcnew").value);e&&(a.save(e),a.toast("Classe adicionada no nível 1."))})}function Fa(s,o,a){var n,h,m,g,l,y;const d=a.S,t=s.build.classes[0].level,i=s.build.classes[0],e=((n=o.cls)==null?void 0:n.subclasses)||[],r=s.build.training||{};return`
  <section class="card stack">
    <div class="sectiontitle"><h2 style="margin:0">${o.multiclass?`${c(i.nomePersonalizado||((h=o.cls)==null?void 0:h.nome)||"")} ${t}`:`Nível ${t}`}</h2>
      <div class="row"><button class="btn small" id="lvldown" aria-label="Diminuir nível">−</button><button class="btn small primary" id="lvlup" aria-label="Subir de nível">+ Nível</button></div></div>
    ${o.multiclass?`<p class="empty-note" style="margin:0">Classe principal (foi ela que deu o 1º dado de vida cheio). Nível total do personagem: ${o.level}.</p>`:""}
    ${e.length?`<div><label for="subclass">Subclasse${t<3?" (a partir do nível 3)":""}</label>
      <select id="subclass" ${t<3?"disabled":""}><option value="">—</option>${e.map(k=>`<option value="${k.id}" ${k.id===i.subclassId?"selected":""}>${c(k.nome)}</option>`).join("")}</select></div>`:""}
    <div class="stats">
      <div><b>${N(o.pb)}</b><small>Proficiência</small></div>
      <div><b>${N(o.initiative)}</b><small>Iniciativa</small></div>
      <div><b>${c(o.speed.replace(" metros"," m"))}</b><small>Deslocamento</small></div>
      <div><b>${o.passivePerception}</b><small>Perc. passiva</small></div>
    </div>
    <div class="row"><label for="ac" style="margin:0">Classe de Armadura</label>
      <input id="ac" type="number" inputmode="numeric" style="width:6rem" value="${s.build.ac??10}" /></div>
    <div class="row"><label for="hpmax" style="margin:0">PV Máximo</label>
      <input id="hpmax" type="number" inputmode="numeric" min="1" style="width:6rem" value="${s.state.hp.max}" /></div>
    <p class="empty-note" style="margin:0">O PV máximo pode ser ajustado à mão — use o valor rolado no dado com o Mestre. Ao subir de nível, o app só soma o ganho médio da regra a esse valor.</p>
  </section>

  ${Va(s,o,a)}

  <section class="card stack"><h2>Personalização de espécie/classe</h2>
    <p class="empty-note" style="margin:0">Pra jogar uma espécie ou classe alternativa/homebrew, dê um nome personalizado aqui — os números continuam vindo da opção escolhida na criação (${c(((m=o.sp)==null?void 0:m.nome)||"")} / ${c(((g=o.cls)==null?void 0:g.nome)||"")}).</p>
    <div class="row">
      <div class="grow"><label for="pz-sp">Nome da espécie</label>
        <input id="pz-sp" maxlength="60" placeholder="${c(((l=o.sp)==null?void 0:l.nome)||"")}" value="${c(s.build.speciesNomePersonalizado||"")}" /></div>
      <div class="grow"><label for="pz-cl">Nome da classe</label>
        <input id="pz-cl" maxlength="60" placeholder="${c(((y=o.cls)==null?void 0:y.nome)||"")}" value="${c(i.nomePersonalizado||"")}" /></div>
    </div>
    <div><label for="pz-note">Notas da personalização</label>
      <textarea id="pz-note" rows="2" placeholder="O que muda nessa versão (aparência, traços trocados…)">${c(s.build.customNote||"")}</textarea></div>
  </section>

  <section class="card stack"><h2>Atributos e Salvaguardas</h2>
    <p class="empty-note">Toque em <b>Salvaguarda</b> para marcar/desmarcar proficiência.</p>
    <div class="abil2">${z.map(([k,v])=>{const p=(s.build.saveProfs||[]).includes(k);return`<div class="abcard">
        <small>${v}</small><b>${N(o.mods[k])}</b>
        <input class="abscore" data-score="${k}" type="number" inputmode="numeric" min="1" max="30" value="${s.build.abilities[k]}" aria-label="Valor de ${v}" />
        <button class="savebtn ${p?"on":""}" data-save="${k}" aria-pressed="${p}">
          <span class="dot ${p?"on":""}"></span>Salvaguarda <b>${N(o.saves[k])}</b></button>
      </div>`}).join("")}</div>
  </section>

  <section class="card"><h2>Perícias</h2><p class="empty-note">Toque para alternar: sem proficiência → proficiente (●) → especialista (◆).</p>
    <div class="skills">${o.skills.map(k=>`<button data-skill="${k.id}" aria-pressed="${k.prof||k.exp}">
      <span class="row" style="flex-wrap:nowrap"><span class="dot ${k.exp?"exp":k.prof?"on":""}"></span>${k.nome} <small class="muted">(${k.ab.toUpperCase()})</small></span><b>${N(k.bonus)}</b></button>`).join("")}</div>
  </section>

  <section class="card stack"><h2>Treinamento e Proficiências</h2>
    ${[["armaduras","Treinamento com Armaduras"],["armas","Proficiência com Armas"],["ferramentas","Proficiência com Ferramentas"],["idiomas","Idiomas"]].map(([k,v])=>`<div><label for="tr-${k}">${v}</label><textarea id="tr-${k}" data-train="${k}" rows="2">${c(r[k]||"")}</textarea></div>`).join("")}
  </section>

  <section class="card stack"><h2>Anotações</h2>
    <textarea id="notes" rows="5" placeholder="Aliados, pistas, história…">${c(s.notes)}</textarea></section>

  <section class="card stack"><h2>Mesa</h2>
    ${s.campaignId?`<p style="margin:0">Jogando em <b>${c(s.campaignName)}</b>. O Mestre dessa mesa pode ver e alterar esta ficha.</p>
         <button class="btn" id="leave-table">Sair da mesa</button>`:`<p class="muted" style="margin:0">Esta ficha não está em nenhuma mesa. Só você pode vê-la.</p>
         <form class="row" id="join"><input id="code" class="grow" autocomplete="off" autocapitalize="characters" placeholder="Código (ABC-123)" aria-label="Código da mesa" required style="width:auto" />
         <button class="btn primary">Entrar</button></form>`}
  </section>
  <section class="card stack"><h2>Conta</h2>
    <div class="row">${a.accountChip(d.user)}</div>
    <button class="btn danger small" id="delete">Apagar personagem</button>
  </section>`}let ma={};const P=(s,o,a=600)=>{clearTimeout(ma[s]),ma[s]=setTimeout(o,a)};function Ua(s,o,a){const d=a.S,t=a.app,i=s.build.classes[0].level;b("#lvlup").onclick=()=>o.level<20&&a.save(G(s,d.comp,i+1)).then(()=>a.toast(`Nível ${i+1}! PV máximo, Dados de Vida e espaços atualizados.`)),b("#lvldown").onclick=()=>i>1&&a.save(G(s,d.comp,i-1)),b("#subclass")&&(b("#subclass").onchange=e=>a.save(G(s,d.comp,i,e.target.value||null))),Ra(s,o,a),b("#pz-sp").oninput=e=>P("pzsp",()=>a.save({"build.speciesNomePersonalizado":e.target.value.trim()||null})),b("#pz-cl").oninput=e=>P("pzcl",()=>{const r=s.build.classes.map((n,h)=>h===0?{...n,nomePersonalizado:b("#pz-cl").value.trim()||null}:n);a.save({"build.classes":r})}),b("#pz-note").oninput=e=>P("pznote",()=>a.save({"build.customNote":e.target.value})),b("#ac").onchange=e=>a.save({"build.ac":Number(e.target.value)||10}),b("#hpmax").onchange=e=>{const r=Math.max(1,Number(e.target.value)||1);a.save({"state.hp":{...s.state.hp,max:r,current:Math.min(s.state.hp.current,r)}})},t.querySelectorAll("[data-score]").forEach(e=>e.onchange=()=>{const r=Math.max(1,Math.min(30,Number(e.value)||10)),n=e.dataset.score,h={[`build.abilities.${n}`]:r};n==="con"&&(h["state.hp"]={...s.state.hp,...Ea(s,d.comp,r)}),a.save(h)}),t.querySelectorAll("[data-save]").forEach(e=>e.onclick=()=>{const r=e.dataset.save,n=s.build.saveProfs||[];a.save({"build.saveProfs":n.includes(r)?n.filter(h=>h!==r):[...n,r]})}),t.querySelectorAll("[data-skill]").forEach(e=>e.onclick=()=>{const r=e.dataset.skill,n=s.build.skillProfs||[],h=s.build.expertise||[];h.includes(r)?a.save({"build.expertise":h.filter(m=>m!==r),"build.skillProfs":n.filter(m=>m!==r)}):n.includes(r)?a.save({"build.expertise":[...h,r]}):a.save({"build.skillProfs":[...n,r]})}),t.querySelectorAll("[data-train]").forEach(e=>e.oninput=()=>P("tr"+e.dataset.train,()=>a.save({[`build.training.${e.dataset.train}`]:e.value}))),b("#notes").oninput=e=>P("notes",()=>a.save({notes:e.target.value})),a.bindLogout(d.be,t),b("#join")&&(b("#join").onsubmit=async e=>{e.preventDefault();try{const r=await d.be.joinByCode(b("#code").value);await d.be.updateCharacter(d.chId,{campaignId:r.id,campaignName:r.name}),a.toast(`${s.name} entrou na mesa ${r.name}.`)}catch(r){a.toast(r.message)}}),b("#leave-table")&&(b("#leave-table").onclick=()=>{a.confirmTwice("#leave-table","Toque de novo para confirmar")&&a.save({campaignId:null,campaignName:null})}),b("#delete").onclick=async()=>{if(!a.confirmTwice("#delete",`Toque de novo para apagar ${s.name}`))return;const e=d.chId;await d.be.deleteCharacter(e),a.showHome()}}function Qa(s,o,a){const d=a.S,t=d.comp,i=d.ui,e=new Set(o.bonusSpells||[]),r=(s.build.spellsKnown||[]).filter(u=>!e.has(u)),n=s.build.spellsPrepared||[],h=[...e].map(u=>t.byId.spells[u]).filter(Boolean).sort((u,q)=>u.nivel-q.nivel||u.nome.localeCompare(q.nome)),m=Object.entries(s.state.spellSlots||{}),g=Object.entries(s.state.pactSlots||{}),l=[...m,...g].reduce((u,[q,I])=>I.max>0?Math.max(u,Number(q)):u,0),y=o.casters.length>0,k=r.map(u=>t.byId.spells[u]).filter(Boolean).sort((u,q)=>u.nivel-q.nivel||u.nome.localeCompare(q.nome)),v={};k.forEach(u=>{var q;return(v[q=u.nivel]||(v[q]=[])).push(u)});const p=s.build.classes.map(u=>u.classId),S=o.classesInfo.map(u=>{var q;return(q=u.cls)==null?void 0:q.nome}).filter(Boolean).join(" + "),f=o.spellCaps||{},E=k.filter(u=>u.nivel===0).length,w=k.filter(u=>u.nivel>0).length,sa=n.length,ga=f.cantrips!==null&&E>=f.cantrips,ya=f.known!==null&&w>=f.known,wa=f.prepared!==null&&sa>=f.prepared,ta=D(i.spellQ);let V=t.spells.filter(u=>!r.includes(u.id)&&!e.has(u.id)&&(!i.spellMine||!o.casters.length||u.classes.some(q=>p.includes(q)))&&(i.spellLvl==="all"||String(u.nivel)===i.spellLvl)&&(!ta||D(u.nome).includes(ta)));const la=V.length;V=V.slice(0,L);const ka=u=>(u.nivel===0?ga:ya)?`<button class="btn small" data-learnfull="${u.nivel===0?"truque":"magia"}" aria-label="Limite atingido">+</button>`:Z("data-learn",u.id,"Adicionar "+c(u.nome)),Sa=u=>{const q=n.includes(u.id);return!q&&wa?'<button class="btn small" data-prepfull="1" aria-label="Limite de magias preparadas atingido">Preparar</button>':`<button class="btn small" data-prep="${u.id}">${q?"✓ Preparada":"Preparar"}</button>`},na=(u,q)=>`
    <div class="muted" style="font-size:.85rem">${c(u.escola)} · ${c(u.tempo)} · ${c(u.alcance)}<br>${c(u.componentes)} · ${c(u.duracao)}</div>
    ${M(u.desc)}
    <div class="row">${q?`${u.nivel>0?Sa(u):""}
         ${u.concentracao?`<button class="btn small" data-conc="${u.id}">${s.state.concentration===u.id?"Encerrar concentração":"Concentrar"}</button>`:""}
         <button class="btn small" data-forget="${u.id}">Remover</button>`:""}</div>`,Q=u=>[u.concentracao?"C":"",u.ritual?"R":""].filter(Boolean).map(q=>`<span class="chip">${q}</span>`).join(" "),_=(u,q,I)=>I===null?"":`<span class="lvl-badge">${q}/${I} ${u}</span>`,qa=u=>`
    <div class="muted" style="font-size:.85rem">${c(u.escola)} · ${c(u.tempo)} · ${c(u.alcance)}<br>${c(u.componentes)} · ${c(u.duracao)}</div>
    ${M(u.desc)}
    ${u.concentracao?`<div class="row"><button class="btn small" data-conc="${u.id}">${s.state.concentration===u.id?"Encerrar concentração":"Concentrar"}</button></div>`:""}`;return`
  ${o.casters.length?`<section class="card stack">${o.casters.map(u=>`<div class="stats" style="grid-template-columns:repeat(3,1fr)">
    <div><b>${u.dc}</b><small>CD (${c(u.nome)})</small></div><div><b>${N(u.atk)}</b><small>Ataque mágico</small></div>
    <div><b>${$a[u.atributoConjuracao].slice(0,3)}</b><small>Atributo</small></div></div>`).join("")}</section>`:""}
  ${m.length?`<section class="card slots"><h2>Espaços de magia${o.multiclass?" (combinados)":""}</h2>
    ${m.map(([u,q])=>`<div class="lvl"><span>${u}º</span>${Array.from({length:q.max},(I,x)=>`<button class="slotpip ${x<q.used?"used":""}" data-slot="${u}" data-i="${x}" aria-label="Espaço de ${u}º círculo ${x+1}${x<q.used?", gasto":""}"></button>`).join("")}</div>`).join("")}
  </section>`:""}
  ${g.length?`<section class="card slots"><h2>Magia de Pacto</h2>
    ${g.map(([u,q])=>`<div class="lvl"><span>${u}º</span>${Array.from({length:q.max},(I,x)=>`<button class="slotpip ${x<q.used?"used":""}" data-pactslot="${u}" data-i="${x}" aria-label="Espaço de pacto ${x+1}${x<q.used?", gasto":""}"></button>`).join("")}</div>`).join("")}
  </section>`:""}
  ${h.length?`<section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Magias da Subclasse</h2><span class="lvl-badge">sempre preparadas</span></div>
    <p class="empty-note" style="margin:0">Concedidas automaticamente pela subclasse — não contam no limite de magias conhecidas/preparadas, mas ainda gastam um espaço de magia ao conjurar.</p>
    <div class="stack">${h.map(u=>j(`${c(u.nome)} ${Q(u)}`,R(u.nivel),qa(u),!1,`data-k="b-${u.id}"`)).join("")}</div>
  </section>`:""}
  ${f.cantrips!==null||f.known!==null||f.prepared!==null?`<section class="card stack"><h2>Limites de magias (regra 2024)</h2>
    <div class="row" style="flex-wrap:wrap;gap:.4rem">${_("truques",E,f.cantrips)}${_("magias conhecidas",w,f.known)}${_("preparadas",sa,f.prepared)}</div>
    <details class="entry"><summary><span class="t">Exceção manual (magia extra de livro/pergaminho…)</span></summary><div class="body stack">
      <p class="empty-note" style="margin:0">Some ao limite oficial acima. Use quando o personagem aprendeu algo fora da regra normal.</p>
      <div class="row" style="flex-wrap:wrap">
        <div class="grow"><label for="extra-cantrips">Truques extras</label><input id="extra-cantrips" type="number" min="0" value="${s.build.extraCantrips||0}" /></div>
        <div class="grow"><label for="extra-spells">Magias extras</label><input id="extra-spells" type="number" min="0" value="${s.build.extraSpells||0}" /></div>
        ${f.invocacoes!==null?`<div class="grow"><label for="extra-invoc">Invocações extras</label><input id="extra-invoc" type="number" min="0" value="${s.build.extraInvocations||0}" /></div>`:""}
      </div>
      <div><label for="extra-note">Motivo (opcional)</label>
        <textarea id="extra-note" rows="2" placeholder="Ex.: aprendeu com um pergaminho encontrado na masmorra">${c(s.build.extraSpellsNote||"")}</textarea></div>
    </div></details>
  </section>`:""}
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Minhas magias</h2><span class="lvl-badge">${n.length} preparada(s)</span></div>
    ${Object.keys(v).length?Object.entries(v).map(([u,q])=>`<h3 style="margin:.6rem 0 .2rem;color:var(--muted)">${R(Number(u))}</h3>
      <div class="stack" style="--gap:.4rem">${q.map(I=>j(`${I.nivel>0&&n.includes(I.id)?"✓ ":""}${c(I.nome)} ${Q(I)}`,R(I.nivel),na(I,!0),!1,`data-k="m-${I.id}"`)).join("")}</div>`).join(""):'<p class="empty-note">Nenhuma magia ainda. Adicione pela biblioteca abaixo.</p>'}
  </section>
  <section class="card stack"><h2>Biblioteca de magias</h2>
    <input id="spellq" type="search" placeholder="Buscar magia pelo nome…" value="${c(i.spellQ)}" aria-label="Buscar magia" />
    <div class="filters">${["all","0","1","2","3","4","5","6","7","8","9"].map(u=>{const q=u==="all"||(u==="0"?y:y&&Number(u)<=l);return`<button data-flvl="${u}" aria-pressed="${i.spellLvl===u}" class="${q?"":"unavail"}" ${q?"":'title="Ainda não disponível no seu nível"'}>${u==="all"?"Todas":u==="0"?"Truques":u+"º"}</button>`}).join("")}</div>
    ${y?`<p class="empty-note" style="margin:0">Seu nível permite conjurar ${l===0?"só truques":`truques e magias até ${l}º círculo`}. Os demais círculos aparecem esmaecidos até você subir de nível.</p>`:""}
    ${S?`<label class="chk"><input type="checkbox" id="spellmine" ${i.spellMine?"checked":""}> Só a lista de ${c(S)}</label>`:""}
    <p class="empty-note">${la} magia(s)${la>L?` — mostrando ${L}, refine a busca`:""}.</p>
    <div class="stack">${V.map(u=>j(`${c(u.nome)} ${Q(u)}`,R(u.nivel),na(u,!1),!1,`data-k="l-${u.id}"`,ka(u))).join("")}</div>
  </section>`}function _a(s,o,a){const d=a.S,t=a.app,i=d.ui;t.querySelectorAll("[data-slot]").forEach(e=>e.onclick=()=>{const r=e.dataset.slot,n=Number(e.dataset.i),h=s.state.spellSlots[r];a.save({[`state.spellSlots.${r}.used`]:n<h.used?n:n+1})}),t.querySelectorAll("[data-pactslot]").forEach(e=>e.onclick=()=>{const r=e.dataset.pactslot,n=Number(e.dataset.i),h=s.state.pactSlots[r];a.save({[`state.pactSlots.${r}.used`]:n<h.used?n:n+1})}),b("#spellq").oninput=e=>{i.spellQ=e.target.value,P("sq",a.render,250)},t.querySelectorAll("[data-flvl]").forEach(e=>e.onclick=()=>{i.spellLvl=e.dataset.flvl,a.render()}),b("#spellmine")&&(b("#spellmine").onchange=e=>{i.spellMine=e.target.checked,a.render()}),t.querySelectorAll("[data-learn]").forEach(e=>e.onclick=()=>a.save({"build.spellsKnown":[...s.build.spellsKnown||[],e.dataset.learn]})),t.querySelectorAll("[data-learnfull]").forEach(e=>e.onclick=()=>C(`Limite de ${e.dataset.learnfull==="truque"?"truques conhecidos":"magias conhecidas"} atingido. Use a exceção manual acima se for o caso.`)),t.querySelectorAll("[data-forget]").forEach(e=>e.onclick=()=>a.save({"build.spellsKnown":(s.build.spellsKnown||[]).filter(r=>r!==e.dataset.forget),"build.spellsPrepared":(s.build.spellsPrepared||[]).filter(r=>r!==e.dataset.forget)})),t.querySelectorAll("[data-prep]").forEach(e=>e.onclick=()=>{const r=s.build.spellsPrepared||[],n=e.dataset.prep;a.save({"build.spellsPrepared":r.includes(n)?r.filter(h=>h!==n):[...r,n]})}),t.querySelectorAll("[data-prepfull]").forEach(e=>e.onclick=()=>C("Limite de magias preparadas atingido. Use a exceção manual acima se for o caso.")),b("#extra-cantrips")&&(b("#extra-cantrips").onchange=e=>a.save({"build.extraCantrips":Math.max(0,Number(e.target.value)||0)})),b("#extra-spells")&&(b("#extra-spells").onchange=e=>a.save({"build.extraSpells":Math.max(0,Number(e.target.value)||0)})),b("#extra-invoc")&&(b("#extra-invoc").onchange=e=>a.save({"build.extraInvocations":Math.max(0,Number(e.target.value)||0)})),b("#extra-note")&&(b("#extra-note").oninput=e=>P("extranote",()=>a.save({"build.extraSpellsNote":e.target.value}))),t.querySelectorAll("[data-conc]").forEach(e=>e.onclick=()=>a.save({"state.concentration":s.state.concentration===e.dataset.conc?null:e.dataset.conc})),F(t,"spells")}const W={};function F(s,o){s.querySelectorAll("summary .addbtn").forEach(d=>d.addEventListener("click",t=>t.preventDefault()));const a=W[o]||(W[o]=new Set);s.querySelectorAll("details.entry").forEach((d,t)=>{var e;const i=d.dataset.k||((e=d.querySelector("summary .t"))==null?void 0:e.textContent)||t;a.has(i)&&(d.open=!0),d.addEventListener("toggle",()=>d.open?a.add(i):a.delete(i))})}function Ga(s,o,a,d){var v;const{cls:t,sub:i,level:e,classId:r,nomePersonalizado:n}=o;if(!t)return`<section class="card">Classe "${c(r)}" não encontrada no compêndio.</section>`;const h=n||t.nome,m=t.caracteristicas||[],g=m.filter(p=>p.nivel<=e),l=m.filter(p=>p.nivel>e),y=s.build.opcoes||[],k=r==="bruxo"?((v=a.spellCaps)==null?void 0:v.invocacoes)??null:null;return`
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Características de ${c(h)}</h2><span class="lvl-badge">nível ${e}</span></div>
    ${n?`<p class="empty-note" style="margin:0">Usa as regras de ${c(t.nome)}.</p>`:""}
    ${g.length?g.map(p=>j(c(p.nome),`Nível ${p.nivel}`,M(p.desc))).join(""):'<p class="empty-note">Importe o compêndio completo para ver as características.</p>'}
    ${l.length?`<details class="entry"><summary><span class="t muted">Próximos níveis (${l.length})</span></summary><div class="body stack">
      ${l.map(p=>j(c(p.nome),`Nível ${p.nivel}`,M(p.desc))).join("")}</div></details>`:""}
  </section>
  ${(t.opcoes||[]).map(p=>{const S=r==="bruxo"&&/Invoca/i.test(p.titulo),f=S?p.itens.filter(w=>y.includes(w.id)).length:null,E=S&&k!==null&&f>=k;return`<section class="card stack"><div class="sectiontitle"><h2 style="margin:0">${c(p.titulo.replace("Opções de ",""))} (${c(h)})</h2>${S&&k!==null?`<span class="lvl-badge">${f}/${k}</span>`:""}</div>
    ${p.itens.filter(w=>y.includes(w.id)).map(w=>j("✓ "+c(w.nome),"",M(w.desc)+`<button class="btn small" data-unop="${w.id}">Remover</button>`)).join("")||'<p class="empty-note">Nenhuma escolhida.</p>'}
    <details class="entry"><summary><span class="t">Escolher ${c(p.titulo.replace("Opções de ","").toLowerCase())}</span><span class="lvl-badge">${p.itens.length}</span></summary><div class="body stack">
      ${p.itens.filter(w=>!y.includes(w.id)).map(w=>j(c(w.nome),"",M(w.desc),!1,`data-k="o-${r}-${w.id}"`,E?'<button class="btn small" data-opfull="1" aria-label="Limite de invocações atingido">+</button>':Z("data-op",w.id,"Escolher "+c(w.nome)))).join("")}
    </div></details></section>`}).join("")}
  <section class="card stack"><h2>Subclasse de ${c(h)}${i?": "+c(i.nome):""}</h2>
    ${i?(i.caracteristicas||[]).map(p=>j(`${p.nivel>e?"🔒 ":""}${c(p.nome)}`,`Nível ${p.nivel}`,M(p.desc))).join(""):`<p class="empty-note">${e<3?"A subclasse é escolhida no nível 3.":"Escolha a subclasse na aba Ficha (ou em Multiclasse, para uma classe secundária)."}</p>
         ${(t.subclasses||[]).map(p=>j(c(p.nome),"",M(p.intro))).join("")}`}
  </section>`}function Ka(s,o,a){const d=o.sp,t=o.bg,i=o.speciesLabel||(d==null?void 0:d.nome)||"espécie";return`
  ${o.classesInfo.map(e=>Ga(s,e,o)).join("")}
  <section class="card stack"><h2>Traços de ${c(i)}</h2>
    ${d&&i!==d.nome?`<p class="empty-note" style="margin:0">Usa as regras de ${c(d.nome)}.</p>`:""}
    <p class="empty-note">${c((d==null?void 0:d.tipo)||"")} · ${c((d==null?void 0:d.tamanho)||"")} · Deslocamento ${c((d==null?void 0:d.deslocamento)||"")}</p>
    ${((d==null?void 0:d.tracos)||[]).filter(e=>e.nome!=="Detalhes").map(e=>j(c(e.nome),"",M(e.desc))).join("")||'<p class="empty-note">Sem traços no compêndio.</p>'}
  </section>
  ${t?`<section class="card stack"><h2>Antecedente: ${c(t.nome)}</h2>
    <p style="margin:0;font-size:.92rem"><b>Atributos:</b> ${t.atributos.map(e=>$a[e]).join(", ")}<br>
    <b>Talento:</b> ${c(t.talento)}<br><b>Ferramenta:</b> ${c(t.ferramenta)}<br><b>Equipamento:</b> ${c(t.equipamento)}</p></section>`:""}
  ${s.build.customNote?`<section class="card stack"><h2>Notas da personalização</h2><p style="margin:0;white-space:pre-wrap">${c(s.build.customNote)}</p></section>`:""}`}function Wa(s,o,a){const d=a.app,t=s.build.opcoes||[];d.querySelectorAll("[data-op]").forEach(i=>i.onclick=()=>a.save({"build.opcoes":[...t,i.dataset.op]})),d.querySelectorAll("[data-unop]").forEach(i=>i.onclick=()=>a.save({"build.opcoes":t.filter(e=>e!==i.dataset.unop)})),d.querySelectorAll("[data-opfull]").forEach(i=>i.onclick=()=>C("Limite de invocações místicas atingido. Use a exceção manual na aba Magias se for o caso.")),F(d,"classe")}const Ya=["Origem","Geral","Estilo de Luta","Dádiva Épica"];function Ja(s,o,a){const d=a.S,t=d.comp,i=d.ui,e=s.build.feats||[],r=D(i.featQ);let n=t.feats.filter(m=>(m.repetivel||!e.some(g=>g.id===m.id))&&(i.featCat==="all"||m.categoria===i.featCat)&&(!r||D(m.nome).includes(r)||D(m.prereq).includes(r)));const h=n.length;return n=n.slice(0,L),`
  <section class="card stack"><h2>Meus talentos</h2>
    ${e.length?e.map((m,g)=>{const l=t.byId.feats[m.id];return j(c((l==null?void 0:l.nome)||m.id),c(m.origem||(l==null?void 0:l.categoria)||""),(l?`<p class="empty-note">${c(l.categoria)}${l.prereq?" · Pré-requisito: "+c(l.prereq):""}</p>${M(l.desc)}`:'<p class="empty-note">Talento fora do compêndio.</p>')+`<button class="btn small" data-unfeat="${g}">Remover</button>`)}).join(""):'<p class="empty-note">Nenhum talento. Seu antecedente concede um talento de Origem.</p>'}
  </section>
  <section class="card stack"><h2>Biblioteca de talentos</h2>
    <input id="featq" type="search" placeholder="Buscar talento…" value="${c(i.featQ)}" aria-label="Buscar talento" />
    <div class="filters">${["all",...Ya].map(m=>`<button data-fcat="${m}" aria-pressed="${i.featCat===m}">${m==="all"?"Todos":m}</button>`).join("")}</div>
    <p class="empty-note">${h} talento(s)${h>L?` — mostrando ${L}`:""}.</p>
    ${n.map(m=>j(c(m.nome),c(m.categoria),`${m.prereq?`<p class="empty-note">Pré-requisito: ${c(m.prereq)}</p>`:""}${M(m.desc)}`,!1,`data-k="f-${m.id}"`,Z("data-feat",m.id,"Adicionar "+c(m.nome)))).join("")}
    ${t.feats.length?"":'<p class="empty-note">Importe o compêndio completo para usar a biblioteca de talentos.</p>'}
  </section>`}function Xa(s,o,a){const d=a.S,t=a.app,i=s.build.feats||[];b("#featq").oninput=e=>{d.ui.featQ=e.target.value,P("fq",a.render,250)},t.querySelectorAll("[data-fcat]").forEach(e=>e.onclick=()=>{d.ui.featCat=e.dataset.fcat,a.render()}),t.querySelectorAll("[data-feat]").forEach(e=>e.onclick=()=>{a.save({"build.feats":[...i,{id:e.dataset.feat,origem:"Escolhido"}]}),a.toast("Talento adicionado. Aplique aumentos de atributo na aba Ficha, se houver.")}),t.querySelectorAll("[data-unfeat]").forEach(e=>e.onclick=()=>a.save({"build.feats":i.filter((r,n)=>n!==Number(e.dataset.unfeat))})),F(t,"feats")}function Za(s,o,a){const d=a.S,t=d.comp,i=d.ui,e=s.inventory||[],r=s.coins||{},n=D(i.itemQ),h=n.length>=2?t.items.filter(l=>D(l.nome).includes(n)).slice(0,25):[],m=Math.min(100,Math.round(o.weight/o.carry*100)),g=l=>l.tipo==="arma"?`${c(l.dano)} · ${c(l.propriedades)} · Maestria: ${c(l.maestria)}`:l.tipo==="armadura"?`CA ${c(l.ca)}${l.forca&&l.forca!=="—"?" · "+c(l.forca):""}${l.furtividade==="Desvantagem"?" · Desv. Furtividade":""}`:"";return`
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Bolsa de moedas</h2><span class="lvl-badge">≈ ${o.coinsGP.toLocaleString("pt-BR",{maximumFractionDigits:2})} PO</span></div>
    <div class="coins">${oa.map(([l,y,k])=>`<label class="coin coin-${l}"><span>${y}</span>
      <input type="number" inputmode="numeric" min="0" data-coin="${l}" value="${Number(r[l])||0}" aria-label="${k}" /></label>`).join("")}</div>
    <form class="row" id="coinop">
      <input id="coinamt" type="number" inputmode="numeric" min="1" placeholder="Qtd." style="width:5.5rem" aria-label="Quantidade" />
      <select id="coinkind" style="width:5.5rem" aria-label="Moeda">${oa.map(([l,y])=>`<option value="${l}" ${l==="po"?"selected":""}>${y}</option>`).join("")}</select>
      <button class="btn heal small" data-cop="+">Receber</button><button class="btn danger small" data-cop="-">Gastar</button>
    </form>
  </section>
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Inventário</h2><span class="lvl-badge">${o.weight.toLocaleString("pt-BR",{maximumFractionDigits:1})} / ${o.carry} kg</span></div>
    <div class="hpbar" aria-hidden="true"><div class="cur ${m>100?"low":m>75?"mid":""}" style="width:${m}%"></div></div>
    ${e.length?e.map(l=>{const y=l.itemId?t.byId.weapons[l.itemId]||t.byId.armor[l.itemId]||t.byId.gear[l.itemId]:null;return j(`${l.equipado?"🛡️ ":""}${c(l.nome)}${Number(l.qtd)>1?` <span class="muted">×${l.qtd}</span>`:""}`,c(l.peso||""),`${y?`<p class="empty-note">${g(y)}${y.custo?" · "+c(y.custo):""}</p>${y.desc?M(y.desc):""}`:""}
        <div class="row">
          <button class="btn small" data-qty="${l.uid}" data-d="-1">−</button><b>${l.qtd}</b><button class="btn small" data-qty="${l.uid}" data-d="1">+</button>
          <label class="chk"><input type="checkbox" data-equip="${l.uid}" ${l.equipado?"checked":""}> Equipado</label>
          <label class="chk"><input type="checkbox" data-attune="${l.uid}" ${l.sintonizado?"checked":""}> Sintonizado</label>
        </div>
        <input data-inote="${l.uid}" id="inote-${l.uid}" value="${c(l.notas||"")}" placeholder="Notas (cargas, efeitos…)" aria-label="Notas do item" />
        <button class="btn small danger" data-rmitem="${l.uid}">Remover item</button>`,!1,`data-k="i-${l.uid}"`)}).join(""):'<p class="empty-note">Inventário vazio.</p>'}
  </section>
  <section class="card stack"><h2>Adicionar item</h2>
    <input id="itemq" type="search" placeholder="Buscar armas, armaduras, equipamento… (2+ letras)" value="${c(i.itemQ)}" aria-label="Buscar item" />
    ${h.map(l=>`<div class="libitem"><div class="info"><b>${c(l.nome)}</b><small>${c(l.custo||"")}${l.peso?" · "+c(l.peso):""} ${g(l)?"· "+g(l):""}</small></div>
      <button class="btn small primary" data-additem="${l.id}">+</button></div>`).join("")}
    ${n.length>=2&&!h.length?'<p class="empty-note">Nada encontrado — use o item personalizado abaixo.</p>':""}
    <form class="row" id="custom">
      <input id="cname" class="grow" placeholder="Item personalizado" required style="width:auto" aria-label="Nome do item" />
      <input id="cweight" placeholder="kg" inputmode="decimal" style="width:4.5rem" aria-label="Peso em kg" />
      <button class="btn small">Adicionar</button>
    </form>
  </section>`}function ae(s,o,a){const d=a.S,t=a.app,i=d.comp,e=s.inventory||[],r={pc:0,pp:0,pe:0,po:0,pl:0,...s.coins||{}},n=m=>a.save({inventory:m});t.querySelectorAll("[data-coin]").forEach(m=>m.onchange=()=>a.save({coins:{...r,[m.dataset.coin]:Math.max(0,Number(m.value)||0)}})),t.querySelectorAll("[data-cop]").forEach(m=>m.onclick=g=>{g.preventDefault();const l=Number(b("#coinamt").value),y=b("#coinkind").value;if(!l)return a.toast("Digite a quantidade.");const k=r[y]+(m.dataset.cop==="+"?l:-l);if(k<0)return a.toast(`Não há ${l} ${y.toUpperCase()} suficientes.`);a.save({coins:{...r,[y]:k}})}),b("#itemq").oninput=m=>{d.ui.itemQ=m.target.value,P("iq",a.render,250)},t.querySelectorAll("[data-additem]").forEach(m=>m.onclick=()=>{const g=i.items.find(y=>y.id===m.dataset.additem),l=e.find(y=>y.itemId===g.id);n(l?e.map(y=>y===l?{...y,qtd:Number(y.qtd)+1}:y):[...e,{uid:ua(),itemId:g.id,nome:g.nome,qtd:1,peso:g.peso||"",equipado:!1,sintonizado:!1,notas:""}]),a.toast(`${g.nome} adicionado.`)}),b("#custom").onsubmit=m=>{m.preventDefault();const g=b("#cweight").value.trim();n([...e,{uid:ua(),itemId:null,nome:b("#cname").value.trim(),qtd:1,peso:g?`${g} kg`:"",equipado:!1,sintonizado:!1,notas:""}])};const h=(m,g)=>n(e.map(l=>l.uid===m?g(l):l));t.querySelectorAll("[data-qty]").forEach(m=>m.onclick=()=>h(m.dataset.qty,g=>({...g,qtd:Math.max(0,Number(g.qtd)+Number(m.dataset.d))}))),t.querySelectorAll("[data-equip]").forEach(m=>m.onchange=()=>h(m.dataset.equip,g=>({...g,equipado:m.checked}))),t.querySelectorAll("[data-attune]").forEach(m=>m.onchange=()=>{if(m.checked&&e.filter(g=>g.sintonizado).length>=3)return m.checked=!1,a.toast("Limite de 3 itens sintonizados.");h(m.dataset.attune,g=>({...g,sintonizado:m.checked}))}),t.querySelectorAll("[data-inote]").forEach(m=>m.oninput=()=>P("in"+m.dataset.inote,()=>h(m.dataset.inote,g=>({...g,notas:m.value})))),t.querySelectorAll("[data-rmitem]").forEach(m=>m.onclick=()=>n(e.filter(g=>g.uid!==m.dataset.rmitem))),F(t,"itens")}const ee={ficha:{html:Fa,bind:Ua},magias:{html:Qa,bind:_a},classe:{html:Ka,bind:Wa},talentos:{html:Ja,bind:Xa},itens:{html:Za,bind:ae}},A=b("#app"),$={be:null,comp:null,user:null,chId:null,ch:null,tab:"combate",amount:"",off:[],prevHp:null,ui:{spellQ:"",spellLvl:"all",spellMine:!0,featQ:"",featCat:"all",itemQ:"",libOpen:{}}};function Y(s){if(!$.ch||!s)return;const o=structuredClone($.ch);Object.entries(s).forEach(([a,d])=>Ha(o,a,d)),$.ch=o,O()}const aa=()=>`rpgmesa:last:${$.user.uid}`,U=()=>{$.off.forEach(s=>s()),$.off=[]},pa=Object.fromEntries(Na.map(([s,o])=>[s,o])),J=Object.fromEntries(z);se().catch(s=>{A.innerHTML=`<div class="wrap"><div class="card">Erro ao iniciar: ${c(s.message)}</div></div>`});async function se(){$.be=await ja(),Ma($.be,A,{title:"Grimório do Aventureiro",subtitle:"Entre com sua conta para acessar seus personagens em qualquer aparelho.",onSignedOut:()=>{U(),$.ch=null,$.chId=null,$.prevHp=null}},async s=>{$.user=s,A.innerHTML='<p class="muted" style="padding:1rem">Carregando compêndio…</p>',$.comp=await Pa($.be);const o=X.get(aa());o?ea(o):H()})}const ha=()=>$.be.mode==="local"?'<p class="banner">Modo demo: os dados ficam neste navegador. Abra o Escudo em outra aba para testar a sincronização.</p>':"",te=()=>$.comp.completo?"":'<p class="banner">Biblioteca reduzida: o Mestre ainda não importou o compêndio completo no Escudo.</p>';function H(){U(),$.chId=null,$.ch=null,X.set(aa(),null);let s=!1;$.off.push($.be.watchMyCharacters(o=>{b("#build")||(o.sort((a,d)=>a.name.localeCompare(d.name)),A.innerHTML=`<header class="top"><div class="row"><div class="grow name">Meus personagens</div>
      <a class="btn small" href="./escudo.html" title="Ir para o Escudo do Mestre">🛡️ Escudo</a>${ba($.user)}</div></header>
    <main class="wrap stack">${ha()}${te()}
      ${o.map(a=>`<button class="charbtn" data-open="${a.id}">
        <span><b>${c(a.name)}</b><br><small class="muted">${c(fa(a))}</small></span>
        <span class="chip">${a.campaignName?"🎲 "+c(a.campaignName):"Sem mesa"}</span></button>`).join("")}
      ${o.length?"":'<div class="card"><p style="margin:0">Você ainda não tem personagens. Crie o primeiro abaixo — ele fica salvo na sua conta.</p></div>'}
      <button class="btn primary" id="newchar" style="width:100%">+ Novo personagem</button>
    </main>`,va($.be,A),A.querySelectorAll("[data-open]").forEach(a=>a.onclick=()=>ea(a.dataset.open)),b("#newchar").onclick=()=>le(),!o.length&&!s&&(s=!0))}))}function le(){U();const s=$.comp,o=[15,14,13,12,10,8];A.innerHTML=`<header class="top"><div class="row"><button class="btn small" id="back" aria-label="Voltar">◀</button><div class="grow name">Novo personagem</div></div></header>
  <main class="wrap stack">
  <form class="stack" id="build">
    <section class="card stack">
      <div><label for="name">Nome</label><input id="name" name="name" required maxlength="40" /></div>
      <div class="row">
        <div class="grow"><label for="species">Espécie</label><select id="species" name="species">
          ${s.species.map(v=>`<option value="${v.id}">${c(v.nome)}</option>`).join("")}</select></div>
        <div style="width:5.5rem"><label for="level">Nível</label><input id="level" name="level" type="number" inputmode="numeric" min="1" max="20" value="1" /></div>
      </div>
      <div><label for="speciesnome">Nome personalizado da espécie (opcional)</label>
        <input id="speciesnome" name="speciesnome" maxlength="60" placeholder="Ex.: Genasi da Terra" /></div>
      <div><label for="class">Classe</label><select id="class" name="class">
        ${s.classes.map(v=>`<option value="${v.id}">${c(v.nome)}</option>`).join("")}</select></div>
      <div><label for="classnome">Nome personalizado da classe (opcional)</label>
        <input id="classnome" name="classnome" maxlength="60" placeholder="Ex.: Arcanista" /></div>
      <p class="muted" style="margin:0;font-size:.85rem">Pra usar uma espécie ou classe alternativa/homebrew que não está na lista, escolha acima a mais parecida em regras — é dela que vêm os números — e dê um nome personalizado aqui, que aparece no lugar do nome oficial em toda a ficha.</p>
      <div><label for="customnote">Notas da personalização (opcional)</label>
        <textarea id="customnote" name="customnote" rows="2" placeholder="O que muda nessa versão (aparência, traços trocados…)"></textarea></div>
      <div id="classinfo"></div>
    </section>
    ${s.backgrounds.length?`<section class="card stack">
      <div><label for="bg">Antecedente</label><select id="bg" name="bg">
        ${s.backgrounds.map(v=>`<option value="${v.id}">${c(v.nome)}</option>`).join("")}</select></div>
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
  </form></main>`,b("#back").onclick=H;const a=b("#build"),d=()=>s.byId.classes[a.class.value],t=()=>{var v,p;return(p=s.byId.backgrounds)==null?void 0:p[(v=a.bg)==null?void 0:v.value]};function i(){var S;const v=d(),p=(S=v.periciasOpcoes)!=null&&S.length?v.periciasOpcoes:[];b("#classinfo").innerHTML=`
      <p class="muted" style="margin:.2rem 0;font-size:.88rem">Dado de Vida d${v.dadoVida} · Salvaguardas: ${(v.salvaguardas||[]).map(f=>J[f]).join(", ")}</p>
      ${p.length?`<div><label>Perícias da classe — escolha ${v.periciasEscolha} <span id="skcount"></span></label>
        <div class="checks">${p.map(f=>`<label class="chk"><input type="checkbox" name="sk" value="${f}"> ${pa[f]}</label>`).join("")}</div></div>`:""}`,a.querySelectorAll("[name=sk]").forEach(f=>f.onchange=e),e()}function e(){var E;const v=d(),p=((E=t())==null?void 0:E.pericias)||[],S=[...a.querySelectorAll("[name=sk]")];S.forEach(w=>{p.includes(w.value)&&(w.checked=!1,w.disabled=!0,w.parentElement.title="Já vem do antecedente")});const f=S.filter(w=>w.checked).length;S.forEach(w=>{p.includes(w.value)||(w.disabled=!w.checked&&f>=v.periciasEscolha)}),b("#skcount")&&(b("#skcount").textContent=`(${f}/${v.periciasEscolha})`)}function r(){const v=t();if(!v)return;const p=s.byId.feats[v.talentoId];b("#bginfo").innerHTML=`
      <p style="margin:.2rem 0;font-size:.9rem"><b>Perícias:</b> ${v.pericias.map(S=>pa[S]).join(", ")}<br>
      <b>Talento:</b> ${c((p==null?void 0:p.nome)||v.talento)}<br><b>Ferramenta:</b> ${c(v.ferramenta)}</p>
      <div class="row">
        <div class="grow"><label for="plus2">+2 em</label><select id="plus2">${v.atributos.map(S=>`<option value="${S}">${J[S]}</option>`).join("")}<option value="all">+1 nos três</option></select></div>
        <div class="grow" id="plus1wrap"><label for="plus1">+1 em</label><select id="plus1">${v.atributos.map((S,f)=>`<option value="${S}" ${f===1?"selected":""}>${J[S]}</option>`).join("")}</select></div>
      </div>
      <details class="entry"><summary><span class="t">Equipamento do antecedente</span></summary><div class="body">${c(v.equipamento)}</div></details>`,b("#plus2").onchange=b("#plus1").onchange=h,h(),e()}function n(){const v=t(),p={};if(!v)return p;const S=b("#plus2").value;if(S==="all")v.atributos.forEach(f=>p[f]=1);else{p[S]=2;const f=b("#plus1").value;f!==S&&(p[f]=(p[f]||0)+1)}return p}function h(){const v=n();b("#plus1wrap")&&(b("#plus1wrap").style.visibility=b("#plus2").value==="all"?"hidden":""),a.querySelectorAll(".abfinal").forEach(p=>{const S=p.dataset.ab,f=Math.min(20,Number(a[S].value)+(v[S]||0));p.textContent=v[S]?`→ ${f} (${N(ra(f))})`:`(${N(ra(f))})`})}const m=27,g={8:0,9:1,10:2,11:3,12:4,13:5,14:7,15:9},l=v=>g[v]??0;let y="array";function k(){const v=y==="buy";if(b("#ab-inputs").innerHTML=z.map(([p,S],f)=>{const E=document.getElementById("ab-"+p),w=E?E.value:v?8:o[f];return`<div><label for="ab-${p}">${S} <b class="abfinal" data-ab="${p}"></b></label>
        <div class="row" style="align-items:center;gap:.4rem;flex-wrap:nowrap">
          ${v?`<button type="button" class="btn small" data-abdown="${p}" aria-label="Diminuir ${S}">−</button>`:""}
          <input id="ab-${p}" name="${p}" type="number" inputmode="numeric" min="${v?8:3}" max="${v?15:20}"
            value="${w}" ${v?'readonly style="width:3.5rem;text-align:center"':""} />
          ${v?`<button type="button" class="btn small" data-abup="${p}" aria-label="Aumentar ${S}">+</button>`:""}
        </div></div>`}).join(""),v){const p=z.reduce((f,[E])=>f+l(Number(a[E].value)),0),S=m-p;b("#abpts").style.display="",b("#abpts").textContent=`${S} de ${m} pontos restantes`,a.querySelectorAll("[data-abup]").forEach(f=>f.onclick=()=>{const E=f.dataset.abup,w=Number(a[E].value);if(!(w>=15)){if(p+(l(w+1)-l(w))>m)return C("Sem pontos suficientes.");a[E].value=w+1,k()}}),a.querySelectorAll("[data-abdown]").forEach(f=>f.onclick=()=>{const E=f.dataset.abdown,w=Number(a[E].value);w<=8||(a[E].value=w-1,k())})}else b("#abpts").style.display="none",z.forEach(([p])=>a[p].oninput=h);h()}A.querySelectorAll("[data-abmode]").forEach(v=>v.onclick=()=>{v.dataset.abmode!==y&&(y=v.dataset.abmode,A.querySelectorAll("[data-abmode]").forEach(p=>p.setAttribute("aria-selected",String(p.dataset.abmode===y))),b("#abmode-help").textContent=y==="buy"?`Compra de pontos: comece com 8 em tudo e gaste os ${m} pontos (custo 9=1, 10=2, 11=3, 12=4, 13=5, 14=7, 15=9). Máximo 15 antes dos bônus do antecedente.`:"Valores base (Array Padrão: 15, 14, 13, 12, 10, 8). Edite livremente, se preferir. O bônus do antecedente é somado automaticamente.",z.forEach(([p],S)=>{const f=document.getElementById("ab-"+p);f&&(f.value=y==="buy"?8:o[S])}),k())}),a.class.onchange=i,a.bg&&(a.bg.onchange=r),i(),r(),k(),a.onsubmit=async v=>{var E;v.preventDefault();const p=n(),S=Object.fromEntries(z.map(([w])=>[w,Math.min(20,Number(a[w].value)+(p[w]||0))])),f=xa({name:a.name.value.trim(),ownerUid:$.user.uid,speciesId:a.species.value,classId:a.class.value,level:Number(a.level.value),abilities:S,backgroundId:((E=a.bg)==null?void 0:E.value)||null,skillProfs:[...a.querySelectorAll("[name=sk]:checked")].map(w=>w.value),speciesNomePersonalizado:a.speciesnome.value.trim()||null,classNomePersonalizado:a.classnome.value.trim()||null,customNote:a.customnote.value.trim()},s);try{ea(await $.be.createCharacter(f))}catch(w){C(w.message)}}}const fa=s=>`${Ta(s.build,$.comp)} · ${za(s.build,$.comp)}`;function ea(s){U(),$.chId=s,$.prevHp=null,X.set(aa(),s),$.off.push($.be.watchCharacter(s,o=>{if(!o)return H();const a=$.prevHp;if($.prevHp=o.state.hp.current+o.state.hp.temp,$.ch=o,O(),a!=null&&a!==$.prevHp){const d=b("#hpcard");d==null||d.classList.add($.prevHp<a?"flash-dmg":"flash-heal"),navigator.vibrate&&$.prevHp<a&&navigator.vibrate(80)}}))}const ne=[["combate","❤️","Combate"],["ficha","📜","Ficha"],["magias","✨","Magias"],["classe","🛡️","Traços"],["talentos","⭐","Talentos"],["itens","🎒","Itens"]],T={get S(){return $},app:A,render:()=>O(),save:s=>$.be.updateCharacter($.chId,s).catch(o=>C(o.message)),toast:C,showHome:()=>H(),confirmTwice:oe,accountChip:ba,bindLogout:va};function O(){if(Da(O))return;const s=$.ch,o=Ba(s,$.comp),a=document.activeElement,d=a==null?void 0:a.id,t=a&&"selectionStart"in a?[a.selectionStart,a.selectionEnd]:null,i=window.scrollY,e={combate:{html:ce,bind:re},...ee},r=e[$.tab]||e.combate;if(A.innerHTML=`
    <header class="top">
      <div class="row"><button class="btn small" id="home" aria-label="Meus personagens">◀</button>
        <div class="grow"><div class="name">${c(s.name)}</div>
        <div class="mini"><span>${c(fa(s))}</span>${s.campaignName?`<span>🎲 ${c(s.campaignName)}</span>`:""}</div></div>
        <div class="mini"><span>CA <b>${s.build.ac??10}</b></span><span>PV <b>${s.state.hp.current}/${s.state.hp.max}</b></span></div>
        <a class="btn small" href="./escudo.html" title="Ir para o Escudo do Mestre">🛡️</a></div>
    </header>
    <main class="wrap stack">${ha()}${r.html(s,o,T)}</main>
    <nav class="tabs" role="tablist">${ne.map(([n,h,m])=>`<button role="tab" aria-selected="${$.tab===n}" data-tab="${n}"><span class="ico" aria-hidden="true">${h}</span>${m}</button>`).join("")}</nav>`,A.querySelectorAll("[data-tab]").forEach(n=>n.onclick=()=>{$.tab=n.dataset.tab,O(),window.scrollTo(0,0)}),b("#home").onclick=H,r.bind(s,o,T),window.scrollTo(0,i),d){const n=document.getElementById(d);if(n&&(n.focus({preventScroll:!0}),t&&"setSelectionRange"in n))try{n.setSelectionRange(...t)}catch{}}}function oe(s,o){const a=b(s);if(a.dataset.armed)return!0;a.dataset.armed="1";const d=a.textContent;return a.textContent=o,setTimeout(()=>{a.isConnected&&(delete a.dataset.armed,a.textContent=d)},3e3),!1}function ie(s,o,a){const d=(s.inventory||[]).filter(e=>{var r,n;return e.itemId&&((n=(r=o.byId)==null?void 0:r.weapons)==null?void 0:n[e.itemId])}).map(e=>({it:e,w:o.byId.weapons[e.itemId]}));if(!d.length)return`<section class="card stack"><h2>Ataques</h2>
      <p class="muted" style="margin:0">Nenhuma arma no inventário — desarmado: <b>${N(a.pb+a.mods.for)}</b> pra acertar, <b>1${N(a.mods.for)}</b> de dano contundente.</p></section>`;const t=Object.fromEntries(Oa(s,o,a).map(e=>[e.uid,e])),i=d.some(({it:e})=>e.equipado);return`<section class="card stack"><h2>Ataques</h2>
    ${d.map(({it:e,w:r})=>{const n=t[e.uid];return`<div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem">
        <span>${e.equipado?"⚔️ ":""}${c(e.nome||r.nome)}${n?` — <b>${N(n.atk)}</b> pra acertar · <b>${c(n.dice)}${n.dmgBonus?N(n.dmgBonus):""}</b> ${c(n.dmgType)}${n.maestria?` <span class="muted">(${c(n.maestria)})</span>`:""}`:""}</span>
        <button class="btn small ${e.equipado?"":"primary"}" data-swapweapon="${e.uid}">${e.equipado?"Guardar":"Empunhar"}</button>
      </div>`}).join("")}
    ${i?"":`<p class="muted" style="margin:0">Nenhuma arma empunhada — desarmado: <b>${N(a.pb+a.mods.for)}</b> pra acertar, <b>1${N(a.mods.for)}</b> de dano contundente.</p>`}
    <p class="muted" style="margin:0;font-size:.8rem">Toque em "Empunhar"/"Guardar" pra trocar de arma. Bônus de ataque = Proficiência + atributo; dano = dado da arma + atributo.</p>
  </section>`}function ce(s,o){const{hp:a,deathSaves:d={success:0,fail:0},conditions:t=[],dead:i}=s.state,e=a.max+a.temp,r=Math.round(a.current/e*100),n=Math.round(a.temp/e*100),h=a.current/a.max>.5?"":a.current/a.max>.25?"mid":"low",m=a.current===0&&!i,g=s.state.concentration?$.comp.byId.spells[s.state.concentration]:null;return`
  <section class="card stack" id="hpcard">
    <div class="hp-big"><div class="num">${a.current}<small> / ${a.max}</small></div>
      ${a.temp?`<div class="tmpv">+${a.temp} temporários</div>`:""}
      ${i?'<div class="chip bad" style="margin-top:.4rem">MORTO</div>':""}</div>
    <div class="hpbar" aria-hidden="true"><div class="cur ${h}" style="width:${r}%"></div><div class="tmp" style="width:${n}%"></div></div>
    <input id="amount" class="amount" type="number" inputmode="numeric" min="0" placeholder="0" value="${c($.amount)}" aria-label="Valor" />
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
    <div><b>${s.build.ac??10}</b><small>CA</small></div>
    <div><b>${N(o.initiative)}</b><small>Iniciativa</small></div>
    <div><b>${c(o.speed.replace(" metros"," m"))}</b><small>Deslocamento</small></div>
    <div><b>${o.passivePerception}</b><small>Perc. passiva</small></div>
  </div></section>
  ${ie(s,$.comp,o)}
  ${g?`<p class="banner">Concentrando em: <b>${c(g.nome)}</b> <button class="btn small" id="endconc" style="margin-left:.5rem">Encerrar</button></p>`:""}
  ${m?`<section class="card stack"><h2>Testes contra a morte</h2>
    <div class="saves"><div><small class="muted">Sucessos</small><div class="pips">${[0,1,2].map(l=>`<span class="pip ${l<d.success?"s":""}"></span>`).join("")}</div></div>
      <div><small class="muted">Falhas</small><div class="pips">${[0,1,2].map(l=>`<span class="pip ${l<d.fail?"f":""}"></span>`).join("")}</div></div></div>
    <button class="btn primary" id="roll-death" style="width:100%">Rolar d20</button></section>`:""}
  <section class="card stack"><h2>Condições</h2>
    <div class="row">${t.map(l=>`<button class="chip bad" data-rmcond="${l}" aria-label="Remover ${l}">${ca[l]||l} ✕</button>`).join("")||'<span class="muted">Nenhuma</span>'}</div>
    <div class="row"><select id="addcond" class="grow" aria-label="Adicionar condição"><option value="">Adicionar condição…</option>
      ${La.filter(l=>!t.includes(l)).map(l=>`<option value="${l}">${ca[l]||l}</option>`).join("")}</select></div>
  </section>
  <section class="card stack"><h2>Descanso</h2>
    ${(s.state.hitDice.byClass||[]).length>1?s.state.hitDice.byClass.map(l=>{const y=$.comp.byId.classes[l.classId];return`<div class="row" style="justify-content:space-between"><span class="muted">${c((y==null?void 0:y.nome)||l.classId)}: ${l.max-l.used}/${l.max} (d${l.die})</span>
            <button class="btn small" data-shortclass="${l.classId}">Gastar</button></div>`}).join(""):`<p class="muted" style="margin:0">Dados de Vida: ${s.state.hitDice.max-s.state.hitDice.used}/${s.state.hitDice.max} (d${s.state.hitDice.die})</p>
         <div class="row"><button class="btn grow" id="short">Gastar 1 Dado de Vida</button></div>`}
    <div class="row"><button class="btn grow" id="long">Descanso Longo</button></div>
  </section>
  <section class="card"><h2>Registro</h2><ul class="log">${(s.state.log||[]).map(l=>`<li>${c(l)}</li>`).join("")||"<li>—</li>"}</ul></section>`}function re(s,o){A.querySelectorAll("[data-swapweapon]").forEach(t=>t.onclick=()=>{const i=s.inventory||[],e=i.find(n=>n.uid===t.dataset.swapweapon),r=!e.equipado;T.save({inventory:i.map(n=>n.uid===e.uid?{...n,equipado:r}:n)}),C(`${e.nome} ${r?"empunhada":"guardada"}.`)});const a=b("#amount");a.oninput=()=>$.amount=a.value,A.querySelectorAll("[data-q]").forEach(t=>t.onclick=()=>{$.amount=t.dataset.q==="C"?"":String((Number($.amount)||0)+Number(t.dataset.q)),a.value=$.amount}),A.querySelectorAll("[data-act]").forEach(t=>t.onclick=async()=>{const i=Number($.amount);if(!i)return C("Digite um valor.");const e={resistant:b("#o-res").checked,vulnerable:b("#o-vul").checked,critical:b("#o-crit").checked};$.amount="";const r=await K($.be,$.chId,t.dataset.act,i,e,s.name);Y(r.patch),r.concentrationDC&&s.state.concentration?C(`Teste de Concentração: CD ${r.concentrationDC}`):r.log.length&&C(r.log.at(-1))}),b("#endconc")&&(b("#endconc").onclick=()=>T.save({"state.concentration":null})),b("#roll-death")&&(b("#roll-death").onclick=async()=>{const t=da("1d20").total,i=await K($.be,$.chId,"morte",t,{},s.name);Y(i.patch),C(`d20 = ${t}. ${i.log.at(-1)??""}`)}),A.querySelectorAll("[data-rmcond]").forEach(t=>t.onclick=()=>T.save({"state.conditions":s.state.conditions.filter(i=>i!==t.dataset.rmcond)})),b("#addcond").onchange=t=>t.target.value&&T.save({"state.conditions":[...s.state.conditions,t.target.value]});const d=async(t,i)=>{const e=da(`1d${t}`).total+o.mods.con;await i();const r=await K($.be,$.chId,"cura",Math.max(0,e),{},s.name);Y(r.patch),C(`Dado de Vida: ${e}. ${r.log[0]??""}`)};b("#short")&&(b("#short").onclick=()=>{const t=s.state.hitDice;if(t.used>=t.max)return C("Sem Dados de Vida disponíveis.");d(t.die,()=>T.save({"state.hitDice.used":t.used+1}))}),A.querySelectorAll("[data-shortclass]").forEach(t=>t.onclick=()=>{const i=s.state.hitDice.byClass,e=i.findIndex(h=>h.classId===t.dataset.shortclass),r=i[e];if(r.used>=r.max)return C("Sem Dados de Vida dessa classe.");const n=i.map((h,m)=>m===e?{...h,used:h.used+1}:h);d(r.die,()=>T.save({"state.hitDice.byClass":n,"state.hitDice.used":n.reduce((h,m)=>h+m.used,0)}))}),b("#long").onclick=async()=>{const t=Object.fromEntries(Object.entries(s.state.spellSlots||{}).map(([r,n])=>[r,{...n,used:0}])),i=Object.fromEntries(Object.entries(s.state.pactSlots||{}).map(([r,n])=>[r,{...n,used:0}])),e=(s.state.hitDice.byClass||[]).map(r=>({...r,used:0}));await T.save({"state.hp":{...s.state.hp,current:s.state.hp.max,temp:0},"state.spellSlots":t,"state.pactSlots":i,"state.hitDice":{...s.state.hitDice,byClass:e,used:0},"state.deathSaves":{success:0,fail:0},"state.conditions":s.state.conditions.filter(r=>!["inconsciente","estabilizado"].includes(r))}),C("Descanso longo concluído.")}}
