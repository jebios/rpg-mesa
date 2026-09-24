import{e as r,A as N,$,i as x,f as A,j as P,S as ia,g as ca,r as ra,l as da,s as Q,a as ta,b as sa,k as ua,t as q,d as ma,C as J,c as pa,h as H,m as Y}from"./auth-C0DXKsp-.js";/* empty css             */function X(t){const o=String(t).replace(/\s/g,"").match(/^(\d*)d(\d+)([+-]\d+)?$/i);if(!o)return null;const e=Number(o[1]||1),i=Number(o[2]),l=Number(o[3]||0),c=Array.from({length:e},()=>1+Math.floor(Math.random()*i));return{rolls:c,bonus:l,total:c.reduce((n,b)=>n+b,0)+l}}const I=t=>r(t).replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>").replace(/(^|\s)_([^_]+)_(?=\s|$|[.,;:])/g,"$1<i>$2</i>");function S(t){if(!t)return"";const o=[];for(const e of String(t).split(/\n\n+/)){const i=e.split(`
`);if(i.every(l=>l.startsWith("| "))){o.push('<div class="mdtable"><table>'+i.map(l=>"<tr>"+l.slice(2).split(" | ").map(c=>`<td>${I(c)}</td>`).join("")+"</tr>").join("")+"</table></div>");continue}for(const l of i)l.startsWith("#### ")?o.push(`<h5>${I(l.slice(5))}</h5>`):l.startsWith("### ")?o.push(`<h4>${I(l.slice(4))}</h4>`):l.startsWith("| ")?o.push('<div class="mdtable"><table><tr>'+l.slice(2).split(" | ").map(c=>`<td>${I(c)}</td>`).join("")+"</tr></table></div>"):l.startsWith("• ")?o.push(`<p class="bullet">${I(l)}</p>`):o.push(`<p>${I(l)}</p>`)}return`<div class="md">${o.join("")}</div>`}const j=t=>String(t||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(),na=Object.fromEntries(N),M=40,z=t=>t===0?"Truque":`${t}º círculo`,Z=()=>Math.random().toString(36).slice(2,9),w=(t,o,e,i=!1,l="",c="")=>`<details class="entry" ${i?"open":""} ${l}><summary><span class="t">${t}</span><span class="row" style="gap:.4rem;flex-wrap:nowrap"><span class="lvl-badge">${o||""}</span>${c}</span></summary><div class="body">${e}</div></details>`,F=(t,o,e="Adicionar")=>`<button class="btn small primary addbtn" ${t}="${o}" aria-label="${e}">+</button>`;function ba(t,o,e){var u;const i=e.S,l=o.level,c=t.build.classes[0],n=((u=o.cls)==null?void 0:u.subclasses)||[],b=t.build.training||{};return`
  <section class="card stack">
    <div class="sectiontitle"><h2 style="margin:0">Nível ${l}</h2>
      <div class="row"><button class="btn small" id="lvldown" aria-label="Diminuir nível">−</button><button class="btn small primary" id="lvlup" aria-label="Subir de nível">+ Nível</button></div></div>
    ${n.length?`<div><label for="subclass">Subclasse${l<3?" (a partir do nível 3)":""}</label>
      <select id="subclass" ${l<3?"disabled":""}><option value="">—</option>${n.map(m=>`<option value="${m.id}" ${m.id===c.subclassId?"selected":""}>${r(m.nome)}</option>`).join("")}</select></div>`:""}
    <div class="stats">
      <div><b>${A(o.pb)}</b><small>Proficiência</small></div>
      <div><b>${A(o.initiative)}</b><small>Iniciativa</small></div>
      <div><b>${r(o.speed.replace(" metros"," m"))}</b><small>Deslocamento</small></div>
      <div><b>${o.passivePerception}</b><small>Perc. passiva</small></div>
    </div>
    <div class="row"><label for="ac" style="margin:0">Classe de Armadura</label>
      <input id="ac" type="number" inputmode="numeric" style="width:6rem" value="${t.build.ac??10}" /></div>
  </section>

  <section class="card stack"><h2>Atributos e Salvaguardas</h2>
    <p class="empty-note">Toque em <b>Salvaguarda</b> para marcar/desmarcar proficiência.</p>
    <div class="abil2">${N.map(([m,s])=>{const d=(t.build.saveProfs||[]).includes(m);return`<div class="abcard">
        <small>${s}</small><b>${A(o.mods[m])}</b>
        <input class="abscore" data-score="${m}" type="number" inputmode="numeric" min="1" max="30" value="${t.build.abilities[m]}" aria-label="Valor de ${s}" />
        <button class="savebtn ${d?"on":""}" data-save="${m}" aria-pressed="${d}">
          <span class="dot ${d?"on":""}"></span>Salvaguarda <b>${A(o.saves[m])}</b></button>
      </div>`}).join("")}</div>
  </section>

  <section class="card"><h2>Perícias</h2><p class="empty-note">Toque para alternar: sem proficiência → proficiente (●) → especialista (◆).</p>
    <div class="skills">${o.skills.map(m=>`<button data-skill="${m.id}" aria-pressed="${m.prof||m.exp}">
      <span class="row" style="flex-wrap:nowrap"><span class="dot ${m.exp?"exp":m.prof?"on":""}"></span>${m.nome} <small class="muted">(${m.ab.toUpperCase()})</small></span><b>${A(m.bonus)}</b></button>`).join("")}</div>
  </section>

  <section class="card stack"><h2>Treinamento e Proficiências</h2>
    ${[["armaduras","Treinamento com Armaduras"],["armas","Proficiência com Armas"],["ferramentas","Proficiência com Ferramentas"],["idiomas","Idiomas"]].map(([m,s])=>`<div><label for="tr-${m}">${s}</label><textarea id="tr-${m}" data-train="${m}" rows="2">${r(b[m]||"")}</textarea></div>`).join("")}
  </section>

  <section class="card stack"><h2>Anotações</h2>
    <textarea id="notes" rows="5" placeholder="Aliados, pistas, história…">${r(t.notes)}</textarea></section>

  <section class="card stack"><h2>Mesa</h2>
    ${t.campaignId?`<p style="margin:0">Jogando em <b>${r(t.campaignName)}</b>. O Mestre dessa mesa pode ver e alterar esta ficha.</p>
         <button class="btn" id="leave-table">Sair da mesa</button>`:`<p class="muted" style="margin:0">Esta ficha não está em nenhuma mesa. Só você pode vê-la.</p>
         <form class="row" id="join"><input id="code" class="grow" autocomplete="off" autocapitalize="characters" placeholder="Código (ABC-123)" aria-label="Código da mesa" required style="width:auto" />
         <button class="btn primary">Entrar</button></form>`}
  </section>
  <section class="card stack"><h2>Conta</h2>
    <div class="row">${e.accountChip(i.user)}</div>
    <button class="btn danger small" id="delete">Apagar personagem</button>
  </section>`}let aa={};const T=(t,o,e=600)=>{clearTimeout(aa[t]),aa[t]=setTimeout(o,e)};function va(t,o,e){const i=e.S,l=e.app;$("#lvlup").onclick=()=>o.level<20&&e.save(P(t,i.comp,o.level+1)).then(()=>e.toast(`Nível ${o.level+1}! PV máximo, Dados de Vida e espaços atualizados.`)),$("#lvldown").onclick=()=>o.level>1&&e.save(P(t,i.comp,o.level-1)),$("#subclass")&&($("#subclass").onchange=c=>e.save(P(t,i.comp,o.level,c.target.value||null))),$("#ac").onchange=c=>e.save({"build.ac":Number(c.target.value)||10}),l.querySelectorAll("[data-score]").forEach(c=>c.onchange=()=>{const n=Math.max(1,Math.min(30,Number(c.value)||10)),b=c.dataset.score,u={[`build.abilities.${b}`]:n};b==="con"&&Object.assign(u,P({...t,build:{...t.build,abilities:{...t.build.abilities,con:n}}},i.comp,o.level)),e.save(u)}),l.querySelectorAll("[data-save]").forEach(c=>c.onclick=()=>{const n=c.dataset.save,b=t.build.saveProfs||[];e.save({"build.saveProfs":b.includes(n)?b.filter(u=>u!==n):[...b,n]})}),l.querySelectorAll("[data-skill]").forEach(c=>c.onclick=()=>{const n=c.dataset.skill,b=t.build.skillProfs||[],u=t.build.expertise||[];u.includes(n)?e.save({"build.expertise":u.filter(m=>m!==n),"build.skillProfs":b.filter(m=>m!==n)}):b.includes(n)?e.save({"build.expertise":[...u,n]}):e.save({"build.skillProfs":[...b,n]})}),l.querySelectorAll("[data-train]").forEach(c=>c.oninput=()=>T("tr"+c.dataset.train,()=>e.save({[`build.training.${c.dataset.train}`]:c.value}))),$("#notes").oninput=c=>T("notes",()=>e.save({notes:c.target.value})),e.bindLogout(i.be,l),$("#join")&&($("#join").onsubmit=async c=>{c.preventDefault();try{const n=await i.be.joinByCode($("#code").value);await i.be.updateCharacter(i.chId,{campaignId:n.id,campaignName:n.name}),e.toast(`${t.name} entrou na mesa ${n.name}.`)}catch(n){e.toast(n.message)}}),$("#leave-table")&&($("#leave-table").onclick=()=>{e.confirmTwice("#leave-table","Toque de novo para confirmar")&&e.save({campaignId:null,campaignName:null})}),$("#delete").onclick=async()=>{if(!e.confirmTwice("#delete",`Toque de novo para apagar ${t.name}`))return;const c=i.chId;await i.be.deleteCharacter(c),e.showHome()}}function $a(t,o,e){var U;const i=e.S,l=i.comp,c=i.ui,n=t.build.spellsKnown||[],b=t.build.spellsPrepared||[],u=Object.entries(t.state.spellSlots||{}),m=n.map(h=>l.byId.spells[h]).filter(Boolean).sort((h,y)=>h.nivel-y.nivel||h.nome.localeCompare(y.nome)),s={};m.forEach(h=>{var y;return(s[y=h.nivel]||(s[y]=[])).push(h)});const d=(U=o.cls)==null?void 0:U.id,a=j(c.spellQ);let v=l.spells.filter(h=>!n.includes(h.id)&&(!c.spellMine||!d||h.classes.includes(d)||!o.caster.atributoConjuracao)&&(c.spellLvl==="all"||String(h.nivel)===c.spellLvl)&&(!a||j(h.nome).includes(a)));const f=v.length;v=v.slice(0,M);const g=(h,y)=>`
    <div class="muted" style="font-size:.85rem">${r(h.escola)} · ${r(h.tempo)} · ${r(h.alcance)}<br>${r(h.componentes)} · ${r(h.duracao)}</div>
    ${S(h.desc)}
    <div class="row">${y?`${h.nivel>0?`<button class="btn small" data-prep="${h.id}">${b.includes(h.id)?"✓ Preparada":"Preparar"}</button>`:""}
         ${h.concentracao?`<button class="btn small" data-conc="${h.id}">${t.state.concentration===h.id?"Encerrar concentração":"Concentrar"}</button>`:""}
         <button class="btn small" data-forget="${h.id}">Remover</button>`:""}</div>`,G=h=>[h.concentracao?"C":"",h.ritual?"R":""].filter(Boolean).map(y=>`<span class="chip">${y}</span>`).join(" ");return`
  ${o.caster.atributoConjuracao?`<section class="card"><div class="stats" style="grid-template-columns:repeat(3,1fr)">
    <div><b>${o.spellDC}</b><small>CD de magia</small></div><div><b>${A(o.spellAttack)}</b><small>Ataque mágico</small></div>
    <div><b>${na[o.caster.atributoConjuracao].slice(0,3)}</b><small>Atributo</small></div></div></section>`:""}
  ${u.length?`<section class="card slots"><h2>Espaços de magia</h2>
    ${u.map(([h,y])=>`<div class="lvl"><span>${h}º</span>${Array.from({length:y.max},(E,L)=>`<button class="slotpip ${L<y.used?"used":""}" data-slot="${h}" data-i="${L}" aria-label="Espaço de ${h}º círculo ${L+1}${L<y.used?", gasto":""}"></button>`).join("")}</div>`).join("")}
  </section>`:""}
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Minhas magias</h2><span class="lvl-badge">${b.length} preparada(s)</span></div>
    ${Object.keys(s).length?Object.entries(s).map(([h,y])=>`<h3 style="margin:.6rem 0 .2rem;color:var(--muted)">${z(Number(h))}</h3>
      <div class="stack" style="--gap:.4rem">${y.map(E=>w(`${E.nivel>0&&b.includes(E.id)?"✓ ":""}${r(E.nome)} ${G(E)}`,z(E.nivel),g(E,!0),!1,`data-k="m-${E.id}"`)).join("")}</div>`).join(""):'<p class="empty-note">Nenhuma magia ainda. Adicione pela biblioteca abaixo.</p>'}
  </section>
  <section class="card stack"><h2>Biblioteca de magias</h2>
    <input id="spellq" type="search" placeholder="Buscar magia pelo nome…" value="${r(c.spellQ)}" aria-label="Buscar magia" />
    <div class="filters">${["all","0","1","2","3","4","5","6","7","8","9"].map(h=>`<button data-flvl="${h}" aria-pressed="${c.spellLvl===h}">${h==="all"?"Todas":h==="0"?"Truques":h+"º"}</button>`).join("")}</div>
    ${d?`<label class="chk"><input type="checkbox" id="spellmine" ${c.spellMine?"checked":""}> Só a lista de ${r(o.cls.nome)}</label>`:""}
    <p class="empty-note">${f} magia(s)${f>M?` — mostrando ${M}, refine a busca`:""}.</p>
    <div class="stack">${v.map(h=>w(`${r(h.nome)} ${G(h)}`,z(h.nivel),g(h,!1),!1,`data-k="l-${h.id}"`,F("data-learn",h.id,"Adicionar "+r(h.nome)))).join("")}</div>
  </section>`}function ha(t,o,e){const i=e.S,l=e.app,c=i.ui;l.querySelectorAll("[data-slot]").forEach(n=>n.onclick=()=>{const b=n.dataset.slot,u=Number(n.dataset.i),m=t.state.spellSlots[b];e.save({[`state.spellSlots.${b}.used`]:u<m.used?u:u+1})}),$("#spellq").oninput=n=>{c.spellQ=n.target.value,T("sq",e.render,250)},l.querySelectorAll("[data-flvl]").forEach(n=>n.onclick=()=>{c.spellLvl=n.dataset.flvl,e.render()}),$("#spellmine")&&($("#spellmine").onchange=n=>{c.spellMine=n.target.checked,e.render()}),l.querySelectorAll("[data-learn]").forEach(n=>n.onclick=()=>e.save({"build.spellsKnown":[...t.build.spellsKnown||[],n.dataset.learn]})),l.querySelectorAll("[data-forget]").forEach(n=>n.onclick=()=>e.save({"build.spellsKnown":(t.build.spellsKnown||[]).filter(b=>b!==n.dataset.forget),"build.spellsPrepared":(t.build.spellsPrepared||[]).filter(b=>b!==n.dataset.forget)})),l.querySelectorAll("[data-prep]").forEach(n=>n.onclick=()=>{const b=t.build.spellsPrepared||[],u=n.dataset.prep;e.save({"build.spellsPrepared":b.includes(u)?b.filter(m=>m!==u):[...b,u]})}),l.querySelectorAll("[data-conc]").forEach(n=>n.onclick=()=>e.save({"state.concentration":t.state.concentration===n.dataset.conc?null:n.dataset.conc})),B(l,"spells")}const V={};function B(t,o){t.querySelectorAll("summary .addbtn").forEach(i=>i.addEventListener("click",l=>l.preventDefault()));const e=V[o]||(V[o]=new Set);t.querySelectorAll("details.entry").forEach((i,l)=>{var n;const c=i.dataset.k||((n=i.querySelector("summary .t"))==null?void 0:n.textContent)||l;e.has(c)&&(i.open=!0),i.addEventListener("toggle",()=>i.open?e.add(c):e.delete(c))})}function fa(t,o,e){const i=o.level,l=o.cls,c=o.sub,n=o.sp,b=o.bg;if(!l)return'<section class="card">Classe não encontrada no compêndio.</section>';const u=l.caracteristicas||[],m=u.filter(a=>a.nivel<=i),s=u.filter(a=>a.nivel>i),d=t.build.opcoes||[];return`
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Características de ${r(l.nome)}</h2><span class="lvl-badge">nível ${i}</span></div>
    ${m.length?m.map(a=>w(r(a.nome),`Nível ${a.nivel}`,S(a.desc))).join(""):'<p class="empty-note">Importe o compêndio completo para ver as características.</p>'}
    ${s.length?`<details class="entry"><summary><span class="t muted">Próximos níveis (${s.length})</span></summary><div class="body stack">
      ${s.map(a=>w(r(a.nome),`Nível ${a.nivel}`,S(a.desc))).join("")}</div></details>`:""}
  </section>
  ${(l.opcoes||[]).map((a,v)=>`<section class="card stack"><h2>${r(a.titulo.replace("Opções de ",""))}</h2>
    ${a.itens.filter(f=>d.includes(f.id)).map(f=>w("✓ "+r(f.nome),"",S(f.desc)+`<button class="btn small" data-unop="${f.id}">Remover</button>`)).join("")||'<p class="empty-note">Nenhuma escolhida.</p>'}
    <details class="entry"><summary><span class="t">Escolher ${r(a.titulo.replace("Opções de ","").toLowerCase())}</span><span class="lvl-badge">${a.itens.length}</span></summary><div class="body stack">
      ${a.itens.filter(f=>!d.includes(f.id)).map(f=>w(r(f.nome),"",S(f.desc),!1,`data-k="o-${f.id}"`,F("data-op",f.id,"Escolher "+r(f.nome)))).join("")}
    </div></details></section>`).join("")}
  <section class="card stack"><h2>Subclasse${c?": "+r(c.nome):""}</h2>
    ${c?(c.caracteristicas||[]).map(a=>w(`${a.nivel>i?"🔒 ":""}${r(a.nome)}`,`Nível ${a.nivel}`,S(a.desc))).join(""):`<p class="empty-note">${i<3?"A subclasse é escolhida no nível 3.":"Escolha a subclasse na aba Ficha."}</p>
         ${(l.subclasses||[]).map(a=>w(r(a.nome),"",S(a.intro))).join("")}`}
  </section>
  <section class="card stack"><h2>Traços de ${r((n==null?void 0:n.nome)||"espécie")}</h2>
    <p class="empty-note">${r((n==null?void 0:n.tipo)||"")} · ${r((n==null?void 0:n.tamanho)||"")} · Deslocamento ${r((n==null?void 0:n.deslocamento)||"")}</p>
    ${((n==null?void 0:n.tracos)||[]).filter(a=>a.nome!=="Detalhes").map(a=>w(r(a.nome),"",S(a.desc))).join("")||'<p class="empty-note">Sem traços no compêndio.</p>'}
  </section>
  ${b?`<section class="card stack"><h2>Antecedente: ${r(b.nome)}</h2>
    <p style="margin:0;font-size:.92rem"><b>Atributos:</b> ${b.atributos.map(a=>na[a]).join(", ")}<br>
    <b>Talento:</b> ${r(b.talento)}<br><b>Ferramenta:</b> ${r(b.ferramenta)}<br><b>Equipamento:</b> ${r(b.equipamento)}</p></section>`:""}`}function ga(t,o,e){const i=e.app,l=t.build.opcoes||[];i.querySelectorAll("[data-op]").forEach(c=>c.onclick=()=>e.save({"build.opcoes":[...l,c.dataset.op]})),i.querySelectorAll("[data-unop]").forEach(c=>c.onclick=()=>e.save({"build.opcoes":l.filter(n=>n!==c.dataset.unop)})),B(i,"classe")}const ya=["Origem","Geral","Estilo de Luta","Dádiva Épica"];function ka(t,o,e){const i=e.S,l=i.comp,c=i.ui,n=t.build.feats||[],b=j(c.featQ);let u=l.feats.filter(s=>(s.repetivel||!n.some(d=>d.id===s.id))&&(c.featCat==="all"||s.categoria===c.featCat)&&(!b||j(s.nome).includes(b)||j(s.prereq).includes(b)));const m=u.length;return u=u.slice(0,M),`
  <section class="card stack"><h2>Meus talentos</h2>
    ${n.length?n.map((s,d)=>{const a=l.byId.feats[s.id];return w(r((a==null?void 0:a.nome)||s.id),r(s.origem||(a==null?void 0:a.categoria)||""),(a?`<p class="empty-note">${r(a.categoria)}${a.prereq?" · Pré-requisito: "+r(a.prereq):""}</p>${S(a.desc)}`:'<p class="empty-note">Talento fora do compêndio.</p>')+`<button class="btn small" data-unfeat="${d}">Remover</button>`)}).join(""):'<p class="empty-note">Nenhum talento. Seu antecedente concede um talento de Origem.</p>'}
  </section>
  <section class="card stack"><h2>Biblioteca de talentos</h2>
    <input id="featq" type="search" placeholder="Buscar talento…" value="${r(c.featQ)}" aria-label="Buscar talento" />
    <div class="filters">${["all",...ya].map(s=>`<button data-fcat="${s}" aria-pressed="${c.featCat===s}">${s==="all"?"Todos":s}</button>`).join("")}</div>
    <p class="empty-note">${m} talento(s)${m>M?` — mostrando ${M}`:""}.</p>
    ${u.map(s=>w(r(s.nome),r(s.categoria),`${s.prereq?`<p class="empty-note">Pré-requisito: ${r(s.prereq)}</p>`:""}${S(s.desc)}`,!1,`data-k="f-${s.id}"`,F("data-feat",s.id,"Adicionar "+r(s.nome)))).join("")}
    ${l.feats.length?"":'<p class="empty-note">Importe o compêndio completo para usar a biblioteca de talentos.</p>'}
  </section>`}function wa(t,o,e){const i=e.S,l=e.app,c=t.build.feats||[];$("#featq").oninput=n=>{i.ui.featQ=n.target.value,T("fq",e.render,250)},l.querySelectorAll("[data-fcat]").forEach(n=>n.onclick=()=>{i.ui.featCat=n.dataset.fcat,e.render()}),l.querySelectorAll("[data-feat]").forEach(n=>n.onclick=()=>{e.save({"build.feats":[...c,{id:n.dataset.feat,origem:"Escolhido"}]}),e.toast("Talento adicionado. Aplique aumentos de atributo na aba Ficha, se houver.")}),l.querySelectorAll("[data-unfeat]").forEach(n=>n.onclick=()=>e.save({"build.feats":c.filter((b,u)=>u!==Number(n.dataset.unfeat))})),B(l,"feats")}function Sa(t,o,e){const i=e.S,l=i.comp,c=i.ui,n=t.inventory||[],b=t.coins||{},u=j(c.itemQ),m=u.length>=2?l.items.filter(a=>j(a.nome).includes(u)).slice(0,25):[],s=Math.min(100,Math.round(o.weight/o.carry*100)),d=a=>a.tipo==="arma"?`${r(a.dano)} · ${r(a.propriedades)} · Maestria: ${r(a.maestria)}`:a.tipo==="armadura"?`CA ${r(a.ca)}${a.forca&&a.forca!=="—"?" · "+r(a.forca):""}${a.furtividade==="Desvantagem"?" · Desv. Furtividade":""}`:"";return`
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Bolsa de moedas</h2><span class="lvl-badge">≈ ${o.coinsGP.toLocaleString("pt-BR",{maximumFractionDigits:2})} PO</span></div>
    <div class="coins">${x.map(([a,v,f])=>`<label class="coin coin-${a}"><span>${v}</span>
      <input type="number" inputmode="numeric" min="0" data-coin="${a}" value="${Number(b[a])||0}" aria-label="${f}" /></label>`).join("")}</div>
    <form class="row" id="coinop">
      <input id="coinamt" type="number" inputmode="numeric" min="1" placeholder="Qtd." style="width:5.5rem" aria-label="Quantidade" />
      <select id="coinkind" style="width:5.5rem" aria-label="Moeda">${x.map(([a,v])=>`<option value="${a}" ${a==="po"?"selected":""}>${v}</option>`).join("")}</select>
      <button class="btn heal small" data-cop="+">Receber</button><button class="btn danger small" data-cop="-">Gastar</button>
    </form>
  </section>
  <section class="card stack"><div class="sectiontitle"><h2 style="margin:0">Inventário</h2><span class="lvl-badge">${o.weight.toLocaleString("pt-BR",{maximumFractionDigits:1})} / ${o.carry} kg</span></div>
    <div class="hpbar" aria-hidden="true"><div class="cur ${s>100?"low":s>75?"mid":""}" style="width:${s}%"></div></div>
    ${n.length?n.map(a=>{const v=a.itemId?l.byId.weapons[a.itemId]||l.byId.armor[a.itemId]||l.byId.gear[a.itemId]:null;return w(`${a.equipado?"🛡️ ":""}${r(a.nome)}${Number(a.qtd)>1?` <span class="muted">×${a.qtd}</span>`:""}`,r(a.peso||""),`${v?`<p class="empty-note">${d(v)}${v.custo?" · "+r(v.custo):""}</p>${v.desc?S(v.desc):""}`:""}
        <div class="row">
          <button class="btn small" data-qty="${a.uid}" data-d="-1">−</button><b>${a.qtd}</b><button class="btn small" data-qty="${a.uid}" data-d="1">+</button>
          <label class="chk"><input type="checkbox" data-equip="${a.uid}" ${a.equipado?"checked":""}> Equipado</label>
          <label class="chk"><input type="checkbox" data-attune="${a.uid}" ${a.sintonizado?"checked":""}> Sintonizado</label>
        </div>
        <input data-inote="${a.uid}" id="inote-${a.uid}" value="${r(a.notas||"")}" placeholder="Notas (cargas, efeitos…)" aria-label="Notas do item" />
        <button class="btn small danger" data-rmitem="${a.uid}">Remover item</button>`,!1,`data-k="i-${a.uid}"`)}).join(""):'<p class="empty-note">Inventário vazio.</p>'}
  </section>
  <section class="card stack"><h2>Adicionar item</h2>
    <input id="itemq" type="search" placeholder="Buscar armas, armaduras, equipamento… (2+ letras)" value="${r(c.itemQ)}" aria-label="Buscar item" />
    ${m.map(a=>`<div class="libitem"><div class="info"><b>${r(a.nome)}</b><small>${r(a.custo||"")}${a.peso?" · "+r(a.peso):""} ${d(a)?"· "+d(a):""}</small></div>
      <button class="btn small primary" data-additem="${a.id}">+</button></div>`).join("")}
    ${u.length>=2&&!m.length?'<p class="empty-note">Nada encontrado — use o item personalizado abaixo.</p>':""}
    <form class="row" id="custom">
      <input id="cname" class="grow" placeholder="Item personalizado" required style="width:auto" aria-label="Nome do item" />
      <input id="cweight" placeholder="kg" inputmode="decimal" style="width:4.5rem" aria-label="Peso em kg" />
      <button class="btn small">Adicionar</button>
    </form>
  </section>`}function qa(t,o,e){const i=e.S,l=e.app,c=i.comp,n=t.inventory||[],b={pc:0,pp:0,pe:0,po:0,pl:0,...t.coins||{}},u=s=>e.save({inventory:s});l.querySelectorAll("[data-coin]").forEach(s=>s.onchange=()=>e.save({coins:{...b,[s.dataset.coin]:Math.max(0,Number(s.value)||0)}})),l.querySelectorAll("[data-cop]").forEach(s=>s.onclick=d=>{d.preventDefault();const a=Number($("#coinamt").value),v=$("#coinkind").value;if(!a)return e.toast("Digite a quantidade.");const f=b[v]+(s.dataset.cop==="+"?a:-a);if(f<0)return e.toast(`Não há ${a} ${v.toUpperCase()} suficientes.`);e.save({coins:{...b,[v]:f}})}),$("#itemq").oninput=s=>{i.ui.itemQ=s.target.value,T("iq",e.render,250)},l.querySelectorAll("[data-additem]").forEach(s=>s.onclick=()=>{const d=c.items.find(v=>v.id===s.dataset.additem),a=n.find(v=>v.itemId===d.id);u(a?n.map(v=>v===a?{...v,qtd:Number(v.qtd)+1}:v):[...n,{uid:Z(),itemId:d.id,nome:d.nome,qtd:1,peso:d.peso||"",equipado:!1,sintonizado:!1,notas:""}]),e.toast(`${d.nome} adicionado.`)}),$("#custom").onsubmit=s=>{s.preventDefault();const d=$("#cweight").value.trim();u([...n,{uid:Z(),itemId:null,nome:$("#cname").value.trim(),qtd:1,peso:d?`${d} kg`:"",equipado:!1,sintonizado:!1,notas:""}])};const m=(s,d)=>u(n.map(a=>a.uid===s?d(a):a));l.querySelectorAll("[data-qty]").forEach(s=>s.onclick=()=>m(s.dataset.qty,d=>({...d,qtd:Math.max(0,Number(d.qtd)+Number(s.dataset.d))}))),l.querySelectorAll("[data-equip]").forEach(s=>s.onchange=()=>m(s.dataset.equip,d=>({...d,equipado:s.checked}))),l.querySelectorAll("[data-attune]").forEach(s=>s.onchange=()=>{if(s.checked&&n.filter(d=>d.sintonizado).length>=3)return s.checked=!1,e.toast("Limite de 3 itens sintonizados.");m(s.dataset.attune,d=>({...d,sintonizado:s.checked}))}),l.querySelectorAll("[data-inote]").forEach(s=>s.oninput=()=>T("in"+s.dataset.inote,()=>m(s.dataset.inote,d=>({...d,notas:s.value})))),l.querySelectorAll("[data-rmitem]").forEach(s=>s.onclick=()=>u(n.filter(d=>d.uid!==s.dataset.rmitem))),B(l,"itens")}const Aa={ficha:{html:ba,bind:va},magias:{html:$a,bind:ha},classe:{html:fa,bind:ga},talentos:{html:ka,bind:wa},itens:{html:Sa,bind:qa}},k=$("#app"),p={be:null,comp:null,user:null,chId:null,ch:null,tab:"combate",amount:"",off:[],prevHp:null,ui:{spellQ:"",spellLvl:"all",spellMine:!0,featQ:"",featCat:"all",itemQ:"",libOpen:{}}},_=()=>`rpgmesa:last:${p.user.uid}`,O=()=>{p.off.forEach(t=>t()),p.off=[]},ea=Object.fromEntries(ia.map(([t,o])=>[t,o])),R=Object.fromEntries(N);Ea().catch(t=>{k.innerHTML=`<div class="wrap"><div class="card">Erro ao iniciar: ${r(t.message)}</div></div>`});async function Ea(){p.be=await ca(),ra(p.be,k,{title:"Grimório do Aventureiro",subtitle:"Entre com sua conta para acessar seus personagens em qualquer aparelho.",onSignedOut:()=>{O(),p.ch=null,p.chId=null,p.prevHp=null}},async t=>{p.user=t,k.innerHTML='<p class="muted" style="padding:1rem">Carregando compêndio…</p>',p.comp=await da(p.be);const o=Q.get(_());o?K(o):D()})}const la=()=>p.be.mode==="local"?'<p class="banner">Modo demo: os dados ficam neste navegador. Abra o Escudo em outra aba para testar a sincronização.</p>':"",Ca=()=>p.comp.completo?"":'<p class="banner">Biblioteca reduzida: o Mestre ainda não importou o compêndio completo no Escudo.</p>';function D(){O(),p.chId=null,p.ch=null,Q.set(_(),null);let t=!1;p.off.push(p.be.watchMyCharacters(o=>{$("#build")||(o.sort((e,i)=>e.name.localeCompare(i.name)),k.innerHTML=`<header class="top"><div class="row"><div class="grow name">Meus personagens</div>${ta(p.user)}</div></header>
    <main class="wrap stack">${la()}${Ca()}
      ${o.map(e=>`<button class="charbtn" data-open="${e.id}">
        <span><b>${r(e.name)}</b><br><small class="muted">${r(oa(e))}</small></span>
        <span class="chip">${e.campaignName?"🎲 "+r(e.campaignName):"Sem mesa"}</span></button>`).join("")}
      ${o.length?"":'<div class="card"><p style="margin:0">Você ainda não tem personagens. Crie o primeiro abaixo — ele fica salvo na sua conta.</p></div>'}
      <button class="btn primary" id="newchar" style="width:100%">+ Novo personagem</button>
    </main>`,sa(p.be,k),k.querySelectorAll("[data-open]").forEach(e=>e.onclick=()=>K(e.dataset.open)),$("#newchar").onclick=()=>ja(),!o.length&&!t&&(t=!0))}))}function ja(){O();const t=p.comp,o=[15,14,13,12,10,8];k.innerHTML=`<header class="top"><div class="row"><button class="btn small" id="back" aria-label="Voltar">◀</button><div class="grow name">Novo personagem</div></div></header>
  <main class="wrap stack">
  <form class="stack" id="build">
    <section class="card stack">
      <div><label for="name">Nome</label><input id="name" name="name" required maxlength="40" /></div>
      <div class="row">
        <div class="grow"><label for="species">Espécie</label><select id="species" name="species">
          ${t.species.map(s=>`<option value="${s.id}">${r(s.nome)}</option>`).join("")}</select></div>
        <div style="width:5.5rem"><label for="level">Nível</label><input id="level" name="level" type="number" inputmode="numeric" min="1" max="20" value="1" /></div>
      </div>
      <div><label for="class">Classe</label><select id="class" name="class">
        ${t.classes.map(s=>`<option value="${s.id}">${r(s.nome)}</option>`).join("")}</select></div>
      <div id="classinfo"></div>
    </section>
    ${t.backgrounds.length?`<section class="card stack">
      <div><label for="bg">Antecedente</label><select id="bg" name="bg">
        ${t.backgrounds.map(s=>`<option value="${s.id}">${r(s.nome)}</option>`).join("")}</select></div>
      <div id="bginfo"></div>
    </section>`:""}
    <section class="card stack">
      <h2>Atributos</h2>
      <p class="muted" style="margin:0;font-size:.9rem">Valores base (Modo Padrão: 15, 14, 13, 12, 10, 8). O bônus do antecedente é somado automaticamente.</p>
      <div class="ab-inputs">${N.map(([s,d],a)=>`<div><label for="ab-${s}">${d} <b class="abfinal" data-ab="${s}"></b></label>
        <input id="ab-${s}" name="${s}" type="number" inputmode="numeric" min="3" max="20" value="${o[a]}" /></div>`).join("")}</div>
    </section>
    <button class="btn primary" style="width:100%">Criar ficha</button>
  </form></main>`,$("#back").onclick=D;const e=$("#build"),i=()=>t.byId.classes[e.class.value],l=()=>{var s,d;return(d=t.byId.backgrounds)==null?void 0:d[(s=e.bg)==null?void 0:s.value]};function c(){var a;const s=i(),d=(a=s.periciasOpcoes)!=null&&a.length?s.periciasOpcoes:[];$("#classinfo").innerHTML=`
      <p class="muted" style="margin:.2rem 0;font-size:.88rem">Dado de Vida d${s.dadoVida} · Salvaguardas: ${(s.salvaguardas||[]).map(v=>R[v]).join(", ")}</p>
      ${d.length?`<div><label>Perícias da classe — escolha ${s.periciasEscolha} <span id="skcount"></span></label>
        <div class="checks">${d.map(v=>`<label class="chk"><input type="checkbox" name="sk" value="${v}"> ${ea[v]}</label>`).join("")}</div></div>`:""}`,e.querySelectorAll("[name=sk]").forEach(v=>v.onchange=n),n()}function n(){var f;const s=i(),d=((f=l())==null?void 0:f.pericias)||[],a=[...e.querySelectorAll("[name=sk]")];a.forEach(g=>{d.includes(g.value)&&(g.checked=!1,g.disabled=!0,g.parentElement.title="Já vem do antecedente")});const v=a.filter(g=>g.checked).length;a.forEach(g=>{d.includes(g.value)||(g.disabled=!g.checked&&v>=s.periciasEscolha)}),$("#skcount")&&($("#skcount").textContent=`(${v}/${s.periciasEscolha})`)}function b(){const s=l();if(!s)return;const d=t.byId.feats[s.talentoId];$("#bginfo").innerHTML=`
      <p style="margin:.2rem 0;font-size:.9rem"><b>Perícias:</b> ${s.pericias.map(a=>ea[a]).join(", ")}<br>
      <b>Talento:</b> ${r((d==null?void 0:d.nome)||s.talento)}<br><b>Ferramenta:</b> ${r(s.ferramenta)}</p>
      <div class="row">
        <div class="grow"><label for="plus2">+2 em</label><select id="plus2">${s.atributos.map(a=>`<option value="${a}">${R[a]}</option>`).join("")}<option value="all">+1 nos três</option></select></div>
        <div class="grow" id="plus1wrap"><label for="plus1">+1 em</label><select id="plus1">${s.atributos.map((a,v)=>`<option value="${a}" ${v===1?"selected":""}>${R[a]}</option>`).join("")}</select></div>
      </div>
      <details class="entry"><summary><span class="t">Equipamento do antecedente</span></summary><div class="body">${r(s.equipamento)}</div></details>`,$("#plus2").onchange=$("#plus1").onchange=m,m(),n()}function u(){const s=l(),d={};if(!s)return d;const a=$("#plus2").value;if(a==="all")s.atributos.forEach(v=>d[v]=1);else{d[a]=2;const v=$("#plus1").value;v!==a&&(d[v]=(d[v]||0)+1)}return d}function m(){const s=u();$("#plus1wrap")&&($("#plus1wrap").style.visibility=$("#plus2").value==="all"?"hidden":""),e.querySelectorAll(".abfinal").forEach(d=>{const a=d.dataset.ab,v=Math.min(20,Number(e[a].value)+(s[a]||0));d.textContent=s[a]?`→ ${v} (${A(Y(v))})`:`(${A(Y(v))})`})}e.class.onchange=c,e.bg&&(e.bg.onchange=b),N.forEach(([s])=>e[s].oninput=m),c(),b(),m(),e.onsubmit=async s=>{var f;s.preventDefault();const d=u(),a=Object.fromEntries(N.map(([g])=>[g,Math.min(20,Number(e[g].value)+(d[g]||0))])),v=ua({name:e.name.value.trim(),ownerUid:p.user.uid,speciesId:e.species.value,classId:e.class.value,level:Number(e.level.value),abilities:a,backgroundId:((f=e.bg)==null?void 0:f.value)||null,skillProfs:[...e.querySelectorAll("[name=sk]:checked")].map(g=>g.value)},t);try{K(await p.be.createCharacter(v))}catch(g){q(g.message)}}}const oa=t=>{var l;const o=p.comp.byId.classes[t.build.classes[0].classId],e=(l=o==null?void 0:o.subclasses)==null?void 0:l.find(c=>c.id===t.build.classes[0].subclassId),i=p.comp.byId.species[t.build.speciesId];return`${(i==null?void 0:i.nome)??""} · ${(o==null?void 0:o.nome)??""} ${t.build.classes[0].level}${e?" · "+e.nome:""}`};function K(t){O(),p.chId=t,p.prevHp=null,Q.set(_(),t),p.off.push(p.be.watchCharacter(t,o=>{if(!o)return D();const e=p.prevHp;if(p.prevHp=o.state.hp.current+o.state.hp.temp,p.ch=o,W(),e!=null&&e!==p.prevHp){const i=$("#hpcard");i==null||i.classList.add(p.prevHp<e?"flash-dmg":"flash-heal"),navigator.vibrate&&p.prevHp<e&&navigator.vibrate(80)}}))}const Ia=[["combate","❤️","Combate"],["ficha","📜","Ficha"],["magias","✨","Magias"],["classe","🛡️","Traços"],["talentos","⭐","Talentos"],["itens","🎒","Itens"]],C={get S(){return p},app:k,render:()=>W(),save:t=>p.be.updateCharacter(p.chId,t).catch(o=>q(o.message)),toast:q,showHome:()=>D(),confirmTwice:Na,accountChip:ta,bindLogout:sa};function W(){const t=p.ch,o=ma(t,p.comp),e=document.activeElement,i=e==null?void 0:e.id,l=e&&"selectionStart"in e?[e.selectionStart,e.selectionEnd]:null,c=window.scrollY,n={combate:{html:Ma,bind:Ta},...Aa},b=n[p.tab]||n.combate;if(k.innerHTML=`
    <header class="top">
      <div class="row"><button class="btn small" id="home" aria-label="Meus personagens">◀</button>
        <div class="grow"><div class="name">${r(t.name)}</div>
        <div class="mini"><span>${r(oa(t))}</span>${t.campaignName?`<span>🎲 ${r(t.campaignName)}</span>`:""}</div></div>
        <div class="mini"><span>CA <b>${t.build.ac??10}</b></span><span>PV <b>${t.state.hp.current}/${t.state.hp.max}</b></span></div></div>
    </header>
    <main class="wrap stack">${la()}${b.html(t,o,C)}</main>
    <nav class="tabs" role="tablist">${Ia.map(([u,m,s])=>`<button role="tab" aria-selected="${p.tab===u}" data-tab="${u}"><span class="ico" aria-hidden="true">${m}</span>${s}</button>`).join("")}</nav>`,k.querySelectorAll("[data-tab]").forEach(u=>u.onclick=()=>{p.tab=u.dataset.tab,W(),window.scrollTo(0,0)}),$("#home").onclick=D,b.bind(t,o,C),window.scrollTo(0,c),i){const u=document.getElementById(i);if(u&&(u.focus({preventScroll:!0}),l&&"setSelectionRange"in u))try{u.setSelectionRange(...l)}catch{}}}function Na(t,o){const e=$(t);if(e.dataset.armed)return!0;e.dataset.armed="1";const i=e.textContent;return e.textContent=o,setTimeout(()=>{e.isConnected&&(delete e.dataset.armed,e.textContent=i)},3e3),!1}function Ma(t,o){const{hp:e,deathSaves:i={success:0,fail:0},conditions:l=[],dead:c}=t.state,n=e.max+e.temp,b=Math.round(e.current/n*100),u=Math.round(e.temp/n*100),m=e.current/e.max>.5?"":e.current/e.max>.25?"mid":"low",s=e.current===0&&!c,d=t.state.concentration?p.comp.byId.spells[t.state.concentration]:null;return`
  <section class="card stack" id="hpcard">
    <div class="hp-big"><div class="num">${e.current}<small> / ${e.max}</small></div>
      ${e.temp?`<div class="tmpv">+${e.temp} temporários</div>`:""}
      ${c?'<div class="chip bad" style="margin-top:.4rem">MORTO</div>':""}</div>
    <div class="hpbar" aria-hidden="true"><div class="cur ${m}" style="width:${b}%"></div><div class="tmp" style="width:${u}%"></div></div>
    <input id="amount" class="amount" type="number" inputmode="numeric" min="0" placeholder="0" value="${r(p.amount)}" aria-label="Valor" />
    <div class="quick">${[1,2,5,10,"C"].map(a=>`<button class="btn small" data-q="${a}">${a==="C"?"Limpar":"+"+a}</button>`).join("")}</div>
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
    <div><b>${t.build.ac??10}</b><small>CA</small></div>
    <div><b>${A(o.initiative)}</b><small>Iniciativa</small></div>
    <div><b>${r(o.speed.replace(" metros"," m"))}</b><small>Deslocamento</small></div>
    <div><b>${o.passivePerception}</b><small>Perc. passiva</small></div>
  </div></section>
  ${d?`<p class="banner">Concentrando em: <b>${r(d.nome)}</b> <button class="btn small" id="endconc" style="margin-left:.5rem">Encerrar</button></p>`:""}
  ${s?`<section class="card stack"><h2>Testes contra a morte</h2>
    <div class="saves"><div><small class="muted">Sucessos</small><div class="pips">${[0,1,2].map(a=>`<span class="pip ${a<i.success?"s":""}"></span>`).join("")}</div></div>
      <div><small class="muted">Falhas</small><div class="pips">${[0,1,2].map(a=>`<span class="pip ${a<i.fail?"f":""}"></span>`).join("")}</div></div></div>
    <button class="btn primary" id="roll-death" style="width:100%">Rolar d20</button></section>`:""}
  <section class="card stack"><h2>Condições</h2>
    <div class="row">${l.map(a=>`<button class="chip bad" data-rmcond="${a}" aria-label="Remover ${a}">${J[a]||a} ✕</button>`).join("")||'<span class="muted">Nenhuma</span>'}</div>
    <div class="row"><select id="addcond" class="grow" aria-label="Adicionar condição"><option value="">Adicionar condição…</option>
      ${pa.filter(a=>!l.includes(a)).map(a=>`<option value="${a}">${J[a]||a}</option>`).join("")}</select></div>
  </section>
  <section class="card stack"><h2>Descanso</h2>
    <p class="muted" style="margin:0">Dados de Vida: ${t.state.hitDice.max-t.state.hitDice.used}/${t.state.hitDice.max} (d${t.state.hitDice.die})</p>
    <div class="row"><button class="btn grow" id="short">Gastar 1 Dado de Vida</button><button class="btn grow" id="long">Descanso Longo</button></div>
  </section>
  <section class="card"><h2>Registro</h2><ul class="log">${(t.state.log||[]).map(a=>`<li>${r(a)}</li>`).join("")||"<li>—</li>"}</ul></section>`}function Ta(t,o){const e=$("#amount");e.oninput=()=>p.amount=e.value,k.querySelectorAll("[data-q]").forEach(i=>i.onclick=()=>{p.amount=i.dataset.q==="C"?"":String((Number(p.amount)||0)+Number(i.dataset.q)),e.value=p.amount}),k.querySelectorAll("[data-act]").forEach(i=>i.onclick=async()=>{const l=Number(p.amount);if(!l)return q("Digite um valor.");const c={resistant:$("#o-res").checked,vulnerable:$("#o-vul").checked,critical:$("#o-crit").checked};p.amount="";const n=await H(p.be,p.chId,i.dataset.act,l,c,t.name);n.concentrationDC&&t.state.concentration?q(`Teste de Concentração: CD ${n.concentrationDC}`):n.log.length&&q(n.log.at(-1))}),$("#endconc")&&($("#endconc").onclick=()=>C.save({"state.concentration":null})),$("#roll-death")&&($("#roll-death").onclick=async()=>{const i=X("1d20").total,l=await H(p.be,p.chId,"morte",i,{},t.name);q(`d20 = ${i}. ${l.log.at(-1)??""}`)}),k.querySelectorAll("[data-rmcond]").forEach(i=>i.onclick=()=>C.save({"state.conditions":t.state.conditions.filter(l=>l!==i.dataset.rmcond)})),$("#addcond").onchange=i=>i.target.value&&C.save({"state.conditions":[...t.state.conditions,i.target.value]}),$("#short").onclick=async()=>{const i=t.state.hitDice;if(i.used>=i.max)return q("Sem Dados de Vida disponíveis.");const l=X(`1d${i.die}`).total+o.mods.con;await C.save({"state.hitDice.used":i.used+1});const c=await H(p.be,p.chId,"cura",Math.max(0,l),{},t.name);q(`Dado de Vida: ${l}. ${c.log[0]??""}`)},$("#long").onclick=async()=>{const i=Object.fromEntries(Object.entries(t.state.spellSlots||{}).map(([l,c])=>[l,{...c,used:0}]));await C.save({"state.hp":{...t.state.hp,current:t.state.hp.max,temp:0},"state.spellSlots":i,"state.hitDice.used":0,"state.deathSaves":{success:0,fail:0},"state.conditions":t.state.conditions.filter(l=>!["inconsciente","estabilizado"].includes(l))}),q("Descanso longo concluído.")}}
