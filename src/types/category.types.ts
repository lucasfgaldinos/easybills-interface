import type { TransactionType } from "./transaction.types";

export interface Category {
	id: string;
	color: string;
	name: string;
	type: TransactionType;
}

export interface CategorySummary {
	categoryId: string;
	categoryName: string;
	categoryColor: string;
	amount: number;
	percentage: number;
}
