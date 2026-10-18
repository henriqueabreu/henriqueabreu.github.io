// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Chaves do Supabase na sua máquina ficam em .env (fora do git); no GitHub vêm dos secrets.
if (existsSync('.env')) process.loadEnvFile('.env');

// As imagens de prévia (src/og) são desenhadas pelo sharp, que acha fontes pelo fontconfig.
// Aponta o fontconfig para a pasta de fontes do projeto, para a capa sair igual em qualquer máquina.
const pastaFontes = fileURLToPath(new URL('./src/og/fonts/', import.meta.url));
const pastaTmp = join(tmpdir(), 'site-pessoal-fontconfig');
mkdirSync(pastaTmp, { recursive: true });
const arquivoConf = join(pastaTmp, 'fonts.conf');
writeFileSync(
	arquivoConf,
	`<?xml version="1.0"?><!DOCTYPE fontconfig SYSTEM "fonts.dtd"><fontconfig><dir>${pastaFontes}</dir><cachedir>${pastaTmp}</cachedir></fontconfig>`,
);
process.env.FONTCONFIG_FILE = arquivoConf;

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
