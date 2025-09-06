import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "../screens";

export function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="*" element={<h2>Página não encontrada!</h2>} />
			</Routes>
		</BrowserRouter>
	);
}
