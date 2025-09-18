import {
	AlertCircle,
	ArrowDown,
	ArrowUp,
	Loader,
	Plus,
	Search,
	Trash2,
} from "lucide-react";
import { type ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Button, Card, Input, MonthYearSelect } from "../components";
import { deleteTransaction, getTransactions } from "../services";
import type { Transaction } from "../types";
import { formatCurrency, formatDate } from "../utils";

export function TransactionsScreen() {
	const navigate = useNavigate();
	const currentDate = new Date();
	const [year, setYear] = useState<number>(currentDate.getFullYear());
	const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [filteredTransactions, setFilteredTransactions] = useState<
		Transaction[]
	>([]);
	const [deletingId, setDeletingId] = useState<string>("");
	const [searchText, setSearchText] = useState<string>("");

	async function getUserTransactions(): Promise<void> {
		try {
			setLoading(true);
			setError("");
			const data = await getTransactions({ month, year });

			setTransactions(data);
			setFilteredTransactions(data);
		} catch (_) {
			setError("Algo deu errado por aqui!");
		} finally {
			setLoading(false);
		}
	}

	// biome-ignore lint: false positive
	useEffect(() => {
		getUserTransactions();
	}, [month, year]);

	async function handleDelete(id: string): Promise<void> {
		try {
			setDeletingId(id);

			await deleteTransaction(id);

			const updatedTransactions = transactions.filter((t) => {
				return t.id !== id;
			});
			setTransactions(updatedTransactions);
			toast.success("Transação deletada com sucesso!");
		} catch (err) {
			console.error({ error: err });
			toast.error("Erro ao deletar transação!");
		} finally {
			setDeletingId("");
		}
	}

	function confirmDelete(id: string): void {
		if (deletingId) {
			return;
		}
		if (window.confirm("Tem certeza que deseja deletar essa transação?")) {
			handleDelete(id);
		}
	}

	function handleSearchChange(event: ChangeEvent<HTMLInputElement>): void {
		setSearchText(event.target.value);
		setFilteredTransactions(
			transactions.filter((t) =>
				t.description.toLowerCase().includes(event.target.value.toLowerCase()),
			),
		);
	}

	return (
		<div className="container-app">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
				<h1 className="text-2xl font-bold mb-4 md:mb-0 text-text-light">
					Transações
				</h1>

				<Button onClick={() => navigate("/transactions/create")}>
					<Plus size={18} /> Nova transação
				</Button>
			</div>

			<Card className="mb-6">
				<MonthYearSelect
					month={month}
					year={year}
					onMonthChange={setMonth}
					onYearChange={setYear}
				/>
			</Card>

			<Card className="mb-6">
				<Input
					label="Busque por transações"
					placeholder="Buscar transações..."
					icon={<Search size={18} />}
					fullWidth
					onChange={handleSearchChange}
					value={searchText}
				/>
			</Card>

			<Card className="overflow-hidden">
				{loading ? (
					<div className="py-12 flex items-center justify-center gap-4">
						<Loader size={34} className="animate-spin text-primary-light" />
					</div>
				) : error ? (
					<div className="py-12 text-center">
						<AlertCircle size={38} className="text-error-base m-auto mb-4" />
						<p className="text-text-light mb-6">{error}</p>
						<Button
							onClick={getUserTransactions}
							variant="secondary"
							className="mx-auto"
						>
							Tentar novamente
						</Button>
					</div>
				) : filteredTransactions.length === 0 ? (
					<div className="text-center py-12">
						<p className="text-accent-base mb-6">
							Nenhuma transação encontrada.
						</p>
						<Button
							onClick={() => navigate("/transactions/create")}
							variant="primary"
							className="mx-auto"
						>
							<Plus size={18} className="text-text-light" />
							Adicionar transação
						</Button>
					</div>
				) : (
					<div className="overflow-x-auto">
						<table className="w-full divide-y divide-neutral-light min-h-full">
							<thead>
								<tr>
									<th
										scope="col"
										className="p-3 text-left text-xs font-medium text-text-muted uppercase"
									>
										Descrição
									</th>
									<th
										scope="col"
										className="p-3 text-left text-xs font-medium text-text-muted uppercase"
									>
										Data
									</th>
									<th
										scope="col"
										className="p-3 text-left text-xs font-medium text-text-muted uppercase"
									>
										Categoria
									</th>
									<th
										scope="col"
										className="p-3 text-left text-xs font-medium text-text-muted uppercase"
									>
										Valor
									</th>
									<th
										scope="col"
										className="p-3 text-left text-xs font-medium text-text-muted uppercase"
									/>
								</tr>
							</thead>

							<tbody className="divide-y divide-neutral-light">
								{filteredTransactions.map((transaction) => (
									<tr key={transaction.id} className="hover:bg-neutral-light">
										<td className="px-3 py-5 text-sm whitespace-nowrap">
											<div className="flex items-center">
												<div className="mr-2">
													{transaction.type === "income" ? (
														<ArrowUp size={18} className="text-primary-light" />
													) : (
														<ArrowDown size={18} className="text-error-base" />
													)}
												</div>
												<span className="text-sm font-medium text-text-light">
													{transaction.description}
												</span>
											</div>
										</td>

										<td className="px-3 py-5 text-sm whitespace-nowrap">
											<p className="text-text-light">
												{formatDate(transaction.date)}
											</p>
										</td>

										<td className="px-3 py-5 text-sm whitespace-nowrap">
											<div className="flex items-center">
												<div
													className="w-2.5 h-2.5 rounded-full mr-2"
													style={{
														backgroundColor: `${transaction.category.color}`,
													}}
												/>
												<span className="text-sm text-text-light">
													{transaction.category.name}
												</span>
											</div>
										</td>

										<td className="px-3 py-5 text-sm whitespace-nowrap">
											<span
												className={`${transaction.type === "income" ? "text-primary-light" : "text-error-base"}`}
											>
												{formatCurrency(transaction.amount / 100)}
											</span>
										</td>

										<td className="px-3 py-5 text-sm whitespace-nowrap">
											<button
												className={`${deletingId ? "hover:bg-transparent active:bg-transparent cursor-not-allowed p-2 rounded-full" : "hover:bg-error-dark/30 p-2 rounded-full cursor-pointer active:bg-error-dark/70 transition-colors"} `}
												type="button"
												onClick={() => confirmDelete(transaction.id)}
												aria-label="Deletar transação"
												disabled={deletingId.length > 0}
											>
												{deletingId === transaction.id ? (
													<span className="inline-block w-4 h-4 border border-text-light border-t-transparent rounded-full animate-spin" />
												) : (
													<Trash2 size={20} className="text-error-base" />
												)}
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</Card>
		</div>
	);
}
