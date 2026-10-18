// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://henriqueabreu.github.io',
	integrations: [mdx(), sitemap()],
	markdown: {
		// Blocos de código sempre escuros, nos dois temas do site.
		shikiConfig: { theme: 'github-dark-dimmed' },
	},
	fonts: [
		{
			// Serifa editorial dos títulos
			provider: fontProviders.google(),
			name: 'Newsreader',
			cssVariable: '--font-serif',
			weights: [400, 500],
			styles: ['normal', 'italic'],
			subsets: ['latin'],
			fallbacks: ['Georgia', 'serif'],
		},
		{
			provider: fontProviders.google(),
			name: 'Inter',
			cssVariable: '--font-sans',
			weights: [400, 500, 600],
			subsets: ['latin'],
			fallbacks: ['system-ui', 'sans-serif'],
		},
		{
			provider: fontProviders.google(),
			name: 'JetBrains Mono',
			cssVariable: '--font-mono',
			weights: [400],
			subsets: ['latin'],
			fallbacks: ['ui-monospace', 'monospace'],
		},
	],
});
