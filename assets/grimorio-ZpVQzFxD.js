import"./pwa-Bz0sy_w8.js";import{e as r,A as T,$ as p,m as ia,t as N,h as j,n as W,o as Aa,q as ca,w as Ca,x as Ea,y as Na,S as Ia,g as ja,r as xa,l as Da,s as aa,a as va,b as $a,z as Ma,B as Pa,f as za,c as Ta,d as La,D as Ba,C as ra,i as Oa,j as Y,E as Ha,k as Va,F as da}from"./auth-B9d4Lx14.js";function ua(s){const n=String(s).replace(/\s/g,"").match(/^(\d*)d(\d+)([+-]\d+)?$/i);if(!n)return null;const a=Number(n[1]||1),d=Number(n[2]),t=Number(n[3]||0),i=Array.from({length:a},()=>1+Math.floor(Math.random()*d));return{rolls:i,bonus:t,total:i.reduce((e,c)=>e+c,0)+t}}const O=s=>r(s).replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>").replace(/(^|\s)_([^_]+)_(?=\s|$|[.,;:])/g,"$1<i>$2</i>");function D(s){if(!s)return"";const n=[];for(const a of String(s).split(/\n\n+/)){const d=a.split(`
`);if(d.every(t=>t.startsWith("| "))){n.push('<div class="mdtable"><table>'+d.map(t=>"<tr>"+t.slice(2).split(" | ").map(i=>`<td>${O(i)}</td>`).join("")+"</tr>").join("")+"</table></div>");continue}for(const t of d)t.startsWith("#### ")?n.push(`<h5>${O(t.slice(5))}</h5>`):t.startsWith("### ")?n.push(`<h4>${O(t.slice(4))}</h4>`):t.startsWith("| ")?n.push('<div class="mdtable"><table><tr>'+t.slice(2).split(" | ").map(i=>`<td>${O(i)}</td>`).join("")+"</tr></table></div>"):t.startsWith("• ")?n.push(`<p class="bullet">${O(t)}</p>`):n.push(`<p>${O(t)}</p>`)}return`<div class="md">${n.join("")}</div>`}const L=s=>String(s||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(),fa=Object.fromEntries(T),H=40,F=s=>s===0?"Truque":`${s}º círculo`,ma=()=>Math.random().toString(36).slice(2,9),x=(s,n,a,d=!1,t="",i="")=>`<details class="entry" ${d?"open":""} ${t}><summary><span class="t">${s}</span><span class="row" style="gap:.4rem;flex-wrap:nowrap"><span class="lvl-badge">${n||""}</span>${i}</span></summary><div class="body">${a}</div></details>`,ea=(s,n,a="Adicionar")=>`<button class="btn small primary addbtn" ${s}="${n}" aria-label="${a}">+</button>`;function Ra(s,n,a){const d=a.S,t=d.comp,i=new Set(s.build.classes.map(l=>l.classId)),e=t.classes.filter(l=>!i.has(l.id)),c=n.classesInfo.slice(1);return`
  <section class="card stack"><h2>Multiclasse</h2>
    <p class="empty-note" style="margin:0">Nível total: ${n.level}/20. Ao multiclassar, confira na aba Traços quais proficiências a nova classe concede (são menos do que na criação) e ajuste "Treinamento e Proficiências" à mão, se precisar.</p>
    ${c.length?c.map(l=>{var f,$,m,q,g;const w=((f=l.cls)==null?void 0:f.subclasses)||[];return`<div class="row" style="flex-wrap:wrap;gap:.5rem;border-top:1px solid var(--border,#3332);padding-top:.5rem">
        <b class="grow">${r((($=l.cls)==null?void 0:$.nome)||l.classId)}</b>
        <div class="row" style="gap:.3rem"><button class="btn small" data-mcdown="${l.classId}" aria-label="Diminuir nível de ${r(((m=l.cls)==null?void 0:m.nome)||l.classId)}">−</button>
          <span style="min-width:1.4rem;text-align:center">${l.level}</span>
          <button class="btn small" data-mcup="${l.classId}" aria-label="Subir nível de ${r(((q=l.cls)==null?void 0:q.nome)||l.classId)}">+</button></div>
        ${w.length?`<select data-mcsub="${l.classId}" aria-label="Subclasse de ${r(((g=l.cls)==null?void 0:g.nome)||l.classId)}" ${l.level<3?"disabled":""}>
          <option value="">—</option>${w.map(v=>`<option value="${v.id}" ${v.id===l.subclassId?"selected":""}>${r(v.nome)}</option>`).join("")}</select>`:""}
        <button class="btn small danger" data-mcrm="${l.classId}">Remover</button>
      </div>`}).join(""):'<p class="empty-note">Personagem de classe única.</p>'}
    ${e.length&&n.level<20?`<form class="row" id="addclass">
      <select id="mcnew" class="grow" aria-label="Nova classe">${e.map(l=>`<option value="${l.id}">${r(l.nome)}</option>`).join("")}</select>
      <button class="btn primary small">+ Adicionar classe</button></form>`:""}
  </section>`}function Ua(s,n,a){const d=a.S,t=a.app;t.querySelectorAll("[data-mcup]").forEach(i=>i.onclick=()=>{const e=s.build.classes.find(c=>c.classId===i.dataset.mcup);a.save(ca(s,d.comp,i.dataset.mcup,e.level+1))}),t.querySelectorAll("[data-mcdown]").forEach(i=>i.onclick=()=>{const e=s.build.classes.find(c=>c.classId===i.dataset.mcdown);if(e.level<=1)return a.toast('Nível mínimo 1 — use "Remover" para tirar a classe.');a.save(ca(s,d.comp,i.dataset.mcdown,e.level-1))}),t.querySelectorAll("[data-mcsub]").forEach(i=>i.onchange=()=>a.save(Ca(s,d.comp,i.dataset.mcsub,i.value||null))),t.querySelectorAll("[data-mcrm]").forEach(i=>i.onclick=()=>{if(!a.confirmTwice(`[data-mcrm="${i.dataset.mcrm}"]`,"Toque de novo para remover"))return;const e=Ea(s,d.comp,i.dataset.mcrm);e&&a.save(e)}),p("#addclass")&&(p("#addclass").onsubmit=i=>{i.preventDefault();const e=Na(s,d.comp,p("#mcnew").value);e&&(a.save(e),a.toast("Classe adicionada no nível 1."))})}function Fa(s,n,a){var l,w,f,$,m,q;const d=a.S,t=s.build.classes[0].level,i=s.build.classes[0],e=((l=n.cls)==null?void 0:l.subclasses)||[],c=s.build.training||{};return`
  <section class="card stack">
    <div class="sectiontitle"><h2 style="margin:0">${n.multiclass?`${r(i.nomePersonalizado||((w=n.cls)==null?void 0:w.nome)||"")} ${t}`:`Nível ${t}`}</h2>
      <div class="row"><button class="btn small" id="lvldown" aria-label="Diminuir nível">−</button><button class="btn small primary" id="lvlup" aria-label="Subir de nível">+ Nível</button></div></div>
    ${n.multiclass?`<p class="empty-note" style="margin:0">Classe principal (foi ela que deu o 1º dado de vida cheio). Nível total do personagem: ${n.level}.</p>`:""}
    ${e.length?`<div><label for="subclass">Subclasse${t<3?" (a partir do nível 3)":""}</label>
      <select id="subclass" ${t<3?"disabled":""}><option value="">—</option>${e.map(g=>`<option value="${g.id}" ${g.id===i.subclassId?"selected":""}>${r(g.nome)}</option>`).join("")}</select></div>`:""}
    <div class="stats">
      <div><b>${j(n.pb)}</b><small>Proficiência</small></div>
      <div><b>${j(n.initiative)}</b><small>Iniciativa</small></div>
      <div><b>${r(n.speed.replace(" metros"," m"))}</b><small>Deslocamento</small></div>
      <div><b>${n.passivePerception}</b><small>Perc. passiva</small></div>
    </div>
    <div class="row"><label for="ac" style="margin:0">Classe de Armadura</label>
      <input id="ac" type="number" inputmode="numeric" style="width:6rem" value="${s.build.ac??10}" /></div>
    <div class="row"><label for="hpmax" style="margin:0">PV Máximo</label>
      <input id="hpmax" type="number" inputmode="numeric" min="1" style="width:6rem" value="${s.state.hp.max}" /></div>
    <p class="empty-note" style="margin:0">O PV máximo pode ser ajustado à mão — use o valor rolado no dado com o Mestre. Ao subir de nível, o app só soma o ganho médio da regra a esse valor.</p>
  </section>

  ${Ra(s,n,a)}

  <section class="card stack"><h2>Personalização de espécie/classe</h2>
    <p class="empty-note" style="margin:0">Pra jogar uma espécie ou classe alternativa/homebrew, dê um nome personalizado aqui — os números continuam vindo da opção escolhida na criação (${r(((f=n.sp)==null?void 0:f.nome)||"")} / ${r((($=n.cls)==null?void 0:$.nome)||"")}).</p>
    <div class="row">
      <div class="grow"><label for="pz-sp">Nome da espécie</label>
        <input id="pz-sp" maxlength="60" placeholder="${r(((m=n.sp)==null?void 0:m.nome)||"")}" value="${r(s.build.speciesNomePersonalizado||"")}" /></div>
      <div class="grow"><label for="pz-cl">Nome da classe</label>
        <input id="pz-cl" maxlength="60" placeholder="${r(((q=n.cls)==null?void 0:q.nome)||"")}" value="${r(i.nomePersonalizado||"")}" /></div>
    </div>
    <div><label for="pz-note">Notas da personalização</label>
      <textarea id="pz-note" rows="2" placeholder="O que muda nessa versão (aparência, traços trocados…)">${r(s.build.customNote||"")}</textarea></div>
  </section>

  <section class="card stack"><h2>Atributos e Salvaguardas</h2>
    <p class="empty-note">Toque em <b>Salvaguarda</b> para marcar/desmarcar proficiência.</p>
    <div class="abil2">${T.map(([g,v])=>{const b=(s.build.saveProfs||[]).includes(g);return`<div class="abcard">
        <small>${v}</small><b>${j(n.mods[g])}</b>
        <input class="abscore" data-score="${g}" type="number" inputmode="numeric" min="1" max="30" value="${s.build.abilities[g]}" aria-label="Valor de ${v}" />
        <button class="savebtn ${b?"on":""}" data-save="${g}" aria-pressed="${b}">
          <span class="dot ${b?"on":""}"></span>Salvaguarda <b>${j(n.saves[g])}</b></button>
      </div>`}).join("")}</div>
  </section>

  <section class="card"><h2>Perícias</h2><p class="empty-note">Toque para alternar: sem proficiência → proficiente (●) → especialista (◆).</p>
    <div class="skills">${n.skills.map(g=>`<button data-skill="${g.id}" aria-pressed="${g.prof||g.exp}">
      <span class="row" style="flex-wrap:nowrap"><span class="dot ${g.exp?"exp":g.prof?"on":""}"></span>${g.nome} <small class="muted">(${g.ab.toUpperCase()})</small></span><b>${j(g.bonus)}</b></button>`).join("")}</div>
  </section>

  <section class="card stack"><h2>Treinamento e Proficiências</h2>
    ${[["armaduras","Treinamento com Armaduras"],["armas","Proficiência com Armas"],["ferramentas","Proficiência com Ferramentas"],["idiomas","Idiomas"]].map(([g,v])=>`<div><label for="tr-${g}">${v}</label><textarea id="tr-${g}" data-train="${g}" rows="2">${r(c[g]||"")}</textarea></div>`).join("")}
  </section>

  <section class="card stack"><h2>Anotações</h2>
    <textarea id="notes" rows="5" placeholder="Aliados, pistas, história…">${r(s.notes)}</textarea></section>

  <section class="card stack"><h2>Mesa</h2>
    ${s.campaignId?`<p style="margin:0">Jogando em <b>${r(s.campaignName)}</b>. O Mestre dessa mesa pode ver e alterar esta ficha.</p>
         <button class="btn" id="leave-table">Sair da mesa</button>`:`<p class="muted" style="margin:0">Esta ficha não está em nenhuma mesa. Só você pode vê-la.</p>
         <form class="row" id="join"><input id="code" class="grow" autocomplete="off" autocapitalize="characters" placeholder="Código (ABC-123)" aria-label="Código da mesa" required style="width:auto" />
         <button class="btn primary">Entrar</button></form>`}
  </section>
  <section class="card stack"><h2>Conta</h2>
    <div class="row">${a.accountChip(d.user)}</div>
    <button class="btn danger small" id="delete">Apagar personagem</button>
  </section>`}let pa={};const P=(s,n,a=600)=>{clearTimeout(pa[s]),pa[s]=setTimeout(n,a)};function Qa(s,n,a){const d=a.S,t=a.app,i=s.build.classes[0].level;p("#lvlup").onclick=()=>n.level<20&&a.save(W(s,d.comp,i+1)).then(()=>a.toast(`Nível ${i+1}! PV máximo, Dados de Vida e espaços atualizados.`)),p("#lvldown").onclick=()=>i>1&&a.save(W(s,d.comp,i-1)),p("#subclass")&&(p("#subclass").onchange=e=>a.save(W(s,d.comp,i,e.target.value||null))),Ua(s,n,a),p("#pz-sp").oninput=e=>P("pzsp",()=>a.save({"build.speciesNomePersonalizado":e.target.value.trim()||null})),p("#pz-cl").oninput=e=>P("pzcl",()=>{const c=s.build.classes.map((l,w)=>w===0?{...l,nomePersonalizado:p("#pz-cl").value.trim()||null}:l);a.save({"build.classes":c})}),p("#pz-note").oninput=e=>P("pznote",()=>a.save({"build.customNote":e.target.value})),p("#ac").onchange=e=>a.save({"build.ac":Number(e.target.value)||10}),p("#hpmax").onchange=e=>{const c=Math.max(1,Number(e.target.value)||1);a.save({"state.hp":{...s.state.hp,max:c,current:Math.min(s.state.hp.current,c)}})},t.querySelectorAll("[data-score]").forEach(e=>e.onchange=()=>{const c=Math.max(1,Math.min(30,Number(e.value)||10)),l=e.dataset.score,w={[`build.abilities.${l}`]:c};l==="con"&&(w["state.hp"]={...s.state.hp,...Aa(s,d.comp,c)}),a.save(w)}),t.querySelectorAll("[data-save]").forEach(e=>e.onclick=()=>{const c=e.dataset.save,l=s.build.saveProfs||[];a.save({"build.saveProfs":l.includes(c)?l.filter(w=>w!==c):[...l,c]})}),t.querySelectorAll("[data-skill]").forEach(e=>e.onclick=()=>{const c=e.dataset.skill,l=s.build.skillProfs||[],w=s.build.expertise||[];w.includes(c)?a.save({"build.expertise":w.filter(f=>f!==c),"build.skillProfs":l.filter(f=>f!==c)}):l.includes(c)?a.save({"build.expertise":[...w,c]}):a.save({"build.skillProfs":[...l,c]})}),t.querySelectorAll("[data-train]").forEach(e=>e.oninput=()=>P("tr"+e.dataset.train,()=>a.save({[`build.training.${e.dataset.train}`]:e.value}))),p("#notes").oninput=e=>P("notes",()=>a.save({notes:e.target.value})),a.bindLogout(d.be,t),p("#join")&&(p("#join").onsubmit=async e=>{e.preventDefault();try{const c=await d.be.joinByCode(p("#code").value);await d.be.updateCharacter(d.chId,{campaignId:c.id,campaignName:c.name}),a.toast(`${s.name} entrou na mesa ${c.name}.`)}catch(c){a.toast(c.message)}}),p("#leave-table")&&(p("#leave-table").onclick=()=>{a.confirmTwice("#leave-table","Toque de novo para confirmar")&&a.save({campaignId:null,campaignName:null})}),p("#delete").onclick=async()=>{if(!a.confirmTwice("#delete",`Toque de novo para apagar ${s.name}`))return;const e=d.chId;await d.be.deleteCharacter(e),a.showHome()}}function _a(s,n,a){const d=a.S,t=d.comp,i=d.ui,e=new Set(n.bonusSpells||[]),c=(s.build.spellsKnown||[]).filter(u=>!e.has(u)),l=s.build.spellsPrepared||[],w=[...e].map(u=>t.byId.spells[u]).filter(Boolean).sort((u,S)=>u.nivel-S.nivel||u.nome.localeCompare(S.nome)),f=Object.entries(s.state.spellSlots||{}),$=Object.entries(s.state.pactSlots||{}),m=[...f,...$].reduce((u,[S,I])=>I.max>0?Math.max(u,Number(S)):u,0),q=n.casters.length>0,g=c.map(u=>t.byId.spells[u]).filter(Boolean).sort((u,S)=>u.nivel-S.nivel||u.nome.localeCompare(S.nome)),v={};g.forEach(u=>{var S;return(v[S=u.nivel]||(v[S]=[])).push(u)});const b=s.build.classes.map(u=>u.classId),k=n.classesInfo.map(u=>{var S;return(S=u.cls)==null?void 0:S.nome}).filter(Boolean).join(" + "),y=n.spellCaps||{},C=g.filter(u=>u.nivel===0).length,o=g.filter(u=>u.nivel>0).length,A=l.length,B=y.cantrips!==null&&C>=y.cantrips,ya=y.known!==null&&o>=y.known,wa=y.prepared!==null&&A>=y.prepared,oa=L(i.spellQ);let U=t.spells.filter(u=>!c.includes(u.id)&&!e.has(u.id)&&(!i.spellMine||!n.casters.length||u.classes.some(S=>b.includes(S)))&&(i.spellLvl==="all"||String(u.nivel)===i.spellLvl)&&(!oa||L(u.nome).includes(oa)));const la=U.length;U=U.slice(0,H);const ka=u=>(u.nivel===0?B:ya)?`<button class="btn small" data-learnfull="${u.nivel===0?"truque":"magia"}" aria-label="Limite atingido">+</button>`:ea("data-learn",u.id,"Adicionar "+r(u.nome)),qa=u=>{const S=l.includes(u.id);return!S&&wa?'<button class="btn small" data-prepfull="1" aria-label="Limite de magias preparadas atingido">Preparar</button>':`<button class="btn small" data-prep="${u.id}">${S?"✓ Preparada":"Preparar"}</button>`},na=(u,S)=>`
    <div class="muted" style="font-size:.85rem">${r(u.escola)} · ${r(u.tempo)} · ${r(u.alcance)}<br>${r(u.componentes)} · ${r(u.duracao)}</div>
    ${D(u.desc)}
    <div class="row">${S?`${u.nivel>0?qa(u):""}
         ${u.concentracao?`<button class="btn small" data-conc="${u.id}">${s.state.concentration===u.id?"Encerrar concentração":"Concentrar"}</button>`:""}
         <button class="btn small" data-forget="${u.id}">Remover</button>`:""}</div>`,G=u=>[u.concentracao?"C":"",u.ritual?"R":""].filter(Boolean).map(S=>`<span class="chip">${S}</span>`).join(" "),K=(u,S,I)=>I===null?"":`<span class="lvl-badge">${S}/${I} ${u}</span>`,Sa=u=>`
    <div class="muted" style="font-size:.85rem">${r(u.escola)} · ${r(u.tempo)} · ${r(u.alcance)}<br>${r(u.componentes)} · ${r(u.duracao)}</div>
    ${D(u.desc)}
    ${u.concentracao?`<div class="row"><button class="btn small" data-conc="${u.id}">${s.state.concentration===u.id?"Encerrar concentração":"Concentrar"}</button></div>`:""}`;return`
  ${n.casters.length?`<section class="card stack">${n.casters.map(u=>`<div class="stats" style="grid-template-columns:repeat(3,1fr)">
    <div><b>${u.dc}</b><small>CD (${r(u.nome)})</small></div><div><b>${j(u.atk)}</b><small>Ataque mágico</small></div>
    <div><b>${fa[u.atributoConjuracao].slice(0,3)}</b><small>Atributo</small></div></div>`).join("")}</section>`:""}
  ${f.length?`<section class="card slots"><h2>Espaços de magia${n.multiclass?" (combinados)":""}</h2>
    ${f.map(([u,S])=>`<div class="lvl"><span>${u}º</span>${Array.from({length:S.max},(I,z)=>`<button class="slotpip ${z<S.used?"used":""}" data-slot="${u}" data-i="${z}" aria-label="Espaço de ${u}º círculo ${z+1}${z<S.used?", gasto":""}"></button>`).join("")}</div>`).join("")}
  </section>`:""}
  ${$.length?`<section class="card slots"><h2>Magia de Pacto</h2>
    ${$.map(([u,S])=>`<div class="lvl"><span>${u}º</span>${Array.from({length:S.max},(I,z)=>`<button class="slotpip ${z<S.used?"used":""}" data-pactslot="${u}" data-i="${z}" aria-label="Espaço de pacto ${z+1}${z<S.used?", gasto":""}"></button>`).join("")}</div>`).join("")}
  </section>`:""}
  ${w.length?`<section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Magias da Subclasse</h2><span class="lvl-badge">sempre preparadas</span></div>
    <p class="empty-note" style="margin:0">Concedidas automaticamente pela subclasse — não contam no limite de magias conhecidas/preparadas, mas ainda gastam um espaço de magia ao conjurar.</p>
    <div class="stack">${w.map(u=>x(`${r(u.nome)} ${G(u)}`,F(u.nivel),Sa(u),!1,`data-k="b-${u.id}"`)).join("")}</div>
  </section>`:""}
  ${y.cantrips!==null||y.known!==null||y.prepared!==null?`<section class="card stack"><h2>Limites de magias (regra 2024)</h2>
    <div class="row" style="flex-wrap:wrap;gap:.4rem">${K("truques",C,y.cantrips)}${K("magias conhecidas",o,y.known)}${K("preparadas",A,y.prepared)}</div>
    <details class="entry"><summary><span class="t">Exceção manual (magia extra de livro/pergaminho…)</span></summary><div class="body stack">
      <p class="empty-note" style="margin:0">Some ao limite oficial acima. Use quando o personagem aprendeu algo fora da regra normal.</p>
      <div class="row" style="flex-wrap:wrap">
        <div class="grow"><label for="extra-cantrips">Truques extras</label><input id="extra-cantrips" type="number" min="0" value="${s.build.extraCantrips||0}" /></div>
        <div class="grow"><label for="extra-spells">Magias extras</label><input id="extra-spells" type="number" min="0" value="${s.build.extraSpells||0}" /></div>
        ${y.invocacoes!==null?`<div class="grow"><label for="extra-invoc">Invocações extras</label><input id="extra-invoc" type="number" min="0" value="${s.build.extraInvocations||0}" /></div>`:""}
      </div>
      <div><label for="extra-note">Motivo (opcional)</label>
        <textarea id="extra-note" rows="2" placeholder="Ex.: aprendeu com um pergaminho encontrado na masmorra">${r(s.build.extraSpellsNote||"")}</textarea></div>
    </div></details>
  </section>`:""}
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Minhas magias</h2><span class="lvl-badge">${l.length} preparada(s)</span></div>
    ${Object.keys(v).length?Object.entries(v).map(([u,S])=>`<h3 style="margin:.6rem 0 .2rem;color:var(--muted)">${F(Number(u))}</h3>
      <div class="stack" style="--gap:.4rem">${S.map(I=>x(`${I.nivel>0&&l.includes(I.id)?"✓ ":""}${r(I.nome)} ${G(I)}`,F(I.nivel),na(I,!0),!1,`data-k="m-${I.id}"`)).join("")}</div>`).join(""):'<p class="empty-note">Nenhuma magia ainda. Adicione pela biblioteca abaixo.</p>'}
  </section>
  <section class="card stack"><h2>Biblioteca de magias</h2>
    <input id="spellq" type="search" placeholder="Buscar magia pelo nome…" value="${r(i.spellQ)}" aria-label="Buscar magia" />
    <div class="filters">${["all","0","1","2","3","4","5","6","7","8","9"].map(u=>{const S=u==="all"||(u==="0"?q:q&&Number(u)<=m);return`<button data-flvl="${u}" aria-pressed="${i.spellLvl===u}" class="${S?"":"unavail"}" ${S?"":'title="Ainda não disponível no seu nível"'}>${u==="all"?"Todas":u==="0"?"Truques":u+"º"}</button>`}).join("")}</div>
    ${q?`<p class="empty-note" style="margin:0">Seu nível permite conjurar ${m===0?"só truques":`truques e magias até ${m}º círculo`}. Os demais círculos aparecem esmaecidos até você subir de nível.</p>`:""}
    ${k?`<label class="chk"><input type="checkbox" id="spellmine" ${i.spellMine?"checked":""}> Só a lista de ${r(k)}</label>`:""}
    <p class="empty-note">${la} magia(s)${la>H?` — mostrando ${H}, refine a busca`:""}.</p>
    <div class="stack">${U.map(u=>x(`${r(u.nome)} ${G(u)}`,F(u.nivel),na(u,!1),!1,`data-k="l-${u.id}"`,ka(u))).join("")}</div>
  </section>`}function Ga(s,n,a){const d=a.S,t=a.app,i=d.ui;t.querySelectorAll("[data-slot]").forEach(e=>e.onclick=()=>{const c=e.dataset.slot,l=Number(e.dataset.i),w=s.state.spellSlots[c];a.save({[`state.spellSlots.${c}.used`]:l<w.used?l:l+1})}),t.querySelectorAll("[data-pactslot]").forEach(e=>e.onclick=()=>{const c=e.dataset.pactslot,l=Number(e.dataset.i),w=s.state.pactSlots[c];a.save({[`state.pactSlots.${c}.used`]:l<w.used?l:l+1})}),p("#spellq").oninput=e=>{i.spellQ=e.target.value,P("sq",a.render,250)},t.querySelectorAll("[data-flvl]").forEach(e=>e.onclick=()=>{i.spellLvl=e.dataset.flvl,a.render()}),p("#spellmine")&&(p("#spellmine").onchange=e=>{i.spellMine=e.target.checked,a.render()}),t.querySelectorAll("[data-learn]").forEach(e=>e.onclick=()=>a.save({"build.spellsKnown":[...s.build.spellsKnown||[],e.dataset.learn]})),t.querySelectorAll("[data-learnfull]").forEach(e=>e.onclick=()=>N(`Limite de ${e.dataset.learnfull==="truque"?"truques conhecidos":"magias conhecidas"} atingido. Use a exceção manual acima se for o caso.`)),t.querySelectorAll("[data-forget]").forEach(e=>e.onclick=()=>a.save({"build.spellsKnown":(s.build.spellsKnown||[]).filter(c=>c!==e.dataset.forget),"build.spellsPrepared":(s.build.spellsPrepared||[]).filter(c=>c!==e.dataset.forget)})),t.querySelectorAll("[data-prep]").forEach(e=>e.onclick=()=>{const c=s.build.spellsPrepared||[],l=e.dataset.prep;a.save({"build.spellsPrepared":c.includes(l)?c.filter(w=>w!==l):[...c,l]})}),t.querySelectorAll("[data-prepfull]").forEach(e=>e.onclick=()=>N("Limite de magias preparadas atingido. Use a exceção manual acima se for o caso.")),p("#extra-cantrips")&&(p("#extra-cantrips").onchange=e=>a.save({"build.extraCantrips":Math.max(0,Number(e.target.value)||0)})),p("#extra-spells")&&(p("#extra-spells").onchange=e=>a.save({"build.extraSpells":Math.max(0,Number(e.target.value)||0)})),p("#extra-invoc")&&(p("#extra-invoc").onchange=e=>a.save({"build.extraInvocations":Math.max(0,Number(e.target.value)||0)})),p("#extra-note")&&(p("#extra-note").oninput=e=>P("extranote",()=>a.save({"build.extraSpellsNote":e.target.value}))),t.querySelectorAll("[data-conc]").forEach(e=>e.onclick=()=>a.save({"state.concentration":s.state.concentration===e.dataset.conc?null:e.dataset.conc})),Q(t,"spells")}const J={};function Q(s,n){s.querySelectorAll("summary .addbtn").forEach(d=>d.addEventListener("click",t=>t.preventDefault()));const a=J[n]||(J[n]=new Set);s.querySelectorAll("details.entry").forEach((d,t)=>{var e;const i=d.dataset.k||((e=d.querySelector("summary .t"))==null?void 0:e.textContent)||t;a.has(i)&&(d.open=!0),d.addEventListener("toggle",()=>d.open?a.add(i):a.delete(i))})}function Ka(s,n,a,d){var v;const{cls:t,sub:i,level:e,classId:c,nomePersonalizado:l}=n;if(!t)return`<section class="card">Classe "${r(c)}" não encontrada no compêndio.</section>`;const w=l||t.nome,f=t.caracteristicas||[],$=f.filter(b=>b.nivel<=e),m=f.filter(b=>b.nivel>e),q=s.build.opcoes||[],g=c==="bruxo"?((v=a.spellCaps)==null?void 0:v.invocacoes)??null:null;return`
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Características de ${r(w)}</h2><span class="lvl-badge">nível ${e}</span></div>
    ${l?`<p class="empty-note" style="margin:0">Usa as regras de ${r(t.nome)}.</p>`:""}
    ${$.length?$.map(b=>x(r(b.nome),`Nível ${b.nivel}`,D(b.desc))).join(""):'<p class="empty-note">Importe o compêndio completo para ver as características.</p>'}
    ${m.length?`<details class="entry"><summary><span class="t muted">Próximos níveis (${m.length})</span></summary><div class="body stack">
      ${m.map(b=>x(r(b.nome),`Nível ${b.nivel}`,D(b.desc))).join("")}</div></details>`:""}
  </section>
  ${(t.opcoes||[]).map(b=>{const k=c==="bruxo"&&/Invoca/i.test(b.titulo),y=k?b.itens.filter(o=>q.includes(o.id)).length:null,C=k&&g!==null&&y>=g;return`<section class="card stack"><div class="sectiontitle"><h2 style="margin:0">${r(b.titulo.replace("Opções de ",""))} (${r(w)})</h2>${k&&g!==null?`<span class="lvl-badge">${y}/${g}</span>`:""}</div>
    ${b.itens.filter(o=>q.includes(o.id)).map(o=>x("✓ "+r(o.nome),"",D(o.desc)+`<button class="btn small" data-unop="${o.id}">Remover</button>`)).join("")||'<p class="empty-note">Nenhuma escolhida.</p>'}
    <details class="entry"><summary><span class="t">Escolher ${r(b.titulo.replace("Opções de ","").toLowerCase())}</span><span class="lvl-badge">${b.itens.length}</span></summary><div class="body stack">
      ${b.itens.filter(o=>!q.includes(o.id)).map(o=>x(r(o.nome),"",D(o.desc),!1,`data-k="o-${c}-${o.id}"`,C?'<button class="btn small" data-opfull="1" aria-label="Limite de invocações atingido">+</button>':ea("data-op",o.id,"Escolher "+r(o.nome)))).join("")}
    </div></details></section>`}).join("")}
  <section class="card stack"><h2>Subclasse de ${r(w)}${i?": "+r(i.nome):""}</h2>
    ${i?(i.caracteristicas||[]).map(b=>x(`${b.nivel>e?"🔒 ":""}${r(b.nome)}`,`Nível ${b.nivel}`,D(b.desc))).join(""):`<p class="empty-note">${e<3?"A subclasse é escolhida no nível 3.":"Escolha a subclasse na aba Ficha (ou em Multiclasse, para uma classe secundária)."}</p>
         ${(t.subclasses||[]).map(b=>x(r(b.nome),"",D(b.intro))).join("")}`}
  </section>`}function Wa(s,n,a){const d=n.sp,t=n.bg,i=n.speciesLabel||(d==null?void 0:d.nome)||"espécie";return`
  ${n.classesInfo.map(e=>Ka(s,e,n)).join("")}
  <section class="card stack"><h2>Traços de ${r(i)}</h2>
    ${d&&i!==d.nome?`<p class="empty-note" style="margin:0">Usa as regras de ${r(d.nome)}.</p>`:""}
    <p class="empty-note">${r((d==null?void 0:d.tipo)||"")} · ${r((d==null?void 0:d.tamanho)||"")} · Deslocamento ${r((d==null?void 0:d.deslocamento)||"")}</p>
    ${((d==null?void 0:d.tracos)||[]).filter(e=>e.nome!=="Detalhes").map(e=>x(r(e.nome),"",D(e.desc))).join("")||'<p class="empty-note">Sem traços no compêndio.</p>'}
  </section>
  ${t?`<section class="card stack"><h2>Antecedente: ${r(t.nome)}</h2>
    <p style="margin:0;font-size:.92rem"><b>Atributos:</b> ${t.atributos.map(e=>fa[e]).join(", ")}<br>
    <b>Talento:</b> ${r(t.talento)}<br><b>Ferramenta:</b> ${r(t.ferramenta)}<br><b>Equipamento:</b> ${r(t.equipamento)}</p></section>`:""}
  ${s.build.customNote?`<section class="card stack"><h2>Notas da personalização</h2><p style="margin:0;white-space:pre-wrap">${r(s.build.customNote)}</p></section>`:""}`}function Ya(s,n,a){const d=a.app,t=s.build.opcoes||[];d.querySelectorAll("[data-op]").forEach(i=>i.onclick=()=>a.save({"build.opcoes":[...t,i.dataset.op]})),d.querySelectorAll("[data-unop]").forEach(i=>i.onclick=()=>a.save({"build.opcoes":t.filter(e=>e!==i.dataset.unop)})),d.querySelectorAll("[data-opfull]").forEach(i=>i.onclick=()=>N("Limite de invocações místicas atingido. Use a exceção manual na aba Magias se for o caso.")),Q(d,"classe")}const Ja=["Origem","Geral","Estilo de Luta","Dádiva Épica"];function Xa(s,n,a){const d=a.S,t=d.comp,i=d.ui,e=s.build.feats||[],c=L(i.featQ);let l=t.feats.filter(f=>(f.repetivel||!e.some($=>$.id===f.id))&&(i.featCat==="all"||f.categoria===i.featCat)&&(!c||L(f.nome).includes(c)||L(f.prereq).includes(c)));const w=l.length;return l=l.slice(0,H),`
  <section class="card stack"><h2>Meus talentos</h2>
    ${e.length?e.map((f,$)=>{const m=t.byId.feats[f.id];return x(r((m==null?void 0:m.nome)||f.id),r(f.origem||(m==null?void 0:m.categoria)||""),(m?`<p class="empty-note">${r(m.categoria)}${m.prereq?" · Pré-requisito: "+r(m.prereq):""}</p>${D(m.desc)}`:'<p class="empty-note">Talento fora do compêndio.</p>')+`<button class="btn small" data-unfeat="${$}">Remover</button>`)}).join(""):'<p class="empty-note">Nenhum talento. Seu antecedente concede um talento de Origem.</p>'}
  </section>
  <section class="card stack"><h2>Biblioteca de talentos</h2>
    <input id="featq" type="search" placeholder="Buscar talento…" value="${r(i.featQ)}" aria-label="Buscar talento" />
    <div class="filters">${["all",...Ja].map(f=>`<button data-fcat="${f}" aria-pressed="${i.featCat===f}">${f==="all"?"Todos":f}</button>`).join("")}</div>
    <p class="empty-note">${w} talento(s)${w>H?` — mostrando ${H}`:""}.</p>
    ${l.map(f=>x(r(f.nome),r(f.categoria),`${f.prereq?`<p class="empty-note">Pré-requisito: ${r(f.prereq)}</p>`:""}${D(f.desc)}`,!1,`data-k="f-${f.id}"`,ea("data-feat",f.id,"Adicionar "+r(f.nome)))).join("")}
    ${t.feats.length?"":'<p class="empty-note">Importe o compêndio completo para usar a biblioteca de talentos.</p>'}
  </section>`}function Za(s,n,a){const d=a.S,t=a.app,i=s.build.feats||[];p("#featq").oninput=e=>{d.ui.featQ=e.target.value,P("fq",a.render,250)},t.querySelectorAll("[data-fcat]").forEach(e=>e.onclick=()=>{d.ui.featCat=e.dataset.fcat,a.render()}),t.querySelectorAll("[data-feat]").forEach(e=>e.onclick=()=>{a.save({"build.feats":[...i,{id:e.dataset.feat,origem:"Escolhido"}]}),a.toast("Talento adicionado. Aplique aumentos de atributo na aba Ficha, se houver.")}),t.querySelectorAll("[data-unfeat]").forEach(e=>e.onclick=()=>a.save({"build.feats":i.filter((c,l)=>l!==Number(e.dataset.unfeat))})),Q(t,"feats")}function ae(s,n,a){const d=a.S,t=d.comp,i=d.ui,e=s.inventory||[],c=s.coins||{},l=L(i.itemQ),w=l.length>=2?t.items.filter(o=>L(o.nome).includes(l)).slice(0,25):[],f=Math.min(100,Math.round(n.weight/n.carry*100)),$=o=>o.tipo==="arma"?`${r(o.dano)} · ${r(o.propriedades)} · Maestria: ${r(o.maestria)}`:o.tipo==="armadura"?`CA ${r(o.ca)}${o.forca&&o.forca!=="—"?" · "+r(o.forca):""}${o.furtividade==="Desvantagem"?" · Desv. Furtividade":""}`:"",m=o=>o.itemId?t.byId.weapons[o.itemId]||t.byId.armor[o.itemId]||t.byId.gear[o.itemId]:null,q=(o,A)=>/po[çc][aã]o|elixir|antídoto/i.test(o.nome||(A==null?void 0:A.nome)||""),g={arma:"Armas",armadura:"Armaduras",pocao:"Poções"},v=o=>{const A=m(o);return(A==null?void 0:A.tipo)==="arma"?"Armas":(A==null?void 0:A.tipo)==="armadura"?"Armaduras":!A&&g[o.categoria]?g[o.categoria]:q(o,A)?"Poções":"Outros"},b=o=>o.categoria==="arma"&&o.dano?`${r(o.dano)}${o.ranged?" · À distância":""}${o.finesse?" · Acuidade":""}`:o.categoria==="armadura"&&Number(o.ca)?`CA ${o.ca}${o.caDex?` + Destreza${o.caDexMax!=null&&o.caDexMax!==""?` (máx ${o.caDexMax})`:""}`:""}`:"",k=o=>{const A=m(o),B=!A&&b(o);return x(`${o.equipado?"🛡️ ":""}${r(o.nome)}${Number(o.qtd)>1?` <span class="muted">×${o.qtd}</span>`:""}`,r(o.peso||""),`${A?`<p class="empty-note">${$(A)}${A.custo?" · "+r(A.custo):""}</p>${A.desc?D(A.desc):""}`:B?`<p class="empty-note">${B}</p>`:""}
      <div class="row">
        <button class="btn small" data-qty="${o.uid}" data-d="-1">−</button><b>${o.qtd}</b><button class="btn small" data-qty="${o.uid}" data-d="1">+</button>
        <label class="chk"><input type="checkbox" data-equip="${o.uid}" ${o.equipado?"checked":""}> Equipado</label>
        <label class="chk"><input type="checkbox" data-attune="${o.uid}" ${o.sintonizado?"checked":""}> Sintonizado</label>
      </div>
      <input data-inote="${o.uid}" id="inote-${o.uid}" value="${r(o.notas||"")}" placeholder="Notas (cargas, efeitos…)" aria-label="Notas do item" />
      <button class="btn small danger" data-rmitem="${o.uid}">Remover item</button>`,!1,`data-k="i-${o.uid}"`)},y=["Armas","Armaduras","Poções","Outros"],C=Object.fromEntries(y.map(o=>[o,e.filter(A=>v(A)===o)]));return`
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Bolsa de moedas</h2><span class="lvl-badge">≈ ${n.coinsGP.toLocaleString("pt-BR",{maximumFractionDigits:2})} PO</span></div>
    <div class="coins">${ia.map(([o,A,B])=>`<label class="coin coin-${o}"><span>${A}</span>
      <input type="number" inputmode="numeric" min="0" data-coin="${o}" value="${Number(c[o])||0}" aria-label="${B}" /></label>`).join("")}</div>
    <form class="row" id="coinop">
      <input id="coinamt" type="number" inputmode="numeric" min="1" placeholder="Qtd." style="width:5.5rem" aria-label="Quantidade" />
      <select id="coinkind" style="width:5.5rem" aria-label="Moeda">${ia.map(([o,A])=>`<option value="${o}" ${o==="po"?"selected":""}>${A}</option>`).join("")}</select>
      <button class="btn heal small" data-cop="+">Receber</button><button class="btn danger small" data-cop="-">Gastar</button>
    </form>
  </section>
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Inventário</h2><span class="lvl-badge">${n.weight.toLocaleString("pt-BR",{maximumFractionDigits:1})} / ${n.carry} kg</span></div>
    <div class="hpbar" aria-hidden="true"><div class="cur ${f>100?"low":f>75?"mid":""}" style="width:${f}%"></div></div>
    ${e.length?y.filter(o=>C[o].length).map(o=>`
      <div class="inv-divider"><span>${o}</span><span class="muted">${C[o].length}</span></div>
      ${C[o].map(k).join("")}`).join(""):'<p class="empty-note">Inventário vazio.</p>'}
  </section>
  <section class="card stack"><h2>Adicionar item</h2>
    <input id="itemq" type="search" placeholder="Buscar armas, armaduras, equipamento… (2+ letras)" value="${r(i.itemQ)}" aria-label="Buscar item" />
    ${w.map(o=>`<div class="libitem"><div class="info"><b>${r(o.nome)}</b><small>${r(o.custo||"")}${o.peso?" · "+r(o.peso):""} ${$(o)?"· "+$(o):""}</small></div>
      <button class="btn small primary" data-additem="${o.id}">+</button></div>`).join("")}
    ${l.length>=2&&!w.length?'<p class="empty-note">Nada encontrado — crie um item personalizado abaixo.</p>':""}
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
  </section>`}function ee(s,n,a){const d=a.S,t=a.app,i=d.comp,e=s.inventory||[],c={pc:0,pp:0,pe:0,po:0,pl:0,...s.coins||{}},l=$=>a.save({inventory:$});t.querySelectorAll("[data-coin]").forEach($=>$.onchange=()=>a.save({coins:{...c,[$.dataset.coin]:Math.max(0,Number($.value)||0)}})),t.querySelectorAll("[data-cop]").forEach($=>$.onclick=m=>{m.preventDefault();const q=Number(p("#coinamt").value),g=p("#coinkind").value;if(!q)return a.toast("Digite a quantidade.");const v=c[g]+($.dataset.cop==="+"?q:-q);if(v<0)return a.toast(`Não há ${q} ${g.toUpperCase()} suficientes.`);a.save({coins:{...c,[g]:v}})}),p("#itemq").oninput=$=>{d.ui.itemQ=$.target.value,P("iq",a.render,250)},t.querySelectorAll("[data-additem]").forEach($=>$.onclick=()=>{const m=i.items.find(g=>g.id===$.dataset.additem),q=e.find(g=>g.itemId===m.id);l(q?e.map(g=>g===q?{...g,qtd:Number(g.qtd)+1}:g):[...e,{uid:ma(),itemId:m.id,nome:m.nome,qtd:1,peso:m.peso||"",equipado:!1,sintonizado:!1,notas:""}]),a.toast(`${m.nome} adicionado.`)});const w=()=>{const $=p("#ccat").value;p("#c-arma-fields").style.display=$==="arma"?"":"none",p("#c-armadura-fields").style.display=$==="armadura"?"":"none"};p("#ccat").onchange=w,w(),p("#custom").onsubmit=$=>{$.preventDefault();const m=p("#cname").value.trim();if(!m)return;const q=p("#cweight").value.trim(),g=Math.max(1,Number(p("#cqty").value)||1),v=p("#ccat").value,b={uid:ma(),itemId:null,nome:m,categoria:v,qtd:g,peso:q?`${q} kg`:"",equipado:!1,sintonizado:!1,notas:p("#cdetail").value.trim()};if(v==="arma"){const k=p("#cdano").value.trim();k&&(b.dano=k),b.ranged=p("#cranged").checked,b.finesse=p("#cfinesse").checked}else if(v==="armadura"){const k=Number(p("#ccabase").value);k&&(b.ca=k),b.caDex=p("#ccadex").checked;const y=p("#ccadexmax").value.trim();y&&(b.caDexMax=Number(y))}l([...e,b]),a.toast(`${m} adicionado.`)};const f=($,m)=>l(e.map(q=>q.uid===$?m(q):q));t.querySelectorAll("[data-qty]").forEach($=>$.onclick=()=>f($.dataset.qty,m=>({...m,qtd:Math.max(0,Number(m.qtd)+Number($.dataset.d))}))),t.querySelectorAll("[data-equip]").forEach($=>$.onchange=()=>f($.dataset.equip,m=>({...m,equipado:$.checked}))),t.querySelectorAll("[data-attune]").forEach($=>$.onchange=()=>{if($.checked&&e.filter(m=>m.sintonizado).length>=3)return $.checked=!1,a.toast("Limite de 3 itens sintonizados.");f($.dataset.attune,m=>({...m,sintonizado:$.checked}))}),t.querySelectorAll("[data-inote]").forEach($=>$.oninput=()=>P("in"+$.dataset.inote,()=>f($.dataset.inote,m=>({...m,notas:$.value})))),t.querySelectorAll("[data-rmitem]").forEach($=>$.onclick=()=>l(e.filter(m=>m.uid!==$.dataset.rmitem))),Q(t,"itens")}const se={ficha:{html:Fa,bind:Qa},magias:{html:_a,bind:Ga},classe:{html:Wa,bind:Ya},talentos:{html:Xa,bind:Za},itens:{html:ae,bind:ee}},E=p("#app"),h={be:null,comp:null,user:null,chId:null,ch:null,tab:"combate",amount:"",off:[],prevHp:null,ui:{spellQ:"",spellLvl:"all",spellMine:!0,featQ:"",featCat:"all",itemQ:"",libOpen:{}}};function X(s){if(!h.ch||!s)return;const n=structuredClone(h.ch);Object.entries(s).forEach(([a,d])=>Va(n,a,d)),h.ch=n,V()}const sa=()=>`rpgmesa:last:${h.user.uid}`,_=()=>{h.off.forEach(s=>s()),h.off=[]},ba=Object.fromEntries(Ia.map(([s,n])=>[s,n])),Z=Object.fromEntries(T);te().catch(s=>{E.innerHTML=`<div class="wrap"><div class="card">Erro ao iniciar: ${r(s.message)}</div></div>`});async function te(){h.be=await ja(),xa(h.be,E,{title:"Grimório do Aventureiro",subtitle:"Entre com sua conta para acessar seus personagens em qualquer aparelho.",onSignedOut:()=>{_(),h.ch=null,h.chId=null,h.prevHp=null}},async s=>{h.user=s,E.innerHTML='<p class="muted" style="padding:1rem">Carregando compêndio…</p>',h.comp=await Da(h.be);const n=aa.get(sa());n?ta(n):R()})}const ha=()=>h.be.mode==="local"?'<p class="banner">Modo demo: os dados ficam neste navegador. Abra o Escudo em outra aba para testar a sincronização.</p>':"",oe=()=>h.comp.completo?"":'<p class="banner">Biblioteca reduzida: o Mestre ainda não importou o compêndio completo no Escudo.</p>';function R(){_(),h.chId=null,h.ch=null,aa.set(sa(),null);let s=!1;h.off.push(h.be.watchMyCharacters(n=>{p("#build")||(n.sort((a,d)=>a.name.localeCompare(d.name)),E.innerHTML=`<header class="top"><div class="row"><div class="grow name">Meus personagens</div>
      <a class="btn small" href="./escudo.html" title="Ir para o Escudo do Mestre">🛡️ Escudo</a>${va(h.user)}</div></header>
    <main class="wrap stack">${ha()}${oe()}
      ${n.map(a=>`<button class="charbtn" data-open="${a.id}">
        <span><b>${r(a.name)}</b><br><small class="muted">${r(ga(a))}</small></span>
        <span class="chip">${a.campaignName?"🎲 "+r(a.campaignName):"Sem mesa"}</span></button>`).join("")}
      ${n.length?"":'<div class="card"><p style="margin:0">Você ainda não tem personagens. Crie o primeiro abaixo — ele fica salvo na sua conta.</p></div>'}
      <button class="btn primary" id="newchar" style="width:100%">+ Novo personagem</button>
    </main>`,$a(h.be,E),E.querySelectorAll("[data-open]").forEach(a=>a.onclick=()=>ta(a.dataset.open)),p("#newchar").onclick=()=>le(),!n.length&&!s&&(s=!0))}))}function le(){_();const s=h.comp,n=[15,14,13,12,10,8];E.innerHTML=`<header class="top"><div class="row"><button class="btn small" id="back" aria-label="Voltar">◀</button><div class="grow name">Novo personagem</div></div></header>
  <main class="wrap stack">
  <form class="stack" id="build">
    <section class="card stack">
      <div><label for="name">Nome</label><input id="name" name="name" required maxlength="40" /></div>
      <div class="row">
        <div class="grow"><label for="species">Espécie</label><select id="species" name="species">
          ${s.species.map(v=>`<option value="${v.id}">${r(v.nome)}</option>`).join("")}</select></div>
        <div style="width:5.5rem"><label for="level">Nível</label><input id="level" name="level" type="number" inputmode="numeric" min="1" max="20" value="1" /></div>
      </div>
      <div><label for="speciesnome">Nome personalizado da espécie (opcional)</label>
        <input id="speciesnome" name="speciesnome" maxlength="60" placeholder="Ex.: Genasi da Terra" /></div>
      <div><label for="class">Classe</label><select id="class" name="class">
        ${s.classes.map(v=>`<option value="${v.id}">${r(v.nome)}</option>`).join("")}</select></div>
      <div><label for="classnome">Nome personalizado da classe (opcional)</label>
        <input id="classnome" name="classnome" maxlength="60" placeholder="Ex.: Arcanista" /></div>
      <p class="muted" style="margin:0;font-size:.85rem">Pra usar uma espécie ou classe alternativa/homebrew que não está na lista, escolha acima a mais parecida em regras — é dela que vêm os números — e dê um nome personalizado aqui, que aparece no lugar do nome oficial em toda a ficha.</p>
      <div><label for="customnote">Notas da personalização (opcional)</label>
        <textarea id="customnote" name="customnote" rows="2" placeholder="O que muda nessa versão (aparência, traços trocados…)"></textarea></div>
      <div id="classinfo"></div>
    </section>
    ${s.backgrounds.length?`<section class="card stack">
      <div><label for="bg">Antecedente</label><select id="bg" name="bg">
        ${s.backgrounds.map(v=>`<option value="${v.id}">${r(v.nome)}</option>`).join("")}</select></div>
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
  </form></main>`,p("#back").onclick=R;const a=p("#build"),d=()=>s.byId.classes[a.class.value],t=()=>{var v,b;return(b=s.byId.backgrounds)==null?void 0:b[(v=a.bg)==null?void 0:v.value]};function i(){var k;const v=d(),b=(k=v.periciasOpcoes)!=null&&k.length?v.periciasOpcoes:[];p("#classinfo").innerHTML=`
      <p class="muted" style="margin:.2rem 0;font-size:.88rem">Dado de Vida d${v.dadoVida} · Salvaguardas: ${(v.salvaguardas||[]).map(y=>Z[y]).join(", ")}</p>
      ${b.length?`<div><label>Perícias da classe — escolha ${v.periciasEscolha} <span id="skcount"></span></label>
        <div class="checks">${b.map(y=>`<label class="chk"><input type="checkbox" name="sk" value="${y}"> ${ba[y]}</label>`).join("")}</div></div>`:""}`,a.querySelectorAll("[name=sk]").forEach(y=>y.onchange=e),e()}function e(){var C;const v=d(),b=((C=t())==null?void 0:C.pericias)||[],k=[...a.querySelectorAll("[name=sk]")];k.forEach(o=>{b.includes(o.value)&&(o.checked=!1,o.disabled=!0,o.parentElement.title="Já vem do antecedente")});const y=k.filter(o=>o.checked).length;k.forEach(o=>{b.includes(o.value)||(o.disabled=!o.checked&&y>=v.periciasEscolha)}),p("#skcount")&&(p("#skcount").textContent=`(${y}/${v.periciasEscolha})`)}function c(){const v=t();if(!v)return;const b=s.byId.feats[v.talentoId];p("#bginfo").innerHTML=`
      <p style="margin:.2rem 0;font-size:.9rem"><b>Perícias:</b> ${v.pericias.map(k=>ba[k]).join(", ")}<br>
      <b>Talento:</b> ${r((b==null?void 0:b.nome)||v.talento)}<br><b>Ferramenta:</b> ${r(v.ferramenta)}</p>
      <div class="row">
        <div class="grow"><label for="plus2">+2 em</label><select id="plus2">${v.atributos.map(k=>`<option value="${k}">${Z[k]}</option>`).join("")}<option value="all">+1 nos três</option></select></div>
        <div class="grow" id="plus1wrap"><label for="plus1">+1 em</label><select id="plus1">${v.atributos.map((k,y)=>`<option value="${k}" ${y===1?"selected":""}>${Z[k]}</option>`).join("")}</select></div>
      </div>
      <details class="entry"><summary><span class="t">Equipamento do antecedente</span></summary><div class="body">${r(v.equipamento)}</div></details>`,p("#plus2").onchange=p("#plus1").onchange=w,w(),e()}function l(){const v=t(),b={};if(!v)return b;const k=p("#plus2").value;if(k==="all")v.atributos.forEach(y=>b[y]=1);else{b[k]=2;const y=p("#plus1").value;y!==k&&(b[y]=(b[y]||0)+1)}return b}function w(){const v=l();p("#plus1wrap")&&(p("#plus1wrap").style.visibility=p("#plus2").value==="all"?"hidden":""),a.querySelectorAll(".abfinal").forEach(b=>{const k=b.dataset.ab,y=Math.min(20,Number(a[k].value)+(v[k]||0));b.textContent=v[k]?`→ ${y} (${j(da(y))})`:`(${j(da(y))})`})}const f=27,$={8:0,9:1,10:2,11:3,12:4,13:5,14:7,15:9},m=v=>$[v]??0;let q="array";function g(){const v=q==="buy";if(p("#ab-inputs").innerHTML=T.map(([b,k],y)=>{const C=document.getElementById("ab-"+b),o=C?C.value:v?8:n[y];return`<div><label for="ab-${b}">${k} <b class="abfinal" data-ab="${b}"></b></label>
        <div class="row" style="align-items:center;gap:.4rem;flex-wrap:nowrap">
          ${v?`<button type="button" class="btn small" data-abdown="${b}" aria-label="Diminuir ${k}">−</button>`:""}
          <input id="ab-${b}" name="${b}" type="number" inputmode="numeric" min="${v?8:3}" max="${v?15:20}"
            value="${o}" ${v?'readonly style="width:3.5rem;text-align:center"':""} />
          ${v?`<button type="button" class="btn small" data-abup="${b}" aria-label="Aumentar ${k}">+</button>`:""}
        </div></div>`}).join(""),v){const b=T.reduce((y,[C])=>y+m(Number(a[C].value)),0),k=f-b;p("#abpts").style.display="",p("#abpts").textContent=`${k} de ${f} pontos restantes`,a.querySelectorAll("[data-abup]").forEach(y=>y.onclick=()=>{const C=y.dataset.abup,o=Number(a[C].value);if(!(o>=15)){if(b+(m(o+1)-m(o))>f)return N("Sem pontos suficientes.");a[C].value=o+1,g()}}),a.querySelectorAll("[data-abdown]").forEach(y=>y.onclick=()=>{const C=y.dataset.abdown,o=Number(a[C].value);o<=8||(a[C].value=o-1,g())})}else p("#abpts").style.display="none",T.forEach(([b])=>a[b].oninput=w);w()}E.querySelectorAll("[data-abmode]").forEach(v=>v.onclick=()=>{v.dataset.abmode!==q&&(q=v.dataset.abmode,E.querySelectorAll("[data-abmode]").forEach(b=>b.setAttribute("aria-selected",String(b.dataset.abmode===q))),p("#abmode-help").textContent=q==="buy"?`Compra de pontos: comece com 8 em tudo e gaste os ${f} pontos (custo 9=1, 10=2, 11=3, 12=4, 13=5, 14=7, 15=9). Máximo 15 antes dos bônus do antecedente.`:"Valores base (Array Padrão: 15, 14, 13, 12, 10, 8). Edite livremente, se preferir. O bônus do antecedente é somado automaticamente.",T.forEach(([b],k)=>{const y=document.getElementById("ab-"+b);y&&(y.value=q==="buy"?8:n[k])}),g())}),a.class.onchange=i,a.bg&&(a.bg.onchange=c),i(),c(),g(),a.onsubmit=async v=>{var C;v.preventDefault();const b=l(),k=Object.fromEntries(T.map(([o])=>[o,Math.min(20,Number(a[o].value)+(b[o]||0))])),y=Ma({name:a.name.value.trim(),ownerUid:h.user.uid,speciesId:a.species.value,classId:a.class.value,level:Number(a.level.value),abilities:k,backgroundId:((C=a.bg)==null?void 0:C.value)||null,skillProfs:[...a.querySelectorAll("[name=sk]:checked")].map(o=>o.value),speciesNomePersonalizado:a.speciesnome.value.trim()||null,classNomePersonalizado:a.classnome.value.trim()||null,customNote:a.customnote.value.trim()},s);try{ta(await h.be.createCharacter(y))}catch(o){N(o.message)}}}const ga=s=>`${Pa(s.build,h.comp)} · ${za(s.build,h.comp)}`;function ta(s){_(),h.chId=s,h.prevHp=null,aa.set(sa(),s),h.off.push(h.be.watchCharacter(s,n=>{if(!n)return R();const a=h.prevHp;if(h.prevHp=n.state.hp.current+n.state.hp.temp,h.ch=n,V(),a!=null&&a!==h.prevHp){const d=p("#hpcard");d==null||d.classList.add(h.prevHp<a?"flash-dmg":"flash-heal"),navigator.vibrate&&h.prevHp<a&&navigator.vibrate(80)}}))}const ne=[["combate","❤️","Combate"],["ficha","📜","Ficha"],["magias","✨","Magias"],["classe","🛡️","Traços"],["talentos","⭐","Talentos"],["itens","🎒","Itens"]],M={get S(){return h},app:E,render:()=>V(),save:s=>h.be.updateCharacter(h.chId,s).catch(n=>N(n.message)),toast:N,showHome:()=>R(),confirmTwice:ie,accountChip:va,bindLogout:$a};function V(){if(Ta(V))return;const s=h.ch,n=La(s,h.comp),a=document.activeElement,d=a==null?void 0:a.id,t=a&&"selectionStart"in a?[a.selectionStart,a.selectionEnd]:null,i=window.scrollY,e={combate:{html:re,bind:de},...se},c=e[h.tab]||e.combate;if(E.innerHTML=`
    <header class="top">
      <div class="row"><button class="btn small" id="home" aria-label="Meus personagens">◀</button>
        <div class="grow"><div class="name">${r(s.name)}</div>
        <div class="mini"><span>${r(ga(s))}</span>${s.campaignName?`<span>🎲 ${r(s.campaignName)}</span>`:""}</div></div>
        <div class="mini"><span>CA <b>${s.build.ac??10}</b></span><span>PV <b>${s.state.hp.current}/${s.state.hp.max}</b></span></div>
        <a class="btn small" href="./escudo.html" title="Ir para o Escudo do Mestre">🛡️</a></div>
    </header>
    <main class="wrap stack">${ha()}${c.html(s,n,M)}</main>
    <nav class="tabs" role="tablist">${ne.map(([l,w,f])=>`<button role="tab" aria-selected="${h.tab===l}" data-tab="${l}"><span class="ico" aria-hidden="true">${w}</span>${f}</button>`).join("")}</nav>`,E.querySelectorAll("[data-tab]").forEach(l=>l.onclick=()=>{h.tab=l.dataset.tab,V(),window.scrollTo(0,0)}),p("#home").onclick=R,c.bind(s,n,M),window.scrollTo(0,i),d){const l=document.getElementById(d);if(l&&(l.focus({preventScroll:!0}),t&&"setSelectionRange"in l))try{l.setSelectionRange(...t)}catch{}}}function ie(s,n){const a=p(s);if(a.dataset.armed)return!0;a.dataset.armed="1";const d=a.textContent;return a.textContent=n,setTimeout(()=>{a.isConnected&&(delete a.dataset.armed,a.textContent=d)},3e3),!1}function ce(s,n,a){const d=(s.inventory||[]).filter(e=>{var c,l;return e.itemId&&((l=(c=n.byId)==null?void 0:c.weapons)==null?void 0:l[e.itemId])||e.categoria==="arma"}).map(e=>{var c,l;return{it:e,w:e.itemId?(l=(c=n.byId)==null?void 0:c.weapons)==null?void 0:l[e.itemId]:null}});if(!d.length)return`<section class="card stack"><h2>Ataques</h2>
      <p class="muted" style="margin:0">Nenhuma arma no inventário — desarmado: <b>${j(a.pb+a.mods.for)}</b> pra acertar, <b>1${j(a.mods.for)}</b> de dano contundente.</p></section>`;const t=Object.fromEntries(Ha(s,n,a).map(e=>[e.uid,e])),i=d.some(({it:e})=>e.equipado);return`<section class="card stack"><h2>Ataques</h2>
    ${d.map(({it:e,w:c})=>{const l=t[e.uid],w=!l&&e.equipado?' <span class="muted">(sem cálculo automático — veja as Notas)</span>':"";return`<div class="row" style="justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem">
        <span>${e.equipado?"⚔️ ":""}${r(e.nome||(c==null?void 0:c.nome)||"")}${l?` — <b>${j(l.atk)}</b> pra acertar · <b>${r(l.dice)}${l.dmgBonus?j(l.dmgBonus):""}</b> ${r(l.dmgType)}${l.maestria?` <span class="muted">(${r(l.maestria)})</span>`:""}`:w}</span>
        <button class="btn small ${e.equipado?"":"primary"}" data-swapweapon="${e.uid}">${e.equipado?"Guardar":"Empunhar"}</button>
      </div>`}).join("")}
    ${i?"":`<p class="muted" style="margin:0">Nenhuma arma empunhada — desarmado: <b>${j(a.pb+a.mods.for)}</b> pra acertar, <b>1${j(a.mods.for)}</b> de dano contundente.</p>`}
    <p class="muted" style="margin:0;font-size:.8rem">Toque em "Empunhar"/"Guardar" pra trocar de arma. Bônus de ataque = Proficiência + atributo; dano = dado da arma + atributo.</p>
  </section>`}function re(s,n){const{hp:a,deathSaves:d={success:0,fail:0},conditions:t=[],dead:i}=s.state,e=a.max+a.temp,c=Math.round(a.current/e*100),l=Math.round(a.temp/e*100),w=a.current/a.max>.5?"":a.current/a.max>.25?"mid":"low",f=a.current===0&&!i,$=s.state.concentration?h.comp.byId.spells[s.state.concentration]:null;return`
  <section class="card stack" id="hpcard">
    <div class="hp-big"><div class="num">${a.current}<small> / ${a.max}</small></div>
      ${a.temp?`<div class="tmpv">+${a.temp} temporários</div>`:""}
      ${i?'<div class="chip bad" style="margin-top:.4rem">MORTO</div>':""}</div>
    <div class="hpbar" aria-hidden="true"><div class="cur ${w}" style="width:${c}%"></div><div class="tmp" style="width:${l}%"></div></div>
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
    <div><b>${s.build.ac??10}</b><small>CA</small></div>
    <div><b>${j(n.initiative)}</b><small>Iniciativa</small></div>
    <div><b>${r(n.speed.replace(" metros"," m"))}</b><small>Deslocamento</small></div>
    <div><b>${n.passivePerception}</b><small>Perc. passiva</small></div>
  </div>
  ${(()=>{const m=Ba(s,n);return m!=null&&m!==(s.build.ac??10)?`<p class="empty-note" style="margin:.5rem 0 0">Armadura equipada sugere CA <b>${m}</b> — <button class="btn small" data-useac="${m}">Usar essa CA</button></p>`:""})()}</section>
  ${ce(s,h.comp,n)}
  ${$?`<p class="banner">Concentrando em: <b>${r($.nome)}</b> <button class="btn small" id="endconc" style="margin-left:.5rem">Encerrar</button></p>`:""}
  ${f?`<section class="card stack"><h2>Testes contra a morte</h2>
    <div class="saves"><div><small class="muted">Sucessos</small><div class="pips">${[0,1,2].map(m=>`<span class="pip ${m<d.success?"s":""}"></span>`).join("")}</div></div>
      <div><small class="muted">Falhas</small><div class="pips">${[0,1,2].map(m=>`<span class="pip ${m<d.fail?"f":""}"></span>`).join("")}</div></div></div>
    <button class="btn primary" id="roll-death" style="width:100%">Rolar d20</button></section>`:""}
  <section class="card stack"><h2>Condições</h2>
    <div class="row">${t.map(m=>`<button class="chip bad" data-rmcond="${m}" aria-label="Remover ${m}">${ra[m]||m} ✕</button>`).join("")||'<span class="muted">Nenhuma</span>'}</div>
    <div class="row"><select id="addcond" class="grow" aria-label="Adicionar condição"><option value="">Adicionar condição…</option>
      ${Oa.filter(m=>!t.includes(m)).map(m=>`<option value="${m}">${ra[m]||m}</option>`).join("")}</select></div>
  </section>
  <section class="card stack"><h2>Descanso</h2>
    ${(s.state.hitDice.byClass||[]).length>1?s.state.hitDice.byClass.map(m=>{const q=h.comp.byId.classes[m.classId];return`<div class="row" style="justify-content:space-between"><span class="muted">${r((q==null?void 0:q.nome)||m.classId)}: ${m.max-m.used}/${m.max} (d${m.die})</span>
            <button class="btn small" data-shortclass="${m.classId}">Gastar</button></div>`}).join(""):`<p class="muted" style="margin:0">Dados de Vida: ${s.state.hitDice.max-s.state.hitDice.used}/${s.state.hitDice.max} (d${s.state.hitDice.die})</p>
         <div class="row"><button class="btn grow" id="short">Gastar 1 Dado de Vida</button></div>`}
    <div class="row"><button class="btn grow" id="long">Descanso Longo</button></div>
  </section>
  <section class="card"><h2>Registro</h2><ul class="log">${(s.state.log||[]).map(m=>`<li>${r(m)}</li>`).join("")||"<li>—</li>"}</ul></section>`}function de(s,n){E.querySelectorAll("[data-swapweapon]").forEach(t=>t.onclick=()=>{const i=s.inventory||[],e=i.find(l=>l.uid===t.dataset.swapweapon),c=!e.equipado;M.save({inventory:i.map(l=>l.uid===e.uid?{...l,equipado:c}:l)}),N(`${e.nome} ${c?"empunhada":"guardada"}.`)}),E.querySelectorAll("[data-useac]").forEach(t=>t.onclick=()=>{M.save({"build.ac":Number(t.dataset.useac)}),N(`CA atualizada para ${t.dataset.useac}.`)});const a=p("#amount");a.oninput=()=>h.amount=a.value,E.querySelectorAll("[data-q]").forEach(t=>t.onclick=()=>{h.amount=t.dataset.q==="C"?"":String((Number(h.amount)||0)+Number(t.dataset.q)),a.value=h.amount}),E.querySelectorAll("[data-act]").forEach(t=>t.onclick=async()=>{const i=Number(h.amount);if(!i)return N("Digite um valor.");const e={resistant:p("#o-res").checked,vulnerable:p("#o-vul").checked,critical:p("#o-crit").checked};h.amount="";const c=await Y(h.be,h.chId,t.dataset.act,i,e,s.name);X(c.patch),c.concentrationDC&&s.state.concentration?N(`Teste de Concentração: CD ${c.concentrationDC}`):c.log.length&&N(c.log.at(-1))}),p("#endconc")&&(p("#endconc").onclick=()=>M.save({"state.concentration":null})),p("#roll-death")&&(p("#roll-death").onclick=async()=>{const t=ua("1d20").total,i=await Y(h.be,h.chId,"morte",t,{},s.name);X(i.patch),N(`d20 = ${t}. ${i.log.at(-1)??""}`)}),E.querySelectorAll("[data-rmcond]").forEach(t=>t.onclick=()=>M.save({"state.conditions":s.state.conditions.filter(i=>i!==t.dataset.rmcond)})),p("#addcond").onchange=t=>t.target.value&&M.save({"state.conditions":[...s.state.conditions,t.target.value]});const d=async(t,i)=>{const e=ua(`1d${t}`).total+n.mods.con;await i();const c=await Y(h.be,h.chId,"cura",Math.max(0,e),{},s.name);X(c.patch),N(`Dado de Vida: ${e}. ${c.log[0]??""}`)};p("#short")&&(p("#short").onclick=()=>{const t=s.state.hitDice;if(t.used>=t.max)return N("Sem Dados de Vida disponíveis.");d(t.die,()=>M.save({"state.hitDice.used":t.used+1}))}),E.querySelectorAll("[data-shortclass]").forEach(t=>t.onclick=()=>{const i=s.state.hitDice.byClass,e=i.findIndex(w=>w.classId===t.dataset.shortclass),c=i[e];if(c.used>=c.max)return N("Sem Dados de Vida dessa classe.");const l=i.map((w,f)=>f===e?{...w,used:w.used+1}:w);d(c.die,()=>M.save({"state.hitDice.byClass":l,"state.hitDice.used":l.reduce((w,f)=>w+f.used,0)}))}),p("#long").onclick=async()=>{const t=Object.fromEntries(Object.entries(s.state.spellSlots||{}).map(([c,l])=>[c,{...l,used:0}])),i=Object.fromEntries(Object.entries(s.state.pactSlots||{}).map(([c,l])=>[c,{...l,used:0}])),e=(s.state.hitDice.byClass||[]).map(c=>({...c,used:0}));await M.save({"state.hp":{...s.state.hp,current:s.state.hp.max,temp:0},"state.spellSlots":t,"state.pactSlots":i,"state.hitDice":{...s.state.hitDice,byClass:e,used:0},"state.deathSaves":{success:0,fail:0},"state.conditions":s.state.conditions.filter(c=>!["inconsciente","estabilizado"].includes(c))}),N("Descanso longo concluído.")}}
