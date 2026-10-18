-- Esquema do blog no Supabase.
-- Rode uma vez no SQL Editor do projeto (Supabase → SQL Editor → New query → colar → Run).
-- Pode rodar de novo sem problema: só cria o que ainda não existe.

-- ---------- Tabelas ----------

create table if not exists public.categorias (
	id bigint generated always as identity primary key,
	slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
	nome text not null,
	descricao text,
	criado_em timestamptz not null default now()
);

create table if not exists public.posts (
	id bigint generated always as identity primary key,
	-- Vira o endereço: slug "meu-post" → /blog/meu-post/
	slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
	titulo text not null,
	descricao text not null,
	-- Texto do post em Markdown
	conteudo text not null,
	categoria_id bigint references public.categorias (id) on delete set null,
	tags text[] not null default '{}',
	-- 'rascunho' nunca aparece no site; 'publicado' aparece a partir de publicado_em
	status text not null default 'rascunho' check (status in ('rascunho', 'publicado')),
	publicado_em date,
	atualizado_em date,
	criado_em timestamptz not null default now(),
	modificado_em timestamptz not null default now(),
	constraint publicado_tem_data check (status <> 'publicado' or publicado_em is not null)
);

create index if not exists posts_publicado_em_idx on public.posts (publicado_em desc);
create index if not exists posts_categoria_idx on public.posts (categoria_id);
create index if not exists posts_tags_idx on public.posts using gin (tags);

-- Atualiza modificado_em sozinho a cada edição
create or replace function public.tocar_modificado_em()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
	new.modificado_em = now();
	return new;
end;
$$;

drop trigger if exists posts_modificado_em on public.posts;
create trigger posts_modificado_em
	before update on public.posts
	for each row execute function public.tocar_modificado_em();

-- ---------- Acesso público (somente leitura) ----------
-- O site lê com a chave pública. Com RLS ligado, ela só enxerga categorias e posts
-- publicados com data de hoje ou anterior. Um post com data futura fica agendado.

alter table public.categorias enable row level security;
alter table public.posts enable row level security;

drop policy if exists "categorias visiveis" on public.categorias;
create policy "categorias visiveis" on public.categorias
	for select to anon, authenticated
	using (true);

drop policy if exists "posts publicados visiveis" on public.posts;
create policy "posts publicados visiveis" on public.posts
	for select to anon, authenticated
	using (status = 'publicado' and publicado_em <= current_date);

-- ---------- Dados iniciais ----------

insert into public.categorias (slug, nome, descricao) values
	('inteligencia-artificial', 'Inteligência Artificial', 'Machine learning, LLMs, agentes e IA aplicada a produto.'),
	('engenharia-de-software', 'Engenharia de Software', 'Arquitetura, código e o dia a dia de construir sistemas.'),
	('bastidores', 'Bastidores', 'Como este site é feito e o que aprendo construindo.')
on conflict (slug) do nothing;

insert into public.posts (slug, titulo, descricao, conteudo, categoria_id, tags, status, publicado_em)
select
	'ola-mundo',
	'Olá, mundo',
	'Primeiro post do site: o que vai aparecer por aqui.',
	$md$Este é o primeiro post do site. Por aqui vou escrever sobre tecnologia,
desenvolvimento de software, inteligência artificial e os projetos em que
estou trabalhando.

## Como este site funciona

O site é feito com [Astro](https://astro.build) e hospedado de graça no
GitHub Pages. Os posts ficam num banco Postgres no Supabase: o site busca o
conteúdo na hora de gerar as páginas e continua estático, rápido e sem
servidor para manter.

```python
print("olá, mundo")
```
$md$,
	(select id from public.categorias where slug = 'bastidores'),
	array['astro', 'supabase'],
	'publicado',
	'2026-10-17'
on conflict (slug) do nothing;
