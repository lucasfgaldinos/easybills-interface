import { Calendar, DollarSign, Tag } from "lucide-react";
import { type ChangeEvent, useEffect, useId, useState } from "react";
import { Card, Input, Select, TransactionTypeSelector } from "../components";
import { getCategories } from "../services";
import type { Category, TransactionType } from "../types";

interface FormData {
	description: string;
	amount: number;
	date: string;
	categoryId: string;
	type: TransactionType;
}

const initialFormData: FormData = {
	description: "",
	amount: 0,
	date: "",
	categoryId: "",
	type: "expense",
};

export function TransactionFormScreen() {
	const selectTypeId = useId();
	const [categories, setCategories] = useState<Category[]>([]);
	const [formData, setFormData] = useState<FormData>(initialFormData);

	useEffect(() => {
		async function loadCategories(): Promise<void> {
			try {
				const data = await getCategories();

				setCategories(data);
			} catch (err) {
				console.error({ error: err });
			}
		}

		loadCategories();
	}, []);

	const filteredCategories = categories.filter((c) => c.type === formData.type);

	function handleTransactionType(itemType: TransactionType): void {
		setFormData((prev) => ({
			...prev,
			type: itemType,
		}));
	}

	function handleChange(
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	): void {
		const { name, value } = e.target;

		setFormData((prev) => ({ ...prev, [name]: value }));
	}

	function handleSubmit() {}

	return (
		<div className="container-app">
			<div className="max-w-2xl mx-auto">
				<h1 className="text-2xl mb-6 font-bold">Nova transação</h1>

				<Card>
					<form onSubmit={handleSubmit} className="flex flex-col gap-4">
						<div className="flex flex-col gap-2 mb-3">
							<label
								htmlFor={selectTypeId}
								className="font-bold text-sm text-text-muted"
							>
								Tipo de transação
							</label>
							<TransactionTypeSelector
								id={selectTypeId}
								value={formData.type}
								onChange={handleTransactionType}
							/>
						</div>

						<Input
							required
							placeholder="Ex: Mercado, Salário..."
							label="Descrição"
							name="description"
							value={formData.description}
							onChange={handleChange}
						/>

						<Input
							required
							placeholder="R$ 0,00"
							type="number"
							step="0.01"
							min="0.01"
							icon={<DollarSign size={18} />}
							label="Valor"
							name="amount"
							value={formData.amount}
							onChange={handleChange}
						/>

						<Input
							required
							type="date"
							icon={<Calendar size={18} />}
							label="Data"
							name="date"
							value={formData.date}
							onChange={handleChange}
							className="text-red-500"
						/>

						<Select
							label="Categoria"
							name="categoryId"
							value={formData.categoryId}
							onChange={handleChange}
							icon={<Tag size={18} />}
							required
							options={[
								{ value: "", label: "Selecione uma categoria" },
								...filteredCategories.map((c) => ({
									value: c.id,
									label: c.name,
								})),
							]}
						/>
					</form>
				</Card>
			</div>
		</div>
	);
}
