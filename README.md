# Mesa de RPG — Escudo do Mestre & Grimório do Aventureiro

App web gratuito para D&D 2024. O Mestre usa o **Escudo** (computador ou tablet) e os jogadores usam o **Grimório** (celular). As alterações aparecem nos dois lados em tempo real.

**Versão 0.2:** login individual (e-mail/senha ou Google), cada jogador com seus próprios personagens, salas com código, criação de ficha, calculadora de PV com as regras de 2024, espaços de magia, condições, descansos, e o painel do Mestre com todas as fichas ao vivo.

---

## 1. Testar agora no seu computador (sem Firebase)

Instale o [Node.js](https://nodejs.org) (versão 20 ou mais nova) e depois rode:

```bash
npm install
npm run dev
```

Abra `http://localhost:5173/escudo.html` numa aba, crie uma conta de Mestre e depois uma sala.
Em **outra aba** (ou com o celular na mesma rede, usando `npm run dev -- --host`), abra `grimorio.html`, crie outra conta e um personagem e, na aba **Ficha → Mesa**, digite o código da sala.

Enquanto o Firebase não estiver configurado, o app roda em **modo demo**. Os dados ficam no navegador e só sincronizam entre abas do mesmo computador.

## 2. Ligar o Firebase (grátis, plano Spark)

1. Acesse <https://console.firebase.google.com> e clique em **Adicionar projeto** (pode desativar o Analytics).
2. **Authentication**: vá em Começar → Método de login → ative **E-mail/senha** e **Google**. Em **Modelos**, dá para traduzir o e-mail de "redefinir senha" para português.
3. **Firestore Database**: crie o banco no **modo de produção**, na região `southamerica-east1` (São Paulo).
4. **Realtime Database**: crie também, em modo bloqueado. Ele vai ser usado nos pins do mapa e na presença online.
5. Em ⚙️ **Configurações do projeto → Seus apps → Web (</>)**, registre o app e copie o objeto `firebaseConfig` para `src/firebase/config.js`.
6. Publique as regras de segurança:

   ```bash
   npm install -g firebase-tools
   firebase login
   firebase use --add        # escolha o projeto
   firebase deploy --only firestore:rules,database
   ```

> Não use o **Storage** do Firebase: ele exige o plano pago (Blaze). Os mapas vão ser comprimidos no navegador e salvos no Firestore.

## 3. Publicar no GitHub Pages

1. Crie um repositório no GitHub (ex.: `rpg-mesa`) e envie o projeto:

   ```bash
   git init && git add . && git commit -m "Versão inicial"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/rpg-mesa.git
   git push -u origin main
   ```

2. No GitHub, vá em **Settings → Pages → Source** e escolha **GitHub Actions**.
3. A cada `push` na `main`, o workflow roda os testes, gera o site e publica em
   `https://SEU-USUARIO.github.io/rpg-mesa/`.
4. **Importante:** no Firebase, abra **Authentication → Configurações → Domínios autorizados** e adicione `SEU-USUARIO.github.io`.

## Contas e privacidade

- Cada pessoa cria a própria conta no Grimório ou no Escudo. A mesma conta funciona nos dois.
- Os personagens ficam **na conta do jogador** (coleção `characters`, campo `ownerUid`) e podem ser abertos em qualquer aparelho.
- Uma ficha pode estar em **uma mesa por vez**. Para isso, o jogador vai em Ficha → Mesa e digita o código.
- **Quem vê cada ficha:** só o dono e o Mestre da mesa em que ela está. Um jogador não vê a ficha dos outros.
- O Mestre pode alterar PV, espaços de magia e condições, mas não pode apagar a ficha nem trocá-la de dono.
- No modo demo, as contas ficam só no navegador. Isso serve apenas para testar: cada aba pode estar logada com uma conta diferente.

## Estrutura

```
index.html / escudo.html / grimorio.html   páginas
src/core/          regras puras (PV, atributos, espaços de magia, dados) — com testes
src/firebase/      acesso a dados (Firebase ou modo demo, mesma interface)
src/compendium/    carrega o compêndio (public/data/*.json)
src/grimorio/      telas do jogador (mobile-first, abas)
src/escudo/        painel do Mestre
public/data/       classes, espécies e magias (amostra; será gerado a partir dos PDFs)
tests/core/        testes automáticos (npm test)
firestore.rules    quem pode ler/escrever o quê
```

## Próximas etapas

- [ ] Converter os PDFs do projeto em `public/data/*.json` (todas as magias, talentos, antecedentes, subclasses)
- [ ] Rastreador de iniciativa (`campaigns/{id}/combat/current`)
- [ ] Mapas: upload pelo Mestre e pins em tempo real para os jogadores
- [ ] Gerador de NPCs e monstros · Diário da campanha
- [ ] Inventário e equipamentos · Multiclasse · PWA instalável

## Direitos autorais

Só o conteúdo do **SRD 5.2** (CC-BY-4.0) deve ficar em `public/data`, porque o GitHub Pages é público. O restante do material dos livros deve ir para o Firestore, com leitura liberada só para quem fez login.
