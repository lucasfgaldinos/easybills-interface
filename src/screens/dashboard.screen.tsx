import {
	ChartColumn,
	ChartPie,
	TrendingDown,
	TrendingUp,
	Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Pie,
	PieChart,
	Rectangle,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { Card, MonthYearSelect } from "../components";
import { getTransactionsMonthly, getTransactionsSummary } from "../services";
import type { MonthlyItem, TransactionSummary } from "../types";
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
	const [monthlyItemsData, setMonthlyItemsData] = useState<MonthlyItem[]>([]);

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

	useEffect(() => {
		async function getUserTransactionMonthly() {
			try {
				const responseData = await getTransactionsMonthly(month, year, 4);

				setMonthlyItemsData(responseData.history);
				console.log(responseData.history);
			} catch (_) {
				console.error("Error making API request.");
			}
		}

		getUserTransactionMonthly();
	}, [month, year]);

	function renderPieChartLabel({
		categoryName,
		percent,
		// biome-ignore lint: false positive
	}: any): string {
		return `${categoryName} - ${(percent * 100).toFixed(1)}%`;
	}

	function formatTooltipValue(value: number | string): string {
		return formatCurrency(typeof value === "number" ? value / 100 : 0);
	}

	return (
		<div className="container-app py-6">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
				<h1 className="text-2xl font-bold mb-4 md:mb-0">Dashboard</h1>
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
					icon={<TrendingUp size={26} className="text-blue-base" />}
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
					icon={<TrendingDown size={26} className="text-error-base" />}
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

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 mt-4 min-h-96">
				<Card
					hover
					title="Despesas por categoria"
					icon={<ChartPie size={26} className="text-primary-light" />}
				>
					{summary.expensesByCategory.length > 0 ? (
						<div className="h-72 mt-2">
							<ResponsiveContainer>
								<PieChart>
									<Pie
										data={summary.expensesByCategory}
										cx="50%"
										cy="50%"
										outerRadius={80}
										dataKey="amount"
										nameKey="categoryName"
										label={renderPieChartLabel}
									>
										{summary.expensesByCategory.map((entry) => (
											<Cell key={entry.categoryId} fill={entry.categoryColor} />
										))}
									</Pie>
									<Tooltip formatter={formatTooltipValue} />
								</PieChart>
							</ResponsiveContainer>
						</div>
					) : (
						<div className="flex items-center justify-center h-64 text-accent-base">
							<p>Nenhuma despesa registrada nesse período.</p>
						</div>
					)}
				</Card>

				<Card
					className="min-h-80"
					title="Histórico"
					icon={<ChartColumn size={26} className="text-primary-light" />}
				>
					<div className="h-72 mt-4">
						{monthlyItemsData.length > 0 ? (
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={monthlyItemsData} margin={{ left: 20 }}>
									<CartesianGrid strokeDasharray="3 3" stroke="invisible" />
									<XAxis
										dataKey="name"
										stroke="var(--color-text-light)"
										tick={{
											style: { textTransform: "capitalize", fontSize: 12 },
										}}
									/>
									<YAxis
										stroke="var(--color-text-muted)"
										tickFormatter={(value) => formatCurrency(value / 100)}
										tick={{ style: { fontSize: 12 } }}
									/>
									<Tooltip
										formatter={(value) => formatCurrency(Number(value) / 100)}
										contentStyle={{
											backgroundColor: "var(--color-neutral-dark)",
											borderColor: "var(--color-neutral-base)",
										}}
										labelStyle={{ textTransform: "capitalize" }}
									/>
									<Bar
										dataKey="income"
										name="Receitas"
										fill="var(--color-blue-base)"
										activeBar={
											<Rectangle
												fill="var(--color-blue-dark)"
												stroke="var(--color-blue-base)"
											/>
										}
									/>
									<Bar
										dataKey="expenses"
										name="Despesas"
										fill="var(--color-error-base)"
										activeBar={
											<Rectangle
												fill="var(--color-error-dark)"
												stroke="var(--color-error-base)"
											/>
										}
									/>
								</BarChart>
							</ResponsiveContainer>
						) : (
							<div className="flex items-center justify-center h-64 text-accent-base">
								<p>Nenhuma despesa ou entrada registrada nesse período.</p>
							</div>
						)}
					</div>
				</Card>
			</div>
		</div>
	);
}
