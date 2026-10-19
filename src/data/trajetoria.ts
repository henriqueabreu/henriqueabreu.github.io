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
		periodo: '12+ anos',
		titulo: 'Desenvolvedor, Product Owner e Product Manager',
		lugar: 'Sistemas financeiros e integrações bancárias',
		descricao: 'Contas a pagar e a receber, migração de sistemas e APIs de integração; liderança de times multidisciplinares com Scrum.',
	},
	{
		periodo: 'Em curso',
		titulo: 'Pós-graduação em Engenharia de IA Aplicada',
		lugar: 'Ênfase em Engenharia de Software',
	},
	{
		periodo: '2014',
		titulo: 'Graduação em Engenharia de Computação',
		lugar: 'Instituto Federal do Ceará (IFCE)',
	},
];

export const FERRAMENTAS = ['Python', 'PHP', 'Java', 'JavaScript', 'TypeScript', 'Laravel', 'Vue', 'Docker', 'LLMs', 'RAG', 'Agentes de IA', 'Astro'];

// Seção "Como trabalho" em /sobre.
export const COMO_TRABALHO = [
	{
		rotulo: 'Pessoas',
		titulo: 'Times que crescem junto',
		texto: 'Lidero equipes multidisciplinares pensando além da entrega: cada projeto é chance de evoluir competências técnicas e comportamentais, num ambiente de aprendizado contínuo.',
	},
	{
		rotulo: 'Autonomia',
		titulo: 'Documentação que liberta',
		texto: 'Escrevo documentação técnica e conduzo treinamentos para que o time use e mantenha as soluções com independência e eficiência.',
	},
	{
		rotulo: 'Processos',
		titulo: 'Menos atrito, mais automação',
		texto: 'Melhoria de processos e automação de sistemas para ganhar performance e reduzir custos operacionais.',
	},
	{
		rotulo: 'Entrega',
		titulo: 'Valor em incrementos',
		texto: 'Gestão ágil de projetos com entregas incrementais e adaptativas, sempre ligadas às metas estratégicas do negócio.',
	},
];

export const CERTIFICACOES = ['PSM I · Scrum.org'];
