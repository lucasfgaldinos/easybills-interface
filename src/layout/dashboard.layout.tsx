import { Outlet } from "react-router";
import { Footer, Header } from "../components";

export function DashboardLayout() {
	return (
		<div className="min-h-screen flex flex-col bg-bg-dark">
			<Header />

			<main className="grow">
				<Outlet />
			</main>

			<Footer />
		</div>
	);
}
