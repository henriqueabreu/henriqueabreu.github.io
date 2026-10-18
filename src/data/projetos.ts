// Lista de projetos exibida em /projetos. Para adicionar um, acrescente um item aqui.
// `link` é opcional: deixe de fora enquanto o projeto não estiver publicado.

export interface Projeto {
	nome: string;
	descricao: string;
	tecnologias: string[];
	link?: string;
}

export const PROJETOS: Projeto[] = [
	{
		nome: 'rag-estudo',
		descricao:
			'RAG mínimo em Python puro, construído etapa por etapa para estudo: chunking, embeddings, recuperação e geração, cada escolha medida contra um conjunto dourado de perguntas.',
		tecnologias: ['Python', 'numpy', 'embeddings', 'Ollama'],
	},
];
