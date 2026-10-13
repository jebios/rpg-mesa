# Gerar o compêndio (compendio.json)

Scripts que leem o PDF do Livro do Jogador 2024 (com camada de texto) e geram `compendio.json`
(magias, talentos, classes, subclasses, espécies, antecedentes, armas, armaduras e equipamento).

    pip install pymupdf
    ln -s "/caminho/Livro do Jogador.pdf" phb.pdf
    python3 extrair_linhas.py      # gera lines.json
    python3 -c "import json, gerar_compendio as g; json.dump(g.build(), open('compendio.json','w'), ensure_ascii=False)"

O `compendio.json` NÃO deve ir para o GitHub (conteúdo protegido). Importe-o pelo Escudo do Mestre:
ele fica no Firestore, legível só por quem faz login.
