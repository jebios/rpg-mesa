import"./pwa-DyPmJtBq.js";import{e as r,A as T,$ as b,j as la,t as I,f as P,k as Q,m as wa,n as oa,o as ka,q as Sa,w as qa,S as Aa,g as Ea,r as Ca,l as Ia,s as W,a as ma,b as pa,x as Na,y as ja,c as Ma,d as xa,C as na,h as Pa,i as U,z as ia}from"./auth-BJsoWTkS.js";function ca(e){const n=String(e).replace(/\s/g,"").match(/^(\d*)d(\d+)([+-]\d+)?$/i);if(!n)return null;const a=Number(n[1]||1),i=Number(n[2]),t=Number(n[3]||0),o=Array.from({length:a},()=>1+Math.floor(Math.random()*i));return{rolls:o,bonus:t,total:o.reduce((s,d)=>s+d,0)+t}}const L=e=>r(e).replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>").replace(/(^|\s)_([^_]+)_(?=\s|$|[.,;:])/g,"$1<i>$2</i>");function j(e){if(!e)return"";const n=[];for(const a of String(e).split(/\n\n+/)){const i=a.split(`
`);if(i.every(t=>t.startsWith("| "))){n.push('<div class="mdtable"><table>'+i.map(t=>"<tr>"+t.slice(2).split(" | ").map(o=>`<td>${L(o)}</td>`).join("")+"</tr>").join("")+"</table></div>");continue}for(const t of i)t.startsWith("#### ")?n.push(`<h5>${L(t.slice(5))}</h5>`):t.startsWith("### ")?n.push(`<h4>${L(t.slice(4))}</h4>`):t.startsWith("| ")?n.push('<div class="mdtable"><table><tr>'+t.slice(2).split(" | ").map(o=>`<td>${L(o)}</td>`).join("")+"</tr></table></div>"):t.startsWith("• ")?n.push(`<p class="bullet">${L(t)}</p>`):n.push(`<p>${L(t)}</p>`)}return`<div class="md">${n.join("")}</div>`}const z=e=>String(e||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(),ba=Object.fromEntries(T),B=40,_=e=>e===0?"Truque":`${e}º círculo`,ra=()=>Math.random().toString(36).slice(2,9),N=(e,n,a,i=!1,t="",o="")=>`<details class="entry" ${i?"open":""} ${t}><summary><span class="t">${e}</span><span class="row" style="gap:.4rem;flex-wrap:nowrap"><span class="lvl-badge">${n||""}</span>${o}</span></summary><div class="body">${a}</div></details>`,Y=(e,n,a="Adicionar")=>`<button class="btn small primary addbtn" ${e}="${n}" aria-label="${a}">+</button>`;function Da(e,n,a){const i=a.S,t=i.comp,o=new Set(e.build.classes.map(c=>c.classId)),s=t.classes.filter(c=>!o.has(c.id)),d=n.classesInfo.slice(1);return`
  <section class="card stack"><h2>Multiclasse</h2>
    <p class="empty-note" style="margin:0">Nível total: ${n.level}/20. Ao multiclassar, confira na aba Traços quais proficiências a nova classe concede (são menos do que na criação) e ajuste "Treinamento e Proficiências" à mão, se precisar.</p>
    ${d.length?d.map(c=>{var u,h,l,g,w;const $=((u=c.cls)==null?void 0:u.subclasses)||[];return`<div class="row" style="flex-wrap:wrap;gap:.5rem;border-top:1px solid var(--border,#3332);padding-top:.5rem">
        <b class="grow">${r(((h=c.cls)==null?void 0:h.nome)||c.classId)}</b>
        <div class="row" style="gap:.3rem"><button class="btn small" data-mcdown="${c.classId}" aria-label="Diminuir nível de ${r(((l=c.cls)==null?void 0:l.nome)||c.classId)}">−</button>
          <span style="min-width:1.4rem;text-align:center">${c.level}</span>
          <button class="btn small" data-mcup="${c.classId}" aria-label="Subir nível de ${r(((g=c.cls)==null?void 0:g.nome)||c.classId)}">+</button></div>
        ${$.length?`<select data-mcsub="${c.classId}" aria-label="Subclasse de ${r(((w=c.cls)==null?void 0:w.nome)||c.classId)}" ${c.level<3?"disabled":""}>
          <option value="">—</option>${$.map(v=>`<option value="${v.id}" ${v.id===c.subclassId?"selected":""}>${r(v.nome)}</option>`).join("")}</select>`:""}
        <button class="btn small danger" data-mcrm="${c.classId}">Remover</button>
      </div>`}).join(""):'<p class="empty-note">Personagem de classe única.</p>'}
    ${s.length&&n.level<20?`<form class="row" id="addclass">
      <select id="mcnew" class="grow" aria-label="Nova classe">${s.map(c=>`<option value="${c.id}">${r(c.nome)}</option>`).join("")}</select>
      <button class="btn primary small">+ Adicionar classe</button></form>`:""}
  </section>`}function Ta(e,n,a){const i=a.S,t=a.app;t.querySelectorAll("[data-mcup]").forEach(o=>o.onclick=()=>{const s=e.build.classes.find(d=>d.classId===o.dataset.mcup);a.save(oa(e,i.comp,o.dataset.mcup,s.level+1))}),t.querySelectorAll("[data-mcdown]").forEach(o=>o.onclick=()=>{const s=e.build.classes.find(d=>d.classId===o.dataset.mcdown);if(s.level<=1)return a.toast('Nível mínimo 1 — use "Remover" para tirar a classe.');a.save(oa(e,i.comp,o.dataset.mcdown,s.level-1))}),t.querySelectorAll("[data-mcsub]").forEach(o=>o.onchange=()=>a.save(ka(e,i.comp,o.dataset.mcsub,o.value||null))),t.querySelectorAll("[data-mcrm]").forEach(o=>o.onclick=()=>{if(!a.confirmTwice(`[data-mcrm="${o.dataset.mcrm}"]`,"Toque de novo para remover"))return;const s=Sa(e,i.comp,o.dataset.mcrm);s&&a.save(s)}),b("#addclass")&&(b("#addclass").onsubmit=o=>{o.preventDefault();const s=qa(e,i.comp,b("#mcnew").value);s&&(a.save(s),a.toast("Classe adicionada no nível 1."))})}function za(e,n,a){var c,$,u,h,l,g;const i=a.S,t=e.build.classes[0].level,o=e.build.classes[0],s=((c=n.cls)==null?void 0:c.subclasses)||[],d=e.build.training||{};return`
  <section class="card stack">
    <div class="sectiontitle"><h2 style="margin:0">${n.multiclass?`${r(o.nomePersonalizado||(($=n.cls)==null?void 0:$.nome)||"")} ${t}`:`Nível ${t}`}</h2>
      <div class="row"><button class="btn small" id="lvldown" aria-label="Diminuir nível">−</button><button class="btn small primary" id="lvlup" aria-label="Subir de nível">+ Nível</button></div></div>
    ${n.multiclass?`<p class="empty-note" style="margin:0">Classe principal (foi ela que deu o 1º dado de vida cheio). Nível total do personagem: ${n.level}.</p>`:""}
    ${s.length?`<div><label for="subclass">Subclasse${t<3?" (a partir do nível 3)":""}</label>
      <select id="subclass" ${t<3?"disabled":""}><option value="">—</option>${s.map(w=>`<option value="${w.id}" ${w.id===o.subclassId?"selected":""}>${r(w.nome)}</option>`).join("")}</select></div>`:""}
    <div class="stats">
      <div><b>${P(n.pb)}</b><small>Proficiência</small></div>
      <div><b>${P(n.initiative)}</b><small>Iniciativa</small></div>
      <div><b>${r(n.speed.replace(" metros"," m"))}</b><small>Deslocamento</small></div>
      <div><b>${n.passivePerception}</b><small>Perc. passiva</small></div>
    </div>
    <div class="row"><label for="ac" style="margin:0">Classe de Armadura</label>
      <input id="ac" type="number" inputmode="numeric" style="width:6rem" value="${e.build.ac??10}" /></div>
    <div class="row"><label for="hpmax" style="margin:0">PV Máximo</label>
      <input id="hpmax" type="number" inputmode="numeric" min="1" style="width:6rem" value="${e.state.hp.max}" /></div>
    <p class="empty-note" style="margin:0">O PV máximo pode ser ajustado à mão — use o valor rolado no dado com o Mestre. Ao subir de nível, o app só soma o ganho médio da regra a esse valor.</p>
  </section>

  ${Da(e,n,a)}

  <section class="card stack"><h2>Personalização de espécie/classe</h2>
    <p class="empty-note" style="margin:0">Pra jogar uma espécie ou classe alternativa/homebrew, dê um nome personalizado aqui — os números continuam vindo da opção escolhida na criação (${r(((u=n.sp)==null?void 0:u.nome)||"")} / ${r(((h=n.cls)==null?void 0:h.nome)||"")}).</p>
    <div class="row">
      <div class="grow"><label for="pz-sp">Nome da espécie</label>
        <input id="pz-sp" maxlength="60" placeholder="${r(((l=n.sp)==null?void 0:l.nome)||"")}" value="${r(e.build.speciesNomePersonalizado||"")}" /></div>
      <div class="grow"><label for="pz-cl">Nome da classe</label>
        <input id="pz-cl" maxlength="60" placeholder="${r(((g=n.cls)==null?void 0:g.nome)||"")}" value="${r(o.nomePersonalizado||"")}" /></div>
    </div>
    <div><label for="pz-note">Notas da personalização</label>
      <textarea id="pz-note" rows="2" placeholder="O que muda nessa versão (aparência, traços trocados…)">${r(e.build.customNote||"")}</textarea></div>
  </section>

  <section class="card stack"><h2>Atributos e Salvaguardas</h2>
    <p class="empty-note">Toque em <b>Salvaguarda</b> para marcar/desmarcar proficiência.</p>
    <div class="abil2">${T.map(([w,v])=>{const m=(e.build.saveProfs||[]).includes(w);return`<div class="abcard">
        <small>${v}</small><b>${P(n.mods[w])}</b>
        <input class="abscore" data-score="${w}" type="number" inputmode="numeric" min="1" max="30" value="${e.build.abilities[w]}" aria-label="Valor de ${v}" />
        <button class="savebtn ${m?"on":""}" data-save="${w}" aria-pressed="${m}">
          <span class="dot ${m?"on":""}"></span>Salvaguarda <b>${P(n.saves[w])}</b></button>
      </div>`}).join("")}</div>
  </section>

  <section class="card"><h2>Perícias</h2><p class="empty-note">Toque para alternar: sem proficiência → proficiente (●) → especialista (◆).</p>
    <div class="skills">${n.skills.map(w=>`<button data-skill="${w.id}" aria-pressed="${w.prof||w.exp}">
      <span class="row" style="flex-wrap:nowrap"><span class="dot ${w.exp?"exp":w.prof?"on":""}"></span>${w.nome} <small class="muted">(${w.ab.toUpperCase()})</small></span><b>${P(w.bonus)}</b></button>`).join("")}</div>
  </section>

  <section class="card stack"><h2>Treinamento e Proficiências</h2>
    ${[["armaduras","Treinamento com Armaduras"],["armas","Proficiência com Armas"],["ferramentas","Proficiência com Ferramentas"],["idiomas","Idiomas"]].map(([w,v])=>`<div><label for="tr-${w}">${v}</label><textarea id="tr-${w}" data-train="${w}" rows="2">${r(d[w]||"")}</textarea></div>`).join("")}
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
  </section>`}let da={};const M=(e,n,a=600)=>{clearTimeout(da[e]),da[e]=setTimeout(n,a)};function La(e,n,a){const i=a.S,t=a.app,o=e.build.classes[0].level;b("#lvlup").onclick=()=>n.level<20&&a.save(Q(e,i.comp,o+1)).then(()=>a.toast(`Nível ${o+1}! PV máximo, Dados de Vida e espaços atualizados.`)),b("#lvldown").onclick=()=>o>1&&a.save(Q(e,i.comp,o-1)),b("#subclass")&&(b("#subclass").onchange=s=>a.save(Q(e,i.comp,o,s.target.value||null))),Ta(e,n,a),b("#pz-sp").oninput=s=>M("pzsp",()=>a.save({"build.speciesNomePersonalizado":s.target.value.trim()||null})),b("#pz-cl").oninput=s=>M("pzcl",()=>{const d=e.build.classes.map((c,$)=>$===0?{...c,nomePersonalizado:b("#pz-cl").value.trim()||null}:c);a.save({"build.classes":d})}),b("#pz-note").oninput=s=>M("pznote",()=>a.save({"build.customNote":s.target.value})),b("#ac").onchange=s=>a.save({"build.ac":Number(s.target.value)||10}),b("#hpmax").onchange=s=>{const d=Math.max(1,Number(s.target.value)||1);a.save({"state.hp":{...e.state.hp,max:d,current:Math.min(e.state.hp.current,d)}})},t.querySelectorAll("[data-score]").forEach(s=>s.onchange=()=>{const d=Math.max(1,Math.min(30,Number(s.value)||10)),c=s.dataset.score,$={[`build.abilities.${c}`]:d};c==="con"&&($["state.hp"]={...e.state.hp,...wa(e,i.comp,d)}),a.save($)}),t.querySelectorAll("[data-save]").forEach(s=>s.onclick=()=>{const d=s.dataset.save,c=e.build.saveProfs||[];a.save({"build.saveProfs":c.includes(d)?c.filter($=>$!==d):[...c,d]})}),t.querySelectorAll("[data-skill]").forEach(s=>s.onclick=()=>{const d=s.dataset.skill,c=e.build.skillProfs||[],$=e.build.expertise||[];$.includes(d)?a.save({"build.expertise":$.filter(u=>u!==d),"build.skillProfs":c.filter(u=>u!==d)}):c.includes(d)?a.save({"build.expertise":[...$,d]}):a.save({"build.skillProfs":[...c,d]})}),t.querySelectorAll("[data-train]").forEach(s=>s.oninput=()=>M("tr"+s.dataset.train,()=>a.save({[`build.training.${s.dataset.train}`]:s.value}))),b("#notes").oninput=s=>M("notes",()=>a.save({notes:s.target.value})),a.bindLogout(i.be,t),b("#join")&&(b("#join").onsubmit=async s=>{s.preventDefault();try{const d=await i.be.joinByCode(b("#code").value);await i.be.updateCharacter(i.chId,{campaignId:d.id,campaignName:d.name}),a.toast(`${e.name} entrou na mesa ${d.name}.`)}catch(d){a.toast(d.message)}}),b("#leave-table")&&(b("#leave-table").onclick=()=>{a.confirmTwice("#leave-table","Toque de novo para confirmar")&&a.save({campaignId:null,campaignName:null})}),b("#delete").onclick=async()=>{if(!a.confirmTwice("#delete",`Toque de novo para apagar ${e.name}`))return;const s=i.chId;await i.be.deleteCharacter(s),a.showHome()}}function Ba(e,n,a){const i=a.S,t=i.comp,o=i.ui,s=e.build.spellsKnown||[],d=e.build.spellsPrepared||[],c=Object.entries(e.state.spellSlots||{}),$=Object.entries(e.state.pactSlots||{}),u=[...c,...$].reduce((p,[q,C])=>C.max>0?Math.max(p,Number(q)):p,0),h=n.casters.length>0,l=s.map(p=>t.byId.spells[p]).filter(Boolean).sort((p,q)=>p.nivel-q.nivel||p.nome.localeCompare(q.nome)),g={};l.forEach(p=>{var q;return(g[q=p.nivel]||(g[q]=[])).push(p)});const w=e.build.classes.map(p=>p.classId),v=n.classesInfo.map(p=>{var q;return(q=p.cls)==null?void 0:q.nome}).filter(Boolean).join(" + "),m=n.spellCaps||{},S=l.filter(p=>p.nivel===0).length,k=l.filter(p=>p.nivel>0).length,A=d.length,y=m.cantrips!==null&&S>=m.cantrips,fa=m.known!==null&&k>=m.known,ha=m.prepared!==null&&A>=m.prepared,aa=z(o.spellQ);let H=t.spells.filter(p=>!s.includes(p.id)&&(!o.spellMine||!n.casters.length||p.classes.some(q=>w.includes(q)))&&(o.spellLvl==="all"||String(p.nivel)===o.spellLvl)&&(!aa||z(p.nome).includes(aa)));const ea=H.length;H=H.slice(0,B);const ga=p=>(p.nivel===0?y:fa)?`<button class="btn small" data-learnfull="${p.nivel===0?"truque":"magia"}" aria-label="Limite atingido">+</button>`:Y("data-learn",p.id,"Adicionar "+r(p.nome)),ya=p=>{const q=d.includes(p.id);return!q&&ha?'<button class="btn small" data-prepfull="1" aria-label="Limite de magias preparadas atingido">Preparar</button>':`<button class="btn small" data-prep="${p.id}">${q?"✓ Preparada":"Preparar"}</button>`},sa=(p,q)=>`
    <div class="muted" style="font-size:.85rem">${r(p.escola)} · ${r(p.tempo)} · ${r(p.alcance)}<br>${r(p.componentes)} · ${r(p.duracao)}</div>
    ${j(p.desc)}
    <div class="row">${q?`${p.nivel>0?ya(p):""}
         ${p.concentracao?`<button class="btn small" data-conc="${p.id}">${e.state.concentration===p.id?"Encerrar concentração":"Concentrar"}</button>`:""}
         <button class="btn small" data-forget="${p.id}">Remover</button>`:""}</div>`,ta=p=>[p.concentracao?"C":"",p.ritual?"R":""].filter(Boolean).map(q=>`<span class="chip">${q}</span>`).join(" "),F=(p,q,C)=>C===null?"":`<span class="lvl-badge">${q}/${C} ${p}</span>`;return`
  ${n.casters.length?`<section class="card stack">${n.casters.map(p=>`<div class="stats" style="grid-template-columns:repeat(3,1fr)">
    <div><b>${p.dc}</b><small>CD (${r(p.nome)})</small></div><div><b>${P(p.atk)}</b><small>Ataque mágico</small></div>
    <div><b>${ba[p.atributoConjuracao].slice(0,3)}</b><small>Atributo</small></div></div>`).join("")}</section>`:""}
  ${c.length?`<section class="card slots"><h2>Espaços de magia${n.multiclass?" (combinados)":""}</h2>
    ${c.map(([p,q])=>`<div class="lvl"><span>${p}º</span>${Array.from({length:q.max},(C,x)=>`<button class="slotpip ${x<q.used?"used":""}" data-slot="${p}" data-i="${x}" aria-label="Espaço de ${p}º círculo ${x+1}${x<q.used?", gasto":""}"></button>`).join("")}</div>`).join("")}
  </section>`:""}
  ${$.length?`<section class="card slots"><h2>Magia de Pacto</h2>
    ${$.map(([p,q])=>`<div class="lvl"><span>${p}º</span>${Array.from({length:q.max},(C,x)=>`<button class="slotpip ${x<q.used?"used":""}" data-pactslot="${p}" data-i="${x}" aria-label="Espaço de pacto ${x+1}${x<q.used?", gasto":""}"></button>`).join("")}</div>`).join("")}
  </section>`:""}
  ${m.cantrips!==null||m.known!==null||m.prepared!==null?`<section class="card stack"><h2>Limites de magias (regra 2024)</h2>
    <div class="row" style="flex-wrap:wrap;gap:.4rem">${F("truques",S,m.cantrips)}${F("magias conhecidas",k,m.known)}${F("preparadas",A,m.prepared)}</div>
    <details class="entry"><summary><span class="t">Exceção manual (magia extra de livro/pergaminho…)</span></summary><div class="body stack">
      <p class="empty-note" style="margin:0">Some ao limite oficial acima. Use quando o personagem aprendeu algo fora da regra normal.</p>
      <div class="row" style="flex-wrap:wrap">
        <div class="grow"><label for="extra-cantrips">Truques extras</label><input id="extra-cantrips" type="number" min="0" value="${e.build.extraCantrips||0}" /></div>
        <div class="grow"><label for="extra-spells">Magias extras</label><input id="extra-spells" type="number" min="0" value="${e.build.extraSpells||0}" /></div>
        ${m.invocacoes!==null?`<div class="grow"><label for="extra-invoc">Invocações extras</label><input id="extra-invoc" type="number" min="0" value="${e.build.extraInvocations||0}" /></div>`:""}
      </div>
      <div><label for="extra-note">Motivo (opcional)</label>
        <textarea id="extra-note" rows="2" placeholder="Ex.: aprendeu com um pergaminho encontrado na masmorra">${r(e.build.extraSpellsNote||"")}</textarea></div>
    </div></details>
  </section>`:""}
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Minhas magias</h2><span class="lvl-badge">${d.length} preparada(s)</span></div>
    ${Object.keys(g).length?Object.entries(g).map(([p,q])=>`<h3 style="margin:.6rem 0 .2rem;color:var(--muted)">${_(Number(p))}</h3>
      <div class="stack" style="--gap:.4rem">${q.map(C=>N(`${C.nivel>0&&d.includes(C.id)?"✓ ":""}${r(C.nome)} ${ta(C)}`,_(C.nivel),sa(C,!0),!1,`data-k="m-${C.id}"`)).join("")}</div>`).join(""):'<p class="empty-note">Nenhuma magia ainda. Adicione pela biblioteca abaixo.</p>'}
  </section>
  <section class="card stack"><h2>Biblioteca de magias</h2>
    <input id="spellq" type="search" placeholder="Buscar magia pelo nome…" value="${r(o.spellQ)}" aria-label="Buscar magia" />
    <div class="filters">${["all","0","1","2","3","4","5","6","7","8","9"].map(p=>{const q=p==="all"||(p==="0"?h:h&&Number(p)<=u);return`<button data-flvl="${p}" aria-pressed="${o.spellLvl===p}" class="${q?"":"unavail"}" ${q?"":'title="Ainda não disponível no seu nível"'}>${p==="all"?"Todas":p==="0"?"Truques":p+"º"}</button>`}).join("")}</div>
    ${h?`<p class="empty-note" style="margin:0">Seu nível permite conjurar ${u===0?"só truques":`truques e magias até ${u}º círculo`}. Os demais círculos aparecem esmaecidos até você subir de nível.</p>`:""}
    ${v?`<label class="chk"><input type="checkbox" id="spellmine" ${o.spellMine?"checked":""}> Só a lista de ${r(v)}</label>`:""}
    <p class="empty-note">${ea} magia(s)${ea>B?` — mostrando ${B}, refine a busca`:""}.</p>
    <div class="stack">${H.map(p=>N(`${r(p.nome)} ${ta(p)}`,_(p.nivel),sa(p,!1),!1,`data-k="l-${p.id}"`,ga(p))).join("")}</div>
  </section>`}function Oa(e,n,a){const i=a.S,t=a.app,o=i.ui;t.querySelectorAll("[data-slot]").forEach(s=>s.onclick=()=>{const d=s.dataset.slot,c=Number(s.dataset.i),$=e.state.spellSlots[d];a.save({[`state.spellSlots.${d}.used`]:c<$.used?c:c+1})}),t.querySelectorAll("[data-pactslot]").forEach(s=>s.onclick=()=>{const d=s.dataset.pactslot,c=Number(s.dataset.i),$=e.state.pactSlots[d];a.save({[`state.pactSlots.${d}.used`]:c<$.used?c:c+1})}),b("#spellq").oninput=s=>{o.spellQ=s.target.value,M("sq",a.render,250)},t.querySelectorAll("[data-flvl]").forEach(s=>s.onclick=()=>{o.spellLvl=s.dataset.flvl,a.render()}),b("#spellmine")&&(b("#spellmine").onchange=s=>{o.spellMine=s.target.checked,a.render()}),t.querySelectorAll("[data-learn]").forEach(s=>s.onclick=()=>a.save({"build.spellsKnown":[...e.build.spellsKnown||[],s.dataset.learn]})),t.querySelectorAll("[data-learnfull]").forEach(s=>s.onclick=()=>I(`Limite de ${s.dataset.learnfull==="truque"?"truques conhecidos":"magias conhecidas"} atingido. Use a exceção manual acima se for o caso.`)),t.querySelectorAll("[data-forget]").forEach(s=>s.onclick=()=>a.save({"build.spellsKnown":(e.build.spellsKnown||[]).filter(d=>d!==s.dataset.forget),"build.spellsPrepared":(e.build.spellsPrepared||[]).filter(d=>d!==s.dataset.forget)})),t.querySelectorAll("[data-prep]").forEach(s=>s.onclick=()=>{const d=e.build.spellsPrepared||[],c=s.dataset.prep;a.save({"build.spellsPrepared":d.includes(c)?d.filter($=>$!==c):[...d,c]})}),t.querySelectorAll("[data-prepfull]").forEach(s=>s.onclick=()=>I("Limite de magias preparadas atingido. Use a exceção manual acima se for o caso.")),b("#extra-cantrips")&&(b("#extra-cantrips").onchange=s=>a.save({"build.extraCantrips":Math.max(0,Number(s.target.value)||0)})),b("#extra-spells")&&(b("#extra-spells").onchange=s=>a.save({"build.extraSpells":Math.max(0,Number(s.target.value)||0)})),b("#extra-invoc")&&(b("#extra-invoc").onchange=s=>a.save({"build.extraInvocations":Math.max(0,Number(s.target.value)||0)})),b("#extra-note")&&(b("#extra-note").oninput=s=>M("extranote",()=>a.save({"build.extraSpellsNote":s.target.value}))),t.querySelectorAll("[data-conc]").forEach(s=>s.onclick=()=>a.save({"state.concentration":e.state.concentration===s.dataset.conc?null:s.dataset.conc})),V(t,"spells")}const K={};function V(e,n){e.querySelectorAll("summary .addbtn").forEach(i=>i.addEventListener("click",t=>t.preventDefault()));const a=K[n]||(K[n]=new Set);e.querySelectorAll("details.entry").forEach((i,t)=>{var s;const o=i.dataset.k||((s=i.querySelector("summary .t"))==null?void 0:s.textContent)||t;a.has(o)&&(i.open=!0),i.addEventListener("toggle",()=>i.open?a.add(o):a.delete(o))})}function Ha(e,n,a,i){var v;const{cls:t,sub:o,level:s,classId:d,nomePersonalizado:c}=n;if(!t)return`<section class="card">Classe "${r(d)}" não encontrada no compêndio.</section>`;const $=c||t.nome,u=t.caracteristicas||[],h=u.filter(m=>m.nivel<=s),l=u.filter(m=>m.nivel>s),g=e.build.opcoes||[],w=d==="bruxo"?((v=a.spellCaps)==null?void 0:v.invocacoes)??null:null;return`
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Características de ${r($)}</h2><span class="lvl-badge">nível ${s}</span></div>
    ${c?`<p class="empty-note" style="margin:0">Usa as regras de ${r(t.nome)}.</p>`:""}
    ${h.length?h.map(m=>N(r(m.nome),`Nível ${m.nivel}`,j(m.desc))).join(""):'<p class="empty-note">Importe o compêndio completo para ver as características.</p>'}
    ${l.length?`<details class="entry"><summary><span class="t muted">Próximos níveis (${l.length})</span></summary><div class="body stack">
      ${l.map(m=>N(r(m.nome),`Nível ${m.nivel}`,j(m.desc))).join("")}</div></details>`:""}
  </section>
  ${(t.opcoes||[]).map(m=>{const S=d==="bruxo"&&/Invoca/i.test(m.titulo),k=S?m.itens.filter(y=>g.includes(y.id)).length:null,A=S&&w!==null&&k>=w;return`<section class="card stack"><div class="sectiontitle"><h2 style="margin:0">${r(m.titulo.replace("Opções de ",""))} (${r($)})</h2>${S&&w!==null?`<span class="lvl-badge">${k}/${w}</span>`:""}</div>
    ${m.itens.filter(y=>g.includes(y.id)).map(y=>N("✓ "+r(y.nome),"",j(y.desc)+`<button class="btn small" data-unop="${y.id}">Remover</button>`)).join("")||'<p class="empty-note">Nenhuma escolhida.</p>'}
    <details class="entry"><summary><span class="t">Escolher ${r(m.titulo.replace("Opções de ","").toLowerCase())}</span><span class="lvl-badge">${m.itens.length}</span></summary><div class="body stack">
      ${m.itens.filter(y=>!g.includes(y.id)).map(y=>N(r(y.nome),"",j(y.desc),!1,`data-k="o-${d}-${y.id}"`,A?'<button class="btn small" data-opfull="1" aria-label="Limite de invocações atingido">+</button>':Y("data-op",y.id,"Escolher "+r(y.nome)))).join("")}
    </div></details></section>`}).join("")}
  <section class="card stack"><h2>Subclasse de ${r($)}${o?": "+r(o.nome):""}</h2>
    ${o?(o.caracteristicas||[]).map(m=>N(`${m.nivel>s?"🔒 ":""}${r(m.nome)}`,`Nível ${m.nivel}`,j(m.desc))).join(""):`<p class="empty-note">${s<3?"A subclasse é escolhida no nível 3.":"Escolha a subclasse na aba Ficha (ou em Multiclasse, para uma classe secundária)."}</p>
         ${(t.subclasses||[]).map(m=>N(r(m.nome),"",j(m.intro))).join("")}`}
  </section>`}function Va(e,n,a){const i=n.sp,t=n.bg,o=n.speciesLabel||(i==null?void 0:i.nome)||"espécie";return`
  ${n.classesInfo.map(s=>Ha(e,s,n)).join("")}
  <section class="card stack"><h2>Traços de ${r(o)}</h2>
    ${i&&o!==i.nome?`<p class="empty-note" style="margin:0">Usa as regras de ${r(i.nome)}.</p>`:""}
    <p class="empty-note">${r((i==null?void 0:i.tipo)||"")} · ${r((i==null?void 0:i.tamanho)||"")} · Deslocamento ${r((i==null?void 0:i.deslocamento)||"")}</p>
    ${((i==null?void 0:i.tracos)||[]).filter(s=>s.nome!=="Detalhes").map(s=>N(r(s.nome),"",j(s.desc))).join("")||'<p class="empty-note">Sem traços no compêndio.</p>'}
  </section>
  ${t?`<section class="card stack"><h2>Antecedente: ${r(t.nome)}</h2>
    <p style="margin:0;font-size:.92rem"><b>Atributos:</b> ${t.atributos.map(s=>ba[s]).join(", ")}<br>
    <b>Talento:</b> ${r(t.talento)}<br><b>Ferramenta:</b> ${r(t.ferramenta)}<br><b>Equipamento:</b> ${r(t.equipamento)}</p></section>`:""}
  ${e.build.customNote?`<section class="card stack"><h2>Notas da personalização</h2><p style="margin:0;white-space:pre-wrap">${r(e.build.customNote)}</p></section>`:""}`}function Ra(e,n,a){const i=a.app,t=e.build.opcoes||[];i.querySelectorAll("[data-op]").forEach(o=>o.onclick=()=>a.save({"build.opcoes":[...t,o.dataset.op]})),i.querySelectorAll("[data-unop]").forEach(o=>o.onclick=()=>a.save({"build.opcoes":t.filter(s=>s!==o.dataset.unop)})),i.querySelectorAll("[data-opfull]").forEach(o=>o.onclick=()=>I("Limite de invocações místicas atingido. Use a exceção manual na aba Magias se for o caso.")),V(i,"classe")}const Fa=["Origem","Geral","Estilo de Luta","Dádiva Épica"];function Qa(e,n,a){const i=a.S,t=i.comp,o=i.ui,s=e.build.feats||[],d=z(o.featQ);let c=t.feats.filter(u=>(u.repetivel||!s.some(h=>h.id===u.id))&&(o.featCat==="all"||u.categoria===o.featCat)&&(!d||z(u.nome).includes(d)||z(u.prereq).includes(d)));const $=c.length;return c=c.slice(0,B),`
  <section class="card stack"><h2>Meus talentos</h2>
    ${s.length?s.map((u,h)=>{const l=t.byId.feats[u.id];return N(r((l==null?void 0:l.nome)||u.id),r(u.origem||(l==null?void 0:l.categoria)||""),(l?`<p class="empty-note">${r(l.categoria)}${l.prereq?" · Pré-requisito: "+r(l.prereq):""}</p>${j(l.desc)}`:'<p class="empty-note">Talento fora do compêndio.</p>')+`<button class="btn small" data-unfeat="${h}">Remover</button>`)}).join(""):'<p class="empty-note">Nenhum talento. Seu antecedente concede um talento de Origem.</p>'}
  </section>
  <section class="card stack"><h2>Biblioteca de talentos</h2>
    <input id="featq" type="search" placeholder="Buscar talento…" value="${r(o.featQ)}" aria-label="Buscar talento" />
    <div class="filters">${["all",...Fa].map(u=>`<button data-fcat="${u}" aria-pressed="${o.featCat===u}">${u==="all"?"Todos":u}</button>`).join("")}</div>
    <p class="empty-note">${$} talento(s)${$>B?` — mostrando ${B}`:""}.</p>
    ${c.map(u=>N(r(u.nome),r(u.categoria),`${u.prereq?`<p class="empty-note">Pré-requisito: ${r(u.prereq)}</p>`:""}${j(u.desc)}`,!1,`data-k="f-${u.id}"`,Y("data-feat",u.id,"Adicionar "+r(u.nome)))).join("")}
    ${t.feats.length?"":'<p class="empty-note">Importe o compêndio completo para usar a biblioteca de talentos.</p>'}
  </section>`}function Ua(e,n,a){const i=a.S,t=a.app,o=e.build.feats||[];b("#featq").oninput=s=>{i.ui.featQ=s.target.value,M("fq",a.render,250)},t.querySelectorAll("[data-fcat]").forEach(s=>s.onclick=()=>{i.ui.featCat=s.dataset.fcat,a.render()}),t.querySelectorAll("[data-feat]").forEach(s=>s.onclick=()=>{a.save({"build.feats":[...o,{id:s.dataset.feat,origem:"Escolhido"}]}),a.toast("Talento adicionado. Aplique aumentos de atributo na aba Ficha, se houver.")}),t.querySelectorAll("[data-unfeat]").forEach(s=>s.onclick=()=>a.save({"build.feats":o.filter((d,c)=>c!==Number(s.dataset.unfeat))})),V(t,"feats")}function _a(e,n,a){const i=a.S,t=i.comp,o=i.ui,s=e.inventory||[],d=e.coins||{},c=z(o.itemQ),$=c.length>=2?t.items.filter(l=>z(l.nome).includes(c)).slice(0,25):[],u=Math.min(100,Math.round(n.weight/n.carry*100)),h=l=>l.tipo==="arma"?`${r(l.dano)} · ${r(l.propriedades)} · Maestria: ${r(l.maestria)}`:l.tipo==="armadura"?`CA ${r(l.ca)}${l.forca&&l.forca!=="—"?" · "+r(l.forca):""}${l.furtividade==="Desvantagem"?" · Desv. Furtividade":""}`:"";return`
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Bolsa de moedas</h2><span class="lvl-badge">≈ ${n.coinsGP.toLocaleString("pt-BR",{maximumFractionDigits:2})} PO</span></div>
    <div class="coins">${la.map(([l,g,w])=>`<label class="coin coin-${l}"><span>${g}</span>
      <input type="number" inputmode="numeric" min="0" data-coin="${l}" value="${Number(d[l])||0}" aria-label="${w}" /></label>`).join("")}</div>
    <form class="row" id="coinop">
      <input id="coinamt" type="number" inputmode="numeric" min="1" placeholder="Qtd." style="width:5.5rem" aria-label="Quantidade" />
      <select id="coinkind" style="width:5.5rem" aria-label="Moeda">${la.map(([l,g])=>`<option value="${l}" ${l==="po"?"selected":""}>${g}</option>`).join("")}</select>
      <button class="btn heal small" data-cop="+">Receber</button><button class="btn danger small" data-cop="-">Gastar</button>
    </form>
  </section>
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Inventário</h2><span class="lvl-badge">${n.weight.toLocaleString("pt-BR",{maximumFractionDigits:1})} / ${n.carry} kg</span></div>
    <div class="hpbar" aria-hidden="true"><div class="cur ${u>100?"low":u>75?"mid":""}" style="width:${u}%"></div></div>
    ${s.length?s.map(l=>{const g=l.itemId?t.byId.weapons[l.itemId]||t.byId.armor[l.itemId]||t.byId.gear[l.itemId]:null;return N(`${l.equipado?"🛡️ ":""}${r(l.nome)}${Number(l.qtd)>1?` <span class="muted">×${l.qtd}</span>`:""}`,r(l.peso||""),`${g?`<p class="empty-note">${h(g)}${g.custo?" · "+r(g.custo):""}</p>${g.desc?j(g.desc):""}`:""}
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
    ${$.map(l=>`<div class="libitem"><div class="info"><b>${r(l.nome)}</b><small>${r(l.custo||"")}${l.peso?" · "+r(l.peso):""} ${h(l)?"· "+h(l):""}</small></div>
      <button class="btn small primary" data-additem="${l.id}">+</button></div>`).join("")}
    ${c.length>=2&&!$.length?'<p class="empty-note">Nada encontrado — use o item personalizado abaixo.</p>':""}
    <form class="row" id="custom">
      <input id="cname" class="grow" placeholder="Item personalizado" required style="width:auto" aria-label="Nome do item" />
      <input id="cweight" placeholder="kg" inputmode="decimal" style="width:4.5rem" aria-label="Peso em kg" />
      <button class="btn small">Adicionar</button>
    </form>
  </section>`}function Ka(e,n,a){const i=a.S,t=a.app,o=i.comp,s=e.inventory||[],d={pc:0,pp:0,pe:0,po:0,pl:0,...e.coins||{}},c=u=>a.save({inventory:u});t.querySelectorAll("[data-coin]").forEach(u=>u.onchange=()=>a.save({coins:{...d,[u.dataset.coin]:Math.max(0,Number(u.value)||0)}})),t.querySelectorAll("[data-cop]").forEach(u=>u.onclick=h=>{h.preventDefault();const l=Number(b("#coinamt").value),g=b("#coinkind").value;if(!l)return a.toast("Digite a quantidade.");const w=d[g]+(u.dataset.cop==="+"?l:-l);if(w<0)return a.toast(`Não há ${l} ${g.toUpperCase()} suficientes.`);a.save({coins:{...d,[g]:w}})}),b("#itemq").oninput=u=>{i.ui.itemQ=u.target.value,M("iq",a.render,250)},t.querySelectorAll("[data-additem]").forEach(u=>u.onclick=()=>{const h=o.items.find(g=>g.id===u.dataset.additem),l=s.find(g=>g.itemId===h.id);c(l?s.map(g=>g===l?{...g,qtd:Number(g.qtd)+1}:g):[...s,{uid:ra(),itemId:h.id,nome:h.nome,qtd:1,peso:h.peso||"",equipado:!1,sintonizado:!1,notas:""}]),a.toast(`${h.nome} adicionado.`)}),b("#custom").onsubmit=u=>{u.preventDefault();const h=b("#cweight").value.trim();c([...s,{uid:ra(),itemId:null,nome:b("#cname").value.trim(),qtd:1,peso:h?`${h} kg`:"",equipado:!1,sintonizado:!1,notas:""}])};const $=(u,h)=>c(s.map(l=>l.uid===u?h(l):l));t.querySelectorAll("[data-qty]").forEach(u=>u.onclick=()=>$(u.dataset.qty,h=>({...h,qtd:Math.max(0,Number(h.qtd)+Number(u.dataset.d))}))),t.querySelectorAll("[data-equip]").forEach(u=>u.onchange=()=>$(u.dataset.equip,h=>({...h,equipado:u.checked}))),t.querySelectorAll("[data-attune]").forEach(u=>u.onchange=()=>{if(u.checked&&s.filter(h=>h.sintonizado).length>=3)return u.checked=!1,a.toast("Limite de 3 itens sintonizados.");$(u.dataset.attune,h=>({...h,sintonizado:u.checked}))}),t.querySelectorAll("[data-inote]").forEach(u=>u.oninput=()=>M("in"+u.dataset.inote,()=>$(u.dataset.inote,h=>({...h,notas:u.value})))),t.querySelectorAll("[data-rmitem]").forEach(u=>u.onclick=()=>c(s.filter(h=>h.uid!==u.dataset.rmitem))),V(t,"itens")}const Ga={ficha:{html:za,bind:La},magias:{html:Ba,bind:Oa},classe:{html:Va,bind:Ra},talentos:{html:Qa,bind:Ua},itens:{html:_a,bind:Ka}},E=b("#app"),f={be:null,comp:null,user:null,chId:null,ch:null,tab:"combate",amount:"",off:[],prevHp:null,ui:{spellQ:"",spellLvl:"all",spellMine:!0,featQ:"",featCat:"all",itemQ:"",libOpen:{}}},J=()=>`rpgmesa:last:${f.user.uid}`,R=()=>{f.off.forEach(e=>e()),f.off=[]},ua=Object.fromEntries(Aa.map(([e,n])=>[e,n])),G=Object.fromEntries(T);Wa().catch(e=>{E.innerHTML=`<div class="wrap"><div class="card">Erro ao iniciar: ${r(e.message)}</div></div>`});async function Wa(){f.be=await Ea(),Ca(f.be,E,{title:"Grimório do Aventureiro",subtitle:"Entre com sua conta para acessar seus personagens em qualquer aparelho.",onSignedOut:()=>{R(),f.ch=null,f.chId=null,f.prevHp=null}},async e=>{f.user=e,E.innerHTML='<p class="muted" style="padding:1rem">Carregando compêndio…</p>',f.comp=await Ia(f.be);const n=W.get(J());n?X(n):O()})}const va=()=>f.be.mode==="local"?'<p class="banner">Modo demo: os dados ficam neste navegador. Abra o Escudo em outra aba para testar a sincronização.</p>':"",Ya=()=>f.comp.completo?"":'<p class="banner">Biblioteca reduzida: o Mestre ainda não importou o compêndio completo no Escudo.</p>';function O(){R(),f.chId=null,f.ch=null,W.set(J(),null);let e=!1;f.off.push(f.be.watchMyCharacters(n=>{b("#build")||(n.sort((a,i)=>a.name.localeCompare(i.name)),E.innerHTML=`<header class="top"><div class="row"><div class="grow name">Meus personagens</div>
      <a class="btn small" href="./escudo.html" title="Ir para o Escudo do Mestre">🛡️ Escudo</a>${ma(f.user)}</div></header>
    <main class="wrap stack">${va()}${Ya()}
      ${n.map(a=>`<button class="charbtn" data-open="${a.id}">
        <span><b>${r(a.name)}</b><br><small class="muted">${r($a(a))}</small></span>
        <span class="chip">${a.campaignName?"🎲 "+r(a.campaignName):"Sem mesa"}</span></button>`).join("")}
      ${n.length?"":'<div class="card"><p style="margin:0">Você ainda não tem personagens. Crie o primeiro abaixo — ele fica salvo na sua conta.</p></div>'}
      <button class="btn primary" id="newchar" style="width:100%">+ Novo personagem</button>
    </main>`,pa(f.be,E),E.querySelectorAll("[data-open]").forEach(a=>a.onclick=()=>X(a.dataset.open)),b("#newchar").onclick=()=>Ja(),!n.length&&!e&&(e=!0))}))}function Ja(){R();const e=f.comp,n=[15,14,13,12,10,8];E.innerHTML=`<header class="top"><div class="row"><button class="btn small" id="back" aria-label="Voltar">◀</button><div class="grow name">Novo personagem</div></div></header>
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
  </form></main>`,b("#back").onclick=O;const a=b("#build"),i=()=>e.byId.classes[a.class.value],t=()=>{var v,m;return(m=e.byId.backgrounds)==null?void 0:m[(v=a.bg)==null?void 0:v.value]};function o(){var S;const v=i(),m=(S=v.periciasOpcoes)!=null&&S.length?v.periciasOpcoes:[];b("#classinfo").innerHTML=`
      <p class="muted" style="margin:.2rem 0;font-size:.88rem">Dado de Vida d${v.dadoVida} · Salvaguardas: ${(v.salvaguardas||[]).map(k=>G[k]).join(", ")}</p>
      ${m.length?`<div><label>Perícias da classe — escolha ${v.periciasEscolha} <span id="skcount"></span></label>
        <div class="checks">${m.map(k=>`<label class="chk"><input type="checkbox" name="sk" value="${k}"> ${ua[k]}</label>`).join("")}</div></div>`:""}`,a.querySelectorAll("[name=sk]").forEach(k=>k.onchange=s),s()}function s(){var A;const v=i(),m=((A=t())==null?void 0:A.pericias)||[],S=[...a.querySelectorAll("[name=sk]")];S.forEach(y=>{m.includes(y.value)&&(y.checked=!1,y.disabled=!0,y.parentElement.title="Já vem do antecedente")});const k=S.filter(y=>y.checked).length;S.forEach(y=>{m.includes(y.value)||(y.disabled=!y.checked&&k>=v.periciasEscolha)}),b("#skcount")&&(b("#skcount").textContent=`(${k}/${v.periciasEscolha})`)}function d(){const v=t();if(!v)return;const m=e.byId.feats[v.talentoId];b("#bginfo").innerHTML=`
      <p style="margin:.2rem 0;font-size:.9rem"><b>Perícias:</b> ${v.pericias.map(S=>ua[S]).join(", ")}<br>
      <b>Talento:</b> ${r((m==null?void 0:m.nome)||v.talento)}<br><b>Ferramenta:</b> ${r(v.ferramenta)}</p>
      <div class="row">
        <div class="grow"><label for="plus2">+2 em</label><select id="plus2">${v.atributos.map(S=>`<option value="${S}">${G[S]}</option>`).join("")}<option value="all">+1 nos três</option></select></div>
        <div class="grow" id="plus1wrap"><label for="plus1">+1 em</label><select id="plus1">${v.atributos.map((S,k)=>`<option value="${S}" ${k===1?"selected":""}>${G[S]}</option>`).join("")}</select></div>
      </div>
      <details class="entry"><summary><span class="t">Equipamento do antecedente</span></summary><div class="body">${r(v.equipamento)}</div></details>`,b("#plus2").onchange=b("#plus1").onchange=$,$(),s()}function c(){const v=t(),m={};if(!v)return m;const S=b("#plus2").value;if(S==="all")v.atributos.forEach(k=>m[k]=1);else{m[S]=2;const k=b("#plus1").value;k!==S&&(m[k]=(m[k]||0)+1)}return m}function $(){const v=c();b("#plus1wrap")&&(b("#plus1wrap").style.visibility=b("#plus2").value==="all"?"hidden":""),a.querySelectorAll(".abfinal").forEach(m=>{const S=m.dataset.ab,k=Math.min(20,Number(a[S].value)+(v[S]||0));m.textContent=v[S]?`→ ${k} (${P(ia(k))})`:`(${P(ia(k))})`})}const u=27,h={8:0,9:1,10:2,11:3,12:4,13:5,14:7,15:9},l=v=>h[v]??0;let g="array";function w(){const v=g==="buy";if(b("#ab-inputs").innerHTML=T.map(([m,S],k)=>{const A=document.getElementById("ab-"+m),y=A?A.value:v?8:n[k];return`<div><label for="ab-${m}">${S} <b class="abfinal" data-ab="${m}"></b></label>
        <div class="row" style="align-items:center;gap:.4rem;flex-wrap:nowrap">
          ${v?`<button type="button" class="btn small" data-abdown="${m}" aria-label="Diminuir ${S}">−</button>`:""}
          <input id="ab-${m}" name="${m}" type="number" inputmode="numeric" min="${v?8:3}" max="${v?15:20}"
            value="${y}" ${v?'readonly style="width:3.5rem;text-align:center"':""} />
          ${v?`<button type="button" class="btn small" data-abup="${m}" aria-label="Aumentar ${S}">+</button>`:""}
        </div></div>`}).join(""),v){const m=T.reduce((k,[A])=>k+l(Number(a[A].value)),0),S=u-m;b("#abpts").style.display="",b("#abpts").textContent=`${S} de ${u} pontos restantes`,a.querySelectorAll("[data-abup]").forEach(k=>k.onclick=()=>{const A=k.dataset.abup,y=Number(a[A].value);if(!(y>=15)){if(m+(l(y+1)-l(y))>u)return I("Sem pontos suficientes.");a[A].value=y+1,w()}}),a.querySelectorAll("[data-abdown]").forEach(k=>k.onclick=()=>{const A=k.dataset.abdown,y=Number(a[A].value);y<=8||(a[A].value=y-1,w())})}else b("#abpts").style.display="none",T.forEach(([m])=>a[m].oninput=$);$()}E.querySelectorAll("[data-abmode]").forEach(v=>v.onclick=()=>{v.dataset.abmode!==g&&(g=v.dataset.abmode,E.querySelectorAll("[data-abmode]").forEach(m=>m.setAttribute("aria-selected",String(m.dataset.abmode===g))),b("#abmode-help").textContent=g==="buy"?`Compra de pontos: comece com 8 em tudo e gaste os ${u} pontos (custo 9=1, 10=2, 11=3, 12=4, 13=5, 14=7, 15=9). Máximo 15 antes dos bônus do antecedente.`:"Valores base (Array Padrão: 15, 14, 13, 12, 10, 8). Edite livremente, se preferir. O bônus do antecedente é somado automaticamente.",T.forEach(([m],S)=>{const k=document.getElementById("ab-"+m);k&&(k.value=g==="buy"?8:n[S])}),w())}),a.class.onchange=o,a.bg&&(a.bg.onchange=d),o(),d(),w(),a.onsubmit=async v=>{var A;v.preventDefault();const m=c(),S=Object.fromEntries(T.map(([y])=>[y,Math.min(20,Number(a[y].value)+(m[y]||0))])),k=Na({name:a.name.value.trim(),ownerUid:f.user.uid,speciesId:a.species.value,classId:a.class.value,level:Number(a.level.value),abilities:S,backgroundId:((A=a.bg)==null?void 0:A.value)||null,skillProfs:[...a.querySelectorAll("[name=sk]:checked")].map(y=>y.value),speciesNomePersonalizado:a.speciesnome.value.trim()||null,classNomePersonalizado:a.classnome.value.trim()||null,customNote:a.customnote.value.trim()},e);try{X(await f.be.createCharacter(k))}catch(y){I(y.message)}}}const $a=e=>`${ja(e.build,f.comp)} · ${Ma(e.build,f.comp)}`;function X(e){R(),f.chId=e,f.prevHp=null,W.set(J(),e),f.off.push(f.be.watchCharacter(e,n=>{if(!n)return O();const a=f.prevHp;if(f.prevHp=n.state.hp.current+n.state.hp.temp,f.ch=n,Z(),a!=null&&a!==f.prevHp){const i=b("#hpcard");i==null||i.classList.add(f.prevHp<a?"flash-dmg":"flash-heal"),navigator.vibrate&&f.prevHp<a&&navigator.vibrate(80)}}))}const Xa=[["combate","❤️","Combate"],["ficha","📜","Ficha"],["magias","✨","Magias"],["classe","🛡️","Traços"],["talentos","⭐","Talentos"],["itens","🎒","Itens"]],D={get S(){return f},app:E,render:()=>Z(),save:e=>f.be.updateCharacter(f.chId,e).catch(n=>I(n.message)),toast:I,showHome:()=>O(),confirmTwice:Za,accountChip:ma,bindLogout:pa};function Z(){const e=f.ch,n=xa(e,f.comp),a=document.activeElement,i=a==null?void 0:a.id,t=a&&"selectionStart"in a?[a.selectionStart,a.selectionEnd]:null,o=window.scrollY,s={combate:{html:ae,bind:ee},...Ga},d=s[f.tab]||s.combate;if(E.innerHTML=`
    <header class="top">
      <div class="row"><button class="btn small" id="home" aria-label="Meus personagens">◀</button>
        <div class="grow"><div class="name">${r(e.name)}</div>
        <div class="mini"><span>${r($a(e))}</span>${e.campaignName?`<span>🎲 ${r(e.campaignName)}</span>`:""}</div></div>
        <div class="mini"><span>CA <b>${e.build.ac??10}</b></span><span>PV <b>${e.state.hp.current}/${e.state.hp.max}</b></span></div>
        <a class="btn small" href="./escudo.html" title="Ir para o Escudo do Mestre">🛡️</a></div>
    </header>
    <main class="wrap stack">${va()}${d.html(e,n,D)}</main>
    <nav class="tabs" role="tablist">${Xa.map(([c,$,u])=>`<button role="tab" aria-selected="${f.tab===c}" data-tab="${c}"><span class="ico" aria-hidden="true">${$}</span>${u}</button>`).join("")}</nav>`,E.querySelectorAll("[data-tab]").forEach(c=>c.onclick=()=>{f.tab=c.dataset.tab,Z(),window.scrollTo(0,0)}),b("#home").onclick=O,d.bind(e,n,D),window.scrollTo(0,o),i){const c=document.getElementById(i);if(c&&(c.focus({preventScroll:!0}),t&&"setSelectionRange"in c))try{c.setSelectionRange(...t)}catch{}}}function Za(e,n){const a=b(e);if(a.dataset.armed)return!0;a.dataset.armed="1";const i=a.textContent;return a.textContent=n,setTimeout(()=>{a.isConnected&&(delete a.dataset.armed,a.textContent=i)},3e3),!1}function ae(e,n){const{hp:a,deathSaves:i={success:0,fail:0},conditions:t=[],dead:o}=e.state,s=a.max+a.temp,d=Math.round(a.current/s*100),c=Math.round(a.temp/s*100),$=a.current/a.max>.5?"":a.current/a.max>.25?"mid":"low",u=a.current===0&&!o,h=e.state.concentration?f.comp.byId.spells[e.state.concentration]:null;return`
  <section class="card stack" id="hpcard">
    <div class="hp-big"><div class="num">${a.current}<small> / ${a.max}</small></div>
      ${a.temp?`<div class="tmpv">+${a.temp} temporários</div>`:""}
      ${o?'<div class="chip bad" style="margin-top:.4rem">MORTO</div>':""}</div>
    <div class="hpbar" aria-hidden="true"><div class="cur ${$}" style="width:${d}%"></div><div class="tmp" style="width:${c}%"></div></div>
    <input id="amount" class="amount" type="number" inputmode="numeric" min="0" placeholder="0" value="${r(f.amount)}" aria-label="Valor" />
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
    <div><b>${P(n.initiative)}</b><small>Iniciativa</small></div>
    <div><b>${r(n.speed.replace(" metros"," m"))}</b><small>Deslocamento</small></div>
    <div><b>${n.passivePerception}</b><small>Perc. passiva</small></div>
  </div></section>
  ${h?`<p class="banner">Concentrando em: <b>${r(h.nome)}</b> <button class="btn small" id="endconc" style="margin-left:.5rem">Encerrar</button></p>`:""}
  ${u?`<section class="card stack"><h2>Testes contra a morte</h2>
    <div class="saves"><div><small class="muted">Sucessos</small><div class="pips">${[0,1,2].map(l=>`<span class="pip ${l<i.success?"s":""}"></span>`).join("")}</div></div>
      <div><small class="muted">Falhas</small><div class="pips">${[0,1,2].map(l=>`<span class="pip ${l<i.fail?"f":""}"></span>`).join("")}</div></div></div>
    <button class="btn primary" id="roll-death" style="width:100%">Rolar d20</button></section>`:""}
  <section class="card stack"><h2>Condições</h2>
    <div class="row">${t.map(l=>`<button class="chip bad" data-rmcond="${l}" aria-label="Remover ${l}">${na[l]||l} ✕</button>`).join("")||'<span class="muted">Nenhuma</span>'}</div>
    <div class="row"><select id="addcond" class="grow" aria-label="Adicionar condição"><option value="">Adicionar condição…</option>
      ${Pa.filter(l=>!t.includes(l)).map(l=>`<option value="${l}">${na[l]||l}</option>`).join("")}</select></div>
  </section>
  <section class="card stack"><h2>Descanso</h2>
    ${(e.state.hitDice.byClass||[]).length>1?e.state.hitDice.byClass.map(l=>{const g=f.comp.byId.classes[l.classId];return`<div class="row" style="justify-content:space-between"><span class="muted">${r((g==null?void 0:g.nome)||l.classId)}: ${l.max-l.used}/${l.max} (d${l.die})</span>
            <button class="btn small" data-shortclass="${l.classId}">Gastar</button></div>`}).join(""):`<p class="muted" style="margin:0">Dados de Vida: ${e.state.hitDice.max-e.state.hitDice.used}/${e.state.hitDice.max} (d${e.state.hitDice.die})</p>
         <div class="row"><button class="btn grow" id="short">Gastar 1 Dado de Vida</button></div>`}
    <div class="row"><button class="btn grow" id="long">Descanso Longo</button></div>
  </section>
  <section class="card"><h2>Registro</h2><ul class="log">${(e.state.log||[]).map(l=>`<li>${r(l)}</li>`).join("")||"<li>—</li>"}</ul></section>`}function ee(e,n){const a=b("#amount");a.oninput=()=>f.amount=a.value,E.querySelectorAll("[data-q]").forEach(t=>t.onclick=()=>{f.amount=t.dataset.q==="C"?"":String((Number(f.amount)||0)+Number(t.dataset.q)),a.value=f.amount}),E.querySelectorAll("[data-act]").forEach(t=>t.onclick=async()=>{const o=Number(f.amount);if(!o)return I("Digite um valor.");const s={resistant:b("#o-res").checked,vulnerable:b("#o-vul").checked,critical:b("#o-crit").checked};f.amount="";const d=await U(f.be,f.chId,t.dataset.act,o,s,e.name);d.concentrationDC&&e.state.concentration?I(`Teste de Concentração: CD ${d.concentrationDC}`):d.log.length&&I(d.log.at(-1))}),b("#endconc")&&(b("#endconc").onclick=()=>D.save({"state.concentration":null})),b("#roll-death")&&(b("#roll-death").onclick=async()=>{const t=ca("1d20").total,o=await U(f.be,f.chId,"morte",t,{},e.name);I(`d20 = ${t}. ${o.log.at(-1)??""}`)}),E.querySelectorAll("[data-rmcond]").forEach(t=>t.onclick=()=>D.save({"state.conditions":e.state.conditions.filter(o=>o!==t.dataset.rmcond)})),b("#addcond").onchange=t=>t.target.value&&D.save({"state.conditions":[...e.state.conditions,t.target.value]});const i=async(t,o)=>{const s=ca(`1d${t}`).total+n.mods.con;await o();const d=await U(f.be,f.chId,"cura",Math.max(0,s),{},e.name);I(`Dado de Vida: ${s}. ${d.log[0]??""}`)};b("#short")&&(b("#short").onclick=()=>{const t=e.state.hitDice;if(t.used>=t.max)return I("Sem Dados de Vida disponíveis.");i(t.die,()=>D.save({"state.hitDice.used":t.used+1}))}),E.querySelectorAll("[data-shortclass]").forEach(t=>t.onclick=()=>{const o=e.state.hitDice.byClass,s=o.findIndex($=>$.classId===t.dataset.shortclass),d=o[s];if(d.used>=d.max)return I("Sem Dados de Vida dessa classe.");const c=o.map(($,u)=>u===s?{...$,used:$.used+1}:$);i(d.die,()=>D.save({"state.hitDice.byClass":c,"state.hitDice.used":c.reduce(($,u)=>$+u.used,0)}))}),b("#long").onclick=async()=>{const t=Object.fromEntries(Object.entries(e.state.spellSlots||{}).map(([d,c])=>[d,{...c,used:0}])),o=Object.fromEntries(Object.entries(e.state.pactSlots||{}).map(([d,c])=>[d,{...c,used:0}])),s=(e.state.hitDice.byClass||[]).map(d=>({...d,used:0}));await D.save({"state.hp":{...e.state.hp,current:e.state.hp.max,temp:0},"state.spellSlots":t,"state.pactSlots":o,"state.hitDice":{...e.state.hitDice,byClass:s,used:0},"state.deathSaves":{success:0,fail:0},"state.conditions":e.state.conditions.filter(d=>!["inconsciente","estabilizado"].includes(d))}),I("Descanso longo concluído.")}}
