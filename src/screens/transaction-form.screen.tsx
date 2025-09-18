import {
	AlertCircle,
	Calendar,
	DollarSign,
	Loader2,
	Save,
	Tag,
} from "lucide-react";
import {
	type ChangeEvent,
	type FormEvent,
	useEffect,
	useId,
	useState,
} from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
	Button,
	Card,
	Input,
	Select,
	TransactionTypeSelector,
} from "../components";
import { createTransaction, getCategories } from "../services";
import type { Category, CreateTransactionDTO, TransactionType } from "../types";

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
	const navigate = useNavigate();
	const selectTypeId = useId();
	const [categories, setCategories] = useState<Category[]>([]);
	const [formData, setFormData] = useState<FormData>(initialFormData);
	const [formError, setFormError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

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

	function handleCancel(): void {
		navigate("/transactions");
	}

	function validateForm(): boolean {
		if (
			!formData.description ||
			!formData.amount ||
			!formData.date ||
			!formData.categoryId
		) {
			setFormError("Preencha todos os campos!");
			return false;
		}

		if (formData.amount <= 0) {
			setFormError("O valor deve ser maior que 0!");
			return false;
		}

		return true;
	}

	async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
		setLoading(true);
		e.preventDefault();

		try {
			if (!validateForm()) {
				return;
			}

			const transactionData: CreateTransactionDTO = {
				description: formData.description,
				amount: Number(formData.amount),
				categoryId: formData.categoryId,
				date: `${formData.date}T15:00:00.000Z`,
				type: formData.type,
			};

			await createTransaction(transactionData);
			toast.success("Transação salva com sucesso!");
			navigate("/transactions");
		} catch (_) {
			toast.error(
				"Erro ao salvar a transação! Por favor, verifique os campos e tente novamente.",
			);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="container-app">
			<div className="max-w-2xl mx-auto">
				<h1 className="text-2xl mb-6 font-bold">Nova transação</h1>

				<Card>
					{formError && (
						<div className="bg-error-base/50 w-full mb-4 rounded-md p-2 flex gap-2 items-center justify-center">
							<AlertCircle />
							<p className="text-text-light text-sm text-center">{formError}</p>
						</div>
					)}

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
							placeholder="Ex: Mercado, Salário..."
							label="Descrição"
							name="description"
							value={formData.description}
							onChange={handleChange}
						/>

						<Input
							placeholder="R$ 0,00"
							type="number"
							step="0.01"
							icon={<DollarSign size={18} />}
							label="Valor"
							name="amount"
							value={formData.amount}
							onChange={handleChange}
						/>

						<Input
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
							options={[
								{ value: "", label: "Selecione uma categoria" },
								...filteredCategories.map((c) => ({
									value: c.id,
									label: c.name,
								})),
							]}
						/>

						<div className="flex justify-end items-center gap-4 mt-7">
							<Button
								disabled={loading}
								type="button"
								variant="secondary"
								onClick={handleCancel}
							>
								Cancelar
							</Button>
							<Button disabled={loading} type="submit" variant="outline">
								{loading ? (
									<Loader2 size={18} className="animate-spin" />
								) : (
									<Save size={18} />
								)}
								Salvar
							</Button>
						</div>
					</form>
				</Card>
			</div>
		</div>
	);
}
