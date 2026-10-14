import"./pwa-Dtf0izBC.js";import{e as u,A as B,n as _,$ as v,q as da,t as E,E as L,i as j,w as J,x as ja,o as Ia,y as ua,z as Na,B as Ma,D as Da,S as Ta,g as Ba,r as Pa,l as La,s as sa,a as ga,b as ya,F as Oa,G as za,h as Ha,c as Ra,d as Va,C as ma,j as Fa,u as pa,k as X,H as Ua,I as Qa,J as _a,K as Ga,m as Ka,L as ba,f as Wa}from"./mapviewer-B6CzCVxt.js";function va(e){const o=String(e).replace(/\s/g,"").match(/^(\d*)d(\d+)([+-]\d+)?$/i);if(!o)return null;const a=Number(o[1]||1),r=Number(o[2]),l=Number(o[3]||0),p=Array.from({length:a},()=>1+Math.floor(Math.random()*r));return{rolls:p,bonus:l,total:p.reduce((s,n)=>s+n,0)+l}}const H=e=>u(e).replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>").replace(/(^|\s)_([^_]+)_(?=\s|$|[.,;:])/g,"$1<i>$2</i>");function M(e){if(!e)return"";const o=[];for(const a of String(e).split(/\n\n+/)){const r=a.split(`
`);if(r.every(l=>l.startsWith("| "))){o.push('<div class="mdtable"><table>'+r.map(l=>"<tr>"+l.slice(2).split(" | ").map(p=>`<td>${H(p)}</td>`).join("")+"</tr>").join("")+"</table></div>");continue}for(const l of r)l.startsWith("#### ")?o.push(`<h5>${H(l.slice(5))}</h5>`):l.startsWith("### ")?o.push(`<h4>${H(l.slice(4))}</h4>`):l.startsWith("| ")?o.push('<div class="mdtable"><table><tr>'+l.slice(2).split(" | ").map(p=>`<td>${H(p)}</td>`).join("")+"</tr></table></div>"):l.startsWith("• ")?o.push(`<p class="bullet">${H(l)}</p>`):o.push(`<p>${H(l)}</p>`)}return`<div class="md">${o.join("")}</div>`}const P=e=>String(e||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(),wa=Object.fromEntries(B),R=40,Q=e=>e===0?"Truque":`${e}º círculo`,fa=()=>Math.random().toString(36).slice(2,9),N=(e,o,a,r=!1,l="",p="")=>`<details class="entry" ${r?"open":""} ${l}><summary><span class="t">${e}</span><span class="row" style="gap:.4rem;flex-wrap:nowrap"><span class="lvl-badge">${o||""}</span>${p}</span></summary><div class="body">${a}</div></details>`,ta=(e,o,a="Adicionar")=>`<button class="btn small primary addbtn" ${e}="${o}" aria-label="${a}">+</button>`;function Ya(e,o,a){const r=a.S,l=r.comp,p=new Set(e.build.classes.map(t=>t.classId)),s=l.classes.filter(t=>!p.has(t.id)),n=o.classesInfo.slice(1);return`
  <section class="card stack"><h2>Multiclasse</h2>
    <p class="empty-note" style="margin:0">Nível total: ${o.level}/20. Ao multiclassar, confira na aba Traços quais proficiências a nova classe concede (são menos do que na criação) e ajuste "Treinamento e Proficiências" à mão, se precisar.</p>
    ${n.length?n.map(t=>{var i,f,m,w,A;const $=((i=t.cls)==null?void 0:i.subclasses)||[];return`<div class="row" style="flex-wrap:wrap;gap:.5rem;border-top:1px solid var(--border,#3332);padding-top:.5rem">
        <b class="grow">${u(((f=t.cls)==null?void 0:f.nome)||t.classId)}</b>
        <div class="row" style="gap:.3rem"><button class="btn small" data-mcdown="${t.classId}" aria-label="Diminuir nível de ${u(((m=t.cls)==null?void 0:m.nome)||t.classId)}">−</button>
          <span style="min-width:1.4rem;text-align:center">${t.level}</span>
          <button class="btn small" data-mcup="${t.classId}" aria-label="Subir nível de ${u(((w=t.cls)==null?void 0:w.nome)||t.classId)}">+</button></div>
        ${$.length?`<select data-mcsub="${t.classId}" aria-label="Subclasse de ${u(((A=t.cls)==null?void 0:A.nome)||t.classId)}" ${t.level<3?"disabled":""}>
          <option value="">—</option>${$.map(b=>`<option value="${b.id}" ${b.id===t.subclassId?"selected":""}>${u(b.nome)}</option>`).join("")}</select>`:""}
        <button class="btn small danger" data-mcrm="${t.classId}">Remover</button>
      </div>`}).join(""):'<p class="empty-note">Personagem de classe única.</p>'}
    ${s.length&&o.level<20?`<form class="row" id="addclass">
      <select id="mcnew" class="grow" aria-label="Nova classe">${s.map(t=>`<option value="${t.id}">${u(t.nome)}</option>`).join("")}</select>
      <button class="btn primary small">+ Adicionar classe</button></form>`:""}
  </section>`}function Ja(e,o,a){const r=a.S,l=a.app;l.querySelectorAll("[data-mcup]").forEach(p=>p.onclick=()=>{const s=e.build.classes.find(n=>n.classId===p.dataset.mcup);a.save(ua(e,r.comp,p.dataset.mcup,s.level+1))}),l.querySelectorAll("[data-mcdown]").forEach(p=>p.onclick=()=>{const s=e.build.classes.find(n=>n.classId===p.dataset.mcdown);if(s.level<=1)return a.toast('Nível mínimo 1 — use "Remover" para tirar a classe.');a.save(ua(e,r.comp,p.dataset.mcdown,s.level-1))}),l.querySelectorAll("[data-mcsub]").forEach(p=>p.onchange=()=>a.save(Na(e,r.comp,p.dataset.mcsub,p.value||null))),l.querySelectorAll("[data-mcrm]").forEach(p=>p.onclick=()=>{if(!a.confirmTwice(`[data-mcrm="${p.dataset.mcrm}"]`,"Toque de novo para remover"))return;const s=Ma(e,r.comp,p.dataset.mcrm);s&&a.save(s)}),v("#addclass")&&(v("#addclass").onsubmit=p=>{p.preventDefault();const s=Da(e,r.comp,v("#mcnew").value);s&&(a.save(s),a.toast("Classe adicionada no nível 1."))})}function Xa(e,o,a){var t,$;const r=a.S,l=e.build.classes[0].level,p=e.build.classes[0],s=((t=o.cls)==null?void 0:t.subclasses)||[],n=e.build.training||{};return`
  <section class="card stack">
    <div class="sectiontitle"><h2 style="margin:0">${o.multiclass?`${u((($=o.cls)==null?void 0:$.nome)||"")} ${l}`:`Nível ${l}`}</h2>
      <div class="row"><button class="btn small" id="lvldown" aria-label="Diminuir nível">−</button><button class="btn small primary" id="lvlup" aria-label="Subir de nível">+ Nível</button></div></div>
    ${o.multiclass?`<p class="empty-note" style="margin:0">Classe principal (foi ela que deu o 1º dado de vida cheio). Nível total do personagem: ${o.level}.</p>`:""}
    ${s.length?`<div><label for="subclass">Subclasse${l<3?" (a partir do nível 3)":""}</label>
      <select id="subclass" ${l<3?"disabled":""}><option value="">—</option>${s.map(i=>`<option value="${i.id}" ${i.id===p.subclassId?"selected":""}>${u(i.nome)}</option>`).join("")}</select></div>`:""}
    <div class="stats">
      <div><b>${j(o.pb)}</b><small>Proficiência</small></div>
      <div><b>${j(o.initiative)}</b><small>Iniciativa</small></div>
      <div><b>${u(o.speed.replace(" metros"," m"))}</b><small>Deslocamento</small></div>
      <div><b>${o.passivePerception}</b><small>Perc. passiva</small></div>
    </div>
    ${o.armor?`<div class="row"><label for="acbonus" style="margin:0">Bônus extra de CA</label>
      <input id="acbonus" type="number" inputmode="numeric" style="width:6rem" value="${Number(e.build.acBonus)||0}" /></div>
    <p class="empty-note" style="margin:0">Classe de Armadura <b>${o.ac}</b>, calculada sozinha: ${u(o.acDetalhe)}. Use o bônus extra para itens mágicos, estilo de luta Defesa etc. (Sem armadura/escudo equipado, vale o número digitado à mão.)</p>`:`<div class="row"><label for="ac" style="margin:0">Classe de Armadura</label>
      <input id="ac" type="number" inputmode="numeric" style="width:6rem" value="${e.build.ac??10}" /></div>`}
    <div class="row"><label for="hpmax" style="margin:0">PV Máximo</label>
      <input id="hpmax" type="number" inputmode="numeric" min="1" style="width:6rem" value="${e.state.hp.max}" /></div>
    <p class="empty-note" style="margin:0">O PV máximo pode ser ajustado à mão — use o valor rolado no dado com o Mestre. Ao subir de nível, o app só soma o ganho médio da regra a esse valor.</p>
  </section>

  ${Ya(e,o,a)}

  <section class="card stack"><h2>Atributos e Salvaguardas</h2>
    <p class="empty-note">Toque em <b>Salvaguarda</b> para marcar/desmarcar proficiência.</p>
    <div class="abil2">${B.map(([i,f])=>{const m=(e.build.saveProfs||[]).includes(i);return`<div class="abcard">
        <small>${f}</small><b>${j(o.mods[i])}</b>
        <input class="abscore" data-score="${i}" type="number" inputmode="numeric" min="1" max="30" value="${e.build.abilities[i]}" aria-label="Valor de ${f}" />
        <button class="savebtn ${m?"on":""}" data-save="${i}" aria-pressed="${m}">
          <span class="dot ${m?"on":""}"></span>Salvaguarda <b>${j(o.saves[i])}</b></button>
      </div>`}).join("")}</div>
  </section>

  <section class="card"><h2>Perícias</h2><p class="empty-note">Toque para alternar: sem proficiência → proficiente (●) → especialista (◆).</p>
    <div class="skills">${o.skills.map(i=>`<button data-skill="${i.id}" aria-pressed="${i.prof||i.exp}">
      <span class="row" style="flex-wrap:nowrap"><span class="dot ${i.exp?"exp":i.prof?"on":""}"></span>${i.nome} <small class="muted">(${i.ab.toUpperCase()})</small></span><b>${j(i.bonus)}</b></button>`).join("")}</div>
  </section>

  <section class="card stack"><h2>Treinamento e Proficiências</h2>
    ${[["armaduras","Treinamento com Armaduras"],["armas","Proficiência com Armas"],["ferramentas","Proficiência com Ferramentas"],["idiomas","Idiomas"]].map(([i,f])=>`<div><label for="tr-${i}">${f}</label><textarea id="tr-${i}" data-train="${i}" rows="2">${u(n[i]||"")}</textarea></div>`).join("")}
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
  </section>`}let $a={};const O=(e,o,a=600)=>{clearTimeout($a[e]),$a[e]=setTimeout(o,a)};function Za(e,o,a){const r=a.S,l=a.app,p=e.build.classes[0].level;v("#lvlup").onclick=()=>o.level<20&&a.save(J(e,r.comp,p+1)).then(()=>a.toast(`Nível ${p+1}! PV máximo, Dados de Vida e espaços atualizados.`)),v("#lvldown").onclick=()=>p>1&&a.save(J(e,r.comp,p-1)),v("#subclass")&&(v("#subclass").onchange=s=>a.save(J(e,r.comp,p,s.target.value||null))),Ja(e,o,a),v("#ac")&&(v("#ac").onchange=s=>a.save({"build.ac":Number(s.target.value)||10})),v("#acbonus")&&(v("#acbonus").onchange=s=>a.save({"build.acBonus":Number(s.target.value)||0})),v("#hpmax").onchange=s=>{const n=Math.max(1,Number(s.target.value)||1);a.save({"state.hp":{...e.state.hp,max:n,current:Math.min(e.state.hp.current,n)}})},l.querySelectorAll("[data-score]").forEach(s=>s.onchange=()=>{const n=Math.max(1,Math.min(30,Number(s.value)||10)),t=s.dataset.score,$={[`build.abilities.${t}`]:n};t==="con"&&($["state.hp"]={...e.state.hp,...ja(e,r.comp,n)}),a.save($)}),l.querySelectorAll("[data-save]").forEach(s=>s.onclick=()=>{const n=s.dataset.save,t=e.build.saveProfs||[];a.save({"build.saveProfs":t.includes(n)?t.filter($=>$!==n):[...t,n]})}),l.querySelectorAll("[data-skill]").forEach(s=>s.onclick=()=>{const n=s.dataset.skill,t=e.build.skillProfs||[],$=e.build.expertise||[];$.includes(n)?a.save({"build.expertise":$.filter(i=>i!==n),"build.skillProfs":t.filter(i=>i!==n)}):t.includes(n)?a.save({"build.expertise":[...$,n]}):a.save({"build.skillProfs":[...t,n]})}),l.querySelectorAll("[data-train]").forEach(s=>s.oninput=()=>O("tr"+s.dataset.train,()=>a.save({[`build.training.${s.dataset.train}`]:s.value}))),v("#notes").oninput=s=>O("notes",()=>a.save({notes:s.target.value})),a.bindLogout(r.be,l),v("#join")&&(v("#join").onsubmit=async s=>{s.preventDefault();try{const n=await r.be.joinByCode(v("#code").value);await r.be.updateCharacter(r.chId,{campaignId:n.id,campaignName:n.name}),a.toast(`${e.name} entrou na mesa ${n.name}.`)}catch(n){a.toast(n.message)}}),v("#leave-table")&&(v("#leave-table").onclick=()=>{a.confirmTwice("#leave-table","Toque de novo para confirmar")&&a.save({campaignId:null,campaignName:null})}),v("#delete").onclick=async()=>{if(!a.confirmTwice("#delete",`Toque de novo para apagar ${e.name}`))return;const s=r.chId;await r.be.deleteCharacter(s),a.showHome()}}function ae(e,o,a){const r=a.S,l=r.comp,p=r.ui,s=new Set(o.bonusSpells||[]),n=(e.build.spellsKnown||[]).filter(d=>!s.has(d)),t=e.build.spellsPrepared||[],$=[...s].map(d=>l.byId.spells[d]).filter(Boolean).sort((d,S)=>d.nivel-S.nivel||d.nome.localeCompare(S.nome)),i=Object.entries(e.state.spellSlots||{}),f=Object.entries(e.state.pactSlots||{}),m=[...i,...f].reduce((d,[S,I])=>I.max>0?Math.max(d,Number(S)):d,0),w=o.casters.length>0,A=n.map(d=>l.byId.spells[d]).filter(Boolean).sort((d,S)=>d.nivel-S.nivel||d.nome.localeCompare(S.nome)),b={};A.forEach(d=>{var S;return(b[S=d.nivel]||(b[S]=[])).push(d)});const g=e.build.classes.map(d=>d.classId),k=o.classesInfo.map(d=>{var S;return(S=d.cls)==null?void 0:S.nome}).filter(Boolean).join(" + "),y=o.spellCaps||{},q=A.filter(d=>d.nivel===0).length,c=A.filter(d=>d.nivel>0).length,C=t.length,z=y.cantrips!==null&&q>=y.cantrips,qa=y.known!==null&&c>=y.known,Aa=y.prepared!==null&&C>=y.prepared,la=P(p.spellQ);let U=l.spells.filter(d=>!n.includes(d.id)&&!s.has(d.id)&&(!p.spellMine||!o.casters.length||d.classes.some(S=>g.includes(S)))&&(p.spellLvl==="all"||String(d.nivel)===p.spellLvl)&&(!la||P(d.nome).includes(la)));const ia=U.length;U=U.slice(0,R);const Ca=d=>(d.nivel===0?z:qa)?`<button class="btn small" data-learnfull="${d.nivel===0?"truque":"magia"}" aria-label="Limite atingido">+</button>`:ta("data-learn",d.id,"Adicionar "+u(d.nome)),Ea=d=>{const S=t.includes(d.id);return!S&&Aa?'<button class="btn small" data-prepfull="1" aria-label="Limite de magias preparadas atingido">Preparar</button>':`<button class="btn small" data-prep="${d.id}">${S?"✓ Preparada":"Preparar"}</button>`},ca=d=>L[d]?(e.state.effects||[]).some(S=>S.id===d)?'<span class="chip">Efeito ativo</span>':`<button class="btn small" data-fx="${d}">Ativar efeito (CA/desloc.)</button>`:"",ra=(d,S)=>`
    <div class="muted" style="font-size:.85rem">${u(d.escola)} · ${u(d.tempo)} · ${u(d.alcance)}<br>${u(d.componentes)} · ${u(d.duracao)}</div>
    ${M(d.desc)}
    <div class="row">${S?`${d.nivel>0?Ea(d):""}
         ${d.concentracao?`<button class="btn small" data-conc="${d.id}">${e.state.concentration===d.id?"Encerrar concentração":"Concentrar"}</button>`:""}
         ${ca(d.id)}
         <button class="btn small" data-forget="${d.id}">Remover</button>`:""}</div>`,W=d=>[d.concentracao?"C":"",d.ritual?"R":""].filter(Boolean).map(S=>`<span class="chip">${S}</span>`).join(" "),Y=(d,S,I)=>I===null?"":`<span class="lvl-badge">${S}/${I} ${d}</span>`,xa=d=>`
    <div class="muted" style="font-size:.85rem">${u(d.escola)} · ${u(d.tempo)} · ${u(d.alcance)}<br>${u(d.componentes)} · ${u(d.duracao)}</div>
    ${M(d.desc)}
    ${d.concentracao||L[d.id]?`<div class="row">${d.concentracao?`<button class="btn small" data-conc="${d.id}">${e.state.concentration===d.id?"Encerrar concentração":"Concentrar"}</button>`:""}${ca(d.id)}</div>`:""}`;return`
  ${o.casters.length?`<section class="card stack">${o.casters.map(d=>`<div class="stats" style="grid-template-columns:repeat(3,1fr)">
    <div><b>${d.dc}</b><small>CD (${u(d.nome)})</small></div><div><b>${j(d.atk)}</b><small>Ataque mágico</small></div>
    <div><b>${wa[d.atributoConjuracao].slice(0,3)}</b><small>Atributo</small></div></div>`).join("")}</section>`:""}
  ${i.length?`<section class="card slots"><h2>Espaços de magia${o.multiclass?" (combinados)":""}</h2>
    ${i.map(([d,S])=>`<div class="lvl"><span>${d}º</span>${Array.from({length:S.max},(I,T)=>`<button class="slotpip ${T<S.used?"used":""}" data-slot="${d}" data-i="${T}" aria-label="Espaço de ${d}º círculo ${T+1}${T<S.used?", gasto":""}"></button>`).join("")}</div>`).join("")}
  </section>`:""}
  ${f.length?`<section class="card slots"><h2>Magia de Pacto</h2>
    ${f.map(([d,S])=>`<div class="lvl"><span>${d}º</span>${Array.from({length:S.max},(I,T)=>`<button class="slotpip ${T<S.used?"used":""}" data-pactslot="${d}" data-i="${T}" aria-label="Espaço de pacto ${T+1}${T<S.used?", gasto":""}"></button>`).join("")}</div>`).join("")}
  </section>`:""}
  ${$.length?`<section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Magias da Subclasse</h2><span class="lvl-badge">sempre preparadas</span></div>
    <p class="empty-note" style="margin:0">Concedidas automaticamente pela subclasse — não contam no limite de magias conhecidas/preparadas, mas ainda gastam um espaço de magia ao conjurar.</p>
    <div class="stack">${$.map(d=>N(`${u(d.nome)} ${W(d)}`,Q(d.nivel),xa(d),!1,`data-k="b-${d.id}"`)).join("")}</div>
  </section>`:""}
  ${y.cantrips!==null||y.known!==null||y.prepared!==null?`<section class="card stack"><h2>Limites de magias (regra 2024)</h2>
    <div class="row" style="flex-wrap:wrap;gap:.4rem">${Y("truques",q,y.cantrips)}${Y("magias conhecidas",c,y.known)}${Y("preparadas",C,y.prepared)}</div>
    <details class="entry"><summary><span class="t">Exceção manual (magia extra de livro/pergaminho…)</span></summary><div class="body stack">
      <p class="empty-note" style="margin:0">Some ao limite oficial acima. Use quando o personagem aprendeu algo fora da regra normal.</p>
      <div class="row" style="flex-wrap:wrap">
        <div class="grow"><label for="extra-cantrips">Truques extras</label><input id="extra-cantrips" type="number" min="0" value="${e.build.extraCantrips||0}" /></div>
        <div class="grow"><label for="extra-spells">Magias extras</label><input id="extra-spells" type="number" min="0" value="${e.build.extraSpells||0}" /></div>
        ${y.invocacoes!==null?`<div class="grow"><label for="extra-invoc">Invocações extras</label><input id="extra-invoc" type="number" min="0" value="${e.build.extraInvocations||0}" /></div>`:""}
      </div>
      <div><label for="extra-note">Motivo (opcional)</label>
        <textarea id="extra-note" rows="2" placeholder="Ex.: aprendeu com um pergaminho encontrado na masmorra">${u(e.build.extraSpellsNote||"")}</textarea></div>
    </div></details>
  </section>`:""}
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Minhas magias</h2><span class="lvl-badge">${t.length} preparada(s)</span></div>
    ${Object.keys(b).length?Object.entries(b).map(([d,S])=>`<h3 style="margin:.6rem 0 .2rem;color:var(--muted)">${Q(Number(d))}</h3>
      <div class="stack" style="--gap:.4rem">${S.map(I=>N(`${I.nivel>0&&t.includes(I.id)?"✓ ":""}${u(I.nome)} ${W(I)}`,Q(I.nivel),ra(I,!0),!1,`data-k="m-${I.id}"`)).join("")}</div>`).join(""):'<p class="empty-note">Nenhuma magia ainda. Adicione pela biblioteca abaixo.</p>'}
  </section>
  <section class="card stack"><h2>Biblioteca de magias</h2>
    <input id="spellq" type="search" placeholder="Buscar magia pelo nome…" value="${u(p.spellQ)}" aria-label="Buscar magia" />
    <div class="filters">${["all","0","1","2","3","4","5","6","7","8","9"].map(d=>{const S=d==="all"||(d==="0"?w:w&&Number(d)<=m);return`<button data-flvl="${d}" aria-pressed="${p.spellLvl===d}" class="${S?"":"unavail"}" ${S?"":'title="Ainda não disponível no seu nível"'}>${d==="all"?"Todas":d==="0"?"Truques":d+"º"}</button>`}).join("")}</div>
    ${w?`<p class="empty-note" style="margin:0">Seu nível permite conjurar ${m===0?"só truques":`truques e magias até ${m}º círculo`}. Os demais círculos aparecem esmaecidos até você subir de nível.</p>`:""}
    ${k?`<label class="chk"><input type="checkbox" id="spellmine" ${p.spellMine?"checked":""}> Só a lista de ${u(k)}</label>`:""}
    <p class="empty-note">${ia} magia(s)${ia>R?` — mostrando ${R}, refine a busca`:""}.</p>
    <div class="stack">${U.map(d=>N(`${u(d.nome)} ${W(d)}`,Q(d.nivel),ra(d,!1),!1,`data-k="l-${d.id}"`,Ca(d))).join("")}</div>
  </section>`}function ee(e,o,a){const r=a.S,l=a.app,p=r.ui;l.querySelectorAll("[data-slot]").forEach(s=>s.onclick=()=>{const n=s.dataset.slot,t=Number(s.dataset.i),$=e.state.spellSlots[n];a.save({[`state.spellSlots.${n}.used`]:t<$.used?t:t+1})}),l.querySelectorAll("[data-pactslot]").forEach(s=>s.onclick=()=>{const n=s.dataset.pactslot,t=Number(s.dataset.i),$=e.state.pactSlots[n];a.save({[`state.pactSlots.${n}.used`]:t<$.used?t:t+1})}),v("#spellq").oninput=s=>{p.spellQ=s.target.value,O("sq",a.render,250)},l.querySelectorAll("[data-flvl]").forEach(s=>s.onclick=()=>{p.spellLvl=s.dataset.flvl,a.render()}),v("#spellmine")&&(v("#spellmine").onchange=s=>{p.spellMine=s.target.checked,a.render()}),l.querySelectorAll("[data-learn]").forEach(s=>s.onclick=()=>a.save({"build.spellsKnown":[...e.build.spellsKnown||[],s.dataset.learn]})),l.querySelectorAll("[data-learnfull]").forEach(s=>s.onclick=()=>E(`Limite de ${s.dataset.learnfull==="truque"?"truques conhecidos":"magias conhecidas"} atingido. Use a exceção manual acima se for o caso.`)),l.querySelectorAll("[data-forget]").forEach(s=>s.onclick=()=>a.save({"build.spellsKnown":(e.build.spellsKnown||[]).filter(n=>n!==s.dataset.forget),"build.spellsPrepared":(e.build.spellsPrepared||[]).filter(n=>n!==s.dataset.forget)})),l.querySelectorAll("[data-prep]").forEach(s=>s.onclick=()=>{const n=e.build.spellsPrepared||[],t=s.dataset.prep;a.save({"build.spellsPrepared":n.includes(t)?n.filter($=>$!==t):[...n,t]})}),l.querySelectorAll("[data-prepfull]").forEach(s=>s.onclick=()=>E("Limite de magias preparadas atingido. Use a exceção manual acima se for o caso.")),v("#extra-cantrips")&&(v("#extra-cantrips").onchange=s=>a.save({"build.extraCantrips":Math.max(0,Number(s.target.value)||0)})),v("#extra-spells")&&(v("#extra-spells").onchange=s=>a.save({"build.extraSpells":Math.max(0,Number(s.target.value)||0)})),v("#extra-invoc")&&(v("#extra-invoc").onchange=s=>a.save({"build.extraInvocations":Math.max(0,Number(s.target.value)||0)})),v("#extra-note")&&(v("#extra-note").oninput=s=>O("extranote",()=>a.save({"build.extraSpellsNote":s.target.value}))),l.querySelectorAll("[data-fx]").forEach(s=>s.onclick=()=>{const n=s.dataset.fx,t=L[n];a.save({"state.effects":[...e.state.effects||[],{uid:Math.random().toString(36).slice(2,10),id:n,nome:t.nome,rounds:t.rounds}]}),E(`${t.nome} ativo — CA/deslocamento ajustados. Veja em Combate › Efeitos ativos.`)}),l.querySelectorAll("[data-conc]").forEach(s=>s.onclick=()=>a.save({"state.concentration":e.state.concentration===s.dataset.conc?null:s.dataset.conc})),G(l,"spells")}const Z={};function G(e,o){e.querySelectorAll("summary .addbtn").forEach(r=>r.addEventListener("click",l=>l.preventDefault()));const a=Z[o]||(Z[o]=new Set);e.querySelectorAll("details.entry").forEach((r,l)=>{var s;const p=r.dataset.k||((s=r.querySelector("summary .t"))==null?void 0:s.textContent)||l;a.has(p)&&(r.open=!0),r.addEventListener("toggle",()=>r.open?a.add(p):a.delete(p))})}function se(e,o,a,r){var A;const{cls:l,sub:p,level:s,classId:n}=o;if(!l)return`<section class="card">Classe "${u(n)}" não encontrada no compêndio.</section>`;const t=l.nome,$=l.caracteristicas||[],i=$.filter(b=>b.nivel<=s),f=$.filter(b=>b.nivel>s),m=e.build.opcoes||[],w=n==="bruxo"?((A=a.spellCaps)==null?void 0:A.invocacoes)??null:null;return`
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Características de ${u(t)}</h2><span class="lvl-badge">nível ${s}</span></div>
    ${i.length?i.map(b=>N(u(b.nome),`Nível ${b.nivel}`,M(b.desc))).join(""):'<p class="empty-note">Importe o compêndio completo para ver as características.</p>'}
    ${f.length?`<details class="entry"><summary><span class="t muted">Próximos níveis (${f.length})</span></summary><div class="body stack">
      ${f.map(b=>N(u(b.nome),`Nível ${b.nivel}`,M(b.desc))).join("")}</div></details>`:""}
  </section>
  ${(l.opcoes||[]).map(b=>{const g=n==="bruxo"&&/Invoca/i.test(b.titulo),k=g?b.itens.filter(q=>m.includes(q.id)).length:null,y=g&&w!==null&&k>=w;return`<section class="card stack"><div class="sectiontitle"><h2 style="margin:0">${u(b.titulo.replace("Opções de ",""))} (${u(t)})</h2>${g&&w!==null?`<span class="lvl-badge">${k}/${w}</span>`:""}</div>
    ${b.itens.filter(q=>m.includes(q.id)).map(q=>N("✓ "+u(q.nome),"",M(q.desc)+`<button class="btn small" data-unop="${q.id}">Remover</button>`)).join("")||'<p class="empty-note">Nenhuma escolhida.</p>'}
    <details class="entry"><summary><span class="t">Escolher ${u(b.titulo.replace("Opções de ","").toLowerCase())}</span><span class="lvl-badge">${b.itens.length}</span></summary><div class="body stack">
      ${b.itens.filter(q=>!m.includes(q.id)).map(q=>N(u(q.nome),"",M(q.desc),!1,`data-k="o-${n}-${q.id}"`,y?'<button class="btn small" data-opfull="1" aria-label="Limite de invocações atingido">+</button>':ta("data-op",q.id,"Escolher "+u(q.nome)))).join("")}
    </div></details></section>`}).join("")}
  <section class="card stack"><h2>Subclasse de ${u(t)}${p?": "+u(p.nome):""}</h2>
    ${p?(p.caracteristicas||[]).map(b=>N(`${b.nivel>s?"🔒 ":""}${u(b.nome)}`,`Nível ${b.nivel}`,M(b.desc))).join(""):`<p class="empty-note">${s<3?"A subclasse é escolhida no nível 3.":"Escolha a subclasse na aba Ficha (ou em Multiclasse, para uma classe secundária)."}</p>
         ${(l.subclasses||[]).map(b=>N(u(b.nome),"",M(b.intro))).join("")}`}
  </section>`}function te(e,o,a){const r=o.sp,l=o.bg,p=o.speciesLabel||(r==null?void 0:r.nome)||"espécie";return`
  ${o.classesInfo.map(s=>se(e,s,o)).join("")}
  <section class="card stack"><h2>Traços de ${u(p)}</h2>
    ${r&&p!==r.nome?`<p class="empty-note" style="margin:0">Usa as regras de ${u(r.nome)}.</p>`:""}
    <p class="empty-note">${u((r==null?void 0:r.tipo)||"")} · ${u((r==null?void 0:r.tamanho)||"")} · Deslocamento ${u((r==null?void 0:r.deslocamento)||"")}</p>
    ${((r==null?void 0:r.tracos)||[]).filter(s=>s.nome!=="Detalhes").map(s=>N(u(s.nome),"",M(s.desc))).join("")||'<p class="empty-note">Sem traços no compêndio.</p>'}
  </section>
  ${l?`<section class="card stack"><h2>Antecedente: ${u(l.nome)}</h2>
    <p style="margin:0;font-size:.92rem"><b>Atributos:</b> ${l.atributos.map(s=>wa[s]).join(", ")}<br>
    <b>Talento:</b> ${u(l.talento)}<br><b>Ferramenta:</b> ${u(l.ferramenta)}<br><b>Equipamento:</b> ${u(l.equipamento)}</p></section>`:""}
