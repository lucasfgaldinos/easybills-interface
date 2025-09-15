export function formatCurrency(value: number): string {
	return new Intl.NumberFormat("pt-BR", {
		currency: "BRL",
		style: "currency",
	}).format(value);
}

export function formatDate(date: string | Date): string {
	const dateObj = date instanceof Date ? date : new Date(date);

	return new Intl.DateTimeFormat("pt-BR", {
		dateStyle: "short",
	}).format(dateObj);
}
