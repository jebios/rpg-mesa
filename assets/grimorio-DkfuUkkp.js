import"./pwa-Dtf0izBC.js";import{e as d,A as B,n as _,$ as v,q as da,t as E,E as L,i as I,w as J,x as ja,o as Ia,y as ua,z as Na,B as Ma,D as Da,S as Ta,g as Ba,r as Pa,l as La,s as sa,a as ga,b as ya,F as Oa,G as za,h as Ha,c as Va,d as Ra,C as ma,j as Fa,u as pa,k as X,H as Ua,I as Qa,J as _a,m as Ga,K as ba,f as Ka}from"./mapviewer-xe0nP2AI.js";function va(e){const o=String(e).replace(/\s/g,"").match(/^(\d*)d(\d+)([+-]\d+)?$/i);if(!o)return null;const a=Number(o[1]||1),c=Number(o[2]),l=Number(o[3]||0),p=Array.from({length:a},()=>1+Math.floor(Math.random()*c));return{rolls:p,bonus:l,total:p.reduce((s,t)=>s+t,0)+l}}const H=e=>d(e).replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>").replace(/(^|\s)_([^_]+)_(?=\s|$|[.,;:])/g,"$1<i>$2</i>");function M(e){if(!e)return"";const o=[];for(const a of String(e).split(/\n\n+/)){const c=a.split(`
`);if(c.every(l=>l.startsWith("| "))){o.push('<div class="mdtable"><table>'+c.map(l=>"<tr>"+l.slice(2).split(" | ").map(p=>`<td>${H(p)}</td>`).join("")+"</tr>").join("")+"</table></div>");continue}for(const l of c)l.startsWith("#### ")?o.push(`<h5>${H(l.slice(5))}</h5>`):l.startsWith("### ")?o.push(`<h4>${H(l.slice(4))}</h4>`):l.startsWith("| ")?o.push('<div class="mdtable"><table><tr>'+l.slice(2).split(" | ").map(p=>`<td>${H(p)}</td>`).join("")+"</tr></table></div>"):l.startsWith("• ")?o.push(`<p class="bullet">${H(l)}</p>`):o.push(`<p>${H(l)}</p>`)}return`<div class="md">${o.join("")}</div>`}const P=e=>String(e||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(),wa=Object.fromEntries(B),V=40,Q=e=>e===0?"Truque":`${e}º círculo`,fa=()=>Math.random().toString(36).slice(2,9),N=(e,o,a,c=!1,l="",p="")=>`<details class="entry" ${c?"open":""} ${l}><summary><span class="t">${e}</span><span class="row" style="gap:.4rem;flex-wrap:nowrap"><span class="lvl-badge">${o||""}</span>${p}</span></summary><div class="body">${a}</div></details>`,ta=(e,o,a="Adicionar")=>`<button class="btn small primary addbtn" ${e}="${o}" aria-label="${a}">+</button>`;function Wa(e,o,a){const c=a.S,l=c.comp,p=new Set(e.build.classes.map(n=>n.classId)),s=l.classes.filter(n=>!p.has(n.id)),t=o.classesInfo.slice(1);return`
  <section class="card stack"><h2>Multiclasse</h2>
    <p class="empty-note" style="margin:0">Nível total: ${o.level}/20. Ao multiclassar, confira na aba Traços quais proficiências a nova classe concede (são menos do que na criação) e ajuste "Treinamento e Proficiências" à mão, se precisar.</p>
    ${t.length?t.map(n=>{var u,f,m,w,A;const h=((u=n.cls)==null?void 0:u.subclasses)||[];return`<div class="row" style="flex-wrap:wrap;gap:.5rem;border-top:1px solid var(--border,#3332);padding-top:.5rem">
        <b class="grow">${d(((f=n.cls)==null?void 0:f.nome)||n.classId)}</b>
        <div class="row" style="gap:.3rem"><button class="btn small" data-mcdown="${n.classId}" aria-label="Diminuir nível de ${d(((m=n.cls)==null?void 0:m.nome)||n.classId)}">−</button>
          <span style="min-width:1.4rem;text-align:center">${n.level}</span>
          <button class="btn small" data-mcup="${n.classId}" aria-label="Subir nível de ${d(((w=n.cls)==null?void 0:w.nome)||n.classId)}">+</button></div>
        ${h.length?`<select data-mcsub="${n.classId}" aria-label="Subclasse de ${d(((A=n.cls)==null?void 0:A.nome)||n.classId)}" ${n.level<3?"disabled":""}>
          <option value="">—</option>${h.map(b=>`<option value="${b.id}" ${b.id===n.subclassId?"selected":""}>${d(b.nome)}</option>`).join("")}</select>`:""}
        <button class="btn small danger" data-mcrm="${n.classId}">Remover</button>
      </div>`}).join(""):'<p class="empty-note">Personagem de classe única.</p>'}
    ${s.length&&o.level<20?`<form class="row" id="addclass">
      <select id="mcnew" class="grow" aria-label="Nova classe">${s.map(n=>`<option value="${n.id}">${d(n.nome)}</option>`).join("")}</select>
      <button class="btn primary small">+ Adicionar classe</button></form>`:""}
  </section>`}function Ya(e,o,a){const c=a.S,l=a.app;l.querySelectorAll("[data-mcup]").forEach(p=>p.onclick=()=>{const s=e.build.classes.find(t=>t.classId===p.dataset.mcup);a.save(ua(e,c.comp,p.dataset.mcup,s.level+1))}),l.querySelectorAll("[data-mcdown]").forEach(p=>p.onclick=()=>{const s=e.build.classes.find(t=>t.classId===p.dataset.mcdown);if(s.level<=1)return a.toast('Nível mínimo 1 — use "Remover" para tirar a classe.');a.save(ua(e,c.comp,p.dataset.mcdown,s.level-1))}),l.querySelectorAll("[data-mcsub]").forEach(p=>p.onchange=()=>a.save(Na(e,c.comp,p.dataset.mcsub,p.value||null))),l.querySelectorAll("[data-mcrm]").forEach(p=>p.onclick=()=>{if(!a.confirmTwice(`[data-mcrm="${p.dataset.mcrm}"]`,"Toque de novo para remover"))return;const s=Ma(e,c.comp,p.dataset.mcrm);s&&a.save(s)}),v("#addclass")&&(v("#addclass").onsubmit=p=>{p.preventDefault();const s=Da(e,c.comp,v("#mcnew").value);s&&(a.save(s),a.toast("Classe adicionada no nível 1."))})}function Ja(e,o,a){var n,h;const c=a.S,l=e.build.classes[0].level,p=e.build.classes[0],s=((n=o.cls)==null?void 0:n.subclasses)||[],t=e.build.training||{};return`
  <section class="card stack">
    <div class="sectiontitle"><h2 style="margin:0">${o.multiclass?`${d(((h=o.cls)==null?void 0:h.nome)||"")} ${l}`:`Nível ${l}`}</h2>
      <div class="row"><button class="btn small" id="lvldown" aria-label="Diminuir nível">−</button><button class="btn small primary" id="lvlup" aria-label="Subir de nível">+ Nível</button></div></div>
    ${o.multiclass?`<p class="empty-note" style="margin:0">Classe principal (foi ela que deu o 1º dado de vida cheio). Nível total do personagem: ${o.level}.</p>`:""}
    ${s.length?`<div><label for="subclass">Subclasse${l<3?" (a partir do nível 3)":""}</label>
      <select id="subclass" ${l<3?"disabled":""}><option value="">—</option>${s.map(u=>`<option value="${u.id}" ${u.id===p.subclassId?"selected":""}>${d(u.nome)}</option>`).join("")}</select></div>`:""}
    <div class="stats">
      <div><b>${I(o.pb)}</b><small>Proficiência</small></div>
      <div><b>${I(o.initiative)}</b><small>Iniciativa</small></div>
      <div><b>${d(o.speed.replace(" metros"," m"))}</b><small>Deslocamento</small></div>
      <div><b>${o.passivePerception}</b><small>Perc. passiva</small></div>
    </div>
    ${o.armor?`<div class="row"><label for="acbonus" style="margin:0">Bônus extra de CA</label>
      <input id="acbonus" type="number" inputmode="numeric" style="width:6rem" value="${Number(e.build.acBonus)||0}" /></div>
    <p class="empty-note" style="margin:0">Classe de Armadura <b>${o.ac}</b>, calculada sozinha: ${d(o.acDetalhe)}. Use o bônus extra para itens mágicos, estilo de luta Defesa etc. (Sem armadura/escudo equipado, vale o número digitado à mão.)</p>`:`<div class="row"><label for="ac" style="margin:0">Classe de Armadura</label>
      <input id="ac" type="number" inputmode="numeric" style="width:6rem" value="${e.build.ac??10}" /></div>`}
    <div class="row"><label for="hpmax" style="margin:0">PV Máximo</label>
      <input id="hpmax" type="number" inputmode="numeric" min="1" style="width:6rem" value="${e.state.hp.max}" /></div>
    <p class="empty-note" style="margin:0">O PV máximo pode ser ajustado à mão — use o valor rolado no dado com o Mestre. Ao subir de nível, o app só soma o ganho médio da regra a esse valor.</p>
  </section>

  ${Wa(e,o,a)}

  <section class="card stack"><h2>Atributos e Salvaguardas</h2>
    <p class="empty-note">Toque em <b>Salvaguarda</b> para marcar/desmarcar proficiência.</p>
    <div class="abil2">${B.map(([u,f])=>{const m=(e.build.saveProfs||[]).includes(u);return`<div class="abcard">
        <small>${f}</small><b>${I(o.mods[u])}</b>
        <input class="abscore" data-score="${u}" type="number" inputmode="numeric" min="1" max="30" value="${e.build.abilities[u]}" aria-label="Valor de ${f}" />
        <button class="savebtn ${m?"on":""}" data-save="${u}" aria-pressed="${m}">
          <span class="dot ${m?"on":""}"></span>Salvaguarda <b>${I(o.saves[u])}</b></button>
      </div>`}).join("")}</div>
  </section>

  <section class="card"><h2>Perícias</h2><p class="empty-note">Toque para alternar: sem proficiência → proficiente (●) → especialista (◆).</p>
    <div class="skills">${o.skills.map(u=>`<button data-skill="${u.id}" aria-pressed="${u.prof||u.exp}">
      <span class="row" style="flex-wrap:nowrap"><span class="dot ${u.exp?"exp":u.prof?"on":""}"></span>${u.nome} <small class="muted">(${u.ab.toUpperCase()})</small></span><b>${I(u.bonus)}</b></button>`).join("")}</div>
  </section>

  <section class="card stack"><h2>Treinamento e Proficiências</h2>
    ${[["armaduras","Treinamento com Armaduras"],["armas","Proficiência com Armas"],["ferramentas","Proficiência com Ferramentas"],["idiomas","Idiomas"]].map(([u,f])=>`<div><label for="tr-${u}">${f}</label><textarea id="tr-${u}" data-train="${u}" rows="2">${d(t[u]||"")}</textarea></div>`).join("")}
  </section>

  <section class="card stack"><h2>Anotações</h2>
    <textarea id="notes" rows="5" placeholder="Aliados, pistas, história…">${d(e.notes)}</textarea></section>

  <section class="card stack"><h2>Mesa</h2>
    ${e.campaignId?`<p style="margin:0">Jogando em <b>${d(e.campaignName)}</b>. O Mestre dessa mesa pode ver e alterar esta ficha.</p>
         <button class="btn" id="leave-table">Sair da mesa</button>`:`<p class="muted" style="margin:0">Esta ficha não está em nenhuma mesa. Só você pode vê-la.</p>
         <form class="row" id="join"><input id="code" class="grow" autocomplete="off" autocapitalize="characters" placeholder="Código (ABC-123)" aria-label="Código da mesa" required style="width:auto" />
         <button class="btn primary">Entrar</button></form>`}
  </section>
  <section class="card stack"><h2>Conta</h2>
    <div class="row">${a.accountChip(c.user)}</div>
    <button class="btn danger small" id="delete">Apagar personagem</button>
  </section>`}let $a={};const O=(e,o,a=600)=>{clearTimeout($a[e]),$a[e]=setTimeout(o,a)};function Xa(e,o,a){const c=a.S,l=a.app,p=e.build.classes[0].level;v("#lvlup").onclick=()=>o.level<20&&a.save(J(e,c.comp,p+1)).then(()=>a.toast(`Nível ${p+1}! PV máximo, Dados de Vida e espaços atualizados.`)),v("#lvldown").onclick=()=>p>1&&a.save(J(e,c.comp,p-1)),v("#subclass")&&(v("#subclass").onchange=s=>a.save(J(e,c.comp,p,s.target.value||null))),Ya(e,o,a),v("#ac")&&(v("#ac").onchange=s=>a.save({"build.ac":Number(s.target.value)||10})),v("#acbonus")&&(v("#acbonus").onchange=s=>a.save({"build.acBonus":Number(s.target.value)||0})),v("#hpmax").onchange=s=>{const t=Math.max(1,Number(s.target.value)||1);a.save({"state.hp":{...e.state.hp,max:t,current:Math.min(e.state.hp.current,t)}})},l.querySelectorAll("[data-score]").forEach(s=>s.onchange=()=>{const t=Math.max(1,Math.min(30,Number(s.value)||10)),n=s.dataset.score,h={[`build.abilities.${n}`]:t};n==="con"&&(h["state.hp"]={...e.state.hp,...ja(e,c.comp,t)}),a.save(h)}),l.querySelectorAll("[data-save]").forEach(s=>s.onclick=()=>{const t=s.dataset.save,n=e.build.saveProfs||[];a.save({"build.saveProfs":n.includes(t)?n.filter(h=>h!==t):[...n,t]})}),l.querySelectorAll("[data-skill]").forEach(s=>s.onclick=()=>{const t=s.dataset.skill,n=e.build.skillProfs||[],h=e.build.expertise||[];h.includes(t)?a.save({"build.expertise":h.filter(u=>u!==t),"build.skillProfs":n.filter(u=>u!==t)}):n.includes(t)?a.save({"build.expertise":[...h,t]}):a.save({"build.skillProfs":[...n,t]})}),l.querySelectorAll("[data-train]").forEach(s=>s.oninput=()=>O("tr"+s.dataset.train,()=>a.save({[`build.training.${s.dataset.train}`]:s.value}))),v("#notes").oninput=s=>O("notes",()=>a.save({notes:s.target.value})),a.bindLogout(c.be,l),v("#join")&&(v("#join").onsubmit=async s=>{s.preventDefault();try{const t=await c.be.joinByCode(v("#code").value);await c.be.updateCharacter(c.chId,{campaignId:t.id,campaignName:t.name}),a.toast(`${e.name} entrou na mesa ${t.name}.`)}catch(t){a.toast(t.message)}}),v("#leave-table")&&(v("#leave-table").onclick=()=>{a.confirmTwice("#leave-table","Toque de novo para confirmar")&&a.save({campaignId:null,campaignName:null})}),v("#delete").onclick=async()=>{if(!a.confirmTwice("#delete",`Toque de novo para apagar ${e.name}`))return;const s=c.chId;await c.be.deleteCharacter(s),a.showHome()}}function Za(e,o,a){const c=a.S,l=c.comp,p=c.ui,s=new Set(o.bonusSpells||[]),t=(e.build.spellsKnown||[]).filter(r=>!s.has(r)),n=e.build.spellsPrepared||[],h=[...s].map(r=>l.byId.spells[r]).filter(Boolean).sort((r,S)=>r.nivel-S.nivel||r.nome.localeCompare(S.nome)),u=Object.entries(e.state.spellSlots||{}),f=Object.entries(e.state.pactSlots||{}),m=[...u,...f].reduce((r,[S,j])=>j.max>0?Math.max(r,Number(S)):r,0),w=o.casters.length>0,A=t.map(r=>l.byId.spells[r]).filter(Boolean).sort((r,S)=>r.nivel-S.nivel||r.nome.localeCompare(S.nome)),b={};A.forEach(r=>{var S;return(b[S=r.nivel]||(b[S]=[])).push(r)});const g=e.build.classes.map(r=>r.classId),k=o.classesInfo.map(r=>{var S;return(S=r.cls)==null?void 0:S.nome}).filter(Boolean).join(" + "),y=o.spellCaps||{},q=A.filter(r=>r.nivel===0).length,i=A.filter(r=>r.nivel>0).length,C=n.length,z=y.cantrips!==null&&q>=y.cantrips,qa=y.known!==null&&i>=y.known,Aa=y.prepared!==null&&C>=y.prepared,la=P(p.spellQ);let U=l.spells.filter(r=>!t.includes(r.id)&&!s.has(r.id)&&(!p.spellMine||!o.casters.length||r.classes.some(S=>g.includes(S)))&&(p.spellLvl==="all"||String(r.nivel)===p.spellLvl)&&(!la||P(r.nome).includes(la)));const ia=U.length;U=U.slice(0,V);const Ca=r=>(r.nivel===0?z:qa)?`<button class="btn small" data-learnfull="${r.nivel===0?"truque":"magia"}" aria-label="Limite atingido">+</button>`:ta("data-learn",r.id,"Adicionar "+d(r.nome)),Ea=r=>{const S=n.includes(r.id);return!S&&Aa?'<button class="btn small" data-prepfull="1" aria-label="Limite de magias preparadas atingido">Preparar</button>':`<button class="btn small" data-prep="${r.id}">${S?"✓ Preparada":"Preparar"}</button>`},ca=r=>L[r]?(e.state.effects||[]).some(S=>S.id===r)?'<span class="chip">Efeito ativo</span>':`<button class="btn small" data-fx="${r}">Ativar efeito (CA/desloc.)</button>`:"",ra=(r,S)=>`
    <div class="muted" style="font-size:.85rem">${d(r.escola)} · ${d(r.tempo)} · ${d(r.alcance)}<br>${d(r.componentes)} · ${d(r.duracao)}</div>
    ${M(r.desc)}
    <div class="row">${S?`${r.nivel>0?Ea(r):""}
         ${r.concentracao?`<button class="btn small" data-conc="${r.id}">${e.state.concentration===r.id?"Encerrar concentração":"Concentrar"}</button>`:""}
         ${ca(r.id)}
         <button class="btn small" data-forget="${r.id}">Remover</button>`:""}</div>`,W=r=>[r.concentracao?"C":"",r.ritual?"R":""].filter(Boolean).map(S=>`<span class="chip">${S}</span>`).join(" "),Y=(r,S,j)=>j===null?"":`<span class="lvl-badge">${S}/${j} ${r}</span>`,xa=r=>`
    <div class="muted" style="font-size:.85rem">${d(r.escola)} · ${d(r.tempo)} · ${d(r.alcance)}<br>${d(r.componentes)} · ${d(r.duracao)}</div>
    ${M(r.desc)}
    ${r.concentracao||L[r.id]?`<div class="row">${r.concentracao?`<button class="btn small" data-conc="${r.id}">${e.state.concentration===r.id?"Encerrar concentração":"Concentrar"}</button>`:""}${ca(r.id)}</div>`:""}`;return`
  ${o.casters.length?`<section class="card stack">${o.casters.map(r=>`<div class="stats" style="grid-template-columns:repeat(3,1fr)">
    <div><b>${r.dc}</b><small>CD (${d(r.nome)})</small></div><div><b>${I(r.atk)}</b><small>Ataque mágico</small></div>
    <div><b>${wa[r.atributoConjuracao].slice(0,3)}</b><small>Atributo</small></div></div>`).join("")}</section>`:""}
  ${u.length?`<section class="card slots"><h2>Espaços de magia${o.multiclass?" (combinados)":""}</h2>
    ${u.map(([r,S])=>`<div class="lvl"><span>${r}º</span>${Array.from({length:S.max},(j,T)=>`<button class="slotpip ${T<S.used?"used":""}" data-slot="${r}" data-i="${T}" aria-label="Espaço de ${r}º círculo ${T+1}${T<S.used?", gasto":""}"></button>`).join("")}</div>`).join("")}
  </section>`:""}
  ${f.length?`<section class="card slots"><h2>Magia de Pacto</h2>
    ${f.map(([r,S])=>`<div class="lvl"><span>${r}º</span>${Array.from({length:S.max},(j,T)=>`<button class="slotpip ${T<S.used?"used":""}" data-pactslot="${r}" data-i="${T}" aria-label="Espaço de pacto ${T+1}${T<S.used?", gasto":""}"></button>`).join("")}</div>`).join("")}
  </section>`:""}
  ${h.length?`<section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Magias da Subclasse</h2><span class="lvl-badge">sempre preparadas</span></div>
    <p class="empty-note" style="margin:0">Concedidas automaticamente pela subclasse — não contam no limite de magias conhecidas/preparadas, mas ainda gastam um espaço de magia ao conjurar.</p>
    <div class="stack">${h.map(r=>N(`${d(r.nome)} ${W(r)}`,Q(r.nivel),xa(r),!1,`data-k="b-${r.id}"`)).join("")}</div>
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
        <textarea id="extra-note" rows="2" placeholder="Ex.: aprendeu com um pergaminho encontrado na masmorra">${d(e.build.extraSpellsNote||"")}</textarea></div>
    </div></details>
  </section>`:""}
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Minhas magias</h2><span class="lvl-badge">${n.length} preparada(s)</span></div>
    ${Object.keys(b).length?Object.entries(b).map(([r,S])=>`<h3 style="margin:.6rem 0 .2rem;color:var(--muted)">${Q(Number(r))}</h3>
      <div class="stack" style="--gap:.4rem">${S.map(j=>N(`${j.nivel>0&&n.includes(j.id)?"✓ ":""}${d(j.nome)} ${W(j)}`,Q(j.nivel),ra(j,!0),!1,`data-k="m-${j.id}"`)).join("")}</div>`).join(""):'<p class="empty-note">Nenhuma magia ainda. Adicione pela biblioteca abaixo.</p>'}
  </section>
  <section class="card stack"><h2>Biblioteca de magias</h2>
    <input id="spellq" type="search" placeholder="Buscar magia pelo nome…" value="${d(p.spellQ)}" aria-label="Buscar magia" />
    <div class="filters">${["all","0","1","2","3","4","5","6","7","8","9"].map(r=>{const S=r==="all"||(r==="0"?w:w&&Number(r)<=m);return`<button data-flvl="${r}" aria-pressed="${p.spellLvl===r}" class="${S?"":"unavail"}" ${S?"":'title="Ainda não disponível no seu nível"'}>${r==="all"?"Todas":r==="0"?"Truques":r+"º"}</button>`}).join("")}</div>
    ${w?`<p class="empty-note" style="margin:0">Seu nível permite conjurar ${m===0?"só truques":`truques e magias até ${m}º círculo`}. Os demais círculos aparecem esmaecidos até você subir de nível.</p>`:""}
    ${k?`<label class="chk"><input type="checkbox" id="spellmine" ${p.spellMine?"checked":""}> Só a lista de ${d(k)}</label>`:""}
    <p class="empty-note">${ia} magia(s)${ia>V?` — mostrando ${V}, refine a busca`:""}.</p>
    <div class="stack">${U.map(r=>N(`${d(r.nome)} ${W(r)}`,Q(r.nivel),ra(r,!1),!1,`data-k="l-${r.id}"`,Ca(r))).join("")}</div>
  </section>`}function ae(e,o,a){const c=a.S,l=a.app,p=c.ui;l.querySelectorAll("[data-slot]").forEach(s=>s.onclick=()=>{const t=s.dataset.slot,n=Number(s.dataset.i),h=e.state.spellSlots[t];a.save({[`state.spellSlots.${t}.used`]:n<h.used?n:n+1})}),l.querySelectorAll("[data-pactslot]").forEach(s=>s.onclick=()=>{const t=s.dataset.pactslot,n=Number(s.dataset.i),h=e.state.pactSlots[t];a.save({[`state.pactSlots.${t}.used`]:n<h.used?n:n+1})}),v("#spellq").oninput=s=>{p.spellQ=s.target.value,O("sq",a.render,250)},l.querySelectorAll("[data-flvl]").forEach(s=>s.onclick=()=>{p.spellLvl=s.dataset.flvl,a.render()}),v("#spellmine")&&(v("#spellmine").onchange=s=>{p.spellMine=s.target.checked,a.render()}),l.querySelectorAll("[data-learn]").forEach(s=>s.onclick=()=>a.save({"build.spellsKnown":[...e.build.spellsKnown||[],s.dataset.learn]})),l.querySelectorAll("[data-learnfull]").forEach(s=>s.onclick=()=>E(`Limite de ${s.dataset.learnfull==="truque"?"truques conhecidos":"magias conhecidas"} atingido. Use a exceção manual acima se for o caso.`)),l.querySelectorAll("[data-forget]").forEach(s=>s.onclick=()=>a.save({"build.spellsKnown":(e.build.spellsKnown||[]).filter(t=>t!==s.dataset.forget),"build.spellsPrepared":(e.build.spellsPrepared||[]).filter(t=>t!==s.dataset.forget)})),l.querySelectorAll("[data-prep]").forEach(s=>s.onclick=()=>{const t=e.build.spellsPrepared||[],n=s.dataset.prep;a.save({"build.spellsPrepared":t.includes(n)?t.filter(h=>h!==n):[...t,n]})}),l.querySelectorAll("[data-prepfull]").forEach(s=>s.onclick=()=>E("Limite de magias preparadas atingido. Use a exceção manual acima se for o caso.")),v("#extra-cantrips")&&(v("#extra-cantrips").onchange=s=>a.save({"build.extraCantrips":Math.max(0,Number(s.target.value)||0)})),v("#extra-spells")&&(v("#extra-spells").onchange=s=>a.save({"build.extraSpells":Math.max(0,Number(s.target.value)||0)})),v("#extra-invoc")&&(v("#extra-invoc").onchange=s=>a.save({"build.extraInvocations":Math.max(0,Number(s.target.value)||0)})),v("#extra-note")&&(v("#extra-note").oninput=s=>O("extranote",()=>a.save({"build.extraSpellsNote":s.target.value}))),l.querySelectorAll("[data-fx]").forEach(s=>s.onclick=()=>{const t=s.dataset.fx,n=L[t];a.save({"state.effects":[...e.state.effects||[],{uid:Math.random().toString(36).slice(2,10),id:t,nome:n.nome,rounds:n.rounds}]}),E(`${n.nome} ativo — CA/deslocamento ajustados. Veja em Combate › Efeitos ativos.`)}),l.querySelectorAll("[data-conc]").forEach(s=>s.onclick=()=>a.save({"state.concentration":e.state.concentration===s.dataset.conc?null:s.dataset.conc})),G(l,"spells")}const Z={};function G(e,o){e.querySelectorAll("summary .addbtn").forEach(c=>c.addEventListener("click",l=>l.preventDefault()));const a=Z[o]||(Z[o]=new Set);e.querySelectorAll("details.entry").forEach((c,l)=>{var s;const p=c.dataset.k||((s=c.querySelector("summary .t"))==null?void 0:s.textContent)||l;a.has(p)&&(c.open=!0),c.addEventListener("toggle",()=>c.open?a.add(p):a.delete(p))})}function ee(e,o,a,c){var A;const{cls:l,sub:p,level:s,classId:t}=o;if(!l)return`<section class="card">Classe "${d(t)}" não encontrada no compêndio.</section>`;const n=l.nome,h=l.caracteristicas||[],u=h.filter(b=>b.nivel<=s),f=h.filter(b=>b.nivel>s),m=e.build.opcoes||[],w=t==="bruxo"?((A=a.spellCaps)==null?void 0:A.invocacoes)??null:null;return`
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Características de ${d(n)}</h2><span class="lvl-badge">nível ${s}</span></div>
    ${u.length?u.map(b=>N(d(b.nome),`Nível ${b.nivel}`,M(b.desc))).join(""):'<p class="empty-note">Importe o compêndio completo para ver as características.</p>'}
    ${f.length?`<details class="entry"><summary><span class="t muted">Próximos níveis (${f.length})</span></summary><div class="body stack">
      ${f.map(b=>N(d(b.nome),`Nível ${b.nivel}`,M(b.desc))).join("")}</div></details>`:""}
  </section>
  ${(l.opcoes||[]).map(b=>{const g=t==="bruxo"&&/Invoca/i.test(b.titulo),k=g?b.itens.filter(q=>m.includes(q.id)).length:null,y=g&&w!==null&&k>=w;return`<section class="card stack"><div class="sectiontitle"><h2 style="margin:0">${d(b.titulo.replace("Opções de ",""))} (${d(n)})</h2>${g&&w!==null?`<span class="lvl-badge">${k}/${w}</span>`:""}</div>
    ${b.itens.filter(q=>m.includes(q.id)).map(q=>N("✓ "+d(q.nome),"",M(q.desc)+`<button class="btn small" data-unop="${q.id}">Remover</button>`)).join("")||'<p class="empty-note">Nenhuma escolhida.</p>'}
    <details class="entry"><summary><span class="t">Escolher ${d(b.titulo.replace("Opções de ","").toLowerCase())}</span><span class="lvl-badge">${b.itens.length}</span></summary><div class="body stack">
      ${b.itens.filter(q=>!m.includes(q.id)).map(q=>N(d(q.nome),"",M(q.desc),!1,`data-k="o-${t}-${q.id}"`,y?'<button class="btn small" data-opfull="1" aria-label="Limite de invocações atingido">+</button>':ta("data-op",q.id,"Escolher "+d(q.nome)))).join("")}
    </div></details></section>`}).join("")}
  <section class="card stack"><h2>Subclasse de ${d(n)}${p?": "+d(p.nome):""}</h2>
    ${p?(p.caracteristicas||[]).map(b=>N(`${b.nivel>s?"🔒 ":""}${d(b.nome)}`,`Nível ${b.nivel}`,M(b.desc))).join(""):`<p class="empty-note">${s<3?"A subclasse é escolhida no nível 3.":"Escolha a subclasse na aba Ficha (ou em Multiclasse, para uma classe secundária)."}</p>
         ${(l.subclasses||[]).map(b=>N(d(b.nome),"",M(b.intro))).join("")}`}
  </section>`}function se(e,o,a){const c=o.sp,l=o.bg,p=o.speciesLabel||(c==null?void 0:c.nome)||"espécie";return`
  ${o.classesInfo.map(s=>ee(e,s,o)).join("")}
  <section class="card stack"><h2>Traços de ${d(p)}</h2>
    ${c&&p!==c.nome?`<p class="empty-note" style="margin:0">Usa as regras de ${d(c.nome)}.</p>`:""}
    <p class="empty-note">${d((c==null?void 0:c.tipo)||"")} · ${d((c==null?void 0:c.tamanho)||"")} · Deslocamento ${d((c==null?void 0:c.deslocamento)||"")}</p>
    ${((c==null?void 0:c.tracos)||[]).filter(s=>s.nome!=="Detalhes").map(s=>N(d(s.nome),"",M(s.desc))).join("")||'<p class="empty-note">Sem traços no compêndio.</p>'}
  </section>
  ${l?`<section class="card stack"><h2>Antecedente: ${d(l.nome)}</h2>
    <p style="margin:0;font-size:.92rem"><b>Atributos:</b> ${l.atributos.map(s=>wa[s]).join(", ")}<br>
    <b>Talento:</b> ${d(l.talento)}<br><b>Ferramenta:</b> ${d(l.ferramenta)}<br><b>Equipamento:</b> ${d(l.equipamento)}</p></section>`:""}
