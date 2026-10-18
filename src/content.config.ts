import { defineCollection } from 'astro:content';
import type { Loader } from 'astro/loaders';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { buscarCategorias, buscarPosts, configSupabase } from './lib/supabase';

// Posts vêm de dois lugares e aparecem juntos no site:
// - do banco (Supabase): o caminho normal para escrever;
// - de arquivos .md/.mdx em src/content/blog/: para posts que usam componentes, como diagramas.
const arquivos = glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' });

const postsDoBancoEArquivos: Loader = {
	name: 'posts-supabase-e-arquivos',
	async load(contexto) {
		const { store, parseData, renderMarkdown, generateDigest, logger } = contexto;
		// O glob limpa e preenche o store com os arquivos; os posts do banco entram depois.
		await arquivos.load(contexto);

		if (!configSupabase()) {
			logger.warn('Supabase não configurado (SUPABASE_URL/SUPABASE_ANON_KEY): usando só os arquivos locais.');
			return;
		}

		const posts = await buscarPosts();
		for (const post of posts) {
			// Se o mesmo post existir como arquivo, vale a versão do banco
			if (store.has(post.slug)) {
				logger.warn(`"${post.slug}" existe no banco e em src/content/blog/: usando a versão do banco.`);
			}
			const data = await parseData({
				id: post.slug,
				data: {
					title: post.titulo,
					description: post.descricao,
					pubDate: post.publicado_em,
					updatedDate: post.atualizado_em ?? undefined,
					categoria: post.categoria?.slug,
					tags: post.tags,
				},
			});
			store.set({
				id: post.slug,
				data,
				body: post.conteudo,
				rendered: await renderMarkdown(post.conteudo),
				digest: generateDigest(post as unknown as Record<string, unknown>),
			});
		}
		logger.info(`${posts.length} post(s) carregado(s) do Supabase.`);
	},
};

const blog = defineCollection({
	loader: postsDoBancoEArquivos,
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			// Slug de uma categoria cadastrada no banco
			categoria: z.string().optional(),
			tags: z.array(z.string()).default([]),
		}),
});

const categorias = defineCollection({
	loader: {
		name: 'categorias-supabase',
		async load({ store, parseData, logger }) {
			store.clear();
			if (!configSupabase()) {
				logger.warn('Supabase não configurado: nenhuma categoria carregada.');
				return;
			}
			for (const c of await buscarCategorias()) {
				store.set({
					id: c.slug,
					data: await parseData({ id: c.slug, data: { nome: c.nome, descricao: c.descricao ?? undefined } }),
				});
			}
		},
	},
	schema: z.object({
		nome: z.string(),
		descricao: z.string().optional(),
	}),
});

export const collections = { blog, categorias };
