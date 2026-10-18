// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://henriqueabreu.github.io',
	integrations: [mdx(), sitemap()],
	markdown: {
		// Blocos de código com tema claro e escuro; global.css escolhe qual mostrar.
		shikiConfig: {
			themes: { light: 'github-light', dark: 'github-dark-dimmed' },
			defaultColor: false,
		},
	},
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Inter',
			cssVariable: '--font-sans',
			weights: [400, 500, 600, 700, 800],
			subsets: ['latin'],
			fallbacks: ['system-ui', 'sans-serif'],
		},
		{
			provider: fontProviders.google(),
			name: 'JetBrains Mono',
			cssVariable: '--font-mono',
			weights: [400, 500],
			subsets: ['latin'],
			fallbacks: ['ui-monospace', 'monospace'],
		},
	],
});
