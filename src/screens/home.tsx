import { Button } from "../components";

export function Home() {
	return (
		<div>
			<h1>Hello, World!</h1>

			<div className="w-50 p-4">
				<Button isLoading>Clique aqui</Button>
			</div>
		</div>
	);
}
