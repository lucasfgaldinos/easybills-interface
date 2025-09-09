import { useEffect } from "react";
import { useNavigate } from "react-router";
import { GoogleLoginButton } from "../components";
import { useAuth } from "../context/auth.context";

export function LoginScreen() {
	const navigate = useNavigate();
	const { signWithGoogle, authState } = useAuth();
	async function handleLogin() {
		try {
			await signWithGoogle();
		} catch (_) {
			console.error("Error trying to log in with Google!");
		}
	}

	useEffect(() => {
		if (authState.user && !authState.loading) {
			navigate("/dashboard");
		}
	}, [authState.user, authState.loading, navigate]);

	return (
		<div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<header>
					<h1 className="text-center text-3xl font-bold text-primary-base">
						EasyBills
					</h1>
					<p className="mt-2 text-center text-text-light">
						Gerencie suas finanças de forma simples, intuitiva e eficiente
					</p>
				</header>

				<main className="mt-8 bg-neutral-dark/20 px-4 py-8 shadow-lg rounded-lg sm:px-10 space-y-6">
					<section className="mb-6">
						<h2 className="text-lg text-text-light font-bold">
							Faça login para continuar
						</h2>
						<p className="mt-2 text-sm text-text-light">
							Acesse sua conta para começar a gerenciar suas finanças
						</p>
					</section>

					<GoogleLoginButton isLoading={false} onClick={handleLogin} />

					{authState.error && (
						<div className="p-4 rounded-sm bg-error-base/10">
							<p className="text-sm text-error-base">
								Erro ao tentar logar com o Google! Por favor, tente novamente.
							</p>
						</div>
					)}

					<footer className="mt-6">
						<p className="mt-2 text-sm text-text-light">
							Ao fazer login, você concorda com nossos{" "}
							<a
								className="hover:text-blue-base cursor-pointer transition-colors underline"
								href="/login"
							>
								termos de uso
							</a>{" "}
							e{" "}
							<a
								className="hover:text-blue-base cursor-pointer transition-colors underline"
								href="/login"
							>
								política de privacidade
							</a>
							.
						</p>
					</footer>
				</main>
			</div>
		</div>
	);
}
