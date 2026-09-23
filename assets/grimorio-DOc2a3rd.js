import{$ as i,e as r,g as L,l as O,r as P,s as I,a as N,b as q,A,i as V,m as B,t as v,d as R,C as j,c as F,h as C,f as $}from"./auth-Bik3xOc1.js";/* empty css             */function D(t){const e=String(t).replace(/\s/g,"").match(/^(\d*)d(\d+)([+-]\d+)?$/i);if(!e)return null;const s=Number(e[1]||1),n=Number(e[2]),o=Number(e[3]||0),c=Array.from({length:s},()=>1+Math.floor(Math.random()*n));return{rolls:c,bonus:o,total:c.reduce((d,p)=>d+p,0)+o}}const u=i("#app"),a={be:null,comp:null,user:null,chId:null,ch:null,tab:"combate",amount:"",off:[],prevHp:null},S=()=>`rpgmesa:last:${a.user.uid}`,w=()=>{a.off.forEach(t=>t()),a.off=[]};K().catch(t=>{u.innerHTML=`<div class="wrap"><div class="card">Erro ao iniciar: ${r(t.message)}</div></div>`});async function K(){[a.be,a.comp]=await Promise.all([L(),O()]),P(a.be,u,{title:"Grimório do Aventureiro",subtitle:"Entre com sua conta para acessar seus personagens em qualquer aparelho.",onSignedOut:()=>{w(),a.ch=null,a.chId=null,a.prevHp=null}},t=>{a.user=t;const e=I.get(S());e?k(e):y()})}const M=()=>a.be.mode==="local"?'<p class="banner">Modo demo: os dados ficam neste navegador. Abra o Escudo em outra aba para testar a sincronização.</p>':"";function y(){w(),a.chId=null,a.ch=null,I.set(S(),null);let t=!1;a.off.push(a.be.watchMyCharacters(e=>{var n;const s=((n=i("#newchar"))==null?void 0:n.open)??t;e.sort((o,c)=>o.name.localeCompare(c.name)),u.innerHTML=`<header class="top"><div class="row"><div class="grow name">Meus personagens</div>${N(a.user)}</div></header>
    <main class="wrap stack">${M()}
      ${e.map(o=>`<button class="charbtn" data-open="${o.id}">
        <span><b>${r(o.name)}</b><br><small class="muted">${r(T(o))}</small></span>
        <span class="chip">${o.campaignName?"🎲 "+r(o.campaignName):"Sem mesa"}</span></button>`).join("")}
      ${e.length?"":'<div class="card"><p style="margin:0">Você ainda não tem personagens. Crie o primeiro abaixo — ele fica salvo na sua conta.</p></div>'}
      <details class="card" id="newchar" ${s||!e.length?"open":""}><summary class="sumtitle">+ Novo personagem</summary>${z()}</details>
    </main>`,q(a.be,u),i("#newchar").ontoggle=o=>t=o.target.open,u.querySelectorAll("[data-open]").forEach(o=>o.onclick=()=>k(o.dataset.open)),i("#build").onsubmit=async o=>{o.preventDefault();const c=new FormData(o.target),d=Object.fromEntries(A.map(([b])=>[b,Number(c.get(b))])),p=V({name:c.get("name").trim(),ownerUid:a.user.uid,speciesId:c.get("species"),classId:c.get("class"),level:Number(c.get("level")),abilities:d},a.comp);p.build.ac=10+B(d.des);try{k(await a.be.createCharacter(p))}catch(b){v(b.message)}}}))}function z(){const t=[15,14,13,12,10,8];return`<form class="stack" id="build" style="margin-top:.75rem">
    <div><label for="name">Nome</label><input id="name" name="name" required maxlength="40" /></div>
    <div class="row">
      <div class="grow"><label for="species">Espécie</label><select id="species" name="species">
        ${a.comp.species.map(e=>`<option value="${e.id}">${r(e.nome)}</option>`).join("")}</select></div>
      <div class="grow"><label for="class">Classe</label><select id="class" name="class">
        ${a.comp.classes.map(e=>`<option value="${e.id}">${r(e.nome)}</option>`).join("")}</select></div>
      <div style="width:5.5rem"><label for="level">Nível</label><input id="level" name="level" type="number" inputmode="numeric" min="1" max="20" value="1" /></div>
    </div>
    <div><label>Atributos (já com os bônus do antecedente)</label>
      <div class="ab-inputs">${A.map(([e,s],n)=>`<div><label for="ab-${e}">${s}</label>
        <input id="ab-${e}" name="${e}" type="number" inputmode="numeric" min="1" max="30" value="${t[n]}" /></div>`).join("")}</div></div>
    <button class="btn primary" style="width:100%">Criar ficha</button>
  </form>`}const T=t=>{const e=a.comp.classes.find(n=>n.id===t.build.classes[0].classId),s=a.comp.species.find(n=>n.id===t.build.speciesId);return`${(s==null?void 0:s.nome)??""} · ${(e==null?void 0:e.nome)??""} ${t.build.classes[0].level}`};function k(t){w(),a.chId=t,a.prevHp=null,I.set(S(),t),a.off.push(a.be.watchCharacter(t,e=>{if(!e)return y();const s=a.prevHp;if(a.prevHp=e.state.hp.current+e.state.hp.temp,a.ch=e,H(),s!=null&&s!==a.prevHp){const n=i("#hpcard");n==null||n.classList.add(a.prevHp<s?"flash-dmg":"flash-heal"),navigator.vibrate&&a.prevHp<s&&navigator.vibrate(80)}}))}const G=[["ficha","📜","Ficha"],["combate","❤️","Combate"],["magias","✨","Magias"],["mapa","🗺️","Mapa"]];function H(){var n,o,c;const t=a.ch,e=R(t,a.comp),s=((n=document.activeElement)==null?void 0:n.id)==="amount";u.innerHTML=`
    <header class="top">
      <div class="row"><button class="btn small" id="home" aria-label="Meus personagens">◀</button>
        <div class="grow"><div class="name">${r(t.name)}</div>
        <div class="mini"><span>${r(T(t))}</span>${t.campaignName?`<span>🎲 ${r(t.campaignName)}</span>`:""}</div></div>
        <div class="mini"><span>CA <b>${t.build.ac??10}</b></span><span>PV <b>${t.state.hp.current}/${t.state.hp.max}</b></span></div></div>
    </header>
    <main class="wrap stack">${M()}${{ficha:_,combate:U,magias:J,mapa:Q}[a.tab](t,e)}</main>
    <nav class="tabs" role="tablist">${G.map(([d,p,b])=>`<button role="tab" aria-selected="${a.tab===d}" data-tab="${d}"><span class="ico" aria-hidden="true">${p}</span>${b}</button>`).join("")}</nav>`,u.querySelectorAll("[data-tab]").forEach(d=>d.onclick=()=>{a.tab=d.dataset.tab,H(),window.scrollTo(0,0)}),i("#home").onclick=y,(o=g[a.tab])==null||o.call(g,t,e),s&&((c=i("#amount"))==null||c.focus())}function U(t,e){const{hp:s,deathSaves:n={success:0,fail:0},conditions:o=[],dead:c}=t.state,d=s.max+s.temp,p=Math.round(s.current/d*100),b=Math.round(s.temp/d*100),l=s.current/s.max>.5?"":s.current/s.max>.25?"mid":"low",h=s.current===0&&!c;return`
  <section class="card stack" id="hpcard">
    <div class="hp-big"><div class="num">${s.current}<small> / ${s.max}</small></div>
      ${s.temp?`<div class="tmpv">+${s.temp} temporários</div>`:""}
      ${c?'<div class="chip bad" style="margin-top:.4rem">MORTO</div>':""}</div>
    <div class="hpbar" aria-hidden="true"><div class="cur ${l}" style="width:${p}%"></div><div class="tmp" style="width:${b}%"></div></div>
    <input id="amount" class="amount" type="number" inputmode="numeric" min="0" placeholder="0" value="${r(a.amount)}" aria-label="Valor" />
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
  ${h?`<section class="card stack"><h2>Testes contra a morte</h2>
    <div class="saves"><div><small class="muted">Sucessos</small><div class="pips">${[0,1,2].map(m=>`<span class="pip ${m<n.success?"s":""}"></span>`).join("")}</div></div>
      <div><small class="muted">Falhas</small><div class="pips">${[0,1,2].map(m=>`<span class="pip ${m<n.fail?"f":""}"></span>`).join("")}</div></div></div>
    <button class="btn primary" id="roll-death" style="width:100%">Rolar d20</button></section>`:""}
  <section class="card stack"><h2>Condições</h2>
    <div class="row">${o.map(m=>`<button class="chip bad" data-rmcond="${m}" aria-label="Remover ${m}">${j[m]||m} ✕</button>`).join("")||'<span class="muted">Nenhuma</span>'}</div>
    <div class="row"><select id="addcond" class="grow" aria-label="Adicionar condição"><option value="">Adicionar condição…</option>
      ${F.filter(m=>!o.includes(m)).map(m=>`<option value="${m}">${j[m]||m}</option>`).join("")}</select></div>
  </section>
  <section class="card stack"><h2>Descanso</h2>
    <p class="muted" style="margin:0">Dados de Vida: ${t.state.hitDice.max-t.state.hitDice.used}/${t.state.hitDice.max} (d${t.state.hitDice.die})</p>
    <div class="row"><button class="btn grow" id="short">Gastar 1 Dado de Vida</button><button class="btn grow" id="long">Descanso Longo</button></div>
  </section>
  <section class="card"><h2>Registro</h2><ul class="log">${(t.state.log||[]).map(m=>`<li>${r(m)}</li>`).join("")||"<li>—</li>"}</ul></section>`}const g={};g.combate=(t,e)=>{const s=i("#amount");s.oninput=()=>a.amount=s.value,u.querySelectorAll("[data-q]").forEach(n=>n.onclick=()=>{a.amount=n.dataset.q==="C"?"":String((Number(a.amount)||0)+Number(n.dataset.q)),s.value=a.amount}),u.querySelectorAll("[data-act]").forEach(n=>n.onclick=async()=>{const o=Number(a.amount);if(!o)return v("Digite um valor.");const c={resistant:i("#o-res").checked,vulnerable:i("#o-vul").checked,critical:i("#o-crit").checked};a.amount="";const d=await C(a.be,a.chId,n.dataset.act,o,c,t.name);d.concentrationDC&&t.state.concentration?v(`Teste de Concentração: CD ${d.concentrationDC}`):d.log.length&&v(d.log.at(-1))}),i("#roll-death")&&(i("#roll-death").onclick=async()=>{const n=D("1d20").total,o=await C(a.be,a.chId,"morte",n,{},t.name);v(`d20 = ${n}. ${o.log.at(-1)??""}`)}),u.querySelectorAll("[data-rmcond]").forEach(n=>n.onclick=()=>a.be.updateCharacter(a.chId,{"state.conditions":t.state.conditions.filter(o=>o!==n.dataset.rmcond)})),i("#addcond").onchange=n=>n.target.value&&a.be.updateCharacter(a.chId,{"state.conditions":[...t.state.conditions,n.target.value]}),i("#short").onclick=async()=>{const n=t.state.hitDice;if(n.used>=n.max)return v("Sem Dados de Vida disponíveis.");const o=D(`1d${n.die}`).total+e.mods.con;await a.be.updateCharacter(a.chId,{"state.hitDice.used":n.used+1});const c=await C(a.be,a.chId,"cura",Math.max(0,o),{},t.name);v(`Dado de Vida: ${o}. ${c.log[0]??""}`)},i("#long").onclick=async()=>{t.state.hitDice;const n=Object.fromEntries(Object.entries(t.state.spellSlots||{}).map(([o,c])=>[o,{...c,used:0}]));await a.be.updateCharacter(a.chId,{"state.hp":{...t.state.hp,current:t.state.hp.max,temp:0},"state.spellSlots":n,"state.hitDice.used":0,"state.deathSaves":{success:0,fail:0},"state.conditions":t.state.conditions.filter(o=>!["inconsciente","estabilizado"].includes(o))}),v("Descanso longo concluído.")}};function _(t,e){return`
  <section class="card stack">
    <div class="stats">
      <div><b>${$(e.pb)}</b><small>Proficiência</small></div>
      <div><b>${$(e.initiative)}</b><small>Iniciativa</small></div>
      <div><b>${r(e.speed)}</b><small>Deslocamento</small></div>
      <div><b>${e.passivePerception}</b><small>Perc. passiva</small></div>
    </div>
    <div class="row"><label for="ac" style="margin:0">Classe de Armadura</label>
      <input id="ac" type="number" inputmode="numeric" style="width:6rem" value="${t.build.ac??10}" /></div>
  </section>
  <section class="card stack"><h2>Atributos</h2>
    <div class="abil">${A.map(([s,n])=>`<div><small>${n}</small><b>${$(e.mods[s])}</b>
      <span class="muted">${t.build.abilities[s]}</span><br><small>TR ${$(e.saves[s])}${t.build.saveProfs.includes(s)?" ●":""}</small></div>`).join("")}</div>
  </section>
  <section class="card"><h2>Perícias</h2><p class="muted" style="margin-top:0;font-size:.85rem">Toque para marcar proficiência.</p>
    <div class="skills">${e.skills.map(s=>`<button data-skill="${s.id}" aria-pressed="${s.prof}">
      <span class="row" style="flex-wrap:nowrap"><span class="dot ${s.prof?"on":""}"></span>${s.nome} <small class="muted">(${s.ab.toUpperCase()})</small></span><b>${$(s.bonus)}</b></button>`).join("")}</div>
  </section>
  <section class="card stack"><h2>Anotações</h2>
    <textarea id="notes" rows="5" placeholder="Itens, aliados, pistas…">${r(t.notes)}</textarea></section>
  <section class="card stack"><h2>Mesa</h2>
    ${t.campaignId?`<p style="margin:0">Jogando em <b>${r(t.campaignName)}</b>. O Mestre dessa mesa pode ver e alterar esta ficha.</p>
         <button class="btn" id="leave-table">Sair da mesa</button>`:`<p class="muted" style="margin:0">Esta ficha não está em nenhuma mesa. Só você pode vê-la.</p>
         <form class="row" id="join"><input id="code" class="grow" autocomplete="off" autocapitalize="characters" placeholder="Código (ABC-123)" aria-label="Código da mesa" required style="width:auto" />
         <button class="btn primary">Entrar</button></form>`}
  </section>
  <section class="card stack"><h2>Conta</h2>
    <div class="row">${N(a.user)}</div>
    <button class="btn danger small" id="delete">Apagar personagem</button>
  </section>`}let x;g.ficha=t=>{u.querySelectorAll("[data-skill]").forEach(e=>e.onclick=()=>{const s=e.dataset.skill,n=t.build.skillProfs||[];a.be.updateCharacter(a.chId,{"build.skillProfs":n.includes(s)?n.filter(o=>o!==s):[...n,s]})}),i("#ac").onchange=e=>a.be.updateCharacter(a.chId,{"build.ac":Number(e.target.value)||10}),i("#notes").oninput=e=>{clearTimeout(x),x=setTimeout(()=>a.be.updateCharacter(a.chId,{notes:e.target.value}),600)},q(a.be,u),i("#join")&&(i("#join").onsubmit=async e=>{e.preventDefault();try{const s=await a.be.joinByCode(i("#code").value);await a.be.updateCharacter(a.chId,{campaignId:s.id,campaignName:s.name}),v(`${t.name} entrou na mesa ${s.name}.`)}catch(s){v(s.message)}}),i("#leave-table")&&(i("#leave-table").onclick=()=>{E("#leave-table","Toque de novo para confirmar")&&a.be.updateCharacter(a.chId,{campaignId:null,campaignName:null})}),i("#delete").onclick=async()=>{if(!E("#delete",`Toque de novo para apagar ${t.name}`))return;const e=a.chId;w(),await a.be.deleteCharacter(e),y()}};function E(t,e){const s=i(t);if(s.dataset.armed)return!0;s.dataset.armed="1";const n=s.textContent;return s.textContent=e,setTimeout(()=>{s.isConnected&&(delete s.dataset.armed,s.textContent=n)},3e3),!1}function J(t,e){var p,b;const s=Object.entries(t.state.spellSlots||{});if(!((p=e.cls)!=null&&p.atributoConjuracao))return'<section class="card"><h2>Magias</h2><p class="muted">Esta classe não conjura magias no nível atual.</p></section>';const n=t.build.spellsKnown||[],o=a.comp.spells.filter(l=>n.includes(l.id)).sort((l,h)=>l.nivel-h.nivel),c=a.comp.spells.filter(l=>l.classes.includes(e.cls.id)&&!n.includes(l.id)),d=l=>l===0?"Truque":`${l}º círculo`;return`
  <section class="card stack"><div class="stats" style="grid-template-columns:repeat(2,1fr)">
    <div><b>${e.spellDC}</b><small>CD de magia</small></div><div><b>${$(e.spellAttack)}</b><small>Ataque mágico</small></div></div></section>
  <section class="card slots"><h2>Espaços de magia</h2>
    ${s.map(([l,h])=>`<div class="lvl"><span>${l}º</span>${Array.from({length:h.max},(m,f)=>`<button class="slotpip ${f<h.used?"used":""}" data-slot="${l}" data-i="${f}" aria-label="Espaço de ${l}º círculo ${f+1}${f<h.used?", gasto":""}"></button>`).join("")}</div>`).join("")||'<p class="muted">Sem espaços.</p>'}
  </section>
  <section class="card stack"><h2>Minhas magias</h2>
    ${o.map(l=>`<details class="spell"><summary><span>${r(l.nome)}${l.concentracao?' <span class="chip">C</span>':""}</span><small class="muted">${d(l.nivel)}</small></summary>
      <div class="body stack"><div class="muted">${r(l.escola)} · ${r(l.tempo)} · ${r(l.alcance)} · ${r(l.componentes)} · ${r(l.duracao)}</div>
      <p style="margin:0">${r(l.resumo)}</p>
      <div class="row">${l.concentracao?`<button class="btn small" data-conc="${l.id}">${t.state.concentration===l.id?"Encerrar concentração":"Concentrar"}</button>`:""}
      <button class="btn small" data-forget="${l.id}">Remover</button></div></div></details>`).join("")||'<p class="muted">Adicione magias da lista abaixo.</p>'}
    ${t.state.concentration?`<p class="banner">Concentrando em: ${r((b=a.comp.spells.find(l=>l.id===t.state.concentration))==null?void 0:b.nome)}</p>`:""}
  </section>
  <section class="card stack"><h2>Adicionar da biblioteca</h2>
    <select id="addspell"><option value="">Escolher magia de ${r(e.cls.nome)}…</option>
      ${c.map(l=>`<option value="${l.id}">${r(l.nome)} (${d(l.nivel)})</option>`).join("")}</select></section>`}g.magias=t=>{u.querySelectorAll("[data-slot]").forEach(e=>e.onclick=()=>{const s=e.dataset.slot,n=Number(e.dataset.i),o=t.state.spellSlots[s],c=n<o.used?n:n+1;a.be.updateCharacter(a.chId,{[`state.spellSlots.${s}.used`]:c})}),i("#addspell")&&(i("#addspell").onchange=e=>e.target.value&&a.be.updateCharacter(a.chId,{"build.spellsKnown":[...t.build.spellsKnown||[],e.target.value]})),u.querySelectorAll("[data-forget]").forEach(e=>e.onclick=()=>a.be.updateCharacter(a.chId,{"build.spellsKnown":t.build.spellsKnown.filter(s=>s!==e.dataset.forget)})),u.querySelectorAll("[data-conc]").forEach(e=>e.onclick=()=>a.be.updateCharacter(a.chId,{"state.concentration":t.state.concentration===e.dataset.conc?null:e.dataset.conc}))};function Q(){return'<section class="card stack"><h2>Mapa</h2><p class="muted">Quando o Mestre enviar um mapa, ele aparece aqui e você poderá marcar pontos. (Próxima etapa do projeto.)</p></section>'}
