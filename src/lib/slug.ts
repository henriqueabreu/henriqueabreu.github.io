// "Machine Learning" → "machine-learning": usado nos endereços das páginas de tag.
export function slugificar(texto: string) {
	return texto
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}
