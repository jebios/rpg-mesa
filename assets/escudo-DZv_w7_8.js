import"./pwa-DNJwNots.js";import{e as u,t as v,$ as b,u as k,g as F,r as U,l as z,s as q,a as O,b as H,v as V,p as G,d as _,c as K,f as S,C as L,A as Q,h as J,i as Y}from"./auth-BilmUCeb.js";let C;async function W(){if(C)return C;try{const e=new URL("data/",document.baseURI);C=(await(await fetch(new URL("itens-comuns.json",e))).json()).itens||[]}catch{C=[]}return C}const X=[["jogadores","🧑‍🤝‍🧑","Jogadores"],["combate","⚔️","Combate"],["npcs","🎭","NPCs"],["historia","📖","História"],["itens","🎒","Itens"],["musica","🎵","Música"]],T={};function D(e,a,i=600){clearTimeout(T[e]),T[e]=setTimeout(a,i)}const Z=()=>Math.floor(Math.random()*20)+1,x=e=>e.replace(":","_"),I=e=>String(e||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();function aa(e){const a=String(e||"").match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);return a?a[1]:null}function ea(e){const a=String(e||"").match(/open\.spotify\.com\/(track|album|playlist|artist)\/([a-zA-Z0-9]+)/);return a?`https://open.spotify.com/embed/${a[1]}/${a[2]}`:null}const ta=e=>/\.(mp3|ogg|wav|m4a|flac)(\?.*)?$/i.test(String(e||""));function sa(e){const a=aa(e);if(a)return{tipo:"youtube",videoId:a};const i=ea(e);return i?{tipo:"spotify",embedUrl:i}:ta(e)?{tipo:"audio"}:{tipo:"link"}}function oa(e){const{S:a}=e,i=a.combat||{ordem:[],turno:0,rodada:1},r=i.ordem||[],s=o=>{if(o.startsWith("pc:")){const c=a.chars.find(l=>l.id===o.slice(3));return c?{nome:c.name,tipo:"pc",ca:c.build.ac??10,pv:c.state.hp.current,pvMax:c.state.hp.max}:null}const m=a.npcs.find(c=>c.id===o.slice(4));return m?{nome:m.nome,tipo:"npc",ca:m.ca??"—",pv:m.pvAtual??0,pvMax:m.pvMax??0}:null},n=new Set(r.map(o=>o.ref)),d=[...a.chars.filter(o=>!n.has("pc:"+o.id)).map(o=>({ref:"pc:"+o.id,nome:o.name,tipo:"pc"})),...a.npcs.filter(o=>o.tipo==="combate"&&!n.has("npc:"+o.id)).map(o=>({ref:"npc:"+o.id,nome:o.nome,tipo:"npc"}))],p=[...r].map((o,m)=>({...o,i:m,r:s(o.ref)})).filter(o=>o.r).sort((o,m)=>m.iniciativa-o.iniciativa);return`<div class="stack">
    ${r.length?`<div class="card row" style="justify-content:space-between">
      <div class="row"><b style="font-size:1.1rem">Rodada ${i.rodada||1}</b>
        <button class="btn small" id="c-prev">◂ Turno</button><button class="btn small" id="c-next">Turno ▸</button></div>
      <button class="btn small danger" id="c-end">Encerrar combate</button>
    </div>`:""}
    <div class="card stack">
      <h2>Iniciativa</h2>
      ${p.length?p.map((o,m)=>`<div class="row" style="justify-content:space-between;border-bottom:1px solid var(--line);padding:.4rem 0" data-init-row="${o.ref}">
        <div class="row">${m===(i.turno||0)?'<span class="chip" style="border-color:var(--accent);color:var(--accent)">▶ agora</span>':""}
          <span>${o.r.tipo==="npc"?"🎭":"🧑"} <b>${u(o.r.nome)}</b></span></div>
        <div class="row">
          <label class="muted" style="margin:0" for="init-${x(o.ref)}">Inic.</label>
          <input id="init-${x(o.ref)}" style="width:4rem;min-height:36px;padding:.3rem" type="number" data-initval="${o.ref}" value="${o.iniciativa}" />
          <span class="muted">CA ${o.r.ca??"—"}</span>
          ${o.r.tipo==="npc"?`<input style="width:4.5rem;min-height:36px;padding:.3rem" type="number" min="0" data-npchp="${o.ref.slice(4)}" value="${o.r.pv}" /><span class="muted">/${o.r.pvMax}</span>`:`<span class="muted">${o.r.pv}/${o.r.pvMax} PV</span>`}
          <button class="btn small danger" data-rminit="${o.ref}" title="Remover">✕</button>
        </div></div>`).join(""):'<p class="empty-note">Nenhum combatente na iniciativa ainda.</p>'}
    </div>
    <div class="card stack">
      <h3>Adicionar à iniciativa</h3>
      ${d.length?d.map(o=>`<div class="row" style="justify-content:space-between">
        <span>${o.tipo==="npc"?"🎭":"🧑"} ${u(o.nome)}</span>
        <div class="row"><input style="width:4rem;min-height:36px;padding:.3rem" type="number" placeholder="d20" id="add-${x(o.ref)}" />
        <button class="btn small" data-roll="${o.ref}">🎲</button>
        <button class="btn small primary" data-addinit="${o.ref}">Adicionar</button></div></div>`).join(""):'<p class="empty-note">Todos os jogadores e NPCs de combate já estão na lista. Crie mais NPCs na aba NPCs.</p>'}
    </div>
  </div>`}function ia(e){const{S:a,app:i,render:r}=e,s=()=>a.combat||{ordem:[],turno:0,rodada:1},n=o=>e.saveCombat({...s(),...o});i.querySelectorAll("[data-roll]").forEach(o=>o.onclick=()=>{const m=document.getElementById("add-"+x(o.dataset.roll));m&&(m.value=Z())}),i.querySelectorAll("[data-addinit]").forEach(o=>o.onclick=()=>{const m=o.dataset.addinit,c=document.getElementById("add-"+x(m)),l=Number(c==null?void 0:c.value);if(!l&&l!==0)return v("Digite ou role a iniciativa.");const h=s();n({ordem:[...h.ordem||[],{ref:m,iniciativa:l}]})}),i.querySelectorAll("[data-rminit]").forEach(o=>o.onclick=()=>{const m=s();n({ordem:(m.ordem||[]).filter(c=>c.ref!==o.dataset.rminit)})}),i.querySelectorAll("[data-initval]").forEach(o=>o.onchange=()=>{const m=s();n({ordem:(m.ordem||[]).map(c=>c.ref===o.dataset.initval?{...c,iniciativa:Number(o.value)||0}:c)})}),i.querySelectorAll("[data-npchp]").forEach(o=>o.onchange=()=>{e.updateNpc(o.dataset.npchp,{pvAtual:Math.max(0,Number(o.value)||0)})});const d=s(),p=(d.ordem||[]).length;b("#c-prev")&&(b("#c-prev").onclick=()=>{let o=(d.turno||0)-1,m=d.rodada||1;o<0&&(o=p-1,m=Math.max(1,m-1)),n({turno:o,rodada:m})}),b("#c-next")&&(b("#c-next").onclick=()=>{let o=(d.turno||0)+1,m=d.rodada||1;o>=p&&(o=0,m+=1),n({turno:o,rodada:m})}),b("#c-end")&&(b("#c-end").onclick=()=>{confirm("Encerrar o combate e limpar a iniciativa?")&&n({ordem:[],turno:0,rodada:1})})}function na(e){const{S:a}=e,i=s=>a.npcs.filter(n=>n.tipo===s),r=s=>`<details class="entry" data-k="npc-${s.id}" ${a.openNpc.has(s.id)?"open":""}>
    <summary><span class="t">${s.tipo==="combate"?"⚔️":"📖"} ${u(s.nome)}</span>
      <button class="btn small danger addbtn" data-delnpc="${s.id}" title="Excluir">🗑</button></summary>
    <div class="body stack">
      <div><label>Nome</label><input data-npc-f="nome" data-id="${s.id}" value="${u(s.nome)}" /></div>
      <div><label>Tipo</label><select data-npc-f="tipo" data-id="${s.id}">
        <option value="historia" ${s.tipo==="historia"?"selected":""}>História</option>
        <option value="combate" ${s.tipo==="combate"?"selected":""}>Combate</option></select></div>
      ${s.tipo==="combate"?`<div class="row">
        <div class="grow"><label>CA</label><input type="number" data-npc-f="ca" data-id="${s.id}" value="${s.ca??""}" /></div>
        <div class="grow"><label>PV máx.</label><input type="number" data-npc-f="pvMax" data-id="${s.id}" value="${s.pvMax??""}" /></div>
        <div class="grow"><label>PV atual</label><input type="number" data-npc-f="pvAtual" data-id="${s.id}" value="${s.pvAtual??""}" /></div>
        <div class="grow"><label>Bônus inic.</label><input type="number" data-npc-f="iniciativaBonus" data-id="${s.id}" value="${s.iniciativaBonus??""}" /></div>
      </div>`:""}
      <div><label>${s.tipo==="combate"?"Ações / notas de combate":"Descrição / anotações"}</label>
        <textarea rows="4" data-npc-f="descricao" data-id="${s.id}">${u(s.descricao||"")}</textarea></div>
    </div></details>`;return`<div class="stack">
    <form class="card stack" id="npcnew"><h2>Novo NPC</h2>
      <div class="row">
        <div class="grow"><label for="npc-nome">Nome</label><input id="npc-nome" required maxlength="60" placeholder="Kaelen, o Ferreiro" /></div>
        <div><label for="npc-tipo">Tipo</label><select id="npc-tipo"><option value="historia">História</option><option value="combate">Combate</option></select></div>
      </div>
      <button class="btn primary">Criar NPC</button></form>
    <div class="card stack"><h2>NPCs de história</h2>${i("historia").length?i("historia").map(r).join(""):'<p class="empty-note">Nenhum NPC de história ainda.</p>'}</div>
    <div class="card stack"><h2>NPCs de combate</h2>${i("combate").length?i("combate").map(r).join(""):'<p class="empty-note">Nenhum NPC de combate ainda.</p>'}</div>
  </div>`}function ra(e){const{S:a,app:i,render:r}=e;b("#npcnew").onsubmit=async s=>{s.preventDefault();const n=b("#npc-nome").value.trim();if(!n)return;const d=b("#npc-tipo").value;try{await e.createNpc({nome:n,tipo:d,ca:null,pvMax:null,pvAtual:null,iniciativaBonus:0,descricao:""}),v("NPC criado.")}catch(p){v(p.message)}},i.querySelectorAll('details.entry[data-k^="npc-"]').forEach(s=>s.ontoggle=()=>{const n=s.dataset.k.slice(4);s.open?a.openNpc.add(n):a.openNpc.delete(n)}),i.querySelectorAll("summary .addbtn").forEach(s=>s.addEventListener("click",n=>n.preventDefault())),i.querySelectorAll("[data-delnpc]").forEach(s=>s.onclick=()=>{confirm("Excluir este NPC?")&&e.deleteNpc(s.dataset.delnpc).catch(n=>v(n.message))}),i.querySelectorAll("[data-npc-f]").forEach(s=>{const n=()=>{const d=s.dataset.npcF,p=s.dataset.id;let o=s.value;["ca","pvMax","pvAtual","iniciativaBonus"].includes(d)&&(o=o===""?null:Number(o)),e.updateNpc(p,{[d]:o}).catch(m=>v(m.message))};s.tagName==="SELECT"?s.onchange=()=>{n(),r()}:s.tagName==="TEXTAREA"?s.oninput=()=>D("npc-"+s.dataset.id+"-"+s.dataset.npcF,n,700):s.onchange=n})}function ca(e){var i;const a=((i=e.S.story)==null?void 0:i.texto)||"";return`<div class="card stack">
    <h2>Anotações da campanha</h2>
    <p class="muted" style="margin:0">Escreva a história, resumos de sessão e lembretes. Só você vê esta aba.</p>
    <textarea id="story-txt" rows="18" placeholder="Sessão 1 — os aventureiros chegam a Vale Sombrio...">${u(a)}</textarea>
    <p class="muted" id="story-status" style="margin:0;font-size:.82rem">Salva automaticamente.</p>
  </div>`}function la(e){const a=b("#story-txt");a.oninput=()=>{b("#story-status").textContent="Salvando…",D("story",()=>e.saveDmDoc("notas",{texto:a.value}).then(()=>{const i=b("#story-status");i&&(i.textContent="Salvo.")}),700)}}const g=e=>String(e||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,""),da=["Armas","Armaduras","Recipientes","Luz e Fogo","Comida e Bebida","Ferramentas de Ofício","Kits e Instrumentos","Pacotes de Aventureiro"];function ma(e){var m;const{S:a}=e,i=((m=a.itemLib)==null?void 0:m.itens)||[],r=c=>`<details class="entry" data-k="item-${c.id}" ${a.openNpc.has("i"+c.id)?"open":""}>
    <summary><span class="t">🎁 ${u(c.nome)}</span><span class="muted lvl-badge">${u(c.peso||"")}</span>
      <button class="btn small danger addbtn" data-delitem="${c.id}" title="Excluir">🗑</button></summary>
    <div class="body stack">
      ${c.descricao?`<p style="margin:0;white-space:pre-wrap">${u(c.descricao)}</p>`:""}
      <div class="row">
        <div class="grow"><label for="give-p-${c.id}">Dar para</label>
          <select id="give-p-${c.id}">${a.chars.length?a.chars.map(l=>`<option value="${l.id}">${u(l.name)}</option>`).join(""):'<option value="">Nenhum jogador na mesa</option>'}</select></div>
        <div><label for="give-q-${c.id}">Qtd.</label><input id="give-q-${c.id}" type="number" min="1" value="1" style="width:4.5rem" /></div>
        <button class="btn small primary addbtn" data-give="${c.id}" style="align-self:end">Entregar</button>
      </div>
    </div></details>`,s=I(a.comunsQ||""),n=a.comunsCat||"all",d=(a.itensComuns||[]).filter(c=>(n==="all"||c.categoria===n)&&(!s||I(c.nome).includes(s))),p=new Set(i.map(c=>g(c.nome))),o=c=>{const l=p.has(g(c.nome));return`<div class="libitem">
      <div class="info"><span>${u(c.nome)}</span>
        <small>${[c.categoria,c.peso,c.preco].filter(Boolean).join(" · ")}${c.descricao?" — "+u(c.descricao):""}</small></div>
      <button class="btn small ${l?"":"primary"}" data-addcommon="${g(c.nome)}" ${l?'disabled title="Já está na sua lista"':""}>${l?"✓":"+"}</button>
    </div>`};return`<div class="stack">
    <form class="card stack" id="itemnew"><h2>Criar item</h2>
      <div><label for="it-nome">Nome</label><input id="it-nome" required maxlength="60" placeholder="Amuleto da Maré Calma" /></div>
      <div class="row">
        <div class="grow"><label for="it-peso">Peso</label><input id="it-peso" placeholder="0,2 kg" /></div>
      </div>
      <div><label for="it-desc">Descrição</label><textarea id="it-desc" rows="3" placeholder="O que o item faz, raridade, propriedades..."></textarea></div>
      <button class="btn primary">Criar item</button></form>
    <div class="card stack"><h2>Itens do Mestre</h2>${i.length?i.map(r).join(""):'<p class="empty-note">Nenhum item criado ainda. Itens do compêndio (armas, armaduras...) os jogadores já podem adicionar sozinhos pela biblioteca do Grimório.</p>'}</div>
    <div class="card stack">
      <div class="sectiontitle"><h2 style="margin:0">📋 Itens comuns</h2><span class="muted lvl-badge">Escudo do Mestre — clique + para adicionar à sua lista</span></div>
      <input id="comuns-q" placeholder="Buscar (mochila, tocha, pacote...)" value="${u(a.comunsQ||"")}" />
      <div class="filters">
        <button aria-pressed="${n==="all"}" data-comuns-cat="all">Todas</button>
        ${da.map(c=>`<button aria-pressed="${n===c}" data-comuns-cat="${u(c)}">${u(c)}</button>`).join("")}
      </div>
      ${d.length?d.map(o).join(""):'<p class="empty-note">Nenhum item comum encontrado com esse filtro.</p>'}
    </div>
  </div>`}function pa(e){const{S:a,app:i,render:r}=e;b("#itemnew").onsubmit=async s=>{var o;s.preventDefault();const n=b("#it-nome").value.trim();if(!n)return;const d={id:k(),nome:n,peso:b("#it-peso").value.trim(),descricao:b("#it-desc").value.trim()},p=[...((o=a.itemLib)==null?void 0:o.itens)||[],d];try{await e.saveDmDoc("itens",{itens:p}),v("Item criado.")}catch(m){v(m.message)}},b("#comuns-q").oninput=()=>{a.comunsQ=b("#comuns-q").value,D("comuns-q",r,300)},i.querySelectorAll("[data-comuns-cat]").forEach(s=>s.onclick=()=>{a.comunsCat=s.dataset.comunsCat,r()}),i.querySelectorAll("[data-addcommon]").forEach(s=>s.onclick=async()=>{var m,c;const n=(a.itensComuns||[]).find(l=>g(l.nome)===s.dataset.addcommon);if(!n||(((m=a.itemLib)==null?void 0:m.itens)||[]).some(l=>g(l.nome)===g(n.nome)))return;const d=[n.preco?`Preço de referência: ${n.preco}.`:"",n.descricao||""].filter(Boolean).join(" "),p={id:k(),nome:n.nome,peso:n.peso||"",descricao:d},o=[...((c=a.itemLib)==null?void 0:c.itens)||[],p];try{await e.saveDmDoc("itens",{itens:o}),v(`"${n.nome}" adicionado à sua lista.`)}catch(l){v(l.message)}}),i.querySelectorAll("summary .addbtn").forEach(s=>s.addEventListener("click",n=>n.preventDefault())),i.querySelectorAll("[data-delitem]").forEach(s=>s.onclick=()=>{var d;const n=(((d=a.itemLib)==null?void 0:d.itens)||[]).filter(p=>p.id!==s.dataset.delitem);e.saveDmDoc("itens",{itens:n}).catch(p=>v(p.message))}),i.querySelectorAll("[data-give]").forEach(s=>s.onclick=async()=>{var h;const n=(((h=a.itemLib)==null?void 0:h.itens)||[]).find(w=>w.id===s.dataset.give),d=document.getElementById("give-p-"+n.id),p=document.getElementById("give-q-"+n.id),o=d==null?void 0:d.value;if(!o)return v("Escolha um jogador na mesa.");const m=Math.max(1,Number(p==null?void 0:p.value)||1),c=a.chars.find(w=>w.id===o),l={id:"mestre-"+k(),nome:n.nome,peso:n.peso||"0 kg",qtd:m,notas:n.descricao||"",equipado:!1,sintonizado:!1};try{await a.be.updateCharacter(o,{inventory:[...c.inventory||[],l]}),v(`${n.nome} entregue para ${c.name}.`)}catch(w){v(w.message)}})}const B=["Tensão","Batalha","Taverna","Livre"];function ua(e){var d;const{S:a}=e,i=((d=a.music)==null?void 0:d.faixas)||[],r=[...new Set(i.map(p=>p.categoria||"Livre"))],s=[...B.filter(p=>r.includes(p)),...r.filter(p=>!B.includes(p))],n=a.nowPlaying;return`<div class="stack">
    <div class="card stack">
      <h2>🎵 Tocando agora</h2>
      ${n?`<div class="row" style="justify-content:space-between">
        <div><b>${u(n.nome)}</b><div class="muted" style="font-size:.85rem">${u(n.categoria||"")} · o player fica fixo no canto da tela, em qualquer aba</div></div>
        <button class="btn small danger" id="m-stop">Parar</button>
      </div>`:'<p class="empty-note">Nada tocando. Escolha uma faixa na lista abaixo.</p>'}
    </div>
    <form class="card stack" id="musnew"><h2>Adicionar música</h2>
      <div><label for="mus-nome">Nome</label><input id="mus-nome" required maxlength="60" placeholder="Combate — orquestra épica" /></div>
      <div><label for="mus-cat">Categoria</label><input id="mus-cat" list="mus-cats" placeholder="Livre" />
        <datalist id="mus-cats"><option value="Tensão"><option value="Batalha"><option value="Taverna"><option value="Livre"></datalist></div>
      <div><label for="mus-url">Link (YouTube, Spotify ou áudio direto .mp3/.ogg)</label><input id="mus-url" required placeholder="https://www.youtube.com/watch?v=..." /></div>
      <button class="btn primary">Adicionar</button></form>
    ${s.length?s.map(p=>`<div class="card stack"><h2>${u(p)}</h2>
      ${i.filter(o=>(o.categoria||"Livre")===p).map(o=>`<div class="row" style="justify-content:space-between;border-bottom:1px solid var(--line);padding:.4rem 0">
        <span>${{youtube:"📺",spotify:"🟢",audio:"🎧",link:"🔗"}[o.tipo]||"🎵"} ${u(o.nome)}</span>
        <div class="row"><button class="btn small primary" data-play="${o.id}">▶</button><button class="btn small danger" data-delmus="${o.id}">🗑</button></div>
      </div>`).join("")}
    </div>`).join(""):'<div class="card"><p class="empty-note">Nenhuma música ainda. Cole um link do YouTube (ex.: "tavern ambience 1 hour"), do Spotify ou um .mp3 direto.</p></div>'}
  </div>`}function ba(e){const{S:a,app:i,render:r}=e;b("#musnew").onsubmit=async s=>{var c;s.preventDefault();const n=b("#mus-nome").value.trim(),d=b("#mus-url").value.trim(),p=b("#mus-cat").value.trim()||"Livre";if(!n||!d)return;const o={id:k(),nome:n,categoria:p,url:d,...sa(d)};if(o.tipo==="link"&&!confirm("Não consegui reconhecer este link como YouTube, Spotify ou áudio direto. Adicionar mesmo assim? (vai abrir em outra aba ao tocar)"))return;const m=[...((c=a.music)==null?void 0:c.faixas)||[],o];try{await e.saveDmDoc("musicas",{faixas:m}),v("Música adicionada.")}catch(l){v(l.message)}},i.querySelectorAll("[data-play]").forEach(s=>s.onclick=()=>{var d;const n=(((d=a.music)==null?void 0:d.faixas)||[]).find(p=>p.id===s.dataset.play);if(n){if(n.tipo==="link"){window.open(n.url,"_blank","noopener");return}a.nowPlaying=n,r()}}),b("#m-stop")&&(b("#m-stop").onclick=()=>{a.nowPlaying=null,r()}),i.querySelectorAll("[data-delmus]").forEach(s=>s.onclick=()=>{var d,p;const n=(((d=a.music)==null?void 0:d.faixas)||[]).filter(o=>o.id!==s.dataset.delmus);((p=a.nowPlaying)==null?void 0:p.id)===s.dataset.delmus&&(a.nowPlaying=null),e.saveDmDoc("musicas",{faixas:n}).catch(o=>v(o.message))})}const f=b("#app"),t={be:null,comp:null,itensComuns:[],user:null,cid:null,camp:null,chars:[],npcs:[],story:null,combat:null,itemLib:null,music:null,nowPlaying:null,tab:"jogadores",open:new Set,openNpc:new Set,inputs:{},off:[],comunsQ:"",comunsCat:"all"},M=()=>`rpgmesa:dm-last:${t.user.uid}`,P=()=>{t.off.forEach(e=>e()),t.off=[]};va().catch(e=>{f.innerHTML=`<div class="shell"><div class="card">Erro ao iniciar: ${u(e.message)}</div></div>`});async function va(){t.be=await F(),U(t.be,f,{title:"Escudo do Mestre",subtitle:"Entre com sua conta de Mestre para gerenciar suas campanhas.",onSignedOut:()=>{P(),t.camp=null,t.cid=null,t.chars=[],t.nowPlaying=null,A()}},async e=>{t.user=e,f.innerHTML='<p class="muted" style="padding:1rem">Carregando compêndio…</p>',[t.comp,t.itensComuns]=await Promise.all([z(t.be),W()]);const a=q.get(M());a?E(a):N()})}const R=()=>t.be.mode==="local"?'<p class="banner">Modo demo: dados salvos neste navegador. Abra o Grimório em outra aba (com outra conta) para ver a sincronização.</p>':"";function N(){P(),t.camp=null,t.cid=null,t.nowPlaying=null,A(),q.set(M(),null),t.off.push(t.be.watchMyCampaigns(e=>{var i;const a=((i=b("#cname"))==null?void 0:i.value)||"";e.sort((r,s)=>r.name.localeCompare(s.name)),f.innerHTML=`<div class="shell stack" style="max-width:640px">
      <div class="topbar" style="margin:0"><h1 style="margin:0">Escudo do Mestre</h1>
        <div class="row"><a class="btn small" href="./grimorio.html" title="Ir para o Grimório do Aventureiro">📜 Grimório</a>${O(t.user)}</div></div>${R()}
      ${e.length?`<div class="card stack"><h2>Suas campanhas</h2>${e.map(r=>`<button class="btn" style="width:100%;justify-content:space-between" data-open="${r.id}"><span>${u(r.name)}</span><span class="muted">${u(r.joinCode)}</span></button>`).join("")}</div>`:""}
      <section class="card stack"><h2>Compêndio de regras</h2>
        <p style="margin:0">${t.comp.completo?`Carregado: <b>${t.comp.spells.length}</b> magias, <b>${t.comp.feats.length}</b> talentos, <b>${t.comp.classes.length}</b> classes, <b>${t.comp.species.length}</b> espécies, <b>${t.comp.backgrounds.length}</b> antecedentes, <b>${t.comp.items.length}</b> itens.`:"Ainda não importado — os jogadores veem só uma amostra."}</p>
        <label class="btn" style="width:100%">📂 Importar compendio.json<input id="compfile" type="file" accept=".json,application/json" hidden></label>
        <p class="muted" style="margin:0;font-size:.85rem">O compêndio fica no Firebase, visível só para quem faz login. Não vai para o GitHub.</p>
      </section>
      <form class="card stack" id="f"><h2>Nova campanha</h2>
        <div><label for="cname">Nome da campanha</label><input id="cname" required maxlength="60" placeholder="A Mina Perdida de Phandelver" value="${u(a)}" /></div>
        <button class="btn primary">Criar sala</button></form></div>`,H(t.be,f),f.querySelectorAll("[data-open]").forEach(r=>r.onclick=()=>E(r.dataset.open)),b("#compfile").onchange=async r=>{const s=r.target.files[0];if(s)try{const n=JSON.parse(await s.text()),d=V(n);v("Importando compêndio…"),await t.be.saveCompendium(n),t.comp=await z(t.be,{force:!0}),v(`Compêndio importado: ${d.magias} magias, ${d.talentos} talentos, ${d.classes} classes.`),N()}catch(n){v(/permission|insufficient/i.test(n.message)?"Sem permissão: só a conta de administrador pode importar o compêndio.":"Erro: "+n.message)}},b("#f").onsubmit=async r=>{r.preventDefault();try{const{id:s}=await t.be.createCampaign(b("#cname").value.trim());E(s)}catch(s){v(s.message)}}}))}function E(e){P(),t.cid=e,t.camp=null,t.chars=[],t.npcs=[],t.story=null,t.combat=null,t.itemLib=null,t.music=null,t.nowPlaying=null,t.tab="jogadores",q.set(M(),e),t.off.push(t.be.watchCampaign(e,a=>{if(!a||a.dmUid!==t.user.uid)return N();t.camp=a,$()})),t.off.push(t.be.watchPartyCharacters(e,a=>{const i=Object.fromEntries(t.chars.map(r=>[r.id,r.state.hp.current+r.state.hp.temp]));t.chars=a.sort((r,s)=>r.name.localeCompare(s.name)),$(),a.forEach(r=>{var d;const s=i[r.id],n=r.state.hp.current+r.state.hp.temp;s!=null&&s!==n&&((d=document.querySelector(`[data-pc="${r.id}"]`))==null||d.classList.add(n<s?"flash-dmg":"flash-heal"))})})),t.off.push(t.be.watchNpcs(e,a=>{t.npcs=a.sort((i,r)=>i.nome.localeCompare(r.nome)),$()})),t.off.push(t.be.watchDmDoc(e,"notas",a=>{t.story=a||{texto:""},$()})),t.off.push(t.be.watchDmDoc(e,"itens",a=>{t.itemLib=a||{itens:[]},$()})),t.off.push(t.be.watchCombat(e,a=>{t.combat=a||{ordem:[],turno:0,rodada:1},$()})),t.off.push(t.be.watchDmDoc(e,"musicas",a=>{t.music=a||{faixas:[]},$()}))}const y={get S(){return t},app:f,render:()=>$(),toast:v,createNpc:e=>t.be.createNpc(t.cid,e),updateNpc:(e,a)=>t.be.updateNpc(t.cid,e,a),deleteNpc:e=>t.be.deleteNpc(t.cid,e),saveDmDoc:(e,a)=>t.be.saveDmDoc(t.cid,e,a),saveCombat:e=>t.be.saveCombat(t.cid,e)};let j=null;function fa(){let e=document.getElementById("music-bar");return e||(e=document.createElement("div"),e.id="music-bar",document.body.appendChild(e)),e}function A(){const e=fa(),a=t.nowPlaying;if(!a){e.classList.remove("show"),e.innerHTML="",j=null;return}if(j===a.id)return;j=a.id,e.classList.add("show");let i="";a.tipo==="youtube"?i=`<iframe src="https://www.youtube.com/embed/${a.videoId}?autoplay=1&controls=1" allow="autoplay" style="width:200px;height:60px;border:0;border-radius:8px" title="Player"></iframe>`:a.tipo==="spotify"?i=`<iframe src="${u(a.embedUrl)}?utm_source=generator" width="260" height="80" style="border:0;border-radius:8px" allow="autoplay; encrypted-media" title="Player"></iframe>`:a.tipo==="audio"&&(i=`<audio src="${u(a.url)}" autoplay loop controls style="width:220px"></audio>`),e.innerHTML=`<div class="row" style="align-items:center;gap:.6rem;flex-wrap:nowrap">
    <div style="min-width:0"><b style="display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:140px">${u(a.nome)}</b><span class="muted" style="font-size:.78rem">${u(a.categoria||"")}</span></div>
    ${i}<button class="btn small danger" id="mb-stop">✕</button></div>`,b("#mb-stop",e).onclick=()=>{t.nowPlaying=null,$()}}function $(){if(!t.camp){A();return}const e=Object.values(t.camp.members||{}).filter(a=>a==="player").length;G(()=>{f.innerHTML=`<div class="shell">
      <div class="topbar">
        <div><h1 style="margin:0">${u(t.camp.name)}</h1><span class="muted">${e} jogador(es) na sala · ${t.chars.length} ficha(s)</span></div>
        <div class="row"><span class="muted">Código da sala</span><span class="code" id="code">${u(t.camp.joinCode)}</span>
          <button class="btn small" id="copy">Copiar</button><button class="btn small" id="back">Campanhas</button>
          <a class="btn small" href="./grimorio.html" title="Ir para o Grimório do Aventureiro">📜</a>${O(t.user)}</div>
      </div>
      ${R()}
      <nav class="filters" role="tablist" style="margin-bottom:.75rem">${X.map(([a,i,r])=>`<button role="tab" aria-pressed="${t.tab===a}" data-tab="${a}">${i} ${r}</button>`).join("")}</nav>
      ${ha()}
    </div>`,b("#copy").onclick=()=>{var a;return(a=navigator.clipboard)==null?void 0:a.writeText(t.camp.joinCode).then(()=>v("Código copiado."))},b("#back").onclick=N,H(t.be,f),f.querySelectorAll("[data-tab]").forEach(a=>a.onclick=()=>{t.tab=a.dataset.tab,$()}),$a()}),A()}function ha(){return t.tab==="combate"?oa(y):t.tab==="npcs"?na(y):t.tab==="historia"?ca(y):t.tab==="itens"?ma(y):t.tab==="musica"?ua(y):t.chars.length?`<div class="party">${t.chars.map(ya).join("")}</div>`:`<div class="card empty"><h2>Esperando os aventureiros…</h2><p class="muted">Peça para cada jogador entrar no Grimório com a própria conta, abrir o personagem e, na aba <b>Ficha → Mesa</b>, digitar o código <b>${u(t.camp.joinCode)}</b>.</p></div>`}function $a(){if(t.tab==="combate")return ia(y);if(t.tab==="npcs")return ra(y);if(t.tab==="historia")return la(y);if(t.tab==="itens")return pa(y);if(t.tab==="musica")return ba(y);ga()}function ya(e){const a=_(e,t.comp),{hp:i,conditions:r=[],dead:s,deathSaves:n={}}=e.state,d=i.max+i.temp,p=i.current/i.max,o=p>.5?"":p>.25?"mid":"low",m=Object.entries(e.state.spellSlots||{}),c=`${a.speciesLabel} · ${K(e.build,t.comp)}`;return`<article class="card pc stack ${s?"dead":i.current===0?"down":""}" data-pc="${e.id}">
    <div><h3>${u(e.name)}</h3><div class="meta">${u(c)} · jogador: ${u(e.ownerName||"—")}</div></div>
    <div class="hpline"><span><b>${i.current}</b> / ${i.max} PV ${i.temp?`<span style="color:var(--temp)">+${i.temp}</span>`:""}</span>
      ${s?'<span class="chip bad">MORTO</span>':i.current===0?`<span class="chip bad">Caído · ✓${n.success||0} ✗${n.fail||0}</span>`:""}</div>
    <div class="hpbar"><div class="cur ${o}" style="width:${i.current/d*100}%"></div><div class="tmp" style="width:${i.temp/d*100}%"></div></div>
    <div class="ctl">
      <input type="number" inputmode="numeric" min="0" placeholder="0" aria-label="Valor para ${u(e.name)}" data-amt="${e.id}" value="${u(t.inputs[e.id]||"")}" />
      <button class="btn danger" data-hp="dano" data-id="${e.id}" title="Dano">−</button>
      <button class="btn heal" data-hp="cura" data-id="${e.id}" title="Cura">+</button>
      <button class="btn temp" data-hp="temp" data-id="${e.id}" title="PV temporário">T</button>
    </div>
    <div class="kv"><div><b>${e.build.ac??10}</b>CA</div><div><b>${S(a.initiative)}</b>Inic.</div><div><b>${a.passivePerception}</b>Perc. pass.</div><div><b>${a.spellDC??"—"}</b>CD magia</div></div>
    ${r.length?`<div class="row">${r.map(l=>`<button class="chip bad" data-rmcond="${l}" data-id="${e.id}" title="Remover">${L[l]||l} ✕</button>`).join("")}</div>`:""}
    ${m.length?`<div class="slotrow">${m.map(([l,h])=>`<button data-slot="${l}" data-id="${e.id}" title="Clique: gastar · Shift+clique: recuperar">${l}º ${h.max-h.used}/${h.max}</button>`).join("")}</div>`:""}
    <details class="more" data-more="${e.id}" ${t.open.has(e.id)?"open":""}><summary>Ficha completa</summary>
      <div class="stack" style="margin-top:.5rem">
        <div class="row"><label for="hpmax-${e.id}" style="margin:0">PV máximo</label>
          <input id="hpmax-${e.id}" data-hpmax="${e.id}" type="number" inputmode="numeric" min="1" style="width:5.5rem" value="${i.max}" />
          <span class="muted" style="font-size:.8rem">rolado no dado com o jogador</span></div>
        <div class="abil">${Q.map(([l,h])=>`<div><small>${h.slice(0,3)}</small><b>${S(a.mods[l])}</b><small>${e.build.abilities[l]} · TR ${S(a.saves[l])}</small></div>`).join("")}</div>
        <div class="skl">${a.skills.map(l=>`<div>${l.prof?"●":"○"} ${l.nome} ${S(l.bonus)}</div>`).join("")}</div>
        <select data-addcond="${e.id}" aria-label="Aplicar condição"><option value="">Aplicar condição…</option>
          ${J.filter(l=>!r.includes(l)).map(l=>`<option value="${l}">${L[l]||l}</option>`).join("")}</select>
        ${(e.build.feats||[]).length?`<div><small class="muted">Talentos</small><div style="font-size:.88rem">${e.build.feats.map(l=>{var h;return u(((h=t.comp.byId.feats[l.id])==null?void 0:h.nome)||l.id)}).join(", ")}</div></div>`:""}
        ${(e.inventory||[]).length?`<div><small class="muted">Inventário</small><div style="font-size:.88rem">${e.inventory.map(l=>`${l.equipado?"🛡️":""}${u(l.nome)}${l.qtd>1?" ×"+l.qtd:""}`).join(", ")}</div></div>`:""}
        <div><small class="muted">Moedas</small><div style="font-size:.88rem">${["pl","po","pe","pp","pc"].map(l=>{var h;return`${Number((h=e.coins)==null?void 0:h[l])||0} ${l.toUpperCase()}`}).join(" · ")}</div></div>
        ${e.notes?`<div><small class="muted">Anotações do jogador</small><div style="white-space:pre-wrap;font-size:.9rem">${u(e.notes)}</div></div>`:""}
        <ul class="log">${(e.state.log||[]).map(l=>`<li>${u(l)}</li>`).join("")}</ul>
      </div></details>
  </article>`}function ga(){const e=a=>t.chars.find(i=>i.id===a);f.querySelectorAll("[data-amt]").forEach(a=>{a.oninput=()=>t.inputs[a.dataset.amt]=a.value,a.onkeydown=i=>{i.key==="Enter"&&f.querySelector(`[data-hp="${i.shiftKey?"cura":"dano"}"][data-id="${a.dataset.amt}"]`).click()}}),f.querySelectorAll("[data-hp]").forEach(a=>a.onclick=async()=>{const i=a.dataset.id,r=Number(t.inputs[i]);if(!r)return v("Digite um valor.");t.inputs[i]="";const s=await Y(t.be,i,a.dataset.hp,r,{},"Mestre"),n=e(i);v(`${n==null?void 0:n.name}: ${s.log.at(-1)??""}${s.concentrationDC&&(n!=null&&n.state.concentration)?` · Concentração CD ${s.concentrationDC}`:""}`)}),f.querySelectorAll("[data-hpmax]").forEach(a=>a.onchange=()=>{const i=e(a.dataset.hpmax),r=Math.max(1,Number(a.value)||1);t.be.updateCharacter(i.id,{"state.hp":{...i.state.hp,max:r,current:Math.min(i.state.hp.current,r)}})}),f.querySelectorAll("[data-slot]").forEach(a=>a.onclick=i=>{const r=e(a.dataset.id),s=a.dataset.slot,n=r.state.spellSlots[s],d=i.shiftKey?Math.max(0,n.used-1):Math.min(n.max,n.used+1);t.be.updateCharacter(r.id,{[`state.spellSlots.${s}.used`]:d})}),f.querySelectorAll("[data-rmcond]").forEach(a=>a.onclick=()=>{const i=e(a.dataset.id);t.be.updateCharacter(i.id,{"state.conditions":i.state.conditions.filter(r=>r!==a.dataset.rmcond)})}),f.querySelectorAll("[data-addcond]").forEach(a=>a.onchange=()=>{const i=e(a.dataset.addcond);a.value&&t.be.updateCharacter(i.id,{"state.conditions":[...i.state.conditions||[],a.value]})}),f.querySelectorAll("[data-more]").forEach(a=>a.ontoggle=()=>a.open?t.open.add(a.dataset.more):t.open.delete(a.dataset.more))}
