import GoogleIcon from "../assets/google-icon.svg";
import { Button } from "./button";

interface GoogleLoginProps {
	isLoading: boolean;
	onClick: () => void;
}

export function GoogleLoginButton({ isLoading, onClick }: GoogleLoginProps) {
	return (
		<Button variant="outline" isLoading={isLoading} onClick={onClick} fullWidth>
			<img className="w-4 h-4" src={GoogleIcon} alt="Google icon" />
			Entrar com o Google
		</Button>
	);
}
