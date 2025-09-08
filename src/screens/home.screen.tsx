import { CreditCard, List, TrendingUp, Wallet } from "lucide-react";
import type { JSX } from "react";
import { Button } from "../components";

interface CardContentProps {
	icon: JSX.Element;
	title: string;
	description: string;
}

export function Home() {
	const cardContent: ReadonlyArray<CardContentProps> = [
		{
			icon: <Wallet className="w-8 h-8 text-primary-light" />,
			title: "Controle financeiro",
			description:
				"Monitore suas despesas e receitas em um só lugar, com uma interface intuitiva e fácil de usar.",
		},
		{
			icon: <TrendingUp className="w-8 h-8 text-primary-light" />,
			title: "Relatórios",
			description:
				"Visualize gráficos com seus gastos e entenda para onde seu dinheiro está indo.",
		},
		{
			icon: <List className="w-8 h-8 text-primary-light" />,
			title: "Categoria personalizada",
			description:
				"Organize suas transações em categorias para melhor análise.",
		},
		{
			icon: <CreditCard className="w-8 h-8 text-primary-light" />,
			title: "Transações ilimitadas",
			description:
				"Adicione quantas transações quiser e mantenha um histórico completo de suas finanças.",
		},
	];

	return (
		<div className="min-h-screen">
			<div className="container-app">
				<section className="py-12 md:py-20">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
						<div>
							<h1 className="text-4xl md:text-5xl font-bold text-text-light mb-6">
								Gerencie suas finanças com o{" "}
								<span className="text-primary-base">EasyBills</span>
							</h1>
							<p className="text-lg text-text-light mb-8">
								Uma plataforma simpes e eficiente para controlar suas despesas e
								receitas. Organize suas finanças pessoais ou do seu negócio com
								facilidade.
							</p>
							<div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
								<Button>Começar agora</Button>
							</div>
						</div>
					</div>
				</section>

				<section className="py-12 md:py-20 bg-neutral-dark/50 rounded-xl">
					<div className="container-app">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold text-primary-base mb-4">
								Recursos do EasyBills
							</h2>
							<p className="text-lg text-text-light max-w-2xl mx-auto">
								Nossa plataforma oferece tudo o que você precisa para manter
								suas finanças organizadas.
							</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
							{cardContent.map((cardContent) => (
								<div
									key={cardContent.title}
									className="bg-neutral-base/50 p-6 rounded-xl shadow-lg"
								>
									<div className="mb-4 bg-primary-dark/10 p-3 rounded-full inline-block">
										{cardContent.icon}
									</div>
									<h3 className="text-xl font-bold text-text-light mb-2">
										{cardContent.title}
									</h3>
									<p className="text-text-muted">{cardContent.description}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				<section className="py-12 md:py-20">
					<div className="bg-neutral-dark/50 p-8 md:p-12 rounded-xl text-center border border-neutral-light">
						<h2 className="text-2xl md:text-3xl font-bold text-text-light mb-4">
							Vamos começar a organizar as suas finanças?
						</h2>
						<p className="text-text-muted max-w-2xl mx-auto mb-8">
							Comece a usar o EasyBills hoje mesmo e tenha o controle total
							sobre seu dinheiro. É intuitivo e fácil de usar!
						</p>
						<Button className="mx-auto">Criar conta</Button>
					</div>
				</section>

				<footer className="border-t border-neutral-light py-12 md:py-20">
					<h3 className="text-primary-base text-xl font-bold">EasyBills</h3>
					<p className="text-text-light text-sm">
						© 2025 - Todos os direitos reservados
					</p>
				</footer>
			</div>
		</div>
	);
}
