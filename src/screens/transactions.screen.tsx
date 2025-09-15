import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Card, Input, MonthYearSelect } from "../components";

export function TransactionsScreen() {
	const navigate = useNavigate();
	const currentDate = new Date();
	const [year, setYear] = useState<number>(currentDate.getFullYear());
	const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);

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

			<Card>
				<Input
					label="Busque por transações"
					placeholder="Buscar transações..."
					icon={<Search size={18} />}
					fullWidth
				/>
			</Card>
		</div>
	);
}
