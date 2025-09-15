import { Link } from "react-router";

export function Header() {
	return (
		<header>
			<h1>Meu Headerrrrrrrrrr</h1>
			<Link className="text-accent-base" to={"/transactions"}>
				Ir para a tela de Transações
			</Link>
		</header>
	);
}
