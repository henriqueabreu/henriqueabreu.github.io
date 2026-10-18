// Lista de projetos exibida em /projetos (e os `destaque` na página inicial).
// Para adicionar um, acrescente um item aqui.
// `link` é opcional: deixe de fora enquanto o projeto não estiver publicado.

export interface Projeto {
	nome: string;
	descricao: string;
	tecnologias: string[];
	status: 'Em andamento' | 'Estudo' | 'Concluído';
	destaque?: boolean;
	link?: string;
}

export const PROJETOS: Projeto[] = [
	{
		nome: 'howia',
		descricao:
			'Sistema de gestão de projetos com coworking de agentes: pessoas e agentes de IA dividindo o mesmo espaço de trabalho.',
		tecnologias: ['Vue', 'Docker', 'Agentes de IA'],
		status: 'Em andamento',
		destaque: true,
	},
	{
		nome: 'product-owner-ai',
		descricao: 'Agente de IA treinado para atuar como Product Owner: refinar ideias, escrever histórias e priorizar backlog.',
		tecnologias: ['LLMs', 'Agentes de IA', 'Produto'],
		status: 'Em andamento',
		destaque: true,
	},
	{
		nome: 'rag-estudo',
		descricao:
			'RAG mínimo em Python puro, construído etapa por etapa para estudo: chunking, embeddings, recuperação e geração, cada escolha medida contra um conjunto dourado de perguntas.',
		tecnologias: ['Python', 'numpy', 'embeddings', 'Ollama'],
		status: 'Estudo',
		destaque: true,
	},
];
