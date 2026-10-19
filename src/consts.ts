// Dados globais do site. Importe de qualquer página com `import { ... } from '../consts'`.

export const SITE_TITLE = 'Henrique Abreu';
export const SITE_DESCRIPTION =
	'Engenheiro de Computação em Salvador. Escrevo sobre desenvolvimento de software, inteligência artificial e os projetos em que estou trabalhando.';

export const AUTOR = {
	nome: 'Henrique Abreu',
	cargo: 'Engenheiro de Computação',
	local: 'Salvador, BA',
	// Frase curta que aparece no selo do topo da página inicial.
	status: 'Explorando agentes de IA aplicados a produto',
};

export const GITHUB_URL = 'https://github.com/henriqueabreu';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/henrique-abreu-30437798/';

// Token do Cloudflare Web Analytics (painel da Cloudflare → Web Analytics → site → "Manage site").
// Não é segredo: ele aparece no HTML de qualquer forma. Vazio, o site não carrega o analytics.
export const CLOUDFLARE_ANALYTICS_TOKEN = '9b9ca7e2bef84235a15dbfda3474f00f';
