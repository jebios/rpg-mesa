import{e as p,t as v,$ as u,u as A,g as H,r as F,l as L,s as j,a as I,b as B,v as R,p as V,d as _,f as k,C as M,A as G,c as K,h as U}from"./auth-C0DXKsp-.js";/* empty css             */const J=[["jogadores","🧑‍🤝‍🧑","Jogadores"],["combate","⚔️","Combate"],["npcs","🎭","NPCs"],["historia","📖","História"],["itens","🎒","Itens"],["musica","🎵","Música"]],P={};function z(e,a,n=600){clearTimeout(P[e]),P[e]=setTimeout(a,n)}const Y=()=>Math.floor(Math.random()*20)+1,C=e=>e.replace(":","_");function Q(e){const a=String(e||"").match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);return a?a[1]:null}function W(e){const a=String(e||"").match(/open\.spotify\.com\/(track|album|playlist|artist)\/([a-zA-Z0-9]+)/);return a?`https://open.spotify.com/embed/${a[1]}/${a[2]}`:null}const X=e=>/\.(mp3|ogg|wav|m4a|flac)(\?.*)?$/i.test(String(e||""));function Z(e){const a=Q(e);if(a)return{tipo:"youtube",videoId:a};const n=W(e);return n?{tipo:"spotify",embedUrl:n}:X(e)?{tipo:"audio"}:{tipo:"link"}}function aa(e){const{S:a}=e,n=a.combat||{ordem:[],turno:0,rodada:1},r=n.ordem||[],i=s=>{if(s.startsWith("pc:")){const b=a.chars.find(h=>h.id===s.slice(3));return b?{nome:b.name,tipo:"pc",ca:b.build.ac??10,pv:b.state.hp.current,pvMax:b.state.hp.max}:null}const l=a.npcs.find(b=>b.id===s.slice(4));return l?{nome:l.nome,tipo:"npc",ca:l.ca??"—",pv:l.pvAtual??0,pvMax:l.pvMax??0}:null},o=new Set(r.map(s=>s.ref)),c=[...a.chars.filter(s=>!o.has("pc:"+s.id)).map(s=>({ref:"pc:"+s.id,nome:s.name,tipo:"pc"})),...a.npcs.filter(s=>s.tipo==="combate"&&!o.has("npc:"+s.id)).map(s=>({ref:"npc:"+s.id,nome:s.nome,tipo:"npc"}))],m=[...r].map((s,l)=>({...s,i:l,r:i(s.ref)})).filter(s=>s.r).sort((s,l)=>l.iniciativa-s.iniciativa);return`<div class="stack">
    ${r.length?`<div class="card row" style="justify-content:space-between">
      <div class="row"><b style="font-size:1.1rem">Rodada ${n.rodada||1}</b>
        <button class="btn small" id="c-prev">◂ Turno</button><button class="btn small" id="c-next">Turno ▸</button></div>
      <button class="btn small danger" id="c-end">Encerrar combate</button>
    </div>`:""}
    <div class="card stack">
      <h2>Iniciativa</h2>
      ${m.length?m.map((s,l)=>`<div class="row" style="justify-content:space-between;border-bottom:1px solid var(--line);padding:.4rem 0" data-init-row="${s.ref}">
        <div class="row">${l===(n.turno||0)?'<span class="chip" style="border-color:var(--accent);color:var(--accent)">▶ agora</span>':""}
          <span>${s.r.tipo==="npc"?"🎭":"🧑"} <b>${p(s.r.nome)}</b></span></div>
        <div class="row">
          <label class="muted" style="margin:0" for="init-${C(s.ref)}">Inic.</label>
          <input id="init-${C(s.ref)}" style="width:4rem;min-height:36px;padding:.3rem" type="number" data-initval="${s.ref}" value="${s.iniciativa}" />
          <span class="muted">CA ${s.r.ca??"—"}</span>
          ${s.r.tipo==="npc"?`<input style="width:4.5rem;min-height:36px;padding:.3rem" type="number" min="0" data-npchp="${s.ref.slice(4)}" value="${s.r.pv}" /><span class="muted">/${s.r.pvMax}</span>`:`<span class="muted">${s.r.pv}/${s.r.pvMax} PV</span>`}
          <button class="btn small danger" data-rminit="${s.ref}" title="Remover">✕</button>
        </div></div>`).join(""):'<p class="empty-note">Nenhum combatente na iniciativa ainda.</p>'}
    </div>
    <div class="card stack">
      <h3>Adicionar à iniciativa</h3>
      ${c.length?c.map(s=>`<div class="row" style="justify-content:space-between">
        <span>${s.tipo==="npc"?"🎭":"🧑"} ${p(s.nome)}</span>
        <div class="row"><input style="width:4rem;min-height:36px;padding:.3rem" type="number" placeholder="d20" id="add-${C(s.ref)}" />
        <button class="btn small" data-roll="${s.ref}">🎲</button>
        <button class="btn small primary" data-addinit="${s.ref}">Adicionar</button></div></div>`).join(""):'<p class="empty-note">Todos os jogadores e NPCs de combate já estão na lista. Crie mais NPCs na aba NPCs.</p>'}
    </div>
  </div>`}function ea(e){const{S:a,app:n,render:r}=e,i=()=>a.combat||{ordem:[],turno:0,rodada:1},o=s=>e.saveCombat({...i(),...s});n.querySelectorAll("[data-roll]").forEach(s=>s.onclick=()=>{const l=document.getElementById("add-"+C(s.dataset.roll));l&&(l.value=Y())}),n.querySelectorAll("[data-addinit]").forEach(s=>s.onclick=()=>{const l=s.dataset.addinit,b=document.getElementById("add-"+C(l)),h=Number(b==null?void 0:b.value);if(!h&&h!==0)return v("Digite ou role a iniciativa.");const w=i();o({ordem:[...w.ordem||[],{ref:l,iniciativa:h}]})}),n.querySelectorAll("[data-rminit]").forEach(s=>s.onclick=()=>{const l=i();o({ordem:(l.ordem||[]).filter(b=>b.ref!==s.dataset.rminit)})}),n.querySelectorAll("[data-initval]").forEach(s=>s.onchange=()=>{const l=i();o({ordem:(l.ordem||[]).map(b=>b.ref===s.dataset.initval?{...b,iniciativa:Number(s.value)||0}:b)})}),n.querySelectorAll("[data-npchp]").forEach(s=>s.onchange=()=>{e.updateNpc(s.dataset.npchp,{pvAtual:Math.max(0,Number(s.value)||0)})});const c=i(),m=(c.ordem||[]).length;u("#c-prev")&&(u("#c-prev").onclick=()=>{let s=(c.turno||0)-1,l=c.rodada||1;s<0&&(s=m-1,l=Math.max(1,l-1)),o({turno:s,rodada:l})}),u("#c-next")&&(u("#c-next").onclick=()=>{let s=(c.turno||0)+1,l=c.rodada||1;s>=m&&(s=0,l+=1),o({turno:s,rodada:l})}),u("#c-end")&&(u("#c-end").onclick=()=>{confirm("Encerrar o combate e limpar a iniciativa?")&&o({ordem:[],turno:0,rodada:1})})}function ta(e){const{S:a}=e,n=i=>a.npcs.filter(o=>o.tipo===i),r=i=>`<details class="entry" data-k="npc-${i.id}" ${a.openNpc.has(i.id)?"open":""}>
    <summary><span class="t">${i.tipo==="combate"?"⚔️":"📖"} ${p(i.nome)}</span>
      <button class="btn small danger addbtn" data-delnpc="${i.id}" title="Excluir">🗑</button></summary>
    <div class="body stack">
      <div><label>Nome</label><input data-npc-f="nome" data-id="${i.id}" value="${p(i.nome)}" /></div>
      <div><label>Tipo</label><select data-npc-f="tipo" data-id="${i.id}">
        <option value="historia" ${i.tipo==="historia"?"selected":""}>História</option>
        <option value="combate" ${i.tipo==="combate"?"selected":""}>Combate</option></select></div>
      ${i.tipo==="combate"?`<div class="row">
        <div class="grow"><label>CA</label><input type="number" data-npc-f="ca" data-id="${i.id}" value="${i.ca??""}" /></div>
        <div class="grow"><label>PV máx.</label><input type="number" data-npc-f="pvMax" data-id="${i.id}" value="${i.pvMax??""}" /></div>
        <div class="grow"><label>PV atual</label><input type="number" data-npc-f="pvAtual" data-id="${i.id}" value="${i.pvAtual??""}" /></div>
        <div class="grow"><label>Bônus inic.</label><input type="number" data-npc-f="iniciativaBonus" data-id="${i.id}" value="${i.iniciativaBonus??""}" /></div>
      </div>`:""}
      <div><label>${i.tipo==="combate"?"Ações / notas de combate":"Descrição / anotações"}</label>
        <textarea rows="4" data-npc-f="descricao" data-id="${i.id}">${p(i.descricao||"")}</textarea></div>
    </div></details>`;return`<div class="stack">
    <form class="card stack" id="npcnew"><h2>Novo NPC</h2>
      <div class="row">
        <div class="grow"><label for="npc-nome">Nome</label><input id="npc-nome" required maxlength="60" placeholder="Kaelen, o Ferreiro" /></div>
        <div><label for="npc-tipo">Tipo</label><select id="npc-tipo"><option value="historia">História</option><option value="combate">Combate</option></select></div>
      </div>
      <button class="btn primary">Criar NPC</button></form>
    <div class="card stack"><h2>NPCs de história</h2>${n("historia").length?n("historia").map(r).join(""):'<p class="empty-note">Nenhum NPC de história ainda.</p>'}</div>
    <div class="card stack"><h2>NPCs de combate</h2>${n("combate").length?n("combate").map(r).join(""):'<p class="empty-note">Nenhum NPC de combate ainda.</p>'}</div>
  </div>`}function ia(e){const{S:a,app:n,render:r}=e;u("#npcnew").onsubmit=async i=>{i.preventDefault();const o=u("#npc-nome").value.trim();if(!o)return;const c=u("#npc-tipo").value;try{await e.createNpc({nome:o,tipo:c,ca:null,pvMax:null,pvAtual:null,iniciativaBonus:0,descricao:""}),v("NPC criado.")}catch(m){v(m.message)}},n.querySelectorAll('details.entry[data-k^="npc-"]').forEach(i=>i.ontoggle=()=>{const o=i.dataset.k.slice(4);i.open?a.openNpc.add(o):a.openNpc.delete(o)}),n.querySelectorAll("summary .addbtn").forEach(i=>i.addEventListener("click",o=>o.preventDefault())),n.querySelectorAll("[data-delnpc]").forEach(i=>i.onclick=()=>{confirm("Excluir este NPC?")&&e.deleteNpc(i.dataset.delnpc).catch(o=>v(o.message))}),n.querySelectorAll("[data-npc-f]").forEach(i=>{const o=()=>{const c=i.dataset.npcF,m=i.dataset.id;let s=i.value;["ca","pvMax","pvAtual","iniciativaBonus"].includes(c)&&(s=s===""?null:Number(s)),e.updateNpc(m,{[c]:s}).catch(l=>v(l.message))};i.tagName==="SELECT"?i.onchange=()=>{o(),r()}:i.tagName==="TEXTAREA"?i.oninput=()=>z("npc-"+i.dataset.id+"-"+i.dataset.npcF,o,700):i.onchange=o})}function sa(e){var n;const a=((n=e.S.story)==null?void 0:n.texto)||"";return`<div class="card stack">
    <h2>Anotações da campanha</h2>
    <p class="muted" style="margin:0">Escreva a história, resumos de sessão e lembretes. Só você vê esta aba.</p>
    <textarea id="story-txt" rows="18" placeholder="Sessão 1 — os aventureiros chegam a Vale Sombrio...">${p(a)}</textarea>
    <p class="muted" id="story-status" style="margin:0;font-size:.82rem">Salva automaticamente.</p>
  </div>`}function oa(e){const a=u("#story-txt");a.oninput=()=>{u("#story-status").textContent="Salvando…",z("story",()=>e.saveDmDoc("notas",{texto:a.value}).then(()=>{const n=u("#story-status");n&&(n.textContent="Salvo.")}),700)}}function na(e){var i;const{S:a}=e,n=((i=a.itemLib)==null?void 0:i.itens)||[],r=o=>`<details class="entry" data-k="item-${o.id}" ${a.openNpc.has("i"+o.id)?"open":""}>
    <summary><span class="t">🎁 ${p(o.nome)}</span><span class="muted lvl-badge">${p(o.peso||"")}</span>
      <button class="btn small danger addbtn" data-delitem="${o.id}" title="Excluir">🗑</button></summary>
    <div class="body stack">
      ${o.descricao?`<p style="margin:0;white-space:pre-wrap">${p(o.descricao)}</p>`:""}
      <div class="row">
        <div class="grow"><label for="give-p-${o.id}">Dar para</label>
          <select id="give-p-${o.id}">${a.chars.length?a.chars.map(c=>`<option value="${c.id}">${p(c.name)}</option>`).join(""):'<option value="">Nenhum jogador na mesa</option>'}</select></div>
        <div><label for="give-q-${o.id}">Qtd.</label><input id="give-q-${o.id}" type="number" min="1" value="1" style="width:4.5rem" /></div>
        <button class="btn small primary addbtn" data-give="${o.id}" style="align-self:end">Entregar</button>
      </div>
    </div></details>`;return`<div class="stack">
    <form class="card stack" id="itemnew"><h2>Criar item</h2>
      <div><label for="it-nome">Nome</label><input id="it-nome" required maxlength="60" placeholder="Amuleto da Maré Calma" /></div>
      <div class="row">
        <div class="grow"><label for="it-peso">Peso</label><input id="it-peso" placeholder="0,2 kg" /></div>
      </div>
      <div><label for="it-desc">Descrição</label><textarea id="it-desc" rows="3" placeholder="O que o item faz, raridade, propriedades..."></textarea></div>
      <button class="btn primary">Criar item</button></form>
    <div class="card stack"><h2>Itens do Mestre</h2>${n.length?n.map(r).join(""):'<p class="empty-note">Nenhum item criado ainda. Itens do compêndio (armas, armaduras...) os jogadores já podem adicionar sozinhos pela biblioteca do Grimório.</p>'}</div>
  </div>`}function ra(e){const{S:a,app:n,render:r}=e;u("#itemnew").onsubmit=async i=>{var s;i.preventDefault();const o=u("#it-nome").value.trim();if(!o)return;const c={id:A(),nome:o,peso:u("#it-peso").value.trim(),descricao:u("#it-desc").value.trim()},m=[...((s=a.itemLib)==null?void 0:s.itens)||[],c];try{await e.saveDmDoc("itens",{itens:m}),v("Item criado.")}catch(l){v(l.message)}},n.querySelectorAll("summary .addbtn").forEach(i=>i.addEventListener("click",o=>o.preventDefault())),n.querySelectorAll("[data-delitem]").forEach(i=>i.onclick=()=>{var c;const o=(((c=a.itemLib)==null?void 0:c.itens)||[]).filter(m=>m.id!==i.dataset.delitem);e.saveDmDoc("itens",{itens:o}).catch(m=>v(m.message))}),n.querySelectorAll("[data-give]").forEach(i=>i.onclick=async()=>{var w;const o=(((w=a.itemLib)==null?void 0:w.itens)||[]).find(d=>d.id===i.dataset.give),c=document.getElementById("give-p-"+o.id),m=document.getElementById("give-q-"+o.id),s=c==null?void 0:c.value;if(!s)return v("Escolha um jogador na mesa.");const l=Math.max(1,Number(m==null?void 0:m.value)||1),b=a.chars.find(d=>d.id===s),h={id:"mestre-"+A(),nome:o.nome,peso:o.peso||"0 kg",qtd:l,notas:o.descricao||"",equipado:!1,sintonizado:!1};try{await a.be.updateCharacter(s,{inventory:[...b.inventory||[],h]}),v(`${o.nome} entregue para ${b.name}.`)}catch(d){v(d.message)}})}const T=["Tensão","Batalha","Taverna","Livre"];function ca(e){var c;const{S:a}=e,n=((c=a.music)==null?void 0:c.faixas)||[],r=[...new Set(n.map(m=>m.categoria||"Livre"))],i=[...T.filter(m=>r.includes(m)),...r.filter(m=>!T.includes(m))],o=a.nowPlaying;return`<div class="stack">
    <div class="card stack">
      <h2>🎵 Tocando agora</h2>
      ${o?`<div class="row" style="justify-content:space-between">
        <div><b>${p(o.nome)}</b><div class="muted" style="font-size:.85rem">${p(o.categoria||"")} · o player fica fixo no canto da tela, em qualquer aba</div></div>
        <button class="btn small danger" id="m-stop">Parar</button>
      </div>`:'<p class="empty-note">Nada tocando. Escolha uma faixa na lista abaixo.</p>'}
    </div>
    <form class="card stack" id="musnew"><h2>Adicionar música</h2>
      <div><label for="mus-nome">Nome</label><input id="mus-nome" required maxlength="60" placeholder="Combate — orquestra épica" /></div>
      <div><label for="mus-cat">Categoria</label><input id="mus-cat" list="mus-cats" placeholder="Livre" />
        <datalist id="mus-cats"><option value="Tensão"><option value="Batalha"><option value="Taverna"><option value="Livre"></datalist></div>
      <div><label for="mus-url">Link (YouTube, Spotify ou áudio direto .mp3/.ogg)</label><input id="mus-url" required placeholder="https://www.youtube.com/watch?v=..." /></div>
      <button class="btn primary">Adicionar</button></form>
    ${i.length?i.map(m=>`<div class="card stack"><h2>${p(m)}</h2>
      ${n.filter(s=>(s.categoria||"Livre")===m).map(s=>`<div class="row" style="justify-content:space-between;border-bottom:1px solid var(--line);padding:.4rem 0">
        <span>${{youtube:"📺",spotify:"🟢",audio:"🎧",link:"🔗"}[s.tipo]||"🎵"} ${p(s.nome)}</span>
        <div class="row"><button class="btn small primary" data-play="${s.id}">▶</button><button class="btn small danger" data-delmus="${s.id}">🗑</button></div>
      </div>`).join("")}
    </div>`).join(""):'<div class="card"><p class="empty-note">Nenhuma música ainda. Cole um link do YouTube (ex.: "tavern ambience 1 hour"), do Spotify ou um .mp3 direto.</p></div>'}
  </div>`}function la(e){const{S:a,app:n,render:r}=e;u("#musnew").onsubmit=async i=>{var b;i.preventDefault();const o=u("#mus-nome").value.trim(),c=u("#mus-url").value.trim(),m=u("#mus-cat").value.trim()||"Livre";if(!o||!c)return;const s={id:A(),nome:o,categoria:m,url:c,...Z(c)};if(s.tipo==="link"&&!confirm("Não consegui reconhecer este link como YouTube, Spotify ou áudio direto. Adicionar mesmo assim? (vai abrir em outra aba ao tocar)"))return;const l=[...((b=a.music)==null?void 0:b.faixas)||[],s];try{await e.saveDmDoc("musicas",{faixas:l}),v("Música adicionada.")}catch(h){v(h.message)}},n.querySelectorAll("[data-play]").forEach(i=>i.onclick=()=>{var c;const o=(((c=a.music)==null?void 0:c.faixas)||[]).find(m=>m.id===i.dataset.play);if(o){if(o.tipo==="link"){window.open(o.url,"_blank","noopener");return}a.nowPlaying=o,r()}}),u("#m-stop")&&(u("#m-stop").onclick=()=>{a.nowPlaying=null,r()}),n.querySelectorAll("[data-delmus]").forEach(i=>i.onclick=()=>{var c,m;const o=(((c=a.music)==null?void 0:c.faixas)||[]).filter(s=>s.id!==i.dataset.delmus);((m=a.nowPlaying)==null?void 0:m.id)===i.dataset.delmus&&(a.nowPlaying=null),e.saveDmDoc("musicas",{faixas:o}).catch(s=>v(s.message))})}const f=u("#app"),t={be:null,comp:null,user:null,cid:null,camp:null,chars:[],npcs:[],story:null,combat:null,itemLib:null,music:null,nowPlaying:null,tab:"jogadores",open:new Set,openNpc:new Set,inputs:{},off:[]},q=()=>`rpgmesa:dm-last:${t.user.uid}`,D=()=>{t.off.forEach(e=>e()),t.off=[]};da().catch(e=>{f.innerHTML=`<div class="shell"><div class="card">Erro ao iniciar: ${p(e.message)}</div></div>`});async function da(){t.be=await H(),F(t.be,f,{title:"Escudo do Mestre",subtitle:"Entre com sua conta de Mestre para gerenciar suas campanhas.",onSignedOut:()=>{D(),t.camp=null,t.cid=null,t.chars=[],t.nowPlaying=null,x()}},async e=>{t.user=e,f.innerHTML='<p class="muted" style="padding:1rem">Carregando compêndio…</p>',t.comp=await L(t.be);const a=j.get(q());a?E(a):S()})}const O=()=>t.be.mode==="local"?'<p class="banner">Modo demo: dados salvos neste navegador. Abra o Grimório em outra aba (com outra conta) para ver a sincronização.</p>':"";function S(){D(),t.camp=null,t.cid=null,t.nowPlaying=null,x(),j.set(q(),null),t.off.push(t.be.watchMyCampaigns(e=>{var n;const a=((n=u("#cname"))==null?void 0:n.value)||"";e.sort((r,i)=>r.name.localeCompare(i.name)),f.innerHTML=`<div class="shell stack" style="max-width:640px">
      <div class="topbar" style="margin:0"><h1 style="margin:0">Escudo do Mestre</h1>${I(t.user)}</div>${O()}
      ${e.length?`<div class="card stack"><h2>Suas campanhas</h2>${e.map(r=>`<button class="btn" style="width:100%;justify-content:space-between" data-open="${r.id}"><span>${p(r.name)}</span><span class="muted">${p(r.joinCode)}</span></button>`).join("")}</div>`:""}
      <section class="card stack"><h2>Compêndio de regras</h2>
        <p style="margin:0">${t.comp.completo?`Carregado: <b>${t.comp.spells.length}</b> magias, <b>${t.comp.feats.length}</b> talentos, <b>${t.comp.classes.length}</b> classes, <b>${t.comp.species.length}</b> espécies, <b>${t.comp.backgrounds.length}</b> antecedentes, <b>${t.comp.items.length}</b> itens.`:"Ainda não importado — os jogadores veem só uma amostra."}</p>
        <label class="btn" style="width:100%">📂 Importar compendio.json<input id="compfile" type="file" accept=".json,application/json" hidden></label>
        <p class="muted" style="margin:0;font-size:.85rem">O compêndio fica no Firebase, visível só para quem faz login. Não vai para o GitHub.</p>
      </section>
      <form class="card stack" id="f"><h2>Nova campanha</h2>
        <div><label for="cname">Nome da campanha</label><input id="cname" required maxlength="60" placeholder="A Mina Perdida de Phandelver" value="${p(a)}" /></div>
        <button class="btn primary">Criar sala</button></form></div>`,B(t.be,f),f.querySelectorAll("[data-open]").forEach(r=>r.onclick=()=>E(r.dataset.open)),u("#compfile").onchange=async r=>{const i=r.target.files[0];if(i)try{const o=JSON.parse(await i.text()),c=R(o);v("Importando compêndio…"),await t.be.saveCompendium(o),t.comp=await L(t.be,{force:!0}),v(`Compêndio importado: ${c.magias} magias, ${c.talentos} talentos, ${c.classes} classes.`),S()}catch(o){v(/permission|insufficient/i.test(o.message)?"Sem permissão: só a conta de administrador pode importar o compêndio.":"Erro: "+o.message)}},u("#f").onsubmit=async r=>{r.preventDefault();try{const{id:i}=await t.be.createCampaign(u("#cname").value.trim());E(i)}catch(i){v(i.message)}}}))}function E(e){D(),t.cid=e,t.camp=null,t.chars=[],t.npcs=[],t.story=null,t.combat=null,t.itemLib=null,t.music=null,t.nowPlaying=null,t.tab="jogadores",j.set(q(),e),t.off.push(t.be.watchCampaign(e,a=>{if(!a||a.dmUid!==t.user.uid)return S();t.camp=a,$()})),t.off.push(t.be.watchPartyCharacters(e,a=>{const n=Object.fromEntries(t.chars.map(r=>[r.id,r.state.hp.current+r.state.hp.temp]));t.chars=a.sort((r,i)=>r.name.localeCompare(i.name)),$(),a.forEach(r=>{var c;const i=n[r.id],o=r.state.hp.current+r.state.hp.temp;i!=null&&i!==o&&((c=document.querySelector(`[data-pc="${r.id}"]`))==null||c.classList.add(o<i?"flash-dmg":"flash-heal"))})})),t.off.push(t.be.watchNpcs(e,a=>{t.npcs=a.sort((n,r)=>n.nome.localeCompare(r.nome)),$()})),t.off.push(t.be.watchDmDoc(e,"notas",a=>{t.story=a||{texto:""},$()})),t.off.push(t.be.watchDmDoc(e,"itens",a=>{t.itemLib=a||{itens:[]},$()})),t.off.push(t.be.watchCombat(e,a=>{t.combat=a||{ordem:[],turno:0,rodada:1},$()})),t.off.push(t.be.watchDmDoc(e,"musicas",a=>{t.music=a||{faixas:[]},$()}))}const g={get S(){return t},app:f,render:()=>$(),toast:v,createNpc:e=>t.be.createNpc(t.cid,e),updateNpc:(e,a)=>t.be.updateNpc(t.cid,e,a),deleteNpc:e=>t.be.deleteNpc(t.cid,e),saveDmDoc:(e,a)=>t.be.saveDmDoc(t.cid,e,a),saveCombat:e=>t.be.saveCombat(t.cid,e)};let N=null;function ma(){let e=document.getElementById("music-bar");return e||(e=document.createElement("div"),e.id="music-bar",document.body.appendChild(e)),e}function x(){const e=ma(),a=t.nowPlaying;if(!a){e.classList.remove("show"),e.innerHTML="",N=null;return}if(N===a.id)return;N=a.id,e.classList.add("show");let n="";a.tipo==="youtube"?n=`<iframe src="https://www.youtube.com/embed/${a.videoId}?autoplay=1&controls=1" allow="autoplay" style="width:200px;height:60px;border:0;border-radius:8px" title="Player"></iframe>`:a.tipo==="spotify"?n=`<iframe src="${p(a.embedUrl)}?utm_source=generator" width="260" height="80" style="border:0;border-radius:8px" allow="autoplay; encrypted-media" title="Player"></iframe>`:a.tipo==="audio"&&(n=`<audio src="${p(a.url)}" autoplay loop controls style="width:220px"></audio>`),e.innerHTML=`<div class="row" style="align-items:center;gap:.6rem;flex-wrap:nowrap">
    <div style="min-width:0"><b style="display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:140px">${p(a.nome)}</b><span class="muted" style="font-size:.78rem">${p(a.categoria||"")}</span></div>
    ${n}<button class="btn small danger" id="mb-stop">✕</button></div>`,u("#mb-stop",e).onclick=()=>{t.nowPlaying=null,$()}}function $(){if(!t.camp){x();return}const e=Object.values(t.camp.members||{}).filter(a=>a==="player").length;V(()=>{f.innerHTML=`<div class="shell">
      <div class="topbar">
        <div><h1 style="margin:0">${p(t.camp.name)}</h1><span class="muted">${e} jogador(es) na sala · ${t.chars.length} ficha(s)</span></div>
        <div class="row"><span class="muted">Código da sala</span><span class="code" id="code">${p(t.camp.joinCode)}</span>
          <button class="btn small" id="copy">Copiar</button><button class="btn small" id="back">Campanhas</button>${I(t.user)}</div>
      </div>
      ${O()}
      <nav class="filters" role="tablist" style="margin-bottom:.75rem">${J.map(([a,n,r])=>`<button role="tab" aria-pressed="${t.tab===a}" data-tab="${a}">${n} ${r}</button>`).join("")}</nav>
      ${pa()}
    </div>`,u("#copy").onclick=()=>{var a;return(a=navigator.clipboard)==null?void 0:a.writeText(t.camp.joinCode).then(()=>v("Código copiado."))},u("#back").onclick=S,B(t.be,f),f.querySelectorAll("[data-tab]").forEach(a=>a.onclick=()=>{t.tab=a.dataset.tab,$()}),ua()}),x()}function pa(){return t.tab==="combate"?aa(g):t.tab==="npcs"?ta(g):t.tab==="historia"?sa(g):t.tab==="itens"?na(g):t.tab==="musica"?ca(g):t.chars.length?`<div class="party">${t.chars.map(ba).join("")}</div>`:`<div class="card empty"><h2>Esperando os aventureiros…</h2><p class="muted">Peça para cada jogador entrar no Grimório com a própria conta, abrir o personagem e, na aba <b>Ficha → Mesa</b>, digitar o código <b>${p(t.camp.joinCode)}</b>.</p></div>`}function ua(){if(t.tab==="combate")return ea(g);if(t.tab==="npcs")return ia(g);if(t.tab==="historia")return oa(g);if(t.tab==="itens")return ra(g);if(t.tab==="musica")return la(g);va()}function ba(e){var h,w;const a=_(e,t.comp),{hp:n,conditions:r=[],dead:i,deathSaves:o={}}=e.state,c=n.max+n.temp,m=n.current/n.max,s=m>.5?"":m>.25?"mid":"low",l=Object.entries(e.state.spellSlots||{}),b=`${((h=a.sp)==null?void 0:h.nome)??""} · ${((w=a.cls)==null?void 0:w.nome)??""} ${a.level}${a.sub?" ("+a.sub.nome+")":""}`;return`<article class="card pc stack ${i?"dead":n.current===0?"down":""}" data-pc="${e.id}">
    <div><h3>${p(e.name)}</h3><div class="meta">${p(b)} · jogador: ${p(e.ownerName||"—")}</div></div>
    <div class="hpline"><span><b>${n.current}</b> / ${n.max} PV ${n.temp?`<span style="color:var(--temp)">+${n.temp}</span>`:""}</span>
      ${i?'<span class="chip bad">MORTO</span>':n.current===0?`<span class="chip bad">Caído · ✓${o.success||0} ✗${o.fail||0}</span>`:""}</div>
    <div class="hpbar"><div class="cur ${s}" style="width:${n.current/c*100}%"></div><div class="tmp" style="width:${n.temp/c*100}%"></div></div>
    <div class="ctl">
      <input type="number" inputmode="numeric" min="0" placeholder="0" aria-label="Valor para ${p(e.name)}" data-amt="${e.id}" value="${p(t.inputs[e.id]||"")}" />
      <button class="btn danger" data-hp="dano" data-id="${e.id}" title="Dano">−</button>
      <button class="btn heal" data-hp="cura" data-id="${e.id}" title="Cura">+</button>
      <button class="btn temp" data-hp="temp" data-id="${e.id}" title="PV temporário">T</button>
    </div>
    <div class="kv"><div><b>${e.build.ac??10}</b>CA</div><div><b>${k(a.initiative)}</b>Inic.</div><div><b>${a.passivePerception}</b>Perc. pass.</div><div><b>${a.spellDC??"—"}</b>CD magia</div></div>
    ${r.length?`<div class="row">${r.map(d=>`<button class="chip bad" data-rmcond="${d}" data-id="${e.id}" title="Remover">${M[d]||d} ✕</button>`).join("")}</div>`:""}
    ${l.length?`<div class="slotrow">${l.map(([d,y])=>`<button data-slot="${d}" data-id="${e.id}" title="Clique: gastar · Shift+clique: recuperar">${d}º ${y.max-y.used}/${y.max}</button>`).join("")}</div>`:""}
    <details class="more" data-more="${e.id}" ${t.open.has(e.id)?"open":""}><summary>Ficha completa</summary>
      <div class="stack" style="margin-top:.5rem">
        <div class="abil">${G.map(([d,y])=>`<div><small>${y.slice(0,3)}</small><b>${k(a.mods[d])}</b><small>${e.build.abilities[d]} · TR ${k(a.saves[d])}</small></div>`).join("")}</div>
        <div class="skl">${a.skills.map(d=>`<div>${d.prof?"●":"○"} ${d.nome} ${k(d.bonus)}</div>`).join("")}</div>
        <select data-addcond="${e.id}" aria-label="Aplicar condição"><option value="">Aplicar condição…</option>
          ${K.filter(d=>!r.includes(d)).map(d=>`<option value="${d}">${M[d]||d}</option>`).join("")}</select>
        ${(e.build.feats||[]).length?`<div><small class="muted">Talentos</small><div style="font-size:.88rem">${e.build.feats.map(d=>{var y;return p(((y=t.comp.byId.feats[d.id])==null?void 0:y.nome)||d.id)}).join(", ")}</div></div>`:""}
        ${(e.inventory||[]).length?`<div><small class="muted">Inventário</small><div style="font-size:.88rem">${e.inventory.map(d=>`${d.equipado?"🛡️":""}${p(d.nome)}${d.qtd>1?" ×"+d.qtd:""}`).join(", ")}</div></div>`:""}
        <div><small class="muted">Moedas</small><div style="font-size:.88rem">${["pl","po","pe","pp","pc"].map(d=>{var y;return`${Number((y=e.coins)==null?void 0:y[d])||0} ${d.toUpperCase()}`}).join(" · ")}</div></div>
        ${e.notes?`<div><small class="muted">Anotações do jogador</small><div style="white-space:pre-wrap;font-size:.9rem">${p(e.notes)}</div></div>`:""}
        <ul class="log">${(e.state.log||[]).map(d=>`<li>${p(d)}</li>`).join("")}</ul>
      </div></details>
  </article>`}function va(){const e=a=>t.chars.find(n=>n.id===a);f.querySelectorAll("[data-amt]").forEach(a=>{a.oninput=()=>t.inputs[a.dataset.amt]=a.value,a.onkeydown=n=>{n.key==="Enter"&&f.querySelector(`[data-hp="${n.shiftKey?"cura":"dano"}"][data-id="${a.dataset.amt}"]`).click()}}),f.querySelectorAll("[data-hp]").forEach(a=>a.onclick=async()=>{const n=a.dataset.id,r=Number(t.inputs[n]);if(!r)return v("Digite um valor.");t.inputs[n]="";const i=await U(t.be,n,a.dataset.hp,r,{},"Mestre"),o=e(n);v(`${o==null?void 0:o.name}: ${i.log.at(-1)??""}${i.concentrationDC&&(o!=null&&o.state.concentration)?` · Concentração CD ${i.concentrationDC}`:""}`)}),f.querySelectorAll("[data-slot]").forEach(a=>a.onclick=n=>{const r=e(a.dataset.id),i=a.dataset.slot,o=r.state.spellSlots[i],c=n.shiftKey?Math.max(0,o.used-1):Math.min(o.max,o.used+1);t.be.updateCharacter(r.id,{[`state.spellSlots.${i}.used`]:c})}),f.querySelectorAll("[data-rmcond]").forEach(a=>a.onclick=()=>{const n=e(a.dataset.id);t.be.updateCharacter(n.id,{"state.conditions":n.state.conditions.filter(r=>r!==a.dataset.rmcond)})}),f.querySelectorAll("[data-addcond]").forEach(a=>a.onchange=()=>{const n=e(a.dataset.addcond);a.value&&t.be.updateCharacter(n.id,{"state.conditions":[...n.state.conditions||[],a.value]})}),f.querySelectorAll("[data-more]").forEach(a=>a.ontoggle=()=>a.open?t.open.add(a.dataset.more):t.open.delete(a.dataset.more))}
