import { AlertCircle, Loader, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Card, Input, MonthYearSelect } from "../components";
import { getTransactions } from "../services";
import type { Transaction } from "../types";

export function TransactionsScreen() {
	const navigate = useNavigate();
	const currentDate = new Date();
	const [year, setYear] = useState<number>(currentDate.getFullYear());
	const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const [transactions, setTransactions] = useState<Transaction[]>([]);

	async function getUserTransactions(): Promise<void> {
		try {
			setLoading(true);
			setError("");
			const data = await getTransactions({ month, year });

			setTransactions(data);
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

	return (
		<div className="container-app">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
				<h1 className="text-2xl font-bold mb-4 md:mb-0 text-primary-base">
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
				) : transactions.length === 0 ? (
					<div className="text-center py-12">
						<p className="text-accent-base">Nenhuma transação encontrada.</p>
					</div>
				) : (
					<div>Aqui estão as transações!</div>
				)}
			</Card>
		</div>
	);
}
