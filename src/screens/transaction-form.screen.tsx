import { useEffect, useId, useState } from "react";
import { Card, TransactionTypeSelector } from "../components";
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
	const [_categories, setCategories] = useState<Category[]>([]);
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
	});

	function handleTransactionType(itemType: TransactionType): void {
		setFormData((prev) => ({
			...prev,
			type: itemType,
		}));
	}

	function handleSubmit() {}

	return (
		<div>
			<div>
				<h1>Nova transação</h1>

				<Card>
					<form onSubmit={handleSubmit}>
						<div>
							<label htmlFor={selectTypeId}>Tipo de transação</label>
							<TransactionTypeSelector
								id={selectTypeId}
								value={formData.type}
								onChange={handleTransactionType}
							/>
						</div>
					</form>
				</Card>
			</div>
		</div>
	);
}
