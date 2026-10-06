import"./pwa-Bz0sy_w8.js";import{e as u,A as T,$ as b,m as ia,t as I,h as N,n as W,o as Aa,q as ca,w as Ca,x as Ea,y as Ia,S as ja,g as Na,r as xa,l as Da,s as aa,a as va,b as $a,z as Ma,B as Pa,f as Ta,c as Ba,d as La,C as ra,i as Oa,j as Y,D as za,k as Ha,E as da}from"./auth-D8k-UvIg.js";function ua(s){const l=String(s).replace(/\s/g,"").match(/^(\d*)d(\d+)([+-]\d+)?$/i);if(!l)return null;const a=Number(l[1]||1),r=Number(l[2]),t=Number(l[3]||0),i=Array.from({length:a},()=>1+Math.floor(Math.random()*r));return{rolls:i,bonus:t,total:i.reduce((e,c)=>e+c,0)+t}}const z=s=>u(s).replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>").replace(/(^|\s)_([^_]+)_(?=\s|$|[.,;:])/g,"$1<i>$2</i>");function D(s){if(!s)return"";const l=[];for(const a of String(s).split(/\n\n+/)){const r=a.split(`
`);if(r.every(t=>t.startsWith("| "))){l.push('<div class="mdtable"><table>'+r.map(t=>"<tr>"+t.slice(2).split(" | ").map(i=>`<td>${z(i)}</td>`).join("")+"</tr>").join("")+"</table></div>");continue}for(const t of r)t.startsWith("#### ")?l.push(`<h5>${z(t.slice(5))}</h5>`):t.startsWith("### ")?l.push(`<h4>${z(t.slice(4))}</h4>`):t.startsWith("| ")?l.push('<div class="mdtable"><table><tr>'+t.slice(2).split(" | ").map(i=>`<td>${z(i)}</td>`).join("")+"</tr></table></div>"):t.startsWith("• ")?l.push(`<p class="bullet">${z(t)}</p>`):l.push(`<p>${z(t)}</p>`)}return`<div class="md">${l.join("")}</div>`}const B=s=>String(s||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(),fa=Object.fromEntries(T),H=40,F=s=>s===0?"Truque":`${s}º círculo`,ma=()=>Math.random().toString(36).slice(2,9),x=(s,l,a,r=!1,t="",i="")=>`<details class="entry" ${r?"open":""} ${t}><summary><span class="t">${s}</span><span class="row" style="gap:.4rem;flex-wrap:nowrap"><span class="lvl-badge">${l||""}</span>${i}</span></summary><div class="body">${a}</div></details>`,ea=(s,l,a="Adicionar")=>`<button class="btn small primary addbtn" ${s}="${l}" aria-label="${a}">+</button>`;function Va(s,l,a){const r=a.S,t=r.comp,i=new Set(s.build.classes.map(n=>n.classId)),e=t.classes.filter(n=>!i.has(n.id)),c=l.classesInfo.slice(1);return`
  <section class="card stack"><h2>Multiclasse</h2>
    <p class="empty-note" style="margin:0">Nível total: ${l.level}/20. Ao multiclassar, confira na aba Traços quais proficiências a nova classe concede (são menos do que na criação) e ajuste "Treinamento e Proficiências" à mão, se precisar.</p>
    ${c.length?c.map(n=>{var v,$,p,k,A;const y=((v=n.cls)==null?void 0:v.subclasses)||[];return`<div class="row" style="flex-wrap:wrap;gap:.5rem;border-top:1px solid var(--border,#3332);padding-top:.5rem">
        <b class="grow">${u((($=n.cls)==null?void 0:$.nome)||n.classId)}</b>
        <div class="row" style="gap:.3rem"><button class="btn small" data-mcdown="${n.classId}" aria-label="Diminuir nível de ${u(((p=n.cls)==null?void 0:p.nome)||n.classId)}">−</button>
          <span style="min-width:1.4rem;text-align:center">${n.level}</span>
          <button class="btn small" data-mcup="${n.classId}" aria-label="Subir nível de ${u(((k=n.cls)==null?void 0:k.nome)||n.classId)}">+</button></div>
        ${y.length?`<select data-mcsub="${n.classId}" aria-label="Subclasse de ${u(((A=n.cls)==null?void 0:A.nome)||n.classId)}" ${n.level<3?"disabled":""}>
          <option value="">—</option>${y.map(m=>`<option value="${m.id}" ${m.id===n.subclassId?"selected":""}>${u(m.nome)}</option>`).join("")}</select>`:""}
        <button class="btn small danger" data-mcrm="${n.classId}">Remover</button>
      </div>`}).join(""):'<p class="empty-note">Personagem de classe única.</p>'}
    ${e.length&&l.level<20?`<form class="row" id="addclass">
      <select id="mcnew" class="grow" aria-label="Nova classe">${e.map(n=>`<option value="${n.id}">${u(n.nome)}</option>`).join("")}</select>
      <button class="btn primary small">+ Adicionar classe</button></form>`:""}
  </section>`}function Ra(s,l,a){const r=a.S,t=a.app;t.querySelectorAll("[data-mcup]").forEach(i=>i.onclick=()=>{const e=s.build.classes.find(c=>c.classId===i.dataset.mcup);a.save(ca(s,r.comp,i.dataset.mcup,e.level+1))}),t.querySelectorAll("[data-mcdown]").forEach(i=>i.onclick=()=>{const e=s.build.classes.find(c=>c.classId===i.dataset.mcdown);if(e.level<=1)return a.toast('Nível mínimo 1 — use "Remover" para tirar a classe.');a.save(ca(s,r.comp,i.dataset.mcdown,e.level-1))}),t.querySelectorAll("[data-mcsub]").forEach(i=>i.onchange=()=>a.save(Ca(s,r.comp,i.dataset.mcsub,i.value||null))),t.querySelectorAll("[data-mcrm]").forEach(i=>i.onclick=()=>{if(!a.confirmTwice(`[data-mcrm="${i.dataset.mcrm}"]`,"Toque de novo para remover"))return;const e=Ea(s,r.comp,i.dataset.mcrm);e&&a.save(e)}),b("#addclass")&&(b("#addclass").onsubmit=i=>{i.preventDefault();const e=Ia(s,r.comp,b("#mcnew").value);e&&(a.save(e),a.toast("Classe adicionada no nível 1."))})}function Ua(s,l,a){var n,y;const r=a.S,t=s.build.classes[0].level,i=s.build.classes[0],e=((n=l.cls)==null?void 0:n.subclasses)||[],c=s.build.training||{};return`
  <section class="card stack">
    <div class="sectiontitle"><h2 style="margin:0">${l.multiclass?`${u(((y=l.cls)==null?void 0:y.nome)||"")} ${t}`:`Nível ${t}`}</h2>
      <div class="row"><button class="btn small" id="lvldown" aria-label="Diminuir nível">−</button><button class="btn small primary" id="lvlup" aria-label="Subir de nível">+ Nível</button></div></div>
    ${l.multiclass?`<p class="empty-note" style="margin:0">Classe principal (foi ela que deu o 1º dado de vida cheio). Nível total do personagem: ${l.level}.</p>`:""}
    ${e.length?`<div><label for="subclass">Subclasse${t<3?" (a partir do nível 3)":""}</label>
      <select id="subclass" ${t<3?"disabled":""}><option value="">—</option>${e.map(v=>`<option value="${v.id}" ${v.id===i.subclassId?"selected":""}>${u(v.nome)}</option>`).join("")}</select></div>`:""}
    <div class="stats">
      <div><b>${N(l.pb)}</b><small>Proficiência</small></div>
      <div><b>${N(l.initiative)}</b><small>Iniciativa</small></div>
      <div><b>${u(l.speed.replace(" metros"," m"))}</b><small>Deslocamento</small></div>
      <div><b>${l.passivePerception}</b><small>Perc. passiva</small></div>
    </div>
    ${l.armor?`<div class="row"><label for="acbonus" style="margin:0">Bônus extra de CA</label>
      <input id="acbonus" type="number" inputmode="numeric" style="width:6rem" value="${Number(s.build.acBonus)||0}" /></div>
    <p class="empty-note" style="margin:0">Classe de Armadura <b>${l.ac}</b>, calculada sozinha pelo equipamento: ${u(l.armor.detalhe)}. Use o bônus extra para itens mágicos, estilo de luta Defesa etc. (Sem armadura/escudo equipado, vale o número digitado à mão.)</p>`:`<div class="row"><label for="ac" style="margin:0">Classe de Armadura</label>
      <input id="ac" type="number" inputmode="numeric" style="width:6rem" value="${s.build.ac??10}" /></div>`}
    <div class="row"><label for="hpmax" style="margin:0">PV Máximo</label>
      <input id="hpmax" type="number" inputmode="numeric" min="1" style="width:6rem" value="${s.state.hp.max}" /></div>
    <p class="empty-note" style="margin:0">O PV máximo pode ser ajustado à mão — use o valor rolado no dado com o Mestre. Ao subir de nível, o app só soma o ganho médio da regra a esse valor.</p>
  </section>

  ${Va(s,l,a)}

  <section class="card stack"><h2>Atributos e Salvaguardas</h2>
    <p class="empty-note">Toque em <b>Salvaguarda</b> para marcar/desmarcar proficiência.</p>
    <div class="abil2">${T.map(([v,$])=>{const p=(s.build.saveProfs||[]).includes(v);return`<div class="abcard">
        <small>${$}</small><b>${N(l.mods[v])}</b>
        <input class="abscore" data-score="${v}" type="number" inputmode="numeric" min="1" max="30" value="${s.build.abilities[v]}" aria-label="Valor de ${$}" />
        <button class="savebtn ${p?"on":""}" data-save="${v}" aria-pressed="${p}">
          <span class="dot ${p?"on":""}"></span>Salvaguarda <b>${N(l.saves[v])}</b></button>
      </div>`}).join("")}</div>
  </section>

  <section class="card"><h2>Perícias</h2><p class="empty-note">Toque para alternar: sem proficiência → proficiente (●) → especialista (◆).</p>
    <div class="skills">${l.skills.map(v=>`<button data-skill="${v.id}" aria-pressed="${v.prof||v.exp}">
      <span class="row" style="flex-wrap:nowrap"><span class="dot ${v.exp?"exp":v.prof?"on":""}"></span>${v.nome} <small class="muted">(${v.ab.toUpperCase()})</small></span><b>${N(v.bonus)}</b></button>`).join("")}</div>
  </section>

  <section class="card stack"><h2>Treinamento e Proficiências</h2>
    ${[["armaduras","Treinamento com Armaduras"],["armas","Proficiência com Armas"],["ferramentas","Proficiência com Ferramentas"],["idiomas","Idiomas"]].map(([v,$])=>`<div><label for="tr-${v}">${$}</label><textarea id="tr-${v}" data-train="${v}" rows="2">${u(c[v]||"")}</textarea></div>`).join("")}
  </section>

  <section class="card stack"><h2>Anotações</h2>
    <textarea id="notes" rows="5" placeholder="Aliados, pistas, história…">${u(s.notes)}</textarea></section>

  <section class="card stack"><h2>Mesa</h2>
    ${s.campaignId?`<p style="margin:0">Jogando em <b>${u(s.campaignName)}</b>. O Mestre dessa mesa pode ver e alterar esta ficha.</p>
         <button class="btn" id="leave-table">Sair da mesa</button>`:`<p class="muted" style="margin:0">Esta ficha não está em nenhuma mesa. Só você pode vê-la.</p>
         <form class="row" id="join"><input id="code" class="grow" autocomplete="off" autocapitalize="characters" placeholder="Código (ABC-123)" aria-label="Código da mesa" required style="width:auto" />
         <button class="btn primary">Entrar</button></form>`}
  </section>
  <section class="card stack"><h2>Conta</h2>
    <div class="row">${a.accountChip(r.user)}</div>
    <button class="btn danger small" id="delete">Apagar personagem</button>
  </section>`}let pa={};const L=(s,l,a=600)=>{clearTimeout(pa[s]),pa[s]=setTimeout(l,a)};function Fa(s,l,a){const r=a.S,t=a.app,i=s.build.classes[0].level;b("#lvlup").onclick=()=>l.level<20&&a.save(W(s,r.comp,i+1)).then(()=>a.toast(`Nível ${i+1}! PV máximo, Dados de Vida e espaços atualizados.`)),b("#lvldown").onclick=()=>i>1&&a.save(W(s,r.comp,i-1)),b("#subclass")&&(b("#subclass").onchange=e=>a.save(W(s,r.comp,i,e.target.value||null))),Ra(s,l,a),b("#ac")&&(b("#ac").onchange=e=>a.save({"build.ac":Number(e.target.value)||10})),b("#acbonus")&&(b("#acbonus").onchange=e=>a.save({"build.acBonus":Number(e.target.value)||0})),b("#hpmax").onchange=e=>{const c=Math.max(1,Number(e.target.value)||1);a.save({"state.hp":{...s.state.hp,max:c,current:Math.min(s.state.hp.current,c)}})},t.querySelectorAll("[data-score]").forEach(e=>e.onchange=()=>{const c=Math.max(1,Math.min(30,Number(e.value)||10)),n=e.dataset.score,y={[`build.abilities.${n}`]:c};n==="con"&&(y["state.hp"]={...s.state.hp,...Aa(s,r.comp,c)}),a.save(y)}),t.querySelectorAll("[data-save]").forEach(e=>e.onclick=()=>{const c=e.dataset.save,n=s.build.saveProfs||[];a.save({"build.saveProfs":n.includes(c)?n.filter(y=>y!==c):[...n,c]})}),t.querySelectorAll("[data-skill]").forEach(e=>e.onclick=()=>{const c=e.dataset.skill,n=s.build.skillProfs||[],y=s.build.expertise||[];y.includes(c)?a.save({"build.expertise":y.filter(v=>v!==c),"build.skillProfs":n.filter(v=>v!==c)}):n.includes(c)?a.save({"build.expertise":[...y,c]}):a.save({"build.skillProfs":[...n,c]})}),t.querySelectorAll("[data-train]").forEach(e=>e.oninput=()=>L("tr"+e.dataset.train,()=>a.save({[`build.training.${e.dataset.train}`]:e.value}))),b("#notes").oninput=e=>L("notes",()=>a.save({notes:e.target.value})),a.bindLogout(r.be,t),b("#join")&&(b("#join").onsubmit=async e=>{e.preventDefault();try{const c=await r.be.joinByCode(b("#code").value);await r.be.updateCharacter(r.chId,{campaignId:c.id,campaignName:c.name}),a.toast(`${s.name} entrou na mesa ${c.name}.`)}catch(c){a.toast(c.message)}}),b("#leave-table")&&(b("#leave-table").onclick=()=>{a.confirmTwice("#leave-table","Toque de novo para confirmar")&&a.save({campaignId:null,campaignName:null})}),b("#delete").onclick=async()=>{if(!a.confirmTwice("#delete",`Toque de novo para apagar ${s.name}`))return;const e=r.chId;await r.be.deleteCharacter(e),a.showHome()}}function Qa(s,l,a){const r=a.S,t=r.comp,i=r.ui,e=new Set(l.bonusSpells||[]),c=(s.build.spellsKnown||[]).filter(d=>!e.has(d)),n=s.build.spellsPrepared||[],y=[...e].map(d=>t.byId.spells[d]).filter(Boolean).sort((d,q)=>d.nivel-q.nivel||d.nome.localeCompare(q.nome)),v=Object.entries(s.state.spellSlots||{}),$=Object.entries(s.state.pactSlots||{}),p=[...v,...$].reduce((d,[q,j])=>j.max>0?Math.max(d,Number(q)):d,0),k=l.casters.length>0,A=c.map(d=>t.byId.spells[d]).filter(Boolean).sort((d,q)=>d.nivel-q.nivel||d.nome.localeCompare(q.nome)),m={};A.forEach(d=>{var q;return(m[q=d.nivel]||(m[q]=[])).push(d)});const h=s.build.classes.map(d=>d.classId),w=l.classesInfo.map(d=>{var q;return(q=d.cls)==null?void 0:q.nome}).filter(Boolean).join(" + "),g=l.spellCaps||{},S=A.filter(d=>d.nivel===0).length,o=A.filter(d=>d.nivel>0).length,C=n.length,O=g.cantrips!==null&&S>=g.cantrips,ya=g.known!==null&&o>=g.known,wa=g.prepared!==null&&C>=g.prepared,na=B(i.spellQ);let U=t.spells.filter(d=>!c.includes(d.id)&&!e.has(d.id)&&(!i.spellMine||!l.casters.length||d.classes.some(q=>h.includes(q)))&&(i.spellLvl==="all"||String(d.nivel)===i.spellLvl)&&(!na||B(d.nome).includes(na)));const la=U.length;U=U.slice(0,H);const ka=d=>(d.nivel===0?O:ya)?`<button class="btn small" data-learnfull="${d.nivel===0?"truque":"magia"}" aria-label="Limite atingido">+</button>`:ea("data-learn",d.id,"Adicionar "+u(d.nome)),Sa=d=>{const q=n.includes(d.id);return!q&&wa?'<button class="btn small" data-prepfull="1" aria-label="Limite de magias preparadas atingido">Preparar</button>':`<button class="btn small" data-prep="${d.id}">${q?"✓ Preparada":"Preparar"}</button>`},oa=(d,q)=>`
    <div class="muted" style="font-size:.85rem">${u(d.escola)} · ${u(d.tempo)} · ${u(d.alcance)}<br>${u(d.componentes)} · ${u(d.duracao)}</div>
    ${D(d.desc)}
    <div class="row">${q?`${d.nivel>0?Sa(d):""}
         ${d.concentracao?`<button class="btn small" data-conc="${d.id}">${s.state.concentration===d.id?"Encerrar concentração":"Concentrar"}</button>`:""}
         <button class="btn small" data-forget="${d.id}">Remover</button>`:""}</div>`,G=d=>[d.concentracao?"C":"",d.ritual?"R":""].filter(Boolean).map(q=>`<span class="chip">${q}</span>`).join(" "),K=(d,q,j)=>j===null?"":`<span class="lvl-badge">${q}/${j} ${d}</span>`,qa=d=>`
    <div class="muted" style="font-size:.85rem">${u(d.escola)} · ${u(d.tempo)} · ${u(d.alcance)}<br>${u(d.componentes)} · ${u(d.duracao)}</div>
    ${D(d.desc)}
    ${d.concentracao?`<div class="row"><button class="btn small" data-conc="${d.id}">${s.state.concentration===d.id?"Encerrar concentração":"Concentrar"}</button></div>`:""}`;return`
  ${l.casters.length?`<section class="card stack">${l.casters.map(d=>`<div class="stats" style="grid-template-columns:repeat(3,1fr)">
    <div><b>${d.dc}</b><small>CD (${u(d.nome)})</small></div><div><b>${N(d.atk)}</b><small>Ataque mágico</small></div>
    <div><b>${fa[d.atributoConjuracao].slice(0,3)}</b><small>Atributo</small></div></div>`).join("")}</section>`:""}
  ${v.length?`<section class="card slots"><h2>Espaços de magia${l.multiclass?" (combinados)":""}</h2>
    ${v.map(([d,q])=>`<div class="lvl"><span>${d}º</span>${Array.from({length:q.max},(j,M)=>`<button class="slotpip ${M<q.used?"used":""}" data-slot="${d}" data-i="${M}" aria-label="Espaço de ${d}º círculo ${M+1}${M<q.used?", gasto":""}"></button>`).join("")}</div>`).join("")}
  </section>`:""}
  ${$.length?`<section class="card slots"><h2>Magia de Pacto</h2>
    ${$.map(([d,q])=>`<div class="lvl"><span>${d}º</span>${Array.from({length:q.max},(j,M)=>`<button class="slotpip ${M<q.used?"used":""}" data-pactslot="${d}" data-i="${M}" aria-label="Espaço de pacto ${M+1}${M<q.used?", gasto":""}"></button>`).join("")}</div>`).join("")}
  </section>`:""}
  ${y.length?`<section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Magias da Subclasse</h2><span class="lvl-badge">sempre preparadas</span></div>
    <p class="empty-note" style="margin:0">Concedidas automaticamente pela subclasse — não contam no limite de magias conhecidas/preparadas, mas ainda gastam um espaço de magia ao conjurar.</p>
    <div class="stack">${y.map(d=>x(`${u(d.nome)} ${G(d)}`,F(d.nivel),qa(d),!1,`data-k="b-${d.id}"`)).join("")}</div>
  </section>`:""}
  ${g.cantrips!==null||g.known!==null||g.prepared!==null?`<section class="card stack"><h2>Limites de magias (regra 2024)</h2>
    <div class="row" style="flex-wrap:wrap;gap:.4rem">${K("truques",S,g.cantrips)}${K("magias conhecidas",o,g.known)}${K("preparadas",C,g.prepared)}</div>
    <details class="entry"><summary><span class="t">Exceção manual (magia extra de livro/pergaminho…)</span></summary><div class="body stack">
      <p class="empty-note" style="margin:0">Some ao limite oficial acima. Use quando o personagem aprendeu algo fora da regra normal.</p>
      <div class="row" style="flex-wrap:wrap">
        <div class="grow"><label for="extra-cantrips">Truques extras</label><input id="extra-cantrips" type="number" min="0" value="${s.build.extraCantrips||0}" /></div>
        <div class="grow"><label for="extra-spells">Magias extras</label><input id="extra-spells" type="number" min="0" value="${s.build.extraSpells||0}" /></div>
        ${g.invocacoes!==null?`<div class="grow"><label for="extra-invoc">Invocações extras</label><input id="extra-invoc" type="number" min="0" value="${s.build.extraInvocations||0}" /></div>`:""}
      </div>
      <div><label for="extra-note">Motivo (opcional)</label>
        <textarea id="extra-note" rows="2" placeholder="Ex.: aprendeu com um pergaminho encontrado na masmorra">${u(s.build.extraSpellsNote||"")}</textarea></div>
    </div></details>
  </section>`:""}
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Minhas magias</h2><span class="lvl-badge">${n.length} preparada(s)</span></div>
    ${Object.keys(m).length?Object.entries(m).map(([d,q])=>`<h3 style="margin:.6rem 0 .2rem;color:var(--muted)">${F(Number(d))}</h3>
      <div class="stack" style="--gap:.4rem">${q.map(j=>x(`${j.nivel>0&&n.includes(j.id)?"✓ ":""}${u(j.nome)} ${G(j)}`,F(j.nivel),oa(j,!0),!1,`data-k="m-${j.id}"`)).join("")}</div>`).join(""):'<p class="empty-note">Nenhuma magia ainda. Adicione pela biblioteca abaixo.</p>'}
  </section>
  <section class="card stack"><h2>Biblioteca de magias</h2>
    <input id="spellq" type="search" placeholder="Buscar magia pelo nome…" value="${u(i.spellQ)}" aria-label="Buscar magia" />
    <div class="filters">${["all","0","1","2","3","4","5","6","7","8","9"].map(d=>{const q=d==="all"||(d==="0"?k:k&&Number(d)<=p);return`<button data-flvl="${d}" aria-pressed="${i.spellLvl===d}" class="${q?"":"unavail"}" ${q?"":'title="Ainda não disponível no seu nível"'}>${d==="all"?"Todas":d==="0"?"Truques":d+"º"}</button>`}).join("")}</div>
    ${k?`<p class="empty-note" style="margin:0">Seu nível permite conjurar ${p===0?"só truques":`truques e magias até ${p}º círculo`}. Os demais círculos aparecem esmaecidos até você subir de nível.</p>`:""}
    ${w?`<label class="chk"><input type="checkbox" id="spellmine" ${i.spellMine?"checked":""}> Só a lista de ${u(w)}</label>`:""}
    <p class="empty-note">${la} magia(s)${la>H?` — mostrando ${H}, refine a busca`:""}.</p>
    <div class="stack">${U.map(d=>x(`${u(d.nome)} ${G(d)}`,F(d.nivel),oa(d,!1),!1,`data-k="l-${d.id}"`,ka(d))).join("")}</div>
  </section>`}function _a(s,l,a){const r=a.S,t=a.app,i=r.ui;t.querySelectorAll("[data-slot]").forEach(e=>e.onclick=()=>{const c=e.dataset.slot,n=Number(e.dataset.i),y=s.state.spellSlots[c];a.save({[`state.spellSlots.${c}.used`]:n<y.used?n:n+1})}),t.querySelectorAll("[data-pactslot]").forEach(e=>e.onclick=()=>{const c=e.dataset.pactslot,n=Number(e.dataset.i),y=s.state.pactSlots[c];a.save({[`state.pactSlots.${c}.used`]:n<y.used?n:n+1})}),b("#spellq").oninput=e=>{i.spellQ=e.target.value,L("sq",a.render,250)},t.querySelectorAll("[data-flvl]").forEach(e=>e.onclick=()=>{i.spellLvl=e.dataset.flvl,a.render()}),b("#spellmine")&&(b("#spellmine").onchange=e=>{i.spellMine=e.target.checked,a.render()}),t.querySelectorAll("[data-learn]").forEach(e=>e.onclick=()=>a.save({"build.spellsKnown":[...s.build.spellsKnown||[],e.dataset.learn]})),t.querySelectorAll("[data-learnfull]").forEach(e=>e.onclick=()=>I(`Limite de ${e.dataset.learnfull==="truque"?"truques conhecidos":"magias conhecidas"} atingido. Use a exceção manual acima se for o caso.`)),t.querySelectorAll("[data-forget]").forEach(e=>e.onclick=()=>a.save({"build.spellsKnown":(s.build.spellsKnown||[]).filter(c=>c!==e.dataset.forget),"build.spellsPrepared":(s.build.spellsPrepared||[]).filter(c=>c!==e.dataset.forget)})),t.querySelectorAll("[data-prep]").forEach(e=>e.onclick=()=>{const c=s.build.spellsPrepared||[],n=e.dataset.prep;a.save({"build.spellsPrepared":c.includes(n)?c.filter(y=>y!==n):[...c,n]})}),t.querySelectorAll("[data-prepfull]").forEach(e=>e.onclick=()=>I("Limite de magias preparadas atingido. Use a exceção manual acima se for o caso.")),b("#extra-cantrips")&&(b("#extra-cantrips").onchange=e=>a.save({"build.extraCantrips":Math.max(0,Number(e.target.value)||0)})),b("#extra-spells")&&(b("#extra-spells").onchange=e=>a.save({"build.extraSpells":Math.max(0,Number(e.target.value)||0)})),b("#extra-invoc")&&(b("#extra-invoc").onchange=e=>a.save({"build.extraInvocations":Math.max(0,Number(e.target.value)||0)})),b("#extra-note")&&(b("#extra-note").oninput=e=>L("extranote",()=>a.save({"build.extraSpellsNote":e.target.value}))),t.querySelectorAll("[data-conc]").forEach(e=>e.onclick=()=>a.save({"state.concentration":s.state.concentration===e.dataset.conc?null:e.dataset.conc})),Q(t,"spells")}const J={};function Q(s,l){s.querySelectorAll("summary .addbtn").forEach(r=>r.addEventListener("click",t=>t.preventDefault()));const a=J[l]||(J[l]=new Set);s.querySelectorAll("details.entry").forEach((r,t)=>{var e;const i=r.dataset.k||((e=r.querySelector("summary .t"))==null?void 0:e.textContent)||t;a.has(i)&&(r.open=!0),r.addEventListener("toggle",()=>r.open?a.add(i):a.delete(i))})}function Ga(s,l,a,r){var A;const{cls:t,sub:i,level:e,classId:c}=l;if(!t)return`<section class="card">Classe "${u(c)}" não encontrada no compêndio.</section>`;const n=t.nome,y=t.caracteristicas||[],v=y.filter(m=>m.nivel<=e),$=y.filter(m=>m.nivel>e),p=s.build.opcoes||[],k=c==="bruxo"?((A=a.spellCaps)==null?void 0:A.invocacoes)??null:null;return`
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Características de ${u(n)}</h2><span class="lvl-badge">nível ${e}</span></div>
    ${v.length?v.map(m=>x(u(m.nome),`Nível ${m.nivel}`,D(m.desc))).join(""):'<p class="empty-note">Importe o compêndio completo para ver as características.</p>'}
    ${$.length?`<details class="entry"><summary><span class="t muted">Próximos níveis (${$.length})</span></summary><div class="body stack">
      ${$.map(m=>x(u(m.nome),`Nível ${m.nivel}`,D(m.desc))).join("")}</div></details>`:""}
  </section>
  ${(t.opcoes||[]).map(m=>{const h=c==="bruxo"&&/Invoca/i.test(m.titulo),w=h?m.itens.filter(S=>p.includes(S.id)).length:null,g=h&&k!==null&&w>=k;return`<section class="card stack"><div class="sectiontitle"><h2 style="margin:0">${u(m.titulo.replace("Opções de ",""))} (${u(n)})</h2>${h&&k!==null?`<span class="lvl-badge">${w}/${k}</span>`:""}</div>
    ${m.itens.filter(S=>p.includes(S.id)).map(S=>x("✓ "+u(S.nome),"",D(S.desc)+`<button class="btn small" data-unop="${S.id}">Remover</button>`)).join("")||'<p class="empty-note">Nenhuma escolhida.</p>'}
    <details class="entry"><summary><span class="t">Escolher ${u(m.titulo.replace("Opções de ","").toLowerCase())}</span><span class="lvl-badge">${m.itens.length}</span></summary><div class="body stack">
      ${m.itens.filter(S=>!p.includes(S.id)).map(S=>x(u(S.nome),"",D(S.desc),!1,`data-k="o-${c}-${S.id}"`,g?'<button class="btn small" data-opfull="1" aria-label="Limite de invocações atingido">+</button>':ea("data-op",S.id,"Escolher "+u(S.nome)))).join("")}
    </div></details></section>`}).join("")}
  <section class="card stack"><h2>Subclasse de ${u(n)}${i?": "+u(i.nome):""}</h2>
    ${i?(i.caracteristicas||[]).map(m=>x(`${m.nivel>e?"🔒 ":""}${u(m.nome)}`,`Nível ${m.nivel}`,D(m.desc))).join(""):`<p class="empty-note">${e<3?"A subclasse é escolhida no nível 3.":"Escolha a subclasse na aba Ficha (ou em Multiclasse, para uma classe secundária)."}</p>
         ${(t.subclasses||[]).map(m=>x(u(m.nome),"",D(m.intro))).join("")}`}
  </section>`}function Ka(s,l,a){const r=l.sp,t=l.bg,i=l.speciesLabel||(r==null?void 0:r.nome)||"espécie";return`
  ${l.classesInfo.map(e=>Ga(s,e,l)).join("")}
  <section class="card stack"><h2>Traços de ${u(i)}</h2>
    ${r&&i!==r.nome?`<p class="empty-note" style="margin:0">Usa as regras de ${u(r.nome)}.</p>`:""}
    <p class="empty-note">${u((r==null?void 0:r.tipo)||"")} · ${u((r==null?void 0:r.tamanho)||"")} · Deslocamento ${u((r==null?void 0:r.deslocamento)||"")}</p>
    ${((r==null?void 0:r.tracos)||[]).filter(e=>e.nome!=="Detalhes").map(e=>x(u(e.nome),"",D(e.desc))).join("")||'<p class="empty-note">Sem traços no compêndio.</p>'}
  </section>
  ${t?`<section class="card stack"><h2>Antecedente: ${u(t.nome)}</h2>
    <p style="margin:0;font-size:.92rem"><b>Atributos:</b> ${t.atributos.map(e=>fa[e]).join(", ")}<br>
    <b>Talento:</b> ${u(t.talento)}<br><b>Ferramenta:</b> ${u(t.ferramenta)}<br><b>Equipamento:</b> ${u(t.equipamento)}</p></section>`:""}
