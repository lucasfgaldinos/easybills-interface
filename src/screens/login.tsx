import { GoogleLoginButton } from "../components";

export function Login() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<header>
					<h1 className="text-center text-3xl font-bold text-emerald-600">
						EasyBills
					</h1>
					<p className="mt-2 text-center text-white">
						Gerencie suas finanças de forma simples, intuitiva e eficiente
					</p>
				</header>

				<main className="mt-8 bg-gray-950 px-4 py-8 shadow-md rounded-lg sm:px-10 space-y-6">
					<section className="mb-6">
						<h2 className="text-lg text-white font-bold">
							Faça login para continuar
						</h2>
						<p className="mt-2 text-sm text-white">
							Acesse sua conta para começar a gerenciar suas finanças
						</p>
					</section>

					<GoogleLoginButton
						isLoading={false}
						onClick={() => console.log("olá")}
					/>

					<footer className="mt-6">
						<p className="mt-2 text-sm text-white">
							Ao fazer login, você concorda com nossos termos de uso e política
							de privacidade.
						</p>
					</footer>
				</main>
			</div>
		</div>
	);
}
