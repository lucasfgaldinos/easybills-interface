import type { Category, CategorySummary } from "./category.types";

export type TransactionType = "expense" | "income";

export interface Transaction {
	userId: string;
	id: string;
	description: string;
	amount: number;
	date: string | Date;
	categoryId: string;
	category: Category;
	type: TransactionType;
	createdAt: string | Date;
	updatedAt: string | Date;
}

export interface TransactionFilter {
	month: number;
	year: number;
	categoryId?: string;
	type?: TransactionType;
}

export interface TransactionSummary {
	totalExpenses: number;
	totalIncomes: number;
	balance: number;
	expensesByCategory: CategorySummary[];
}

export interface MonthlyItem {
	name: string;
	expenses: number;
	income: number;
}
