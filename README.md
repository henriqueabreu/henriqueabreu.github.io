# site-pessoal

Site pessoal publicado em **https://henriqueabreu.github.io**, feito com
[Astro](https://astro.build) a partir do template oficial de blog.

## Rodar localmente

Precisa do Node 22 (o Astro atual não roda no 20). Com nvm:

```sh
nvm use          # lê o .nvmrc e ativa o Node 22
npm install      # só na primeira vez
npm run dev      # abre em http://localhost:4321
```

## Escrever um post

Crie um arquivo `.md` (ou `.mdx`, para usar componentes) em `src/content/blog/`:

```md
---
title: 'Título do post'
description: 'Resumo de uma linha'
pubDate: '2026-10-17'
---

Texto em Markdown...
```

O nome do arquivo vira o endereço: `meu-post.md` → `/blog/meu-post/`.

Cada post ganha sozinho uma capa de compartilhamento (a imagem que aparece no
LinkedIn e no WhatsApp), gerada no build em `/og/meu-post.png` a partir do título.

Para colocar um diagrama no meio do texto, use `.mdx` e importe o componente logo
abaixo do frontmatter, como em `src/content/blog/ia-machine-learning-deep-learning.mdx`.
Os diagramas ficam em `src/components/diagramas/`.

## Onde mexer

| O quê | Arquivo |
|---|---|
| Nome, cargo, cidade, frase do selo, links | `src/consts.ts` |
| Página inicial (título e apresentação) | `src/pages/index.astro` |
| Terminal do topo e seção "Agora" | `src/data/agora.ts` |
| Sobre (texto) | `src/pages/sobre.astro` |
| Trajetória e ferramentas do Sobre | `src/data/trajetoria.ts` |
| Lista de projetos (`destaque: true` aparece na home) | `src/data/projetos.ts` |
| Foto | `src/assets/avatar.jpg` |
| Menu e rodapé | `src/components/Header.astro`, `Footer.astro` |
| Cores e tipografia (tema claro e escuro) | `src/styles/global.css` |
| Faixa "Vamos conversar?" | `src/components/Convite.astro` |
| Capa de compartilhamento (layout) | `src/og/render.ts` |
| Fundo animado de fibra ótica (cores, nº de fibras, velocidade) | `src/components/FibraOtica.astro` |
| Fontes | `astro.config.mjs` |

## Publicação

Todo push na branch `main` dispara `.github/workflows/deploy.yml`, que gera o
site e publica no GitHub Pages. O repositório precisa se chamar
`henriqueabreu.github.io`, e em **Settings → Pages → Source** deve estar
selecionado **GitHub Actions**.
