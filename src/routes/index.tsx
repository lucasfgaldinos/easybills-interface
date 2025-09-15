import { BrowserRouter, Route, Routes } from "react-router";
import { ToastContainer, type ToastContainerProps } from "react-toastify";
import { AuthProvider } from "../context/auth.context";
import { DashboardLayout } from "../layout/dashboard.layout";
import {
	DashboardScreen,
	HomeScreen,
	LoginScreen,
	TransactionsScreen,
} from "../screens";
import { PrivateRoutes } from "./private-routes.route";

export function AppRoutes() {
	const toastConfig: ToastContainerProps = {
		position: "top-right",
		autoClose: 3000,
		hideProgressBar: false,
		newestOnTop: true,
		closeOnClick: true,
		pauseOnHover: true,
		pauseOnFocusLoss: true,
		draggable: true,
		theme: "colored",
	};

	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path="/" element={<HomeScreen />} />
					<Route path="/login" element={<LoginScreen />} />

					<Route element={<PrivateRoutes />}>
						<Route element={<DashboardLayout />}>
							<Route path="/dashboard" element={<DashboardScreen />} />
							<Route path="/transactions" element={<TransactionsScreen />} />
						</Route>
					</Route>

					<Route path="*" element={<h2>Página não encontrada!</h2>} />
				</Routes>
				<ToastContainer {...toastConfig} />
			</AuthProvider>
		</BrowserRouter>
	);
}
