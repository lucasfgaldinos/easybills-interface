import { useEffect, useState } from "react";
import { MonthYearSelect } from "../components";
import { api } from "../services/api";

export function DashboardScreen() {
	const currentDate = new Date();
	const [year, setYear] = useState<number>(currentDate.getFullYear());
	const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);

	useEffect(() => {
		async function getTransactions() {
			try {
				const response = await api.get("/transactions?month=09&year=2025");

				console.log(response);
			} catch (_) {
				console.error("Error making API request.");
			}
		}

		getTransactions();
	}, []);

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
		</div>
	);
}