`}function Wa(s,l,a){const r=a.app,t=s.build.opcoes||[];r.querySelectorAll("[data-op]").forEach(i=>i.onclick=()=>a.save({"build.opcoes":[...t,i.dataset.op]})),r.querySelectorAll("[data-unop]").forEach(i=>i.onclick=()=>a.save({"build.opcoes":t.filter(e=>e!==i.dataset.unop)})),r.querySelectorAll("[data-opfull]").forEach(i=>i.onclick=()=>I("Limite de invocações místicas atingido. Use a exceção manual na aba Magias se for o caso.")),Q(r,"classe")}const Ya=["Origem","Geral","Estilo de Luta","Dádiva Épica"];function Ja(s,l,a){const r=a.S,t=r.comp,i=r.ui,e=s.build.feats||[],c=B(i.featQ);let n=t.feats.filter(v=>(v.repetivel||!e.some($=>$.id===v.id))&&(i.featCat==="all"||v.categoria===i.featCat)&&(!c||B(v.nome).includes(c)||B(v.prereq).includes(c)));const y=n.length;return n=n.slice(0,H),`
  <section class="card stack"><h2>Meus talentos</h2>
    ${e.length?e.map((v,$)=>{const p=t.byId.feats[v.id];return x(u((p==null?void 0:p.nome)||v.id),u(v.origem||(p==null?void 0:p.categoria)||""),(p?`<p class="empty-note">${u(p.categoria)}${p.prereq?" · Pré-requisito: "+u(p.prereq):""}</p>${D(p.desc)}`:'<p class="empty-note">Talento fora do compêndio.</p>')+`<button class="btn small" data-unfeat="${$}">Remover</button>`)}).join(""):'<p class="empty-note">Nenhum talento. Seu antecedente concede um talento de Origem.</p>'}
  </section>
  <section class="card stack"><h2>Biblioteca de talentos</h2>
    <input id="featq" type="search" placeholder="Buscar talento…" value="${u(i.featQ)}" aria-label="Buscar talento" />
    <div class="filters">${["all",...Ya].map(v=>`<button data-fcat="${v}" aria-pressed="${i.featCat===v}">${v==="all"?"Todos":v}</button>`).join("")}</div>
    <p class="empty-note">${y} talento(s)${y>H?` — mostrando ${H}`:""}.</p>
    ${n.map(v=>x(u(v.nome),u(v.categoria),`${v.prereq?`<p class="empty-note">Pré-requisito: ${u(v.prereq)}</p>`:""}${D(v.desc)}`,!1,`data-k="f-${v.id}"`,ea("data-feat",v.id,"Adicionar "+u(v.nome)))).join("")}
    ${t.feats.length?"":'<p class="empty-note">Importe o compêndio completo para usar a biblioteca de talentos.</p>'}
  </section>`}function Xa(s,l,a){const r=a.S,t=a.app,i=s.build.feats||[];b("#featq").oninput=e=>{r.ui.featQ=e.target.value,L("fq",a.render,250)},t.querySelectorAll("[data-fcat]").forEach(e=>e.onclick=()=>{r.ui.featCat=e.dataset.fcat,a.render()}),t.querySelectorAll("[data-feat]").forEach(e=>e.onclick=()=>{a.save({"build.feats":[...i,{id:e.dataset.feat,origem:"Escolhido"}]}),a.toast("Talento adicionado. Aplique aumentos de atributo na aba Ficha, se houver.")}),t.querySelectorAll("[data-unfeat]").forEach(e=>e.onclick=()=>a.save({"build.feats":i.filter((c,n)=>n!==Number(e.dataset.unfeat))})),Q(t,"feats")}function Za(s,l,a){const r=a.S,t=r.comp,i=r.ui,e=s.inventory||[],c=s.coins||{},n=B(i.itemQ),y=n.length>=2?t.items.filter(o=>B(o.nome).includes(n)).slice(0,25):[],v=Math.min(100,Math.round(l.weight/l.carry*100)),$=o=>o.tipo==="arma"?`${u(o.dano)} · ${u(o.propriedades)} · Maestria: ${u(o.maestria)}`:o.tipo==="armadura"?`CA ${u(o.ca)}${o.forca&&o.forca!=="—"?" · "+u(o.forca):""}${o.furtividade==="Desvantagem"?" · Desv. Furtividade":""}`:"",p=o=>o.itemId?t.byId.weapons[o.itemId]||t.byId.armor[o.itemId]||t.byId.gear[o.itemId]:null,k=(o,C)=>/po[çc][aã]o|elixir|antídoto/i.test(o.nome||(C==null?void 0:C.nome)||""),A={arma:"Armas",armadura:"Armaduras",pocao:"Poções"},m=o=>{const C=p(o);return(C==null?void 0:C.tipo)==="arma"?"Armas":(C==null?void 0:C.tipo)==="armadura"?"Armaduras":!C&&A[o.categoria]?A[o.categoria]:k(o,C)?"Poções":"Outros"},h=o=>o.categoria==="arma"&&o.dano?`${u(o.dano)}${o.ranged?" · À distância":""}${o.finesse?" · Acuidade":""}`:o.categoria==="armadura"&&Number(o.ca)?`CA ${o.ca}${o.caDex?` + Destreza${o.caDexMax!=null&&o.caDexMax!==""?` (máx ${o.caDexMax})`:""}`:""}`:"",w=o=>{const C=p(o),O=!C&&h(o);return x(`${o.equipado?"🛡️ ":""}${u(o.nome)}${Number(o.qtd)>1?` <span class="muted">×${o.qtd}</span>`:""}`,u(o.peso||""),`${C?`<p class="empty-note">${$(C)}${C.custo?" · "+u(C.custo):""}</p>${C.desc?D(C.desc):""}`:O?`<p class="empty-note">${O}</p>`:""}
      <div class="row">
        <button class="btn small" data-qty="${o.uid}" data-d="-1">−</button><b>${o.qtd}</b><button class="btn small" data-qty="${o.uid}" data-d="1">+</button>
        <label class="chk"><input type="checkbox" data-equip="${o.uid}" ${o.equipado?"checked":""}> Equipado</label>
        <label class="chk"><input type="checkbox" data-attune="${o.uid}" ${o.sintonizado?"checked":""}> Sintonizado</label>
      </div>
      <input data-inote="${o.uid}" id="inote-${o.uid}" value="${u(o.notas||"")}" placeholder="Notas (cargas, efeitos…)" aria-label="Notas do item" />
      <button class="btn small danger" data-rmitem="${o.uid}">Remover item</button>`,!1,`data-k="i-${o.uid}"`)},g=["Armas","Armaduras","Poções","Outros"],S=Object.fromEntries(g.map(o=>[o,e.filter(C=>m(C)===o)]));return`
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Bolsa de moedas</h2><span class="lvl-badge">≈ ${l.coinsGP.toLocaleString("pt-BR",{maximumFractionDigits:2})} PO</span></div>
    <div class="coins">${ia.map(([o,C,O])=>`<label class="coin coin-${o}"><span>${C}</span>
      <input type="number" inputmode="numeric" min="0" data-coin="${o}" value="${Number(c[o])||0}" aria-label="${O}" /></label>`).join("")}</div>
    <form class="row" id="coinop">
      <input id="coinamt" type="number" inputmode="numeric" min="1" placeholder="Qtd." style="width:5.5rem" aria-label="Quantidade" />
      <select id="coinkind" style="width:5.5rem" aria-label="Moeda">${ia.map(([o,C])=>`<option value="${o}" ${o==="po"?"selected":""}>${C}</option>`).join("")}</select>
      <button class="btn heal small" data-cop="+">Receber</button><button class="btn danger small" data-cop="-">Gastar</button>
    </form>
  </section>
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Inventário</h2><span class="lvl-badge">${l.weight.toLocaleString("pt-BR",{maximumFractionDigits:1})} / ${l.carry} kg</span></div>
    <div class="hpbar" aria-hidden="true"><div class="cur ${v>100?"low":v>75?"mid":""}" style="width:${v}%"></div></div>
    ${e.length?g.filter(o=>S[o].length).map(o=>`
      <div class="inv-divider"><span>${o}</span><span class="muted">${S[o].length}</span></div>
      ${S[o].map(w).join("")}`).join(""):'<p class="empty-note">Inventário vazio.</p>'}
  </section>
  <section class="card stack"><h2>Adicionar item</h2>
    <input id="itemq" type="search" placeholder="Buscar armas, armaduras, equipamento… (2+ letras)" value="${u(i.itemQ)}" aria-label="Buscar item" />
    ${y.map(o=>`<div class="libitem"><div class="info"><b>${u(o.nome)}</b><small>${u(o.custo||"")}${o.peso?" · "+u(o.peso):""} ${$(o)?"· "+$(o):""}</small></div>
      <button class="btn small primary" data-additem="${o.id}">+</button></div>`).join("")}
    ${n.length>=2&&!y.length?'<p class="empty-note">Nada encontrado — crie um item personalizado abaixo.</p>':""}
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
  </section>`}function ae(s,l,a){const r=a.S,t=a.app,i=r.comp,e=s.inventory||[],c={pc:0,pp:0,pe:0,po:0,pl:0,...s.coins||{}},n=$=>a.save({inventory:$});t.querySelectorAll("[data-coin]").forEach($=>$.onchange=()=>a.save({coins:{...c,[$.dataset.coin]:Math.max(0,Number($.value)||0)}})),t.querySelectorAll("[data-cop]").forEach($=>$.onclick=p=>{p.preventDefault();const k=Number(b("#coinamt").value),A=b("#coinkind").value;if(!k)return a.toast("Digite a quantidade.");const m=c[A]+($.dataset.cop==="+"?k:-k);if(m<0)return a.toast(`Não há ${k} ${A.toUpperCase()} suficientes.`);a.save({coins:{...c,[A]:m}})}),b("#itemq").oninput=$=>{r.ui.itemQ=$.target.value,L("iq",a.render,250)},t.querySelectorAll("[data-additem]").forEach($=>$.onclick=()=>{const p=i.items.find(A=>A.id===$.dataset.additem),k=e.find(A=>A.itemId===p.id);n(k?e.map(A=>A===k?{...A,qtd:Number(A.qtd)+1}:A):[...e,{uid:ma(),itemId:p.id,nome:p.nome,qtd:1,peso:p.peso||"",equipado:!1,sintonizado:!1,notas:""}]),a.toast(`${p.nome} adicionado.`)});const y=()=>{const $=b("#ccat").value;b("#c-arma-fields").style.display=$==="arma"?"":"none",b("#c-armadura-fields").style.display=$==="armadura"?"":"none"};b("#ccat").onchange=y,y(),b("#custom").onsubmit=$=>{$.preventDefault();const p=b("#cname").value.trim();if(!p)return;const k=b("#cweight").value.trim(),A=Math.max(1,Number(b("#cqty").value)||1),m=b("#ccat").value,h={uid:ma(),itemId:null,nome:p,categoria:m,qtd:A,peso:k?`${k} kg`:"",equipado:!1,sintonizado:!1,notas:b("#cdetail").value.trim()};if(m==="arma"){const w=b("#cdano").value.trim();w&&(h.dano=w),h.ranged=b("#cranged").checked,h.finesse=b("#cfinesse").checked}else if(m==="armadura"){const w=Number(b("#ccabase").value);w&&(h.ca=w),h.caDex=b("#ccadex").checked;const g=b("#ccadexmax").value.trim();g&&(h.caDexMax=Number(g))}n([...e,h]),a.toast(`${p} adicionado.`)};const v=($,p)=>n(e.map(k=>k.uid===$?p(k):k));t.querySelectorAll("[data-qty]").forEach($=>$.onclick=()=>v($.dataset.qty,p=>({...p,qtd:Math.max(0,Number(p.qtd)+Number($.dataset.d))}))),t.querySelectorAll("[data-equip]").forEach($=>$.onchange=()=>v($.dataset.equip,p=>({...p,equipado:$.checked}))),t.querySelectorAll("[data-attune]").forEach($=>$.onchange=()=>{if($.checked&&e.filter(p=>p.sintonizado).length>=3)return $.checked=!1,a.toast("Limite de 3 itens sintonizados.");v($.dataset.attune,p=>({...p,sintonizado:$.checked}))}),t.querySelectorAll("[data-inote]").forEach($=>$.oninput=()=>L("in"+$.dataset.inote,()=>v($.dataset.inote,p=>({...p,notas:$.value})))),t.querySelectorAll("[data-rmitem]").forEach($=>$.onclick=()=>n(e.filter(p=>p.uid!==$.dataset.rmitem))),Q(t,"itens")}const ee={ficha:{html:Ua,bind:Fa},magias:{html:Qa,bind:_a},classe:{html:Ka,bind:Wa},talentos:{html:Ja,bind:Xa},itens:{html:Za,bind:ae}},E=b("#app"),f={be:null,comp:null,user:null,chId:null,ch:null,tab:"combate",amount:"",off:[],prevHp:null,ui:{spellQ:"",spellLvl:"all",spellMine:!0,featQ:"",featCat:"all",itemQ:"",libOpen:{}}};function X(s){if(!f.ch||!s)return;const l=structuredClone(f.ch);Object.entries(s).forEach(([a,r])=>Ha(l,a,r)),f.ch=l,V()}const sa=()=>`rpgmesa:last:${f.user.uid}`,_=()=>{f.off.forEach(s=>s()),f.off=[]},ba=Object.fromEntries(ja.map(([s,l])=>[s,l])),Z=Object.fromEntries(T);se().catch(s=>{E.innerHTML=`<div class="wrap"><div class="card">Erro ao iniciar: ${u(s.message)}</div></div>`});async function se(){f.be=await Na(),xa(f.be,E,{title:"Grimório do Aventureiro",subtitle:"Entre com sua conta para acessar seus personagens em qualquer aparelho.",onSignedOut:()=>{_(),f.ch=null,f.chId=null,f.prevHp=null}},async s=>{f.user=s,E.innerHTML='<p class="muted" style="padding:1rem">Carregando compêndio…</p>',f.comp=await Da(f.be);const l=aa.get(sa());l?ta(l):R()})}const ha=()=>f.be.mode==="local"?'<p class="banner">Modo demo: os dados ficam neste navegador. Abra o Escudo em outra aba para testar a sincronização.</p>':"",te=()=>f.comp.completo?"":'<p class="banner">Biblioteca reduzida: o Mestre ainda não importou o compêndio completo no Escudo.</p>';function R(){_(),f.chId=null,f.ch=null,aa.set(sa(),null);let s=!1;f.off.push(f.be.watchMyCharacters(l=>{b("#build")||(l.sort((a,r)=>a.name.localeCompare(r.name)),E.innerHTML=`<header class="top"><div class="row"><div class="grow name">Meus personagens</div>
      <a class="btn small" href="./escudo.html" title="Ir para o Escudo do Mestre">🛡️ Escudo</a>${va(f.user)}</div></header>
    <main class="wrap stack">${ha()}${te()}
      ${l.map(a=>`<button class="charbtn" data-open="${a.id}">
        <span><b>${u(a.name)}</b><br><small class="muted">${u(ga(a))}</small></span>
        <span class="chip">${a.campaignName?"🎲 "+u(a.campaignName):"Sem mesa"}</span></button>`).join("")}
      ${l.length?"":'<div class="card"><p style="margin:0">Você ainda não tem personagens. Crie o primeiro abaixo — ele fica salvo na sua conta.</p></div>'}
      <button class="btn primary" id="newchar" style="width:100%">+ Novo personagem</button>
    </main>`,$a(f.be,E),E.querySelectorAll("[data-open]").forEach(a=>a.onclick=()=>ta(a.dataset.open)),b("#newchar").onclick=()=>ne(),!l.length&&!s&&(s=!0))}))}function ne(){_();const s=f.comp,l=[15,14,13,12,10,8];E.innerHTML=`<header class="top"><div class="row"><button class="btn small" id="back" aria-label="Voltar">◀</button><div class="grow name">Novo personagem</div></div></header>
  <main class="wrap stack">
  <form class="stack" id="build">
    <section class="card stack">
      <div><label for="name">Nome</label><input id="name" name="name" required maxlength="40" /></div>
      <div class="row">
        <div class="grow"><label for="species">Espécie</label><select id="species" name="species">
          ${s.species.map(m=>`<option value="${m.id}">${u(m.nome)}</option>`).join("")}</select></div>
        <div style="width:5.5rem"><label for="level">Nível</label><input id="level" name="level" type="number" inputmode="numeric" min="1" max="20" value="1" /></div>
      </div>
      <div><label for="class">Classe</label><select id="class" name="class">
        ${s.classes.map(m=>`<option value="${m.id}">${u(m.nome)}</option>`).join("")}</select></div>
      <div id="classinfo"></div>
    </section>
    ${s.backgrounds.length?`<section class="card stack">
      <div><label for="bg">Antecedente</label><select id="bg" name="bg">
        ${s.backgrounds.map(m=>`<option value="${m.id}">${u(m.nome)}</option>`).join("")}</select></div>
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
  </form></main>`,b("#back").onclick=R;const a=b("#build"),r=()=>s.byId.classes[a.class.value],t=()=>{var m,h;return(h=s.byId.backgrounds)==null?void 0:h[(m=a.bg)==null?void 0:m.value]};function i(){var w;const m=r(),h=(w=m.periciasOpcoes)!=null&&w.length?m.periciasOpcoes:[];b("#classinfo").innerHTML=`
      <p class="muted" style="margin:.2rem 0;font-size:.88rem">Dado de Vida d${m.dadoVida} · Salvaguardas: ${(m.salvaguardas||[]).map(g=>Z[g]).join(", ")}</p>
      ${h.length?`<div><label>Perícias da classe — escolha ${m.periciasEscolha} <span id="skcount"></span></label>
        <div class="checks">${h.map(g=>`<label class="chk"><input type="checkbox" name="sk" value="${g}"> ${ba[g]}</label>`).join("")}</div></div>`:""}`,a.querySelectorAll("[name=sk]").forEach(g=>g.onchange=e),e()}function e(){var S;const m=r(),h=((S=t())==null?void 0:S.pericias)||[],w=[...a.querySelectorAll("[name=sk]")];w.forEach(o=>{h.includes(o.value)&&(o.checked=!1,o.disabled=!0,o.parentElement.title="Já vem do antecedente")});const g=w.filter(o=>o.checked).length;w.forEach(o=>{h.includes(o.value)||(o.disabled=!o.checked&&g>=m.periciasEscolha)}),b("#skcount")&&(b("#skcount").textContent=`(${g}/${m.periciasEscolha})`)}function c(){const m=t();if(!m)return;const h=s.byId.feats[m.talentoId];b("#bginfo").innerHTML=`
      <p style="margin:.2rem 0;font-size:.9rem"><b>Perícias:</b> ${m.pericias.map(w=>ba[w]).join(", ")}<br>
      <b>Talento:</b> ${u((h==null?void 0:h.nome)||m.talento)}<br><b>Ferramenta:</b> ${u(m.ferramenta)}</p>
      <div class="row">
        <div class="grow"><label for="plus2">+2 em</label><select id="plus2">${m.atributos.map(w=>`<option value="${w}">${Z[w]}</option>`).join("")}<option value="all">+1 nos três</option></select></div>
        <div class="grow" id="plus1wrap"><label for="plus1">+1 em</label><select id="plus1">${m.atributos.map((w,g)=>`<option value="${w}" ${g===1?"selected":""}>${Z[w]}</option>`).join("")}</select></div>
      </div>
      <details class="entry"><summary><span class="t">Equipamento do antecedente</span></summary><div class="body">${u(m.equipamento)}</div></details>`,b("#plus2").onchange=b("#plus1").onchange=y,y(),e()}function n(){const m=t(),h={};if(!m)return h;const w=b("#plus2").value;if(w==="all")m.atributos.forEach(g=>h[g]=1);else{h[w]=2;const g=b("#plus1").value;g!==w&&(h[g]=(h[g]||0)+1)}return h}function y(){const m=n();b("#plus1wrap")&&(b("#plus1wrap").style.visibility=b("#plus2").value==="all"?"hidden":""),a.querySelectorAll(".abfinal").forEach(h=>{const w=h.dataset.ab,g=Math.min(20,Number(a[w].value)+(m[w]||0));h.textContent=m[w]?`→ ${g} (${N(da(g))})`:`(${N(da(g))})`})}const v=27,$={8:0,9:1,10:2,11:3,12:4,13:5,14:7,15:9},p=m=>$[m]??0;let k="array";function A(){const m=k==="buy";if(b("#ab-inputs").innerHTML=T.map(([h,w],g)=>{const S=document.getElementById("ab-"+h),o=S?S.value:m?8:l[g];return`<div><label for="ab-${h}">${w} <b class="abfinal" data-ab="${h}"></b></label>
        <div class="row" style="align-items:center;gap:.4rem;flex-wrap:nowrap">
          ${m?`<button type="button" class="btn small" data-abdown="${h}" aria-label="Diminuir ${w}">−</button>`:""}
          <input id="ab-${h}" name="${h}" type="number" inputmode="numeric" min="${m?8:3}" max="${m?15:20}"
            value="${o}" ${m?'readonly style="width:3.5rem;text-align:center"':""} />
          ${m?`<button type="button" class="btn small" data-abup="${h}" aria-label="Aumentar ${w}">+</button>`:""}
        </div></div>`}).join(""),m){const h=T.reduce((g,[S])=>g+p(Number(a[S].value)),0),w=v-h;b("#abpts").style.display="",b("#abpts").textContent=`${w} de ${v} pontos restantes`,a.querySelectorAll("[data-abup]").forEach(g=>g.onclick=()=>{const S=g.dataset.abup,o=Number(a[S].value);if(!(o>=15)){if(h+(p(o+1)-p(o))>v)return I("Sem pontos suficientes.");a[S].value=o+1,A()}}),a.querySelectorAll("[data-abdown]").forEach(g=>g.onclick=()=>{const S=g.dataset.abdown,o=Number(a[S].value);o<=8||(a[S].value=o-1,A())})}else b("#abpts").style.display="none",T.forEach(([h])=>a[h].oninput=y);y()}E.querySelectorAll("[data-abmode]").forEach(m=>m.onclick=()=>{m.dataset.abmode!==k&&(k=m.dataset.abmode,E.querySelectorAll("[data-abmode]").forEach(h=>h.setAttribute("aria-selected",String(h.dataset.abmode===k))),b("#abmode-help").textContent=k==="buy"?`Compra de pontos: comece com 8 em tudo e gaste os ${v} pontos (custo 9=1, 10=2, 11=3, 12=4, 13=5, 14=7, 15=9). Máximo 15 antes dos bônus do antecedente.`:"Valores base (Array Padrão: 15, 14, 13, 12, 10, 8). Edite livremente, se preferir. O bônus do antecedente é somado automaticamente.",T.forEach(([h],w)=>{const g=document.getElementById("ab-"+h);g&&(g.value=k==="buy"?8:l[w])}),A())}),a.class.onchange=i,a.bg&&(a.bg.onchange=c),i(),c(),A(),a.onsubmit=async m=>{var S;m.preventDefault();const h=n(),w=Object.fromEntries(T.map(([o])=>[o,Math.min(20,Number(a[o].value)+(h[o]||0))])),g=Ma({name:a.name.value.trim(),ownerUid:f.user.uid,speciesId:a.species.value,classId:a.class.value,level:Number(a.level.value),abilities:w,backgroundId:((S=a.bg)==null?void 0:S.value)||null,skillProfs:[...a.querySelectorAll("[name=sk]:checked")].map(o=>o.value)},s);try{ta(await f.be.createCharacter(g))}catch(o){I(o.message)}}}const ga=s=>`${Pa(s.build,f.comp)} · ${Ta(s.build,f.comp)}`;function ta(s){_(),f.chId=s,f.prevHp=null,aa.set(sa(),s),f.off.push(f.be.watchCharacter(s,l=>{if(!l)return R();const a=f.prevHp;if(f.prevHp=l.state.hp.current+l.state.hp.temp,f.ch=l,V(),a!=null&&a!==f.prevHp){const r=b("#hpcard");r==null||r.classList.add(f.prevHp<a?"flash-dmg":"flash-heal"),navigator.vibrate&&f.prevHp<a&&navigator.vibrate(80)}}))}const le=[["combate","❤️","Combate"],["ficha","📜","Ficha"],["magias","✨","Magias"],["classe","🛡️","Traços"],["talentos","⭐","Talentos"],["itens","🎒","Itens"]],P={get S(){return f},app:E,render:()=>V(),save:s=>f.be.updateCharacter(f.chId,s).catch(l=>I(l.message)),toast:I,showHome:()=>R(),confirmTwice:oe,accountChip:va,bindLogout:$a};function V(){if(Ba(V))return;const s=f.ch,l=La(s,f.comp),a=document.activeElement,r=a==null?void 0:a.id,t=a&&"selectionStart"in a?[a.selectionStart,a.selectionEnd]:null,i=window.scrollY,e={combate:{html:ce,bind:re},...ee},c=e[f.tab]||e.combate;if(E.innerHTML=`
    <header class="top">
      <div class="row"><button class="btn small" id="home" aria-label="Meus personagens">◀</button>
        <div class="grow"><div class="name">${u(s.name)}</div>
        <div class="mini"><span>${u(ga(s))}</span>${s.campaignName?`<span>🎲 ${u(s.campaignName)}</span>`:""}</div></div>
        <div class="mini"><span>CA <b>${l.ac}</b></span><span>PV <b>${s.state.hp.current}/${s.state.hp.max}</b></span></div>
        <a class="btn small" href="./escudo.html" title="Ir para o Escudo do Mestre">🛡️</a></div>
    </header>
    <main class="wrap stack">${ha()}${c.html(s,l,P)}</main>
    <nav class="tabs" role="tablist">${le.map(([n,y,v])=>`<button role="tab" aria-selected="${f.tab===n}" data-tab="${n}"><span class="ico" aria-hidden="true">${y}</span>${v}</button>`).join("")}</nav>`,E.querySelectorAll("[data-tab]").forEach(n=>n.onclick=()=>{f.tab=n.dataset.tab,V(),window.scrollTo(0,0)}),b("#home").onclick=R,c.bind(s,l,P),window.scrollTo(0,i),r){const n=document.getElementById(r);if(n&&(n.focus({preventScroll:!0}),t&&"setSelectionRange"in n))try{n.setSelectionRange(...t)}catch{}}}function oe(s,l){const a=b(s);if(a.dataset.armed)return!0;a.dataset.armed="1";const r=a.textContent;return a.textContent=l,setTimeout(()=>{a.isConnected&&(delete a.dataset.armed,a.textContent=r)},3e3),!1}function ie(s,l,a){const r=(s.inventory||[]).filter(e=>{var c,n;return e.itemId&&((n=(c=l.byId)==null?void 0:c.weapons)==null?void 0:n[e.itemId])||e.categoria==="arma"}).map(e=>{var c,n;return{it:e,w:e.itemId?(n=(c=l.byId)==null?void 0:c.weapons)==null?void 0:n[e.itemId]:null}});if(!r.length)return`<section class="card stack"><h2>Ataques</h2>
      <p class="muted" style="margin:0">Nenhuma arma no inventário — desarmado: <b>${N(a.pb+a.mods.for)}</b> pra acertar, <b>1${N(a.mods.for)}</b> de dano contundente.</p></section>`;const t=Object.fromEntries(za(s,l,a).map(e=>[e.uid,e])),i=r.some(({it:e})=>e.equipado);return`<section class="card stack"><h2>Ataques</h2>
    ${r.map(({it:e,w:c})=>{const n=t[e.uid],y=!n&&e.equipado?' <span class="muted">(sem cálculo automático — veja as Notas)</span>':"";return`<div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem">
        <span>${e.equipado?"⚔️ ":""}${u(e.nome||(c==null?void 0:c.nome)||"")}${n?` — <b>${N(n.atk)}</b> pra acertar · <b>${u(n.dice)}${n.dmgBonus?N(n.dmgBonus):""}</b> ${u(n.dmgType)}${n.maestria?` <span class="muted">(${u(n.maestria)})</span>`:""}`:y}</span>
        <button class="btn small ${e.equipado?"":"primary"}" data-swapweapon="${e.uid}">${e.equipado?"Guardar":"Empunhar"}</button>
      </div>`}).join("")}
    ${i?"":`<p class="muted" style="margin:0">Nenhuma arma empunhada — desarmado: <b>${N(a.pb+a.mods.for)}</b> pra acertar, <b>1${N(a.mods.for)}</b> de dano contundente.</p>`}
    <p class="muted" style="margin:0;font-size:.8rem">Toque em "Empunhar"/"Guardar" pra trocar de arma. Bônus de ataque = Proficiência + atributo; dano = dado da arma + atributo.</p>
  </section>`}function ce(s,l){const{hp:a,deathSaves:r={success:0,fail:0},conditions:t=[],dead:i}=s.state,e=a.max+a.temp,c=Math.round(a.current/e*100),n=Math.round(a.temp/e*100),y=a.current/a.max>.5?"":a.current/a.max>.25?"mid":"low",v=a.current===0&&!i,$=s.state.concentration?f.comp.byId.spells[s.state.concentration]:null;return`
  <section class="card stack" id="hpcard">
    <div class="hp-big"><div class="num">${a.current}<small> / ${a.max}</small></div>
      ${a.temp?`<div class="tmpv">+${a.temp} temporários</div>`:""}
      ${i?'<div class="chip bad" style="margin-top:.4rem">MORTO</div>':""}</div>
    <div class="hpbar" aria-hidden="true"><div class="cur ${y}" style="width:${c}%"></div><div class="tmp" style="width:${n}%"></div></div>
    <input id="amount" class="amount" type="number" inputmode="numeric" min="0" placeholder="0" value="${u(f.amount)}" aria-label="Valor" />
    <div class="quick">${[1,2,5,10,"C"].map(p=>`<button class="btn small" data-q="${p}">${p==="C"?"Limpar":"+"+p}</button>`).join("")}</div>
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
    <div><b>${l.ac}</b><small>CA</small></div>
    <div><b>${N(l.initiative)}</b><small>Iniciativa</small></div>
    <div><b>${u(l.speed.replace(" metros"," m"))}</b><small>Deslocamento</small></div>
    <div><b>${l.passivePerception}</b><small>Perc. passiva</small></div>
  </div>
  ${l.armor?`<p class="empty-note" style="margin:.5rem 0 0">CA automática: ${u(l.armor.detalhe)}</p>`:""}</section>
  ${ie(s,f.comp,l)}
  ${$?`<p class="banner">Concentrando em: <b>${u($.nome)}</b> <button class="btn small" id="endconc" style="margin-left:.5rem">Encerrar</button></p>`:""}
  ${v?`<section class="card stack"><h2>Testes contra a morte</h2>
    <div class="saves"><div><small class="muted">Sucessos</small><div class="pips">${[0,1,2].map(p=>`<span class="pip ${p<r.success?"s":""}"></span>`).join("")}</div></div>
      <div><small class="muted">Falhas</small><div class="pips">${[0,1,2].map(p=>`<span class="pip ${p<r.fail?"f":""}"></span>`).join("")}</div></div></div>
    <button class="btn primary" id="roll-death" style="width:100%">Rolar d20</button></section>`:""}
  <section class="card stack"><h2>Condições</h2>
    <div class="row">${t.map(p=>`<button class="chip bad" data-rmcond="${p}" aria-label="Remover ${p}">${ra[p]||p} ✕</button>`).join("")||'<span class="muted">Nenhuma</span>'}</div>
    <div class="row"><select id="addcond" class="grow" aria-label="Adicionar condição"><option value="">Adicionar condição…</option>
      ${Oa.filter(p=>!t.includes(p)).map(p=>`<option value="${p}">${ra[p]||p}</option>`).join("")}</select></div>
  </section>
  <section class="card stack"><h2>Descanso</h2>
    ${(s.state.hitDice.byClass||[]).length>1?s.state.hitDice.byClass.map(p=>{const k=f.comp.byId.classes[p.classId];return`<div class="row" style="justify-content:space-between"><span class="muted">${u((k==null?void 0:k.nome)||p.classId)}: ${p.max-p.used}/${p.max} (d${p.die})</span>
            <button class="btn small" data-shortclass="${p.classId}">Gastar</button></div>`}).join(""):`<p class="muted" style="margin:0">Dados de Vida: ${s.state.hitDice.max-s.state.hitDice.used}/${s.state.hitDice.max} (d${s.state.hitDice.die})</p>
         <div class="row"><button class="btn grow" id="short">Gastar 1 Dado de Vida</button></div>`}
    <div class="row"><button class="btn grow" id="long">Descanso Longo</button></div>
  </section>
  <section class="card"><h2>Registro</h2><ul class="log">${(s.state.log||[]).map(p=>`<li>${u(p)}</li>`).join("")||"<li>—</li>"}</ul></section>`}function re(s,l){E.querySelectorAll("[data-swapweapon]").forEach(t=>t.onclick=()=>{const i=s.inventory||[],e=i.find(n=>n.uid===t.dataset.swapweapon),c=!e.equipado;P.save({inventory:i.map(n=>n.uid===e.uid?{...n,equipado:c}:n)}),I(`${e.nome} ${c?"empunhada":"guardada"}.`)});const a=b("#amount");a.oninput=()=>f.amount=a.value,E.querySelectorAll("[data-q]").forEach(t=>t.onclick=()=>{f.amount=t.dataset.q==="C"?"":String((Number(f.amount)||0)+Number(t.dataset.q)),a.value=f.amount}),E.querySelectorAll("[data-act]").forEach(t=>t.onclick=async()=>{const i=Number(f.amount);if(!i)return I("Digite um valor.");const e={resistant:b("#o-res").checked,vulnerable:b("#o-vul").checked,critical:b("#o-crit").checked};f.amount="";const c=await Y(f.be,f.chId,t.dataset.act,i,e,s.name);X(c.patch),c.concentrationDC&&s.state.concentration?I(`Teste de Concentração: CD ${c.concentrationDC}`):c.log.length&&I(c.log.at(-1))}),b("#endconc")&&(b("#endconc").onclick=()=>P.save({"state.concentration":null})),b("#roll-death")&&(b("#roll-death").onclick=async()=>{const t=ua("1d20").total,i=await Y(f.be,f.chId,"morte",t,{},s.name);X(i.patch),I(`d20 = ${t}. ${i.log.at(-1)??""}`)}),E.querySelectorAll("[data-rmcond]").forEach(t=>t.onclick=()=>P.save({"state.conditions":s.state.conditions.filter(i=>i!==t.dataset.rmcond)})),b("#addcond").onchange=t=>t.target.value&&P.save({"state.conditions":[...s.state.conditions,t.target.value]});const r=async(t,i)=>{const e=ua(`1d${t}`).total+l.mods.con;await i();const c=await Y(f.be,f.chId,"cura",Math.max(0,e),{},s.name);X(c.patch),I(`Dado de Vida: ${e}. ${c.log[0]??""}`)};b("#short")&&(b("#short").onclick=()=>{const t=s.state.hitDice;if(t.used>=t.max)return I("Sem Dados de Vida disponíveis.");r(t.die,()=>P.save({"state.hitDice.used":t.used+1}))}),E.querySelectorAll("[data-shortclass]").forEach(t=>t.onclick=()=>{const i=s.state.hitDice.byClass,e=i.findIndex(y=>y.classId===t.dataset.shortclass),c=i[e];if(c.used>=c.max)return I("Sem Dados de Vida dessa classe.");const n=i.map((y,v)=>v===e?{...y,used:y.used+1}:y);r(c.die,()=>P.save({"state.hitDice.byClass":n,"state.hitDice.used":n.reduce((y,v)=>y+v.used,0)}))}),b("#long").onclick=async()=>{const t=Object.fromEntries(Object.entries(s.state.spellSlots||{}).map(([c,n])=>[c,{...n,used:0}])),i=Object.fromEntries(Object.entries(s.state.pactSlots||{}).map(([c,n])=>[c,{...n,used:0}])),e=(s.state.hitDice.byClass||[]).map(c=>({...c,used:0}));await P.save({"state.hp":{...s.state.hp,current:s.state.hp.max,temp:0},"state.spellSlots":t,"state.pactSlots":i,"state.hitDice":{...s.state.hitDice,byClass:e,used:0},"state.deathSaves":{success:0,fail:0},"state.conditions":s.state.conditions.filter(c=>!["inconsciente","estabilizado"].includes(c))}),I("Descanso longo concluído.")}}
