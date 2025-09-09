import { useEffect } from "react";
import { api } from "../services/api";

export function DashboardScreen() {
	useEffect(() => {
		async function getTransactions() {
			try {
				const response = await api.get("/transactions");

				console.log(response);
			} catch (_) {
				console.error("Error making API request.");
			}
		}

		getTransactions();
	}, []);

	return (
		<div>
			<h1>Tela de Dashboard</h1>
		</div>
	);
}
