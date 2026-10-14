import"./pwa-Bz0sy_w8.js";import{e as r,A as P,m as _,$ as v,n as da,t as E,E as L,h as I,o as J,q as ja,w as ua,x as Ia,y as Na,z as Da,S as Ma,g as Ta,r as Pa,l as Ba,s as ta,a as ga,b as ya,B as La,D as Oa,f as za,c as Ha,d as Ra,C as ma,i as Va,u as pa,j as X,F as Fa,G as Ua,H as Qa,k as _a,I as ba}from"./auth-dCVAGnr9.js";function va(e){const o=String(e).replace(/\s/g,"").match(/^(\d*)d(\d+)([+-]\d+)?$/i);if(!o)return null;const a=Number(o[1]||1),u=Number(o[2]),l=Number(o[3]||0),p=Array.from({length:a},()=>1+Math.floor(Math.random()*u));return{rolls:p,bonus:l,total:p.reduce((t,s)=>t+s,0)+l}}const H=e=>r(e).replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>").replace(/(^|\s)_([^_]+)_(?=\s|$|[.,;:])/g,"$1<i>$2</i>");function D(e){if(!e)return"";const o=[];for(const a of String(e).split(/\n\n+/)){const u=a.split(`
`);if(u.every(l=>l.startsWith("| "))){o.push('<div class="mdtable"><table>'+u.map(l=>"<tr>"+l.slice(2).split(" | ").map(p=>`<td>${H(p)}</td>`).join("")+"</tr>").join("")+"</table></div>");continue}for(const l of u)l.startsWith("#### ")?o.push(`<h5>${H(l.slice(5))}</h5>`):l.startsWith("### ")?o.push(`<h4>${H(l.slice(4))}</h4>`):l.startsWith("| ")?o.push('<div class="mdtable"><table><tr>'+l.slice(2).split(" | ").map(p=>`<td>${H(p)}</td>`).join("")+"</tr></table></div>"):l.startsWith("• ")?o.push(`<p class="bullet">${H(l)}</p>`):o.push(`<p>${H(l)}</p>`)}return`<div class="md">${o.join("")}</div>`}const B=e=>String(e||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(),wa=Object.fromEntries(P),R=40,Q=e=>e===0?"Truque":`${e}º círculo`,$a=()=>Math.random().toString(36).slice(2,9),N=(e,o,a,u=!1,l="",p="")=>`<details class="entry" ${u?"open":""} ${l}><summary><span class="t">${e}</span><span class="row" style="gap:.4rem;flex-wrap:nowrap"><span class="lvl-badge">${o||""}</span>${p}</span></summary><div class="body">${a}</div></details>`,sa=(e,o,a="Adicionar")=>`<button class="btn small primary addbtn" ${e}="${o}" aria-label="${a}">+</button>`;function Ga(e,o,a){const u=a.S,l=u.comp,p=new Set(e.build.classes.map(n=>n.classId)),t=l.classes.filter(n=>!p.has(n.id)),s=o.classesInfo.slice(1);return`
  <section class="card stack"><h2>Multiclasse</h2>
    <p class="empty-note" style="margin:0">Nível total: ${o.level}/20. Ao multiclassar, confira na aba Traços quais proficiências a nova classe concede (são menos do que na criação) e ajuste "Treinamento e Proficiências" à mão, se precisar.</p>
    ${s.length?s.map(n=>{var d,$,m,w,A;const f=((d=n.cls)==null?void 0:d.subclasses)||[];return`<div class="row" style="flex-wrap:wrap;gap:.5rem;border-top:1px solid var(--border,#3332);padding-top:.5rem">
        <b class="grow">${r((($=n.cls)==null?void 0:$.nome)||n.classId)}</b>
        <div class="row" style="gap:.3rem"><button class="btn small" data-mcdown="${n.classId}" aria-label="Diminuir nível de ${r(((m=n.cls)==null?void 0:m.nome)||n.classId)}">−</button>
          <span style="min-width:1.4rem;text-align:center">${n.level}</span>
          <button class="btn small" data-mcup="${n.classId}" aria-label="Subir nível de ${r(((w=n.cls)==null?void 0:w.nome)||n.classId)}">+</button></div>
        ${f.length?`<select data-mcsub="${n.classId}" aria-label="Subclasse de ${r(((A=n.cls)==null?void 0:A.nome)||n.classId)}" ${n.level<3?"disabled":""}>
          <option value="">—</option>${f.map(b=>`<option value="${b.id}" ${b.id===n.subclassId?"selected":""}>${r(b.nome)}</option>`).join("")}</select>`:""}
        <button class="btn small danger" data-mcrm="${n.classId}">Remover</button>
      </div>`}).join(""):'<p class="empty-note">Personagem de classe única.</p>'}
    ${t.length&&o.level<20?`<form class="row" id="addclass">
      <select id="mcnew" class="grow" aria-label="Nova classe">${t.map(n=>`<option value="${n.id}">${r(n.nome)}</option>`).join("")}</select>
      <button class="btn primary small">+ Adicionar classe</button></form>`:""}
  </section>`}function Ka(e,o,a){const u=a.S,l=a.app;l.querySelectorAll("[data-mcup]").forEach(p=>p.onclick=()=>{const t=e.build.classes.find(s=>s.classId===p.dataset.mcup);a.save(ua(e,u.comp,p.dataset.mcup,t.level+1))}),l.querySelectorAll("[data-mcdown]").forEach(p=>p.onclick=()=>{const t=e.build.classes.find(s=>s.classId===p.dataset.mcdown);if(t.level<=1)return a.toast('Nível mínimo 1 — use "Remover" para tirar a classe.');a.save(ua(e,u.comp,p.dataset.mcdown,t.level-1))}),l.querySelectorAll("[data-mcsub]").forEach(p=>p.onchange=()=>a.save(Ia(e,u.comp,p.dataset.mcsub,p.value||null))),l.querySelectorAll("[data-mcrm]").forEach(p=>p.onclick=()=>{if(!a.confirmTwice(`[data-mcrm="${p.dataset.mcrm}"]`,"Toque de novo para remover"))return;const t=Na(e,u.comp,p.dataset.mcrm);t&&a.save(t)}),v("#addclass")&&(v("#addclass").onsubmit=p=>{p.preventDefault();const t=Da(e,u.comp,v("#mcnew").value);t&&(a.save(t),a.toast("Classe adicionada no nível 1."))})}function Wa(e,o,a){var n,f;const u=a.S,l=e.build.classes[0].level,p=e.build.classes[0],t=((n=o.cls)==null?void 0:n.subclasses)||[],s=e.build.training||{};return`
  <section class="card stack">
    <div class="sectiontitle"><h2 style="margin:0">${o.multiclass?`${r(((f=o.cls)==null?void 0:f.nome)||"")} ${l}`:`Nível ${l}`}</h2>
      <div class="row"><button class="btn small" id="lvldown" aria-label="Diminuir nível">−</button><button class="btn small primary" id="lvlup" aria-label="Subir de nível">+ Nível</button></div></div>
    ${o.multiclass?`<p class="empty-note" style="margin:0">Classe principal (foi ela que deu o 1º dado de vida cheio). Nível total do personagem: ${o.level}.</p>`:""}
    ${t.length?`<div><label for="subclass">Subclasse${l<3?" (a partir do nível 3)":""}</label>
      <select id="subclass" ${l<3?"disabled":""}><option value="">—</option>${t.map(d=>`<option value="${d.id}" ${d.id===p.subclassId?"selected":""}>${r(d.nome)}</option>`).join("")}</select></div>`:""}
    <div class="stats">
      <div><b>${I(o.pb)}</b><small>Proficiência</small></div>
      <div><b>${I(o.initiative)}</b><small>Iniciativa</small></div>
      <div><b>${r(o.speed.replace(" metros"," m"))}</b><small>Deslocamento</small></div>
      <div><b>${o.passivePerception}</b><small>Perc. passiva</small></div>
    </div>
    ${o.armor?`<div class="row"><label for="acbonus" style="margin:0">Bônus extra de CA</label>
      <input id="acbonus" type="number" inputmode="numeric" style="width:6rem" value="${Number(e.build.acBonus)||0}" /></div>
    <p class="empty-note" style="margin:0">Classe de Armadura <b>${o.ac}</b>, calculada sozinha: ${r(o.acDetalhe)}. Use o bônus extra para itens mágicos, estilo de luta Defesa etc. (Sem armadura/escudo equipado, vale o número digitado à mão.)</p>`:`<div class="row"><label for="ac" style="margin:0">Classe de Armadura</label>
      <input id="ac" type="number" inputmode="numeric" style="width:6rem" value="${e.build.ac??10}" /></div>`}
    <div class="row"><label for="hpmax" style="margin:0">PV Máximo</label>
      <input id="hpmax" type="number" inputmode="numeric" min="1" style="width:6rem" value="${e.state.hp.max}" /></div>
    <p class="empty-note" style="margin:0">O PV máximo pode ser ajustado à mão — use o valor rolado no dado com o Mestre. Ao subir de nível, o app só soma o ganho médio da regra a esse valor.</p>
  </section>

  ${Ga(e,o,a)}

  <section class="card stack"><h2>Atributos e Salvaguardas</h2>
    <p class="empty-note">Toque em <b>Salvaguarda</b> para marcar/desmarcar proficiência.</p>
    <div class="abil2">${P.map(([d,$])=>{const m=(e.build.saveProfs||[]).includes(d);return`<div class="abcard">
        <small>${$}</small><b>${I(o.mods[d])}</b>
        <input class="abscore" data-score="${d}" type="number" inputmode="numeric" min="1" max="30" value="${e.build.abilities[d]}" aria-label="Valor de ${$}" />
        <button class="savebtn ${m?"on":""}" data-save="${d}" aria-pressed="${m}">
          <span class="dot ${m?"on":""}"></span>Salvaguarda <b>${I(o.saves[d])}</b></button>
      </div>`}).join("")}</div>
  </section>

  <section class="card"><h2>Perícias</h2><p class="empty-note">Toque para alternar: sem proficiência → proficiente (●) → especialista (◆).</p>
    <div class="skills">${o.skills.map(d=>`<button data-skill="${d.id}" aria-pressed="${d.prof||d.exp}">
      <span class="row" style="flex-wrap:nowrap"><span class="dot ${d.exp?"exp":d.prof?"on":""}"></span>${d.nome} <small class="muted">(${d.ab.toUpperCase()})</small></span><b>${I(d.bonus)}</b></button>`).join("")}</div>
  </section>

  <section class="card stack"><h2>Treinamento e Proficiências</h2>
    ${[["armaduras","Treinamento com Armaduras"],["armas","Proficiência com Armas"],["ferramentas","Proficiência com Ferramentas"],["idiomas","Idiomas"]].map(([d,$])=>`<div><label for="tr-${d}">${$}</label><textarea id="tr-${d}" data-train="${d}" rows="2">${r(s[d]||"")}</textarea></div>`).join("")}
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
    <div class="row">${a.accountChip(u.user)}</div>
    <button class="btn danger small" id="delete">Apagar personagem</button>
  </section>`}let fa={};const O=(e,o,a=600)=>{clearTimeout(fa[e]),fa[e]=setTimeout(o,a)};function Ya(e,o,a){const u=a.S,l=a.app,p=e.build.classes[0].level;v("#lvlup").onclick=()=>o.level<20&&a.save(J(e,u.comp,p+1)).then(()=>a.toast(`Nível ${p+1}! PV máximo, Dados de Vida e espaços atualizados.`)),v("#lvldown").onclick=()=>p>1&&a.save(J(e,u.comp,p-1)),v("#subclass")&&(v("#subclass").onchange=t=>a.save(J(e,u.comp,p,t.target.value||null))),Ka(e,o,a),v("#ac")&&(v("#ac").onchange=t=>a.save({"build.ac":Number(t.target.value)||10})),v("#acbonus")&&(v("#acbonus").onchange=t=>a.save({"build.acBonus":Number(t.target.value)||0})),v("#hpmax").onchange=t=>{const s=Math.max(1,Number(t.target.value)||1);a.save({"state.hp":{...e.state.hp,max:s,current:Math.min(e.state.hp.current,s)}})},l.querySelectorAll("[data-score]").forEach(t=>t.onchange=()=>{const s=Math.max(1,Math.min(30,Number(t.value)||10)),n=t.dataset.score,f={[`build.abilities.${n}`]:s};n==="con"&&(f["state.hp"]={...e.state.hp,...ja(e,u.comp,s)}),a.save(f)}),l.querySelectorAll("[data-save]").forEach(t=>t.onclick=()=>{const s=t.dataset.save,n=e.build.saveProfs||[];a.save({"build.saveProfs":n.includes(s)?n.filter(f=>f!==s):[...n,s]})}),l.querySelectorAll("[data-skill]").forEach(t=>t.onclick=()=>{const s=t.dataset.skill,n=e.build.skillProfs||[],f=e.build.expertise||[];f.includes(s)?a.save({"build.expertise":f.filter(d=>d!==s),"build.skillProfs":n.filter(d=>d!==s)}):n.includes(s)?a.save({"build.expertise":[...f,s]}):a.save({"build.skillProfs":[...n,s]})}),l.querySelectorAll("[data-train]").forEach(t=>t.oninput=()=>O("tr"+t.dataset.train,()=>a.save({[`build.training.${t.dataset.train}`]:t.value}))),v("#notes").oninput=t=>O("notes",()=>a.save({notes:t.target.value})),a.bindLogout(u.be,l),v("#join")&&(v("#join").onsubmit=async t=>{t.preventDefault();try{const s=await u.be.joinByCode(v("#code").value);await u.be.updateCharacter(u.chId,{campaignId:s.id,campaignName:s.name}),a.toast(`${e.name} entrou na mesa ${s.name}.`)}catch(s){a.toast(s.message)}}),v("#leave-table")&&(v("#leave-table").onclick=()=>{a.confirmTwice("#leave-table","Toque de novo para confirmar")&&a.save({campaignId:null,campaignName:null})}),v("#delete").onclick=async()=>{if(!a.confirmTwice("#delete",`Toque de novo para apagar ${e.name}`))return;const t=u.chId;await u.be.deleteCharacter(t),a.showHome()}}function Ja(e,o,a){const u=a.S,l=u.comp,p=u.ui,t=new Set(o.bonusSpells||[]),s=(e.build.spellsKnown||[]).filter(c=>!t.has(c)),n=e.build.spellsPrepared||[],f=[...t].map(c=>l.byId.spells[c]).filter(Boolean).sort((c,S)=>c.nivel-S.nivel||c.nome.localeCompare(S.nome)),d=Object.entries(e.state.spellSlots||{}),$=Object.entries(e.state.pactSlots||{}),m=[...d,...$].reduce((c,[S,j])=>j.max>0?Math.max(c,Number(S)):c,0),w=o.casters.length>0,A=s.map(c=>l.byId.spells[c]).filter(Boolean).sort((c,S)=>c.nivel-S.nivel||c.nome.localeCompare(S.nome)),b={};A.forEach(c=>{var S;return(b[S=c.nivel]||(b[S]=[])).push(c)});const g=e.build.classes.map(c=>c.classId),k=o.classesInfo.map(c=>{var S;return(S=c.cls)==null?void 0:S.nome}).filter(Boolean).join(" + "),y=o.spellCaps||{},q=A.filter(c=>c.nivel===0).length,i=A.filter(c=>c.nivel>0).length,C=n.length,z=y.cantrips!==null&&q>=y.cantrips,qa=y.known!==null&&i>=y.known,Aa=y.prepared!==null&&C>=y.prepared,la=B(p.spellQ);let U=l.spells.filter(c=>!s.includes(c.id)&&!t.has(c.id)&&(!p.spellMine||!o.casters.length||c.classes.some(S=>g.includes(S)))&&(p.spellLvl==="all"||String(c.nivel)===p.spellLvl)&&(!la||B(c.nome).includes(la)));const ia=U.length;U=U.slice(0,R);const Ca=c=>(c.nivel===0?z:qa)?`<button class="btn small" data-learnfull="${c.nivel===0?"truque":"magia"}" aria-label="Limite atingido">+</button>`:sa("data-learn",c.id,"Adicionar "+r(c.nome)),Ea=c=>{const S=n.includes(c.id);return!S&&Aa?'<button class="btn small" data-prepfull="1" aria-label="Limite de magias preparadas atingido">Preparar</button>':`<button class="btn small" data-prep="${c.id}">${S?"✓ Preparada":"Preparar"}</button>`},ca=c=>L[c]?(e.state.effects||[]).some(S=>S.id===c)?'<span class="chip">Efeito ativo</span>':`<button class="btn small" data-fx="${c}">Ativar efeito (CA/desloc.)</button>`:"",ra=(c,S)=>`
    <div class="muted" style="font-size:.85rem">${r(c.escola)} · ${r(c.tempo)} · ${r(c.alcance)}<br>${r(c.componentes)} · ${r(c.duracao)}</div>
    ${D(c.desc)}
    <div class="row">${S?`${c.nivel>0?Ea(c):""}
         ${c.concentracao?`<button class="btn small" data-conc="${c.id}">${e.state.concentration===c.id?"Encerrar concentração":"Concentrar"}</button>`:""}
         ${ca(c.id)}
         <button class="btn small" data-forget="${c.id}">Remover</button>`:""}</div>`,W=c=>[c.concentracao?"C":"",c.ritual?"R":""].filter(Boolean).map(S=>`<span class="chip">${S}</span>`).join(" "),Y=(c,S,j)=>j===null?"":`<span class="lvl-badge">${S}/${j} ${c}</span>`,xa=c=>`
    <div class="muted" style="font-size:.85rem">${r(c.escola)} · ${r(c.tempo)} · ${r(c.alcance)}<br>${r(c.componentes)} · ${r(c.duracao)}</div>
    ${D(c.desc)}
    ${c.concentracao||L[c.id]?`<div class="row">${c.concentracao?`<button class="btn small" data-conc="${c.id}">${e.state.concentration===c.id?"Encerrar concentração":"Concentrar"}</button>`:""}${ca(c.id)}</div>`:""}`;return`
  ${o.casters.length?`<section class="card stack">${o.casters.map(c=>`<div class="stats" style="grid-template-columns:repeat(3,1fr)">
    <div><b>${c.dc}</b><small>CD (${r(c.nome)})</small></div><div><b>${I(c.atk)}</b><small>Ataque mágico</small></div>
    <div><b>${wa[c.atributoConjuracao].slice(0,3)}</b><small>Atributo</small></div></div>`).join("")}</section>`:""}
  ${d.length?`<section class="card slots"><h2>Espaços de magia${o.multiclass?" (combinados)":""}</h2>
    ${d.map(([c,S])=>`<div class="lvl"><span>${c}º</span>${Array.from({length:S.max},(j,T)=>`<button class="slotpip ${T<S.used?"used":""}" data-slot="${c}" data-i="${T}" aria-label="Espaço de ${c}º círculo ${T+1}${T<S.used?", gasto":""}"></button>`).join("")}</div>`).join("")}
  </section>`:""}
  ${$.length?`<section class="card slots"><h2>Magia de Pacto</h2>
    ${$.map(([c,S])=>`<div class="lvl"><span>${c}º</span>${Array.from({length:S.max},(j,T)=>`<button class="slotpip ${T<S.used?"used":""}" data-pactslot="${c}" data-i="${T}" aria-label="Espaço de pacto ${T+1}${T<S.used?", gasto":""}"></button>`).join("")}</div>`).join("")}
  </section>`:""}
  ${f.length?`<section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Magias da Subclasse</h2><span class="lvl-badge">sempre preparadas</span></div>
    <p class="empty-note" style="margin:0">Concedidas automaticamente pela subclasse — não contam no limite de magias conhecidas/preparadas, mas ainda gastam um espaço de magia ao conjurar.</p>
    <div class="stack">${f.map(c=>N(`${r(c.nome)} ${W(c)}`,Q(c.nivel),xa(c),!1,`data-k="b-${c.id}"`)).join("")}</div>
  </section>`:""}
  ${y.cantrips!==null||y.known!==null||y.prepared!==null?`<section class="card stack"><h2>Limites de magias (regra 2024)</h2>
    <div class="row" style="flex-wrap:wrap;gap:.4rem">${Y("truques",q,y.cantrips)}${Y("magias conhecidas",i,y.known)}${Y("preparadas",C,y.prepared)}</div>
    <details class="entry"><summary><span class="t">Exceção manual (magia extra de livro/pergaminho…)</span></summary><div class="body stack">
      <p class="empty-note" style="margin:0">Some ao limite oficial acima. Use quando o personagem aprendeu algo fora da regra normal.</p>
      <div class="row" style="flex-wrap:wrap">
        <div class="grow"><label for="extra-cantrips">Truques extras</label><input id="extra-cantrips" type="number" min="0" value="${e.build.extraCantrips||0}" /></div>
        <div class="grow"><label for="extra-spells">Magias extras</label><input id="extra-spells" type="number" min="0" value="${e.build.extraSpells||0}" /></div>
        ${y.invocacoes!==null?`<div class="grow"><label for="extra-invoc">Invocações extras</label><input id="extra-invoc" type="number" min="0" value="${e.build.extraInvocations||0}" /></div>`:""}
      </div>
      <div><label for="extra-note">Motivo (opcional)</label>
        <textarea id="extra-note" rows="2" placeholder="Ex.: aprendeu com um pergaminho encontrado na masmorra">${r(e.build.extraSpellsNote||"")}</textarea></div>
    </div></details>
  </section>`:""}
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Minhas magias</h2><span class="lvl-badge">${n.length} preparada(s)</span></div>
    ${Object.keys(b).length?Object.entries(b).map(([c,S])=>`<h3 style="margin:.6rem 0 .2rem;color:var(--muted)">${Q(Number(c))}</h3>
      <div class="stack" style="--gap:.4rem">${S.map(j=>N(`${j.nivel>0&&n.includes(j.id)?"✓ ":""}${r(j.nome)} ${W(j)}`,Q(j.nivel),ra(j,!0),!1,`data-k="m-${j.id}"`)).join("")}</div>`).join(""):'<p class="empty-note">Nenhuma magia ainda. Adicione pela biblioteca abaixo.</p>'}
  </section>
  <section class="card stack"><h2>Biblioteca de magias</h2>
    <input id="spellq" type="search" placeholder="Buscar magia pelo nome…" value="${r(p.spellQ)}" aria-label="Buscar magia" />
    <div class="filters">${["all","0","1","2","3","4","5","6","7","8","9"].map(c=>{const S=c==="all"||(c==="0"?w:w&&Number(c)<=m);return`<button data-flvl="${c}" aria-pressed="${p.spellLvl===c}" class="${S?"":"unavail"}" ${S?"":'title="Ainda não disponível no seu nível"'}>${c==="all"?"Todas":c==="0"?"Truques":c+"º"}</button>`}).join("")}</div>
    ${w?`<p class="empty-note" style="margin:0">Seu nível permite conjurar ${m===0?"só truques":`truques e magias até ${m}º círculo`}. Os demais círculos aparecem esmaecidos até você subir de nível.</p>`:""}
    ${k?`<label class="chk"><input type="checkbox" id="spellmine" ${p.spellMine?"checked":""}> Só a lista de ${r(k)}</label>`:""}
    <p class="empty-note">${ia} magia(s)${ia>R?` — mostrando ${R}, refine a busca`:""}.</p>
    <div class="stack">${U.map(c=>N(`${r(c.nome)} ${W(c)}`,Q(c.nivel),ra(c,!1),!1,`data-k="l-${c.id}"`,Ca(c))).join("")}</div>
  </section>`}function Xa(e,o,a){const u=a.S,l=a.app,p=u.ui;l.querySelectorAll("[data-slot]").forEach(t=>t.onclick=()=>{const s=t.dataset.slot,n=Number(t.dataset.i),f=e.state.spellSlots[s];a.save({[`state.spellSlots.${s}.used`]:n<f.used?n:n+1})}),l.querySelectorAll("[data-pactslot]").forEach(t=>t.onclick=()=>{const s=t.dataset.pactslot,n=Number(t.dataset.i),f=e.state.pactSlots[s];a.save({[`state.pactSlots.${s}.used`]:n<f.used?n:n+1})}),v("#spellq").oninput=t=>{p.spellQ=t.target.value,O("sq",a.render,250)},l.querySelectorAll("[data-flvl]").forEach(t=>t.onclick=()=>{p.spellLvl=t.dataset.flvl,a.render()}),v("#spellmine")&&(v("#spellmine").onchange=t=>{p.spellMine=t.target.checked,a.render()}),l.querySelectorAll("[data-learn]").forEach(t=>t.onclick=()=>a.save({"build.spellsKnown":[...e.build.spellsKnown||[],t.dataset.learn]})),l.querySelectorAll("[data-learnfull]").forEach(t=>t.onclick=()=>E(`Limite de ${t.dataset.learnfull==="truque"?"truques conhecidos":"magias conhecidas"} atingido. Use a exceção manual acima se for o caso.`)),l.querySelectorAll("[data-forget]").forEach(t=>t.onclick=()=>a.save({"build.spellsKnown":(e.build.spellsKnown||[]).filter(s=>s!==t.dataset.forget),"build.spellsPrepared":(e.build.spellsPrepared||[]).filter(s=>s!==t.dataset.forget)})),l.querySelectorAll("[data-prep]").forEach(t=>t.onclick=()=>{const s=e.build.spellsPrepared||[],n=t.dataset.prep;a.save({"build.spellsPrepared":s.includes(n)?s.filter(f=>f!==n):[...s,n]})}),l.querySelectorAll("[data-prepfull]").forEach(t=>t.onclick=()=>E("Limite de magias preparadas atingido. Use a exceção manual acima se for o caso.")),v("#extra-cantrips")&&(v("#extra-cantrips").onchange=t=>a.save({"build.extraCantrips":Math.max(0,Number(t.target.value)||0)})),v("#extra-spells")&&(v("#extra-spells").onchange=t=>a.save({"build.extraSpells":Math.max(0,Number(t.target.value)||0)})),v("#extra-invoc")&&(v("#extra-invoc").onchange=t=>a.save({"build.extraInvocations":Math.max(0,Number(t.target.value)||0)})),v("#extra-note")&&(v("#extra-note").oninput=t=>O("extranote",()=>a.save({"build.extraSpellsNote":t.target.value}))),l.querySelectorAll("[data-fx]").forEach(t=>t.onclick=()=>{const s=t.dataset.fx,n=L[s];a.save({"state.effects":[...e.state.effects||[],{uid:Math.random().toString(36).slice(2,10),id:s,nome:n.nome,rounds:n.rounds}]}),E(`${n.nome} ativo — CA/deslocamento ajustados. Veja em Combate › Efeitos ativos.`)}),l.querySelectorAll("[data-conc]").forEach(t=>t.onclick=()=>a.save({"state.concentration":e.state.concentration===t.dataset.conc?null:t.dataset.conc})),G(l,"spells")}const Z={};function G(e,o){e.querySelectorAll("summary .addbtn").forEach(u=>u.addEventListener("click",l=>l.preventDefault()));const a=Z[o]||(Z[o]=new Set);e.querySelectorAll("details.entry").forEach((u,l)=>{var t;const p=u.dataset.k||((t=u.querySelector("summary .t"))==null?void 0:t.textContent)||l;a.has(p)&&(u.open=!0),u.addEventListener("toggle",()=>u.open?a.add(p):a.delete(p))})}function Za(e,o,a,u){var A;const{cls:l,sub:p,level:t,classId:s}=o;if(!l)return`<section class="card">Classe "${r(s)}" não encontrada no compêndio.</section>`;const n=l.nome,f=l.caracteristicas||[],d=f.filter(b=>b.nivel<=t),$=f.filter(b=>b.nivel>t),m=e.build.opcoes||[],w=s==="bruxo"?((A=a.spellCaps)==null?void 0:A.invocacoes)??null:null;return`
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Características de ${r(n)}</h2><span class="lvl-badge">nível ${t}</span></div>
    ${d.length?d.map(b=>N(r(b.nome),`Nível ${b.nivel}`,D(b.desc))).join(""):'<p class="empty-note">Importe o compêndio completo para ver as características.</p>'}
    ${$.length?`<details class="entry"><summary><span class="t muted">Próximos níveis (${$.length})</span></summary><div class="body stack">
      ${$.map(b=>N(r(b.nome),`Nível ${b.nivel}`,D(b.desc))).join("")}</div></details>`:""}
  </section>
  ${(l.opcoes||[]).map(b=>{const g=s==="bruxo"&&/Invoca/i.test(b.titulo),k=g?b.itens.filter(q=>m.includes(q.id)).length:null,y=g&&w!==null&&k>=w;return`<section class="card stack"><div class="sectiontitle"><h2 style="margin:0">${r(b.titulo.replace("Opções de ",""))} (${r(n)})</h2>${g&&w!==null?`<span class="lvl-badge">${k}/${w}</span>`:""}</div>
    ${b.itens.filter(q=>m.includes(q.id)).map(q=>N("✓ "+r(q.nome),"",D(q.desc)+`<button class="btn small" data-unop="${q.id}">Remover</button>`)).join("")||'<p class="empty-note">Nenhuma escolhida.</p>'}
    <details class="entry"><summary><span class="t">Escolher ${r(b.titulo.replace("Opções de ","").toLowerCase())}</span><span class="lvl-badge">${b.itens.length}</span></summary><div class="body stack">
      ${b.itens.filter(q=>!m.includes(q.id)).map(q=>N(r(q.nome),"",D(q.desc),!1,`data-k="o-${s}-${q.id}"`,y?'<button class="btn small" data-opfull="1" aria-label="Limite de invocações atingido">+</button>':sa("data-op",q.id,"Escolher "+r(q.nome)))).join("")}
    </div></details></section>`}).join("")}
  <section class="card stack"><h2>Subclasse de ${r(n)}${p?": "+r(p.nome):""}</h2>
    ${p?(p.caracteristicas||[]).map(b=>N(`${b.nivel>t?"🔒 ":""}${r(b.nome)}`,`Nível ${b.nivel}`,D(b.desc))).join(""):`<p class="empty-note">${t<3?"A subclasse é escolhida no nível 3.":"Escolha a subclasse na aba Ficha (ou em Multiclasse, para uma classe secundária)."}</p>
         ${(l.subclasses||[]).map(b=>N(r(b.nome),"",D(b.intro))).join("")}`}
  </section>`}function ae(e,o,a){const u=o.sp,l=o.bg,p=o.speciesLabel||(u==null?void 0:u.nome)||"espécie";return`
  ${o.classesInfo.map(t=>Za(e,t,o)).join("")}
  <section class="card stack"><h2>Traços de ${r(p)}</h2>
    ${u&&p!==u.nome?`<p class="empty-note" style="margin:0">Usa as regras de ${r(u.nome)}.</p>`:""}
    <p class="empty-note">${r((u==null?void 0:u.tipo)||"")} · ${r((u==null?void 0:u.tamanho)||"")} · Deslocamento ${r((u==null?void 0:u.deslocamento)||"")}</p>
    ${((u==null?void 0:u.tracos)||[]).filter(t=>t.nome!=="Detalhes").map(t=>N(r(t.nome),"",D(t.desc))).join("")||'<p class="empty-note">Sem traços no compêndio.</p>'}
  </section>
  ${l?`<section class="card stack"><h2>Antecedente: ${r(l.nome)}</h2>
    <p style="margin:0;font-size:.92rem"><b>Atributos:</b> ${l.atributos.map(t=>wa[t]).join(", ")}<br>
    <b>Talento:</b> ${r(l.talento)}<br><b>Ferramenta:</b> ${r(l.ferramenta)}<br><b>Equipamento:</b> ${r(l.equipamento)}</p></section>`:""}
