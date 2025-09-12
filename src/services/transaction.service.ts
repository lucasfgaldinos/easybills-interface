import type {
	Transaction,
	TransactionFilter,
	TransactionSummary,
} from "../types";
import { api } from "./api";

export async function getTransactions(
	filters?: Partial<TransactionFilter>,
): Promise<Transaction[]> {
	const response = await api.get<Transaction[]>("/transactions", {
		params: filters,
	});

	return response.data;
}

export async function getTransactionsSummary(
	month: number,
	year: number,
): Promise<TransactionSummary> {
	const response = await api.get<TransactionSummary>("/transactions/summary", {
		params: { month, year },
	});

	return response.data;
}
