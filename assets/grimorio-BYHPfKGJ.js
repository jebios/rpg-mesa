import"./pwa-DyPmJtBq.js";import{e as i,A as D,$ as b,j as oa,t as I,f as P,k as _,m as qa,n as na,o as Aa,q as Ea,w as Ca,S as Ia,g as Na,r as ja,l as Ma,s as Y,a as pa,b as ba,x as xa,y as Pa,c as za,d as Da,C as ia,h as Ta,i as K,z as ca}from"./auth-DOHMb5a3.js";function ra(e){const o=String(e).replace(/\s/g,"").match(/^(\d*)d(\d+)([+-]\d+)?$/i);if(!o)return null;const a=Number(o[1]||1),d=Number(o[2]),t=Number(o[3]||0),n=Array.from({length:a},()=>1+Math.floor(Math.random()*d));return{rolls:n,bonus:t,total:n.reduce((s,m)=>s+m,0)+t}}const L=e=>i(e).replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>").replace(/(^|\s)_([^_]+)_(?=\s|$|[.,;:])/g,"$1<i>$2</i>");function j(e){if(!e)return"";const o=[];for(const a of String(e).split(/\n\n+/)){const d=a.split(`
`);if(d.every(t=>t.startsWith("| "))){o.push('<div class="mdtable"><table>'+d.map(t=>"<tr>"+t.slice(2).split(" | ").map(n=>`<td>${L(n)}</td>`).join("")+"</tr>").join("")+"</table></div>");continue}for(const t of d)t.startsWith("#### ")?o.push(`<h5>${L(t.slice(5))}</h5>`):t.startsWith("### ")?o.push(`<h4>${L(t.slice(4))}</h4>`):t.startsWith("| ")?o.push('<div class="mdtable"><table><tr>'+t.slice(2).split(" | ").map(n=>`<td>${L(n)}</td>`).join("")+"</tr></table></div>"):t.startsWith("• ")?o.push(`<p class="bullet">${L(t)}</p>`):o.push(`<p>${L(t)}</p>`)}return`<div class="md">${o.join("")}</div>`}const T=e=>String(e||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(),va=Object.fromEntries(D),B=40,V=e=>e===0?"Truque":`${e}º círculo`,da=()=>Math.random().toString(36).slice(2,9),N=(e,o,a,d=!1,t="",n="")=>`<details class="entry" ${d?"open":""} ${t}><summary><span class="t">${e}</span><span class="row" style="gap:.4rem;flex-wrap:nowrap"><span class="lvl-badge">${o||""}</span>${n}</span></summary><div class="body">${a}</div></details>`,J=(e,o,a="Adicionar")=>`<button class="btn small primary addbtn" ${e}="${o}" aria-label="${a}">+</button>`;function La(e,o,a){const d=a.S,t=d.comp,n=new Set(e.build.classes.map(r=>r.classId)),s=t.classes.filter(r=>!n.has(r.id)),m=o.classesInfo.slice(1);return`
  <section class="card stack"><h2>Multiclasse</h2>
    <p class="empty-note" style="margin:0">Nível total: ${o.level}/20. Ao multiclassar, confira na aba Traços quais proficiências a nova classe concede (são menos do que na criação) e ajuste "Treinamento e Proficiências" à mão, se precisar.</p>
    ${m.length?m.map(r=>{var u,g,l,y,k;const $=((u=r.cls)==null?void 0:u.subclasses)||[];return`<div class="row" style="flex-wrap:wrap;gap:.5rem;border-top:1px solid var(--border,#3332);padding-top:.5rem">
        <b class="grow">${i(((g=r.cls)==null?void 0:g.nome)||r.classId)}</b>
        <div class="row" style="gap:.3rem"><button class="btn small" data-mcdown="${r.classId}" aria-label="Diminuir nível de ${i(((l=r.cls)==null?void 0:l.nome)||r.classId)}">−</button>
          <span style="min-width:1.4rem;text-align:center">${r.level}</span>
          <button class="btn small" data-mcup="${r.classId}" aria-label="Subir nível de ${i(((y=r.cls)==null?void 0:y.nome)||r.classId)}">+</button></div>
        ${$.length?`<select data-mcsub="${r.classId}" aria-label="Subclasse de ${i(((k=r.cls)==null?void 0:k.nome)||r.classId)}" ${r.level<3?"disabled":""}>
          <option value="">—</option>${$.map(v=>`<option value="${v.id}" ${v.id===r.subclassId?"selected":""}>${i(v.nome)}</option>`).join("")}</select>`:""}
        <button class="btn small danger" data-mcrm="${r.classId}">Remover</button>
      </div>`}).join(""):'<p class="empty-note">Personagem de classe única.</p>'}
    ${s.length&&o.level<20?`<form class="row" id="addclass">
      <select id="mcnew" class="grow" aria-label="Nova classe">${s.map(r=>`<option value="${r.id}">${i(r.nome)}</option>`).join("")}</select>
      <button class="btn primary small">+ Adicionar classe</button></form>`:""}
  </section>`}function Ba(e,o,a){const d=a.S,t=a.app;t.querySelectorAll("[data-mcup]").forEach(n=>n.onclick=()=>{const s=e.build.classes.find(m=>m.classId===n.dataset.mcup);a.save(na(e,d.comp,n.dataset.mcup,s.level+1))}),t.querySelectorAll("[data-mcdown]").forEach(n=>n.onclick=()=>{const s=e.build.classes.find(m=>m.classId===n.dataset.mcdown);if(s.level<=1)return a.toast('Nível mínimo 1 — use "Remover" para tirar a classe.');a.save(na(e,d.comp,n.dataset.mcdown,s.level-1))}),t.querySelectorAll("[data-mcsub]").forEach(n=>n.onchange=()=>a.save(Aa(e,d.comp,n.dataset.mcsub,n.value||null))),t.querySelectorAll("[data-mcrm]").forEach(n=>n.onclick=()=>{if(!a.confirmTwice(`[data-mcrm="${n.dataset.mcrm}"]`,"Toque de novo para remover"))return;const s=Ea(e,d.comp,n.dataset.mcrm);s&&a.save(s)}),b("#addclass")&&(b("#addclass").onsubmit=n=>{n.preventDefault();const s=Ca(e,d.comp,b("#mcnew").value);s&&(a.save(s),a.toast("Classe adicionada no nível 1."))})}function Oa(e,o,a){var r,$,u,g,l,y;const d=a.S,t=e.build.classes[0].level,n=e.build.classes[0],s=((r=o.cls)==null?void 0:r.subclasses)||[],m=e.build.training||{};return`
  <section class="card stack">
    <div class="sectiontitle"><h2 style="margin:0">${o.multiclass?`${i(n.nomePersonalizado||(($=o.cls)==null?void 0:$.nome)||"")} ${t}`:`Nível ${t}`}</h2>
      <div class="row"><button class="btn small" id="lvldown" aria-label="Diminuir nível">−</button><button class="btn small primary" id="lvlup" aria-label="Subir de nível">+ Nível</button></div></div>
    ${o.multiclass?`<p class="empty-note" style="margin:0">Classe principal (foi ela que deu o 1º dado de vida cheio). Nível total do personagem: ${o.level}.</p>`:""}
    ${s.length?`<div><label for="subclass">Subclasse${t<3?" (a partir do nível 3)":""}</label>
      <select id="subclass" ${t<3?"disabled":""}><option value="">—</option>${s.map(k=>`<option value="${k.id}" ${k.id===n.subclassId?"selected":""}>${i(k.nome)}</option>`).join("")}</select></div>`:""}
    <div class="stats">
      <div><b>${P(o.pb)}</b><small>Proficiência</small></div>
      <div><b>${P(o.initiative)}</b><small>Iniciativa</small></div>
      <div><b>${i(o.speed.replace(" metros"," m"))}</b><small>Deslocamento</small></div>
      <div><b>${o.passivePerception}</b><small>Perc. passiva</small></div>
    </div>
    <div class="row"><label for="ac" style="margin:0">Classe de Armadura</label>
      <input id="ac" type="number" inputmode="numeric" style="width:6rem" value="${e.build.ac??10}" /></div>
    <div class="row"><label for="hpmax" style="margin:0">PV Máximo</label>
      <input id="hpmax" type="number" inputmode="numeric" min="1" style="width:6rem" value="${e.state.hp.max}" /></div>
    <p class="empty-note" style="margin:0">O PV máximo pode ser ajustado à mão — use o valor rolado no dado com o Mestre. Ao subir de nível, o app só soma o ganho médio da regra a esse valor.</p>
  </section>

  ${La(e,o,a)}

  <section class="card stack"><h2>Personalização de espécie/classe</h2>
    <p class="empty-note" style="margin:0">Pra jogar uma espécie ou classe alternativa/homebrew, dê um nome personalizado aqui — os números continuam vindo da opção escolhida na criação (${i(((u=o.sp)==null?void 0:u.nome)||"")} / ${i(((g=o.cls)==null?void 0:g.nome)||"")}).</p>
    <div class="row">
      <div class="grow"><label for="pz-sp">Nome da espécie</label>
        <input id="pz-sp" maxlength="60" placeholder="${i(((l=o.sp)==null?void 0:l.nome)||"")}" value="${i(e.build.speciesNomePersonalizado||"")}" /></div>
      <div class="grow"><label for="pz-cl">Nome da classe</label>
        <input id="pz-cl" maxlength="60" placeholder="${i(((y=o.cls)==null?void 0:y.nome)||"")}" value="${i(n.nomePersonalizado||"")}" /></div>
    </div>
    <div><label for="pz-note">Notas da personalização</label>
      <textarea id="pz-note" rows="2" placeholder="O que muda nessa versão (aparência, traços trocados…)">${i(e.build.customNote||"")}</textarea></div>
  </section>

  <section class="card stack"><h2>Atributos e Salvaguardas</h2>
    <p class="empty-note">Toque em <b>Salvaguarda</b> para marcar/desmarcar proficiência.</p>
    <div class="abil2">${D.map(([k,v])=>{const p=(e.build.saveProfs||[]).includes(k);return`<div class="abcard">
        <small>${v}</small><b>${P(o.mods[k])}</b>
        <input class="abscore" data-score="${k}" type="number" inputmode="numeric" min="1" max="30" value="${e.build.abilities[k]}" aria-label="Valor de ${v}" />
        <button class="savebtn ${p?"on":""}" data-save="${k}" aria-pressed="${p}">
          <span class="dot ${p?"on":""}"></span>Salvaguarda <b>${P(o.saves[k])}</b></button>
      </div>`}).join("")}</div>
  </section>

  <section class="card"><h2>Perícias</h2><p class="empty-note">Toque para alternar: sem proficiência → proficiente (●) → especialista (◆).</p>
    <div class="skills">${o.skills.map(k=>`<button data-skill="${k.id}" aria-pressed="${k.prof||k.exp}">
      <span class="row" style="flex-wrap:nowrap"><span class="dot ${k.exp?"exp":k.prof?"on":""}"></span>${k.nome} <small class="muted">(${k.ab.toUpperCase()})</small></span><b>${P(k.bonus)}</b></button>`).join("")}</div>
  </section>

  <section class="card stack"><h2>Treinamento e Proficiências</h2>
    ${[["armaduras","Treinamento com Armaduras"],["armas","Proficiência com Armas"],["ferramentas","Proficiência com Ferramentas"],["idiomas","Idiomas"]].map(([k,v])=>`<div><label for="tr-${k}">${v}</label><textarea id="tr-${k}" data-train="${k}" rows="2">${i(m[k]||"")}</textarea></div>`).join("")}
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
    <div class="row">${a.accountChip(d.user)}</div>
    <button class="btn danger small" id="delete">Apagar personagem</button>
  </section>`}let ua={};const M=(e,o,a=600)=>{clearTimeout(ua[e]),ua[e]=setTimeout(o,a)};function Ha(e,o,a){const d=a.S,t=a.app,n=e.build.classes[0].level;b("#lvlup").onclick=()=>o.level<20&&a.save(_(e,d.comp,n+1)).then(()=>a.toast(`Nível ${n+1}! PV máximo, Dados de Vida e espaços atualizados.`)),b("#lvldown").onclick=()=>n>1&&a.save(_(e,d.comp,n-1)),b("#subclass")&&(b("#subclass").onchange=s=>a.save(_(e,d.comp,n,s.target.value||null))),Ba(e,o,a),b("#pz-sp").oninput=s=>M("pzsp",()=>a.save({"build.speciesNomePersonalizado":s.target.value.trim()||null})),b("#pz-cl").oninput=s=>M("pzcl",()=>{const m=e.build.classes.map((r,$)=>$===0?{...r,nomePersonalizado:b("#pz-cl").value.trim()||null}:r);a.save({"build.classes":m})}),b("#pz-note").oninput=s=>M("pznote",()=>a.save({"build.customNote":s.target.value})),b("#ac").onchange=s=>a.save({"build.ac":Number(s.target.value)||10}),b("#hpmax").onchange=s=>{const m=Math.max(1,Number(s.target.value)||1);a.save({"state.hp":{...e.state.hp,max:m,current:Math.min(e.state.hp.current,m)}})},t.querySelectorAll("[data-score]").forEach(s=>s.onchange=()=>{const m=Math.max(1,Math.min(30,Number(s.value)||10)),r=s.dataset.score,$={[`build.abilities.${r}`]:m};r==="con"&&($["state.hp"]={...e.state.hp,...qa(e,d.comp,m)}),a.save($)}),t.querySelectorAll("[data-save]").forEach(s=>s.onclick=()=>{const m=s.dataset.save,r=e.build.saveProfs||[];a.save({"build.saveProfs":r.includes(m)?r.filter($=>$!==m):[...r,m]})}),t.querySelectorAll("[data-skill]").forEach(s=>s.onclick=()=>{const m=s.dataset.skill,r=e.build.skillProfs||[],$=e.build.expertise||[];$.includes(m)?a.save({"build.expertise":$.filter(u=>u!==m),"build.skillProfs":r.filter(u=>u!==m)}):r.includes(m)?a.save({"build.expertise":[...$,m]}):a.save({"build.skillProfs":[...r,m]})}),t.querySelectorAll("[data-train]").forEach(s=>s.oninput=()=>M("tr"+s.dataset.train,()=>a.save({[`build.training.${s.dataset.train}`]:s.value}))),b("#notes").oninput=s=>M("notes",()=>a.save({notes:s.target.value})),a.bindLogout(d.be,t),b("#join")&&(b("#join").onsubmit=async s=>{s.preventDefault();try{const m=await d.be.joinByCode(b("#code").value);await d.be.updateCharacter(d.chId,{campaignId:m.id,campaignName:m.name}),a.toast(`${e.name} entrou na mesa ${m.name}.`)}catch(m){a.toast(m.message)}}),b("#leave-table")&&(b("#leave-table").onclick=()=>{a.confirmTwice("#leave-table","Toque de novo para confirmar")&&a.save({campaignId:null,campaignName:null})}),b("#delete").onclick=async()=>{if(!a.confirmTwice("#delete",`Toque de novo para apagar ${e.name}`))return;const s=d.chId;await d.be.deleteCharacter(s),a.showHome()}}function Va(e,o,a){const d=a.S,t=d.comp,n=d.ui,s=new Set(o.bonusSpells||[]),m=(e.build.spellsKnown||[]).filter(c=>!s.has(c)),r=e.build.spellsPrepared||[],$=[...s].map(c=>t.byId.spells[c]).filter(Boolean).sort((c,q)=>c.nivel-q.nivel||c.nome.localeCompare(q.nome)),u=Object.entries(e.state.spellSlots||{}),g=Object.entries(e.state.pactSlots||{}),l=[...u,...g].reduce((c,[q,C])=>C.max>0?Math.max(c,Number(q)):c,0),y=o.casters.length>0,k=m.map(c=>t.byId.spells[c]).filter(Boolean).sort((c,q)=>c.nivel-q.nivel||c.nome.localeCompare(q.nome)),v={};k.forEach(c=>{var q;return(v[q=c.nivel]||(v[q]=[])).push(c)});const p=e.build.classes.map(c=>c.classId),S=o.classesInfo.map(c=>{var q;return(q=c.cls)==null?void 0:q.nome}).filter(Boolean).join(" + "),f=o.spellCaps||{},A=k.filter(c=>c.nivel===0).length,w=k.filter(c=>c.nivel>0).length,ea=r.length,fa=f.cantrips!==null&&A>=f.cantrips,ga=f.known!==null&&w>=f.known,ya=f.prepared!==null&&ea>=f.prepared,sa=T(n.spellQ);let H=t.spells.filter(c=>!m.includes(c.id)&&!s.has(c.id)&&(!n.spellMine||!o.casters.length||c.classes.some(q=>p.includes(q)))&&(n.spellLvl==="all"||String(c.nivel)===n.spellLvl)&&(!sa||T(c.nome).includes(sa)));const ta=H.length;H=H.slice(0,B);const wa=c=>(c.nivel===0?fa:ga)?`<button class="btn small" data-learnfull="${c.nivel===0?"truque":"magia"}" aria-label="Limite atingido">+</button>`:J("data-learn",c.id,"Adicionar "+i(c.nome)),ka=c=>{const q=r.includes(c.id);return!q&&ya?'<button class="btn small" data-prepfull="1" aria-label="Limite de magias preparadas atingido">Preparar</button>':`<button class="btn small" data-prep="${c.id}">${q?"✓ Preparada":"Preparar"}</button>`},la=(c,q)=>`
    <div class="muted" style="font-size:.85rem">${i(c.escola)} · ${i(c.tempo)} · ${i(c.alcance)}<br>${i(c.componentes)} · ${i(c.duracao)}</div>
    ${j(c.desc)}
    <div class="row">${q?`${c.nivel>0?ka(c):""}
         ${c.concentracao?`<button class="btn small" data-conc="${c.id}">${e.state.concentration===c.id?"Encerrar concentração":"Concentrar"}</button>`:""}
         <button class="btn small" data-forget="${c.id}">Remover</button>`:""}</div>`,Q=c=>[c.concentracao?"C":"",c.ritual?"R":""].filter(Boolean).map(q=>`<span class="chip">${q}</span>`).join(" "),U=(c,q,C)=>C===null?"":`<span class="lvl-badge">${q}/${C} ${c}</span>`,Sa=c=>`
    <div class="muted" style="font-size:.85rem">${i(c.escola)} · ${i(c.tempo)} · ${i(c.alcance)}<br>${i(c.componentes)} · ${i(c.duracao)}</div>
    ${j(c.desc)}
    ${c.concentracao?`<div class="row"><button class="btn small" data-conc="${c.id}">${e.state.concentration===c.id?"Encerrar concentração":"Concentrar"}</button></div>`:""}`;return`
  ${o.casters.length?`<section class="card stack">${o.casters.map(c=>`<div class="stats" style="grid-template-columns:repeat(3,1fr)">
    <div><b>${c.dc}</b><small>CD (${i(c.nome)})</small></div><div><b>${P(c.atk)}</b><small>Ataque mágico</small></div>
    <div><b>${va[c.atributoConjuracao].slice(0,3)}</b><small>Atributo</small></div></div>`).join("")}</section>`:""}
  ${u.length?`<section class="card slots"><h2>Espaços de magia${o.multiclass?" (combinados)":""}</h2>
    ${u.map(([c,q])=>`<div class="lvl"><span>${c}º</span>${Array.from({length:q.max},(C,x)=>`<button class="slotpip ${x<q.used?"used":""}" data-slot="${c}" data-i="${x}" aria-label="Espaço de ${c}º círculo ${x+1}${x<q.used?", gasto":""}"></button>`).join("")}</div>`).join("")}
  </section>`:""}
  ${g.length?`<section class="card slots"><h2>Magia de Pacto</h2>
    ${g.map(([c,q])=>`<div class="lvl"><span>${c}º</span>${Array.from({length:q.max},(C,x)=>`<button class="slotpip ${x<q.used?"used":""}" data-pactslot="${c}" data-i="${x}" aria-label="Espaço de pacto ${x+1}${x<q.used?", gasto":""}"></button>`).join("")}</div>`).join("")}
  </section>`:""}
  ${$.length?`<section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Magias da Subclasse</h2><span class="lvl-badge">sempre preparadas</span></div>
    <p class="empty-note" style="margin:0">Concedidas automaticamente pela subclasse — não contam no limite de magias conhecidas/preparadas, mas ainda gastam um espaço de magia ao conjurar.</p>
    <div class="stack">${$.map(c=>N(`${i(c.nome)} ${Q(c)}`,V(c.nivel),Sa(c),!1,`data-k="b-${c.id}"`)).join("")}</div>
  </section>`:""}
  ${f.cantrips!==null||f.known!==null||f.prepared!==null?`<section class="card stack"><h2>Limites de magias (regra 2024)</h2>
    <div class="row" style="flex-wrap:wrap;gap:.4rem">${U("truques",A,f.cantrips)}${U("magias conhecidas",w,f.known)}${U("preparadas",ea,f.prepared)}</div>
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
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Minhas magias</h2><span class="lvl-badge">${r.length} preparada(s)</span></div>
    ${Object.keys(v).length?Object.entries(v).map(([c,q])=>`<h3 style="margin:.6rem 0 .2rem;color:var(--muted)">${V(Number(c))}</h3>
      <div class="stack" style="--gap:.4rem">${q.map(C=>N(`${C.nivel>0&&r.includes(C.id)?"✓ ":""}${i(C.nome)} ${Q(C)}`,V(C.nivel),la(C,!0),!1,`data-k="m-${C.id}"`)).join("")}</div>`).join(""):'<p class="empty-note">Nenhuma magia ainda. Adicione pela biblioteca abaixo.</p>'}
  </section>
  <section class="card stack"><h2>Biblioteca de magias</h2>
    <input id="spellq" type="search" placeholder="Buscar magia pelo nome…" value="${i(n.spellQ)}" aria-label="Buscar magia" />
    <div class="filters">${["all","0","1","2","3","4","5","6","7","8","9"].map(c=>{const q=c==="all"||(c==="0"?y:y&&Number(c)<=l);return`<button data-flvl="${c}" aria-pressed="${n.spellLvl===c}" class="${q?"":"unavail"}" ${q?"":'title="Ainda não disponível no seu nível"'}>${c==="all"?"Todas":c==="0"?"Truques":c+"º"}</button>`}).join("")}</div>
    ${y?`<p class="empty-note" style="margin:0">Seu nível permite conjurar ${l===0?"só truques":`truques e magias até ${l}º círculo`}. Os demais círculos aparecem esmaecidos até você subir de nível.</p>`:""}
    ${S?`<label class="chk"><input type="checkbox" id="spellmine" ${n.spellMine?"checked":""}> Só a lista de ${i(S)}</label>`:""}
    <p class="empty-note">${ta} magia(s)${ta>B?` — mostrando ${B}, refine a busca`:""}.</p>
    <div class="stack">${H.map(c=>N(`${i(c.nome)} ${Q(c)}`,V(c.nivel),la(c,!1),!1,`data-k="l-${c.id}"`,wa(c))).join("")}</div>
  </section>`}function Ra(e,o,a){const d=a.S,t=a.app,n=d.ui;t.querySelectorAll("[data-slot]").forEach(s=>s.onclick=()=>{const m=s.dataset.slot,r=Number(s.dataset.i),$=e.state.spellSlots[m];a.save({[`state.spellSlots.${m}.used`]:r<$.used?r:r+1})}),t.querySelectorAll("[data-pactslot]").forEach(s=>s.onclick=()=>{const m=s.dataset.pactslot,r=Number(s.dataset.i),$=e.state.pactSlots[m];a.save({[`state.pactSlots.${m}.used`]:r<$.used?r:r+1})}),b("#spellq").oninput=s=>{n.spellQ=s.target.value,M("sq",a.render,250)},t.querySelectorAll("[data-flvl]").forEach(s=>s.onclick=()=>{n.spellLvl=s.dataset.flvl,a.render()}),b("#spellmine")&&(b("#spellmine").onchange=s=>{n.spellMine=s.target.checked,a.render()}),t.querySelectorAll("[data-learn]").forEach(s=>s.onclick=()=>a.save({"build.spellsKnown":[...e.build.spellsKnown||[],s.dataset.learn]})),t.querySelectorAll("[data-learnfull]").forEach(s=>s.onclick=()=>I(`Limite de ${s.dataset.learnfull==="truque"?"truques conhecidos":"magias conhecidas"} atingido. Use a exceção manual acima se for o caso.`)),t.querySelectorAll("[data-forget]").forEach(s=>s.onclick=()=>a.save({"build.spellsKnown":(e.build.spellsKnown||[]).filter(m=>m!==s.dataset.forget),"build.spellsPrepared":(e.build.spellsPrepared||[]).filter(m=>m!==s.dataset.forget)})),t.querySelectorAll("[data-prep]").forEach(s=>s.onclick=()=>{const m=e.build.spellsPrepared||[],r=s.dataset.prep;a.save({"build.spellsPrepared":m.includes(r)?m.filter($=>$!==r):[...m,r]})}),t.querySelectorAll("[data-prepfull]").forEach(s=>s.onclick=()=>I("Limite de magias preparadas atingido. Use a exceção manual acima se for o caso.")),b("#extra-cantrips")&&(b("#extra-cantrips").onchange=s=>a.save({"build.extraCantrips":Math.max(0,Number(s.target.value)||0)})),b("#extra-spells")&&(b("#extra-spells").onchange=s=>a.save({"build.extraSpells":Math.max(0,Number(s.target.value)||0)})),b("#extra-invoc")&&(b("#extra-invoc").onchange=s=>a.save({"build.extraInvocations":Math.max(0,Number(s.target.value)||0)})),b("#extra-note")&&(b("#extra-note").oninput=s=>M("extranote",()=>a.save({"build.extraSpellsNote":s.target.value}))),t.querySelectorAll("[data-conc]").forEach(s=>s.onclick=()=>a.save({"state.concentration":e.state.concentration===s.dataset.conc?null:s.dataset.conc})),R(t,"spells")}const G={};function R(e,o){e.querySelectorAll("summary .addbtn").forEach(d=>d.addEventListener("click",t=>t.preventDefault()));const a=G[o]||(G[o]=new Set);e.querySelectorAll("details.entry").forEach((d,t)=>{var s;const n=d.dataset.k||((s=d.querySelector("summary .t"))==null?void 0:s.textContent)||t;a.has(n)&&(d.open=!0),d.addEventListener("toggle",()=>d.open?a.add(n):a.delete(n))})}function Fa(e,o,a,d){var v;const{cls:t,sub:n,level:s,classId:m,nomePersonalizado:r}=o;if(!t)return`<section class="card">Classe "${i(m)}" não encontrada no compêndio.</section>`;const $=r||t.nome,u=t.caracteristicas||[],g=u.filter(p=>p.nivel<=s),l=u.filter(p=>p.nivel>s),y=e.build.opcoes||[],k=m==="bruxo"?((v=a.spellCaps)==null?void 0:v.invocacoes)??null:null;return`
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Características de ${i($)}</h2><span class="lvl-badge">nível ${s}</span></div>
    ${r?`<p class="empty-note" style="margin:0">Usa as regras de ${i(t.nome)}.</p>`:""}
    ${g.length?g.map(p=>N(i(p.nome),`Nível ${p.nivel}`,j(p.desc))).join(""):'<p class="empty-note">Importe o compêndio completo para ver as características.</p>'}
    ${l.length?`<details class="entry"><summary><span class="t muted">Próximos níveis (${l.length})</span></summary><div class="body stack">
      ${l.map(p=>N(i(p.nome),`Nível ${p.nivel}`,j(p.desc))).join("")}</div></details>`:""}
  </section>
  ${(t.opcoes||[]).map(p=>{const S=m==="bruxo"&&/Invoca/i.test(p.titulo),f=S?p.itens.filter(w=>y.includes(w.id)).length:null,A=S&&k!==null&&f>=k;return`<section class="card stack"><div class="sectiontitle"><h2 style="margin:0">${i(p.titulo.replace("Opções de ",""))} (${i($)})</h2>${S&&k!==null?`<span class="lvl-badge">${f}/${k}</span>`:""}</div>
    ${p.itens.filter(w=>y.includes(w.id)).map(w=>N("✓ "+i(w.nome),"",j(w.desc)+`<button class="btn small" data-unop="${w.id}">Remover</button>`)).join("")||'<p class="empty-note">Nenhuma escolhida.</p>'}
    <details class="entry"><summary><span class="t">Escolher ${i(p.titulo.replace("Opções de ","").toLowerCase())}</span><span class="lvl-badge">${p.itens.length}</span></summary><div class="body stack">
      ${p.itens.filter(w=>!y.includes(w.id)).map(w=>N(i(w.nome),"",j(w.desc),!1,`data-k="o-${m}-${w.id}"`,A?'<button class="btn small" data-opfull="1" aria-label="Limite de invocações atingido">+</button>':J("data-op",w.id,"Escolher "+i(w.nome)))).join("")}
    </div></details></section>`}).join("")}
  <section class="card stack"><h2>Subclasse de ${i($)}${n?": "+i(n.nome):""}</h2>
    ${n?(n.caracteristicas||[]).map(p=>N(`${p.nivel>s?"🔒 ":""}${i(p.nome)}`,`Nível ${p.nivel}`,j(p.desc))).join(""):`<p class="empty-note">${s<3?"A subclasse é escolhida no nível 3.":"Escolha a subclasse na aba Ficha (ou em Multiclasse, para uma classe secundária)."}</p>
         ${(t.subclasses||[]).map(p=>N(i(p.nome),"",j(p.intro))).join("")}`}
  </section>`}function Qa(e,o,a){const d=o.sp,t=o.bg,n=o.speciesLabel||(d==null?void 0:d.nome)||"espécie";return`
  ${o.classesInfo.map(s=>Fa(e,s,o)).join("")}
  <section class="card stack"><h2>Traços de ${i(n)}</h2>
    ${d&&n!==d.nome?`<p class="empty-note" style="margin:0">Usa as regras de ${i(d.nome)}.</p>`:""}
    <p class="empty-note">${i((d==null?void 0:d.tipo)||"")} · ${i((d==null?void 0:d.tamanho)||"")} · Deslocamento ${i((d==null?void 0:d.deslocamento)||"")}</p>
    ${((d==null?void 0:d.tracos)||[]).filter(s=>s.nome!=="Detalhes").map(s=>N(i(s.nome),"",j(s.desc))).join("")||'<p class="empty-note">Sem traços no compêndio.</p>'}
  </section>
  ${t?`<section class="card stack"><h2>Antecedente: ${i(t.nome)}</h2>
    <p style="margin:0;font-size:.92rem"><b>Atributos:</b> ${t.atributos.map(s=>va[s]).join(", ")}<br>
    <b>Talento:</b> ${i(t.talento)}<br><b>Ferramenta:</b> ${i(t.ferramenta)}<br><b>Equipamento:</b> ${i(t.equipamento)}</p></section>`:""}
  ${e.build.customNote?`<section class="card stack"><h2>Notas da personalização</h2><p style="margin:0;white-space:pre-wrap">${i(e.build.customNote)}</p></section>`:""}`}function Ua(e,o,a){const d=a.app,t=e.build.opcoes||[];d.querySelectorAll("[data-op]").forEach(n=>n.onclick=()=>a.save({"build.opcoes":[...t,n.dataset.op]})),d.querySelectorAll("[data-unop]").forEach(n=>n.onclick=()=>a.save({"build.opcoes":t.filter(s=>s!==n.dataset.unop)})),d.querySelectorAll("[data-opfull]").forEach(n=>n.onclick=()=>I("Limite de invocações místicas atingido. Use a exceção manual na aba Magias se for o caso.")),R(d,"classe")}const _a=["Origem","Geral","Estilo de Luta","Dádiva Épica"];function Ka(e,o,a){const d=a.S,t=d.comp,n=d.ui,s=e.build.feats||[],m=T(n.featQ);let r=t.feats.filter(u=>(u.repetivel||!s.some(g=>g.id===u.id))&&(n.featCat==="all"||u.categoria===n.featCat)&&(!m||T(u.nome).includes(m)||T(u.prereq).includes(m)));const $=r.length;return r=r.slice(0,B),`
  <section class="card stack"><h2>Meus talentos</h2>
    ${s.length?s.map((u,g)=>{const l=t.byId.feats[u.id];return N(i((l==null?void 0:l.nome)||u.id),i(u.origem||(l==null?void 0:l.categoria)||""),(l?`<p class="empty-note">${i(l.categoria)}${l.prereq?" · Pré-requisito: "+i(l.prereq):""}</p>${j(l.desc)}`:'<p class="empty-note">Talento fora do compêndio.</p>')+`<button class="btn small" data-unfeat="${g}">Remover</button>`)}).join(""):'<p class="empty-note">Nenhum talento. Seu antecedente concede um talento de Origem.</p>'}
  </section>
  <section class="card stack"><h2>Biblioteca de talentos</h2>
    <input id="featq" type="search" placeholder="Buscar talento…" value="${i(n.featQ)}" aria-label="Buscar talento" />
    <div class="filters">${["all",..._a].map(u=>`<button data-fcat="${u}" aria-pressed="${n.featCat===u}">${u==="all"?"Todos":u}</button>`).join("")}</div>
    <p class="empty-note">${$} talento(s)${$>B?` — mostrando ${B}`:""}.</p>
    ${r.map(u=>N(i(u.nome),i(u.categoria),`${u.prereq?`<p class="empty-note">Pré-requisito: ${i(u.prereq)}</p>`:""}${j(u.desc)}`,!1,`data-k="f-${u.id}"`,J("data-feat",u.id,"Adicionar "+i(u.nome)))).join("")}
    ${t.feats.length?"":'<p class="empty-note">Importe o compêndio completo para usar a biblioteca de talentos.</p>'}
  </section>`}function Ga(e,o,a){const d=a.S,t=a.app,n=e.build.feats||[];b("#featq").oninput=s=>{d.ui.featQ=s.target.value,M("fq",a.render,250)},t.querySelectorAll("[data-fcat]").forEach(s=>s.onclick=()=>{d.ui.featCat=s.dataset.fcat,a.render()}),t.querySelectorAll("[data-feat]").forEach(s=>s.onclick=()=>{a.save({"build.feats":[...n,{id:s.dataset.feat,origem:"Escolhido"}]}),a.toast("Talento adicionado. Aplique aumentos de atributo na aba Ficha, se houver.")}),t.querySelectorAll("[data-unfeat]").forEach(s=>s.onclick=()=>a.save({"build.feats":n.filter((m,r)=>r!==Number(s.dataset.unfeat))})),R(t,"feats")}function Wa(e,o,a){const d=a.S,t=d.comp,n=d.ui,s=e.inventory||[],m=e.coins||{},r=T(n.itemQ),$=r.length>=2?t.items.filter(l=>T(l.nome).includes(r)).slice(0,25):[],u=Math.min(100,Math.round(o.weight/o.carry*100)),g=l=>l.tipo==="arma"?`${i(l.dano)} · ${i(l.propriedades)} · Maestria: ${i(l.maestria)}`:l.tipo==="armadura"?`CA ${i(l.ca)}${l.forca&&l.forca!=="—"?" · "+i(l.forca):""}${l.furtividade==="Desvantagem"?" · Desv. Furtividade":""}`:"";return`
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Bolsa de moedas</h2><span class="lvl-badge">≈ ${o.coinsGP.toLocaleString("pt-BR",{maximumFractionDigits:2})} PO</span></div>
    <div class="coins">${oa.map(([l,y,k])=>`<label class="coin coin-${l}"><span>${y}</span>
      <input type="number" inputmode="numeric" min="0" data-coin="${l}" value="${Number(m[l])||0}" aria-label="${k}" /></label>`).join("")}</div>
    <form class="row" id="coinop">
      <input id="coinamt" type="number" inputmode="numeric" min="1" placeholder="Qtd." style="width:5.5rem" aria-label="Quantidade" />
      <select id="coinkind" style="width:5.5rem" aria-label="Moeda">${oa.map(([l,y])=>`<option value="${l}" ${l==="po"?"selected":""}>${y}</option>`).join("")}</select>
      <button class="btn heal small" data-cop="+">Receber</button><button class="btn danger small" data-cop="-">Gastar</button>
    </form>
  </section>
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Inventário</h2><span class="lvl-badge">${o.weight.toLocaleString("pt-BR",{maximumFractionDigits:1})} / ${o.carry} kg</span></div>
    <div class="hpbar" aria-hidden="true"><div class="cur ${u>100?"low":u>75?"mid":""}" style="width:${u}%"></div></div>
    ${s.length?s.map(l=>{const y=l.itemId?t.byId.weapons[l.itemId]||t.byId.armor[l.itemId]||t.byId.gear[l.itemId]:null;return N(`${l.equipado?"🛡️ ":""}${i(l.nome)}${Number(l.qtd)>1?` <span class="muted">×${l.qtd}</span>`:""}`,i(l.peso||""),`${y?`<p class="empty-note">${g(y)}${y.custo?" · "+i(y.custo):""}</p>${y.desc?j(y.desc):""}`:""}
        <div class="row">
          <button class="btn small" data-qty="${l.uid}" data-d="-1">−</button><b>${l.qtd}</b><button class="btn small" data-qty="${l.uid}" data-d="1">+</button>
          <label class="chk"><input type="checkbox" data-equip="${l.uid}" ${l.equipado?"checked":""}> Equipado</label>
          <label class="chk"><input type="checkbox" data-attune="${l.uid}" ${l.sintonizado?"checked":""}> Sintonizado</label>
        </div>
        <input data-inote="${l.uid}" id="inote-${l.uid}" value="${i(l.notas||"")}" placeholder="Notas (cargas, efeitos…)" aria-label="Notas do item" />
        <button class="btn small danger" data-rmitem="${l.uid}">Remover item</button>`,!1,`data-k="i-${l.uid}"`)}).join(""):'<p class="empty-note">Inventário vazio.</p>'}
  </section>
  <section class="card stack"><h2>Adicionar item</h2>
    <input id="itemq" type="search" placeholder="Buscar armas, armaduras, equipamento… (2+ letras)" value="${i(n.itemQ)}" aria-label="Buscar item" />
    ${$.map(l=>`<div class="libitem"><div class="info"><b>${i(l.nome)}</b><small>${i(l.custo||"")}${l.peso?" · "+i(l.peso):""} ${g(l)?"· "+g(l):""}</small></div>
      <button class="btn small primary" data-additem="${l.id}">+</button></div>`).join("")}
    ${r.length>=2&&!$.length?'<p class="empty-note">Nada encontrado — use o item personalizado abaixo.</p>':""}
    <form class="row" id="custom">
      <input id="cname" class="grow" placeholder="Item personalizado" required style="width:auto" aria-label="Nome do item" />
      <input id="cweight" placeholder="kg" inputmode="decimal" style="width:4.5rem" aria-label="Peso em kg" />
      <button class="btn small">Adicionar</button>
    </form>
  </section>`}function Ya(e,o,a){const d=a.S,t=a.app,n=d.comp,s=e.inventory||[],m={pc:0,pp:0,pe:0,po:0,pl:0,...e.coins||{}},r=u=>a.save({inventory:u});t.querySelectorAll("[data-coin]").forEach(u=>u.onchange=()=>a.save({coins:{...m,[u.dataset.coin]:Math.max(0,Number(u.value)||0)}})),t.querySelectorAll("[data-cop]").forEach(u=>u.onclick=g=>{g.preventDefault();const l=Number(b("#coinamt").value),y=b("#coinkind").value;if(!l)return a.toast("Digite a quantidade.");const k=m[y]+(u.dataset.cop==="+"?l:-l);if(k<0)return a.toast(`Não há ${l} ${y.toUpperCase()} suficientes.`);a.save({coins:{...m,[y]:k}})}),b("#itemq").oninput=u=>{d.ui.itemQ=u.target.value,M("iq",a.render,250)},t.querySelectorAll("[data-additem]").forEach(u=>u.onclick=()=>{const g=n.items.find(y=>y.id===u.dataset.additem),l=s.find(y=>y.itemId===g.id);r(l?s.map(y=>y===l?{...y,qtd:Number(y.qtd)+1}:y):[...s,{uid:da(),itemId:g.id,nome:g.nome,qtd:1,peso:g.peso||"",equipado:!1,sintonizado:!1,notas:""}]),a.toast(`${g.nome} adicionado.`)}),b("#custom").onsubmit=u=>{u.preventDefault();const g=b("#cweight").value.trim();r([...s,{uid:da(),itemId:null,nome:b("#cname").value.trim(),qtd:1,peso:g?`${g} kg`:"",equipado:!1,sintonizado:!1,notas:""}])};const $=(u,g)=>r(s.map(l=>l.uid===u?g(l):l));t.querySelectorAll("[data-qty]").forEach(u=>u.onclick=()=>$(u.dataset.qty,g=>({...g,qtd:Math.max(0,Number(g.qtd)+Number(u.dataset.d))}))),t.querySelectorAll("[data-equip]").forEach(u=>u.onchange=()=>$(u.dataset.equip,g=>({...g,equipado:u.checked}))),t.querySelectorAll("[data-attune]").forEach(u=>u.onchange=()=>{if(u.checked&&s.filter(g=>g.sintonizado).length>=3)return u.checked=!1,a.toast("Limite de 3 itens sintonizados.");$(u.dataset.attune,g=>({...g,sintonizado:u.checked}))}),t.querySelectorAll("[data-inote]").forEach(u=>u.oninput=()=>M("in"+u.dataset.inote,()=>$(u.dataset.inote,g=>({...g,notas:u.value})))),t.querySelectorAll("[data-rmitem]").forEach(u=>u.onclick=()=>r(s.filter(g=>g.uid!==u.dataset.rmitem))),R(t,"itens")}const Ja={ficha:{html:Oa,bind:Ha},magias:{html:Va,bind:Ra},classe:{html:Qa,bind:Ua},talentos:{html:Ka,bind:Ga},itens:{html:Wa,bind:Ya}},E=b("#app"),h={be:null,comp:null,user:null,chId:null,ch:null,tab:"combate",amount:"",off:[],prevHp:null,ui:{spellQ:"",spellLvl:"all",spellMine:!0,featQ:"",featCat:"all",itemQ:"",libOpen:{}}},X=()=>`rpgmesa:last:${h.user.uid}`,F=()=>{h.off.forEach(e=>e()),h.off=[]},ma=Object.fromEntries(Ia.map(([e,o])=>[e,o])),W=Object.fromEntries(D);Xa().catch(e=>{E.innerHTML=`<div class="wrap"><div class="card">Erro ao iniciar: ${i(e.message)}</div></div>`});async function Xa(){h.be=await Na(),ja(h.be,E,{title:"Grimório do Aventureiro",subtitle:"Entre com sua conta para acessar seus personagens em qualquer aparelho.",onSignedOut:()=>{F(),h.ch=null,h.chId=null,h.prevHp=null}},async e=>{h.user=e,E.innerHTML='<p class="muted" style="padding:1rem">Carregando compêndio…</p>',h.comp=await Ma(h.be);const o=Y.get(X());o?Z(o):O()})}const $a=()=>h.be.mode==="local"?'<p class="banner">Modo demo: os dados ficam neste navegador. Abra o Escudo em outra aba para testar a sincronização.</p>':"",Za=()=>h.comp.completo?"":'<p class="banner">Biblioteca reduzida: o Mestre ainda não importou o compêndio completo no Escudo.</p>';function O(){F(),h.chId=null,h.ch=null,Y.set(X(),null);let e=!1;h.off.push(h.be.watchMyCharacters(o=>{b("#build")||(o.sort((a,d)=>a.name.localeCompare(d.name)),E.innerHTML=`<header class="top"><div class="row"><div class="grow name">Meus personagens</div>
      <a class="btn small" href="./escudo.html" title="Ir para o Escudo do Mestre">🛡️ Escudo</a>${pa(h.user)}</div></header>
    <main class="wrap stack">${$a()}${Za()}
      ${o.map(a=>`<button class="charbtn" data-open="${a.id}">
        <span><b>${i(a.name)}</b><br><small class="muted">${i(ha(a))}</small></span>
        <span class="chip">${a.campaignName?"🎲 "+i(a.campaignName):"Sem mesa"}</span></button>`).join("")}
      ${o.length?"":'<div class="card"><p style="margin:0">Você ainda não tem personagens. Crie o primeiro abaixo — ele fica salvo na sua conta.</p></div>'}
      <button class="btn primary" id="newchar" style="width:100%">+ Novo personagem</button>
    </main>`,ba(h.be,E),E.querySelectorAll("[data-open]").forEach(a=>a.onclick=()=>Z(a.dataset.open)),b("#newchar").onclick=()=>ae(),!o.length&&!e&&(e=!0))}))}function ae(){F();const e=h.comp,o=[15,14,13,12,10,8];E.innerHTML=`<header class="top"><div class="row"><button class="btn small" id="back" aria-label="Voltar">◀</button><div class="grow name">Novo personagem</div></div></header>
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
  </form></main>`,b("#back").onclick=O;const a=b("#build"),d=()=>e.byId.classes[a.class.value],t=()=>{var v,p;return(p=e.byId.backgrounds)==null?void 0:p[(v=a.bg)==null?void 0:v.value]};function n(){var S;const v=d(),p=(S=v.periciasOpcoes)!=null&&S.length?v.periciasOpcoes:[];b("#classinfo").innerHTML=`
      <p class="muted" style="margin:.2rem 0;font-size:.88rem">Dado de Vida d${v.dadoVida} · Salvaguardas: ${(v.salvaguardas||[]).map(f=>W[f]).join(", ")}</p>
      ${p.length?`<div><label>Perícias da classe — escolha ${v.periciasEscolha} <span id="skcount"></span></label>
        <div class="checks">${p.map(f=>`<label class="chk"><input type="checkbox" name="sk" value="${f}"> ${ma[f]}</label>`).join("")}</div></div>`:""}`,a.querySelectorAll("[name=sk]").forEach(f=>f.onchange=s),s()}function s(){var A;const v=d(),p=((A=t())==null?void 0:A.pericias)||[],S=[...a.querySelectorAll("[name=sk]")];S.forEach(w=>{p.includes(w.value)&&(w.checked=!1,w.disabled=!0,w.parentElement.title="Já vem do antecedente")});const f=S.filter(w=>w.checked).length;S.forEach(w=>{p.includes(w.value)||(w.disabled=!w.checked&&f>=v.periciasEscolha)}),b("#skcount")&&(b("#skcount").textContent=`(${f}/${v.periciasEscolha})`)}function m(){const v=t();if(!v)return;const p=e.byId.feats[v.talentoId];b("#bginfo").innerHTML=`
      <p style="margin:.2rem 0;font-size:.9rem"><b>Perícias:</b> ${v.pericias.map(S=>ma[S]).join(", ")}<br>
      <b>Talento:</b> ${i((p==null?void 0:p.nome)||v.talento)}<br><b>Ferramenta:</b> ${i(v.ferramenta)}</p>
      <div class="row">
        <div class="grow"><label for="plus2">+2 em</label><select id="plus2">${v.atributos.map(S=>`<option value="${S}">${W[S]}</option>`).join("")}<option value="all">+1 nos três</option></select></div>
        <div class="grow" id="plus1wrap"><label for="plus1">+1 em</label><select id="plus1">${v.atributos.map((S,f)=>`<option value="${S}" ${f===1?"selected":""}>${W[S]}</option>`).join("")}</select></div>
      </div>
      <details class="entry"><summary><span class="t">Equipamento do antecedente</span></summary><div class="body">${i(v.equipamento)}</div></details>`,b("#plus2").onchange=b("#plus1").onchange=$,$(),s()}function r(){const v=t(),p={};if(!v)return p;const S=b("#plus2").value;if(S==="all")v.atributos.forEach(f=>p[f]=1);else{p[S]=2;const f=b("#plus1").value;f!==S&&(p[f]=(p[f]||0)+1)}return p}function $(){const v=r();b("#plus1wrap")&&(b("#plus1wrap").style.visibility=b("#plus2").value==="all"?"hidden":""),a.querySelectorAll(".abfinal").forEach(p=>{const S=p.dataset.ab,f=Math.min(20,Number(a[S].value)+(v[S]||0));p.textContent=v[S]?`→ ${f} (${P(ca(f))})`:`(${P(ca(f))})`})}const u=27,g={8:0,9:1,10:2,11:3,12:4,13:5,14:7,15:9},l=v=>g[v]??0;let y="array";function k(){const v=y==="buy";if(b("#ab-inputs").innerHTML=D.map(([p,S],f)=>{const A=document.getElementById("ab-"+p),w=A?A.value:v?8:o[f];return`<div><label for="ab-${p}">${S} <b class="abfinal" data-ab="${p}"></b></label>
        <div class="row" style="align-items:center;gap:.4rem;flex-wrap:nowrap">
          ${v?`<button type="button" class="btn small" data-abdown="${p}" aria-label="Diminuir ${S}">−</button>`:""}
          <input id="ab-${p}" name="${p}" type="number" inputmode="numeric" min="${v?8:3}" max="${v?15:20}"
            value="${w}" ${v?'readonly style="width:3.5rem;text-align:center"':""} />
          ${v?`<button type="button" class="btn small" data-abup="${p}" aria-label="Aumentar ${S}">+</button>`:""}
        </div></div>`}).join(""),v){const p=D.reduce((f,[A])=>f+l(Number(a[A].value)),0),S=u-p;b("#abpts").style.display="",b("#abpts").textContent=`${S} de ${u} pontos restantes`,a.querySelectorAll("[data-abup]").forEach(f=>f.onclick=()=>{const A=f.dataset.abup,w=Number(a[A].value);if(!(w>=15)){if(p+(l(w+1)-l(w))>u)return I("Sem pontos suficientes.");a[A].value=w+1,k()}}),a.querySelectorAll("[data-abdown]").forEach(f=>f.onclick=()=>{const A=f.dataset.abdown,w=Number(a[A].value);w<=8||(a[A].value=w-1,k())})}else b("#abpts").style.display="none",D.forEach(([p])=>a[p].oninput=$);$()}E.querySelectorAll("[data-abmode]").forEach(v=>v.onclick=()=>{v.dataset.abmode!==y&&(y=v.dataset.abmode,E.querySelectorAll("[data-abmode]").forEach(p=>p.setAttribute("aria-selected",String(p.dataset.abmode===y))),b("#abmode-help").textContent=y==="buy"?`Compra de pontos: comece com 8 em tudo e gaste os ${u} pontos (custo 9=1, 10=2, 11=3, 12=4, 13=5, 14=7, 15=9). Máximo 15 antes dos bônus do antecedente.`:"Valores base (Array Padrão: 15, 14, 13, 12, 10, 8). Edite livremente, se preferir. O bônus do antecedente é somado automaticamente.",D.forEach(([p],S)=>{const f=document.getElementById("ab-"+p);f&&(f.value=y==="buy"?8:o[S])}),k())}),a.class.onchange=n,a.bg&&(a.bg.onchange=m),n(),m(),k(),a.onsubmit=async v=>{var A;v.preventDefault();const p=r(),S=Object.fromEntries(D.map(([w])=>[w,Math.min(20,Number(a[w].value)+(p[w]||0))])),f=xa({name:a.name.value.trim(),ownerUid:h.user.uid,speciesId:a.species.value,classId:a.class.value,level:Number(a.level.value),abilities:S,backgroundId:((A=a.bg)==null?void 0:A.value)||null,skillProfs:[...a.querySelectorAll("[name=sk]:checked")].map(w=>w.value),speciesNomePersonalizado:a.speciesnome.value.trim()||null,classNomePersonalizado:a.classnome.value.trim()||null,customNote:a.customnote.value.trim()},e);try{Z(await h.be.createCharacter(f))}catch(w){I(w.message)}}}const ha=e=>`${Pa(e.build,h.comp)} · ${za(e.build,h.comp)}`;function Z(e){F(),h.chId=e,h.prevHp=null,Y.set(X(),e),h.off.push(h.be.watchCharacter(e,o=>{if(!o)return O();const a=h.prevHp;if(h.prevHp=o.state.hp.current+o.state.hp.temp,h.ch=o,aa(),a!=null&&a!==h.prevHp){const d=b("#hpcard");d==null||d.classList.add(h.prevHp<a?"flash-dmg":"flash-heal"),navigator.vibrate&&h.prevHp<a&&navigator.vibrate(80)}}))}const ee=[["combate","❤️","Combate"],["ficha","📜","Ficha"],["magias","✨","Magias"],["classe","🛡️","Traços"],["talentos","⭐","Talentos"],["itens","🎒","Itens"]],z={get S(){return h},app:E,render:()=>aa(),save:e=>h.be.updateCharacter(h.chId,e).catch(o=>I(o.message)),toast:I,showHome:()=>O(),confirmTwice:se,accountChip:pa,bindLogout:ba};function aa(){const e=h.ch,o=Da(e,h.comp),a=document.activeElement,d=a==null?void 0:a.id,t=a&&"selectionStart"in a?[a.selectionStart,a.selectionEnd]:null,n=window.scrollY,s={combate:{html:te,bind:le},...Ja},m=s[h.tab]||s.combate;if(E.innerHTML=`
    <header class="top">
      <div class="row"><button class="btn small" id="home" aria-label="Meus personagens">◀</button>
        <div class="grow"><div class="name">${i(e.name)}</div>
        <div class="mini"><span>${i(ha(e))}</span>${e.campaignName?`<span>🎲 ${i(e.campaignName)}</span>`:""}</div></div>
        <div class="mini"><span>CA <b>${e.build.ac??10}</b></span><span>PV <b>${e.state.hp.current}/${e.state.hp.max}</b></span></div>
        <a class="btn small" href="./escudo.html" title="Ir para o Escudo do Mestre">🛡️</a></div>
    </header>
    <main class="wrap stack">${$a()}${m.html(e,o,z)}</main>
    <nav class="tabs" role="tablist">${ee.map(([r,$,u])=>`<button role="tab" aria-selected="${h.tab===r}" data-tab="${r}"><span class="ico" aria-hidden="true">${$}</span>${u}</button>`).join("")}</nav>`,E.querySelectorAll("[data-tab]").forEach(r=>r.onclick=()=>{h.tab=r.dataset.tab,aa(),window.scrollTo(0,0)}),b("#home").onclick=O,m.bind(e,o,z),window.scrollTo(0,n),d){const r=document.getElementById(d);if(r&&(r.focus({preventScroll:!0}),t&&"setSelectionRange"in r))try{r.setSelectionRange(...t)}catch{}}}function se(e,o){const a=b(e);if(a.dataset.armed)return!0;a.dataset.armed="1";const d=a.textContent;return a.textContent=o,setTimeout(()=>{a.isConnected&&(delete a.dataset.armed,a.textContent=d)},3e3),!1}function te(e,o){const{hp:a,deathSaves:d={success:0,fail:0},conditions:t=[],dead:n}=e.state,s=a.max+a.temp,m=Math.round(a.current/s*100),r=Math.round(a.temp/s*100),$=a.current/a.max>.5?"":a.current/a.max>.25?"mid":"low",u=a.current===0&&!n,g=e.state.concentration?h.comp.byId.spells[e.state.concentration]:null;return`
  <section class="card stack" id="hpcard">
    <div class="hp-big"><div class="num">${a.current}<small> / ${a.max}</small></div>
      ${a.temp?`<div class="tmpv">+${a.temp} temporários</div>`:""}
      ${n?'<div class="chip bad" style="margin-top:.4rem">MORTO</div>':""}</div>
    <div class="hpbar" aria-hidden="true"><div class="cur ${$}" style="width:${m}%"></div><div class="tmp" style="width:${r}%"></div></div>
    <input id="amount" class="amount" type="number" inputmode="numeric" min="0" placeholder="0" value="${i(h.amount)}" aria-label="Valor" />
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
    <div><b>${P(o.initiative)}</b><small>Iniciativa</small></div>
    <div><b>${i(o.speed.replace(" metros"," m"))}</b><small>Deslocamento</small></div>
    <div><b>${o.passivePerception}</b><small>Perc. passiva</small></div>
  </div></section>
  ${g?`<p class="banner">Concentrando em: <b>${i(g.nome)}</b> <button class="btn small" id="endconc" style="margin-left:.5rem">Encerrar</button></p>`:""}
  ${u?`<section class="card stack"><h2>Testes contra a morte</h2>
    <div class="saves"><div><small class="muted">Sucessos</small><div class="pips">${[0,1,2].map(l=>`<span class="pip ${l<d.success?"s":""}"></span>`).join("")}</div></div>
      <div><small class="muted">Falhas</small><div class="pips">${[0,1,2].map(l=>`<span class="pip ${l<d.fail?"f":""}"></span>`).join("")}</div></div></div>
    <button class="btn primary" id="roll-death" style="width:100%">Rolar d20</button></section>`:""}
  <section class="card stack"><h2>Condições</h2>
    <div class="row">${t.map(l=>`<button class="chip bad" data-rmcond="${l}" aria-label="Remover ${l}">${ia[l]||l} ✕</button>`).join("")||'<span class="muted">Nenhuma</span>'}</div>
    <div class="row"><select id="addcond" class="grow" aria-label="Adicionar condição"><option value="">Adicionar condição…</option>
      ${Ta.filter(l=>!t.includes(l)).map(l=>`<option value="${l}">${ia[l]||l}</option>`).join("")}</select></div>
  </section>
  <section class="card stack"><h2>Descanso</h2>
    ${(e.state.hitDice.byClass||[]).length>1?e.state.hitDice.byClass.map(l=>{const y=h.comp.byId.classes[l.classId];return`<div class="row" style="justify-content:space-between"><span class="muted">${i((y==null?void 0:y.nome)||l.classId)}: ${l.max-l.used}/${l.max} (d${l.die})</span>
            <button class="btn small" data-shortclass="${l.classId}">Gastar</button></div>`}).join(""):`<p class="muted" style="margin:0">Dados de Vida: ${e.state.hitDice.max-e.state.hitDice.used}/${e.state.hitDice.max} (d${e.state.hitDice.die})</p>
         <div class="row"><button class="btn grow" id="short">Gastar 1 Dado de Vida</button></div>`}
    <div class="row"><button class="btn grow" id="long">Descanso Longo</button></div>
  </section>
  <section class="card"><h2>Registro</h2><ul class="log">${(e.state.log||[]).map(l=>`<li>${i(l)}</li>`).join("")||"<li>—</li>"}</ul></section>`}function le(e,o){const a=b("#amount");a.oninput=()=>h.amount=a.value,E.querySelectorAll("[data-q]").forEach(t=>t.onclick=()=>{h.amount=t.dataset.q==="C"?"":String((Number(h.amount)||0)+Number(t.dataset.q)),a.value=h.amount}),E.querySelectorAll("[data-act]").forEach(t=>t.onclick=async()=>{const n=Number(h.amount);if(!n)return I("Digite um valor.");const s={resistant:b("#o-res").checked,vulnerable:b("#o-vul").checked,critical:b("#o-crit").checked};h.amount="";const m=await K(h.be,h.chId,t.dataset.act,n,s,e.name);m.concentrationDC&&e.state.concentration?I(`Teste de Concentração: CD ${m.concentrationDC}`):m.log.length&&I(m.log.at(-1))}),b("#endconc")&&(b("#endconc").onclick=()=>z.save({"state.concentration":null})),b("#roll-death")&&(b("#roll-death").onclick=async()=>{const t=ra("1d20").total,n=await K(h.be,h.chId,"morte",t,{},e.name);I(`d20 = ${t}. ${n.log.at(-1)??""}`)}),E.querySelectorAll("[data-rmcond]").forEach(t=>t.onclick=()=>z.save({"state.conditions":e.state.conditions.filter(n=>n!==t.dataset.rmcond)})),b("#addcond").onchange=t=>t.target.value&&z.save({"state.conditions":[...e.state.conditions,t.target.value]});const d=async(t,n)=>{const s=ra(`1d${t}`).total+o.mods.con;await n();const m=await K(h.be,h.chId,"cura",Math.max(0,s),{},e.name);I(`Dado de Vida: ${s}. ${m.log[0]??""}`)};b("#short")&&(b("#short").onclick=()=>{const t=e.state.hitDice;if(t.used>=t.max)return I("Sem Dados de Vida disponíveis.");d(t.die,()=>z.save({"state.hitDice.used":t.used+1}))}),E.querySelectorAll("[data-shortclass]").forEach(t=>t.onclick=()=>{const n=e.state.hitDice.byClass,s=n.findIndex($=>$.classId===t.dataset.shortclass),m=n[s];if(m.used>=m.max)return I("Sem Dados de Vida dessa classe.");const r=n.map(($,u)=>u===s?{...$,used:$.used+1}:$);d(m.die,()=>z.save({"state.hitDice.byClass":r,"state.hitDice.used":r.reduce(($,u)=>$+u.used,0)}))}),b("#long").onclick=async()=>{const t=Object.fromEntries(Object.entries(e.state.spellSlots||{}).map(([m,r])=>[m,{...r,used:0}])),n=Object.fromEntries(Object.entries(e.state.pactSlots||{}).map(([m,r])=>[m,{...r,used:0}])),s=(e.state.hitDice.byClass||[]).map(m=>({...m,used:0}));await z.save({"state.hp":{...e.state.hp,current:e.state.hp.max,temp:0},"state.spellSlots":t,"state.pactSlots":n,"state.hitDice":{...e.state.hitDice,byClass:s,used:0},"state.deathSaves":{success:0,fail:0},"state.conditions":e.state.conditions.filter(m=>!["inconsciente","estabilizado"].includes(m))}),I("Descanso longo concluído.")}}
