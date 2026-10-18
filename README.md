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

Os posts ficam num banco Postgres no [Supabase](https://supabase.com). O site
busca o conteúdo na hora do build e continua estático no GitHub Pages.

1. No Supabase, abra **Table Editor → posts → Insert row** e preencha:
   - `slug`: vira o endereço (`meu-post` → `/blog/meu-post/`), só letras minúsculas, números e hífens;
   - `titulo`, `descricao` e `conteudo` (o texto, em Markdown);
   - `categoria_id`: escolha na lista (as categorias ficam na tabela `categorias`);
   - `tags`: lista, por exemplo `{llms,python}`;
   - `status`: `publicado` (ou `rascunho`, que nunca aparece) e `publicado_em`.
2. Republique: aba **Actions → Publicar no GitHub Pages → Run workflow**.
   Se não fizer nada, o site republica sozinho todo dia às 6h.

Um post com `publicado_em` no futuro fica **agendado**: entra no ar na primeira
publicação a partir daquela data.

Posts que usam componentes (como os diagramas) continuam como arquivos `.mdx` em
`src/content/blog/`, com `categoria` e `tags` no frontmatter. Os dois tipos
aparecem juntos no blog. O esquema do banco está em `supabase/schema.sql`.

Para rodar com o banco na sua máquina, copie `.env.example` para `.env` e
preencha com a URL e a chave pública do projeto (Project Settings → API). Sem o
`.env`, o site sobe só com os posts em arquivo.

Cada post ganha sozinho uma capa de compartilhamento (a imagem que aparece no
LinkedIn e no WhatsApp), gerada no build em `/og/<slug>.png` a partir do título.
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
| Leitura do banco e junção com os arquivos | `src/content.config.ts`, `src/lib/supabase.ts` |
| Páginas de categoria e de tag | `src/pages/blog/categoria/`, `src/pages/blog/tag/` |
| Foto | `src/assets/avatar.jpg` |
| Menu e rodapé | `src/components/Header.astro`, `Footer.astro` |
| Cores e tipografia (tema claro e escuro) | `src/styles/global.css` |
| Faixa "Vamos conversar?" | `src/components/Convite.astro` |
| Capa de compartilhamento (layout) | `src/og/render.ts` |
| Fundo animado de fibra ótica (cores, nº de fibras, velocidade) | `src/components/FibraOtica.astro` |
| Fontes | `astro.config.mjs` |

## Publicação

Todo push na branch `main` dispara `.github/workflows/deploy.yml`, que gera o
site e publica no GitHub Pages. Ele também roda todo dia às 6h e pode ser
disparado na mão pela aba Actions. As chaves do Supabase vêm dos secrets
`SUPABASE_URL` e `SUPABASE_ANON_KEY` do repositório. O repositório precisa se chamar
`henriqueabreu.github.io`, e em **Settings → Pages → Source** deve estar
selecionado **GitHub Actions**.
