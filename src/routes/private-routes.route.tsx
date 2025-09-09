import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/auth.context";

export function PrivateRoutes() {
	const { authState } = useAuth();

	if (!authState.user) {
		return <Navigate to={"/login"} replace />;
	}

	return <Outlet />;
}