`}function ee(e,o,a){const u=a.app,l=e.build.opcoes||[];u.querySelectorAll("[data-op]").forEach(p=>p.onclick=()=>a.save({"build.opcoes":[...l,p.dataset.op]})),u.querySelectorAll("[data-unop]").forEach(p=>p.onclick=()=>a.save({"build.opcoes":l.filter(t=>t!==p.dataset.unop)})),u.querySelectorAll("[data-opfull]").forEach(p=>p.onclick=()=>E("Limite de invocações místicas atingido. Use a exceção manual na aba Magias se for o caso.")),G(u,"classe")}const te=["Origem","Geral","Estilo de Luta","Dádiva Épica"];function se(e,o,a){const u=a.S,l=u.comp,p=u.ui,t=e.build.feats||[],s=B(p.featQ);let n=l.feats.filter(d=>(d.repetivel||!t.some($=>$.id===d.id))&&(p.featCat==="all"||d.categoria===p.featCat)&&(!s||B(d.nome).includes(s)||B(d.prereq).includes(s)));const f=n.length;return n=n.slice(0,R),`
  <section class="card stack"><h2>Meus talentos</h2>
    ${t.length?t.map((d,$)=>{const m=l.byId.feats[d.id];return N(r((m==null?void 0:m.nome)||d.id),r(d.origem||(m==null?void 0:m.categoria)||""),(m?`<p class="empty-note">${r(m.categoria)}${m.prereq?" · Pré-requisito: "+r(m.prereq):""}</p>${D(m.desc)}`:'<p class="empty-note">Talento fora do compêndio.</p>')+`<button class="btn small" data-unfeat="${$}">Remover</button>`)}).join(""):'<p class="empty-note">Nenhum talento. Seu antecedente concede um talento de Origem.</p>'}
  </section>
  <section class="card stack"><h2>Biblioteca de talentos</h2>
    <input id="featq" type="search" placeholder="Buscar talento…" value="${r(p.featQ)}" aria-label="Buscar talento" />
    <div class="filters">${["all",...te].map(d=>`<button data-fcat="${d}" aria-pressed="${p.featCat===d}">${d==="all"?"Todos":d}</button>`).join("")}</div>
    <p class="empty-note">${f} talento(s)${f>R?` — mostrando ${R}`:""}.</p>
    ${n.map(d=>N(r(d.nome),r(d.categoria),`${d.prereq?`<p class="empty-note">Pré-requisito: ${r(d.prereq)}</p>`:""}${D(d.desc)}`,!1,`data-k="f-${d.id}"`,sa("data-feat",d.id,"Adicionar "+r(d.nome)))).join("")}
    ${l.feats.length?"":'<p class="empty-note">Importe o compêndio completo para usar a biblioteca de talentos.</p>'}
  </section>`}function ne(e,o,a){const u=a.S,l=a.app,p=e.build.feats||[];v("#featq").oninput=t=>{u.ui.featQ=t.target.value,O("fq",a.render,250)},l.querySelectorAll("[data-fcat]").forEach(t=>t.onclick=()=>{u.ui.featCat=t.dataset.fcat,a.render()}),l.querySelectorAll("[data-feat]").forEach(t=>t.onclick=()=>{a.save({"build.feats":[...p,{id:t.dataset.feat,origem:"Escolhido"}]}),a.toast("Talento adicionado. Aplique aumentos de atributo na aba Ficha, se houver.")}),l.querySelectorAll("[data-unfeat]").forEach(t=>t.onclick=()=>a.save({"build.feats":p.filter((s,n)=>n!==Number(t.dataset.unfeat))})),G(l,"feats")}function oe(e,o,a){const u=a.S,l=u.comp,p=u.ui,t=_(e),s=e.coins||{},n=B(p.itemQ),f=n.length>=2?l.items.filter(i=>B(i.nome).includes(n)).slice(0,25):[],d=Math.min(100,Math.round(o.weight/o.carry*100)),$=i=>i.tipo==="arma"?`${r(i.dano)} · ${r(i.propriedades)} · Maestria: ${r(i.maestria)}`:i.tipo==="armadura"?`CA ${r(i.ca)}${i.forca&&i.forca!=="—"?" · "+r(i.forca):""}${i.furtividade==="Desvantagem"?" · Desv. Furtividade":""}`:"",m=i=>i.itemId?l.byId.weapons[i.itemId]||l.byId.armor[i.itemId]||l.byId.gear[i.itemId]:null,w=(i,C)=>/po[çc][aã]o|elixir|antídoto/i.test(i.nome||(C==null?void 0:C.nome)||""),A={arma:"Armas",armadura:"Armaduras",pocao:"Poções"},b=i=>{const C=m(i);return(C==null?void 0:C.tipo)==="arma"?"Armas":(C==null?void 0:C.tipo)==="armadura"?"Armaduras":!C&&A[i.categoria]?A[i.categoria]:w(i,C)?"Poções":"Outros"},g=i=>i.categoria==="arma"&&i.dano?`${r(i.dano)}${i.ranged?" · À distância":""}${i.finesse?" · Acuidade":""}`:i.categoria==="armadura"&&Number(i.ca)?`CA ${i.ca}${i.caDex?` + Destreza${i.caDexMax!=null&&i.caDexMax!==""?` (máx ${i.caDexMax})`:""}`:""}`:"",k=i=>{const C=m(i),z=!C&&g(i);return N(`${i.equipado?"🛡️ ":""}${r(i.nome)}${Number(i.qtd)>1?` <span class="muted">×${i.qtd}</span>`:""}`,r(i.peso||""),`${C?`<p class="empty-note">${$(C)}${C.custo?" · "+r(C.custo):""}</p>${C.desc?D(C.desc):""}`:z?`<p class="empty-note">${z}</p>`:""}
      <div class="row">
        <button class="btn small" data-qty="${i.uid}" data-d="-1">−</button><b>${i.qtd}</b><button class="btn small" data-qty="${i.uid}" data-d="1">+</button>
        <label class="chk"><input type="checkbox" data-equip="${i.uid}" ${i.equipado?"checked":""}> Equipado</label>
        <label class="chk"><input type="checkbox" data-attune="${i.uid}" ${i.sintonizado?"checked":""}> Sintonizado</label>
      </div>
      <input data-inote="${i.uid}" id="inote-${i.uid}" value="${r(i.notas||"")}" placeholder="Notas (cargas, efeitos…)" aria-label="Notas do item" />
      <button class="btn small danger" data-rmitem="${i.uid}">Remover item</button>`,!1,`data-k="i-${i.uid}"`)},y=["Armas","Armaduras","Poções","Outros"],q=Object.fromEntries(y.map(i=>[i,t.filter(C=>b(C)===i)]));return`
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Bolsa de moedas</h2><span class="lvl-badge">≈ ${o.coinsGP.toLocaleString("pt-BR",{maximumFractionDigits:2})} PO</span></div>
    <div class="coins">${da.map(([i,C,z])=>`<label class="coin coin-${i}"><span>${C}</span>
      <input type="number" inputmode="numeric" min="0" data-coin="${i}" value="${Number(s[i])||0}" aria-label="${z}" /></label>`).join("")}</div>
    <form class="row" id="coinop">
      <input id="coinamt" type="number" inputmode="numeric" min="1" placeholder="Qtd." style="width:5.5rem" aria-label="Quantidade" />
      <select id="coinkind" style="width:5.5rem" aria-label="Moeda">${da.map(([i,C])=>`<option value="${i}" ${i==="po"?"selected":""}>${C}</option>`).join("")}</select>
      <button class="btn heal small" data-cop="+">Receber</button><button class="btn danger small" data-cop="-">Gastar</button>
    </form>
  </section>
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Inventário</h2><span class="lvl-badge">${o.weight.toLocaleString("pt-BR",{maximumFractionDigits:1})} / ${o.carry} kg</span></div>
    <div class="hpbar" aria-hidden="true"><div class="cur ${d>100?"low":d>75?"mid":""}" style="width:${d}%"></div></div>
    ${t.length?y.filter(i=>q[i].length).map(i=>`
      <div class="inv-divider"><span>${i}</span><span class="muted">${q[i].length}</span></div>
      ${q[i].map(k).join("")}`).join(""):'<p class="empty-note">Inventário vazio.</p>'}
  </section>
  <section class="card stack"><h2>Adicionar item</h2>
    <input id="itemq" type="search" placeholder="Buscar armas, armaduras, equipamento… (2+ letras)" value="${r(p.itemQ)}" aria-label="Buscar item" />
    ${f.map(i=>`<div class="libitem"><div class="info"><b>${r(i.nome)}</b><small>${r(i.custo||"")}${i.peso?" · "+r(i.peso):""} ${$(i)?"· "+$(i):""}</small></div>
      <button class="btn small primary" data-additem="${i.id}">+</button></div>`).join("")}
    ${n.length>=2&&!f.length?'<p class="empty-note">Nada encontrado — crie um item personalizado abaixo.</p>':""}
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
  </section>`}function le(e,o,a){const u=a.S,l=a.app,p=u.comp,t=_(e),s={pc:0,pp:0,pe:0,po:0,pl:0,...e.coins||{}},n=$=>a.save({inventory:$});l.querySelectorAll("[data-coin]").forEach($=>$.onchange=()=>a.save({coins:{...s,[$.dataset.coin]:Math.max(0,Number($.value)||0)}})),l.querySelectorAll("[data-cop]").forEach($=>$.onclick=m=>{m.preventDefault();const w=Number(v("#coinamt").value),A=v("#coinkind").value;if(!w)return a.toast("Digite a quantidade.");const b=s[A]+($.dataset.cop==="+"?w:-w);if(b<0)return a.toast(`Não há ${w} ${A.toUpperCase()} suficientes.`);a.save({coins:{...s,[A]:b}})}),v("#itemq").oninput=$=>{u.ui.itemQ=$.target.value,O("iq",a.render,250)},l.querySelectorAll("[data-additem]").forEach($=>$.onclick=()=>{const m=p.items.find(A=>A.id===$.dataset.additem),w=t.find(A=>A.itemId===m.id);n(w?t.map(A=>A===w?{...A,qtd:Number(A.qtd)+1}:A):[...t,{uid:$a(),itemId:m.id,nome:m.nome,qtd:1,peso:m.peso||"",equipado:!1,sintonizado:!1,notas:""}]),a.toast(`${m.nome} adicionado.`)});const f=()=>{const $=v("#ccat").value;v("#c-arma-fields").style.display=$==="arma"?"":"none",v("#c-armadura-fields").style.display=$==="armadura"?"":"none"};v("#ccat").onchange=f,f(),v("#custom").onsubmit=$=>{$.preventDefault();const m=v("#cname").value.trim();if(!m)return;const w=v("#cweight").value.trim(),A=Math.max(1,Number(v("#cqty").value)||1),b=v("#ccat").value,g={uid:$a(),itemId:null,nome:m,categoria:b,qtd:A,peso:w?`${w} kg`:"",equipado:!1,sintonizado:!1,notas:v("#cdetail").value.trim()};if(b==="arma"){const k=v("#cdano").value.trim();k&&(g.dano=k),g.ranged=v("#cranged").checked,g.finesse=v("#cfinesse").checked}else if(b==="armadura"){const k=Number(v("#ccabase").value);k&&(g.ca=k),g.caDex=v("#ccadex").checked;const y=v("#ccadexmax").value.trim();y&&(g.caDexMax=Number(y))}n([...t,g]),a.toast(`${m} adicionado.`)};const d=($,m)=>n(t.map(w=>w.uid===$?m(w):w));l.querySelectorAll("[data-qty]").forEach($=>$.onclick=()=>d($.dataset.qty,m=>({...m,qtd:Math.max(0,Number(m.qtd)+Number($.dataset.d))}))),l.querySelectorAll("[data-equip]").forEach($=>$.onchange=()=>d($.dataset.equip,m=>({...m,equipado:$.checked}))),l.querySelectorAll("[data-attune]").forEach($=>$.onchange=()=>{if($.checked&&t.filter(m=>m.sintonizado).length>=3)return $.checked=!1,a.toast("Limite de 3 itens sintonizados.");d($.dataset.attune,m=>({...m,sintonizado:$.checked}))}),l.querySelectorAll("[data-inote]").forEach($=>$.oninput=()=>O("in"+$.dataset.inote,()=>d($.dataset.inote,m=>({...m,notas:$.value})))),l.querySelectorAll("[data-rmitem]").forEach($=>$.onclick=()=>n(t.filter(m=>m.uid!==$.dataset.rmitem))),G(l,"itens")}const ie={ficha:{html:Wa,bind:Ya},magias:{html:Ja,bind:Xa},classe:{html:ae,bind:ee},talentos:{html:se,bind:ne},itens:{html:oe,bind:le}},x=v("#app"),h={be:null,comp:null,user:null,chId:null,ch:null,tab:"combate",amount:"",off:[],prevHp:null,ui:{spellQ:"",spellLvl:"all",spellMine:!0,featQ:"",featCat:"all",itemQ:"",libOpen:{}}};function aa(e){if(!h.ch||!e)return;const o=structuredClone(h.ch);Object.entries(e).forEach(([a,u])=>_a(o,a,u)),h.ch=o,V()}const na=()=>`rpgmesa:last:${h.user.uid}`,K=()=>{h.off.forEach(e=>e()),h.off=[]},ha=Object.fromEntries(Ma.map(([e,o])=>[e,o])),ea=Object.fromEntries(P);ce().catch(e=>{x.innerHTML=`<div class="wrap"><div class="card">Erro ao iniciar: ${r(e.message)}</div></div>`});async function ce(){h.be=await Ta(),Pa(h.be,x,{title:"Grimório do Aventureiro",subtitle:"Entre com sua conta para acessar seus personagens em qualquer aparelho.",onSignedOut:()=>{K(),h.ch=null,h.chId=null,h.prevHp=null}},async e=>{h.user=e,x.innerHTML='<p class="muted" style="padding:1rem">Carregando compêndio…</p>',h.comp=await Ba(h.be);const o=ta.get(na());o?oa(o):F()})}const ka=()=>h.be.mode==="local"?'<p class="banner">Modo demo: os dados ficam neste navegador. Abra o Escudo em outra aba para testar a sincronização.</p>':"",re=()=>h.comp.completo?"":'<p class="banner">Biblioteca reduzida: o Mestre ainda não importou o compêndio completo no Escudo.</p>';function F(){K(),h.chId=null,h.ch=null,ta.set(na(),null);let e=!1;h.off.push(h.be.watchMyCharacters(o=>{v("#build")||(o.sort((a,u)=>a.name.localeCompare(u.name)),x.innerHTML=`<header class="top"><div class="row"><div class="grow name">Meus personagens</div>
      <a class="btn small" href="./escudo.html" title="Ir para o Escudo do Mestre">🛡️ Escudo</a>${ga(h.user)}</div></header>
    <main class="wrap stack">${ka()}${re()}
      ${o.map(a=>`<button class="charbtn" data-open="${a.id}">
        <span><b>${r(a.name)}</b><br><small class="muted">${r(Sa(a))}</small></span>
        <span class="chip">${a.campaignName?"🎲 "+r(a.campaignName):"Sem mesa"}</span></button>`).join("")}
      ${o.length?"":'<div class="card"><p style="margin:0">Você ainda não tem personagens. Crie o primeiro abaixo — ele fica salvo na sua conta.</p></div>'}
      <button class="btn primary" id="newchar" style="width:100%">+ Novo personagem</button>
    </main>`,ya(h.be,x),x.querySelectorAll("[data-open]").forEach(a=>a.onclick=()=>oa(a.dataset.open)),v("#newchar").onclick=()=>de(),!o.length&&!e&&(e=!0))}))}function de(){K();const e=h.comp,o=[15,14,13,12,10,8];x.innerHTML=`<header class="top"><div class="row"><button class="btn small" id="back" aria-label="Voltar">◀</button><div class="grow name">Novo personagem</div></div></header>
  <main class="wrap stack">
  <form class="stack" id="build">
    <section class="card stack">
      <div><label for="name">Nome</label><input id="name" name="name" required maxlength="40" /></div>
      <div class="row">
        <div class="grow"><label for="species">Espécie</label><select id="species" name="species">
          ${e.species.map(b=>`<option value="${b.id}">${r(b.nome)}</option>`).join("")}</select></div>
        <div style="width:5.5rem"><label for="level">Nível</label><input id="level" name="level" type="number" inputmode="numeric" min="1" max="20" value="1" /></div>
      </div>
      <div><label for="class">Classe</label><select id="class" name="class">
        ${e.classes.map(b=>`<option value="${b.id}">${r(b.nome)}</option>`).join("")}</select></div>
      <div id="classinfo"></div>
    </section>
    ${e.backgrounds.length?`<section class="card stack">
      <div><label for="bg">Antecedente</label><select id="bg" name="bg">
        ${e.backgrounds.map(b=>`<option value="${b.id}">${r(b.nome)}</option>`).join("")}</select></div>
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
  </form></main>`,v("#back").onclick=F;const a=v("#build"),u=()=>e.byId.classes[a.class.value],l=()=>{var b,g;return(g=e.byId.backgrounds)==null?void 0:g[(b=a.bg)==null?void 0:b.value]};function p(){var k;const b=u(),g=(k=b.periciasOpcoes)!=null&&k.length?b.periciasOpcoes:[];v("#classinfo").innerHTML=`
      <p class="muted" style="margin:.2rem 0;font-size:.88rem">Dado de Vida d${b.dadoVida} · Salvaguardas: ${(b.salvaguardas||[]).map(y=>ea[y]).join(", ")}</p>
      ${g.length?`<div><label>Perícias da classe — escolha ${b.periciasEscolha} <span id="skcount"></span></label>
        <div class="checks">${g.map(y=>`<label class="chk"><input type="checkbox" name="sk" value="${y}"> ${ha[y]}</label>`).join("")}</div></div>`:""}`,a.querySelectorAll("[name=sk]").forEach(y=>y.onchange=t),t()}function t(){var q;const b=u(),g=((q=l())==null?void 0:q.pericias)||[],k=[...a.querySelectorAll("[name=sk]")];k.forEach(i=>{g.includes(i.value)&&(i.checked=!1,i.disabled=!0,i.parentElement.title="Já vem do antecedente")});const y=k.filter(i=>i.checked).length;k.forEach(i=>{g.includes(i.value)||(i.disabled=!i.checked&&y>=b.periciasEscolha)}),v("#skcount")&&(v("#skcount").textContent=`(${y}/${b.periciasEscolha})`)}function s(){const b=l();if(!b)return;const g=e.byId.feats[b.talentoId];v("#bginfo").innerHTML=`
      <p style="margin:.2rem 0;font-size:.9rem"><b>Perícias:</b> ${b.pericias.map(k=>ha[k]).join(", ")}<br>
      <b>Talento:</b> ${r((g==null?void 0:g.nome)||b.talento)}<br><b>Ferramenta:</b> ${r(b.ferramenta)}</p>
      <div class="row">
        <div class="grow"><label for="plus2">+2 em</label><select id="plus2">${b.atributos.map(k=>`<option value="${k}">${ea[k]}</option>`).join("")}<option value="all">+1 nos três</option></select></div>
        <div class="grow" id="plus1wrap"><label for="plus1">+1 em</label><select id="plus1">${b.atributos.map((k,y)=>`<option value="${k}" ${y===1?"selected":""}>${ea[k]}</option>`).join("")}</select></div>
      </div>
      <details class="entry"><summary><span class="t">Equipamento do antecedente</span></summary><div class="body">${r(b.equipamento)}</div></details>`,v("#plus2").onchange=v("#plus1").onchange=f,f(),t()}function n(){const b=l(),g={};if(!b)return g;const k=v("#plus2").value;if(k==="all")b.atributos.forEach(y=>g[y]=1);else{g[k]=2;const y=v("#plus1").value;y!==k&&(g[y]=(g[y]||0)+1)}return g}function f(){const b=n();v("#plus1wrap")&&(v("#plus1wrap").style.visibility=v("#plus2").value==="all"?"hidden":""),a.querySelectorAll(".abfinal").forEach(g=>{const k=g.dataset.ab,y=Math.min(20,Number(a[k].value)+(b[k]||0));g.textContent=b[k]?`→ ${y} (${I(ba(y))})`:`(${I(ba(y))})`})}const d=27,$={8:0,9:1,10:2,11:3,12:4,13:5,14:7,15:9},m=b=>$[b]??0;let w="array";function A(){const b=w==="buy";if(v("#ab-inputs").innerHTML=P.map(([g,k],y)=>{const q=document.getElementById("ab-"+g),i=q?q.value:b?8:o[y];return`<div><label for="ab-${g}">${k} <b class="abfinal" data-ab="${g}"></b></label>
        <div class="row" style="align-items:center;gap:.4rem;flex-wrap:nowrap">
          ${b?`<button type="button" class="btn small" data-abdown="${g}" aria-label="Diminuir ${k}">−</button>`:""}
          <input id="ab-${g}" name="${g}" type="number" inputmode="numeric" min="${b?8:3}" max="${b?15:20}"
            value="${i}" ${b?'readonly style="width:3.5rem;text-align:center"':""} />
          ${b?`<button type="button" class="btn small" data-abup="${g}" aria-label="Aumentar ${k}">+</button>`:""}
        </div></div>`}).join(""),b){const g=P.reduce((y,[q])=>y+m(Number(a[q].value)),0),k=d-g;v("#abpts").style.display="",v("#abpts").textContent=`${k} de ${d} pontos restantes`,a.querySelectorAll("[data-abup]").forEach(y=>y.onclick=()=>{const q=y.dataset.abup,i=Number(a[q].value);if(!(i>=15)){if(g+(m(i+1)-m(i))>d)return E("Sem pontos suficientes.");a[q].value=i+1,A()}}),a.querySelectorAll("[data-abdown]").forEach(y=>y.onclick=()=>{const q=y.dataset.abdown,i=Number(a[q].value);i<=8||(a[q].value=i-1,A())})}else v("#abpts").style.display="none",P.forEach(([g])=>a[g].oninput=f);f()}x.querySelectorAll("[data-abmode]").forEach(b=>b.onclick=()=>{b.dataset.abmode!==w&&(w=b.dataset.abmode,x.querySelectorAll("[data-abmode]").forEach(g=>g.setAttribute("aria-selected",String(g.dataset.abmode===w))),v("#abmode-help").textContent=w==="buy"?`Compra de pontos: comece com 8 em tudo e gaste os ${d} pontos (custo 9=1, 10=2, 11=3, 12=4, 13=5, 14=7, 15=9). Máximo 15 antes dos bônus do antecedente.`:"Valores base (Array Padrão: 15, 14, 13, 12, 10, 8). Edite livremente, se preferir. O bônus do antecedente é somado automaticamente.",P.forEach(([g],k)=>{const y=document.getElementById("ab-"+g);y&&(y.value=w==="buy"?8:o[k])}),A())}),a.class.onchange=p,a.bg&&(a.bg.onchange=s),p(),s(),A(),a.onsubmit=async b=>{var q;b.preventDefault();const g=n(),k=Object.fromEntries(P.map(([i])=>[i,Math.min(20,Number(a[i].value)+(g[i]||0))])),y=La({name:a.name.value.trim(),ownerUid:h.user.uid,speciesId:a.species.value,classId:a.class.value,level:Number(a.level.value),abilities:k,backgroundId:((q=a.bg)==null?void 0:q.value)||null,skillProfs:[...a.querySelectorAll("[name=sk]:checked")].map(i=>i.value)},e);try{oa(await h.be.createCharacter(y))}catch(i){E(i.message)}}}const Sa=e=>`${Oa(e.build,h.comp)} · ${za(e.build,h.comp)}`;function oa(e){K(),h.chId=e,h.prevHp=null,ta.set(na(),e),h.off.push(h.be.watchCharacter(e,o=>{if(!o)return F();const a=h.prevHp;if(h.prevHp=o.state.hp.current+o.state.hp.temp,h.ch=o,V(),a!=null&&a!==h.prevHp){const u=v("#hpcard");u==null||u.classList.add(h.prevHp<a?"flash-dmg":"flash-heal"),navigator.vibrate&&h.prevHp<a&&navigator.vibrate(80)}}))}const ue=[["combate","❤️","Combate"],["ficha","📜","Ficha"],["magias","✨","Magias"],["classe","🛡️","Traços"],["talentos","⭐","Talentos"],["itens","🎒","Itens"]],M={get S(){return h},app:x,render:()=>V(),save:e=>h.be.updateCharacter(h.chId,e).catch(o=>E(o.message)),toast:E,showHome:()=>F(),confirmTwice:me,accountChip:ga,bindLogout:ya};function V(){if(Ha(V))return;const e=h.ch,o=Ra(e,h.comp),a=document.activeElement,u=a==null?void 0:a.id,l=a&&"selectionStart"in a?[a.selectionStart,a.selectionEnd]:null,p=window.scrollY,t={combate:{html:ve,bind:$e},...ie},s=t[h.tab]||t.combate;if(x.innerHTML=`
    <header class="top">
      <div class="row"><button class="btn small" id="home" aria-label="Meus personagens">◀</button>
        <div class="grow"><div class="name">${r(e.name)}</div>
        <div class="mini"><span>${r(Sa(e))}</span>${e.campaignName?`<span>🎲 ${r(e.campaignName)}</span>`:""}</div></div>
        <div class="mini"><span>CA <b>${o.ac}</b></span><span>PV <b>${e.state.hp.current}/${e.state.hp.max}</b></span></div>
        <a class="btn small" href="./escudo.html" title="Ir para o Escudo do Mestre">🛡️</a></div>
    </header>
    <main class="wrap stack">${ka()}${s.html(e,o,M)}</main>
    <nav class="tabs" role="tablist">${ue.map(([n,f,d])=>`<button role="tab" aria-selected="${h.tab===n}" data-tab="${n}"><span class="ico" aria-hidden="true">${f}</span>${d}</button>`).join("")}</nav>`,x.querySelectorAll("[data-tab]").forEach(n=>n.onclick=()=>{h.tab=n.dataset.tab,V(),window.scrollTo(0,0)}),v("#home").onclick=F,s.bind(e,o,M),window.scrollTo(0,p),u){const n=document.getElementById(u);if(n&&(n.focus({preventScroll:!0}),l&&"setSelectionRange"in n))try{n.setSelectionRange(...l)}catch{}}}function me(e,o){const a=v(e);if(a.dataset.armed)return!0;a.dataset.armed="1";const u=a.textContent;return a.textContent=o,setTimeout(()=>{a.isConnected&&(delete a.dataset.armed,a.textContent=u)},3e3),!1}function pe(e,o){var t;const a=e.state.effects||[],u=s=>s==null?"até o descanso longo ou encerrar":s===1?"1 rodada restante":`${s} rodadas restantes`,l=Fa(e).filter(([s])=>!a.some(n=>n.id===s)),p=s=>l.filter(([,n])=>n.tipo===s).map(([n,f])=>`<option value="${n}">${r(f.nome)}</option>`).join("");return`<section class="card stack" id="fxcard">
    <div class="sectiontitle"><h2 style="margin:0">Efeitos ativos</h2>
      ${a.some(s=>s.rounds!=null)?'<button class="btn small primary" id="nextround">Próxima rodada ▶</button>':""}</div>
    ${o.fx.lista.length?o.fx.lista.map(s=>{var n;return`<div class="stack" style="gap:.3rem;border:1px solid var(--line);border-radius:10px;padding:.5rem .65rem">
      <div class="sectiontitle"><b>${r(s.nome)}</b><span class="lvl-badge">${u(s.rounds)}</span></div>
      <div class="row">${Ua(s.mods).map(f=>`<span class="chip">${r(f)}</span>`).join("")}${(s.mods.notas||[]).map(f=>`<span class="chip">${r(f)}</span>`).join("")}</div>
      ${(n=L[s.id])!=null&&n.nota?`<div class="muted" style="font-size:.82rem">${r(L[s.id].nota)}</div>`:""}
      <div class="row">${s.rounds!=null?`<button class="btn small" data-fxadj="${s.uid}" data-d="-1">−1 rodada</button><button class="btn small" data-fxadj="${s.uid}" data-d="1">+1 rodada${s.id==="furia"?" (estender)":""}</button>`:""}
        <button class="btn small danger" data-fxend="${s.uid}">Encerrar</button></div></div>`}).join(""):'<p class="empty-note" style="margin:0">Nenhum. Ative uma Fúria, uma magia que muda CA ou deslocamento, ou crie um efeito próprio — CA, deslocamento e resistências se ajustam sozinhos.</p>'}
    ${(t=o.resist)!=null&&t.length?`<p class="muted" style="margin:0;font-size:.85rem">Resistências agora: ${r(o.resist.join(", "))}</p>`:""}
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
  </section>`}function be(e,o,a){const u=_(e).filter(t=>{var s,n;return t.itemId&&((n=(s=o.byId)==null?void 0:s.weapons)==null?void 0:n[t.itemId])||t.categoria==="arma"}).map(t=>{var s,n;return{it:t,w:t.itemId?(n=(s=o.byId)==null?void 0:s.weapons)==null?void 0:n[t.itemId]:null}});if(!u.length)return`<section class="card stack"><h2>Ataques</h2>
      <p class="muted" style="margin:0">Nenhuma arma no inventário — desarmado: <b>${I(a.pb+a.mods.for)}</b> pra acertar, <b>1${I(a.mods.for)}</b> de dano contundente.</p></section>`;const l=Object.fromEntries(Qa(e,o,a).map(t=>[t.uid,t])),p=u.some(({it:t})=>t.equipado);return`<section class="card stack"><h2>Ataques</h2>
    ${u.map(({it:t,w:s})=>{const n=l[t.uid],f=!n&&t.equipado?' <span class="muted">(sem cálculo automático — veja as Notas)</span>':"";return`<div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem">
        <span>${t.equipado?"⚔️ ":""}${r(t.nome||(s==null?void 0:s.nome)||"")}${n?` — <b>${I(n.atk)}</b> pra acertar · <b>${r(n.dice)}${n.dmgBonus?I(n.dmgBonus):""}</b> ${r(n.dmgType)}${n.maestria?` <span class="muted">(${r(n.maestria)})</span>`:""}`:f}</span>
        <button class="btn small ${t.equipado?"":"primary"}" data-swapweapon="${t.uid}">${t.equipado?"Guardar":"Empunhar"}</button>
      </div>`}).join("")}
    ${p?"":`<p class="muted" style="margin:0">Nenhuma arma empunhada — desarmado: <b>${I(a.pb+a.mods.for)}</b> pra acertar, <b>1${I(a.mods.for)}</b> de dano contundente.</p>`}
    <p class="muted" style="margin:0;font-size:.8rem">Toque em "Empunhar"/"Guardar" pra trocar de arma. Bônus de ataque = Proficiência + atributo; dano = dado da arma + atributo.</p>
  </section>`}function ve(e,o){const{hp:a,deathSaves:u={success:0,fail:0},conditions:l=[],dead:p}=e.state,t=a.max+a.temp,s=Math.round(a.current/t*100),n=Math.round(a.temp/t*100),f=a.current/a.max>.5?"":a.current/a.max>.25?"mid":"low",d=a.current===0&&!p,$=e.state.concentration?h.comp.byId.spells[e.state.concentration]:null;return`
  <section class="card stack" id="hpcard">
    <div class="hp-big"><div class="num">${a.current}<small> / ${a.max}</small></div>
      ${a.temp?`<div class="tmpv">+${a.temp} temporários</div>`:""}
      ${p?'<div class="chip bad" style="margin-top:.4rem">MORTO</div>':""}</div>
    <div class="hpbar" aria-hidden="true"><div class="cur ${f}" style="width:${s}%"></div><div class="tmp" style="width:${n}%"></div></div>
    <input id="amount" class="amount" type="number" inputmode="numeric" min="0" placeholder="0" value="${r(h.amount)}" aria-label="Valor" />
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
    <div><b>${I(o.initiative)}</b><small>Iniciativa</small></div>
    <div><b>${r(o.speed.replace(" metros"," m"))}</b><small>Deslocamento</small></div>
    <div><b>${o.passivePerception}</b><small>Perc. passiva</small></div>
  </div>
  ${o.acDetalhe?`<p class="empty-note" style="margin:.5rem 0 0">CA automática: ${r(o.acDetalhe)}</p>`:""}</section>
  ${pe(e,o)}
  ${be(e,h.comp,o)}
  ${$?`<p class="banner">Concentrando em: <b>${r($.nome)}</b> <button class="btn small" id="endconc" style="margin-left:.5rem">Encerrar</button></p>`:""}
  ${d?`<section class="card stack"><h2>Testes contra a morte</h2>
    <div class="saves"><div><small class="muted">Sucessos</small><div class="pips">${[0,1,2].map(m=>`<span class="pip ${m<u.success?"s":""}"></span>`).join("")}</div></div>
      <div><small class="muted">Falhas</small><div class="pips">${[0,1,2].map(m=>`<span class="pip ${m<u.fail?"f":""}"></span>`).join("")}</div></div></div>
    <button class="btn primary" id="roll-death" style="width:100%">Rolar d20</button></section>`:""}
  <section class="card stack"><h2>Condições</h2>
    <div class="row">${l.map(m=>`<button class="chip bad" data-rmcond="${m}" aria-label="Remover ${m}">${ma[m]||m} ✕</button>`).join("")||'<span class="muted">Nenhuma</span>'}</div>
    <div class="row"><select id="addcond" class="grow" aria-label="Adicionar condição"><option value="">Adicionar condição…</option>
      ${Va.filter(m=>!l.includes(m)).map(m=>`<option value="${m}">${ma[m]||m}</option>`).join("")}</select></div>
  </section>
  <section class="card stack"><h2>Descanso</h2>
    ${(e.state.hitDice.byClass||[]).length>1?e.state.hitDice.byClass.map(m=>{const w=h.comp.byId.classes[m.classId];return`<div class="row" style="justify-content:space-between"><span class="muted">${r((w==null?void 0:w.nome)||m.classId)}: ${m.max-m.used}/${m.max} (d${m.die})</span>
            <button class="btn small" data-shortclass="${m.classId}">Gastar</button></div>`}).join(""):`<p class="muted" style="margin:0">Dados de Vida: ${e.state.hitDice.max-e.state.hitDice.used}/${e.state.hitDice.max} (d${e.state.hitDice.die})</p>
         <div class="row"><button class="btn grow" id="short">Gastar 1 Dado de Vida</button></div>`}
    <div class="row"><button class="btn grow" id="long">Descanso Longo</button></div>
  </section>
  <section class="card"><h2>Registro</h2><ul class="log">${(e.state.log||[]).map(m=>`<li>${r(m)}</li>`).join("")||"<li>—</li>"}</ul></section>`}function $e(e,o){const a=s=>M.save({"state.effects":s}),u=s=>Number(s)>=1?Math.floor(Number(s)):null;v("#fxadd").onclick=()=>{const s=v("#fxpick").value;if(!s)return E("Escolha um efeito.");const n=L[s],f=v("#fxrounds").value?u(v("#fxrounds").value):n.rounds;a([...e.state.effects||[],{uid:pa(),id:s,nome:n.nome,rounds:f}]),E(`${n.nome} ativo${f?` — ${f} rodada${f>1?"s":""}`:""}.`)},v("#fxc-add").onclick=()=>{const s=v("#fxc-nome").value.trim();if(!s)return E("Dê um nome ao efeito.");a([...e.state.effects||[],{uid:pa(),id:"custom",nome:s,rounds:u(v("#fxc-rounds").value),ac:Number(v("#fxc-ac").value)||0,speed:Number(v("#fxc-speed").value)||0}])};const l=(s,n,f)=>{const d=[];return{out:s.map(m=>{var A;if(m.rounds==null||f&&m.uid!==f)return m;const w=m.rounds+n;return w<=0?(d.push(m.nome||((A=L[m.id])==null?void 0:A.nome)),null):{...m,rounds:w}}).filter(Boolean),ended:d}};v("#nextround")&&(v("#nextround").onclick=()=>{const{out:s,ended:n}=l(e.state.effects||[],-1);a(s),E(n.length?`Terminou: ${n.join(", ")}.`:"Rodada avançada.")}),x.querySelectorAll("[data-fxadj]").forEach(s=>s.onclick=()=>{const{out:n,ended:f}=l(e.state.effects||[],Number(s.dataset.d),s.dataset.fxadj);a(n),f.length&&E(`Terminou: ${f.join(", ")}.`)}),x.querySelectorAll("[data-fxend]").forEach(s=>s.onclick=()=>a((e.state.effects||[]).filter(n=>n.uid!==s.dataset.fxend))),x.querySelectorAll("[data-swapweapon]").forEach(s=>s.onclick=()=>{const n=_(e),f=n.find($=>$.uid===s.dataset.swapweapon),d=!f.equipado;M.save({inventory:n.map($=>$.uid===f.uid?{...$,equipado:d}:$)}),E(`${f.nome} ${d?"empunhada":"guardada"}.`)});const p=v("#amount");p.oninput=()=>h.amount=p.value,x.querySelectorAll("[data-q]").forEach(s=>s.onclick=()=>{h.amount=s.dataset.q==="C"?"":String((Number(h.amount)||0)+Number(s.dataset.q)),p.value=h.amount}),x.querySelectorAll("[data-act]").forEach(s=>s.onclick=async()=>{const n=Number(h.amount);if(!n)return E("Digite um valor.");const f={resistant:v("#o-res").checked,vulnerable:v("#o-vul").checked,critical:v("#o-crit").checked};h.amount="";const d=await X(h.be,h.chId,s.dataset.act,n,f,e.name);aa(d.patch),d.concentrationDC&&e.state.concentration?E(`Teste de Concentração: CD ${d.concentrationDC}`):d.log.length&&E(d.log.at(-1))}),v("#endconc")&&(v("#endconc").onclick=()=>M.save({"state.concentration":null})),v("#roll-death")&&(v("#roll-death").onclick=async()=>{const s=va("1d20").total,n=await X(h.be,h.chId,"morte",s,{},e.name);aa(n.patch),E(`d20 = ${s}. ${n.log.at(-1)??""}`)}),x.querySelectorAll("[data-rmcond]").forEach(s=>s.onclick=()=>M.save({"state.conditions":e.state.conditions.filter(n=>n!==s.dataset.rmcond)})),v("#addcond").onchange=s=>s.target.value&&M.save({"state.conditions":[...e.state.conditions,s.target.value]});const t=async(s,n)=>{const f=va(`1d${s}`).total+o.mods.con;await n();const d=await X(h.be,h.chId,"cura",Math.max(0,f),{},e.name);aa(d.patch),E(`Dado de Vida: ${f}. ${d.log[0]??""}`)};v("#short")&&(v("#short").onclick=()=>{const s=e.state.hitDice;if(s.used>=s.max)return E("Sem Dados de Vida disponíveis.");t(s.die,()=>M.save({"state.hitDice.used":s.used+1}))}),x.querySelectorAll("[data-shortclass]").forEach(s=>s.onclick=()=>{const n=e.state.hitDice.byClass,f=n.findIndex(m=>m.classId===s.dataset.shortclass),d=n[f];if(d.used>=d.max)return E("Sem Dados de Vida dessa classe.");const $=n.map((m,w)=>w===f?{...m,used:m.used+1}:m);t(d.die,()=>M.save({"state.hitDice.byClass":$,"state.hitDice.used":$.reduce((m,w)=>m+w.used,0)}))}),v("#long").onclick=async()=>{const s=Object.fromEntries(Object.entries(e.state.spellSlots||{}).map(([d,$])=>[d,{...$,used:0}])),n=Object.fromEntries(Object.entries(e.state.pactSlots||{}).map(([d,$])=>[d,{...$,used:0}])),f=(e.state.hitDice.byClass||[]).map(d=>({...d,used:0}));await M.save({"state.hp":{...e.state.hp,current:e.state.hp.max,temp:0},"state.spellSlots":s,"state.pactSlots":n,"state.hitDice":{...e.state.hitDice,byClass:f,used:0},"state.deathSaves":{success:0,fail:0},"state.effects":[],"state.conditions":e.state.conditions.filter(d=>!["inconsciente","estabilizado"].includes(d))}),E("Descanso longo concluído.")}}
