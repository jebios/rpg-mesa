import"./pwa-DNJwNots.js";import{e as c,A as T,$ as p,j as la,t as C,f as x,k as Q,m as ga,n as oa,o as ya,q as wa,w as ka,S as Sa,g as qa,r as Aa,l as Ea,s as W,a as ma,b as pa,x as Ca,y as Ia,c as Na,d as ja,C as na,h as Ma,i as U,z as ia}from"./auth-BJsoWTkS.js";function ca(e){const n=String(e).replace(/\s/g,"").match(/^(\d*)d(\d+)([+-]\d+)?$/i);if(!n)return null;const a=Number(n[1]||1),i=Number(n[2]),t=Number(n[3]||0),o=Array.from({length:a},()=>1+Math.floor(Math.random()*i));return{rolls:o,bonus:t,total:o.reduce((s,r)=>s+r,0)+t}}const L=e=>c(e).replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>").replace(/(^|\s)_([^_]+)_(?=\s|$|[.,;:])/g,"$1<i>$2</i>");function j(e){if(!e)return"";const n=[];for(const a of String(e).split(/\n\n+/)){const i=a.split(`
`);if(i.every(t=>t.startsWith("| "))){n.push('<div class="mdtable"><table>'+i.map(t=>"<tr>"+t.slice(2).split(" | ").map(o=>`<td>${L(o)}</td>`).join("")+"</tr>").join("")+"</table></div>");continue}for(const t of i)t.startsWith("#### ")?n.push(`<h5>${L(t.slice(5))}</h5>`):t.startsWith("### ")?n.push(`<h4>${L(t.slice(4))}</h4>`):t.startsWith("| ")?n.push('<div class="mdtable"><table><tr>'+t.slice(2).split(" | ").map(o=>`<td>${L(o)}</td>`).join("")+"</tr></table></div>"):t.startsWith("• ")?n.push(`<p class="bullet">${L(t)}</p>`):n.push(`<p>${L(t)}</p>`)}return`<div class="md">${n.join("")}</div>`}const z=e=>String(e||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(),ba=Object.fromEntries(T),B=40,_=e=>e===0?"Truque":`${e}º círculo`,ra=()=>Math.random().toString(36).slice(2,9),N=(e,n,a,i=!1,t="",o="")=>`<details class="entry" ${i?"open":""} ${t}><summary><span class="t">${e}</span><span class="row" style="gap:.4rem;flex-wrap:nowrap"><span class="lvl-badge">${n||""}</span>${o}</span></summary><div class="body">${a}</div></details>`,Y=(e,n,a="Adicionar")=>`<button class="btn small primary addbtn" ${e}="${n}" aria-label="${a}">+</button>`;function Pa(e,n,a){const i=a.S,t=i.comp,o=new Set(e.build.classes.map(d=>d.classId)),s=t.classes.filter(d=>!o.has(d.id)),r=n.classesInfo.slice(1);return`
  <section class="card stack"><h2>Multiclasse</h2>
    <p class="empty-note" style="margin:0">Nível total: ${n.level}/20. Ao multiclassar, confira na aba Traços quais proficiências a nova classe concede (são menos do que na criação) e ajuste "Treinamento e Proficiências" à mão, se precisar.</p>
    ${r.length?r.map(d=>{var u,g,l,y,h;const $=((u=d.cls)==null?void 0:u.subclasses)||[];return`<div class="row" style="flex-wrap:wrap;gap:.5rem;border-top:1px solid var(--border,#3332);padding-top:.5rem">
        <b class="grow">${c(((g=d.cls)==null?void 0:g.nome)||d.classId)}</b>
        <div class="row" style="gap:.3rem"><button class="btn small" data-mcdown="${d.classId}" aria-label="Diminuir nível de ${c(((l=d.cls)==null?void 0:l.nome)||d.classId)}">−</button>
          <span style="min-width:1.4rem;text-align:center">${d.level}</span>
          <button class="btn small" data-mcup="${d.classId}" aria-label="Subir nível de ${c(((y=d.cls)==null?void 0:y.nome)||d.classId)}">+</button></div>
        ${$.length?`<select data-mcsub="${d.classId}" aria-label="Subclasse de ${c(((h=d.cls)==null?void 0:h.nome)||d.classId)}" ${d.level<3?"disabled":""}>
          <option value="">—</option>${$.map(v=>`<option value="${v.id}" ${v.id===d.subclassId?"selected":""}>${c(v.nome)}</option>`).join("")}</select>`:""}
        <button class="btn small danger" data-mcrm="${d.classId}">Remover</button>
      </div>`}).join(""):'<p class="empty-note">Personagem de classe única.</p>'}
    ${s.length&&n.level<20?`<form class="row" id="addclass">
      <select id="mcnew" class="grow" aria-label="Nova classe">${s.map(d=>`<option value="${d.id}">${c(d.nome)}</option>`).join("")}</select>
      <button class="btn primary small">+ Adicionar classe</button></form>`:""}
  </section>`}function xa(e,n,a){const i=a.S,t=a.app;t.querySelectorAll("[data-mcup]").forEach(o=>o.onclick=()=>{const s=e.build.classes.find(r=>r.classId===o.dataset.mcup);a.save(oa(e,i.comp,o.dataset.mcup,s.level+1))}),t.querySelectorAll("[data-mcdown]").forEach(o=>o.onclick=()=>{const s=e.build.classes.find(r=>r.classId===o.dataset.mcdown);if(s.level<=1)return a.toast('Nível mínimo 1 — use "Remover" para tirar a classe.');a.save(oa(e,i.comp,o.dataset.mcdown,s.level-1))}),t.querySelectorAll("[data-mcsub]").forEach(o=>o.onchange=()=>a.save(ya(e,i.comp,o.dataset.mcsub,o.value||null))),t.querySelectorAll("[data-mcrm]").forEach(o=>o.onclick=()=>{if(!a.confirmTwice(`[data-mcrm="${o.dataset.mcrm}"]`,"Toque de novo para remover"))return;const s=wa(e,i.comp,o.dataset.mcrm);s&&a.save(s)}),p("#addclass")&&(p("#addclass").onsubmit=o=>{o.preventDefault();const s=ka(e,i.comp,p("#mcnew").value);s&&(a.save(s),a.toast("Classe adicionada no nível 1."))})}function Da(e,n,a){var d,$,u,g,l,y;const i=a.S,t=e.build.classes[0].level,o=e.build.classes[0],s=((d=n.cls)==null?void 0:d.subclasses)||[],r=e.build.training||{};return`
  <section class="card stack">
    <div class="sectiontitle"><h2 style="margin:0">${n.multiclass?`${c(o.nomePersonalizado||(($=n.cls)==null?void 0:$.nome)||"")} ${t}`:`Nível ${t}`}</h2>
      <div class="row"><button class="btn small" id="lvldown" aria-label="Diminuir nível">−</button><button class="btn small primary" id="lvlup" aria-label="Subir de nível">+ Nível</button></div></div>
    ${n.multiclass?`<p class="empty-note" style="margin:0">Classe principal (foi ela que deu o 1º dado de vida cheio). Nível total do personagem: ${n.level}.</p>`:""}
    ${s.length?`<div><label for="subclass">Subclasse${t<3?" (a partir do nível 3)":""}</label>
      <select id="subclass" ${t<3?"disabled":""}><option value="">—</option>${s.map(h=>`<option value="${h.id}" ${h.id===o.subclassId?"selected":""}>${c(h.nome)}</option>`).join("")}</select></div>`:""}
    <div class="stats">
      <div><b>${x(n.pb)}</b><small>Proficiência</small></div>
      <div><b>${x(n.initiative)}</b><small>Iniciativa</small></div>
      <div><b>${c(n.speed.replace(" metros"," m"))}</b><small>Deslocamento</small></div>
      <div><b>${n.passivePerception}</b><small>Perc. passiva</small></div>
    </div>
    <div class="row"><label for="ac" style="margin:0">Classe de Armadura</label>
      <input id="ac" type="number" inputmode="numeric" style="width:6rem" value="${e.build.ac??10}" /></div>
    <div class="row"><label for="hpmax" style="margin:0">PV Máximo</label>
      <input id="hpmax" type="number" inputmode="numeric" min="1" style="width:6rem" value="${e.state.hp.max}" /></div>
    <p class="empty-note" style="margin:0">O PV máximo pode ser ajustado à mão — use o valor rolado no dado com o Mestre. Ao subir de nível, o app só soma o ganho médio da regra a esse valor.</p>
  </section>

  ${Pa(e,n,a)}

  <section class="card stack"><h2>Personalização de espécie/classe</h2>
    <p class="empty-note" style="margin:0">Pra jogar uma espécie ou classe alternativa/homebrew, dê um nome personalizado aqui — os números continuam vindo da opção escolhida na criação (${c(((u=n.sp)==null?void 0:u.nome)||"")} / ${c(((g=n.cls)==null?void 0:g.nome)||"")}).</p>
    <div class="row">
      <div class="grow"><label for="pz-sp">Nome da espécie</label>
        <input id="pz-sp" maxlength="60" placeholder="${c(((l=n.sp)==null?void 0:l.nome)||"")}" value="${c(e.build.speciesNomePersonalizado||"")}" /></div>
      <div class="grow"><label for="pz-cl">Nome da classe</label>
        <input id="pz-cl" maxlength="60" placeholder="${c(((y=n.cls)==null?void 0:y.nome)||"")}" value="${c(o.nomePersonalizado||"")}" /></div>
    </div>
    <div><label for="pz-note">Notas da personalização</label>
      <textarea id="pz-note" rows="2" placeholder="O que muda nessa versão (aparência, traços trocados…)">${c(e.build.customNote||"")}</textarea></div>
  </section>

  <section class="card stack"><h2>Atributos e Salvaguardas</h2>
    <p class="empty-note">Toque em <b>Salvaguarda</b> para marcar/desmarcar proficiência.</p>
    <div class="abil2">${T.map(([h,v])=>{const m=(e.build.saveProfs||[]).includes(h);return`<div class="abcard">
        <small>${v}</small><b>${x(n.mods[h])}</b>
        <input class="abscore" data-score="${h}" type="number" inputmode="numeric" min="1" max="30" value="${e.build.abilities[h]}" aria-label="Valor de ${v}" />
        <button class="savebtn ${m?"on":""}" data-save="${h}" aria-pressed="${m}">
          <span class="dot ${m?"on":""}"></span>Salvaguarda <b>${x(n.saves[h])}</b></button>
      </div>`}).join("")}</div>
  </section>

  <section class="card"><h2>Perícias</h2><p class="empty-note">Toque para alternar: sem proficiência → proficiente (●) → especialista (◆).</p>
    <div class="skills">${n.skills.map(h=>`<button data-skill="${h.id}" aria-pressed="${h.prof||h.exp}">
      <span class="row" style="flex-wrap:nowrap"><span class="dot ${h.exp?"exp":h.prof?"on":""}"></span>${h.nome} <small class="muted">(${h.ab.toUpperCase()})</small></span><b>${x(h.bonus)}</b></button>`).join("")}</div>
  </section>

  <section class="card stack"><h2>Treinamento e Proficiências</h2>
    ${[["armaduras","Treinamento com Armaduras"],["armas","Proficiência com Armas"],["ferramentas","Proficiência com Ferramentas"],["idiomas","Idiomas"]].map(([h,v])=>`<div><label for="tr-${h}">${v}</label><textarea id="tr-${h}" data-train="${h}" rows="2">${c(r[h]||"")}</textarea></div>`).join("")}
  </section>

  <section class="card stack"><h2>Anotações</h2>
    <textarea id="notes" rows="5" placeholder="Aliados, pistas, história…">${c(e.notes)}</textarea></section>

  <section class="card stack"><h2>Mesa</h2>
    ${e.campaignId?`<p style="margin:0">Jogando em <b>${c(e.campaignName)}</b>. O Mestre dessa mesa pode ver e alterar esta ficha.</p>
         <button class="btn" id="leave-table">Sair da mesa</button>`:`<p class="muted" style="margin:0">Esta ficha não está em nenhuma mesa. Só você pode vê-la.</p>
         <form class="row" id="join"><input id="code" class="grow" autocomplete="off" autocapitalize="characters" placeholder="Código (ABC-123)" aria-label="Código da mesa" required style="width:auto" />
         <button class="btn primary">Entrar</button></form>`}
  </section>
  <section class="card stack"><h2>Conta</h2>
    <div class="row">${a.accountChip(i.user)}</div>
    <button class="btn danger small" id="delete">Apagar personagem</button>
  </section>`}let da={};const M=(e,n,a=600)=>{clearTimeout(da[e]),da[e]=setTimeout(n,a)};function Ta(e,n,a){const i=a.S,t=a.app,o=e.build.classes[0].level;p("#lvlup").onclick=()=>n.level<20&&a.save(Q(e,i.comp,o+1)).then(()=>a.toast(`Nível ${o+1}! PV máximo, Dados de Vida e espaços atualizados.`)),p("#lvldown").onclick=()=>o>1&&a.save(Q(e,i.comp,o-1)),p("#subclass")&&(p("#subclass").onchange=s=>a.save(Q(e,i.comp,o,s.target.value||null))),xa(e,n,a),p("#pz-sp").oninput=s=>M("pzsp",()=>a.save({"build.speciesNomePersonalizado":s.target.value.trim()||null})),p("#pz-cl").oninput=s=>M("pzcl",()=>{const r=e.build.classes.map((d,$)=>$===0?{...d,nomePersonalizado:p("#pz-cl").value.trim()||null}:d);a.save({"build.classes":r})}),p("#pz-note").oninput=s=>M("pznote",()=>a.save({"build.customNote":s.target.value})),p("#ac").onchange=s=>a.save({"build.ac":Number(s.target.value)||10}),p("#hpmax").onchange=s=>{const r=Math.max(1,Number(s.target.value)||1);a.save({"state.hp":{...e.state.hp,max:r,current:Math.min(e.state.hp.current,r)}})},t.querySelectorAll("[data-score]").forEach(s=>s.onchange=()=>{const r=Math.max(1,Math.min(30,Number(s.value)||10)),d=s.dataset.score,$={[`build.abilities.${d}`]:r};d==="con"&&($["state.hp"]={...e.state.hp,...ga(e,i.comp,r)}),a.save($)}),t.querySelectorAll("[data-save]").forEach(s=>s.onclick=()=>{const r=s.dataset.save,d=e.build.saveProfs||[];a.save({"build.saveProfs":d.includes(r)?d.filter($=>$!==r):[...d,r]})}),t.querySelectorAll("[data-skill]").forEach(s=>s.onclick=()=>{const r=s.dataset.skill,d=e.build.skillProfs||[],$=e.build.expertise||[];$.includes(r)?a.save({"build.expertise":$.filter(u=>u!==r),"build.skillProfs":d.filter(u=>u!==r)}):d.includes(r)?a.save({"build.expertise":[...$,r]}):a.save({"build.skillProfs":[...d,r]})}),t.querySelectorAll("[data-train]").forEach(s=>s.oninput=()=>M("tr"+s.dataset.train,()=>a.save({[`build.training.${s.dataset.train}`]:s.value}))),p("#notes").oninput=s=>M("notes",()=>a.save({notes:s.target.value})),a.bindLogout(i.be,t),p("#join")&&(p("#join").onsubmit=async s=>{s.preventDefault();try{const r=await i.be.joinByCode(p("#code").value);await i.be.updateCharacter(i.chId,{campaignId:r.id,campaignName:r.name}),a.toast(`${e.name} entrou na mesa ${r.name}.`)}catch(r){a.toast(r.message)}}),p("#leave-table")&&(p("#leave-table").onclick=()=>{a.confirmTwice("#leave-table","Toque de novo para confirmar")&&a.save({campaignId:null,campaignName:null})}),p("#delete").onclick=async()=>{if(!a.confirmTwice("#delete",`Toque de novo para apagar ${e.name}`))return;const s=i.chId;await i.be.deleteCharacter(s),a.showHome()}}function za(e,n,a){const i=a.S,t=i.comp,o=i.ui,s=e.build.spellsKnown||[],r=e.build.spellsPrepared||[],d=Object.entries(e.state.spellSlots||{}),$=Object.entries(e.state.pactSlots||{}),u=s.map(b=>t.byId.spells[b]).filter(Boolean).sort((b,q)=>b.nivel-q.nivel||b.nome.localeCompare(q.nome)),g={};u.forEach(b=>{var q;return(g[q=b.nivel]||(g[q]=[])).push(b)});const l=e.build.classes.map(b=>b.classId),y=n.classesInfo.map(b=>{var q;return(q=b.cls)==null?void 0:q.nome}).filter(Boolean).join(" + "),h=n.spellCaps||{},v=u.filter(b=>b.nivel===0).length,m=u.filter(b=>b.nivel>0).length,S=r.length,k=h.cantrips!==null&&v>=h.cantrips,A=h.known!==null&&m>=h.known,w=h.prepared!==null&&S>=h.prepared,aa=z(o.spellQ);let H=t.spells.filter(b=>!s.includes(b.id)&&(!o.spellMine||!n.casters.length||b.classes.some(q=>l.includes(q)))&&(o.spellLvl==="all"||String(b.nivel)===o.spellLvl)&&(!aa||z(b.nome).includes(aa)));const ea=H.length;H=H.slice(0,B);const fa=b=>(b.nivel===0?k:A)?`<button class="btn small" data-learnfull="${b.nivel===0?"truque":"magia"}" aria-label="Limite atingido">+</button>`:Y("data-learn",b.id,"Adicionar "+c(b.nome)),ha=b=>{const q=r.includes(b.id);return!q&&w?'<button class="btn small" data-prepfull="1" aria-label="Limite de magias preparadas atingido">Preparar</button>':`<button class="btn small" data-prep="${b.id}">${q?"✓ Preparada":"Preparar"}</button>`},sa=(b,q)=>`
    <div class="muted" style="font-size:.85rem">${c(b.escola)} · ${c(b.tempo)} · ${c(b.alcance)}<br>${c(b.componentes)} · ${c(b.duracao)}</div>
    ${j(b.desc)}
    <div class="row">${q?`${b.nivel>0?ha(b):""}
         ${b.concentracao?`<button class="btn small" data-conc="${b.id}">${e.state.concentration===b.id?"Encerrar concentração":"Concentrar"}</button>`:""}
         <button class="btn small" data-forget="${b.id}">Remover</button>`:""}</div>`,ta=b=>[b.concentracao?"C":"",b.ritual?"R":""].filter(Boolean).map(q=>`<span class="chip">${q}</span>`).join(" "),F=(b,q,I)=>I===null?"":`<span class="lvl-badge">${q}/${I} ${b}</span>`;return`
  ${n.casters.length?`<section class="card stack">${n.casters.map(b=>`<div class="stats" style="grid-template-columns:repeat(3,1fr)">
    <div><b>${b.dc}</b><small>CD (${c(b.nome)})</small></div><div><b>${x(b.atk)}</b><small>Ataque mágico</small></div>
    <div><b>${ba[b.atributoConjuracao].slice(0,3)}</b><small>Atributo</small></div></div>`).join("")}</section>`:""}
  ${d.length?`<section class="card slots"><h2>Espaços de magia${n.multiclass?" (combinados)":""}</h2>
    ${d.map(([b,q])=>`<div class="lvl"><span>${b}º</span>${Array.from({length:q.max},(I,P)=>`<button class="slotpip ${P<q.used?"used":""}" data-slot="${b}" data-i="${P}" aria-label="Espaço de ${b}º círculo ${P+1}${P<q.used?", gasto":""}"></button>`).join("")}</div>`).join("")}
  </section>`:""}
  ${$.length?`<section class="card slots"><h2>Magia de Pacto</h2>
    ${$.map(([b,q])=>`<div class="lvl"><span>${b}º</span>${Array.from({length:q.max},(I,P)=>`<button class="slotpip ${P<q.used?"used":""}" data-pactslot="${b}" data-i="${P}" aria-label="Espaço de pacto ${P+1}${P<q.used?", gasto":""}"></button>`).join("")}</div>`).join("")}
  </section>`:""}
  ${h.cantrips!==null||h.known!==null||h.prepared!==null?`<section class="card stack"><h2>Limites de magias (regra 2024)</h2>
    <div class="row" style="flex-wrap:wrap;gap:.4rem">${F("truques",v,h.cantrips)}${F("magias conhecidas",m,h.known)}${F("preparadas",S,h.prepared)}</div>
    <details class="entry"><summary><span class="t">Exceção manual (magia extra de livro/pergaminho…)</span></summary><div class="body stack">
      <p class="empty-note" style="margin:0">Some ao limite oficial acima. Use quando o personagem aprendeu algo fora da regra normal.</p>
      <div class="row" style="flex-wrap:wrap">
        <div class="grow"><label for="extra-cantrips">Truques extras</label><input id="extra-cantrips" type="number" min="0" value="${e.build.extraCantrips||0}" /></div>
        <div class="grow"><label for="extra-spells">Magias extras</label><input id="extra-spells" type="number" min="0" value="${e.build.extraSpells||0}" /></div>
        ${h.invocacoes!==null?`<div class="grow"><label for="extra-invoc">Invocações extras</label><input id="extra-invoc" type="number" min="0" value="${e.build.extraInvocations||0}" /></div>`:""}
      </div>
      <div><label for="extra-note">Motivo (opcional)</label>
        <textarea id="extra-note" rows="2" placeholder="Ex.: aprendeu com um pergaminho encontrado na masmorra">${c(e.build.extraSpellsNote||"")}</textarea></div>
    </div></details>
  </section>`:""}
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Minhas magias</h2><span class="lvl-badge">${r.length} preparada(s)</span></div>
    ${Object.keys(g).length?Object.entries(g).map(([b,q])=>`<h3 style="margin:.6rem 0 .2rem;color:var(--muted)">${_(Number(b))}</h3>
      <div class="stack" style="--gap:.4rem">${q.map(I=>N(`${I.nivel>0&&r.includes(I.id)?"✓ ":""}${c(I.nome)} ${ta(I)}`,_(I.nivel),sa(I,!0),!1,`data-k="m-${I.id}"`)).join("")}</div>`).join(""):'<p class="empty-note">Nenhuma magia ainda. Adicione pela biblioteca abaixo.</p>'}
  </section>
  <section class="card stack"><h2>Biblioteca de magias</h2>
    <input id="spellq" type="search" placeholder="Buscar magia pelo nome…" value="${c(o.spellQ)}" aria-label="Buscar magia" />
    <div class="filters">${["all","0","1","2","3","4","5","6","7","8","9"].map(b=>`<button data-flvl="${b}" aria-pressed="${o.spellLvl===b}">${b==="all"?"Todas":b==="0"?"Truques":b+"º"}</button>`).join("")}</div>
    ${y?`<label class="chk"><input type="checkbox" id="spellmine" ${o.spellMine?"checked":""}> Só a lista de ${c(y)}</label>`:""}
    <p class="empty-note">${ea} magia(s)${ea>B?` — mostrando ${B}, refine a busca`:""}.</p>
    <div class="stack">${H.map(b=>N(`${c(b.nome)} ${ta(b)}`,_(b.nivel),sa(b,!1),!1,`data-k="l-${b.id}"`,fa(b))).join("")}</div>
  </section>`}function La(e,n,a){const i=a.S,t=a.app,o=i.ui;t.querySelectorAll("[data-slot]").forEach(s=>s.onclick=()=>{const r=s.dataset.slot,d=Number(s.dataset.i),$=e.state.spellSlots[r];a.save({[`state.spellSlots.${r}.used`]:d<$.used?d:d+1})}),t.querySelectorAll("[data-pactslot]").forEach(s=>s.onclick=()=>{const r=s.dataset.pactslot,d=Number(s.dataset.i),$=e.state.pactSlots[r];a.save({[`state.pactSlots.${r}.used`]:d<$.used?d:d+1})}),p("#spellq").oninput=s=>{o.spellQ=s.target.value,M("sq",a.render,250)},t.querySelectorAll("[data-flvl]").forEach(s=>s.onclick=()=>{o.spellLvl=s.dataset.flvl,a.render()}),p("#spellmine")&&(p("#spellmine").onchange=s=>{o.spellMine=s.target.checked,a.render()}),t.querySelectorAll("[data-learn]").forEach(s=>s.onclick=()=>a.save({"build.spellsKnown":[...e.build.spellsKnown||[],s.dataset.learn]})),t.querySelectorAll("[data-learnfull]").forEach(s=>s.onclick=()=>C(`Limite de ${s.dataset.learnfull==="truque"?"truques conhecidos":"magias conhecidas"} atingido. Use a exceção manual acima se for o caso.`)),t.querySelectorAll("[data-forget]").forEach(s=>s.onclick=()=>a.save({"build.spellsKnown":(e.build.spellsKnown||[]).filter(r=>r!==s.dataset.forget),"build.spellsPrepared":(e.build.spellsPrepared||[]).filter(r=>r!==s.dataset.forget)})),t.querySelectorAll("[data-prep]").forEach(s=>s.onclick=()=>{const r=e.build.spellsPrepared||[],d=s.dataset.prep;a.save({"build.spellsPrepared":r.includes(d)?r.filter($=>$!==d):[...r,d]})}),t.querySelectorAll("[data-prepfull]").forEach(s=>s.onclick=()=>C("Limite de magias preparadas atingido. Use a exceção manual acima se for o caso.")),p("#extra-cantrips")&&(p("#extra-cantrips").onchange=s=>a.save({"build.extraCantrips":Math.max(0,Number(s.target.value)||0)})),p("#extra-spells")&&(p("#extra-spells").onchange=s=>a.save({"build.extraSpells":Math.max(0,Number(s.target.value)||0)})),p("#extra-invoc")&&(p("#extra-invoc").onchange=s=>a.save({"build.extraInvocations":Math.max(0,Number(s.target.value)||0)})),p("#extra-note")&&(p("#extra-note").oninput=s=>M("extranote",()=>a.save({"build.extraSpellsNote":s.target.value}))),t.querySelectorAll("[data-conc]").forEach(s=>s.onclick=()=>a.save({"state.concentration":e.state.concentration===s.dataset.conc?null:s.dataset.conc})),V(t,"spells")}const K={};function V(e,n){e.querySelectorAll("summary .addbtn").forEach(i=>i.addEventListener("click",t=>t.preventDefault()));const a=K[n]||(K[n]=new Set);e.querySelectorAll("details.entry").forEach((i,t)=>{var s;const o=i.dataset.k||((s=i.querySelector("summary .t"))==null?void 0:s.textContent)||t;a.has(o)&&(i.open=!0),i.addEventListener("toggle",()=>i.open?a.add(o):a.delete(o))})}function Ba(e,n,a,i){var v;const{cls:t,sub:o,level:s,classId:r,nomePersonalizado:d}=n;if(!t)return`<section class="card">Classe "${c(r)}" não encontrada no compêndio.</section>`;const $=d||t.nome,u=t.caracteristicas||[],g=u.filter(m=>m.nivel<=s),l=u.filter(m=>m.nivel>s),y=e.build.opcoes||[],h=r==="bruxo"?((v=a.spellCaps)==null?void 0:v.invocacoes)??null:null;return`
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Características de ${c($)}</h2><span class="lvl-badge">nível ${s}</span></div>
    ${d?`<p class="empty-note" style="margin:0">Usa as regras de ${c(t.nome)}.</p>`:""}
    ${g.length?g.map(m=>N(c(m.nome),`Nível ${m.nivel}`,j(m.desc))).join(""):'<p class="empty-note">Importe o compêndio completo para ver as características.</p>'}
    ${l.length?`<details class="entry"><summary><span class="t muted">Próximos níveis (${l.length})</span></summary><div class="body stack">
      ${l.map(m=>N(c(m.nome),`Nível ${m.nivel}`,j(m.desc))).join("")}</div></details>`:""}
  </section>
  ${(t.opcoes||[]).map(m=>{const S=r==="bruxo"&&/Invoca/i.test(m.titulo),k=S?m.itens.filter(w=>y.includes(w.id)).length:null,A=S&&h!==null&&k>=h;return`<section class="card stack"><div class="sectiontitle"><h2 style="margin:0">${c(m.titulo.replace("Opções de ",""))} (${c($)})</h2>${S&&h!==null?`<span class="lvl-badge">${k}/${h}</span>`:""}</div>
    ${m.itens.filter(w=>y.includes(w.id)).map(w=>N("✓ "+c(w.nome),"",j(w.desc)+`<button class="btn small" data-unop="${w.id}">Remover</button>`)).join("")||'<p class="empty-note">Nenhuma escolhida.</p>'}
    <details class="entry"><summary><span class="t">Escolher ${c(m.titulo.replace("Opções de ","").toLowerCase())}</span><span class="lvl-badge">${m.itens.length}</span></summary><div class="body stack">
      ${m.itens.filter(w=>!y.includes(w.id)).map(w=>N(c(w.nome),"",j(w.desc),!1,`data-k="o-${r}-${w.id}"`,A?'<button class="btn small" data-opfull="1" aria-label="Limite de invocações atingido">+</button>':Y("data-op",w.id,"Escolher "+c(w.nome)))).join("")}
    </div></details></section>`}).join("")}
  <section class="card stack"><h2>Subclasse de ${c($)}${o?": "+c(o.nome):""}</h2>
    ${o?(o.caracteristicas||[]).map(m=>N(`${m.nivel>s?"🔒 ":""}${c(m.nome)}`,`Nível ${m.nivel}`,j(m.desc))).join(""):`<p class="empty-note">${s<3?"A subclasse é escolhida no nível 3.":"Escolha a subclasse na aba Ficha (ou em Multiclasse, para uma classe secundária)."}</p>
         ${(t.subclasses||[]).map(m=>N(c(m.nome),"",j(m.intro))).join("")}`}
  </section>`}function Oa(e,n,a){const i=n.sp,t=n.bg,o=n.speciesLabel||(i==null?void 0:i.nome)||"espécie";return`
  ${n.classesInfo.map(s=>Ba(e,s,n)).join("")}
  <section class="card stack"><h2>Traços de ${c(o)}</h2>
    ${i&&o!==i.nome?`<p class="empty-note" style="margin:0">Usa as regras de ${c(i.nome)}.</p>`:""}
    <p class="empty-note">${c((i==null?void 0:i.tipo)||"")} · ${c((i==null?void 0:i.tamanho)||"")} · Deslocamento ${c((i==null?void 0:i.deslocamento)||"")}</p>
    ${((i==null?void 0:i.tracos)||[]).filter(s=>s.nome!=="Detalhes").map(s=>N(c(s.nome),"",j(s.desc))).join("")||'<p class="empty-note">Sem traços no compêndio.</p>'}
  </section>
  ${t?`<section class="card stack"><h2>Antecedente: ${c(t.nome)}</h2>
    <p style="margin:0;font-size:.92rem"><b>Atributos:</b> ${t.atributos.map(s=>ba[s]).join(", ")}<br>
    <b>Talento:</b> ${c(t.talento)}<br><b>Ferramenta:</b> ${c(t.ferramenta)}<br><b>Equipamento:</b> ${c(t.equipamento)}</p></section>`:""}
  ${e.build.customNote?`<section class="card stack"><h2>Notas da personalização</h2><p style="margin:0;white-space:pre-wrap">${c(e.build.customNote)}</p></section>`:""}`}function Ha(e,n,a){const i=a.app,t=e.build.opcoes||[];i.querySelectorAll("[data-op]").forEach(o=>o.onclick=()=>a.save({"build.opcoes":[...t,o.dataset.op]})),i.querySelectorAll("[data-unop]").forEach(o=>o.onclick=()=>a.save({"build.opcoes":t.filter(s=>s!==o.dataset.unop)})),i.querySelectorAll("[data-opfull]").forEach(o=>o.onclick=()=>C("Limite de invocações místicas atingido. Use a exceção manual na aba Magias se for o caso.")),V(i,"classe")}const Va=["Origem","Geral","Estilo de Luta","Dádiva Épica"];function Ra(e,n,a){const i=a.S,t=i.comp,o=i.ui,s=e.build.feats||[],r=z(o.featQ);let d=t.feats.filter(u=>(u.repetivel||!s.some(g=>g.id===u.id))&&(o.featCat==="all"||u.categoria===o.featCat)&&(!r||z(u.nome).includes(r)||z(u.prereq).includes(r)));const $=d.length;return d=d.slice(0,B),`
  <section class="card stack"><h2>Meus talentos</h2>
    ${s.length?s.map((u,g)=>{const l=t.byId.feats[u.id];return N(c((l==null?void 0:l.nome)||u.id),c(u.origem||(l==null?void 0:l.categoria)||""),(l?`<p class="empty-note">${c(l.categoria)}${l.prereq?" · Pré-requisito: "+c(l.prereq):""}</p>${j(l.desc)}`:'<p class="empty-note">Talento fora do compêndio.</p>')+`<button class="btn small" data-unfeat="${g}">Remover</button>`)}).join(""):'<p class="empty-note">Nenhum talento. Seu antecedente concede um talento de Origem.</p>'}
  </section>
  <section class="card stack"><h2>Biblioteca de talentos</h2>
    <input id="featq" type="search" placeholder="Buscar talento…" value="${c(o.featQ)}" aria-label="Buscar talento" />
    <div class="filters">${["all",...Va].map(u=>`<button data-fcat="${u}" aria-pressed="${o.featCat===u}">${u==="all"?"Todos":u}</button>`).join("")}</div>
    <p class="empty-note">${$} talento(s)${$>B?` — mostrando ${B}`:""}.</p>
    ${d.map(u=>N(c(u.nome),c(u.categoria),`${u.prereq?`<p class="empty-note">Pré-requisito: ${c(u.prereq)}</p>`:""}${j(u.desc)}`,!1,`data-k="f-${u.id}"`,Y("data-feat",u.id,"Adicionar "+c(u.nome)))).join("")}
    ${t.feats.length?"":'<p class="empty-note">Importe o compêndio completo para usar a biblioteca de talentos.</p>'}
  </section>`}function Fa(e,n,a){const i=a.S,t=a.app,o=e.build.feats||[];p("#featq").oninput=s=>{i.ui.featQ=s.target.value,M("fq",a.render,250)},t.querySelectorAll("[data-fcat]").forEach(s=>s.onclick=()=>{i.ui.featCat=s.dataset.fcat,a.render()}),t.querySelectorAll("[data-feat]").forEach(s=>s.onclick=()=>{a.save({"build.feats":[...o,{id:s.dataset.feat,origem:"Escolhido"}]}),a.toast("Talento adicionado. Aplique aumentos de atributo na aba Ficha, se houver.")}),t.querySelectorAll("[data-unfeat]").forEach(s=>s.onclick=()=>a.save({"build.feats":o.filter((r,d)=>d!==Number(s.dataset.unfeat))})),V(t,"feats")}function Qa(e,n,a){const i=a.S,t=i.comp,o=i.ui,s=e.inventory||[],r=e.coins||{},d=z(o.itemQ),$=d.length>=2?t.items.filter(l=>z(l.nome).includes(d)).slice(0,25):[],u=Math.min(100,Math.round(n.weight/n.carry*100)),g=l=>l.tipo==="arma"?`${c(l.dano)} · ${c(l.propriedades)} · Maestria: ${c(l.maestria)}`:l.tipo==="armadura"?`CA ${c(l.ca)}${l.forca&&l.forca!=="—"?" · "+c(l.forca):""}${l.furtividade==="Desvantagem"?" · Desv. Furtividade":""}`:"";return`
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Bolsa de moedas</h2><span class="lvl-badge">≈ ${n.coinsGP.toLocaleString("pt-BR",{maximumFractionDigits:2})} PO</span></div>
    <div class="coins">${la.map(([l,y,h])=>`<label class="coin coin-${l}"><span>${y}</span>
      <input type="number" inputmode="numeric" min="0" data-coin="${l}" value="${Number(r[l])||0}" aria-label="${h}" /></label>`).join("")}</div>
    <form class="row" id="coinop">
      <input id="coinamt" type="number" inputmode="numeric" min="1" placeholder="Qtd." style="width:5.5rem" aria-label="Quantidade" />
      <select id="coinkind" style="width:5.5rem" aria-label="Moeda">${la.map(([l,y])=>`<option value="${l}" ${l==="po"?"selected":""}>${y}</option>`).join("")}</select>
      <button class="btn heal small" data-cop="+">Receber</button><button class="btn danger small" data-cop="-">Gastar</button>
    </form>
  </section>
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Inventário</h2><span class="lvl-badge">${n.weight.toLocaleString("pt-BR",{maximumFractionDigits:1})} / ${n.carry} kg</span></div>
    <div class="hpbar" aria-hidden="true"><div class="cur ${u>100?"low":u>75?"mid":""}" style="width:${u}%"></div></div>
    ${s.length?s.map(l=>{const y=l.itemId?t.byId.weapons[l.itemId]||t.byId.armor[l.itemId]||t.byId.gear[l.itemId]:null;return N(`${l.equipado?"🛡️ ":""}${c(l.nome)}${Number(l.qtd)>1?` <span class="muted">×${l.qtd}</span>`:""}`,c(l.peso||""),`${y?`<p class="empty-note">${g(y)}${y.custo?" · "+c(y.custo):""}</p>${y.desc?j(y.desc):""}`:""}
        <div class="row">
          <button class="btn small" data-qty="${l.uid}" data-d="-1">−</button><b>${l.qtd}</b><button class="btn small" data-qty="${l.uid}" data-d="1">+</button>
          <label class="chk"><input type="checkbox" data-equip="${l.uid}" ${l.equipado?"checked":""}> Equipado</label>
          <label class="chk"><input type="checkbox" data-attune="${l.uid}" ${l.sintonizado?"checked":""}> Sintonizado</label>
        </div>
        <input data-inote="${l.uid}" id="inote-${l.uid}" value="${c(l.notas||"")}" placeholder="Notas (cargas, efeitos…)" aria-label="Notas do item" />
        <button class="btn small danger" data-rmitem="${l.uid}">Remover item</button>`,!1,`data-k="i-${l.uid}"`)}).join(""):'<p class="empty-note">Inventário vazio.</p>'}
  </section>
  <section class="card stack"><h2>Adicionar item</h2>
    <input id="itemq" type="search" placeholder="Buscar armas, armaduras, equipamento… (2+ letras)" value="${c(o.itemQ)}" aria-label="Buscar item" />
    ${$.map(l=>`<div class="libitem"><div class="info"><b>${c(l.nome)}</b><small>${c(l.custo||"")}${l.peso?" · "+c(l.peso):""} ${g(l)?"· "+g(l):""}</small></div>
      <button class="btn small primary" data-additem="${l.id}">+</button></div>`).join("")}
    ${d.length>=2&&!$.length?'<p class="empty-note">Nada encontrado — use o item personalizado abaixo.</p>':""}
    <form class="row" id="custom">
      <input id="cname" class="grow" placeholder="Item personalizado" required style="width:auto" aria-label="Nome do item" />
      <input id="cweight" placeholder="kg" inputmode="decimal" style="width:4.5rem" aria-label="Peso em kg" />
      <button class="btn small">Adicionar</button>
    </form>
  </section>`}function Ua(e,n,a){const i=a.S,t=a.app,o=i.comp,s=e.inventory||[],r={pc:0,pp:0,pe:0,po:0,pl:0,...e.coins||{}},d=u=>a.save({inventory:u});t.querySelectorAll("[data-coin]").forEach(u=>u.onchange=()=>a.save({coins:{...r,[u.dataset.coin]:Math.max(0,Number(u.value)||0)}})),t.querySelectorAll("[data-cop]").forEach(u=>u.onclick=g=>{g.preventDefault();const l=Number(p("#coinamt").value),y=p("#coinkind").value;if(!l)return a.toast("Digite a quantidade.");const h=r[y]+(u.dataset.cop==="+"?l:-l);if(h<0)return a.toast(`Não há ${l} ${y.toUpperCase()} suficientes.`);a.save({coins:{...r,[y]:h}})}),p("#itemq").oninput=u=>{i.ui.itemQ=u.target.value,M("iq",a.render,250)},t.querySelectorAll("[data-additem]").forEach(u=>u.onclick=()=>{const g=o.items.find(y=>y.id===u.dataset.additem),l=s.find(y=>y.itemId===g.id);d(l?s.map(y=>y===l?{...y,qtd:Number(y.qtd)+1}:y):[...s,{uid:ra(),itemId:g.id,nome:g.nome,qtd:1,peso:g.peso||"",equipado:!1,sintonizado:!1,notas:""}]),a.toast(`${g.nome} adicionado.`)}),p("#custom").onsubmit=u=>{u.preventDefault();const g=p("#cweight").value.trim();d([...s,{uid:ra(),itemId:null,nome:p("#cname").value.trim(),qtd:1,peso:g?`${g} kg`:"",equipado:!1,sintonizado:!1,notas:""}])};const $=(u,g)=>d(s.map(l=>l.uid===u?g(l):l));t.querySelectorAll("[data-qty]").forEach(u=>u.onclick=()=>$(u.dataset.qty,g=>({...g,qtd:Math.max(0,Number(g.qtd)+Number(u.dataset.d))}))),t.querySelectorAll("[data-equip]").forEach(u=>u.onchange=()=>$(u.dataset.equip,g=>({...g,equipado:u.checked}))),t.querySelectorAll("[data-attune]").forEach(u=>u.onchange=()=>{if(u.checked&&s.filter(g=>g.sintonizado).length>=3)return u.checked=!1,a.toast("Limite de 3 itens sintonizados.");$(u.dataset.attune,g=>({...g,sintonizado:u.checked}))}),t.querySelectorAll("[data-inote]").forEach(u=>u.oninput=()=>M("in"+u.dataset.inote,()=>$(u.dataset.inote,g=>({...g,notas:u.value})))),t.querySelectorAll("[data-rmitem]").forEach(u=>u.onclick=()=>d(s.filter(g=>g.uid!==u.dataset.rmitem))),V(t,"itens")}const _a={ficha:{html:Da,bind:Ta},magias:{html:za,bind:La},classe:{html:Oa,bind:Ha},talentos:{html:Ra,bind:Fa},itens:{html:Qa,bind:Ua}},E=p("#app"),f={be:null,comp:null,user:null,chId:null,ch:null,tab:"combate",amount:"",off:[],prevHp:null,ui:{spellQ:"",spellLvl:"all",spellMine:!0,featQ:"",featCat:"all",itemQ:"",libOpen:{}}},J=()=>`rpgmesa:last:${f.user.uid}`,R=()=>{f.off.forEach(e=>e()),f.off=[]},ua=Object.fromEntries(Sa.map(([e,n])=>[e,n])),G=Object.fromEntries(T);Ka().catch(e=>{E.innerHTML=`<div class="wrap"><div class="card">Erro ao iniciar: ${c(e.message)}</div></div>`});async function Ka(){f.be=await qa(),Aa(f.be,E,{title:"Grimório do Aventureiro",subtitle:"Entre com sua conta para acessar seus personagens em qualquer aparelho.",onSignedOut:()=>{R(),f.ch=null,f.chId=null,f.prevHp=null}},async e=>{f.user=e,E.innerHTML='<p class="muted" style="padding:1rem">Carregando compêndio…</p>',f.comp=await Ea(f.be);const n=W.get(J());n?X(n):O()})}const va=()=>f.be.mode==="local"?'<p class="banner">Modo demo: os dados ficam neste navegador. Abra o Escudo em outra aba para testar a sincronização.</p>':"",Ga=()=>f.comp.completo?"":'<p class="banner">Biblioteca reduzida: o Mestre ainda não importou o compêndio completo no Escudo.</p>';function O(){R(),f.chId=null,f.ch=null,W.set(J(),null);let e=!1;f.off.push(f.be.watchMyCharacters(n=>{p("#build")||(n.sort((a,i)=>a.name.localeCompare(i.name)),E.innerHTML=`<header class="top"><div class="row"><div class="grow name">Meus personagens</div>
      <a class="btn small" href="./escudo.html" title="Ir para o Escudo do Mestre">🛡️ Escudo</a>${ma(f.user)}</div></header>
    <main class="wrap stack">${va()}${Ga()}
      ${n.map(a=>`<button class="charbtn" data-open="${a.id}">
        <span><b>${c(a.name)}</b><br><small class="muted">${c($a(a))}</small></span>
        <span class="chip">${a.campaignName?"🎲 "+c(a.campaignName):"Sem mesa"}</span></button>`).join("")}
      ${n.length?"":'<div class="card"><p style="margin:0">Você ainda não tem personagens. Crie o primeiro abaixo — ele fica salvo na sua conta.</p></div>'}
      <button class="btn primary" id="newchar" style="width:100%">+ Novo personagem</button>
    </main>`,pa(f.be,E),E.querySelectorAll("[data-open]").forEach(a=>a.onclick=()=>X(a.dataset.open)),p("#newchar").onclick=()=>Wa(),!n.length&&!e&&(e=!0))}))}function Wa(){R();const e=f.comp,n=[15,14,13,12,10,8];E.innerHTML=`<header class="top"><div class="row"><button class="btn small" id="back" aria-label="Voltar">◀</button><div class="grow name">Novo personagem</div></div></header>
  <main class="wrap stack">
  <form class="stack" id="build">
    <section class="card stack">
      <div><label for="name">Nome</label><input id="name" name="name" required maxlength="40" /></div>
      <div class="row">
        <div class="grow"><label for="species">Espécie</label><select id="species" name="species">
          ${e.species.map(v=>`<option value="${v.id}">${c(v.nome)}</option>`).join("")}</select></div>
        <div style="width:5.5rem"><label for="level">Nível</label><input id="level" name="level" type="number" inputmode="numeric" min="1" max="20" value="1" /></div>
      </div>
      <div><label for="speciesnome">Nome personalizado da espécie (opcional)</label>
        <input id="speciesnome" name="speciesnome" maxlength="60" placeholder="Ex.: Genasi da Terra" /></div>
      <div><label for="class">Classe</label><select id="class" name="class">
        ${e.classes.map(v=>`<option value="${v.id}">${c(v.nome)}</option>`).join("")}</select></div>
      <div><label for="classnome">Nome personalizado da classe (opcional)</label>
        <input id="classnome" name="classnome" maxlength="60" placeholder="Ex.: Arcanista" /></div>
      <p class="muted" style="margin:0;font-size:.85rem">Pra usar uma espécie ou classe alternativa/homebrew que não está na lista, escolha acima a mais parecida em regras — é dela que vêm os números — e dê um nome personalizado aqui, que aparece no lugar do nome oficial em toda a ficha.</p>
      <div><label for="customnote">Notas da personalização (opcional)</label>
        <textarea id="customnote" name="customnote" rows="2" placeholder="O que muda nessa versão (aparência, traços trocados…)"></textarea></div>
      <div id="classinfo"></div>
    </section>
    ${e.backgrounds.length?`<section class="card stack">
      <div><label for="bg">Antecedente</label><select id="bg" name="bg">
        ${e.backgrounds.map(v=>`<option value="${v.id}">${c(v.nome)}</option>`).join("")}</select></div>
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
  </form></main>`,p("#back").onclick=O;const a=p("#build"),i=()=>e.byId.classes[a.class.value],t=()=>{var v,m;return(m=e.byId.backgrounds)==null?void 0:m[(v=a.bg)==null?void 0:v.value]};function o(){var S;const v=i(),m=(S=v.periciasOpcoes)!=null&&S.length?v.periciasOpcoes:[];p("#classinfo").innerHTML=`
      <p class="muted" style="margin:.2rem 0;font-size:.88rem">Dado de Vida d${v.dadoVida} · Salvaguardas: ${(v.salvaguardas||[]).map(k=>G[k]).join(", ")}</p>
      ${m.length?`<div><label>Perícias da classe — escolha ${v.periciasEscolha} <span id="skcount"></span></label>
        <div class="checks">${m.map(k=>`<label class="chk"><input type="checkbox" name="sk" value="${k}"> ${ua[k]}</label>`).join("")}</div></div>`:""}`,a.querySelectorAll("[name=sk]").forEach(k=>k.onchange=s),s()}function s(){var A;const v=i(),m=((A=t())==null?void 0:A.pericias)||[],S=[...a.querySelectorAll("[name=sk]")];S.forEach(w=>{m.includes(w.value)&&(w.checked=!1,w.disabled=!0,w.parentElement.title="Já vem do antecedente")});const k=S.filter(w=>w.checked).length;S.forEach(w=>{m.includes(w.value)||(w.disabled=!w.checked&&k>=v.periciasEscolha)}),p("#skcount")&&(p("#skcount").textContent=`(${k}/${v.periciasEscolha})`)}function r(){const v=t();if(!v)return;const m=e.byId.feats[v.talentoId];p("#bginfo").innerHTML=`
      <p style="margin:.2rem 0;font-size:.9rem"><b>Perícias:</b> ${v.pericias.map(S=>ua[S]).join(", ")}<br>
      <b>Talento:</b> ${c((m==null?void 0:m.nome)||v.talento)}<br><b>Ferramenta:</b> ${c(v.ferramenta)}</p>
      <div class="row">
        <div class="grow"><label for="plus2">+2 em</label><select id="plus2">${v.atributos.map(S=>`<option value="${S}">${G[S]}</option>`).join("")}<option value="all">+1 nos três</option></select></div>
        <div class="grow" id="plus1wrap"><label for="plus1">+1 em</label><select id="plus1">${v.atributos.map((S,k)=>`<option value="${S}" ${k===1?"selected":""}>${G[S]}</option>`).join("")}</select></div>
      </div>
      <details class="entry"><summary><span class="t">Equipamento do antecedente</span></summary><div class="body">${c(v.equipamento)}</div></details>`,p("#plus2").onchange=p("#plus1").onchange=$,$(),s()}function d(){const v=t(),m={};if(!v)return m;const S=p("#plus2").value;if(S==="all")v.atributos.forEach(k=>m[k]=1);else{m[S]=2;const k=p("#plus1").value;k!==S&&(m[k]=(m[k]||0)+1)}return m}function $(){const v=d();p("#plus1wrap")&&(p("#plus1wrap").style.visibility=p("#plus2").value==="all"?"hidden":""),a.querySelectorAll(".abfinal").forEach(m=>{const S=m.dataset.ab,k=Math.min(20,Number(a[S].value)+(v[S]||0));m.textContent=v[S]?`→ ${k} (${x(ia(k))})`:`(${x(ia(k))})`})}const u=27,g={8:0,9:1,10:2,11:3,12:4,13:5,14:7,15:9},l=v=>g[v]??0;let y="array";function h(){const v=y==="buy";if(p("#ab-inputs").innerHTML=T.map(([m,S],k)=>{const A=document.getElementById("ab-"+m),w=A?A.value:v?8:n[k];return`<div><label for="ab-${m}">${S} <b class="abfinal" data-ab="${m}"></b></label>
        <div class="row" style="align-items:center;gap:.4rem;flex-wrap:nowrap">
          ${v?`<button type="button" class="btn small" data-abdown="${m}" aria-label="Diminuir ${S}">−</button>`:""}
          <input id="ab-${m}" name="${m}" type="number" inputmode="numeric" min="${v?8:3}" max="${v?15:20}"
            value="${w}" ${v?'readonly style="width:3.5rem;text-align:center"':""} />
          ${v?`<button type="button" class="btn small" data-abup="${m}" aria-label="Aumentar ${S}">+</button>`:""}
        </div></div>`}).join(""),v){const m=T.reduce((k,[A])=>k+l(Number(a[A].value)),0),S=u-m;p("#abpts").style.display="",p("#abpts").textContent=`${S} de ${u} pontos restantes`,a.querySelectorAll("[data-abup]").forEach(k=>k.onclick=()=>{const A=k.dataset.abup,w=Number(a[A].value);if(!(w>=15)){if(m+(l(w+1)-l(w))>u)return C("Sem pontos suficientes.");a[A].value=w+1,h()}}),a.querySelectorAll("[data-abdown]").forEach(k=>k.onclick=()=>{const A=k.dataset.abdown,w=Number(a[A].value);w<=8||(a[A].value=w-1,h())})}else p("#abpts").style.display="none",T.forEach(([m])=>a[m].oninput=$);$()}E.querySelectorAll("[data-abmode]").forEach(v=>v.onclick=()=>{v.dataset.abmode!==y&&(y=v.dataset.abmode,E.querySelectorAll("[data-abmode]").forEach(m=>m.setAttribute("aria-selected",String(m.dataset.abmode===y))),p("#abmode-help").textContent=y==="buy"?`Compra de pontos: comece com 8 em tudo e gaste os ${u} pontos (custo 9=1, 10=2, 11=3, 12=4, 13=5, 14=7, 15=9). Máximo 15 antes dos bônus do antecedente.`:"Valores base (Array Padrão: 15, 14, 13, 12, 10, 8). Edite livremente, se preferir. O bônus do antecedente é somado automaticamente.",T.forEach(([m],S)=>{const k=document.getElementById("ab-"+m);k&&(k.value=y==="buy"?8:n[S])}),h())}),a.class.onchange=o,a.bg&&(a.bg.onchange=r),o(),r(),h(),a.onsubmit=async v=>{var A;v.preventDefault();const m=d(),S=Object.fromEntries(T.map(([w])=>[w,Math.min(20,Number(a[w].value)+(m[w]||0))])),k=Ca({name:a.name.value.trim(),ownerUid:f.user.uid,speciesId:a.species.value,classId:a.class.value,level:Number(a.level.value),abilities:S,backgroundId:((A=a.bg)==null?void 0:A.value)||null,skillProfs:[...a.querySelectorAll("[name=sk]:checked")].map(w=>w.value),speciesNomePersonalizado:a.speciesnome.value.trim()||null,classNomePersonalizado:a.classnome.value.trim()||null,customNote:a.customnote.value.trim()},e);try{X(await f.be.createCharacter(k))}catch(w){C(w.message)}}}const $a=e=>`${Ia(e.build,f.comp)} · ${Na(e.build,f.comp)}`;function X(e){R(),f.chId=e,f.prevHp=null,W.set(J(),e),f.off.push(f.be.watchCharacter(e,n=>{if(!n)return O();const a=f.prevHp;if(f.prevHp=n.state.hp.current+n.state.hp.temp,f.ch=n,Z(),a!=null&&a!==f.prevHp){const i=p("#hpcard");i==null||i.classList.add(f.prevHp<a?"flash-dmg":"flash-heal"),navigator.vibrate&&f.prevHp<a&&navigator.vibrate(80)}}))}const Ya=[["combate","❤️","Combate"],["ficha","📜","Ficha"],["magias","✨","Magias"],["classe","🛡️","Traços"],["talentos","⭐","Talentos"],["itens","🎒","Itens"]],D={get S(){return f},app:E,render:()=>Z(),save:e=>f.be.updateCharacter(f.chId,e).catch(n=>C(n.message)),toast:C,showHome:()=>O(),confirmTwice:Ja,accountChip:ma,bindLogout:pa};function Z(){const e=f.ch,n=ja(e,f.comp),a=document.activeElement,i=a==null?void 0:a.id,t=a&&"selectionStart"in a?[a.selectionStart,a.selectionEnd]:null,o=window.scrollY,s={combate:{html:Xa,bind:Za},..._a},r=s[f.tab]||s.combate;if(E.innerHTML=`
    <header class="top">
      <div class="row"><button class="btn small" id="home" aria-label="Meus personagens">◀</button>
        <div class="grow"><div class="name">${c(e.name)}</div>
        <div class="mini"><span>${c($a(e))}</span>${e.campaignName?`<span>🎲 ${c(e.campaignName)}</span>`:""}</div></div>
        <div class="mini"><span>CA <b>${e.build.ac??10}</b></span><span>PV <b>${e.state.hp.current}/${e.state.hp.max}</b></span></div>
        <a class="btn small" href="./escudo.html" title="Ir para o Escudo do Mestre">🛡️</a></div>
    </header>
    <main class="wrap stack">${va()}${r.html(e,n,D)}</main>
    <nav class="tabs" role="tablist">${Ya.map(([d,$,u])=>`<button role="tab" aria-selected="${f.tab===d}" data-tab="${d}"><span class="ico" aria-hidden="true">${$}</span>${u}</button>`).join("")}</nav>`,E.querySelectorAll("[data-tab]").forEach(d=>d.onclick=()=>{f.tab=d.dataset.tab,Z(),window.scrollTo(0,0)}),p("#home").onclick=O,r.bind(e,n,D),window.scrollTo(0,o),i){const d=document.getElementById(i);if(d&&(d.focus({preventScroll:!0}),t&&"setSelectionRange"in d))try{d.setSelectionRange(...t)}catch{}}}function Ja(e,n){const a=p(e);if(a.dataset.armed)return!0;a.dataset.armed="1";const i=a.textContent;return a.textContent=n,setTimeout(()=>{a.isConnected&&(delete a.dataset.armed,a.textContent=i)},3e3),!1}function Xa(e,n){const{hp:a,deathSaves:i={success:0,fail:0},conditions:t=[],dead:o}=e.state,s=a.max+a.temp,r=Math.round(a.current/s*100),d=Math.round(a.temp/s*100),$=a.current/a.max>.5?"":a.current/a.max>.25?"mid":"low",u=a.current===0&&!o,g=e.state.concentration?f.comp.byId.spells[e.state.concentration]:null;return`
  <section class="card stack" id="hpcard">
    <div class="hp-big"><div class="num">${a.current}<small> / ${a.max}</small></div>
      ${a.temp?`<div class="tmpv">+${a.temp} temporários</div>`:""}
      ${o?'<div class="chip bad" style="margin-top:.4rem">MORTO</div>':""}</div>
    <div class="hpbar" aria-hidden="true"><div class="cur ${$}" style="width:${r}%"></div><div class="tmp" style="width:${d}%"></div></div>
    <input id="amount" class="amount" type="number" inputmode="numeric" min="0" placeholder="0" value="${c(f.amount)}" aria-label="Valor" />
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
    <div><b>${x(n.initiative)}</b><small>Iniciativa</small></div>
    <div><b>${c(n.speed.replace(" metros"," m"))}</b><small>Deslocamento</small></div>
    <div><b>${n.passivePerception}</b><small>Perc. passiva</small></div>
  </div></section>
  ${g?`<p class="banner">Concentrando em: <b>${c(g.nome)}</b> <button class="btn small" id="endconc" style="margin-left:.5rem">Encerrar</button></p>`:""}
  ${u?`<section class="card stack"><h2>Testes contra a morte</h2>
    <div class="saves"><div><small class="muted">Sucessos</small><div class="pips">${[0,1,2].map(l=>`<span class="pip ${l<i.success?"s":""}"></span>`).join("")}</div></div>
      <div><small class="muted">Falhas</small><div class="pips">${[0,1,2].map(l=>`<span class="pip ${l<i.fail?"f":""}"></span>`).join("")}</div></div></div>
    <button class="btn primary" id="roll-death" style="width:100%">Rolar d20</button></section>`:""}
  <section class="card stack"><h2>Condições</h2>
    <div class="row">${t.map(l=>`<button class="chip bad" data-rmcond="${l}" aria-label="Remover ${l}">${na[l]||l} ✕</button>`).join("")||'<span class="muted">Nenhuma</span>'}</div>
    <div class="row"><select id="addcond" class="grow" aria-label="Adicionar condição"><option value="">Adicionar condição…</option>
      ${Ma.filter(l=>!t.includes(l)).map(l=>`<option value="${l}">${na[l]||l}</option>`).join("")}</select></div>
  </section>
  <section class="card stack"><h2>Descanso</h2>
    ${(e.state.hitDice.byClass||[]).length>1?e.state.hitDice.byClass.map(l=>{const y=f.comp.byId.classes[l.classId];return`<div class="row" style="justify-content:space-between"><span class="muted">${c((y==null?void 0:y.nome)||l.classId)}: ${l.max-l.used}/${l.max} (d${l.die})</span>
            <button class="btn small" data-shortclass="${l.classId}">Gastar</button></div>`}).join(""):`<p class="muted" style="margin:0">Dados de Vida: ${e.state.hitDice.max-e.state.hitDice.used}/${e.state.hitDice.max} (d${e.state.hitDice.die})</p>
         <div class="row"><button class="btn grow" id="short">Gastar 1 Dado de Vida</button></div>`}
    <div class="row"><button class="btn grow" id="long">Descanso Longo</button></div>
  </section>
  <section class="card"><h2>Registro</h2><ul class="log">${(e.state.log||[]).map(l=>`<li>${c(l)}</li>`).join("")||"<li>—</li>"}</ul></section>`}function Za(e,n){const a=p("#amount");a.oninput=()=>f.amount=a.value,E.querySelectorAll("[data-q]").forEach(t=>t.onclick=()=>{f.amount=t.dataset.q==="C"?"":String((Number(f.amount)||0)+Number(t.dataset.q)),a.value=f.amount}),E.querySelectorAll("[data-act]").forEach(t=>t.onclick=async()=>{const o=Number(f.amount);if(!o)return C("Digite um valor.");const s={resistant:p("#o-res").checked,vulnerable:p("#o-vul").checked,critical:p("#o-crit").checked};f.amount="";const r=await U(f.be,f.chId,t.dataset.act,o,s,e.name);r.concentrationDC&&e.state.concentration?C(`Teste de Concentração: CD ${r.concentrationDC}`):r.log.length&&C(r.log.at(-1))}),p("#endconc")&&(p("#endconc").onclick=()=>D.save({"state.concentration":null})),p("#roll-death")&&(p("#roll-death").onclick=async()=>{const t=ca("1d20").total,o=await U(f.be,f.chId,"morte",t,{},e.name);C(`d20 = ${t}. ${o.log.at(-1)??""}`)}),E.querySelectorAll("[data-rmcond]").forEach(t=>t.onclick=()=>D.save({"state.conditions":e.state.conditions.filter(o=>o!==t.dataset.rmcond)})),p("#addcond").onchange=t=>t.target.value&&D.save({"state.conditions":[...e.state.conditions,t.target.value]});const i=async(t,o)=>{const s=ca(`1d${t}`).total+n.mods.con;await o();const r=await U(f.be,f.chId,"cura",Math.max(0,s),{},e.name);C(`Dado de Vida: ${s}. ${r.log[0]??""}`)};p("#short")&&(p("#short").onclick=()=>{const t=e.state.hitDice;if(t.used>=t.max)return C("Sem Dados de Vida disponíveis.");i(t.die,()=>D.save({"state.hitDice.used":t.used+1}))}),E.querySelectorAll("[data-shortclass]").forEach(t=>t.onclick=()=>{const o=e.state.hitDice.byClass,s=o.findIndex($=>$.classId===t.dataset.shortclass),r=o[s];if(r.used>=r.max)return C("Sem Dados de Vida dessa classe.");const d=o.map(($,u)=>u===s?{...$,used:$.used+1}:$);i(r.die,()=>D.save({"state.hitDice.byClass":d,"state.hitDice.used":d.reduce(($,u)=>$+u.used,0)}))}),p("#long").onclick=async()=>{const t=Object.fromEntries(Object.entries(e.state.spellSlots||{}).map(([r,d])=>[r,{...d,used:0}])),o=Object.fromEntries(Object.entries(e.state.pactSlots||{}).map(([r,d])=>[r,{...d,used:0}])),s=(e.state.hitDice.byClass||[]).map(r=>({...r,used:0}));await D.save({"state.hp":{...e.state.hp,current:e.state.hp.max,temp:0},"state.spellSlots":t,"state.pactSlots":o,"state.hitDice":{...e.state.hitDice,byClass:s,used:0},"state.deathSaves":{success:0,fail:0},"state.conditions":e.state.conditions.filter(r=>!["inconsciente","estabilizado"].includes(r))}),C("Descanso longo concluído.")}}
