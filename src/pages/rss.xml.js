import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { nomesDasCategorias, postsOrdenados } from '../lib/blog';

export async function GET(context) {
	const posts = await postsOrdenados();
	const nomeCategoria = await nomesDasCategorias();
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: `/blog/${post.id}/`,
			categories: [...(post.data.categoria ? [nomeCategoria(post.data.categoria)] : []), ...post.data.tags],
		})),
	});
}
