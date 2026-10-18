// Consultas do blog usadas pelas páginas: posts em ordem, categorias e tags.
import { getCollection, type CollectionEntry } from 'astro:content';
import { slugificar } from './slug';

export type Post = CollectionEntry<'blog'>;

export async function postsOrdenados() {
	return (await getCollection('blog')).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

// Nome legível de cada categoria. Se um post usar uma categoria que não está no banco,
// o slug vira o nome ("engenharia-de-software" → "Engenharia de software").
let categorias: Promise<CollectionEntry<'categorias'>[]> | undefined;
const todasCategorias = () => (categorias ??= getCollection('categorias'));

export async function nomesDasCategorias() {
	const nomes = new Map<string, string>();
	for (const c of await todasCategorias()) nomes.set(c.id, c.data.nome);
	return (slug: string) => nomes.get(slug) ?? slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
}

// Categorias que têm pelo menos um post, com a contagem
export async function categoriasEmUso(posts: Post[]) {
	const nome = await nomesDasCategorias();
	const contagem = new Map<string, number>();
	for (const p of posts) if (p.data.categoria) contagem.set(p.data.categoria, (contagem.get(p.data.categoria) ?? 0) + 1);
	const descricoes = new Map((await todasCategorias()).map((c) => [c.id, c.data.descricao]));
	return [...contagem]
		.map(([slug, total]) => ({ slug, nome: nome(slug), descricao: descricoes.get(slug), total }))
		.sort((a, b) => b.total - a.total || a.nome.localeCompare(b.nome, 'pt-BR'));
}

// Tags agrupadas pelo slug, para "LLMs" e "llms" caírem na mesma página
export function tagsEmUso(posts: Post[]) {
	const tags = new Map<string, { nome: string; total: number }>();
	for (const p of posts) {
		for (const t of p.data.tags) {
			const slug = slugificar(t);
			const atual = tags.get(slug);
			tags.set(slug, { nome: atual?.nome ?? t, total: (atual?.total ?? 0) + 1 });
		}
	}
	return [...tags].map(([slug, t]) => ({ slug, ...t })).sort((a, b) => b.total - a.total || a.nome.localeCompare(b.nome, 'pt-BR'));
}
