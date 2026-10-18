// Imagens de prévia geradas no build: /og/site.png (padrão) e /og/<post>.png para cada post.
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { gerarImagemOg } from '../../og/render';

export const getStaticPaths = (async () => {
	const posts = await getCollection('blog');
	return [
		{ params: { slug: 'site' }, props: { titulo: 'Software, agentes de IA e pessoas, trabalhando juntos.' } },
		...posts.map((post) => ({
			params: { slug: post.id },
			props: { titulo: post.data.title, rotulo: 'Escritos' },
		})),
	];
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
	const png = await gerarImagemOg(props as { titulo: string; rotulo?: string });
	return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
