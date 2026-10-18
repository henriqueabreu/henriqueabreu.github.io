// O que aparece na página inicial: o terminal do topo e a seção "Agora".
// Atualize de tempos em tempos; a data de `AGORA_ATUALIZADO` aparece no site.

export const TERMINAL: { cmd?: string; out?: string }[] = [
	{ cmd: 'whoami' },
	{ out: 'henrique abreu, engenheiro de computação (IFCE)' },
	{ cmd: 'cat agora.txt' },
	{ out: '- pós em Engenharia de IA Aplicada' },
	{ out: '- construindo o howia e o product-owner-ai' },
	{ out: '- estudando RAG do zero, em Python puro' },
	{ cmd: 'pwd' },
	{ out: '/brasil/bahia/salvador' },
];

export const AGORA_ATUALIZADO = 'outubro de 2026';

export const AGORA = [
	{
		rotulo: 'Estudando',
		titulo: 'Pós em Engenharia de IA Aplicada',
		texto: 'Com ênfase em Engenharia de Software: como levar modelos de linguagem para sistemas que precisam funcionar todo dia.',
	},
	{
		rotulo: 'Construindo',
		titulo: 'Agentes que trabalham com pessoas',
		texto: 'O howia, um espaço de projetos onde pessoas e agentes de IA dividem as tarefas, e o product-owner-ai.',
	},
	{
		rotulo: 'Escrevendo',
		titulo: 'RAG, etapa por etapa',
		texto: 'Um RAG mínimo em Python puro, montado peça por peça e medido contra perguntas de referência. Os aprendizados viram posts aqui.',
	},
];
