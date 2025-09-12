import { ArrowUp, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, MonthYearSelect } from "../components";
import { getTransactionsSummary } from "../services";
import type { TransactionSummary } from "../types";
import { formatCurrency } from "../utils";

const initialSummary: TransactionSummary = {
	totalExpenses: 0,
	totalIncomes: 0,
	balance: 0,
	expensesByCategory: [],
};

export function DashboardScreen() {
	const currentDate = new Date();
	const [year, setYear] = useState<number>(currentDate.getFullYear());
	const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);
	const [summary, setSummary] = useState<TransactionSummary>(initialSummary);

	useEffect(() => {
		async function getUserTransactionsSummary() {
			try {
				const responseData = await getTransactionsSummary(month, year);

				setSummary(responseData);
			} catch (_) {
				console.error("Error making API request.");
			}
		}

		getUserTransactionsSummary();
	}, [month, year]);

	return (
		<div className="container-app py-6">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
				<h1 className="text-2xl font-bold mb-4 md:mb-0">Tela de Dashboard</h1>
				<MonthYearSelect
					month={month}
					year={year}
					onMonthChange={setMonth}
					onYearChange={setYear}
				/>
			</div>

			<div className="grid gap-4 grid-cols-1 md:grid-cols-3">
				<Card
					title={`Saldo`}
					icon={<Wallet size={26} className="text-primary-light" />}
					hover
					glowEffect={summary.balance > 0}
				>
					<p
						className={`text-2xl font-bold
                  ${summary.balance > 0 ? "text-primary-light" : "text-text-muted"}
               `}
					>
						{formatCurrency(summary.balance / 100)}
					</p>
				</Card>

				<Card
					title={`Receitas`}
					icon={<ArrowUp size={26} className="text-blue-base" />}
					hover
				>
					<p
						className={`text-2xl font-bold
                  ${summary.totalIncomes > 0 ? "text-blue-base" : "text-text-muted"}
               `}
					>
						{formatCurrency(summary.totalIncomes / 100)}
					</p>
				</Card>

				<Card
					title={`Despesas`}
					icon={<Wallet size={26} className="text-error-base" />}
					hover
				>
					<p
						className={`text-2xl font-bold
                  ${summary.totalExpenses > 0 ? "text-error-base" : "text-text-muted"}
               `}
					>
						{formatCurrency(summary.totalExpenses / 100)}
					</p>
				</Card>
			</div>
		</div>
	);
}
