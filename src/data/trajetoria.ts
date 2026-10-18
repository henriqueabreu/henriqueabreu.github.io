// Linha do tempo exibida em /sobre, da mais recente para a mais antiga.

export interface Etapa {
	periodo: string;
	titulo: string;
	lugar: string;
	descricao?: string;
}

export const TRAJETORIA: Etapa[] = [
	{
		periodo: 'Hoje',
		titulo: 'Projetos com agentes de IA',
		lugar: 'Independente',
		descricao: 'Construindo o howia e o product-owner-ai, e estudando RAG do zero.',
	},
	{
		periodo: '2014',
		titulo: 'Graduação em Engenharia de Computação',
		lugar: 'Instituto Federal do Ceará (IFCE)',
	},
];

export const FERRAMENTAS = ['Python', 'Java', 'Vue', 'TypeScript', 'Docker', 'LLMs', 'RAG', 'Agentes de IA', 'Astro'];