`}function te(e,o,a){const c=a.app,l=e.build.opcoes||[];c.querySelectorAll("[data-op]").forEach(p=>p.onclick=()=>a.save({"build.opcoes":[...l,p.dataset.op]})),c.querySelectorAll("[data-unop]").forEach(p=>p.onclick=()=>a.save({"build.opcoes":l.filter(s=>s!==p.dataset.unop)})),c.querySelectorAll("[data-opfull]").forEach(p=>p.onclick=()=>E("Limite de invocações místicas atingido. Use a exceção manual na aba Magias se for o caso.")),G(c,"classe")}const ne=["Origem","Geral","Estilo de Luta","Dádiva Épica"];function oe(e,o,a){const c=a.S,l=c.comp,p=c.ui,s=e.build.feats||[],t=P(p.featQ);let n=l.feats.filter(u=>(u.repetivel||!s.some(f=>f.id===u.id))&&(p.featCat==="all"||u.categoria===p.featCat)&&(!t||P(u.nome).includes(t)||P(u.prereq).includes(t)));const h=n.length;return n=n.slice(0,V),`
  <section class="card stack"><h2>Meus talentos</h2>
    ${s.length?s.map((u,f)=>{const m=l.byId.feats[u.id];return N(d((m==null?void 0:m.nome)||u.id),d(u.origem||(m==null?void 0:m.categoria)||""),(m?`<p class="empty-note">${d(m.categoria)}${m.prereq?" · Pré-requisito: "+d(m.prereq):""}</p>${M(m.desc)}`:'<p class="empty-note">Talento fora do compêndio.</p>')+`<button class="btn small" data-unfeat="${f}">Remover</button>`)}).join(""):'<p class="empty-note">Nenhum talento. Seu antecedente concede um talento de Origem.</p>'}
  </section>
  <section class="card stack"><h2>Biblioteca de talentos</h2>
    <input id="featq" type="search" placeholder="Buscar talento…" value="${d(p.featQ)}" aria-label="Buscar talento" />
    <div class="filters">${["all",...ne].map(u=>`<button data-fcat="${u}" aria-pressed="${p.featCat===u}">${u==="all"?"Todos":u}</button>`).join("")}</div>
    <p class="empty-note">${h} talento(s)${h>V?` — mostrando ${V}`:""}.</p>
    ${n.map(u=>N(d(u.nome),d(u.categoria),`${u.prereq?`<p class="empty-note">Pré-requisito: ${d(u.prereq)}</p>`:""}${M(u.desc)}`,!1,`data-k="f-${u.id}"`,ta("data-feat",u.id,"Adicionar "+d(u.nome)))).join("")}
    ${l.feats.length?"":'<p class="empty-note">Importe o compêndio completo para usar a biblioteca de talentos.</p>'}
  </section>`}function le(e,o,a){const c=a.S,l=a.app,p=e.build.feats||[];v("#featq").oninput=s=>{c.ui.featQ=s.target.value,O("fq",a.render,250)},l.querySelectorAll("[data-fcat]").forEach(s=>s.onclick=()=>{c.ui.featCat=s.dataset.fcat,a.render()}),l.querySelectorAll("[data-feat]").forEach(s=>s.onclick=()=>{a.save({"build.feats":[...p,{id:s.dataset.feat,origem:"Escolhido"}]}),a.toast("Talento adicionado. Aplique aumentos de atributo na aba Ficha, se houver.")}),l.querySelectorAll("[data-unfeat]").forEach(s=>s.onclick=()=>a.save({"build.feats":p.filter((t,n)=>n!==Number(s.dataset.unfeat))})),G(l,"feats")}function ie(e,o,a){const c=a.S,l=c.comp,p=c.ui,s=_(e),t=e.coins||{},n=P(p.itemQ),h=n.length>=2?l.items.filter(i=>P(i.nome).includes(n)).slice(0,25):[],u=Math.min(100,Math.round(o.weight/o.carry*100)),f=i=>i.tipo==="arma"?`${d(i.dano)} · ${d(i.propriedades)} · Maestria: ${d(i.maestria)}`:i.tipo==="armadura"?`CA ${d(i.ca)}${i.forca&&i.forca!=="—"?" · "+d(i.forca):""}${i.furtividade==="Desvantagem"?" · Desv. Furtividade":""}`:"",m=i=>i.itemId?l.byId.weapons[i.itemId]||l.byId.armor[i.itemId]||l.byId.gear[i.itemId]:null,w=(i,C)=>/po[çc][aã]o|elixir|antídoto/i.test(i.nome||(C==null?void 0:C.nome)||""),A={arma:"Armas",armadura:"Armaduras",pocao:"Poções"},b=i=>{const C=m(i);return(C==null?void 0:C.tipo)==="arma"?"Armas":(C==null?void 0:C.tipo)==="armadura"?"Armaduras":!C&&A[i.categoria]?A[i.categoria]:w(i,C)?"Poções":"Outros"},g=i=>i.categoria==="arma"&&i.dano?`${d(i.dano)}${i.ranged?" · À distância":""}${i.finesse?" · Acuidade":""}`:i.categoria==="armadura"&&Number(i.ca)?`CA ${i.ca}${i.caDex?` + Destreza${i.caDexMax!=null&&i.caDexMax!==""?` (máx ${i.caDexMax})`:""}`:""}`:"",k=i=>{const C=m(i),z=!C&&g(i);return N(`${i.equipado?"🛡️ ":""}${d(i.nome)}${Number(i.qtd)>1?` <span class="muted">×${i.qtd}</span>`:""}`,d(i.peso||""),`${C?`<p class="empty-note">${f(C)}${C.custo?" · "+d(C.custo):""}</p>${C.desc?M(C.desc):""}`:z?`<p class="empty-note">${z}</p>`:""}
      <div class="row">
        <button class="btn small" data-qty="${i.uid}" data-d="-1">−</button><b>${i.qtd}</b><button class="btn small" data-qty="${i.uid}" data-d="1">+</button>
        <label class="chk"><input type="checkbox" data-equip="${i.uid}" ${i.equipado?"checked":""}> Equipado</label>
        <label class="chk"><input type="checkbox" data-attune="${i.uid}" ${i.sintonizado?"checked":""}> Sintonizado</label>
      </div>
      <input data-inote="${i.uid}" id="inote-${i.uid}" value="${d(i.notas||"")}" placeholder="Notas (cargas, efeitos…)" aria-label="Notas do item" />
      <button class="btn small danger" data-rmitem="${i.uid}">Remover item</button>`,!1,`data-k="i-${i.uid}"`)},y=["Armas","Armaduras","Poções","Outros"],q=Object.fromEntries(y.map(i=>[i,s.filter(C=>b(C)===i)]));return`
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Bolsa de moedas</h2><span class="lvl-badge">≈ ${o.coinsGP.toLocaleString("pt-BR",{maximumFractionDigits:2})} PO</span></div>
    <div class="coins">${da.map(([i,C,z])=>`<label class="coin coin-${i}"><span>${C}</span>
      <input type="number" inputmode="numeric" min="0" data-coin="${i}" value="${Number(t[i])||0}" aria-label="${z}" /></label>`).join("")}</div>
    <form class="row" id="coinop">
      <input id="coinamt" type="number" inputmode="numeric" min="1" placeholder="Qtd." style="width:5.5rem" aria-label="Quantidade" />
      <select id="coinkind" style="width:5.5rem" aria-label="Moeda">${da.map(([i,C])=>`<option value="${i}" ${i==="po"?"selected":""}>${C}</option>`).join("")}</select>
      <button class="btn heal small" data-cop="+">Receber</button><button class="btn danger small" data-cop="-">Gastar</button>
    </form>
  </section>
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Inventário</h2><span class="lvl-badge">${o.weight.toLocaleString("pt-BR",{maximumFractionDigits:1})} / ${o.carry} kg</span></div>
    <div class="hpbar" aria-hidden="true"><div class="cur ${u>100?"low":u>75?"mid":""}" style="width:${u}%"></div></div>
    ${s.length?y.filter(i=>q[i].length).map(i=>`
      <div class="inv-divider"><span>${i}</span><span class="muted">${q[i].length}</span></div>
      ${q[i].map(k).join("")}`).join(""):'<p class="empty-note">Inventário vazio.</p>'}
  </section>
  <section class="card stack"><h2>Adicionar item</h2>
    <input id="itemq" type="search" placeholder="Buscar armas, armaduras, equipamento… (2+ letras)" value="${d(p.itemQ)}" aria-label="Buscar item" />
    ${h.map(i=>`<div class="libitem"><div class="info"><b>${d(i.nome)}</b><small>${d(i.custo||"")}${i.peso?" · "+d(i.peso):""} ${f(i)?"· "+f(i):""}</small></div>
      <button class="btn small primary" data-additem="${i.id}">+</button></div>`).join("")}
    ${n.length>=2&&!h.length?'<p class="empty-note">Nada encontrado — crie um item personalizado abaixo.</p>':""}
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
  </section>`}function ce(e,o,a){const c=a.S,l=a.app,p=c.comp,s=_(e),t={pc:0,pp:0,pe:0,po:0,pl:0,...e.coins||{}},n=f=>a.save({inventory:f});l.querySelectorAll("[data-coin]").forEach(f=>f.onchange=()=>a.save({coins:{...t,[f.dataset.coin]:Math.max(0,Number(f.value)||0)}})),l.querySelectorAll("[data-cop]").forEach(f=>f.onclick=m=>{m.preventDefault();const w=Number(v("#coinamt").value),A=v("#coinkind").value;if(!w)return a.toast("Digite a quantidade.");const b=t[A]+(f.dataset.cop==="+"?w:-w);if(b<0)return a.toast(`Não há ${w} ${A.toUpperCase()} suficientes.`);a.save({coins:{...t,[A]:b}})}),v("#itemq").oninput=f=>{c.ui.itemQ=f.target.value,O("iq",a.render,250)},l.querySelectorAll("[data-additem]").forEach(f=>f.onclick=()=>{const m=p.items.find(A=>A.id===f.dataset.additem),w=s.find(A=>A.itemId===m.id);n(w?s.map(A=>A===w?{...A,qtd:Number(A.qtd)+1}:A):[...s,{uid:fa(),itemId:m.id,nome:m.nome,qtd:1,peso:m.peso||"",equipado:!1,sintonizado:!1,notas:""}]),a.toast(`${m.nome} adicionado.`)});const h=()=>{const f=v("#ccat").value;v("#c-arma-fields").style.display=f==="arma"?"":"none",v("#c-armadura-fields").style.display=f==="armadura"?"":"none"};v("#ccat").onchange=h,h(),v("#custom").onsubmit=f=>{f.preventDefault();const m=v("#cname").value.trim();if(!m)return;const w=v("#cweight").value.trim(),A=Math.max(1,Number(v("#cqty").value)||1),b=v("#ccat").value,g={uid:fa(),itemId:null,nome:m,categoria:b,qtd:A,peso:w?`${w} kg`:"",equipado:!1,sintonizado:!1,notas:v("#cdetail").value.trim()};if(b==="arma"){const k=v("#cdano").value.trim();k&&(g.dano=k),g.ranged=v("#cranged").checked,g.finesse=v("#cfinesse").checked}else if(b==="armadura"){const k=Number(v("#ccabase").value);k&&(g.ca=k),g.caDex=v("#ccadex").checked;const y=v("#ccadexmax").value.trim();y&&(g.caDexMax=Number(y))}n([...s,g]),a.toast(`${m} adicionado.`)};const u=(f,m)=>n(s.map(w=>w.uid===f?m(w):w));l.querySelectorAll("[data-qty]").forEach(f=>f.onclick=()=>u(f.dataset.qty,m=>({...m,qtd:Math.max(0,Number(m.qtd)+Number(f.dataset.d))}))),l.querySelectorAll("[data-equip]").forEach(f=>f.onchange=()=>u(f.dataset.equip,m=>({...m,equipado:f.checked}))),l.querySelectorAll("[data-attune]").forEach(f=>f.onchange=()=>{if(f.checked&&s.filter(m=>m.sintonizado).length>=3)return f.checked=!1,a.toast("Limite de 3 itens sintonizados.");u(f.dataset.attune,m=>({...m,sintonizado:f.checked}))}),l.querySelectorAll("[data-inote]").forEach(f=>f.oninput=()=>O("in"+f.dataset.inote,()=>u(f.dataset.inote,m=>({...m,notas:f.value})))),l.querySelectorAll("[data-rmitem]").forEach(f=>f.onclick=()=>n(s.filter(m=>m.uid!==f.dataset.rmitem))),G(l,"itens")}function re(e,o,a){const c=a.S.maps||[];return e.campaignId?`<section class="card stack"><h2>🗺️ Mapas da mesa</h2>
    ${c.length?c.map(l=>`<button class="mapv-row" data-mapopen="${d(l.id)}"><span class="mapv-ico">🗺️</span><span><b>${d(l.nome)}</b><br><small class="muted">Toque para abrir · suas marcações são privadas</small></span></button>`).join(""):'<p class="empty-note">O Mestre ainda não compartilhou nenhum mapa.</p>'}
  </section>`:'<div class="card"><p style="margin:0">Entre numa mesa (aba <b>Ficha → Mesa</b>) para ver os mapas que o Mestre compartilhar.</p></div>'}function de(e,o,a){a.app.querySelectorAll("[data-mapopen]").forEach(c=>c.onclick=()=>{const l=(a.S.maps||[]).find(p=>p.id===c.dataset.mapopen);l&&Ia({be:a.S.be,cid:e.campaignId,map:l})})}const ue={mapas:{html:re,bind:de},ficha:{html:Ja,bind:Xa},magias:{html:Za,bind:ae},classe:{html:se,bind:te},talentos:{html:oe,bind:le},itens:{html:ie,bind:ce}},x=v("#app"),$={be:null,comp:null,user:null,chId:null,ch:null,tab:"combate",amount:"",off:[],prevHp:null,maps:[],mapsCid:null,offMaps:null,ui:{spellQ:"",spellLvl:"all",spellMine:!0,featQ:"",featCat:"all",itemQ:"",libOpen:{}}};function aa(e){if(!$.ch||!e)return;const o=structuredClone($.ch);Object.entries(e).forEach(([a,c])=>Ga(o,a,c)),$.ch=o,R()}const na=()=>`rpgmesa:last:${$.user.uid}`,K=()=>{var e;$.off.forEach(o=>o()),$.off=[],(e=$.offMaps)==null||e.call($),$.offMaps=null,$.mapsCid=null,$.maps=[],Ka()};function me(e){var o;(e||null)!==$.mapsCid&&((o=$.offMaps)==null||o.call($),$.offMaps=null,$.maps=[],$.mapsCid=e||null,e&&($.offMaps=$.be.watchMaps(e,!1,a=>{$.maps=a,$.ch&&R()})))}const ha=Object.fromEntries(Ta.map(([e,o])=>[e,o])),ea=Object.fromEntries(B);pe().catch(e=>{x.innerHTML=`<div class="wrap"><div class="card">Erro ao iniciar: ${d(e.message)}</div></div>`});async function pe(){$.be=await Ba(),Pa($.be,x,{title:"Grimório do Aventureiro",subtitle:"Entre com sua conta para acessar seus personagens em qualquer aparelho.",onSignedOut:()=>{K(),$.ch=null,$.chId=null,$.prevHp=null}},async e=>{$.user=e,x.innerHTML='<p class="muted" style="padding:1rem">Carregando compêndio…</p>',$.comp=await La($.be);const o=sa.get(na());o?oa(o):F()})}const ka=()=>$.be.mode==="local"?'<p class="banner">Modo demo: os dados ficam neste navegador. Abra o Escudo em outra aba para testar a sincronização.</p>':"",be=()=>$.comp.completo?"":'<p class="banner">Biblioteca reduzida: o Mestre ainda não importou o compêndio completo no Escudo.</p>';function F(){K(),$.chId=null,$.ch=null,sa.set(na(),null);let e=!1;$.off.push($.be.watchMyCharacters(o=>{v("#build")||(o.sort((a,c)=>a.name.localeCompare(c.name)),x.innerHTML=`<header class="top"><div class="row"><div class="grow name">Meus personagens</div>
      <a class="btn small" href="./escudo.html" title="Ir para o Escudo do Mestre">🛡️ Escudo</a>${ga($.user)}</div></header>
    <main class="wrap stack">${ka()}${be()}
      ${o.map(a=>`<button class="charbtn" data-open="${a.id}">
        <span><b>${d(a.name)}</b><br><small class="muted">${d(Sa(a))}</small></span>
        <span class="chip">${a.campaignName?"🎲 "+d(a.campaignName):"Sem mesa"}</span></button>`).join("")}
      ${o.length?"":'<div class="card"><p style="margin:0">Você ainda não tem personagens. Crie o primeiro abaixo — ele fica salvo na sua conta.</p></div>'}
      <button class="btn primary" id="newchar" style="width:100%">+ Novo personagem</button>
    </main>`,ya($.be,x),x.querySelectorAll("[data-open]").forEach(a=>a.onclick=()=>oa(a.dataset.open)),v("#newchar").onclick=()=>ve(),!o.length&&!e&&(e=!0))}))}function ve(){K();const e=$.comp,o=[15,14,13,12,10,8];x.innerHTML=`<header class="top"><div class="row"><button class="btn small" id="back" aria-label="Voltar">◀</button><div class="grow name">Novo personagem</div></div></header>
  <main class="wrap stack">
  <form class="stack" id="build">
    <section class="card stack">
      <div><label for="name">Nome</label><input id="name" name="name" required maxlength="40" /></div>
      <div class="row">
        <div class="grow"><label for="species">Espécie</label><select id="species" name="species">
          ${e.species.map(b=>`<option value="${b.id}">${d(b.nome)}</option>`).join("")}</select></div>
        <div style="width:5.5rem"><label for="level">Nível</label><input id="level" name="level" type="number" inputmode="numeric" min="1" max="20" value="1" /></div>
      </div>
      <div><label for="class">Classe</label><select id="class" name="class">
        ${e.classes.map(b=>`<option value="${b.id}">${d(b.nome)}</option>`).join("")}</select></div>
      <div id="classinfo"></div>
    </section>
    ${e.backgrounds.length?`<section class="card stack">
      <div><label for="bg">Antecedente</label><select id="bg" name="bg">
        ${e.backgrounds.map(b=>`<option value="${b.id}">${d(b.nome)}</option>`).join("")}</select></div>
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
  </form></main>`,v("#back").onclick=F;const a=v("#build"),c=()=>e.byId.classes[a.class.value],l=()=>{var b,g;return(g=e.byId.backgrounds)==null?void 0:g[(b=a.bg)==null?void 0:b.value]};function p(){var k;const b=c(),g=(k=b.periciasOpcoes)!=null&&k.length?b.periciasOpcoes:[];v("#classinfo").innerHTML=`
      <p class="muted" style="margin:.2rem 0;font-size:.88rem">Dado de Vida d${b.dadoVida} · Salvaguardas: ${(b.salvaguardas||[]).map(y=>ea[y]).join(", ")}</p>
      ${g.length?`<div><label>Perícias da classe — escolha ${b.periciasEscolha} <span id="skcount"></span></label>
        <div class="checks">${g.map(y=>`<label class="chk"><input type="checkbox" name="sk" value="${y}"> ${ha[y]}</label>`).join("")}</div></div>`:""}`,a.querySelectorAll("[name=sk]").forEach(y=>y.onchange=s),s()}function s(){var q;const b=c(),g=((q=l())==null?void 0:q.pericias)||[],k=[...a.querySelectorAll("[name=sk]")];k.forEach(i=>{g.includes(i.value)&&(i.checked=!1,i.disabled=!0,i.parentElement.title="Já vem do antecedente")});const y=k.filter(i=>i.checked).length;k.forEach(i=>{g.includes(i.value)||(i.disabled=!i.checked&&y>=b.periciasEscolha)}),v("#skcount")&&(v("#skcount").textContent=`(${y}/${b.periciasEscolha})`)}function t(){const b=l();if(!b)return;const g=e.byId.feats[b.talentoId];v("#bginfo").innerHTML=`
      <p style="margin:.2rem 0;font-size:.9rem"><b>Perícias:</b> ${b.pericias.map(k=>ha[k]).join(", ")}<br>
      <b>Talento:</b> ${d((g==null?void 0:g.nome)||b.talento)}<br><b>Ferramenta:</b> ${d(b.ferramenta)}</p>
      <div class="row">
        <div class="grow"><label for="plus2">+2 em</label><select id="plus2">${b.atributos.map(k=>`<option value="${k}">${ea[k]}</option>`).join("")}<option value="all">+1 nos três</option></select></div>
        <div class="grow" id="plus1wrap"><label for="plus1">+1 em</label><select id="plus1">${b.atributos.map((k,y)=>`<option value="${k}" ${y===1?"selected":""}>${ea[k]}</option>`).join("")}</select></div>
      </div>
      <details class="entry"><summary><span class="t">Equipamento do antecedente</span></summary><div class="body">${d(b.equipamento)}</div></details>`,v("#plus2").onchange=v("#plus1").onchange=h,h(),s()}function n(){const b=l(),g={};if(!b)return g;const k=v("#plus2").value;if(k==="all")b.atributos.forEach(y=>g[y]=1);else{g[k]=2;const y=v("#plus1").value;y!==k&&(g[y]=(g[y]||0)+1)}return g}function h(){const b=n();v("#plus1wrap")&&(v("#plus1wrap").style.visibility=v("#plus2").value==="all"?"hidden":""),a.querySelectorAll(".abfinal").forEach(g=>{const k=g.dataset.ab,y=Math.min(20,Number(a[k].value)+(b[k]||0));g.textContent=b[k]?`→ ${y} (${I(ba(y))})`:`(${I(ba(y))})`})}const u=27,f={8:0,9:1,10:2,11:3,12:4,13:5,14:7,15:9},m=b=>f[b]??0;let w="array";function A(){const b=w==="buy";if(v("#ab-inputs").innerHTML=B.map(([g,k],y)=>{const q=document.getElementById("ab-"+g),i=q?q.value:b?8:o[y];return`<div><label for="ab-${g}">${k} <b class="abfinal" data-ab="${g}"></b></label>
        <div class="row" style="align-items:center;gap:.4rem;flex-wrap:nowrap">
          ${b?`<button type="button" class="btn small" data-abdown="${g}" aria-label="Diminuir ${k}">−</button>`:""}
          <input id="ab-${g}" name="${g}" type="number" inputmode="numeric" min="${b?8:3}" max="${b?15:20}"
            value="${i}" ${b?'readonly style="width:3.5rem;text-align:center"':""} />
          ${b?`<button type="button" class="btn small" data-abup="${g}" aria-label="Aumentar ${k}">+</button>`:""}
        </div></div>`}).join(""),b){const g=B.reduce((y,[q])=>y+m(Number(a[q].value)),0),k=u-g;v("#abpts").style.display="",v("#abpts").textContent=`${k} de ${u} pontos restantes`,a.querySelectorAll("[data-abup]").forEach(y=>y.onclick=()=>{const q=y.dataset.abup,i=Number(a[q].value);if(!(i>=15)){if(g+(m(i+1)-m(i))>u)return E("Sem pontos suficientes.");a[q].value=i+1,A()}}),a.querySelectorAll("[data-abdown]").forEach(y=>y.onclick=()=>{const q=y.dataset.abdown,i=Number(a[q].value);i<=8||(a[q].value=i-1,A())})}else v("#abpts").style.display="none",B.forEach(([g])=>a[g].oninput=h);h()}x.querySelectorAll("[data-abmode]").forEach(b=>b.onclick=()=>{b.dataset.abmode!==w&&(w=b.dataset.abmode,x.querySelectorAll("[data-abmode]").forEach(g=>g.setAttribute("aria-selected",String(g.dataset.abmode===w))),v("#abmode-help").textContent=w==="buy"?`Compra de pontos: comece com 8 em tudo e gaste os ${u} pontos (custo 9=1, 10=2, 11=3, 12=4, 13=5, 14=7, 15=9). Máximo 15 antes dos bônus do antecedente.`:"Valores base (Array Padrão: 15, 14, 13, 12, 10, 8). Edite livremente, se preferir. O bônus do antecedente é somado automaticamente.",B.forEach(([g],k)=>{const y=document.getElementById("ab-"+g);y&&(y.value=w==="buy"?8:o[k])}),A())}),a.class.onchange=p,a.bg&&(a.bg.onchange=t),p(),t(),A(),a.onsubmit=async b=>{var q;b.preventDefault();const g=n(),k=Object.fromEntries(B.map(([i])=>[i,Math.min(20,Number(a[i].value)+(g[i]||0))])),y=Oa({name:a.name.value.trim(),ownerUid:$.user.uid,speciesId:a.species.value,classId:a.class.value,level:Number(a.level.value),abilities:k,backgroundId:((q=a.bg)==null?void 0:q.value)||null,skillProfs:[...a.querySelectorAll("[name=sk]:checked")].map(i=>i.value)},e);try{oa(await $.be.createCharacter(y))}catch(i){E(i.message)}}}const Sa=e=>`${za(e.build,$.comp)} · ${Ha(e.build,$.comp)}`;function oa(e){K(),$.chId=e,$.prevHp=null,sa.set(na(),e),$.off.push($.be.watchCharacter(e,o=>{if(!o)return F();const a=$.prevHp;if($.prevHp=o.state.hp.current+o.state.hp.temp,$.ch=o,me(o.campaignId),R(),a!=null&&a!==$.prevHp){const c=v("#hpcard");c==null||c.classList.add($.prevHp<a?"flash-dmg":"flash-heal"),navigator.vibrate&&$.prevHp<a&&navigator.vibrate(80)}}))}const fe=[["combate","❤️","Combate"],["ficha","📜","Ficha"],["magias","✨","Magias"],["classe","🛡️","Traços"],["talentos","⭐","Talentos"],["itens","🎒","Itens"],["mapas","🗺️","Mapas"]],D={get S(){return $},app:x,render:()=>R(),save:e=>$.be.updateCharacter($.chId,e).catch(o=>E(o.message)),toast:E,showHome:()=>F(),confirmTwice:$e,accountChip:ga,bindLogout:ya};function R(){if(Va(R))return;const e=$.ch,o=Ra(e,$.comp),a=document.activeElement,c=a==null?void 0:a.id,l=a&&"selectionStart"in a?[a.selectionStart,a.selectionEnd]:null,p=window.scrollY,s={combate:{html:ye,bind:we},...ue},t=s[$.tab]||s.combate;if(x.innerHTML=`
    <header class="top">
      <div class="row"><button class="btn small" id="home" aria-label="Meus personagens">◀</button>
        <div class="grow"><div class="name">${d(e.name)}</div>
        <div class="mini"><span>${d(Sa(e))}</span>${e.campaignName?`<span>🎲 ${d(e.campaignName)}</span>`:""}</div></div>
        <div class="mini"><span>CA <b>${o.ac}</b></span><span>PV <b>${e.state.hp.current}/${e.state.hp.max}</b></span></div>
        <a class="btn small" href="./escudo.html" title="Ir para o Escudo do Mestre">🛡️</a></div>
    </header>
    <main class="wrap stack">${ka()}${t.html(e,o,D)}</main>
    <nav class="tabs" role="tablist">${fe.map(([n,h,u])=>`<button role="tab" aria-selected="${$.tab===n}" data-tab="${n}"><span class="ico" aria-hidden="true">${h}</span>${u}</button>`).join("")}</nav>`,x.querySelectorAll("[data-tab]").forEach(n=>n.onclick=()=>{$.tab=n.dataset.tab,R(),window.scrollTo(0,0)}),v("#home").onclick=F,t.bind(e,o,D),window.scrollTo(0,p),c){const n=document.getElementById(c);if(n&&(n.focus({preventScroll:!0}),l&&"setSelectionRange"in n))try{n.setSelectionRange(...l)}catch{}}}function $e(e,o){const a=v(e);if(a.dataset.armed)return!0;a.dataset.armed="1";const c=a.textContent;return a.textContent=o,setTimeout(()=>{a.isConnected&&(delete a.dataset.armed,a.textContent=c)},3e3),!1}function he(e,o){var s;const a=e.state.effects||[],c=t=>t==null?"até o descanso longo ou encerrar":t===1?"1 rodada restante":`${t} rodadas restantes`,l=Ua(e).filter(([t])=>!a.some(n=>n.id===t)),p=t=>l.filter(([,n])=>n.tipo===t).map(([n,h])=>`<option value="${n}">${d(h.nome)}</option>`).join("");return`<section class="card stack" id="fxcard">
    <div class="sectiontitle"><h2 style="margin:0">Efeitos ativos</h2>
      ${a.some(t=>t.rounds!=null)?'<button class="btn small primary" id="nextround">Próxima rodada ▶</button>':""}</div>
    ${o.fx.lista.length?o.fx.lista.map(t=>{var n;return`<div class="stack" style="gap:.3rem;border:1px solid var(--line);border-radius:10px;padding:.5rem .65rem">
      <div class="sectiontitle"><b>${d(t.nome)}</b><span class="lvl-badge">${c(t.rounds)}</span></div>
      <div class="row">${Qa(t.mods).map(h=>`<span class="chip">${d(h)}</span>`).join("")}${(t.mods.notas||[]).map(h=>`<span class="chip">${d(h)}</span>`).join("")}</div>
      ${(n=L[t.id])!=null&&n.nota?`<div class="muted" style="font-size:.82rem">${d(L[t.id].nota)}</div>`:""}
      <div class="row">${t.rounds!=null?`<button class="btn small" data-fxadj="${t.uid}" data-d="-1">−1 rodada</button><button class="btn small" data-fxadj="${t.uid}" data-d="1">+1 rodada${t.id==="furia"?" (estender)":""}</button>`:""}
        <button class="btn small danger" data-fxend="${t.uid}">Encerrar</button></div></div>`}).join(""):'<p class="empty-note" style="margin:0">Nenhum. Ative uma Fúria, uma magia que muda CA ou deslocamento, ou crie um efeito próprio — CA, deslocamento e resistências se ajustam sozinhos.</p>'}
    ${(s=o.resist)!=null&&s.length?`<p class="muted" style="margin:0;font-size:.85rem">Resistências agora: ${d(o.resist.join(", "))}</p>`:""}
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
  </section>`}function ge(e,o,a){const c=_(e).filter(s=>{var t,n;return s.itemId&&((n=(t=o.byId)==null?void 0:t.weapons)==null?void 0:n[s.itemId])||s.categoria==="arma"}).map(s=>{var t,n;return{it:s,w:s.itemId?(n=(t=o.byId)==null?void 0:t.weapons)==null?void 0:n[s.itemId]:null}});if(!c.length)return`<section class="card stack"><h2>Ataques</h2>
      <p class="muted" style="margin:0">Nenhuma arma no inventário — desarmado: <b>${I(a.pb+a.mods.for)}</b> pra acertar, <b>1${I(a.mods.for)}</b> de dano contundente.</p></section>`;const l=Object.fromEntries(_a(e,o,a).map(s=>[s.uid,s])),p=c.some(({it:s})=>s.equipado);return`<section class="card stack"><h2>Ataques</h2>
    ${c.map(({it:s,w:t})=>{const n=l[s.uid],h=!n&&s.equipado?' <span class="muted">(sem cálculo automático — veja as Notas)</span>':"";return`<div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem">
        <span>${s.equipado?"⚔️ ":""}${d(s.nome||(t==null?void 0:t.nome)||"")}${n?` — <b>${I(n.atk)}</b> pra acertar · <b>${d(n.dice)}${n.dmgBonus?I(n.dmgBonus):""}</b> ${d(n.dmgType)}${n.maestria?` <span class="muted">(${d(n.maestria)})</span>`:""}`:h}</span>
        <button class="btn small ${s.equipado?"":"primary"}" data-swapweapon="${s.uid}">${s.equipado?"Guardar":"Empunhar"}</button>
      </div>`}).join("")}
    ${p?"":`<p class="muted" style="margin:0">Nenhuma arma empunhada — desarmado: <b>${I(a.pb+a.mods.for)}</b> pra acertar, <b>1${I(a.mods.for)}</b> de dano contundente.</p>`}
    <p class="muted" style="margin:0;font-size:.8rem">Toque em "Empunhar"/"Guardar" pra trocar de arma. Bônus de ataque = Proficiência + atributo; dano = dado da arma + atributo.</p>
  </section>`}function ye(e,o){const{hp:a,deathSaves:c={success:0,fail:0},conditions:l=[],dead:p}=e.state,s=a.max+a.temp,t=Math.round(a.current/s*100),n=Math.round(a.temp/s*100),h=a.current/a.max>.5?"":a.current/a.max>.25?"mid":"low",u=a.current===0&&!p,f=e.state.concentration?$.comp.byId.spells[e.state.concentration]:null;return`
  <section class="card stack" id="hpcard">
    <div class="hp-big"><div class="num">${a.current}<small> / ${a.max}</small></div>
      ${a.temp?`<div class="tmpv">+${a.temp} temporários</div>`:""}
      ${p?'<div class="chip bad" style="margin-top:.4rem">MORTO</div>':""}</div>
    <div class="hpbar" aria-hidden="true"><div class="cur ${h}" style="width:${t}%"></div><div class="tmp" style="width:${n}%"></div></div>
    <input id="amount" class="amount" type="number" inputmode="numeric" min="0" placeholder="0" value="${d($.amount)}" aria-label="Valor" />
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
    <div><b>${d(o.speed.replace(" metros"," m"))}</b><small>Deslocamento</small></div>
    <div><b>${o.passivePerception}</b><small>Perc. passiva</small></div>
  </div>
  ${o.acDetalhe?`<p class="empty-note" style="margin:.5rem 0 0">CA automática: ${d(o.acDetalhe)}</p>`:""}</section>
  ${he(e,o)}
  ${ge(e,$.comp,o)}
  ${f?`<p class="banner">Concentrando em: <b>${d(f.nome)}</b> <button class="btn small" id="endconc" style="margin-left:.5rem">Encerrar</button></p>`:""}
  ${u?`<section class="card stack"><h2>Testes contra a morte</h2>
    <div class="saves"><div><small class="muted">Sucessos</small><div class="pips">${[0,1,2].map(m=>`<span class="pip ${m<c.success?"s":""}"></span>`).join("")}</div></div>
      <div><small class="muted">Falhas</small><div class="pips">${[0,1,2].map(m=>`<span class="pip ${m<c.fail?"f":""}"></span>`).join("")}</div></div></div>
    <button class="btn primary" id="roll-death" style="width:100%">Rolar d20</button></section>`:""}
  <section class="card stack"><h2>Condições</h2>
    <div class="row">${l.map(m=>`<button class="chip bad" data-rmcond="${m}" aria-label="Remover ${m}">${ma[m]||m} ✕</button>`).join("")||'<span class="muted">Nenhuma</span>'}</div>
    <div class="row"><select id="addcond" class="grow" aria-label="Adicionar condição"><option value="">Adicionar condição…</option>
      ${Fa.filter(m=>!l.includes(m)).map(m=>`<option value="${m}">${ma[m]||m}</option>`).join("")}</select></div>
  </section>
  <section class="card stack"><h2>Descanso</h2>
    ${(e.state.hitDice.byClass||[]).length>1?e.state.hitDice.byClass.map(m=>{const w=$.comp.byId.classes[m.classId];return`<div class="row" style="justify-content:space-between"><span class="muted">${d((w==null?void 0:w.nome)||m.classId)}: ${m.max-m.used}/${m.max} (d${m.die})</span>
            <button class="btn small" data-shortclass="${m.classId}">Gastar</button></div>`}).join(""):`<p class="muted" style="margin:0">Dados de Vida: ${e.state.hitDice.max-e.state.hitDice.used}/${e.state.hitDice.max} (d${e.state.hitDice.die})</p>
         <div class="row"><button class="btn grow" id="short">Gastar 1 Dado de Vida</button></div>`}
    <div class="row"><button class="btn grow" id="long">Descanso Longo</button></div>
  </section>
  <section class="card"><h2>Registro</h2><ul class="log">${(e.state.log||[]).map(m=>`<li>${d(m)}</li>`).join("")||"<li>—</li>"}</ul></section>`}function we(e,o){const a=t=>D.save({"state.effects":t}),c=t=>Number(t)>=1?Math.floor(Number(t)):null;v("#fxadd").onclick=()=>{const t=v("#fxpick").value;if(!t)return E("Escolha um efeito.");const n=L[t],h=v("#fxrounds").value?c(v("#fxrounds").value):n.rounds;a([...e.state.effects||[],{uid:pa(),id:t,nome:n.nome,rounds:h}]),E(`${n.nome} ativo${h?` — ${h} rodada${h>1?"s":""}`:""}.`)},v("#fxc-add").onclick=()=>{const t=v("#fxc-nome").value.trim();if(!t)return E("Dê um nome ao efeito.");a([...e.state.effects||[],{uid:pa(),id:"custom",nome:t,rounds:c(v("#fxc-rounds").value),ac:Number(v("#fxc-ac").value)||0,speed:Number(v("#fxc-speed").value)||0}])};const l=(t,n,h)=>{const u=[];return{out:t.map(m=>{var A;if(m.rounds==null||h&&m.uid!==h)return m;const w=m.rounds+n;return w<=0?(u.push(m.nome||((A=L[m.id])==null?void 0:A.nome)),null):{...m,rounds:w}}).filter(Boolean),ended:u}};v("#nextround")&&(v("#nextround").onclick=()=>{const{out:t,ended:n}=l(e.state.effects||[],-1);a(t),E(n.length?`Terminou: ${n.join(", ")}.`:"Rodada avançada.")}),x.querySelectorAll("[data-fxadj]").forEach(t=>t.onclick=()=>{const{out:n,ended:h}=l(e.state.effects||[],Number(t.dataset.d),t.dataset.fxadj);a(n),h.length&&E(`Terminou: ${h.join(", ")}.`)}),x.querySelectorAll("[data-fxend]").forEach(t=>t.onclick=()=>a((e.state.effects||[]).filter(n=>n.uid!==t.dataset.fxend))),x.querySelectorAll("[data-swapweapon]").forEach(t=>t.onclick=()=>{const n=_(e),h=n.find(f=>f.uid===t.dataset.swapweapon),u=!h.equipado;D.save({inventory:n.map(f=>f.uid===h.uid?{...f,equipado:u}:f)}),E(`${h.nome} ${u?"empunhada":"guardada"}.`)});const p=v("#amount");p.oninput=()=>$.amount=p.value,x.querySelectorAll("[data-q]").forEach(t=>t.onclick=()=>{$.amount=t.dataset.q==="C"?"":String((Number($.amount)||0)+Number(t.dataset.q)),p.value=$.amount}),x.querySelectorAll("[data-act]").forEach(t=>t.onclick=async()=>{const n=Number($.amount);if(!n)return E("Digite um valor.");const h={resistant:v("#o-res").checked,vulnerable:v("#o-vul").checked,critical:v("#o-crit").checked};$.amount="";const u=await X($.be,$.chId,t.dataset.act,n,h,e.name);aa(u.patch),u.concentrationDC&&e.state.concentration?E(`Teste de Concentração: CD ${u.concentrationDC}`):u.log.length&&E(u.log.at(-1))}),v("#endconc")&&(v("#endconc").onclick=()=>D.save({"state.concentration":null})),v("#roll-death")&&(v("#roll-death").onclick=async()=>{const t=va("1d20").total,n=await X($.be,$.chId,"morte",t,{},e.name);aa(n.patch),E(`d20 = ${t}. ${n.log.at(-1)??""}`)}),x.querySelectorAll("[data-rmcond]").forEach(t=>t.onclick=()=>D.save({"state.conditions":e.state.conditions.filter(n=>n!==t.dataset.rmcond)})),v("#addcond").onchange=t=>t.target.value&&D.save({"state.conditions":[...e.state.conditions,t.target.value]});const s=async(t,n)=>{const h=va(`1d${t}`).total+o.mods.con;await n();const u=await X($.be,$.chId,"cura",Math.max(0,h),{},e.name);aa(u.patch),E(`Dado de Vida: ${h}. ${u.log[0]??""}`)};v("#short")&&(v("#short").onclick=()=>{const t=e.state.hitDice;if(t.used>=t.max)return E("Sem Dados de Vida disponíveis.");s(t.die,()=>D.save({"state.hitDice.used":t.used+1}))}),x.querySelectorAll("[data-shortclass]").forEach(t=>t.onclick=()=>{const n=e.state.hitDice.byClass,h=n.findIndex(m=>m.classId===t.dataset.shortclass),u=n[h];if(u.used>=u.max)return E("Sem Dados de Vida dessa classe.");const f=n.map((m,w)=>w===h?{...m,used:m.used+1}:m);s(u.die,()=>D.save({"state.hitDice.byClass":f,"state.hitDice.used":f.reduce((m,w)=>m+w.used,0)}))}),v("#long").onclick=async()=>{const t=Object.fromEntries(Object.entries(e.state.spellSlots||{}).map(([u,f])=>[u,{...f,used:0}])),n=Object.fromEntries(Object.entries(e.state.pactSlots||{}).map(([u,f])=>[u,{...f,used:0}])),h=(e.state.hitDice.byClass||[]).map(u=>({...u,used:0}));await D.save({"state.hp":{...e.state.hp,current:e.state.hp.max,temp:0},"state.spellSlots":t,"state.pactSlots":n,"state.hitDice":{...e.state.hitDice,byClass:h,used:0},"state.deathSaves":{success:0,fail:0},"state.effects":[],"state.conditions":e.state.conditions.filter(u=>!["inconsciente","estabilizado"].includes(u))}),E("Descanso longo concluído.")}}
