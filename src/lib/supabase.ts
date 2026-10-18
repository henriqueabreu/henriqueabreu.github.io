// Leitura do Supabase pela API REST (PostgREST), só com fetch: sem SDK.
// Usa a chave pública (publishable/anon). O que ela enxerga é decidido pelas
// políticas de RLS em supabase/schema.sql: só categorias e posts publicados.

export interface PostDoBanco {
	slug: string;
	titulo: string;
	descricao: string;
	conteudo: string;
	tags: string[];
	publicado_em: string;
	atualizado_em: string | null;
	categoria: { slug: string } | null;
}

export interface CategoriaDoBanco {
	slug: string;
	nome: string;
	descricao: string | null;
}

export function configSupabase() {
	const url = process.env.SUPABASE_URL;
	const chave = process.env.SUPABASE_ANON_KEY;
	return url && chave ? { url: url.replace(/\/$/, ''), chave } : null;
}

export async function consultar<T>(caminho: string): Promise<T[]> {
	const config = configSupabase();
	if (!config) throw new Error('SUPABASE_URL e SUPABASE_ANON_KEY não configurados');
	const headers: Record<string, string> = { apikey: config.chave };
	// Chaves anon antigas são JWT e também vão no Authorization; as novas (sb_publishable_) não
	if (config.chave.startsWith('eyJ')) headers.Authorization = `Bearer ${config.chave}`;
	const resposta = await fetch(`${config.url}/rest/v1/${caminho}`, { headers });
	if (!resposta.ok) {
		throw new Error(`Supabase respondeu ${resposta.status} em ${caminho}: ${await resposta.text()}`);
	}
	return resposta.json();
}

export const buscarPosts = () =>
	consultar<PostDoBanco>(
		'posts?select=slug,titulo,descricao,conteudo,tags,publicado_em,atualizado_em,categoria:categorias(slug)&order=publicado_em.desc',
	);

export const buscarCategorias = () => consultar<CategoriaDoBanco>('categorias?select=slug,nome,descricao&order=nome');
