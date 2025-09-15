import type { Category } from "../types";
import { api } from "./api";

export async function getCategories(): Promise<Category[]> {
	const response = await api.get<Category[]>("/categories");

	return response.data;
}
