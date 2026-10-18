// Gera a imagem de prévia (Open Graph, 1200x630) que aparece ao compartilhar uma página
// no LinkedIn, WhatsApp etc. Desenha um SVG e converte para PNG com o sharp, usando a
// fonte Newsreader que fica em src/og/fonts (o fontconfig é apontado para lá em astro.config.mjs).
import sharp from 'sharp';

const LARGURA = 1200;
const ALTURA = 630;
const MARGEM = 80;

function escapar(texto: string) {
	return texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Quebra o título em linhas por estimativa de largura (Newsreader tem ~0,46 em por caractere)
function quebrarLinhas(texto: string, tamanho: number, maxLinhas: number) {
	const maxCaracteres = Math.floor((LARGURA - 2 * MARGEM) / (tamanho * 0.46));
	const linhas: string[] = [];
	let atual = '';
	for (const palavra of texto.split(/\s+/)) {
		const tentativa = atual ? `${atual} ${palavra}` : palavra;
		if (tentativa.length > maxCaracteres && atual) {
			linhas.push(atual);
			atual = palavra;
		} else {
			atual = tentativa;
		}
	}
	if (atual) linhas.push(atual);
	if (linhas.length > maxLinhas) {
		const cortadas = linhas.slice(0, maxLinhas);
		cortadas[maxLinhas - 1] = cortadas[maxLinhas - 1].replace(/[\s,.;:]*\S*$/, '') + '…';
		return cortadas;
	}
	return linhas;
}

export async function gerarImagemOg({ titulo, rotulo }: { titulo: string; rotulo?: string }) {
	const tamanho = titulo.length <= 45 ? 76 : titulo.length <= 90 ? 62 : 52;
	const linhas = quebrarLinhas(titulo, tamanho, 4);
	const altLinha = tamanho * 1.12;
	// Centraliza o bloco do título no espaço entre a assinatura e o rodapé
	const topo = 150 + (330 - linhas.length * altLinha) / 2 + tamanho * 0.8;

	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${LARGURA}" height="${ALTURA}">
	<rect width="100%" height="100%" fill="#faf9f5"/>
	<text x="${MARGEM}" y="112" font-family="Newsreader" font-size="36" fill="#141413">Henrique Abreu<tspan fill="#cc785c">.</tspan></text>
	${linhas
		.map(
			(l, i) =>
				`<text x="${MARGEM}" y="${topo + i * altLinha}" font-family="Newsreader" font-size="${tamanho}" letter-spacing="-1" fill="#141413">${escapar(l)}</text>`,
		)
		.join('\n\t')}
	<rect x="${MARGEM}" y="510" width="${LARGURA - 2 * MARGEM}" height="1" fill="#e6dfd8"/>
	<text x="${MARGEM}" y="566" font-family="Newsreader" font-size="28" fill="#6c6a64">henriqueabreu.github.io</text>
	${rotulo ? `<text x="${LARGURA - MARGEM}" y="566" text-anchor="end" font-family="Newsreader" font-size="28" fill="#a9583e">${escapar(rotulo)}</text>` : ''}
</svg>`;

	return sharp(Buffer.from(svg)).png().toBuffer();
}
