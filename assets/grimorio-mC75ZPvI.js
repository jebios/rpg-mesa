import"./pwa-Bz0sy_w8.js";import{e as c,A as z,$ as b,m as la,t as C,h as N,n as K,o as Aa,q as ia,w as Ea,x as Ca,y as Ia,S as Na,g as ja,r as Pa,l as Ma,s as Z,a as ba,b as va,z as xa,B as Ta,f as za,c as Da,d as Ba,C as ca,i as La,j as W,D as Oa,k as Ha,E as ra}from"./auth-BweszVwO.js";function da(s){const n=String(s).replace(/\s/g,"").match(/^(\d*)d(\d+)([+-]\d+)?$/i);if(!n)return null;const a=Number(n[1]||1),r=Number(n[2]),t=Number(n[3]||0),l=Array.from({length:a},()=>1+Math.floor(Math.random()*r));return{rolls:l,bonus:t,total:l.reduce((e,i)=>e+i,0)+t}}const B=s=>c(s).replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>").replace(/(^|\s)_([^_]+)_(?=\s|$|[.,;:])/g,"$1<i>$2</i>");function P(s){if(!s)return"";const n=[];for(const a of String(s).split(/\n\n+/)){const r=a.split(`
`);if(r.every(t=>t.startsWith("| "))){n.push('<div class="mdtable"><table>'+r.map(t=>"<tr>"+t.slice(2).split(" | ").map(l=>`<td>${B(l)}</td>`).join("")+"</tr>").join("")+"</table></div>");continue}for(const t of r)t.startsWith("#### ")?n.push(`<h5>${B(t.slice(5))}</h5>`):t.startsWith("### ")?n.push(`<h4>${B(t.slice(4))}</h4>`):t.startsWith("| ")?n.push('<div class="mdtable"><table><tr>'+t.slice(2).split(" | ").map(l=>`<td>${B(l)}</td>`).join("")+"</tr></table></div>"):t.startsWith("• ")?n.push(`<p class="bullet">${B(t)}</p>`):n.push(`<p>${B(t)}</p>`)}return`<div class="md">${n.join("")}</div>`}const D=s=>String(s||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(),$a=Object.fromEntries(z),L=40,U=s=>s===0?"Truque":`${s}º círculo`,ua=()=>Math.random().toString(36).slice(2,9),j=(s,n,a,r=!1,t="",l="")=>`<details class="entry" ${r?"open":""} ${t}><summary><span class="t">${s}</span><span class="row" style="gap:.4rem;flex-wrap:nowrap"><span class="lvl-badge">${n||""}</span>${l}</span></summary><div class="body">${a}</div></details>`,aa=(s,n,a="Adicionar")=>`<button class="btn small primary addbtn" ${s}="${n}" aria-label="${a}">+</button>`;function Va(s,n,a){const r=a.S,t=r.comp,l=new Set(s.build.classes.map(o=>o.classId)),e=t.classes.filter(o=>!l.has(o.id)),i=n.classesInfo.slice(1);return`
  <section class="card stack"><h2>Multiclasse</h2>
    <p class="empty-note" style="margin:0">Nível total: ${n.level}/20. Ao multiclassar, confira na aba Traços quais proficiências a nova classe concede (são menos do que na criação) e ajuste "Treinamento e Proficiências" à mão, se precisar.</p>
    ${i.length?i.map(o=>{var u,w,v,q,k;const g=((u=o.cls)==null?void 0:u.subclasses)||[];return`<div class="row" style="flex-wrap:wrap;gap:.5rem;border-top:1px solid var(--border,#3332);padding-top:.5rem">
        <b class="grow">${c(((w=o.cls)==null?void 0:w.nome)||o.classId)}</b>
        <div class="row" style="gap:.3rem"><button class="btn small" data-mcdown="${o.classId}" aria-label="Diminuir nível de ${c(((v=o.cls)==null?void 0:v.nome)||o.classId)}">−</button>
          <span style="min-width:1.4rem;text-align:center">${o.level}</span>
          <button class="btn small" data-mcup="${o.classId}" aria-label="Subir nível de ${c(((q=o.cls)==null?void 0:q.nome)||o.classId)}">+</button></div>
        ${g.length?`<select data-mcsub="${o.classId}" aria-label="Subclasse de ${c(((k=o.cls)==null?void 0:k.nome)||o.classId)}" ${o.level<3?"disabled":""}>
          <option value="">—</option>${g.map(h=>`<option value="${h.id}" ${h.id===o.subclassId?"selected":""}>${c(h.nome)}</option>`).join("")}</select>`:""}
        <button class="btn small danger" data-mcrm="${o.classId}">Remover</button>
      </div>`}).join(""):'<p class="empty-note">Personagem de classe única.</p>'}
    ${e.length&&n.level<20?`<form class="row" id="addclass">
      <select id="mcnew" class="grow" aria-label="Nova classe">${e.map(o=>`<option value="${o.id}">${c(o.nome)}</option>`).join("")}</select>
      <button class="btn primary small">+ Adicionar classe</button></form>`:""}
  </section>`}function Ra(s,n,a){const r=a.S,t=a.app;t.querySelectorAll("[data-mcup]").forEach(l=>l.onclick=()=>{const e=s.build.classes.find(i=>i.classId===l.dataset.mcup);a.save(ia(s,r.comp,l.dataset.mcup,e.level+1))}),t.querySelectorAll("[data-mcdown]").forEach(l=>l.onclick=()=>{const e=s.build.classes.find(i=>i.classId===l.dataset.mcdown);if(e.level<=1)return a.toast('Nível mínimo 1 — use "Remover" para tirar a classe.');a.save(ia(s,r.comp,l.dataset.mcdown,e.level-1))}),t.querySelectorAll("[data-mcsub]").forEach(l=>l.onchange=()=>a.save(Ea(s,r.comp,l.dataset.mcsub,l.value||null))),t.querySelectorAll("[data-mcrm]").forEach(l=>l.onclick=()=>{if(!a.confirmTwice(`[data-mcrm="${l.dataset.mcrm}"]`,"Toque de novo para remover"))return;const e=Ca(s,r.comp,l.dataset.mcrm);e&&a.save(e)}),b("#addclass")&&(b("#addclass").onsubmit=l=>{l.preventDefault();const e=Ia(s,r.comp,b("#mcnew").value);e&&(a.save(e),a.toast("Classe adicionada no nível 1."))})}function Ua(s,n,a){var o,g,u,w,v,q;const r=a.S,t=s.build.classes[0].level,l=s.build.classes[0],e=((o=n.cls)==null?void 0:o.subclasses)||[],i=s.build.training||{};return`
  <section class="card stack">
    <div class="sectiontitle"><h2 style="margin:0">${n.multiclass?`${c(l.nomePersonalizado||((g=n.cls)==null?void 0:g.nome)||"")} ${t}`:`Nível ${t}`}</h2>
      <div class="row"><button class="btn small" id="lvldown" aria-label="Diminuir nível">−</button><button class="btn small primary" id="lvlup" aria-label="Subir de nível">+ Nível</button></div></div>
    ${n.multiclass?`<p class="empty-note" style="margin:0">Classe principal (foi ela que deu o 1º dado de vida cheio). Nível total do personagem: ${n.level}.</p>`:""}
    ${e.length?`<div><label for="subclass">Subclasse${t<3?" (a partir do nível 3)":""}</label>
      <select id="subclass" ${t<3?"disabled":""}><option value="">—</option>${e.map(k=>`<option value="${k.id}" ${k.id===l.subclassId?"selected":""}>${c(k.nome)}</option>`).join("")}</select></div>`:""}
    <div class="stats">
      <div><b>${N(n.pb)}</b><small>Proficiência</small></div>
      <div><b>${N(n.initiative)}</b><small>Iniciativa</small></div>
      <div><b>${c(n.speed.replace(" metros"," m"))}</b><small>Deslocamento</small></div>
      <div><b>${n.passivePerception}</b><small>Perc. passiva</small></div>
    </div>
    <div class="row"><label for="ac" style="margin:0">Classe de Armadura</label>
      <input id="ac" type="number" inputmode="numeric" style="width:6rem" value="${s.build.ac??10}" /></div>
    <div class="row"><label for="hpmax" style="margin:0">PV Máximo</label>
      <input id="hpmax" type="number" inputmode="numeric" min="1" style="width:6rem" value="${s.state.hp.max}" /></div>
    <p class="empty-note" style="margin:0">O PV máximo pode ser ajustado à mão — use o valor rolado no dado com o Mestre. Ao subir de nível, o app só soma o ganho médio da regra a esse valor.</p>
  </section>

  ${Va(s,n,a)}

  <section class="card stack"><h2>Personalização de espécie/classe</h2>
    <p class="empty-note" style="margin:0">Pra jogar uma espécie ou classe alternativa/homebrew, dê um nome personalizado aqui — os números continuam vindo da opção escolhida na criação (${c(((u=n.sp)==null?void 0:u.nome)||"")} / ${c(((w=n.cls)==null?void 0:w.nome)||"")}).</p>
    <div class="row">
      <div class="grow"><label for="pz-sp">Nome da espécie</label>
        <input id="pz-sp" maxlength="60" placeholder="${c(((v=n.sp)==null?void 0:v.nome)||"")}" value="${c(s.build.speciesNomePersonalizado||"")}" /></div>
      <div class="grow"><label for="pz-cl">Nome da classe</label>
        <input id="pz-cl" maxlength="60" placeholder="${c(((q=n.cls)==null?void 0:q.nome)||"")}" value="${c(l.nomePersonalizado||"")}" /></div>
    </div>
    <div><label for="pz-note">Notas da personalização</label>
      <textarea id="pz-note" rows="2" placeholder="O que muda nessa versão (aparência, traços trocados…)">${c(s.build.customNote||"")}</textarea></div>
  </section>

  <section class="card stack"><h2>Atributos e Salvaguardas</h2>
    <p class="empty-note">Toque em <b>Salvaguarda</b> para marcar/desmarcar proficiência.</p>
    <div class="abil2">${z.map(([k,h])=>{const p=(s.build.saveProfs||[]).includes(k);return`<div class="abcard">
        <small>${h}</small><b>${N(n.mods[k])}</b>
        <input class="abscore" data-score="${k}" type="number" inputmode="numeric" min="1" max="30" value="${s.build.abilities[k]}" aria-label="Valor de ${h}" />
        <button class="savebtn ${p?"on":""}" data-save="${k}" aria-pressed="${p}">
          <span class="dot ${p?"on":""}"></span>Salvaguarda <b>${N(n.saves[k])}</b></button>
      </div>`}).join("")}</div>
  </section>

  <section class="card"><h2>Perícias</h2><p class="empty-note">Toque para alternar: sem proficiência → proficiente (●) → especialista (◆).</p>
    <div class="skills">${n.skills.map(k=>`<button data-skill="${k.id}" aria-pressed="${k.prof||k.exp}">
      <span class="row" style="flex-wrap:nowrap"><span class="dot ${k.exp?"exp":k.prof?"on":""}"></span>${k.nome} <small class="muted">(${k.ab.toUpperCase()})</small></span><b>${N(k.bonus)}</b></button>`).join("")}</div>
  </section>

  <section class="card stack"><h2>Treinamento e Proficiências</h2>
    ${[["armaduras","Treinamento com Armaduras"],["armas","Proficiência com Armas"],["ferramentas","Proficiência com Ferramentas"],["idiomas","Idiomas"]].map(([k,h])=>`<div><label for="tr-${k}">${h}</label><textarea id="tr-${k}" data-train="${k}" rows="2">${c(i[k]||"")}</textarea></div>`).join("")}
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
    <div class="row">${a.accountChip(r.user)}</div>
    <button class="btn danger small" id="delete">Apagar personagem</button>
  </section>`}let ma={};const M=(s,n,a=600)=>{clearTimeout(ma[s]),ma[s]=setTimeout(n,a)};function Qa(s,n,a){const r=a.S,t=a.app,l=s.build.classes[0].level;b("#lvlup").onclick=()=>n.level<20&&a.save(K(s,r.comp,l+1)).then(()=>a.toast(`Nível ${l+1}! PV máximo, Dados de Vida e espaços atualizados.`)),b("#lvldown").onclick=()=>l>1&&a.save(K(s,r.comp,l-1)),b("#subclass")&&(b("#subclass").onchange=e=>a.save(K(s,r.comp,l,e.target.value||null))),Ra(s,n,a),b("#pz-sp").oninput=e=>M("pzsp",()=>a.save({"build.speciesNomePersonalizado":e.target.value.trim()||null})),b("#pz-cl").oninput=e=>M("pzcl",()=>{const i=s.build.classes.map((o,g)=>g===0?{...o,nomePersonalizado:b("#pz-cl").value.trim()||null}:o);a.save({"build.classes":i})}),b("#pz-note").oninput=e=>M("pznote",()=>a.save({"build.customNote":e.target.value})),b("#ac").onchange=e=>a.save({"build.ac":Number(e.target.value)||10}),b("#hpmax").onchange=e=>{const i=Math.max(1,Number(e.target.value)||1);a.save({"state.hp":{...s.state.hp,max:i,current:Math.min(s.state.hp.current,i)}})},t.querySelectorAll("[data-score]").forEach(e=>e.onchange=()=>{const i=Math.max(1,Math.min(30,Number(e.value)||10)),o=e.dataset.score,g={[`build.abilities.${o}`]:i};o==="con"&&(g["state.hp"]={...s.state.hp,...Aa(s,r.comp,i)}),a.save(g)}),t.querySelectorAll("[data-save]").forEach(e=>e.onclick=()=>{const i=e.dataset.save,o=s.build.saveProfs||[];a.save({"build.saveProfs":o.includes(i)?o.filter(g=>g!==i):[...o,i]})}),t.querySelectorAll("[data-skill]").forEach(e=>e.onclick=()=>{const i=e.dataset.skill,o=s.build.skillProfs||[],g=s.build.expertise||[];g.includes(i)?a.save({"build.expertise":g.filter(u=>u!==i),"build.skillProfs":o.filter(u=>u!==i)}):o.includes(i)?a.save({"build.expertise":[...g,i]}):a.save({"build.skillProfs":[...o,i]})}),t.querySelectorAll("[data-train]").forEach(e=>e.oninput=()=>M("tr"+e.dataset.train,()=>a.save({[`build.training.${e.dataset.train}`]:e.value}))),b("#notes").oninput=e=>M("notes",()=>a.save({notes:e.target.value})),a.bindLogout(r.be,t),b("#join")&&(b("#join").onsubmit=async e=>{e.preventDefault();try{const i=await r.be.joinByCode(b("#code").value);await r.be.updateCharacter(r.chId,{campaignId:i.id,campaignName:i.name}),a.toast(`${s.name} entrou na mesa ${i.name}.`)}catch(i){a.toast(i.message)}}),b("#leave-table")&&(b("#leave-table").onclick=()=>{a.confirmTwice("#leave-table","Toque de novo para confirmar")&&a.save({campaignId:null,campaignName:null})}),b("#delete").onclick=async()=>{if(!a.confirmTwice("#delete",`Toque de novo para apagar ${s.name}`))return;const e=r.chId;await r.be.deleteCharacter(e),a.showHome()}}function Fa(s,n,a){const r=a.S,t=r.comp,l=r.ui,e=new Set(n.bonusSpells||[]),i=(s.build.spellsKnown||[]).filter(d=>!e.has(d)),o=s.build.spellsPrepared||[],g=[...e].map(d=>t.byId.spells[d]).filter(Boolean).sort((d,A)=>d.nivel-A.nivel||d.nome.localeCompare(A.nome)),u=Object.entries(s.state.spellSlots||{}),w=Object.entries(s.state.pactSlots||{}),v=[...u,...w].reduce((d,[A,I])=>I.max>0?Math.max(d,Number(A)):d,0),q=n.casters.length>0,k=i.map(d=>t.byId.spells[d]).filter(Boolean).sort((d,A)=>d.nivel-A.nivel||d.nome.localeCompare(A.nome)),h={};k.forEach(d=>{var A;return(h[A=d.nivel]||(h[A]=[])).push(d)});const p=s.build.classes.map(d=>d.classId),S=n.classesInfo.map(d=>{var A;return(A=d.cls)==null?void 0:A.nome}).filter(Boolean).join(" + "),y=n.spellCaps||{},m=k.filter(d=>d.nivel===0).length,$=k.filter(d=>d.nivel>0).length,V=o.length,ga=y.cantrips!==null&&m>=y.cantrips,ya=y.known!==null&&$>=y.known,wa=y.prepared!==null&&V>=y.prepared,ta=D(l.spellQ);let R=t.spells.filter(d=>!i.includes(d.id)&&!e.has(d.id)&&(!l.spellMine||!n.casters.length||d.classes.some(A=>p.includes(A)))&&(l.spellLvl==="all"||String(d.nivel)===l.spellLvl)&&(!ta||D(d.nome).includes(ta)));const oa=R.length;R=R.slice(0,L);const ka=d=>(d.nivel===0?ga:ya)?`<button class="btn small" data-learnfull="${d.nivel===0?"truque":"magia"}" aria-label="Limite atingido">+</button>`:aa("data-learn",d.id,"Adicionar "+c(d.nome)),Sa=d=>{const A=o.includes(d.id);return!A&&wa?'<button class="btn small" data-prepfull="1" aria-label="Limite de magias preparadas atingido">Preparar</button>':`<button class="btn small" data-prep="${d.id}">${A?"✓ Preparada":"Preparar"}</button>`},na=(d,A)=>`
    <div class="muted" style="font-size:.85rem">${c(d.escola)} · ${c(d.tempo)} · ${c(d.alcance)}<br>${c(d.componentes)} · ${c(d.duracao)}</div>
    ${P(d.desc)}
    <div class="row">${A?`${d.nivel>0?Sa(d):""}
         ${d.concentracao?`<button class="btn small" data-conc="${d.id}">${s.state.concentration===d.id?"Encerrar concentração":"Concentrar"}</button>`:""}
         <button class="btn small" data-forget="${d.id}">Remover</button>`:""}</div>`,_=d=>[d.concentracao?"C":"",d.ritual?"R":""].filter(Boolean).map(A=>`<span class="chip">${A}</span>`).join(" "),G=(d,A,I)=>I===null?"":`<span class="lvl-badge">${A}/${I} ${d}</span>`,qa=d=>`
    <div class="muted" style="font-size:.85rem">${c(d.escola)} · ${c(d.tempo)} · ${c(d.alcance)}<br>${c(d.componentes)} · ${c(d.duracao)}</div>
    ${P(d.desc)}
    ${d.concentracao?`<div class="row"><button class="btn small" data-conc="${d.id}">${s.state.concentration===d.id?"Encerrar concentração":"Concentrar"}</button></div>`:""}`;return`
  ${n.casters.length?`<section class="card stack">${n.casters.map(d=>`<div class="stats" style="grid-template-columns:repeat(3,1fr)">
    <div><b>${d.dc}</b><small>CD (${c(d.nome)})</small></div><div><b>${N(d.atk)}</b><small>Ataque mágico</small></div>
    <div><b>${$a[d.atributoConjuracao].slice(0,3)}</b><small>Atributo</small></div></div>`).join("")}</section>`:""}
  ${u.length?`<section class="card slots"><h2>Espaços de magia${n.multiclass?" (combinados)":""}</h2>
    ${u.map(([d,A])=>`<div class="lvl"><span>${d}º</span>${Array.from({length:A.max},(I,x)=>`<button class="slotpip ${x<A.used?"used":""}" data-slot="${d}" data-i="${x}" aria-label="Espaço de ${d}º círculo ${x+1}${x<A.used?", gasto":""}"></button>`).join("")}</div>`).join("")}
  </section>`:""}
  ${w.length?`<section class="card slots"><h2>Magia de Pacto</h2>
    ${w.map(([d,A])=>`<div class="lvl"><span>${d}º</span>${Array.from({length:A.max},(I,x)=>`<button class="slotpip ${x<A.used?"used":""}" data-pactslot="${d}" data-i="${x}" aria-label="Espaço de pacto ${x+1}${x<A.used?", gasto":""}"></button>`).join("")}</div>`).join("")}
  </section>`:""}
  ${g.length?`<section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Magias da Subclasse</h2><span class="lvl-badge">sempre preparadas</span></div>
    <p class="empty-note" style="margin:0">Concedidas automaticamente pela subclasse — não contam no limite de magias conhecidas/preparadas, mas ainda gastam um espaço de magia ao conjurar.</p>
    <div class="stack">${g.map(d=>j(`${c(d.nome)} ${_(d)}`,U(d.nivel),qa(d),!1,`data-k="b-${d.id}"`)).join("")}</div>
  </section>`:""}
  ${y.cantrips!==null||y.known!==null||y.prepared!==null?`<section class="card stack"><h2>Limites de magias (regra 2024)</h2>
    <div class="row" style="flex-wrap:wrap;gap:.4rem">${G("truques",m,y.cantrips)}${G("magias conhecidas",$,y.known)}${G("preparadas",V,y.prepared)}</div>
    <details class="entry"><summary><span class="t">Exceção manual (magia extra de livro/pergaminho…)</span></summary><div class="body stack">
      <p class="empty-note" style="margin:0">Some ao limite oficial acima. Use quando o personagem aprendeu algo fora da regra normal.</p>
      <div class="row" style="flex-wrap:wrap">
        <div class="grow"><label for="extra-cantrips">Truques extras</label><input id="extra-cantrips" type="number" min="0" value="${s.build.extraCantrips||0}" /></div>
        <div class="grow"><label for="extra-spells">Magias extras</label><input id="extra-spells" type="number" min="0" value="${s.build.extraSpells||0}" /></div>
        ${y.invocacoes!==null?`<div class="grow"><label for="extra-invoc">Invocações extras</label><input id="extra-invoc" type="number" min="0" value="${s.build.extraInvocations||0}" /></div>`:""}
      </div>
      <div><label for="extra-note">Motivo (opcional)</label>
        <textarea id="extra-note" rows="2" placeholder="Ex.: aprendeu com um pergaminho encontrado na masmorra">${c(s.build.extraSpellsNote||"")}</textarea></div>
    </div></details>
  </section>`:""}
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Minhas magias</h2><span class="lvl-badge">${o.length} preparada(s)</span></div>
    ${Object.keys(h).length?Object.entries(h).map(([d,A])=>`<h3 style="margin:.6rem 0 .2rem;color:var(--muted)">${U(Number(d))}</h3>
      <div class="stack" style="--gap:.4rem">${A.map(I=>j(`${I.nivel>0&&o.includes(I.id)?"✓ ":""}${c(I.nome)} ${_(I)}`,U(I.nivel),na(I,!0),!1,`data-k="m-${I.id}"`)).join("")}</div>`).join(""):'<p class="empty-note">Nenhuma magia ainda. Adicione pela biblioteca abaixo.</p>'}
  </section>
  <section class="card stack"><h2>Biblioteca de magias</h2>
    <input id="spellq" type="search" placeholder="Buscar magia pelo nome…" value="${c(l.spellQ)}" aria-label="Buscar magia" />
    <div class="filters">${["all","0","1","2","3","4","5","6","7","8","9"].map(d=>{const A=d==="all"||(d==="0"?q:q&&Number(d)<=v);return`<button data-flvl="${d}" aria-pressed="${l.spellLvl===d}" class="${A?"":"unavail"}" ${A?"":'title="Ainda não disponível no seu nível"'}>${d==="all"?"Todas":d==="0"?"Truques":d+"º"}</button>`}).join("")}</div>
    ${q?`<p class="empty-note" style="margin:0">Seu nível permite conjurar ${v===0?"só truques":`truques e magias até ${v}º círculo`}. Os demais círculos aparecem esmaecidos até você subir de nível.</p>`:""}
    ${S?`<label class="chk"><input type="checkbox" id="spellmine" ${l.spellMine?"checked":""}> Só a lista de ${c(S)}</label>`:""}
    <p class="empty-note">${oa} magia(s)${oa>L?` — mostrando ${L}, refine a busca`:""}.</p>
    <div class="stack">${R.map(d=>j(`${c(d.nome)} ${_(d)}`,U(d.nivel),na(d,!1),!1,`data-k="l-${d.id}"`,ka(d))).join("")}</div>
  </section>`}function _a(s,n,a){const r=a.S,t=a.app,l=r.ui;t.querySelectorAll("[data-slot]").forEach(e=>e.onclick=()=>{const i=e.dataset.slot,o=Number(e.dataset.i),g=s.state.spellSlots[i];a.save({[`state.spellSlots.${i}.used`]:o<g.used?o:o+1})}),t.querySelectorAll("[data-pactslot]").forEach(e=>e.onclick=()=>{const i=e.dataset.pactslot,o=Number(e.dataset.i),g=s.state.pactSlots[i];a.save({[`state.pactSlots.${i}.used`]:o<g.used?o:o+1})}),b("#spellq").oninput=e=>{l.spellQ=e.target.value,M("sq",a.render,250)},t.querySelectorAll("[data-flvl]").forEach(e=>e.onclick=()=>{l.spellLvl=e.dataset.flvl,a.render()}),b("#spellmine")&&(b("#spellmine").onchange=e=>{l.spellMine=e.target.checked,a.render()}),t.querySelectorAll("[data-learn]").forEach(e=>e.onclick=()=>a.save({"build.spellsKnown":[...s.build.spellsKnown||[],e.dataset.learn]})),t.querySelectorAll("[data-learnfull]").forEach(e=>e.onclick=()=>C(`Limite de ${e.dataset.learnfull==="truque"?"truques conhecidos":"magias conhecidas"} atingido. Use a exceção manual acima se for o caso.`)),t.querySelectorAll("[data-forget]").forEach(e=>e.onclick=()=>a.save({"build.spellsKnown":(s.build.spellsKnown||[]).filter(i=>i!==e.dataset.forget),"build.spellsPrepared":(s.build.spellsPrepared||[]).filter(i=>i!==e.dataset.forget)})),t.querySelectorAll("[data-prep]").forEach(e=>e.onclick=()=>{const i=s.build.spellsPrepared||[],o=e.dataset.prep;a.save({"build.spellsPrepared":i.includes(o)?i.filter(g=>g!==o):[...i,o]})}),t.querySelectorAll("[data-prepfull]").forEach(e=>e.onclick=()=>C("Limite de magias preparadas atingido. Use a exceção manual acima se for o caso.")),b("#extra-cantrips")&&(b("#extra-cantrips").onchange=e=>a.save({"build.extraCantrips":Math.max(0,Number(e.target.value)||0)})),b("#extra-spells")&&(b("#extra-spells").onchange=e=>a.save({"build.extraSpells":Math.max(0,Number(e.target.value)||0)})),b("#extra-invoc")&&(b("#extra-invoc").onchange=e=>a.save({"build.extraInvocations":Math.max(0,Number(e.target.value)||0)})),b("#extra-note")&&(b("#extra-note").oninput=e=>M("extranote",()=>a.save({"build.extraSpellsNote":e.target.value}))),t.querySelectorAll("[data-conc]").forEach(e=>e.onclick=()=>a.save({"state.concentration":s.state.concentration===e.dataset.conc?null:e.dataset.conc})),Q(t,"spells")}const Y={};function Q(s,n){s.querySelectorAll("summary .addbtn").forEach(r=>r.addEventListener("click",t=>t.preventDefault()));const a=Y[n]||(Y[n]=new Set);s.querySelectorAll("details.entry").forEach((r,t)=>{var e;const l=r.dataset.k||((e=r.querySelector("summary .t"))==null?void 0:e.textContent)||t;a.has(l)&&(r.open=!0),r.addEventListener("toggle",()=>r.open?a.add(l):a.delete(l))})}function Ga(s,n,a,r){var h;const{cls:t,sub:l,level:e,classId:i,nomePersonalizado:o}=n;if(!t)return`<section class="card">Classe "${c(i)}" não encontrada no compêndio.</section>`;const g=o||t.nome,u=t.caracteristicas||[],w=u.filter(p=>p.nivel<=e),v=u.filter(p=>p.nivel>e),q=s.build.opcoes||[],k=i==="bruxo"?((h=a.spellCaps)==null?void 0:h.invocacoes)??null:null;return`
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Características de ${c(g)}</h2><span class="lvl-badge">nível ${e}</span></div>
    ${o?`<p class="empty-note" style="margin:0">Usa as regras de ${c(t.nome)}.</p>`:""}
    ${w.length?w.map(p=>j(c(p.nome),`Nível ${p.nivel}`,P(p.desc))).join(""):'<p class="empty-note">Importe o compêndio completo para ver as características.</p>'}
    ${v.length?`<details class="entry"><summary><span class="t muted">Próximos níveis (${v.length})</span></summary><div class="body stack">
      ${v.map(p=>j(c(p.nome),`Nível ${p.nivel}`,P(p.desc))).join("")}</div></details>`:""}
  </section>
  ${(t.opcoes||[]).map(p=>{const S=i==="bruxo"&&/Invoca/i.test(p.titulo),y=S?p.itens.filter($=>q.includes($.id)).length:null,m=S&&k!==null&&y>=k;return`<section class="card stack"><div class="sectiontitle"><h2 style="margin:0">${c(p.titulo.replace("Opções de ",""))} (${c(g)})</h2>${S&&k!==null?`<span class="lvl-badge">${y}/${k}</span>`:""}</div>
    ${p.itens.filter($=>q.includes($.id)).map($=>j("✓ "+c($.nome),"",P($.desc)+`<button class="btn small" data-unop="${$.id}">Remover</button>`)).join("")||'<p class="empty-note">Nenhuma escolhida.</p>'}
    <details class="entry"><summary><span class="t">Escolher ${c(p.titulo.replace("Opções de ","").toLowerCase())}</span><span class="lvl-badge">${p.itens.length}</span></summary><div class="body stack">
      ${p.itens.filter($=>!q.includes($.id)).map($=>j(c($.nome),"",P($.desc),!1,`data-k="o-${i}-${$.id}"`,m?'<button class="btn small" data-opfull="1" aria-label="Limite de invocações atingido">+</button>':aa("data-op",$.id,"Escolher "+c($.nome)))).join("")}
    </div></details></section>`}).join("")}
  <section class="card stack"><h2>Subclasse de ${c(g)}${l?": "+c(l.nome):""}</h2>
    ${l?(l.caracteristicas||[]).map(p=>j(`${p.nivel>e?"🔒 ":""}${c(p.nome)}`,`Nível ${p.nivel}`,P(p.desc))).join(""):`<p class="empty-note">${e<3?"A subclasse é escolhida no nível 3.":"Escolha a subclasse na aba Ficha (ou em Multiclasse, para uma classe secundária)."}</p>
         ${(t.subclasses||[]).map(p=>j(c(p.nome),"",P(p.intro))).join("")}`}
  </section>`}function Ka(s,n,a){const r=n.sp,t=n.bg,l=n.speciesLabel||(r==null?void 0:r.nome)||"espécie";return`
  ${n.classesInfo.map(e=>Ga(s,e,n)).join("")}
  <section class="card stack"><h2>Traços de ${c(l)}</h2>
    ${r&&l!==r.nome?`<p class="empty-note" style="margin:0">Usa as regras de ${c(r.nome)}.</p>`:""}
    <p class="empty-note">${c((r==null?void 0:r.tipo)||"")} · ${c((r==null?void 0:r.tamanho)||"")} · Deslocamento ${c((r==null?void 0:r.deslocamento)||"")}</p>
    ${((r==null?void 0:r.tracos)||[]).filter(e=>e.nome!=="Detalhes").map(e=>j(c(e.nome),"",P(e.desc))).join("")||'<p class="empty-note">Sem traços no compêndio.</p>'}
  </section>
  ${t?`<section class="card stack"><h2>Antecedente: ${c(t.nome)}</h2>
    <p style="margin:0;font-size:.92rem"><b>Atributos:</b> ${t.atributos.map(e=>$a[e]).join(", ")}<br>
    <b>Talento:</b> ${c(t.talento)}<br><b>Ferramenta:</b> ${c(t.ferramenta)}<br><b>Equipamento:</b> ${c(t.equipamento)}</p></section>`:""}
  ${s.build.customNote?`<section class="card stack"><h2>Notas da personalização</h2><p style="margin:0;white-space:pre-wrap">${c(s.build.customNote)}</p></section>`:""}`}function Wa(s,n,a){const r=a.app,t=s.build.opcoes||[];r.querySelectorAll("[data-op]").forEach(l=>l.onclick=()=>a.save({"build.opcoes":[...t,l.dataset.op]})),r.querySelectorAll("[data-unop]").forEach(l=>l.onclick=()=>a.save({"build.opcoes":t.filter(e=>e!==l.dataset.unop)})),r.querySelectorAll("[data-opfull]").forEach(l=>l.onclick=()=>C("Limite de invocações místicas atingido. Use a exceção manual na aba Magias se for o caso.")),Q(r,"classe")}const Ya=["Origem","Geral","Estilo de Luta","Dádiva Épica"];function Ja(s,n,a){const r=a.S,t=r.comp,l=r.ui,e=s.build.feats||[],i=D(l.featQ);let o=t.feats.filter(u=>(u.repetivel||!e.some(w=>w.id===u.id))&&(l.featCat==="all"||u.categoria===l.featCat)&&(!i||D(u.nome).includes(i)||D(u.prereq).includes(i)));const g=o.length;return o=o.slice(0,L),`
  <section class="card stack"><h2>Meus talentos</h2>
    ${e.length?e.map((u,w)=>{const v=t.byId.feats[u.id];return j(c((v==null?void 0:v.nome)||u.id),c(u.origem||(v==null?void 0:v.categoria)||""),(v?`<p class="empty-note">${c(v.categoria)}${v.prereq?" · Pré-requisito: "+c(v.prereq):""}</p>${P(v.desc)}`:'<p class="empty-note">Talento fora do compêndio.</p>')+`<button class="btn small" data-unfeat="${w}">Remover</button>`)}).join(""):'<p class="empty-note">Nenhum talento. Seu antecedente concede um talento de Origem.</p>'}
  </section>
  <section class="card stack"><h2>Biblioteca de talentos</h2>
    <input id="featq" type="search" placeholder="Buscar talento…" value="${c(l.featQ)}" aria-label="Buscar talento" />
    <div class="filters">${["all",...Ya].map(u=>`<button data-fcat="${u}" aria-pressed="${l.featCat===u}">${u==="all"?"Todos":u}</button>`).join("")}</div>
    <p class="empty-note">${g} talento(s)${g>L?` — mostrando ${L}`:""}.</p>
    ${o.map(u=>j(c(u.nome),c(u.categoria),`${u.prereq?`<p class="empty-note">Pré-requisito: ${c(u.prereq)}</p>`:""}${P(u.desc)}`,!1,`data-k="f-${u.id}"`,aa("data-feat",u.id,"Adicionar "+c(u.nome)))).join("")}
    ${t.feats.length?"":'<p class="empty-note">Importe o compêndio completo para usar a biblioteca de talentos.</p>'}
  </section>`}function Xa(s,n,a){const r=a.S,t=a.app,l=s.build.feats||[];b("#featq").oninput=e=>{r.ui.featQ=e.target.value,M("fq",a.render,250)},t.querySelectorAll("[data-fcat]").forEach(e=>e.onclick=()=>{r.ui.featCat=e.dataset.fcat,a.render()}),t.querySelectorAll("[data-feat]").forEach(e=>e.onclick=()=>{a.save({"build.feats":[...l,{id:e.dataset.feat,origem:"Escolhido"}]}),a.toast("Talento adicionado. Aplique aumentos de atributo na aba Ficha, se houver.")}),t.querySelectorAll("[data-unfeat]").forEach(e=>e.onclick=()=>a.save({"build.feats":l.filter((i,o)=>o!==Number(e.dataset.unfeat))})),Q(t,"feats")}function Za(s,n,a){const r=a.S,t=r.comp,l=r.ui,e=s.inventory||[],i=s.coins||{},o=D(l.itemQ),g=o.length>=2?t.items.filter(m=>D(m.nome).includes(o)).slice(0,25):[],u=Math.min(100,Math.round(n.weight/n.carry*100)),w=m=>m.tipo==="arma"?`${c(m.dano)} · ${c(m.propriedades)} · Maestria: ${c(m.maestria)}`:m.tipo==="armadura"?`CA ${c(m.ca)}${m.forca&&m.forca!=="—"?" · "+c(m.forca):""}${m.furtividade==="Desvantagem"?" · Desv. Furtividade":""}`:"",v=m=>m.itemId?t.byId.weapons[m.itemId]||t.byId.armor[m.itemId]||t.byId.gear[m.itemId]:null,q=(m,$)=>/po[çc][aã]o|elixir|antídoto/i.test(m.nome||($==null?void 0:$.nome)||""),k={arma:"Armas",armadura:"Armaduras",pocao:"Poções"},h=m=>{const $=v(m);return($==null?void 0:$.tipo)==="arma"?"Armas":($==null?void 0:$.tipo)==="armadura"?"Armaduras":!$&&k[m.categoria]?k[m.categoria]:q(m,$)?"Poções":"Outros"},p=m=>{const $=v(m);return j(`${m.equipado?"🛡️ ":""}${c(m.nome)}${Number(m.qtd)>1?` <span class="muted">×${m.qtd}</span>`:""}`,c(m.peso||""),`${$?`<p class="empty-note">${w($)}${$.custo?" · "+c($.custo):""}</p>${$.desc?P($.desc):""}`:""}
      <div class="row">
        <button class="btn small" data-qty="${m.uid}" data-d="-1">−</button><b>${m.qtd}</b><button class="btn small" data-qty="${m.uid}" data-d="1">+</button>
        <label class="chk"><input type="checkbox" data-equip="${m.uid}" ${m.equipado?"checked":""}> Equipado</label>
        <label class="chk"><input type="checkbox" data-attune="${m.uid}" ${m.sintonizado?"checked":""}> Sintonizado</label>
      </div>
      <input data-inote="${m.uid}" id="inote-${m.uid}" value="${c(m.notas||"")}" placeholder="Notas (cargas, efeitos…)" aria-label="Notas do item" />
      <button class="btn small danger" data-rmitem="${m.uid}">Remover item</button>`,!1,`data-k="i-${m.uid}"`)},S=["Armas","Armaduras","Poções","Outros"],y=Object.fromEntries(S.map(m=>[m,e.filter($=>h($)===m)]));return`
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Bolsa de moedas</h2><span class="lvl-badge">≈ ${n.coinsGP.toLocaleString("pt-BR",{maximumFractionDigits:2})} PO</span></div>
    <div class="coins">${la.map(([m,$,V])=>`<label class="coin coin-${m}"><span>${$}</span>
      <input type="number" inputmode="numeric" min="0" data-coin="${m}" value="${Number(i[m])||0}" aria-label="${V}" /></label>`).join("")}</div>
    <form class="row" id="coinop">
      <input id="coinamt" type="number" inputmode="numeric" min="1" placeholder="Qtd." style="width:5.5rem" aria-label="Quantidade" />
      <select id="coinkind" style="width:5.5rem" aria-label="Moeda">${la.map(([m,$])=>`<option value="${m}" ${m==="po"?"selected":""}>${$}</option>`).join("")}</select>
      <button class="btn heal small" data-cop="+">Receber</button><button class="btn danger small" data-cop="-">Gastar</button>
    </form>
  </section>
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Inventário</h2><span class="lvl-badge">${n.weight.toLocaleString("pt-BR",{maximumFractionDigits:1})} / ${n.carry} kg</span></div>
    <div class="hpbar" aria-hidden="true"><div class="cur ${u>100?"low":u>75?"mid":""}" style="width:${u}%"></div></div>
    ${e.length?S.filter(m=>y[m].length).map(m=>`
      <div class="inv-divider"><span>${m}</span><span class="muted">${y[m].length}</span></div>
      ${y[m].map(p).join("")}`).join(""):'<p class="empty-note">Inventário vazio.</p>'}
  </section>
  <section class="card stack"><h2>Adicionar item</h2>
    <input id="itemq" type="search" placeholder="Buscar armas, armaduras, equipamento… (2+ letras)" value="${c(l.itemQ)}" aria-label="Buscar item" />
    ${g.map(m=>`<div class="libitem"><div class="info"><b>${c(m.nome)}</b><small>${c(m.custo||"")}${m.peso?" · "+c(m.peso):""} ${w(m)?"· "+w(m):""}</small></div>
      <button class="btn small primary" data-additem="${m.id}">+</button></div>`).join("")}
    ${o.length>=2&&!g.length?'<p class="empty-note">Nada encontrado — crie um item personalizado abaixo.</p>':""}
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
      <input id="cdetail" placeholder="Notas, efeito… (opcional)" aria-label="Detalhes do item" />
      <button class="btn small primary">+ Adicionar item personalizado</button>
    </form>
  </section>`}function ae(s,n,a){const r=a.S,t=a.app,l=r.comp,e=s.inventory||[],i={pc:0,pp:0,pe:0,po:0,pl:0,...s.coins||{}},o=u=>a.save({inventory:u});t.querySelectorAll("[data-coin]").forEach(u=>u.onchange=()=>a.save({coins:{...i,[u.dataset.coin]:Math.max(0,Number(u.value)||0)}})),t.querySelectorAll("[data-cop]").forEach(u=>u.onclick=w=>{w.preventDefault();const v=Number(b("#coinamt").value),q=b("#coinkind").value;if(!v)return a.toast("Digite a quantidade.");const k=i[q]+(u.dataset.cop==="+"?v:-v);if(k<0)return a.toast(`Não há ${v} ${q.toUpperCase()} suficientes.`);a.save({coins:{...i,[q]:k}})}),b("#itemq").oninput=u=>{r.ui.itemQ=u.target.value,M("iq",a.render,250)},t.querySelectorAll("[data-additem]").forEach(u=>u.onclick=()=>{const w=l.items.find(q=>q.id===u.dataset.additem),v=e.find(q=>q.itemId===w.id);o(v?e.map(q=>q===v?{...q,qtd:Number(q.qtd)+1}:q):[...e,{uid:ua(),itemId:w.id,nome:w.nome,qtd:1,peso:w.peso||"",equipado:!1,sintonizado:!1,notas:""}]),a.toast(`${w.nome} adicionado.`)}),b("#custom").onsubmit=u=>{u.preventDefault();const w=b("#cname").value.trim();if(!w)return;const v=b("#cweight").value.trim(),q=Math.max(1,Number(b("#cqty").value)||1);o([...e,{uid:ua(),itemId:null,nome:w,categoria:b("#ccat").value,qtd:q,peso:v?`${v} kg`:"",equipado:!1,sintonizado:!1,notas:b("#cdetail").value.trim()}]),a.toast(`${w} adicionado.`)};const g=(u,w)=>o(e.map(v=>v.uid===u?w(v):v));t.querySelectorAll("[data-qty]").forEach(u=>u.onclick=()=>g(u.dataset.qty,w=>({...w,qtd:Math.max(0,Number(w.qtd)+Number(u.dataset.d))}))),t.querySelectorAll("[data-equip]").forEach(u=>u.onchange=()=>g(u.dataset.equip,w=>({...w,equipado:u.checked}))),t.querySelectorAll("[data-attune]").forEach(u=>u.onchange=()=>{if(u.checked&&e.filter(w=>w.sintonizado).length>=3)return u.checked=!1,a.toast("Limite de 3 itens sintonizados.");g(u.dataset.attune,w=>({...w,sintonizado:u.checked}))}),t.querySelectorAll("[data-inote]").forEach(u=>u.oninput=()=>M("in"+u.dataset.inote,()=>g(u.dataset.inote,w=>({...w,notas:u.value})))),t.querySelectorAll("[data-rmitem]").forEach(u=>u.onclick=()=>o(e.filter(w=>w.uid!==u.dataset.rmitem))),Q(t,"itens")}const ee={ficha:{html:Ua,bind:Qa},magias:{html:Fa,bind:_a},classe:{html:Ka,bind:Wa},talentos:{html:Ja,bind:Xa},itens:{html:Za,bind:ae}},E=b("#app"),f={be:null,comp:null,user:null,chId:null,ch:null,tab:"combate",amount:"",off:[],prevHp:null,ui:{spellQ:"",spellLvl:"all",spellMine:!0,featQ:"",featCat:"all",itemQ:"",libOpen:{}}};function J(s){if(!f.ch||!s)return;const n=structuredClone(f.ch);Object.entries(s).forEach(([a,r])=>Ha(n,a,r)),f.ch=n,O()}const ea=()=>`rpgmesa:last:${f.user.uid}`,F=()=>{f.off.forEach(s=>s()),f.off=[]},pa=Object.fromEntries(Na.map(([s,n])=>[s,n])),X=Object.fromEntries(z);se().catch(s=>{E.innerHTML=`<div class="wrap"><div class="card">Erro ao iniciar: ${c(s.message)}</div></div>`});async function se(){f.be=await ja(),Pa(f.be,E,{title:"Grimório do Aventureiro",subtitle:"Entre com sua conta para acessar seus personagens em qualquer aparelho.",onSignedOut:()=>{F(),f.ch=null,f.chId=null,f.prevHp=null}},async s=>{f.user=s,E.innerHTML='<p class="muted" style="padding:1rem">Carregando compêndio…</p>',f.comp=await Ma(f.be);const n=Z.get(ea());n?sa(n):H()})}const ha=()=>f.be.mode==="local"?'<p class="banner">Modo demo: os dados ficam neste navegador. Abra o Escudo em outra aba para testar a sincronização.</p>':"",te=()=>f.comp.completo?"":'<p class="banner">Biblioteca reduzida: o Mestre ainda não importou o compêndio completo no Escudo.</p>';function H(){F(),f.chId=null,f.ch=null,Z.set(ea(),null);let s=!1;f.off.push(f.be.watchMyCharacters(n=>{b("#build")||(n.sort((a,r)=>a.name.localeCompare(r.name)),E.innerHTML=`<header class="top"><div class="row"><div class="grow name">Meus personagens</div>
      <a class="btn small" href="./escudo.html" title="Ir para o Escudo do Mestre">🛡️ Escudo</a>${ba(f.user)}</div></header>
    <main class="wrap stack">${ha()}${te()}
      ${n.map(a=>`<button class="charbtn" data-open="${a.id}">
        <span><b>${c(a.name)}</b><br><small class="muted">${c(fa(a))}</small></span>
        <span class="chip">${a.campaignName?"🎲 "+c(a.campaignName):"Sem mesa"}</span></button>`).join("")}
      ${n.length?"":'<div class="card"><p style="margin:0">Você ainda não tem personagens. Crie o primeiro abaixo — ele fica salvo na sua conta.</p></div>'}
      <button class="btn primary" id="newchar" style="width:100%">+ Novo personagem</button>
    </main>`,va(f.be,E),E.querySelectorAll("[data-open]").forEach(a=>a.onclick=()=>sa(a.dataset.open)),b("#newchar").onclick=()=>oe(),!n.length&&!s&&(s=!0))}))}function oe(){F();const s=f.comp,n=[15,14,13,12,10,8];E.innerHTML=`<header class="top"><div class="row"><button class="btn small" id="back" aria-label="Voltar">◀</button><div class="grow name">Novo personagem</div></div></header>
  <main class="wrap stack">
  <form class="stack" id="build">
    <section class="card stack">
      <div><label for="name">Nome</label><input id="name" name="name" required maxlength="40" /></div>
      <div class="row">
        <div class="grow"><label for="species">Espécie</label><select id="species" name="species">
          ${s.species.map(h=>`<option value="${h.id}">${c(h.nome)}</option>`).join("")}</select></div>
        <div style="width:5.5rem"><label for="level">Nível</label><input id="level" name="level" type="number" inputmode="numeric" min="1" max="20" value="1" /></div>
      </div>
      <div><label for="speciesnome">Nome personalizado da espécie (opcional)</label>
        <input id="speciesnome" name="speciesnome" maxlength="60" placeholder="Ex.: Genasi da Terra" /></div>
      <div><label for="class">Classe</label><select id="class" name="class">
        ${s.classes.map(h=>`<option value="${h.id}">${c(h.nome)}</option>`).join("")}</select></div>
      <div><label for="classnome">Nome personalizado da classe (opcional)</label>
        <input id="classnome" name="classnome" maxlength="60" placeholder="Ex.: Arcanista" /></div>
      <p class="muted" style="margin:0;font-size:.85rem">Pra usar uma espécie ou classe alternativa/homebrew que não está na lista, escolha acima a mais parecida em regras — é dela que vêm os números — e dê um nome personalizado aqui, que aparece no lugar do nome oficial em toda a ficha.</p>
      <div><label for="customnote">Notas da personalização (opcional)</label>
        <textarea id="customnote" name="customnote" rows="2" placeholder="O que muda nessa versão (aparência, traços trocados…)"></textarea></div>
      <div id="classinfo"></div>
    </section>
    ${s.backgrounds.length?`<section class="card stack">
      <div><label for="bg">Antecedente</label><select id="bg" name="bg">
        ${s.backgrounds.map(h=>`<option value="${h.id}">${c(h.nome)}</option>`).join("")}</select></div>
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
  </form></main>`,b("#back").onclick=H;const a=b("#build"),r=()=>s.byId.classes[a.class.value],t=()=>{var h,p;return(p=s.byId.backgrounds)==null?void 0:p[(h=a.bg)==null?void 0:h.value]};function l(){var S;const h=r(),p=(S=h.periciasOpcoes)!=null&&S.length?h.periciasOpcoes:[];b("#classinfo").innerHTML=`
      <p class="muted" style="margin:.2rem 0;font-size:.88rem">Dado de Vida d${h.dadoVida} · Salvaguardas: ${(h.salvaguardas||[]).map(y=>X[y]).join(", ")}</p>
      ${p.length?`<div><label>Perícias da classe — escolha ${h.periciasEscolha} <span id="skcount"></span></label>
        <div class="checks">${p.map(y=>`<label class="chk"><input type="checkbox" name="sk" value="${y}"> ${pa[y]}</label>`).join("")}</div></div>`:""}`,a.querySelectorAll("[name=sk]").forEach(y=>y.onchange=e),e()}function e(){var m;const h=r(),p=((m=t())==null?void 0:m.pericias)||[],S=[...a.querySelectorAll("[name=sk]")];S.forEach($=>{p.includes($.value)&&($.checked=!1,$.disabled=!0,$.parentElement.title="Já vem do antecedente")});const y=S.filter($=>$.checked).length;S.forEach($=>{p.includes($.value)||($.disabled=!$.checked&&y>=h.periciasEscolha)}),b("#skcount")&&(b("#skcount").textContent=`(${y}/${h.periciasEscolha})`)}function i(){const h=t();if(!h)return;const p=s.byId.feats[h.talentoId];b("#bginfo").innerHTML=`
      <p style="margin:.2rem 0;font-size:.9rem"><b>Perícias:</b> ${h.pericias.map(S=>pa[S]).join(", ")}<br>
      <b>Talento:</b> ${c((p==null?void 0:p.nome)||h.talento)}<br><b>Ferramenta:</b> ${c(h.ferramenta)}</p>
      <div class="row">
        <div class="grow"><label for="plus2">+2 em</label><select id="plus2">${h.atributos.map(S=>`<option value="${S}">${X[S]}</option>`).join("")}<option value="all">+1 nos três</option></select></div>
        <div class="grow" id="plus1wrap"><label for="plus1">+1 em</label><select id="plus1">${h.atributos.map((S,y)=>`<option value="${S}" ${y===1?"selected":""}>${X[S]}</option>`).join("")}</select></div>
      </div>
      <details class="entry"><summary><span class="t">Equipamento do antecedente</span></summary><div class="body">${c(h.equipamento)}</div></details>`,b("#plus2").onchange=b("#plus1").onchange=g,g(),e()}function o(){const h=t(),p={};if(!h)return p;const S=b("#plus2").value;if(S==="all")h.atributos.forEach(y=>p[y]=1);else{p[S]=2;const y=b("#plus1").value;y!==S&&(p[y]=(p[y]||0)+1)}return p}function g(){const h=o();b("#plus1wrap")&&(b("#plus1wrap").style.visibility=b("#plus2").value==="all"?"hidden":""),a.querySelectorAll(".abfinal").forEach(p=>{const S=p.dataset.ab,y=Math.min(20,Number(a[S].value)+(h[S]||0));p.textContent=h[S]?`→ ${y} (${N(ra(y))})`:`(${N(ra(y))})`})}const u=27,w={8:0,9:1,10:2,11:3,12:4,13:5,14:7,15:9},v=h=>w[h]??0;let q="array";function k(){const h=q==="buy";if(b("#ab-inputs").innerHTML=z.map(([p,S],y)=>{const m=document.getElementById("ab-"+p),$=m?m.value:h?8:n[y];return`<div><label for="ab-${p}">${S} <b class="abfinal" data-ab="${p}"></b></label>
        <div class="row" style="align-items:center;gap:.4rem;flex-wrap:nowrap">
          ${h?`<button type="button" class="btn small" data-abdown="${p}" aria-label="Diminuir ${S}">−</button>`:""}
          <input id="ab-${p}" name="${p}" type="number" inputmode="numeric" min="${h?8:3}" max="${h?15:20}"
            value="${$}" ${h?'readonly style="width:3.5rem;text-align:center"':""} />
          ${h?`<button type="button" class="btn small" data-abup="${p}" aria-label="Aumentar ${S}">+</button>`:""}
        </div></div>`}).join(""),h){const p=z.reduce((y,[m])=>y+v(Number(a[m].value)),0),S=u-p;b("#abpts").style.display="",b("#abpts").textContent=`${S} de ${u} pontos restantes`,a.querySelectorAll("[data-abup]").forEach(y=>y.onclick=()=>{const m=y.dataset.abup,$=Number(a[m].value);if(!($>=15)){if(p+(v($+1)-v($))>u)return C("Sem pontos suficientes.");a[m].value=$+1,k()}}),a.querySelectorAll("[data-abdown]").forEach(y=>y.onclick=()=>{const m=y.dataset.abdown,$=Number(a[m].value);$<=8||(a[m].value=$-1,k())})}else b("#abpts").style.display="none",z.forEach(([p])=>a[p].oninput=g);g()}E.querySelectorAll("[data-abmode]").forEach(h=>h.onclick=()=>{h.dataset.abmode!==q&&(q=h.dataset.abmode,E.querySelectorAll("[data-abmode]").forEach(p=>p.setAttribute("aria-selected",String(p.dataset.abmode===q))),b("#abmode-help").textContent=q==="buy"?`Compra de pontos: comece com 8 em tudo e gaste os ${u} pontos (custo 9=1, 10=2, 11=3, 12=4, 13=5, 14=7, 15=9). Máximo 15 antes dos bônus do antecedente.`:"Valores base (Array Padrão: 15, 14, 13, 12, 10, 8). Edite livremente, se preferir. O bônus do antecedente é somado automaticamente.",z.forEach(([p],S)=>{const y=document.getElementById("ab-"+p);y&&(y.value=q==="buy"?8:n[S])}),k())}),a.class.onchange=l,a.bg&&(a.bg.onchange=i),l(),i(),k(),a.onsubmit=async h=>{var m;h.preventDefault();const p=o(),S=Object.fromEntries(z.map(([$])=>[$,Math.min(20,Number(a[$].value)+(p[$]||0))])),y=xa({name:a.name.value.trim(),ownerUid:f.user.uid,speciesId:a.species.value,classId:a.class.value,level:Number(a.level.value),abilities:S,backgroundId:((m=a.bg)==null?void 0:m.value)||null,skillProfs:[...a.querySelectorAll("[name=sk]:checked")].map($=>$.value),speciesNomePersonalizado:a.speciesnome.value.trim()||null,classNomePersonalizado:a.classnome.value.trim()||null,customNote:a.customnote.value.trim()},s);try{sa(await f.be.createCharacter(y))}catch($){C($.message)}}}const fa=s=>`${Ta(s.build,f.comp)} · ${za(s.build,f.comp)}`;function sa(s){F(),f.chId=s,f.prevHp=null,Z.set(ea(),s),f.off.push(f.be.watchCharacter(s,n=>{if(!n)return H();const a=f.prevHp;if(f.prevHp=n.state.hp.current+n.state.hp.temp,f.ch=n,O(),a!=null&&a!==f.prevHp){const r=b("#hpcard");r==null||r.classList.add(f.prevHp<a?"flash-dmg":"flash-heal"),navigator.vibrate&&f.prevHp<a&&navigator.vibrate(80)}}))}const ne=[["combate","❤️","Combate"],["ficha","📜","Ficha"],["magias","✨","Magias"],["classe","🛡️","Traços"],["talentos","⭐","Talentos"],["itens","🎒","Itens"]],T={get S(){return f},app:E,render:()=>O(),save:s=>f.be.updateCharacter(f.chId,s).catch(n=>C(n.message)),toast:C,showHome:()=>H(),confirmTwice:le,accountChip:ba,bindLogout:va};function O(){if(Da(O))return;const s=f.ch,n=Ba(s,f.comp),a=document.activeElement,r=a==null?void 0:a.id,t=a&&"selectionStart"in a?[a.selectionStart,a.selectionEnd]:null,l=window.scrollY,e={combate:{html:ce,bind:re},...ee},i=e[f.tab]||e.combate;if(E.innerHTML=`
    <header class="top">
      <div class="row"><button class="btn small" id="home" aria-label="Meus personagens">◀</button>
        <div class="grow"><div class="name">${c(s.name)}</div>
        <div class="mini"><span>${c(fa(s))}</span>${s.campaignName?`<span>🎲 ${c(s.campaignName)}</span>`:""}</div></div>
        <div class="mini"><span>CA <b>${s.build.ac??10}</b></span><span>PV <b>${s.state.hp.current}/${s.state.hp.max}</b></span></div>
        <a class="btn small" href="./escudo.html" title="Ir para o Escudo do Mestre">🛡️</a></div>
    </header>
    <main class="wrap stack">${ha()}${i.html(s,n,T)}</main>
    <nav class="tabs" role="tablist">${ne.map(([o,g,u])=>`<button role="tab" aria-selected="${f.tab===o}" data-tab="${o}"><span class="ico" aria-hidden="true">${g}</span>${u}</button>`).join("")}</nav>`,E.querySelectorAll("[data-tab]").forEach(o=>o.onclick=()=>{f.tab=o.dataset.tab,O(),window.scrollTo(0,0)}),b("#home").onclick=H,i.bind(s,n,T),window.scrollTo(0,l),r){const o=document.getElementById(r);if(o&&(o.focus({preventScroll:!0}),t&&"setSelectionRange"in o))try{o.setSelectionRange(...t)}catch{}}}function le(s,n){const a=b(s);if(a.dataset.armed)return!0;a.dataset.armed="1";const r=a.textContent;return a.textContent=n,setTimeout(()=>{a.isConnected&&(delete a.dataset.armed,a.textContent=r)},3e3),!1}function ie(s,n,a){const r=(s.inventory||[]).filter(e=>{var i,o;return e.itemId&&((o=(i=n.byId)==null?void 0:i.weapons)==null?void 0:o[e.itemId])||e.categoria==="arma"}).map(e=>{var i,o;return{it:e,w:e.itemId?(o=(i=n.byId)==null?void 0:i.weapons)==null?void 0:o[e.itemId]:null}});if(!r.length)return`<section class="card stack"><h2>Ataques</h2>
      <p class="muted" style="margin:0">Nenhuma arma no inventário — desarmado: <b>${N(a.pb+a.mods.for)}</b> pra acertar, <b>1${N(a.mods.for)}</b> de dano contundente.</p></section>`;const t=Object.fromEntries(Oa(s,n,a).map(e=>[e.uid,e])),l=r.some(({it:e})=>e.equipado);return`<section class="card stack"><h2>Ataques</h2>
    ${r.map(({it:e,w:i})=>{const o=t[e.uid],g=!o&&e.equipado?' <span class="muted">(sem cálculo automático — veja as Notas)</span>':"";return`<div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem">
        <span>${e.equipado?"⚔️ ":""}${c(e.nome||(i==null?void 0:i.nome)||"")}${o?` — <b>${N(o.atk)}</b> pra acertar · <b>${c(o.dice)}${o.dmgBonus?N(o.dmgBonus):""}</b> ${c(o.dmgType)}${o.maestria?` <span class="muted">(${c(o.maestria)})</span>`:""}`:g}</span>
        <button class="btn small ${e.equipado?"":"primary"}" data-swapweapon="${e.uid}">${e.equipado?"Guardar":"Empunhar"}</button>
      </div>`}).join("")}
    ${l?"":`<p class="muted" style="margin:0">Nenhuma arma empunhada — desarmado: <b>${N(a.pb+a.mods.for)}</b> pra acertar, <b>1${N(a.mods.for)}</b> de dano contundente.</p>`}
    <p class="muted" style="margin:0;font-size:.8rem">Toque em "Empunhar"/"Guardar" pra trocar de arma. Bônus de ataque = Proficiência + atributo; dano = dado da arma + atributo.</p>
  </section>`}function ce(s,n){const{hp:a,deathSaves:r={success:0,fail:0},conditions:t=[],dead:l}=s.state,e=a.max+a.temp,i=Math.round(a.current/e*100),o=Math.round(a.temp/e*100),g=a.current/a.max>.5?"":a.current/a.max>.25?"mid":"low",u=a.current===0&&!l,w=s.state.concentration?f.comp.byId.spells[s.state.concentration]:null;return`
  <section class="card stack" id="hpcard">
    <div class="hp-big"><div class="num">${a.current}<small> / ${a.max}</small></div>
      ${a.temp?`<div class="tmpv">+${a.temp} temporários</div>`:""}
      ${l?'<div class="chip bad" style="margin-top:.4rem">MORTO</div>':""}</div>
    <div class="hpbar" aria-hidden="true"><div class="cur ${g}" style="width:${i}%"></div><div class="tmp" style="width:${o}%"></div></div>
    <input id="amount" class="amount" type="number" inputmode="numeric" min="0" placeholder="0" value="${c(f.amount)}" aria-label="Valor" />
    <div class="quick">${[1,2,5,10,"C"].map(v=>`<button class="btn small" data-q="${v}">${v==="C"?"Limpar":"+"+v}</button>`).join("")}</div>
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
    <div><b>${N(n.initiative)}</b><small>Iniciativa</small></div>
    <div><b>${c(n.speed.replace(" metros"," m"))}</b><small>Deslocamento</small></div>
    <div><b>${n.passivePerception}</b><small>Perc. passiva</small></div>
  </div></section>
  ${ie(s,f.comp,n)}
  ${w?`<p class="banner">Concentrando em: <b>${c(w.nome)}</b> <button class="btn small" id="endconc" style="margin-left:.5rem">Encerrar</button></p>`:""}
  ${u?`<section class="card stack"><h2>Testes contra a morte</h2>
    <div class="saves"><div><small class="muted">Sucessos</small><div class="pips">${[0,1,2].map(v=>`<span class="pip ${v<r.success?"s":""}"></span>`).join("")}</div></div>
      <div><small class="muted">Falhas</small><div class="pips">${[0,1,2].map(v=>`<span class="pip ${v<r.fail?"f":""}"></span>`).join("")}</div></div></div>
    <button class="btn primary" id="roll-death" style="width:100%">Rolar d20</button></section>`:""}
  <section class="card stack"><h2>Condições</h2>
    <div class="row">${t.map(v=>`<button class="chip bad" data-rmcond="${v}" aria-label="Remover ${v}">${ca[v]||v} ✕</button>`).join("")||'<span class="muted">Nenhuma</span>'}</div>
    <div class="row"><select id="addcond" class="grow" aria-label="Adicionar condição"><option value="">Adicionar condição…</option>
      ${La.filter(v=>!t.includes(v)).map(v=>`<option value="${v}">${ca[v]||v}</option>`).join("")}</select></div>
  </section>
  <section class="card stack"><h2>Descanso</h2>
    ${(s.state.hitDice.byClass||[]).length>1?s.state.hitDice.byClass.map(v=>{const q=f.comp.byId.classes[v.classId];return`<div class="row" style="justify-content:space-between"><span class="muted">${c((q==null?void 0:q.nome)||v.classId)}: ${v.max-v.used}/${v.max} (d${v.die})</span>
            <button class="btn small" data-shortclass="${v.classId}">Gastar</button></div>`}).join(""):`<p class="muted" style="margin:0">Dados de Vida: ${s.state.hitDice.max-s.state.hitDice.used}/${s.state.hitDice.max} (d${s.state.hitDice.die})</p>
         <div class="row"><button class="btn grow" id="short">Gastar 1 Dado de Vida</button></div>`}
    <div class="row"><button class="btn grow" id="long">Descanso Longo</button></div>
  </section>
  <section class="card"><h2>Registro</h2><ul class="log">${(s.state.log||[]).map(v=>`<li>${c(v)}</li>`).join("")||"<li>—</li>"}</ul></section>`}function re(s,n){E.querySelectorAll("[data-swapweapon]").forEach(t=>t.onclick=()=>{const l=s.inventory||[],e=l.find(o=>o.uid===t.dataset.swapweapon),i=!e.equipado;T.save({inventory:l.map(o=>o.uid===e.uid?{...o,equipado:i}:o)}),C(`${e.nome} ${i?"empunhada":"guardada"}.`)});const a=b("#amount");a.oninput=()=>f.amount=a.value,E.querySelectorAll("[data-q]").forEach(t=>t.onclick=()=>{f.amount=t.dataset.q==="C"?"":String((Number(f.amount)||0)+Number(t.dataset.q)),a.value=f.amount}),E.querySelectorAll("[data-act]").forEach(t=>t.onclick=async()=>{const l=Number(f.amount);if(!l)return C("Digite um valor.");const e={resistant:b("#o-res").checked,vulnerable:b("#o-vul").checked,critical:b("#o-crit").checked};f.amount="";const i=await W(f.be,f.chId,t.dataset.act,l,e,s.name);J(i.patch),i.concentrationDC&&s.state.concentration?C(`Teste de Concentração: CD ${i.concentrationDC}`):i.log.length&&C(i.log.at(-1))}),b("#endconc")&&(b("#endconc").onclick=()=>T.save({"state.concentration":null})),b("#roll-death")&&(b("#roll-death").onclick=async()=>{const t=da("1d20").total,l=await W(f.be,f.chId,"morte",t,{},s.name);J(l.patch),C(`d20 = ${t}. ${l.log.at(-1)??""}`)}),E.querySelectorAll("[data-rmcond]").forEach(t=>t.onclick=()=>T.save({"state.conditions":s.state.conditions.filter(l=>l!==t.dataset.rmcond)})),b("#addcond").onchange=t=>t.target.value&&T.save({"state.conditions":[...s.state.conditions,t.target.value]});const r=async(t,l)=>{const e=da(`1d${t}`).total+n.mods.con;await l();const i=await W(f.be,f.chId,"cura",Math.max(0,e),{},s.name);J(i.patch),C(`Dado de Vida: ${e}. ${i.log[0]??""}`)};b("#short")&&(b("#short").onclick=()=>{const t=s.state.hitDice;if(t.used>=t.max)return C("Sem Dados de Vida disponíveis.");r(t.die,()=>T.save({"state.hitDice.used":t.used+1}))}),E.querySelectorAll("[data-shortclass]").forEach(t=>t.onclick=()=>{const l=s.state.hitDice.byClass,e=l.findIndex(g=>g.classId===t.dataset.shortclass),i=l[e];if(i.used>=i.max)return C("Sem Dados de Vida dessa classe.");const o=l.map((g,u)=>u===e?{...g,used:g.used+1}:g);r(i.die,()=>T.save({"state.hitDice.byClass":o,"state.hitDice.used":o.reduce((g,u)=>g+u.used,0)}))}),b("#long").onclick=async()=>{const t=Object.fromEntries(Object.entries(s.state.spellSlots||{}).map(([i,o])=>[i,{...o,used:0}])),l=Object.fromEntries(Object.entries(s.state.pactSlots||{}).map(([i,o])=>[i,{...o,used:0}])),e=(s.state.hitDice.byClass||[]).map(i=>({...i,used:0}));await T.save({"state.hp":{...s.state.hp,current:s.state.hp.max,temp:0},"state.spellSlots":t,"state.pactSlots":l,"state.hitDice":{...s.state.hitDice,byClass:e,used:0},"state.deathSaves":{success:0,fail:0},"state.conditions":s.state.conditions.filter(i=>!["inconsciente","estabilizado"].includes(i))}),C("Descanso longo concluído.")}}
