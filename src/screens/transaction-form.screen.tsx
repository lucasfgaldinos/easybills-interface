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
		<div>
			<div>
				<h1>Nova transação</h1>

				<Card>
					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<label htmlFor={selectTypeId}>Tipo de transação</label>
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