`}function ne(e,o,a){const r=a.app,l=e.build.opcoes||[];r.querySelectorAll("[data-op]").forEach(p=>p.onclick=()=>a.save({"build.opcoes":[...l,p.dataset.op]})),r.querySelectorAll("[data-unop]").forEach(p=>p.onclick=()=>a.save({"build.opcoes":l.filter(s=>s!==p.dataset.unop)})),r.querySelectorAll("[data-opfull]").forEach(p=>p.onclick=()=>E("Limite de invocações místicas atingido. Use a exceção manual na aba Magias se for o caso.")),G(r,"classe")}const oe=["Origem","Geral","Estilo de Luta","Dádiva Épica"];function le(e,o,a){const r=a.S,l=r.comp,p=r.ui,s=e.build.feats||[],n=P(p.featQ);let t=l.feats.filter(i=>(i.repetivel||!s.some(f=>f.id===i.id))&&(p.featCat==="all"||i.categoria===p.featCat)&&(!n||P(i.nome).includes(n)||P(i.prereq).includes(n)));const $=t.length;return t=t.slice(0,R),`
  <section class="card stack"><h2>Meus talentos</h2>
    ${s.length?s.map((i,f)=>{const m=l.byId.feats[i.id];return N(u((m==null?void 0:m.nome)||i.id),u(i.origem||(m==null?void 0:m.categoria)||""),(m?`<p class="empty-note">${u(m.categoria)}${m.prereq?" · Pré-requisito: "+u(m.prereq):""}</p>${M(m.desc)}`:'<p class="empty-note">Talento fora do compêndio.</p>')+`<button class="btn small" data-unfeat="${f}">Remover</button>`)}).join(""):'<p class="empty-note">Nenhum talento. Seu antecedente concede um talento de Origem.</p>'}
  </section>
  <section class="card stack"><h2>Biblioteca de talentos</h2>
    <input id="featq" type="search" placeholder="Buscar talento…" value="${u(p.featQ)}" aria-label="Buscar talento" />
    <div class="filters">${["all",...oe].map(i=>`<button data-fcat="${i}" aria-pressed="${p.featCat===i}">${i==="all"?"Todos":i}</button>`).join("")}</div>
    <p class="empty-note">${$} talento(s)${$>R?` — mostrando ${R}`:""}.</p>
    ${t.map(i=>N(u(i.nome),u(i.categoria),`${i.prereq?`<p class="empty-note">Pré-requisito: ${u(i.prereq)}</p>`:""}${M(i.desc)}`,!1,`data-k="f-${i.id}"`,ta("data-feat",i.id,"Adicionar "+u(i.nome)))).join("")}
    ${l.feats.length?"":'<p class="empty-note">Importe o compêndio completo para usar a biblioteca de talentos.</p>'}
  </section>`}function ie(e,o,a){const r=a.S,l=a.app,p=e.build.feats||[];v("#featq").oninput=s=>{r.ui.featQ=s.target.value,O("fq",a.render,250)},l.querySelectorAll("[data-fcat]").forEach(s=>s.onclick=()=>{r.ui.featCat=s.dataset.fcat,a.render()}),l.querySelectorAll("[data-feat]").forEach(s=>s.onclick=()=>{a.save({"build.feats":[...p,{id:s.dataset.feat,origem:"Escolhido"}]}),a.toast("Talento adicionado. Aplique aumentos de atributo na aba Ficha, se houver.")}),l.querySelectorAll("[data-unfeat]").forEach(s=>s.onclick=()=>a.save({"build.feats":p.filter((n,t)=>t!==Number(s.dataset.unfeat))})),G(l,"feats")}function ce(e,o,a){const r=a.S,l=r.comp,p=r.ui,s=_(e),n=e.coins||{},t=P(p.itemQ),$=t.length>=2?l.items.filter(c=>P(c.nome).includes(t)).slice(0,25):[],i=Math.min(100,Math.round(o.weight/o.carry*100)),f=c=>c.tipo==="arma"?`${u(c.dano)} · ${u(c.propriedades)} · Maestria: ${u(c.maestria)}`:c.tipo==="armadura"?`CA ${u(c.ca)}${c.forca&&c.forca!=="—"?" · "+u(c.forca):""}${c.furtividade==="Desvantagem"?" · Desv. Furtividade":""}`:"",m=c=>c.itemId?l.byId.weapons[c.itemId]||l.byId.armor[c.itemId]||l.byId.gear[c.itemId]:null,w=(c,C)=>/po[çc][aã]o|elixir|antídoto/i.test(c.nome||(C==null?void 0:C.nome)||""),A={arma:"Armas",armadura:"Armaduras",pocao:"Poções"},b=c=>{const C=m(c);return(C==null?void 0:C.tipo)==="arma"?"Armas":(C==null?void 0:C.tipo)==="armadura"?"Armaduras":!C&&A[c.categoria]?A[c.categoria]:w(c,C)?"Poções":"Outros"},g=c=>c.categoria==="arma"&&c.dano?`${u(c.dano)}${c.ranged?" · À distância":""}${c.finesse?" · Acuidade":""}`:c.categoria==="armadura"&&Number(c.ca)?`CA ${c.ca}${c.caDex?` + Destreza${c.caDexMax!=null&&c.caDexMax!==""?` (máx ${c.caDexMax})`:""}`:""}`:"",k=c=>{const C=m(c),z=!C&&g(c);return N(`${c.equipado?"🛡️ ":""}${u(c.nome)}${Number(c.qtd)>1?` <span class="muted">×${c.qtd}</span>`:""}`,u(c.peso||""),`${C?`<p class="empty-note">${f(C)}${C.custo?" · "+u(C.custo):""}</p>${C.desc?M(C.desc):""}`:z?`<p class="empty-note">${z}</p>`:""}
      <div class="row">
        <button class="btn small" data-qty="${c.uid}" data-d="-1">−</button><b>${c.qtd}</b><button class="btn small" data-qty="${c.uid}" data-d="1">+</button>
        <label class="chk"><input type="checkbox" data-equip="${c.uid}" ${c.equipado?"checked":""}> Equipado</label>
        <label class="chk"><input type="checkbox" data-attune="${c.uid}" ${c.sintonizado?"checked":""}> Sintonizado</label>
      </div>
      <input data-inote="${c.uid}" id="inote-${c.uid}" value="${u(c.notas||"")}" placeholder="Notas (cargas, efeitos…)" aria-label="Notas do item" />
      <button class="btn small danger" data-rmitem="${c.uid}">Remover item</button>`,!1,`data-k="i-${c.uid}"`)},y=["Armas","Armaduras","Poções","Outros"],q=Object.fromEntries(y.map(c=>[c,s.filter(C=>b(C)===c)]));return`
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Bolsa de moedas</h2><span class="lvl-badge">≈ ${o.coinsGP.toLocaleString("pt-BR",{maximumFractionDigits:2})} PO</span></div>
    <div class="coins">${da.map(([c,C,z])=>`<label class="coin coin-${c}"><span>${C}</span>
      <input type="number" inputmode="numeric" min="0" data-coin="${c}" value="${Number(n[c])||0}" aria-label="${z}" /></label>`).join("")}</div>
    <form class="row" id="coinop">
      <input id="coinamt" type="number" inputmode="numeric" min="1" placeholder="Qtd." style="width:5.5rem" aria-label="Quantidade" />
      <select id="coinkind" style="width:5.5rem" aria-label="Moeda">${da.map(([c,C])=>`<option value="${c}" ${c==="po"?"selected":""}>${C}</option>`).join("")}</select>
      <button class="btn heal small" data-cop="+">Receber</button><button class="btn danger small" data-cop="-">Gastar</button>
    </form>
  </section>
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Inventário</h2><span class="lvl-badge">${o.weight.toLocaleString("pt-BR",{maximumFractionDigits:1})} / ${o.carry} kg</span></div>
    <div class="hpbar" aria-hidden="true"><div class="cur ${i>100?"low":i>75?"mid":""}" style="width:${i}%"></div></div>
    ${s.length?y.filter(c=>q[c].length).map(c=>`
      <div class="inv-divider"><span>${c}</span><span class="muted">${q[c].length}</span></div>
      ${q[c].map(k).join("")}`).join(""):'<p class="empty-note">Inventário vazio.</p>'}
  </section>
  <section class="card stack"><h2>Adicionar item</h2>
    <input id="itemq" type="search" placeholder="Buscar armas, armaduras, equipamento… (2+ letras)" value="${u(p.itemQ)}" aria-label="Buscar item" />
    ${$.map(c=>`<div class="libitem"><div class="info"><b>${u(c.nome)}</b><small>${u(c.custo||"")}${c.peso?" · "+u(c.peso):""} ${f(c)?"· "+f(c):""}</small></div>
      <button class="btn small primary" data-additem="${c.id}">+</button></div>`).join("")}
    ${t.length>=2&&!$.length?'<p class="empty-note">Nada encontrado — crie um item personalizado abaixo.</p>':""}
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
  </section>`}function re(e,o,a){const r=a.S,l=a.app,p=r.comp,s=_(e),n={pc:0,pp:0,pe:0,po:0,pl:0,...e.coins||{}},t=f=>a.save({inventory:f});l.querySelectorAll("[data-coin]").forEach(f=>f.onchange=()=>a.save({coins:{...n,[f.dataset.coin]:Math.max(0,Number(f.value)||0)}})),l.querySelectorAll("[data-cop]").forEach(f=>f.onclick=m=>{m.preventDefault();const w=Number(v("#coinamt").value),A=v("#coinkind").value;if(!w)return a.toast("Digite a quantidade.");const b=n[A]+(f.dataset.cop==="+"?w:-w);if(b<0)return a.toast(`Não há ${w} ${A.toUpperCase()} suficientes.`);a.save({coins:{...n,[A]:b}})}),v("#itemq").oninput=f=>{r.ui.itemQ=f.target.value,O("iq",a.render,250)},l.querySelectorAll("[data-additem]").forEach(f=>f.onclick=()=>{const m=p.items.find(A=>A.id===f.dataset.additem),w=s.find(A=>A.itemId===m.id);t(w?s.map(A=>A===w?{...A,qtd:Number(A.qtd)+1}:A):[...s,{uid:fa(),itemId:m.id,nome:m.nome,qtd:1,peso:m.peso||"",equipado:!1,sintonizado:!1,notas:""}]),a.toast(`${m.nome} adicionado.`)});const $=()=>{const f=v("#ccat").value;v("#c-arma-fields").style.display=f==="arma"?"":"none",v("#c-armadura-fields").style.display=f==="armadura"?"":"none"};v("#ccat").onchange=$,$(),v("#custom").onsubmit=f=>{f.preventDefault();const m=v("#cname").value.trim();if(!m)return;const w=v("#cweight").value.trim(),A=Math.max(1,Number(v("#cqty").value)||1),b=v("#ccat").value,g={uid:fa(),itemId:null,nome:m,categoria:b,qtd:A,peso:w?`${w} kg`:"",equipado:!1,sintonizado:!1,notas:v("#cdetail").value.trim()};if(b==="arma"){const k=v("#cdano").value.trim();k&&(g.dano=k),g.ranged=v("#cranged").checked,g.finesse=v("#cfinesse").checked}else if(b==="armadura"){const k=Number(v("#ccabase").value);k&&(g.ca=k),g.caDex=v("#ccadex").checked;const y=v("#ccadexmax").value.trim();y&&(g.caDexMax=Number(y))}t([...s,g]),a.toast(`${m} adicionado.`)};const i=(f,m)=>t(s.map(w=>w.uid===f?m(w):w));l.querySelectorAll("[data-qty]").forEach(f=>f.onclick=()=>i(f.dataset.qty,m=>({...m,qtd:Math.max(0,Number(m.qtd)+Number(f.dataset.d))}))),l.querySelectorAll("[data-equip]").forEach(f=>f.onchange=()=>i(f.dataset.equip,m=>({...m,equipado:f.checked}))),l.querySelectorAll("[data-attune]").forEach(f=>f.onchange=()=>{if(f.checked&&s.filter(m=>m.sintonizado).length>=3)return f.checked=!1,a.toast("Limite de 3 itens sintonizados.");i(f.dataset.attune,m=>({...m,sintonizado:f.checked}))}),l.querySelectorAll("[data-inote]").forEach(f=>f.oninput=()=>O("in"+f.dataset.inote,()=>i(f.dataset.inote,m=>({...m,notas:f.value})))),l.querySelectorAll("[data-rmitem]").forEach(f=>f.onclick=()=>t(s.filter(m=>m.uid!==f.dataset.rmitem))),G(l,"itens")}function de(e,o,a){const r=a.S.maps||[];return e.campaignId?`<section class="card stack"><h2>🗺️ Mapas da mesa</h2>
    ${r.length?r.map(l=>`<button class="mapv-row" data-mapopen="${u(l.id)}"><span class="mapv-ico">🗺️</span><span><b>${u(l.nome)}</b><br><small class="muted">Toque para abrir · suas marcações são privadas</small></span></button>`).join(""):'<p class="empty-note">O Mestre ainda não compartilhou nenhum mapa.</p>'}
  </section>`:'<div class="card"><p style="margin:0">Entre numa mesa (aba <b>Ficha → Mesa</b>) para ver os mapas que o Mestre compartilhar.</p></div>'}function ue(e,o,a){a.app.querySelectorAll("[data-mapopen]").forEach(r=>r.onclick=()=>{const l=(a.S.maps||[]).find(p=>p.id===r.dataset.mapopen);l&&Ia({be:a.S.be,cid:e.campaignId,map:l})})}const me={mapas:{html:de,bind:ue},ficha:{html:Xa,bind:Za},magias:{html:ae,bind:ee},classe:{html:te,bind:ne},talentos:{html:le,bind:ie},itens:{html:ce,bind:re}},x=v("#app"),h={be:null,comp:null,user:null,chId:null,ch:null,tab:"combate",amount:"",off:[],prevHp:null,maps:[],mapsCid:null,offMaps:null,ui:{spellQ:"",spellLvl:"all",spellMine:!0,featQ:"",featCat:"all",itemQ:"",libOpen:{}}};function aa(e){if(!h.ch||!e)return;const o=structuredClone(h.ch);Object.entries(e).forEach(([a,r])=>Ka(o,a,r)),h.ch=o,V()}const na=()=>`rpgmesa:last:${h.user.uid}`,K=()=>{var e;h.off.forEach(o=>o()),h.off=[],(e=h.offMaps)==null||e.call(h),h.offMaps=null,h.mapsCid=null,h.maps=[],Wa()};function pe(e){var o;(e||null)!==h.mapsCid&&((o=h.offMaps)==null||o.call(h),h.offMaps=null,h.maps=[],h.mapsCid=e||null,e&&(h.offMaps=h.be.watchMaps(e,!1,a=>{h.maps=a,h.ch&&V()})))}const ha=Object.fromEntries(Ta.map(([e,o])=>[e,o])),ea=Object.fromEntries(B);be().catch(e=>{x.innerHTML=`<div class="wrap"><div class="card">Erro ao iniciar: ${u(e.message)}</div></div>`});async function be(){h.be=await Ba(),Pa(h.be,x,{title:"Grimório do Aventureiro",subtitle:"Entre com sua conta para acessar seus personagens em qualquer aparelho.",onSignedOut:()=>{K(),h.ch=null,h.chId=null,h.prevHp=null}},async e=>{h.user=e,x.innerHTML='<p class="muted" style="padding:1rem">Carregando compêndio…</p>',h.comp=await La(h.be);const o=sa.get(na());o?oa(o):F()})}const ka=()=>h.be.mode==="local"?'<p class="banner">Modo demo: os dados ficam neste navegador. Abra o Escudo em outra aba para testar a sincronização.</p>':"",ve=()=>h.comp.completo?"":'<p class="banner">Biblioteca reduzida: o Mestre ainda não importou o compêndio completo no Escudo.</p>';function F(){K(),h.chId=null,h.ch=null,sa.set(na(),null);let e=!1;h.off.push(h.be.watchMyCharacters(o=>{v("#build")||(o.sort((a,r)=>a.name.localeCompare(r.name)),x.innerHTML=`<header class="top"><div class="row"><div class="grow name">Meus personagens</div>
      <a class="btn small" href="./escudo.html" title="Ir para o Escudo do Mestre">🛡️ Escudo</a>${ga(h.user)}</div></header>
    <main class="wrap stack">${ka()}${ve()}
      ${o.map(a=>`<button class="charbtn" data-open="${a.id}">
        <span><b>${u(a.name)}</b><br><small class="muted">${u(Sa(a))}</small></span>
        <span class="chip">${a.campaignName?"🎲 "+u(a.campaignName):"Sem mesa"}</span></button>`).join("")}
      ${o.length?"":'<div class="card"><p style="margin:0">Você ainda não tem personagens. Crie o primeiro abaixo — ele fica salvo na sua conta.</p></div>'}
      <button class="btn primary" id="newchar" style="width:100%">+ Novo personagem</button>
    </main>`,ya(h.be,x),x.querySelectorAll("[data-open]").forEach(a=>a.onclick=()=>oa(a.dataset.open)),v("#newchar").onclick=()=>fe(),!o.length&&!e&&(e=!0))}))}function fe(){K();const e=h.comp,o=[15,14,13,12,10,8];x.innerHTML=`<header class="top"><div class="row"><button class="btn small" id="back" aria-label="Voltar">◀</button><div class="grow name">Novo personagem</div></div></header>
  <main class="wrap stack">
  <form class="stack" id="build">
    <section class="card stack">
      <div><label for="name">Nome</label><input id="name" name="name" required maxlength="40" /></div>
      <div class="row">
        <div class="grow"><label for="species">Espécie</label><select id="species" name="species">
          ${e.species.map(b=>`<option value="${b.id}">${u(b.nome)}</option>`).join("")}</select></div>
        <div style="width:5.5rem"><label for="level">Nível</label><input id="level" name="level" type="number" inputmode="numeric" min="1" max="20" value="1" /></div>
      </div>
      <div><label for="class">Classe</label><select id="class" name="class">
        ${e.classes.map(b=>`<option value="${b.id}">${u(b.nome)}</option>`).join("")}</select></div>
      <div id="classinfo"></div>
    </section>
    ${e.backgrounds.length?`<section class="card stack">
      <div><label for="bg">Antecedente</label><select id="bg" name="bg">
        ${e.backgrounds.map(b=>`<option value="${b.id}">${u(b.nome)}</option>`).join("")}</select></div>
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
  </form></main>`,v("#back").onclick=F;const a=v("#build"),r=()=>e.byId.classes[a.class.value],l=()=>{var b,g;return(g=e.byId.backgrounds)==null?void 0:g[(b=a.bg)==null?void 0:b.value]};function p(){var k;const b=r(),g=(k=b.periciasOpcoes)!=null&&k.length?b.periciasOpcoes:[];v("#classinfo").innerHTML=`
      <p class="muted" style="margin:.2rem 0;font-size:.88rem">Dado de Vida d${b.dadoVida} · Salvaguardas: ${(b.salvaguardas||[]).map(y=>ea[y]).join(", ")}</p>
      ${g.length?`<div><label>Perícias da classe — escolha ${b.periciasEscolha} <span id="skcount"></span></label>
        <div class="checks">${g.map(y=>`<label class="chk"><input type="checkbox" name="sk" value="${y}"> ${ha[y]}</label>`).join("")}</div></div>`:""}`,a.querySelectorAll("[name=sk]").forEach(y=>y.onchange=s),s()}function s(){var q;const b=r(),g=((q=l())==null?void 0:q.pericias)||[],k=[...a.querySelectorAll("[name=sk]")];k.forEach(c=>{g.includes(c.value)&&(c.checked=!1,c.disabled=!0,c.parentElement.title="Já vem do antecedente")});const y=k.filter(c=>c.checked).length;k.forEach(c=>{g.includes(c.value)||(c.disabled=!c.checked&&y>=b.periciasEscolha)}),v("#skcount")&&(v("#skcount").textContent=`(${y}/${b.periciasEscolha})`)}function n(){const b=l();if(!b)return;const g=e.byId.feats[b.talentoId];v("#bginfo").innerHTML=`
      <p style="margin:.2rem 0;font-size:.9rem"><b>Perícias:</b> ${b.pericias.map(k=>ha[k]).join(", ")}<br>
      <b>Talento:</b> ${u((g==null?void 0:g.nome)||b.talento)}<br><b>Ferramenta:</b> ${u(b.ferramenta)}</p>
      <div class="row">
        <div class="grow"><label for="plus2">+2 em</label><select id="plus2">${b.atributos.map(k=>`<option value="${k}">${ea[k]}</option>`).join("")}<option value="all">+1 nos três</option></select></div>
        <div class="grow" id="plus1wrap"><label for="plus1">+1 em</label><select id="plus1">${b.atributos.map((k,y)=>`<option value="${k}" ${y===1?"selected":""}>${ea[k]}</option>`).join("")}</select></div>
      </div>
      <details class="entry"><summary><span class="t">Equipamento do antecedente</span></summary><div class="body">${u(b.equipamento)}</div></details>`,v("#plus2").onchange=v("#plus1").onchange=$,$(),s()}function t(){const b=l(),g={};if(!b)return g;const k=v("#plus2").value;if(k==="all")b.atributos.forEach(y=>g[y]=1);else{g[k]=2;const y=v("#plus1").value;y!==k&&(g[y]=(g[y]||0)+1)}return g}function $(){const b=t();v("#plus1wrap")&&(v("#plus1wrap").style.visibility=v("#plus2").value==="all"?"hidden":""),a.querySelectorAll(".abfinal").forEach(g=>{const k=g.dataset.ab,y=Math.min(20,Number(a[k].value)+(b[k]||0));g.textContent=b[k]?`→ ${y} (${j(ba(y))})`:`(${j(ba(y))})`})}const i=27,f={8:0,9:1,10:2,11:3,12:4,13:5,14:7,15:9},m=b=>f[b]??0;let w="array";function A(){const b=w==="buy";if(v("#ab-inputs").innerHTML=B.map(([g,k],y)=>{const q=document.getElementById("ab-"+g),c=q?q.value:b?8:o[y];return`<div><label for="ab-${g}">${k} <b class="abfinal" data-ab="${g}"></b></label>
        <div class="row" style="align-items:center;gap:.4rem;flex-wrap:nowrap">
          ${b?`<button type="button" class="btn small" data-abdown="${g}" aria-label="Diminuir ${k}">−</button>`:""}
          <input id="ab-${g}" name="${g}" type="number" inputmode="numeric" min="${b?8:3}" max="${b?15:20}"
            value="${c}" ${b?'readonly style="width:3.5rem;text-align:center"':""} />
          ${b?`<button type="button" class="btn small" data-abup="${g}" aria-label="Aumentar ${k}">+</button>`:""}
        </div></div>`}).join(""),b){const g=B.reduce((y,[q])=>y+m(Number(a[q].value)),0),k=i-g;v("#abpts").style.display="",v("#abpts").textContent=`${k} de ${i} pontos restantes`,a.querySelectorAll("[data-abup]").forEach(y=>y.onclick=()=>{const q=y.dataset.abup,c=Number(a[q].value);if(!(c>=15)){if(g+(m(c+1)-m(c))>i)return E("Sem pontos suficientes.");a[q].value=c+1,A()}}),a.querySelectorAll("[data-abdown]").forEach(y=>y.onclick=()=>{const q=y.dataset.abdown,c=Number(a[q].value);c<=8||(a[q].value=c-1,A())})}else v("#abpts").style.display="none",B.forEach(([g])=>a[g].oninput=$);$()}x.querySelectorAll("[data-abmode]").forEach(b=>b.onclick=()=>{b.dataset.abmode!==w&&(w=b.dataset.abmode,x.querySelectorAll("[data-abmode]").forEach(g=>g.setAttribute("aria-selected",String(g.dataset.abmode===w))),v("#abmode-help").textContent=w==="buy"?`Compra de pontos: comece com 8 em tudo e gaste os ${i} pontos (custo 9=1, 10=2, 11=3, 12=4, 13=5, 14=7, 15=9). Máximo 15 antes dos bônus do antecedente.`:"Valores base (Array Padrão: 15, 14, 13, 12, 10, 8). Edite livremente, se preferir. O bônus do antecedente é somado automaticamente.",B.forEach(([g],k)=>{const y=document.getElementById("ab-"+g);y&&(y.value=w==="buy"?8:o[k])}),A())}),a.class.onchange=p,a.bg&&(a.bg.onchange=n),p(),n(),A(),a.onsubmit=async b=>{var q;b.preventDefault();const g=t(),k=Object.fromEntries(B.map(([c])=>[c,Math.min(20,Number(a[c].value)+(g[c]||0))])),y=Oa({name:a.name.value.trim(),ownerUid:h.user.uid,speciesId:a.species.value,classId:a.class.value,level:Number(a.level.value),abilities:k,backgroundId:((q=a.bg)==null?void 0:q.value)||null,skillProfs:[...a.querySelectorAll("[name=sk]:checked")].map(c=>c.value)},e);try{oa(await h.be.createCharacter(y))}catch(c){E(c.message)}}}const Sa=e=>`${za(e.build,h.comp)} · ${Ha(e.build,h.comp)}`;function oa(e){K(),h.chId=e,h.prevHp=null,sa.set(na(),e),h.off.push(h.be.watchCharacter(e,o=>{if(!o)return F();const a=h.prevHp;if(h.prevHp=o.state.hp.current+o.state.hp.temp,h.ch=o,pe(o.campaignId),V(),a!=null&&a!==h.prevHp){const r=v("#hpcard");r==null||r.classList.add(h.prevHp<a?"flash-dmg":"flash-heal"),navigator.vibrate&&h.prevHp<a&&navigator.vibrate(80)}}))}const $e=[["combate","❤️","Combate"],["ficha","📜","Ficha"],["magias","✨","Magias"],["classe","🛡️","Traços"],["talentos","⭐","Talentos"],["itens","🎒","Itens"],["mapas","🗺️","Mapas"]],D={get S(){return h},app:x,render:()=>V(),save:e=>h.be.updateCharacter(h.chId,e).catch(o=>E(o.message)),toast:E,showHome:()=>F(),confirmTwice:he,accountChip:ga,bindLogout:ya};function V(){if(Ra(V))return;const e=h.ch,o=Va(e,h.comp),a=document.activeElement,r=a==null?void 0:a.id,l=a&&"selectionStart"in a?[a.selectionStart,a.selectionEnd]:null,p=window.scrollY,s={combate:{html:we,bind:ke},...me},n=s[h.tab]||s.combate;if(x.innerHTML=`
    <header class="top">
      <div class="row"><button class="btn small" id="home" aria-label="Meus personagens">◀</button>
        <div class="grow"><div class="name">${u(e.name)}</div>
        <div class="mini"><span>${u(Sa(e))}</span>${e.campaignName?`<span>🎲 ${u(e.campaignName)}</span>`:""}</div></div>
        <div class="mini"><span>CA <b>${o.ac}</b></span><span>PV <b>${e.state.hp.current}/${e.state.hp.max}</b></span></div>
        <a class="btn small" href="./escudo.html" title="Ir para o Escudo do Mestre">🛡️</a></div>
    </header>
    <main class="wrap stack">${ka()}${n.html(e,o,D)}</main>
    <nav class="tabs" role="tablist">${$e.map(([t,$,i])=>`<button role="tab" aria-selected="${h.tab===t}" data-tab="${t}"><span class="ico" aria-hidden="true">${$}</span>${i}</button>`).join("")}</nav>`,x.querySelectorAll("[data-tab]").forEach(t=>t.onclick=()=>{h.tab=t.dataset.tab,V(),window.scrollTo(0,0)}),v("#home").onclick=F,n.bind(e,o,D),window.scrollTo(0,p),r){const t=document.getElementById(r);if(t&&(t.focus({preventScroll:!0}),l&&"setSelectionRange"in t))try{t.setSelectionRange(...l)}catch{}}}function he(e,o){const a=v(e);if(a.dataset.armed)return!0;a.dataset.armed="1";const r=a.textContent;return a.textContent=o,setTimeout(()=>{a.isConnected&&(delete a.dataset.armed,a.textContent=r)},3e3),!1}function ge(e,o){var s;const a=e.state.effects||[],r=n=>n==null?"até o descanso longo ou encerrar":n===1?"1 rodada restante":`${n} rodadas restantes`,l=Ua(e).filter(([n])=>!a.some(t=>t.id===n)),p=n=>l.filter(([,t])=>t.tipo===n).map(([t,$])=>`<option value="${t}">${u($.nome)}</option>`).join("");return`<section class="card stack" id="fxcard">
    <div class="sectiontitle"><h2 style="margin:0">Efeitos ativos</h2>
      ${a.some(n=>n.rounds!=null)?'<button class="btn small primary" id="nextround">Próxima rodada ▶</button>':""}</div>
    ${o.fx.lista.length?o.fx.lista.map(n=>{var t;return`<div class="stack" style="gap:.3rem;border:1px solid var(--line);border-radius:10px;padding:.5rem .65rem">
      <div class="sectiontitle"><b>${u(n.nome)}</b><span class="lvl-badge">${r(n.rounds)}</span></div>
      <div class="row">${Qa(n.mods).map($=>`<span class="chip">${u($)}</span>`).join("")}${(n.mods.notas||[]).map($=>`<span class="chip">${u($)}</span>`).join("")}</div>
      ${(t=L[n.id])!=null&&t.nota?`<div class="muted" style="font-size:.82rem">${u(L[n.id].nota)}</div>`:""}
      <div class="row">${n.rounds!=null?`<button class="btn small" data-fxadj="${n.uid}" data-d="-1">−1 rodada</button><button class="btn small" data-fxadj="${n.uid}" data-d="1">+1 rodada${n.id==="furia"?" (estender)":""}</button>`:""}
        <button class="btn small danger" data-fxend="${n.uid}">Encerrar</button></div></div>`}).join(""):'<p class="empty-note" style="margin:0">Nenhum. Ative uma Fúria, uma magia que muda CA ou deslocamento, ou crie um efeito próprio — CA, deslocamento e resistências se ajustam sozinhos.</p>'}
    ${(s=o.resist)!=null&&s.length?`<p class="muted" style="margin:0;font-size:.85rem">Resistências agora: ${u(o.resist.join(", "))}</p>`:""}
    <div class="row"><select id="fxpick" class="grow" aria-label="Efeito"><option value="">Ativar efeito…</option>
      ${p("Característica")?`<optgroup label="Características">${p("Característica")}</optgroup>`:""}
      <optgroup label="Magias">${p("Magia")}</optgroup></select>
      <input id="fxrounds" type="number" inputmode="numeric" min="1" placeholder="rodadas" style="width:5.5rem" aria-label="Duração em rodadas" />
      <button class="btn" id="fxadd">Ativar</button></div>
    <details class="entry"><summary><span class="t muted">Efeito personalizado</span></summary><div class="body stack">
      <input id="fxc-nome" maxlength="40" placeholder="Nome (ex.: Bênção do templo)" />
      <div class="row"><input id="fxc-rounds" type="number" inputmode="numeric" min="1" placeholder="Rodadas (vazio = sem contagem)" class="grow" />
        <input id="fxc-ac" type="number" inputmode="numeric" placeholder="+CA" style="width:4.5rem" />
        <input id="fxc-speed" type="number" inputmode="decimal" step="1.5" placeholder="+m" style="width:4.5rem" /></div>
      <button class="btn" id="fxc-add">Adicionar efeito</button></div></details>
  </section>`}function ye(e,o,a){const r=_(e).filter(t=>{var $,i;return t.itemId&&((i=($=o.byId)==null?void 0:$.weapons)==null?void 0:i[t.itemId])||t.categoria==="arma"}).map(t=>{var $,i;return{it:t,w:t.itemId?(i=($=o.byId)==null?void 0:$.weapons)==null?void 0:i[t.itemId]:null}}),l=_a(e,a),p=l?`<div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem">
      <span>👊 ${l.nome} (Artes Marciais) — <b>${j(l.atk)}</b> pra acertar · <b>1d${l.die}${l.dmgBonus?j(l.dmgBonus):""}</b> ${l.dmgType}
        <span class="muted">· usa ${l.ability==="des"?"Destreza":"Força"}</span></span></div>
    <p class="muted" style="margin:0;font-size:.8rem">Armas de Monge (simples ou marciais com Leve) também podem usar o dado de Artes Marciais no lugar do dado da arma.</p>`:"";if(!r.length)return l?`<section class="card stack"><h2>Ataques</h2>${p}</section>`:`<section class="card stack"><h2>Ataques</h2>
      <p class="muted" style="margin:0">Nenhuma arma no inventário — desarmado: <b>${j(a.pb+a.mods.for)}</b> pra acertar, <b>1${j(a.mods.for)}</b> de dano contundente.</p></section>`;const s=Object.fromEntries(Ga(e,o,a).map(t=>[t.uid,t])),n=r.some(({it:t})=>t.equipado);return`<section class="card stack"><h2>Ataques</h2>
    ${r.map(({it:t,w:$})=>{const i=s[t.uid],f=!i&&t.equipado?' <span class="muted">(sem cálculo automático — veja as Notas)</span>':"";return`<div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem">
        <span>${t.equipado?"⚔️ ":""}${u(t.nome||($==null?void 0:$.nome)||"")}${i?` — <b>${j(i.atk)}</b> pra acertar · <b>${u(i.dice)}${i.dmgBonus?j(i.dmgBonus):""}</b> ${u(i.dmgType)}${i.maestria?` <span class="muted">(${u(i.maestria)})</span>`:""}`:f}</span>
        <button class="btn small ${t.equipado?"":"primary"}" data-swapweapon="${t.uid}">${t.equipado?"Guardar":"Empunhar"}</button>
      </div>`}).join("")}
    ${p}
    ${!n&&!l?`<p class="muted" style="margin:0">Nenhuma arma empunhada — desarmado: <b>${j(a.pb+a.mods.for)}</b> pra acertar, <b>1${j(a.mods.for)}</b> de dano contundente.</p>`:""}
    <p class="muted" style="margin:0;font-size:.8rem">Toque em "Empunhar"/"Guardar" pra trocar de arma. Bônus de ataque = Proficiência + atributo; dano = dado da arma + atributo.</p>
  </section>`}function we(e,o){const{hp:a,deathSaves:r={success:0,fail:0},conditions:l=[],dead:p}=e.state,s=a.max+a.temp,n=Math.round(a.current/s*100),t=Math.round(a.temp/s*100),$=a.current/a.max>.5?"":a.current/a.max>.25?"mid":"low",i=a.current===0&&!p,f=e.state.concentration?h.comp.byId.spells[e.state.concentration]:null;return`
  <section class="card stack" id="hpcard">
    <div class="hp-big"><div class="num">${a.current}<small> / ${a.max}</small></div>
      ${a.temp?`<div class="tmpv">+${a.temp} temporários</div>`:""}
      ${p?'<div class="chip bad" style="margin-top:.4rem">MORTO</div>':""}</div>
    <div class="hpbar" aria-hidden="true"><div class="cur ${$}" style="width:${n}%"></div><div class="tmp" style="width:${t}%"></div></div>
    <input id="amount" class="amount" type="number" inputmode="numeric" min="0" placeholder="0" value="${u(h.amount)}" aria-label="Valor" />
    <div class="quick">${[1,2,5,10,"C"].map(m=>`<button class="btn small" data-q="${m}">${m==="C"?"Limpar":"+"+m}</button>`).join("")}</div>
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
    <div><b>${o.ac}</b><small>CA</small></div>
    <div><b>${j(o.initiative)}</b><small>Iniciativa</small></div>
    <div><b>${u(o.speed.replace(" metros"," m"))}</b><small>Deslocamento</small></div>
    <div><b>${o.passivePerception}</b><small>Perc. passiva</small></div>
  </div>
  ${o.acDetalhe?`<p class="empty-note" style="margin:.5rem 0 0">CA automática: ${u(o.acDetalhe)}</p>`:""}</section>
  ${ge(e,o)}
  ${ye(e,h.comp,o)}
  ${f?`<p class="banner">Concentrando em: <b>${u(f.nome)}</b> <button class="btn small" id="endconc" style="margin-left:.5rem">Encerrar</button></p>`:""}
  ${i?`<section class="card stack"><h2>Testes contra a morte</h2>
    <div class="saves"><div><small class="muted">Sucessos</small><div class="pips">${[0,1,2].map(m=>`<span class="pip ${m<r.success?"s":""}"></span>`).join("")}</div></div>
      <div><small class="muted">Falhas</small><div class="pips">${[0,1,2].map(m=>`<span class="pip ${m<r.fail?"f":""}"></span>`).join("")}</div></div></div>
    <button class="btn primary" id="roll-death" style="width:100%">Rolar d20</button></section>`:""}
  <section class="card stack"><h2>Condições</h2>
    <div class="row">${l.map(m=>`<button class="chip bad" data-rmcond="${m}" aria-label="Remover ${m}">${ma[m]||m} ✕</button>`).join("")||'<span class="muted">Nenhuma</span>'}</div>
    <div class="row"><select id="addcond" class="grow" aria-label="Adicionar condição"><option value="">Adicionar condição…</option>
      ${Fa.filter(m=>!l.includes(m)).map(m=>`<option value="${m}">${ma[m]||m}</option>`).join("")}</select></div>
  </section>
  <section class="card stack"><h2>Descanso</h2>
    ${(e.state.hitDice.byClass||[]).length>1?e.state.hitDice.byClass.map(m=>{const w=h.comp.byId.classes[m.classId];return`<div class="row" style="justify-content:space-between"><span class="muted">${u((w==null?void 0:w.nome)||m.classId)}: ${m.max-m.used}/${m.max} (d${m.die})</span>
            <button class="btn small" data-shortclass="${m.classId}">Gastar</button></div>`}).join(""):`<p class="muted" style="margin:0">Dados de Vida: ${e.state.hitDice.max-e.state.hitDice.used}/${e.state.hitDice.max} (d${e.state.hitDice.die})</p>
         <div class="row"><button class="btn grow" id="short">Gastar 1 Dado de Vida</button></div>`}
    <div class="row"><button class="btn grow" id="long">Descanso Longo</button></div>
  </section>
  <section class="card"><h2>Registro</h2><ul class="log">${(e.state.log||[]).map(m=>`<li>${u(m)}</li>`).join("")||"<li>—</li>"}</ul></section>`}function ke(e,o){const a=n=>D.save({"state.effects":n}),r=n=>Number(n)>=1?Math.floor(Number(n)):null;v("#fxadd").onclick=()=>{const n=v("#fxpick").value;if(!n)return E("Escolha um efeito.");const t=L[n],$=v("#fxrounds").value?r(v("#fxrounds").value):t.rounds;a([...e.state.effects||[],{uid:pa(),id:n,nome:t.nome,rounds:$}]),E(`${t.nome} ativo${$?` — ${$} rodada${$>1?"s":""}`:""}.`)},v("#fxc-add").onclick=()=>{const n=v("#fxc-nome").value.trim();if(!n)return E("Dê um nome ao efeito.");a([...e.state.effects||[],{uid:pa(),id:"custom",nome:n,rounds:r(v("#fxc-rounds").value),ac:Number(v("#fxc-ac").value)||0,speed:Number(v("#fxc-speed").value)||0}])};const l=(n,t,$)=>{const i=[];return{out:n.map(m=>{var A;if(m.rounds==null||$&&m.uid!==$)return m;const w=m.rounds+t;return w<=0?(i.push(m.nome||((A=L[m.id])==null?void 0:A.nome)),null):{...m,rounds:w}}).filter(Boolean),ended:i}};v("#nextround")&&(v("#nextround").onclick=()=>{const{out:n,ended:t}=l(e.state.effects||[],-1);a(n),E(t.length?`Terminou: ${t.join(", ")}.`:"Rodada avançada.")}),x.querySelectorAll("[data-fxadj]").forEach(n=>n.onclick=()=>{const{out:t,ended:$}=l(e.state.effects||[],Number(n.dataset.d),n.dataset.fxadj);a(t),$.length&&E(`Terminou: ${$.join(", ")}.`)}),x.querySelectorAll("[data-fxend]").forEach(n=>n.onclick=()=>a((e.state.effects||[]).filter(t=>t.uid!==n.dataset.fxend))),x.querySelectorAll("[data-swapweapon]").forEach(n=>n.onclick=()=>{const t=_(e),$=t.find(f=>f.uid===n.dataset.swapweapon),i=!$.equipado;D.save({inventory:t.map(f=>f.uid===$.uid?{...f,equipado:i}:f)}),E(`${$.nome} ${i?"empunhada":"guardada"}.`)});const p=v("#amount");p.oninput=()=>h.amount=p.value,x.querySelectorAll("[data-q]").forEach(n=>n.onclick=()=>{h.amount=n.dataset.q==="C"?"":String((Number(h.amount)||0)+Number(n.dataset.q)),p.value=h.amount}),x.querySelectorAll("[data-act]").forEach(n=>n.onclick=async()=>{const t=Number(h.amount);if(!t)return E("Digite um valor.");const $={resistant:v("#o-res").checked,vulnerable:v("#o-vul").checked,critical:v("#o-crit").checked};h.amount="";const i=await X(h.be,h.chId,n.dataset.act,t,$,e.name);aa(i.patch),i.concentrationDC&&e.state.concentration?E(`Teste de Concentração: CD ${i.concentrationDC}`):i.log.length&&E(i.log.at(-1))}),v("#endconc")&&(v("#endconc").onclick=()=>D.save({"state.concentration":null})),v("#roll-death")&&(v("#roll-death").onclick=async()=>{const n=va("1d20").total,t=await X(h.be,h.chId,"morte",n,{},e.name);aa(t.patch),E(`d20 = ${n}. ${t.log.at(-1)??""}`)}),x.querySelectorAll("[data-rmcond]").forEach(n=>n.onclick=()=>D.save({"state.conditions":e.state.conditions.filter(t=>t!==n.dataset.rmcond)})),v("#addcond").onchange=n=>n.target.value&&D.save({"state.conditions":[...e.state.conditions,n.target.value]});const s=async(n,t)=>{const $=va(`1d${n}`).total+o.mods.con;await t();const i=await X(h.be,h.chId,"cura",Math.max(0,$),{},e.name);aa(i.patch),E(`Dado de Vida: ${$}. ${i.log[0]??""}`)};v("#short")&&(v("#short").onclick=()=>{const n=e.state.hitDice;if(n.used>=n.max)return E("Sem Dados de Vida disponíveis.");s(n.die,()=>D.save({"state.hitDice.used":n.used+1}))}),x.querySelectorAll("[data-shortclass]").forEach(n=>n.onclick=()=>{const t=e.state.hitDice.byClass,$=t.findIndex(m=>m.classId===n.dataset.shortclass),i=t[$];if(i.used>=i.max)return E("Sem Dados de Vida dessa classe.");const f=t.map((m,w)=>w===$?{...m,used:m.used+1}:m);s(i.die,()=>D.save({"state.hitDice.byClass":f,"state.hitDice.used":f.reduce((m,w)=>m+w.used,0)}))}),v("#long").onclick=async()=>{const n=Object.fromEntries(Object.entries(e.state.spellSlots||{}).map(([i,f])=>[i,{...f,used:0}])),t=Object.fromEntries(Object.entries(e.state.pactSlots||{}).map(([i,f])=>[i,{...f,used:0}])),$=(e.state.hitDice.byClass||[]).map(i=>({...i,used:0}));await D.save({"state.hp":{...e.state.hp,current:e.state.hp.max,temp:0},"state.spellSlots":n,"state.pactSlots":t,"state.hitDice":{...e.state.hitDice,byClass:$,used:0},"state.deathSaves":{success:0,fail:0},"state.effects":[],"state.conditions":e.state.conditions.filter(i=>!["inconsciente","estabilizado"].includes(i))}),E("Descanso longo concluído.")}}
