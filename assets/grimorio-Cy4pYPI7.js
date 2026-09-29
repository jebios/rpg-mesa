import"./pwa-JyTihLW-.js";import{e as i,A as T,$ as b,m as oa,t as I,h as j,n as K,o as Aa,q as ia,w as Ea,x as Ca,y as Ia,S as Na,g as ja,r as Ma,l as Pa,s as X,a as ba,b as va,z as xa,B as Da,f as Ta,c as za,d as Ba,D as La,C as ca,i as Oa,j as G,k as Ha,E as ra}from"./auth-BweszVwO.js";function da(e){const n=String(e).replace(/\s/g,"").match(/^(\d*)d(\d+)([+-]\d+)?$/i);if(!n)return null;const a=Number(n[1]||1),r=Number(n[2]),t=Number(n[3]||0),o=Array.from({length:a},()=>1+Math.floor(Math.random()*r));return{rolls:o,bonus:t,total:o.reduce((s,u)=>s+u,0)+t}}const B=e=>i(e).replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>").replace(/(^|\s)_([^_]+)_(?=\s|$|[.,;:])/g,"$1<i>$2</i>");function M(e){if(!e)return"";const n=[];for(const a of String(e).split(/\n\n+/)){const r=a.split(`
`);if(r.every(t=>t.startsWith("| "))){n.push('<div class="mdtable"><table>'+r.map(t=>"<tr>"+t.slice(2).split(" | ").map(o=>`<td>${B(o)}</td>`).join("")+"</tr>").join("")+"</table></div>");continue}for(const t of r)t.startsWith("#### ")?n.push(`<h5>${B(t.slice(5))}</h5>`):t.startsWith("### ")?n.push(`<h4>${B(t.slice(4))}</h4>`):t.startsWith("| ")?n.push('<div class="mdtable"><table><tr>'+t.slice(2).split(" | ").map(o=>`<td>${B(o)}</td>`).join("")+"</tr></table></div>"):t.startsWith("• ")?n.push(`<p class="bullet">${B(t)}</p>`):n.push(`<p>${B(t)}</p>`)}return`<div class="md">${n.join("")}</div>`}const z=e=>String(e||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(),$a=Object.fromEntries(T),L=40,R=e=>e===0?"Truque":`${e}º círculo`,ua=()=>Math.random().toString(36).slice(2,9),N=(e,n,a,r=!1,t="",o="")=>`<details class="entry" ${r?"open":""} ${t}><summary><span class="t">${e}</span><span class="row" style="gap:.4rem;flex-wrap:nowrap"><span class="lvl-badge">${n||""}</span>${o}</span></summary><div class="body">${a}</div></details>`,Z=(e,n,a="Adicionar")=>`<button class="btn small primary addbtn" ${e}="${n}" aria-label="${a}">+</button>`;function Va(e,n,a){const r=a.S,t=r.comp,o=new Set(e.build.classes.map(d=>d.classId)),s=t.classes.filter(d=>!o.has(d.id)),u=n.classesInfo.slice(1);return`
  <section class="card stack"><h2>Multiclasse</h2>
    <p class="empty-note" style="margin:0">Nível total: ${n.level}/20. Ao multiclassar, confira na aba Traços quais proficiências a nova classe concede (são menos do que na criação) e ajuste "Treinamento e Proficiências" à mão, se precisar.</p>
    ${u.length?u.map(d=>{var m,g,l,y,k;const h=((m=d.cls)==null?void 0:m.subclasses)||[];return`<div class="row" style="flex-wrap:wrap;gap:.5rem;border-top:1px solid var(--border,#3332);padding-top:.5rem">
        <b class="grow">${i(((g=d.cls)==null?void 0:g.nome)||d.classId)}</b>
        <div class="row" style="gap:.3rem"><button class="btn small" data-mcdown="${d.classId}" aria-label="Diminuir nível de ${i(((l=d.cls)==null?void 0:l.nome)||d.classId)}">−</button>
          <span style="min-width:1.4rem;text-align:center">${d.level}</span>
          <button class="btn small" data-mcup="${d.classId}" aria-label="Subir nível de ${i(((y=d.cls)==null?void 0:y.nome)||d.classId)}">+</button></div>
        ${h.length?`<select data-mcsub="${d.classId}" aria-label="Subclasse de ${i(((k=d.cls)==null?void 0:k.nome)||d.classId)}" ${d.level<3?"disabled":""}>
          <option value="">—</option>${h.map(v=>`<option value="${v.id}" ${v.id===d.subclassId?"selected":""}>${i(v.nome)}</option>`).join("")}</select>`:""}
        <button class="btn small danger" data-mcrm="${d.classId}">Remover</button>
      </div>`}).join(""):'<p class="empty-note">Personagem de classe única.</p>'}
    ${s.length&&n.level<20?`<form class="row" id="addclass">
      <select id="mcnew" class="grow" aria-label="Nova classe">${s.map(d=>`<option value="${d.id}">${i(d.nome)}</option>`).join("")}</select>
      <button class="btn primary small">+ Adicionar classe</button></form>`:""}
  </section>`}function Ra(e,n,a){const r=a.S,t=a.app;t.querySelectorAll("[data-mcup]").forEach(o=>o.onclick=()=>{const s=e.build.classes.find(u=>u.classId===o.dataset.mcup);a.save(ia(e,r.comp,o.dataset.mcup,s.level+1))}),t.querySelectorAll("[data-mcdown]").forEach(o=>o.onclick=()=>{const s=e.build.classes.find(u=>u.classId===o.dataset.mcdown);if(s.level<=1)return a.toast('Nível mínimo 1 — use "Remover" para tirar a classe.');a.save(ia(e,r.comp,o.dataset.mcdown,s.level-1))}),t.querySelectorAll("[data-mcsub]").forEach(o=>o.onchange=()=>a.save(Ea(e,r.comp,o.dataset.mcsub,o.value||null))),t.querySelectorAll("[data-mcrm]").forEach(o=>o.onclick=()=>{if(!a.confirmTwice(`[data-mcrm="${o.dataset.mcrm}"]`,"Toque de novo para remover"))return;const s=Ca(e,r.comp,o.dataset.mcrm);s&&a.save(s)}),b("#addclass")&&(b("#addclass").onsubmit=o=>{o.preventDefault();const s=Ia(e,r.comp,b("#mcnew").value);s&&(a.save(s),a.toast("Classe adicionada no nível 1."))})}function Fa(e,n,a){var d,h,m,g,l,y;const r=a.S,t=e.build.classes[0].level,o=e.build.classes[0],s=((d=n.cls)==null?void 0:d.subclasses)||[],u=e.build.training||{};return`
  <section class="card stack">
    <div class="sectiontitle"><h2 style="margin:0">${n.multiclass?`${i(o.nomePersonalizado||((h=n.cls)==null?void 0:h.nome)||"")} ${t}`:`Nível ${t}`}</h2>
      <div class="row"><button class="btn small" id="lvldown" aria-label="Diminuir nível">−</button><button class="btn small primary" id="lvlup" aria-label="Subir de nível">+ Nível</button></div></div>
    ${n.multiclass?`<p class="empty-note" style="margin:0">Classe principal (foi ela que deu o 1º dado de vida cheio). Nível total do personagem: ${n.level}.</p>`:""}
    ${s.length?`<div><label for="subclass">Subclasse${t<3?" (a partir do nível 3)":""}</label>
      <select id="subclass" ${t<3?"disabled":""}><option value="">—</option>${s.map(k=>`<option value="${k.id}" ${k.id===o.subclassId?"selected":""}>${i(k.nome)}</option>`).join("")}</select></div>`:""}
    <div class="stats">
      <div><b>${j(n.pb)}</b><small>Proficiência</small></div>
      <div><b>${j(n.initiative)}</b><small>Iniciativa</small></div>
      <div><b>${i(n.speed.replace(" metros"," m"))}</b><small>Deslocamento</small></div>
      <div><b>${n.passivePerception}</b><small>Perc. passiva</small></div>
    </div>
    <div class="row"><label for="ac" style="margin:0">Classe de Armadura</label>
      <input id="ac" type="number" inputmode="numeric" style="width:6rem" value="${e.build.ac??10}" /></div>
    <div class="row"><label for="hpmax" style="margin:0">PV Máximo</label>
      <input id="hpmax" type="number" inputmode="numeric" min="1" style="width:6rem" value="${e.state.hp.max}" /></div>
    <p class="empty-note" style="margin:0">O PV máximo pode ser ajustado à mão — use o valor rolado no dado com o Mestre. Ao subir de nível, o app só soma o ganho médio da regra a esse valor.</p>
  </section>

  ${Va(e,n,a)}

  <section class="card stack"><h2>Personalização de espécie/classe</h2>
    <p class="empty-note" style="margin:0">Pra jogar uma espécie ou classe alternativa/homebrew, dê um nome personalizado aqui — os números continuam vindo da opção escolhida na criação (${i(((m=n.sp)==null?void 0:m.nome)||"")} / ${i(((g=n.cls)==null?void 0:g.nome)||"")}).</p>
    <div class="row">
      <div class="grow"><label for="pz-sp">Nome da espécie</label>
        <input id="pz-sp" maxlength="60" placeholder="${i(((l=n.sp)==null?void 0:l.nome)||"")}" value="${i(e.build.speciesNomePersonalizado||"")}" /></div>
      <div class="grow"><label for="pz-cl">Nome da classe</label>
        <input id="pz-cl" maxlength="60" placeholder="${i(((y=n.cls)==null?void 0:y.nome)||"")}" value="${i(o.nomePersonalizado||"")}" /></div>
    </div>
    <div><label for="pz-note">Notas da personalização</label>
      <textarea id="pz-note" rows="2" placeholder="O que muda nessa versão (aparência, traços trocados…)">${i(e.build.customNote||"")}</textarea></div>
  </section>

  <section class="card stack"><h2>Atributos e Salvaguardas</h2>
    <p class="empty-note">Toque em <b>Salvaguarda</b> para marcar/desmarcar proficiência.</p>
    <div class="abil2">${T.map(([k,v])=>{const p=(e.build.saveProfs||[]).includes(k);return`<div class="abcard">
        <small>${v}</small><b>${j(n.mods[k])}</b>
        <input class="abscore" data-score="${k}" type="number" inputmode="numeric" min="1" max="30" value="${e.build.abilities[k]}" aria-label="Valor de ${v}" />
        <button class="savebtn ${p?"on":""}" data-save="${k}" aria-pressed="${p}">
          <span class="dot ${p?"on":""}"></span>Salvaguarda <b>${j(n.saves[k])}</b></button>
      </div>`}).join("")}</div>
  </section>

  <section class="card"><h2>Perícias</h2><p class="empty-note">Toque para alternar: sem proficiência → proficiente (●) → especialista (◆).</p>
    <div class="skills">${n.skills.map(k=>`<button data-skill="${k.id}" aria-pressed="${k.prof||k.exp}">
      <span class="row" style="flex-wrap:nowrap"><span class="dot ${k.exp?"exp":k.prof?"on":""}"></span>${k.nome} <small class="muted">(${k.ab.toUpperCase()})</small></span><b>${j(k.bonus)}</b></button>`).join("")}</div>
  </section>

  <section class="card stack"><h2>Treinamento e Proficiências</h2>
    ${[["armaduras","Treinamento com Armaduras"],["armas","Proficiência com Armas"],["ferramentas","Proficiência com Ferramentas"],["idiomas","Idiomas"]].map(([k,v])=>`<div><label for="tr-${k}">${v}</label><textarea id="tr-${k}" data-train="${k}" rows="2">${i(u[k]||"")}</textarea></div>`).join("")}
  </section>

  <section class="card stack"><h2>Anotações</h2>
    <textarea id="notes" rows="5" placeholder="Aliados, pistas, história…">${i(e.notes)}</textarea></section>

  <section class="card stack"><h2>Mesa</h2>
    ${e.campaignId?`<p style="margin:0">Jogando em <b>${i(e.campaignName)}</b>. O Mestre dessa mesa pode ver e alterar esta ficha.</p>
         <button class="btn" id="leave-table">Sair da mesa</button>`:`<p class="muted" style="margin:0">Esta ficha não está em nenhuma mesa. Só você pode vê-la.</p>
         <form class="row" id="join"><input id="code" class="grow" autocomplete="off" autocapitalize="characters" placeholder="Código (ABC-123)" aria-label="Código da mesa" required style="width:auto" />
         <button class="btn primary">Entrar</button></form>`}
  </section>
  <section class="card stack"><h2>Conta</h2>
    <div class="row">${a.accountChip(r.user)}</div>
    <button class="btn danger small" id="delete">Apagar personagem</button>
  </section>`}let ma={};const P=(e,n,a=600)=>{clearTimeout(ma[e]),ma[e]=setTimeout(n,a)};function Qa(e,n,a){const r=a.S,t=a.app,o=e.build.classes[0].level;b("#lvlup").onclick=()=>n.level<20&&a.save(K(e,r.comp,o+1)).then(()=>a.toast(`Nível ${o+1}! PV máximo, Dados de Vida e espaços atualizados.`)),b("#lvldown").onclick=()=>o>1&&a.save(K(e,r.comp,o-1)),b("#subclass")&&(b("#subclass").onchange=s=>a.save(K(e,r.comp,o,s.target.value||null))),Ra(e,n,a),b("#pz-sp").oninput=s=>P("pzsp",()=>a.save({"build.speciesNomePersonalizado":s.target.value.trim()||null})),b("#pz-cl").oninput=s=>P("pzcl",()=>{const u=e.build.classes.map((d,h)=>h===0?{...d,nomePersonalizado:b("#pz-cl").value.trim()||null}:d);a.save({"build.classes":u})}),b("#pz-note").oninput=s=>P("pznote",()=>a.save({"build.customNote":s.target.value})),b("#ac").onchange=s=>a.save({"build.ac":Number(s.target.value)||10}),b("#hpmax").onchange=s=>{const u=Math.max(1,Number(s.target.value)||1);a.save({"state.hp":{...e.state.hp,max:u,current:Math.min(e.state.hp.current,u)}})},t.querySelectorAll("[data-score]").forEach(s=>s.onchange=()=>{const u=Math.max(1,Math.min(30,Number(s.value)||10)),d=s.dataset.score,h={[`build.abilities.${d}`]:u};d==="con"&&(h["state.hp"]={...e.state.hp,...Aa(e,r.comp,u)}),a.save(h)}),t.querySelectorAll("[data-save]").forEach(s=>s.onclick=()=>{const u=s.dataset.save,d=e.build.saveProfs||[];a.save({"build.saveProfs":d.includes(u)?d.filter(h=>h!==u):[...d,u]})}),t.querySelectorAll("[data-skill]").forEach(s=>s.onclick=()=>{const u=s.dataset.skill,d=e.build.skillProfs||[],h=e.build.expertise||[];h.includes(u)?a.save({"build.expertise":h.filter(m=>m!==u),"build.skillProfs":d.filter(m=>m!==u)}):d.includes(u)?a.save({"build.expertise":[...h,u]}):a.save({"build.skillProfs":[...d,u]})}),t.querySelectorAll("[data-train]").forEach(s=>s.oninput=()=>P("tr"+s.dataset.train,()=>a.save({[`build.training.${s.dataset.train}`]:s.value}))),b("#notes").oninput=s=>P("notes",()=>a.save({notes:s.target.value})),a.bindLogout(r.be,t),b("#join")&&(b("#join").onsubmit=async s=>{s.preventDefault();try{const u=await r.be.joinByCode(b("#code").value);await r.be.updateCharacter(r.chId,{campaignId:u.id,campaignName:u.name}),a.toast(`${e.name} entrou na mesa ${u.name}.`)}catch(u){a.toast(u.message)}}),b("#leave-table")&&(b("#leave-table").onclick=()=>{a.confirmTwice("#leave-table","Toque de novo para confirmar")&&a.save({campaignId:null,campaignName:null})}),b("#delete").onclick=async()=>{if(!a.confirmTwice("#delete",`Toque de novo para apagar ${e.name}`))return;const s=r.chId;await r.be.deleteCharacter(s),a.showHome()}}function Ua(e,n,a){const r=a.S,t=r.comp,o=r.ui,s=new Set(n.bonusSpells||[]),u=(e.build.spellsKnown||[]).filter(c=>!s.has(c)),d=e.build.spellsPrepared||[],h=[...s].map(c=>t.byId.spells[c]).filter(Boolean).sort((c,q)=>c.nivel-q.nivel||c.nome.localeCompare(q.nome)),m=Object.entries(e.state.spellSlots||{}),g=Object.entries(e.state.pactSlots||{}),l=[...m,...g].reduce((c,[q,C])=>C.max>0?Math.max(c,Number(q)):c,0),y=n.casters.length>0,k=u.map(c=>t.byId.spells[c]).filter(Boolean).sort((c,q)=>c.nivel-q.nivel||c.nome.localeCompare(q.nome)),v={};k.forEach(c=>{var q;return(v[q=c.nivel]||(v[q]=[])).push(c)});const p=e.build.classes.map(c=>c.classId),S=n.classesInfo.map(c=>{var q;return(q=c.cls)==null?void 0:q.nome}).filter(Boolean).join(" + "),f=n.spellCaps||{},A=k.filter(c=>c.nivel===0).length,w=k.filter(c=>c.nivel>0).length,sa=d.length,ga=f.cantrips!==null&&A>=f.cantrips,ya=f.known!==null&&w>=f.known,wa=f.prepared!==null&&sa>=f.prepared,ta=z(o.spellQ);let V=t.spells.filter(c=>!u.includes(c.id)&&!s.has(c.id)&&(!o.spellMine||!n.casters.length||c.classes.some(q=>p.includes(q)))&&(o.spellLvl==="all"||String(c.nivel)===o.spellLvl)&&(!ta||z(c.nome).includes(ta)));const la=V.length;V=V.slice(0,L);const ka=c=>(c.nivel===0?ga:ya)?`<button class="btn small" data-learnfull="${c.nivel===0?"truque":"magia"}" aria-label="Limite atingido">+</button>`:Z("data-learn",c.id,"Adicionar "+i(c.nome)),Sa=c=>{const q=d.includes(c.id);return!q&&wa?'<button class="btn small" data-prepfull="1" aria-label="Limite de magias preparadas atingido">Preparar</button>':`<button class="btn small" data-prep="${c.id}">${q?"✓ Preparada":"Preparar"}</button>`},na=(c,q)=>`
    <div class="muted" style="font-size:.85rem">${i(c.escola)} · ${i(c.tempo)} · ${i(c.alcance)}<br>${i(c.componentes)} · ${i(c.duracao)}</div>
    ${M(c.desc)}
    <div class="row">${q?`${c.nivel>0?Sa(c):""}
         ${c.concentracao?`<button class="btn small" data-conc="${c.id}">${e.state.concentration===c.id?"Encerrar concentração":"Concentrar"}</button>`:""}
         <button class="btn small" data-forget="${c.id}">Remover</button>`:""}</div>`,U=c=>[c.concentracao?"C":"",c.ritual?"R":""].filter(Boolean).map(q=>`<span class="chip">${q}</span>`).join(" "),_=(c,q,C)=>C===null?"":`<span class="lvl-badge">${q}/${C} ${c}</span>`,qa=c=>`
    <div class="muted" style="font-size:.85rem">${i(c.escola)} · ${i(c.tempo)} · ${i(c.alcance)}<br>${i(c.componentes)} · ${i(c.duracao)}</div>
    ${M(c.desc)}
    ${c.concentracao?`<div class="row"><button class="btn small" data-conc="${c.id}">${e.state.concentration===c.id?"Encerrar concentração":"Concentrar"}</button></div>`:""}`;return`
  ${n.casters.length?`<section class="card stack">${n.casters.map(c=>`<div class="stats" style="grid-template-columns:repeat(3,1fr)">
    <div><b>${c.dc}</b><small>CD (${i(c.nome)})</small></div><div><b>${j(c.atk)}</b><small>Ataque mágico</small></div>
    <div><b>${$a[c.atributoConjuracao].slice(0,3)}</b><small>Atributo</small></div></div>`).join("")}</section>`:""}
  ${m.length?`<section class="card slots"><h2>Espaços de magia${n.multiclass?" (combinados)":""}</h2>
    ${m.map(([c,q])=>`<div class="lvl"><span>${c}º</span>${Array.from({length:q.max},(C,x)=>`<button class="slotpip ${x<q.used?"used":""}" data-slot="${c}" data-i="${x}" aria-label="Espaço de ${c}º círculo ${x+1}${x<q.used?", gasto":""}"></button>`).join("")}</div>`).join("")}
  </section>`:""}
  ${g.length?`<section class="card slots"><h2>Magia de Pacto</h2>
    ${g.map(([c,q])=>`<div class="lvl"><span>${c}º</span>${Array.from({length:q.max},(C,x)=>`<button class="slotpip ${x<q.used?"used":""}" data-pactslot="${c}" data-i="${x}" aria-label="Espaço de pacto ${x+1}${x<q.used?", gasto":""}"></button>`).join("")}</div>`).join("")}
  </section>`:""}
  ${h.length?`<section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Magias da Subclasse</h2><span class="lvl-badge">sempre preparadas</span></div>
    <p class="empty-note" style="margin:0">Concedidas automaticamente pela subclasse — não contam no limite de magias conhecidas/preparadas, mas ainda gastam um espaço de magia ao conjurar.</p>
    <div class="stack">${h.map(c=>N(`${i(c.nome)} ${U(c)}`,R(c.nivel),qa(c),!1,`data-k="b-${c.id}"`)).join("")}</div>
  </section>`:""}
  ${f.cantrips!==null||f.known!==null||f.prepared!==null?`<section class="card stack"><h2>Limites de magias (regra 2024)</h2>
    <div class="row" style="flex-wrap:wrap;gap:.4rem">${_("truques",A,f.cantrips)}${_("magias conhecidas",w,f.known)}${_("preparadas",sa,f.prepared)}</div>
    <details class="entry"><summary><span class="t">Exceção manual (magia extra de livro/pergaminho…)</span></summary><div class="body stack">
      <p class="empty-note" style="margin:0">Some ao limite oficial acima. Use quando o personagem aprendeu algo fora da regra normal.</p>
      <div class="row" style="flex-wrap:wrap">
        <div class="grow"><label for="extra-cantrips">Truques extras</label><input id="extra-cantrips" type="number" min="0" value="${e.build.extraCantrips||0}" /></div>
        <div class="grow"><label for="extra-spells">Magias extras</label><input id="extra-spells" type="number" min="0" value="${e.build.extraSpells||0}" /></div>
        ${f.invocacoes!==null?`<div class="grow"><label for="extra-invoc">Invocações extras</label><input id="extra-invoc" type="number" min="0" value="${e.build.extraInvocations||0}" /></div>`:""}
      </div>
      <div><label for="extra-note">Motivo (opcional)</label>
        <textarea id="extra-note" rows="2" placeholder="Ex.: aprendeu com um pergaminho encontrado na masmorra">${i(e.build.extraSpellsNote||"")}</textarea></div>
    </div></details>
  </section>`:""}
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Minhas magias</h2><span class="lvl-badge">${d.length} preparada(s)</span></div>
    ${Object.keys(v).length?Object.entries(v).map(([c,q])=>`<h3 style="margin:.6rem 0 .2rem;color:var(--muted)">${R(Number(c))}</h3>
      <div class="stack" style="--gap:.4rem">${q.map(C=>N(`${C.nivel>0&&d.includes(C.id)?"✓ ":""}${i(C.nome)} ${U(C)}`,R(C.nivel),na(C,!0),!1,`data-k="m-${C.id}"`)).join("")}</div>`).join(""):'<p class="empty-note">Nenhuma magia ainda. Adicione pela biblioteca abaixo.</p>'}
  </section>
  <section class="card stack"><h2>Biblioteca de magias</h2>
    <input id="spellq" type="search" placeholder="Buscar magia pelo nome…" value="${i(o.spellQ)}" aria-label="Buscar magia" />
    <div class="filters">${["all","0","1","2","3","4","5","6","7","8","9"].map(c=>{const q=c==="all"||(c==="0"?y:y&&Number(c)<=l);return`<button data-flvl="${c}" aria-pressed="${o.spellLvl===c}" class="${q?"":"unavail"}" ${q?"":'title="Ainda não disponível no seu nível"'}>${c==="all"?"Todas":c==="0"?"Truques":c+"º"}</button>`}).join("")}</div>
    ${y?`<p class="empty-note" style="margin:0">Seu nível permite conjurar ${l===0?"só truques":`truques e magias até ${l}º círculo`}. Os demais círculos aparecem esmaecidos até você subir de nível.</p>`:""}
    ${S?`<label class="chk"><input type="checkbox" id="spellmine" ${o.spellMine?"checked":""}> Só a lista de ${i(S)}</label>`:""}
    <p class="empty-note">${la} magia(s)${la>L?` — mostrando ${L}, refine a busca`:""}.</p>
    <div class="stack">${V.map(c=>N(`${i(c.nome)} ${U(c)}`,R(c.nivel),na(c,!1),!1,`data-k="l-${c.id}"`,ka(c))).join("")}</div>
  </section>`}function _a(e,n,a){const r=a.S,t=a.app,o=r.ui;t.querySelectorAll("[data-slot]").forEach(s=>s.onclick=()=>{const u=s.dataset.slot,d=Number(s.dataset.i),h=e.state.spellSlots[u];a.save({[`state.spellSlots.${u}.used`]:d<h.used?d:d+1})}),t.querySelectorAll("[data-pactslot]").forEach(s=>s.onclick=()=>{const u=s.dataset.pactslot,d=Number(s.dataset.i),h=e.state.pactSlots[u];a.save({[`state.pactSlots.${u}.used`]:d<h.used?d:d+1})}),b("#spellq").oninput=s=>{o.spellQ=s.target.value,P("sq",a.render,250)},t.querySelectorAll("[data-flvl]").forEach(s=>s.onclick=()=>{o.spellLvl=s.dataset.flvl,a.render()}),b("#spellmine")&&(b("#spellmine").onchange=s=>{o.spellMine=s.target.checked,a.render()}),t.querySelectorAll("[data-learn]").forEach(s=>s.onclick=()=>a.save({"build.spellsKnown":[...e.build.spellsKnown||[],s.dataset.learn]})),t.querySelectorAll("[data-learnfull]").forEach(s=>s.onclick=()=>I(`Limite de ${s.dataset.learnfull==="truque"?"truques conhecidos":"magias conhecidas"} atingido. Use a exceção manual acima se for o caso.`)),t.querySelectorAll("[data-forget]").forEach(s=>s.onclick=()=>a.save({"build.spellsKnown":(e.build.spellsKnown||[]).filter(u=>u!==s.dataset.forget),"build.spellsPrepared":(e.build.spellsPrepared||[]).filter(u=>u!==s.dataset.forget)})),t.querySelectorAll("[data-prep]").forEach(s=>s.onclick=()=>{const u=e.build.spellsPrepared||[],d=s.dataset.prep;a.save({"build.spellsPrepared":u.includes(d)?u.filter(h=>h!==d):[...u,d]})}),t.querySelectorAll("[data-prepfull]").forEach(s=>s.onclick=()=>I("Limite de magias preparadas atingido. Use a exceção manual acima se for o caso.")),b("#extra-cantrips")&&(b("#extra-cantrips").onchange=s=>a.save({"build.extraCantrips":Math.max(0,Number(s.target.value)||0)})),b("#extra-spells")&&(b("#extra-spells").onchange=s=>a.save({"build.extraSpells":Math.max(0,Number(s.target.value)||0)})),b("#extra-invoc")&&(b("#extra-invoc").onchange=s=>a.save({"build.extraInvocations":Math.max(0,Number(s.target.value)||0)})),b("#extra-note")&&(b("#extra-note").oninput=s=>P("extranote",()=>a.save({"build.extraSpellsNote":s.target.value}))),t.querySelectorAll("[data-conc]").forEach(s=>s.onclick=()=>a.save({"state.concentration":e.state.concentration===s.dataset.conc?null:s.dataset.conc})),F(t,"spells")}const W={};function F(e,n){e.querySelectorAll("summary .addbtn").forEach(r=>r.addEventListener("click",t=>t.preventDefault()));const a=W[n]||(W[n]=new Set);e.querySelectorAll("details.entry").forEach((r,t)=>{var s;const o=r.dataset.k||((s=r.querySelector("summary .t"))==null?void 0:s.textContent)||t;a.has(o)&&(r.open=!0),r.addEventListener("toggle",()=>r.open?a.add(o):a.delete(o))})}function Ka(e,n,a,r){var v;const{cls:t,sub:o,level:s,classId:u,nomePersonalizado:d}=n;if(!t)return`<section class="card">Classe "${i(u)}" não encontrada no compêndio.</section>`;const h=d||t.nome,m=t.caracteristicas||[],g=m.filter(p=>p.nivel<=s),l=m.filter(p=>p.nivel>s),y=e.build.opcoes||[],k=u==="bruxo"?((v=a.spellCaps)==null?void 0:v.invocacoes)??null:null;return`
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Características de ${i(h)}</h2><span class="lvl-badge">nível ${s}</span></div>
    ${d?`<p class="empty-note" style="margin:0">Usa as regras de ${i(t.nome)}.</p>`:""}
    ${g.length?g.map(p=>N(i(p.nome),`Nível ${p.nivel}`,M(p.desc))).join(""):'<p class="empty-note">Importe o compêndio completo para ver as características.</p>'}
    ${l.length?`<details class="entry"><summary><span class="t muted">Próximos níveis (${l.length})</span></summary><div class="body stack">
      ${l.map(p=>N(i(p.nome),`Nível ${p.nivel}`,M(p.desc))).join("")}</div></details>`:""}
  </section>
  ${(t.opcoes||[]).map(p=>{const S=u==="bruxo"&&/Invoca/i.test(p.titulo),f=S?p.itens.filter(w=>y.includes(w.id)).length:null,A=S&&k!==null&&f>=k;return`<section class="card stack"><div class="sectiontitle"><h2 style="margin:0">${i(p.titulo.replace("Opções de ",""))} (${i(h)})</h2>${S&&k!==null?`<span class="lvl-badge">${f}/${k}</span>`:""}</div>
    ${p.itens.filter(w=>y.includes(w.id)).map(w=>N("✓ "+i(w.nome),"",M(w.desc)+`<button class="btn small" data-unop="${w.id}">Remover</button>`)).join("")||'<p class="empty-note">Nenhuma escolhida.</p>'}
    <details class="entry"><summary><span class="t">Escolher ${i(p.titulo.replace("Opções de ","").toLowerCase())}</span><span class="lvl-badge">${p.itens.length}</span></summary><div class="body stack">
      ${p.itens.filter(w=>!y.includes(w.id)).map(w=>N(i(w.nome),"",M(w.desc),!1,`data-k="o-${u}-${w.id}"`,A?'<button class="btn small" data-opfull="1" aria-label="Limite de invocações atingido">+</button>':Z("data-op",w.id,"Escolher "+i(w.nome)))).join("")}
    </div></details></section>`}).join("")}
  <section class="card stack"><h2>Subclasse de ${i(h)}${o?": "+i(o.nome):""}</h2>
    ${o?(o.caracteristicas||[]).map(p=>N(`${p.nivel>s?"🔒 ":""}${i(p.nome)}`,`Nível ${p.nivel}`,M(p.desc))).join(""):`<p class="empty-note">${s<3?"A subclasse é escolhida no nível 3.":"Escolha a subclasse na aba Ficha (ou em Multiclasse, para uma classe secundária)."}</p>
         ${(t.subclasses||[]).map(p=>N(i(p.nome),"",M(p.intro))).join("")}`}
  </section>`}function Ga(e,n,a){const r=n.sp,t=n.bg,o=n.speciesLabel||(r==null?void 0:r.nome)||"espécie";return`
  ${n.classesInfo.map(s=>Ka(e,s,n)).join("")}
  <section class="card stack"><h2>Traços de ${i(o)}</h2>
    ${r&&o!==r.nome?`<p class="empty-note" style="margin:0">Usa as regras de ${i(r.nome)}.</p>`:""}
    <p class="empty-note">${i((r==null?void 0:r.tipo)||"")} · ${i((r==null?void 0:r.tamanho)||"")} · Deslocamento ${i((r==null?void 0:r.deslocamento)||"")}</p>
    ${((r==null?void 0:r.tracos)||[]).filter(s=>s.nome!=="Detalhes").map(s=>N(i(s.nome),"",M(s.desc))).join("")||'<p class="empty-note">Sem traços no compêndio.</p>'}
  </section>
  ${t?`<section class="card stack"><h2>Antecedente: ${i(t.nome)}</h2>
    <p style="margin:0;font-size:.92rem"><b>Atributos:</b> ${t.atributos.map(s=>$a[s]).join(", ")}<br>
    <b>Talento:</b> ${i(t.talento)}<br><b>Ferramenta:</b> ${i(t.ferramenta)}<br><b>Equipamento:</b> ${i(t.equipamento)}</p></section>`:""}
  ${e.build.customNote?`<section class="card stack"><h2>Notas da personalização</h2><p style="margin:0;white-space:pre-wrap">${i(e.build.customNote)}</p></section>`:""}`}function Wa(e,n,a){const r=a.app,t=e.build.opcoes||[];r.querySelectorAll("[data-op]").forEach(o=>o.onclick=()=>a.save({"build.opcoes":[...t,o.dataset.op]})),r.querySelectorAll("[data-unop]").forEach(o=>o.onclick=()=>a.save({"build.opcoes":t.filter(s=>s!==o.dataset.unop)})),r.querySelectorAll("[data-opfull]").forEach(o=>o.onclick=()=>I("Limite de invocações místicas atingido. Use a exceção manual na aba Magias se for o caso.")),F(r,"classe")}const Ya=["Origem","Geral","Estilo de Luta","Dádiva Épica"];function Ja(e,n,a){const r=a.S,t=r.comp,o=r.ui,s=e.build.feats||[],u=z(o.featQ);let d=t.feats.filter(m=>(m.repetivel||!s.some(g=>g.id===m.id))&&(o.featCat==="all"||m.categoria===o.featCat)&&(!u||z(m.nome).includes(u)||z(m.prereq).includes(u)));const h=d.length;return d=d.slice(0,L),`
  <section class="card stack"><h2>Meus talentos</h2>
    ${s.length?s.map((m,g)=>{const l=t.byId.feats[m.id];return N(i((l==null?void 0:l.nome)||m.id),i(m.origem||(l==null?void 0:l.categoria)||""),(l?`<p class="empty-note">${i(l.categoria)}${l.prereq?" · Pré-requisito: "+i(l.prereq):""}</p>${M(l.desc)}`:'<p class="empty-note">Talento fora do compêndio.</p>')+`<button class="btn small" data-unfeat="${g}">Remover</button>`)}).join(""):'<p class="empty-note">Nenhum talento. Seu antecedente concede um talento de Origem.</p>'}
  </section>
  <section class="card stack"><h2>Biblioteca de talentos</h2>
    <input id="featq" type="search" placeholder="Buscar talento…" value="${i(o.featQ)}" aria-label="Buscar talento" />
    <div class="filters">${["all",...Ya].map(m=>`<button data-fcat="${m}" aria-pressed="${o.featCat===m}">${m==="all"?"Todos":m}</button>`).join("")}</div>
    <p class="empty-note">${h} talento(s)${h>L?` — mostrando ${L}`:""}.</p>
    ${d.map(m=>N(i(m.nome),i(m.categoria),`${m.prereq?`<p class="empty-note">Pré-requisito: ${i(m.prereq)}</p>`:""}${M(m.desc)}`,!1,`data-k="f-${m.id}"`,Z("data-feat",m.id,"Adicionar "+i(m.nome)))).join("")}
    ${t.feats.length?"":'<p class="empty-note">Importe o compêndio completo para usar a biblioteca de talentos.</p>'}
  </section>`}function Xa(e,n,a){const r=a.S,t=a.app,o=e.build.feats||[];b("#featq").oninput=s=>{r.ui.featQ=s.target.value,P("fq",a.render,250)},t.querySelectorAll("[data-fcat]").forEach(s=>s.onclick=()=>{r.ui.featCat=s.dataset.fcat,a.render()}),t.querySelectorAll("[data-feat]").forEach(s=>s.onclick=()=>{a.save({"build.feats":[...o,{id:s.dataset.feat,origem:"Escolhido"}]}),a.toast("Talento adicionado. Aplique aumentos de atributo na aba Ficha, se houver.")}),t.querySelectorAll("[data-unfeat]").forEach(s=>s.onclick=()=>a.save({"build.feats":o.filter((u,d)=>d!==Number(s.dataset.unfeat))})),F(t,"feats")}function Za(e,n,a){const r=a.S,t=r.comp,o=r.ui,s=e.inventory||[],u=e.coins||{},d=z(o.itemQ),h=d.length>=2?t.items.filter(l=>z(l.nome).includes(d)).slice(0,25):[],m=Math.min(100,Math.round(n.weight/n.carry*100)),g=l=>l.tipo==="arma"?`${i(l.dano)} · ${i(l.propriedades)} · Maestria: ${i(l.maestria)}`:l.tipo==="armadura"?`CA ${i(l.ca)}${l.forca&&l.forca!=="—"?" · "+i(l.forca):""}${l.furtividade==="Desvantagem"?" · Desv. Furtividade":""}`:"";return`
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Bolsa de moedas</h2><span class="lvl-badge">≈ ${n.coinsGP.toLocaleString("pt-BR",{maximumFractionDigits:2})} PO</span></div>
    <div class="coins">${oa.map(([l,y,k])=>`<label class="coin coin-${l}"><span>${y}</span>
      <input type="number" inputmode="numeric" min="0" data-coin="${l}" value="${Number(u[l])||0}" aria-label="${k}" /></label>`).join("")}</div>
    <form class="row" id="coinop">
      <input id="coinamt" type="number" inputmode="numeric" min="1" placeholder="Qtd." style="width:5.5rem" aria-label="Quantidade" />
      <select id="coinkind" style="width:5.5rem" aria-label="Moeda">${oa.map(([l,y])=>`<option value="${l}" ${l==="po"?"selected":""}>${y}</option>`).join("")}</select>
      <button class="btn heal small" data-cop="+">Receber</button><button class="btn danger small" data-cop="-">Gastar</button>
    </form>
  </section>
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Inventário</h2><span class="lvl-badge">${n.weight.toLocaleString("pt-BR",{maximumFractionDigits:1})} / ${n.carry} kg</span></div>
    <div class="hpbar" aria-hidden="true"><div class="cur ${m>100?"low":m>75?"mid":""}" style="width:${m}%"></div></div>
    ${s.length?s.map(l=>{const y=l.itemId?t.byId.weapons[l.itemId]||t.byId.armor[l.itemId]||t.byId.gear[l.itemId]:null;return N(`${l.equipado?"🛡️ ":""}${i(l.nome)}${Number(l.qtd)>1?` <span class="muted">×${l.qtd}</span>`:""}`,i(l.peso||""),`${y?`<p class="empty-note">${g(y)}${y.custo?" · "+i(y.custo):""}</p>${y.desc?M(y.desc):""}`:""}
        <div class="row">
          <button class="btn small" data-qty="${l.uid}" data-d="-1">−</button><b>${l.qtd}</b><button class="btn small" data-qty="${l.uid}" data-d="1">+</button>
          <label class="chk"><input type="checkbox" data-equip="${l.uid}" ${l.equipado?"checked":""}> Equipado</label>
          <label class="chk"><input type="checkbox" data-attune="${l.uid}" ${l.sintonizado?"checked":""}> Sintonizado</label>
        </div>
        <input data-inote="${l.uid}" id="inote-${l.uid}" value="${i(l.notas||"")}" placeholder="Notas (cargas, efeitos…)" aria-label="Notas do item" />
        <button class="btn small danger" data-rmitem="${l.uid}">Remover item</button>`,!1,`data-k="i-${l.uid}"`)}).join(""):'<p class="empty-note">Inventário vazio.</p>'}
  </section>
  <section class="card stack"><h2>Adicionar item</h2>
    <input id="itemq" type="search" placeholder="Buscar armas, armaduras, equipamento… (2+ letras)" value="${i(o.itemQ)}" aria-label="Buscar item" />
    ${h.map(l=>`<div class="libitem"><div class="info"><b>${i(l.nome)}</b><small>${i(l.custo||"")}${l.peso?" · "+i(l.peso):""} ${g(l)?"· "+g(l):""}</small></div>
      <button class="btn small primary" data-additem="${l.id}">+</button></div>`).join("")}
    ${d.length>=2&&!h.length?'<p class="empty-note">Nada encontrado — use o item personalizado abaixo.</p>':""}
    <form class="row" id="custom">
      <input id="cname" class="grow" placeholder="Item personalizado" required style="width:auto" aria-label="Nome do item" />
      <input id="cweight" placeholder="kg" inputmode="decimal" style="width:4.5rem" aria-label="Peso em kg" />
      <button class="btn small">Adicionar</button>
    </form>
  </section>`}function ae(e,n,a){const r=a.S,t=a.app,o=r.comp,s=e.inventory||[],u={pc:0,pp:0,pe:0,po:0,pl:0,...e.coins||{}},d=m=>a.save({inventory:m});t.querySelectorAll("[data-coin]").forEach(m=>m.onchange=()=>a.save({coins:{...u,[m.dataset.coin]:Math.max(0,Number(m.value)||0)}})),t.querySelectorAll("[data-cop]").forEach(m=>m.onclick=g=>{g.preventDefault();const l=Number(b("#coinamt").value),y=b("#coinkind").value;if(!l)return a.toast("Digite a quantidade.");const k=u[y]+(m.dataset.cop==="+"?l:-l);if(k<0)return a.toast(`Não há ${l} ${y.toUpperCase()} suficientes.`);a.save({coins:{...u,[y]:k}})}),b("#itemq").oninput=m=>{r.ui.itemQ=m.target.value,P("iq",a.render,250)},t.querySelectorAll("[data-additem]").forEach(m=>m.onclick=()=>{const g=o.items.find(y=>y.id===m.dataset.additem),l=s.find(y=>y.itemId===g.id);d(l?s.map(y=>y===l?{...y,qtd:Number(y.qtd)+1}:y):[...s,{uid:ua(),itemId:g.id,nome:g.nome,qtd:1,peso:g.peso||"",equipado:!1,sintonizado:!1,notas:""}]),a.toast(`${g.nome} adicionado.`)}),b("#custom").onsubmit=m=>{m.preventDefault();const g=b("#cweight").value.trim();d([...s,{uid:ua(),itemId:null,nome:b("#cname").value.trim(),qtd:1,peso:g?`${g} kg`:"",equipado:!1,sintonizado:!1,notas:""}])};const h=(m,g)=>d(s.map(l=>l.uid===m?g(l):l));t.querySelectorAll("[data-qty]").forEach(m=>m.onclick=()=>h(m.dataset.qty,g=>({...g,qtd:Math.max(0,Number(g.qtd)+Number(m.dataset.d))}))),t.querySelectorAll("[data-equip]").forEach(m=>m.onchange=()=>h(m.dataset.equip,g=>({...g,equipado:m.checked}))),t.querySelectorAll("[data-attune]").forEach(m=>m.onchange=()=>{if(m.checked&&s.filter(g=>g.sintonizado).length>=3)return m.checked=!1,a.toast("Limite de 3 itens sintonizados.");h(m.dataset.attune,g=>({...g,sintonizado:m.checked}))}),t.querySelectorAll("[data-inote]").forEach(m=>m.oninput=()=>P("in"+m.dataset.inote,()=>h(m.dataset.inote,g=>({...g,notas:m.value})))),t.querySelectorAll("[data-rmitem]").forEach(m=>m.onclick=()=>d(s.filter(g=>g.uid!==m.dataset.rmitem))),F(t,"itens")}const ee={ficha:{html:Fa,bind:Qa},magias:{html:Ua,bind:_a},classe:{html:Ga,bind:Wa},talentos:{html:Ja,bind:Xa},itens:{html:Za,bind:ae}},E=b("#app"),$={be:null,comp:null,user:null,chId:null,ch:null,tab:"combate",amount:"",off:[],prevHp:null,ui:{spellQ:"",spellLvl:"all",spellMine:!0,featQ:"",featCat:"all",itemQ:"",libOpen:{}}};function Y(e){if(!$.ch||!e)return;const n=structuredClone($.ch);Object.entries(e).forEach(([a,r])=>Ha(n,a,r)),$.ch=n,O()}const aa=()=>`rpgmesa:last:${$.user.uid}`,Q=()=>{$.off.forEach(e=>e()),$.off=[]},pa=Object.fromEntries(Na.map(([e,n])=>[e,n])),J=Object.fromEntries(T);se().catch(e=>{E.innerHTML=`<div class="wrap"><div class="card">Erro ao iniciar: ${i(e.message)}</div></div>`});async function se(){$.be=await ja(),Ma($.be,E,{title:"Grimório do Aventureiro",subtitle:"Entre com sua conta para acessar seus personagens em qualquer aparelho.",onSignedOut:()=>{Q(),$.ch=null,$.chId=null,$.prevHp=null}},async e=>{$.user=e,E.innerHTML='<p class="muted" style="padding:1rem">Carregando compêndio…</p>',$.comp=await Pa($.be);const n=X.get(aa());n?ea(n):H()})}const ha=()=>$.be.mode==="local"?'<p class="banner">Modo demo: os dados ficam neste navegador. Abra o Escudo em outra aba para testar a sincronização.</p>':"",te=()=>$.comp.completo?"":'<p class="banner">Biblioteca reduzida: o Mestre ainda não importou o compêndio completo no Escudo.</p>';function H(){Q(),$.chId=null,$.ch=null,X.set(aa(),null);let e=!1;$.off.push($.be.watchMyCharacters(n=>{b("#build")||(n.sort((a,r)=>a.name.localeCompare(r.name)),E.innerHTML=`<header class="top"><div class="row"><div class="grow name">Meus personagens</div>
      <a class="btn small" href="./escudo.html" title="Ir para o Escudo do Mestre">🛡️ Escudo</a>${ba($.user)}</div></header>
    <main class="wrap stack">${ha()}${te()}
      ${n.map(a=>`<button class="charbtn" data-open="${a.id}">
        <span><b>${i(a.name)}</b><br><small class="muted">${i(fa(a))}</small></span>
        <span class="chip">${a.campaignName?"🎲 "+i(a.campaignName):"Sem mesa"}</span></button>`).join("")}
      ${n.length?"":'<div class="card"><p style="margin:0">Você ainda não tem personagens. Crie o primeiro abaixo — ele fica salvo na sua conta.</p></div>'}
      <button class="btn primary" id="newchar" style="width:100%">+ Novo personagem</button>
    </main>`,va($.be,E),E.querySelectorAll("[data-open]").forEach(a=>a.onclick=()=>ea(a.dataset.open)),b("#newchar").onclick=()=>le(),!n.length&&!e&&(e=!0))}))}function le(){Q();const e=$.comp,n=[15,14,13,12,10,8];E.innerHTML=`<header class="top"><div class="row"><button class="btn small" id="back" aria-label="Voltar">◀</button><div class="grow name">Novo personagem</div></div></header>
  <main class="wrap stack">
  <form class="stack" id="build">
    <section class="card stack">
      <div><label for="name">Nome</label><input id="name" name="name" required maxlength="40" /></div>
      <div class="row">
        <div class="grow"><label for="species">Espécie</label><select id="species" name="species">
          ${e.species.map(v=>`<option value="${v.id}">${i(v.nome)}</option>`).join("")}</select></div>
        <div style="width:5.5rem"><label for="level">Nível</label><input id="level" name="level" type="number" inputmode="numeric" min="1" max="20" value="1" /></div>
      </div>
      <div><label for="speciesnome">Nome personalizado da espécie (opcional)</label>
        <input id="speciesnome" name="speciesnome" maxlength="60" placeholder="Ex.: Genasi da Terra" /></div>
      <div><label for="class">Classe</label><select id="class" name="class">
        ${e.classes.map(v=>`<option value="${v.id}">${i(v.nome)}</option>`).join("")}</select></div>
      <div><label for="classnome">Nome personalizado da classe (opcional)</label>
        <input id="classnome" name="classnome" maxlength="60" placeholder="Ex.: Arcanista" /></div>
      <p class="muted" style="margin:0;font-size:.85rem">Pra usar uma espécie ou classe alternativa/homebrew que não está na lista, escolha acima a mais parecida em regras — é dela que vêm os números — e dê um nome personalizado aqui, que aparece no lugar do nome oficial em toda a ficha.</p>
      <div><label for="customnote">Notas da personalização (opcional)</label>
        <textarea id="customnote" name="customnote" rows="2" placeholder="O que muda nessa versão (aparência, traços trocados…)"></textarea></div>
      <div id="classinfo"></div>
    </section>
    ${e.backgrounds.length?`<section class="card stack">
      <div><label for="bg">Antecedente</label><select id="bg" name="bg">
        ${e.backgrounds.map(v=>`<option value="${v.id}">${i(v.nome)}</option>`).join("")}</select></div>
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
  </form></main>`,b("#back").onclick=H;const a=b("#build"),r=()=>e.byId.classes[a.class.value],t=()=>{var v,p;return(p=e.byId.backgrounds)==null?void 0:p[(v=a.bg)==null?void 0:v.value]};function o(){var S;const v=r(),p=(S=v.periciasOpcoes)!=null&&S.length?v.periciasOpcoes:[];b("#classinfo").innerHTML=`
      <p class="muted" style="margin:.2rem 0;font-size:.88rem">Dado de Vida d${v.dadoVida} · Salvaguardas: ${(v.salvaguardas||[]).map(f=>J[f]).join(", ")}</p>
      ${p.length?`<div><label>Perícias da classe — escolha ${v.periciasEscolha} <span id="skcount"></span></label>
        <div class="checks">${p.map(f=>`<label class="chk"><input type="checkbox" name="sk" value="${f}"> ${pa[f]}</label>`).join("")}</div></div>`:""}`,a.querySelectorAll("[name=sk]").forEach(f=>f.onchange=s),s()}function s(){var A;const v=r(),p=((A=t())==null?void 0:A.pericias)||[],S=[...a.querySelectorAll("[name=sk]")];S.forEach(w=>{p.includes(w.value)&&(w.checked=!1,w.disabled=!0,w.parentElement.title="Já vem do antecedente")});const f=S.filter(w=>w.checked).length;S.forEach(w=>{p.includes(w.value)||(w.disabled=!w.checked&&f>=v.periciasEscolha)}),b("#skcount")&&(b("#skcount").textContent=`(${f}/${v.periciasEscolha})`)}function u(){const v=t();if(!v)return;const p=e.byId.feats[v.talentoId];b("#bginfo").innerHTML=`
      <p style="margin:.2rem 0;font-size:.9rem"><b>Perícias:</b> ${v.pericias.map(S=>pa[S]).join(", ")}<br>
      <b>Talento:</b> ${i((p==null?void 0:p.nome)||v.talento)}<br><b>Ferramenta:</b> ${i(v.ferramenta)}</p>
      <div class="row">
        <div class="grow"><label for="plus2">+2 em</label><select id="plus2">${v.atributos.map(S=>`<option value="${S}">${J[S]}</option>`).join("")}<option value="all">+1 nos três</option></select></div>
        <div class="grow" id="plus1wrap"><label for="plus1">+1 em</label><select id="plus1">${v.atributos.map((S,f)=>`<option value="${S}" ${f===1?"selected":""}>${J[S]}</option>`).join("")}</select></div>
      </div>
      <details class="entry"><summary><span class="t">Equipamento do antecedente</span></summary><div class="body">${i(v.equipamento)}</div></details>`,b("#plus2").onchange=b("#plus1").onchange=h,h(),s()}function d(){const v=t(),p={};if(!v)return p;const S=b("#plus2").value;if(S==="all")v.atributos.forEach(f=>p[f]=1);else{p[S]=2;const f=b("#plus1").value;f!==S&&(p[f]=(p[f]||0)+1)}return p}function h(){const v=d();b("#plus1wrap")&&(b("#plus1wrap").style.visibility=b("#plus2").value==="all"?"hidden":""),a.querySelectorAll(".abfinal").forEach(p=>{const S=p.dataset.ab,f=Math.min(20,Number(a[S].value)+(v[S]||0));p.textContent=v[S]?`→ ${f} (${j(ra(f))})`:`(${j(ra(f))})`})}const m=27,g={8:0,9:1,10:2,11:3,12:4,13:5,14:7,15:9},l=v=>g[v]??0;let y="array";function k(){const v=y==="buy";if(b("#ab-inputs").innerHTML=T.map(([p,S],f)=>{const A=document.getElementById("ab-"+p),w=A?A.value:v?8:n[f];return`<div><label for="ab-${p}">${S} <b class="abfinal" data-ab="${p}"></b></label>
        <div class="row" style="align-items:center;gap:.4rem;flex-wrap:nowrap">
          ${v?`<button type="button" class="btn small" data-abdown="${p}" aria-label="Diminuir ${S}">−</button>`:""}
          <input id="ab-${p}" name="${p}" type="number" inputmode="numeric" min="${v?8:3}" max="${v?15:20}"
            value="${w}" ${v?'readonly style="width:3.5rem;text-align:center"':""} />
          ${v?`<button type="button" class="btn small" data-abup="${p}" aria-label="Aumentar ${S}">+</button>`:""}
        </div></div>`}).join(""),v){const p=T.reduce((f,[A])=>f+l(Number(a[A].value)),0),S=m-p;b("#abpts").style.display="",b("#abpts").textContent=`${S} de ${m} pontos restantes`,a.querySelectorAll("[data-abup]").forEach(f=>f.onclick=()=>{const A=f.dataset.abup,w=Number(a[A].value);if(!(w>=15)){if(p+(l(w+1)-l(w))>m)return I("Sem pontos suficientes.");a[A].value=w+1,k()}}),a.querySelectorAll("[data-abdown]").forEach(f=>f.onclick=()=>{const A=f.dataset.abdown,w=Number(a[A].value);w<=8||(a[A].value=w-1,k())})}else b("#abpts").style.display="none",T.forEach(([p])=>a[p].oninput=h);h()}E.querySelectorAll("[data-abmode]").forEach(v=>v.onclick=()=>{v.dataset.abmode!==y&&(y=v.dataset.abmode,E.querySelectorAll("[data-abmode]").forEach(p=>p.setAttribute("aria-selected",String(p.dataset.abmode===y))),b("#abmode-help").textContent=y==="buy"?`Compra de pontos: comece com 8 em tudo e gaste os ${m} pontos (custo 9=1, 10=2, 11=3, 12=4, 13=5, 14=7, 15=9). Máximo 15 antes dos bônus do antecedente.`:"Valores base (Array Padrão: 15, 14, 13, 12, 10, 8). Edite livremente, se preferir. O bônus do antecedente é somado automaticamente.",T.forEach(([p],S)=>{const f=document.getElementById("ab-"+p);f&&(f.value=y==="buy"?8:n[S])}),k())}),a.class.onchange=o,a.bg&&(a.bg.onchange=u),o(),u(),k(),a.onsubmit=async v=>{var A;v.preventDefault();const p=d(),S=Object.fromEntries(T.map(([w])=>[w,Math.min(20,Number(a[w].value)+(p[w]||0))])),f=xa({name:a.name.value.trim(),ownerUid:$.user.uid,speciesId:a.species.value,classId:a.class.value,level:Number(a.level.value),abilities:S,backgroundId:((A=a.bg)==null?void 0:A.value)||null,skillProfs:[...a.querySelectorAll("[name=sk]:checked")].map(w=>w.value),speciesNomePersonalizado:a.speciesnome.value.trim()||null,classNomePersonalizado:a.classnome.value.trim()||null,customNote:a.customnote.value.trim()},e);try{ea(await $.be.createCharacter(f))}catch(w){I(w.message)}}}const fa=e=>`${Da(e.build,$.comp)} · ${Ta(e.build,$.comp)}`;function ea(e){Q(),$.chId=e,$.prevHp=null,X.set(aa(),e),$.off.push($.be.watchCharacter(e,n=>{if(!n)return H();const a=$.prevHp;if($.prevHp=n.state.hp.current+n.state.hp.temp,$.ch=n,O(),a!=null&&a!==$.prevHp){const r=b("#hpcard");r==null||r.classList.add($.prevHp<a?"flash-dmg":"flash-heal"),navigator.vibrate&&$.prevHp<a&&navigator.vibrate(80)}}))}const ne=[["combate","❤️","Combate"],["ficha","📜","Ficha"],["magias","✨","Magias"],["classe","🛡️","Traços"],["talentos","⭐","Talentos"],["itens","🎒","Itens"]],D={get S(){return $},app:E,render:()=>O(),save:e=>$.be.updateCharacter($.chId,e).catch(n=>I(n.message)),toast:I,showHome:()=>H(),confirmTwice:oe,accountChip:ba,bindLogout:va};function O(){if(za(O))return;const e=$.ch,n=Ba(e,$.comp),a=document.activeElement,r=a==null?void 0:a.id,t=a&&"selectionStart"in a?[a.selectionStart,a.selectionEnd]:null,o=window.scrollY,s={combate:{html:ce,bind:re},...ee},u=s[$.tab]||s.combate;if(E.innerHTML=`
    <header class="top">
      <div class="row"><button class="btn small" id="home" aria-label="Meus personagens">◀</button>
        <div class="grow"><div class="name">${i(e.name)}</div>
        <div class="mini"><span>${i(fa(e))}</span>${e.campaignName?`<span>🎲 ${i(e.campaignName)}</span>`:""}</div></div>
        <div class="mini"><span>CA <b>${e.build.ac??10}</b></span><span>PV <b>${e.state.hp.current}/${e.state.hp.max}</b></span></div>
        <a class="btn small" href="./escudo.html" title="Ir para o Escudo do Mestre">🛡️</a></div>
    </header>
    <main class="wrap stack">${ha()}${u.html(e,n,D)}</main>
    <nav class="tabs" role="tablist">${ne.map(([d,h,m])=>`<button role="tab" aria-selected="${$.tab===d}" data-tab="${d}"><span class="ico" aria-hidden="true">${h}</span>${m}</button>`).join("")}</nav>`,E.querySelectorAll("[data-tab]").forEach(d=>d.onclick=()=>{$.tab=d.dataset.tab,O(),window.scrollTo(0,0)}),b("#home").onclick=H,u.bind(e,n,D),window.scrollTo(0,o),r){const d=document.getElementById(r);if(d&&(d.focus({preventScroll:!0}),t&&"setSelectionRange"in d))try{d.setSelectionRange(...t)}catch{}}}function oe(e,n){const a=b(e);if(a.dataset.armed)return!0;a.dataset.armed="1";const r=a.textContent;return a.textContent=n,setTimeout(()=>{a.isConnected&&(delete a.dataset.armed,a.textContent=r)},3e3),!1}function ie(e,n){return e.length?`<section class="card stack"><h2>Ataques</h2>
    ${e.map(a=>`<div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap">
      <span>${i(a.nome)}</span>
      <span><b>${j(a.atk)}</b> pra acertar · <b>${i(a.dice)}${a.dmgBonus?j(a.dmgBonus):""}</b> ${i(a.dmgType)}${a.maestria?` <span class="muted">(${i(a.maestria)})</span>`:""}</span>
    </div>`).join("")}
    <p class="muted" style="margin:0;font-size:.8rem">Bônus de ataque = Proficiência + atributo. Dano = dado da arma + atributo.</p>
  </section>`:`<section class="card stack"><h2>Ataques</h2>
      <p class="muted" style="margin:0">Nenhuma arma equipada — desarmado: <b>${j(n.pb+n.mods.for)}</b> pra acertar, <b>1${j(n.mods.for)}</b> de dano contundente.</p></section>`}function ce(e,n){const{hp:a,deathSaves:r={success:0,fail:0},conditions:t=[],dead:o}=e.state,s=a.max+a.temp,u=Math.round(a.current/s*100),d=Math.round(a.temp/s*100),h=a.current/a.max>.5?"":a.current/a.max>.25?"mid":"low",m=a.current===0&&!o,g=e.state.concentration?$.comp.byId.spells[e.state.concentration]:null;return`
  <section class="card stack" id="hpcard">
    <div class="hp-big"><div class="num">${a.current}<small> / ${a.max}</small></div>
      ${a.temp?`<div class="tmpv">+${a.temp} temporários</div>`:""}
      ${o?'<div class="chip bad" style="margin-top:.4rem">MORTO</div>':""}</div>
    <div class="hpbar" aria-hidden="true"><div class="cur ${h}" style="width:${u}%"></div><div class="tmp" style="width:${d}%"></div></div>
    <input id="amount" class="amount" type="number" inputmode="numeric" min="0" placeholder="0" value="${i($.amount)}" aria-label="Valor" />
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
    <div><b>${i(n.speed.replace(" metros"," m"))}</b><small>Deslocamento</small></div>
    <div><b>${n.passivePerception}</b><small>Perc. passiva</small></div>
  </div></section>
  ${ie(La(e,$.comp,n),n)}
  ${g?`<p class="banner">Concentrando em: <b>${i(g.nome)}</b> <button class="btn small" id="endconc" style="margin-left:.5rem">Encerrar</button></p>`:""}
  ${m?`<section class="card stack"><h2>Testes contra a morte</h2>
    <div class="saves"><div><small class="muted">Sucessos</small><div class="pips">${[0,1,2].map(l=>`<span class="pip ${l<r.success?"s":""}"></span>`).join("")}</div></div>
      <div><small class="muted">Falhas</small><div class="pips">${[0,1,2].map(l=>`<span class="pip ${l<r.fail?"f":""}"></span>`).join("")}</div></div></div>
    <button class="btn primary" id="roll-death" style="width:100%">Rolar d20</button></section>`:""}
  <section class="card stack"><h2>Condições</h2>
    <div class="row">${t.map(l=>`<button class="chip bad" data-rmcond="${l}" aria-label="Remover ${l}">${ca[l]||l} ✕</button>`).join("")||'<span class="muted">Nenhuma</span>'}</div>
    <div class="row"><select id="addcond" class="grow" aria-label="Adicionar condição"><option value="">Adicionar condição…</option>
      ${Oa.filter(l=>!t.includes(l)).map(l=>`<option value="${l}">${ca[l]||l}</option>`).join("")}</select></div>
  </section>
  <section class="card stack"><h2>Descanso</h2>
    ${(e.state.hitDice.byClass||[]).length>1?e.state.hitDice.byClass.map(l=>{const y=$.comp.byId.classes[l.classId];return`<div class="row" style="justify-content:space-between"><span class="muted">${i((y==null?void 0:y.nome)||l.classId)}: ${l.max-l.used}/${l.max} (d${l.die})</span>
            <button class="btn small" data-shortclass="${l.classId}">Gastar</button></div>`}).join(""):`<p class="muted" style="margin:0">Dados de Vida: ${e.state.hitDice.max-e.state.hitDice.used}/${e.state.hitDice.max} (d${e.state.hitDice.die})</p>
         <div class="row"><button class="btn grow" id="short">Gastar 1 Dado de Vida</button></div>`}
    <div class="row"><button class="btn grow" id="long">Descanso Longo</button></div>
  </section>
  <section class="card"><h2>Registro</h2><ul class="log">${(e.state.log||[]).map(l=>`<li>${i(l)}</li>`).join("")||"<li>—</li>"}</ul></section>`}function re(e,n){const a=b("#amount");a.oninput=()=>$.amount=a.value,E.querySelectorAll("[data-q]").forEach(t=>t.onclick=()=>{$.amount=t.dataset.q==="C"?"":String((Number($.amount)||0)+Number(t.dataset.q)),a.value=$.amount}),E.querySelectorAll("[data-act]").forEach(t=>t.onclick=async()=>{const o=Number($.amount);if(!o)return I("Digite um valor.");const s={resistant:b("#o-res").checked,vulnerable:b("#o-vul").checked,critical:b("#o-crit").checked};$.amount="";const u=await G($.be,$.chId,t.dataset.act,o,s,e.name);Y(u.patch),u.concentrationDC&&e.state.concentration?I(`Teste de Concentração: CD ${u.concentrationDC}`):u.log.length&&I(u.log.at(-1))}),b("#endconc")&&(b("#endconc").onclick=()=>D.save({"state.concentration":null})),b("#roll-death")&&(b("#roll-death").onclick=async()=>{const t=da("1d20").total,o=await G($.be,$.chId,"morte",t,{},e.name);Y(o.patch),I(`d20 = ${t}. ${o.log.at(-1)??""}`)}),E.querySelectorAll("[data-rmcond]").forEach(t=>t.onclick=()=>D.save({"state.conditions":e.state.conditions.filter(o=>o!==t.dataset.rmcond)})),b("#addcond").onchange=t=>t.target.value&&D.save({"state.conditions":[...e.state.conditions,t.target.value]});const r=async(t,o)=>{const s=da(`1d${t}`).total+n.mods.con;await o();const u=await G($.be,$.chId,"cura",Math.max(0,s),{},e.name);Y(u.patch),I(`Dado de Vida: ${s}. ${u.log[0]??""}`)};b("#short")&&(b("#short").onclick=()=>{const t=e.state.hitDice;if(t.used>=t.max)return I("Sem Dados de Vida disponíveis.");r(t.die,()=>D.save({"state.hitDice.used":t.used+1}))}),E.querySelectorAll("[data-shortclass]").forEach(t=>t.onclick=()=>{const o=e.state.hitDice.byClass,s=o.findIndex(h=>h.classId===t.dataset.shortclass),u=o[s];if(u.used>=u.max)return I("Sem Dados de Vida dessa classe.");const d=o.map((h,m)=>m===s?{...h,used:h.used+1}:h);r(u.die,()=>D.save({"state.hitDice.byClass":d,"state.hitDice.used":d.reduce((h,m)=>h+m.used,0)}))}),b("#long").onclick=async()=>{const t=Object.fromEntries(Object.entries(e.state.spellSlots||{}).map(([u,d])=>[u,{...d,used:0}])),o=Object.fromEntries(Object.entries(e.state.pactSlots||{}).map(([u,d])=>[u,{...d,used:0}])),s=(e.state.hitDice.byClass||[]).map(u=>({...u,used:0}));await D.save({"state.hp":{...e.state.hp,current:e.state.hp.max,temp:0},"state.spellSlots":t,"state.pactSlots":o,"state.hitDice":{...e.state.hitDice,byClass:s,used:0},"state.deathSaves":{success:0,fail:0},"state.conditions":e.state.conditions.filter(u=>!["inconsciente","estabilizado"].includes(u))}),I("Descanso longo concluído.")}}
