import { BrowserRouter, Route, Routes } from "react-router";
import { Home, Login } from "../screens";

export function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="*" element={<h2>Página não encontrada!</h2>} />
			</Routes>
		</BrowserRouter>
	);
}
