import {
	signOut as firebaseSignOut,
	onAuthStateChanged,
	signInWithPopup,
} from "firebase/auth";
import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { firebaseAuth, googleAuthProvider } from "../config/firebase.config";
import type { AuthState } from "../types";

interface AuthContextProps {
	authState: AuthState;
	signWithGoogle: () => Promise<void>;
	signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [authState, setAuthState] = useState<AuthState>({
		user: null,
		error: null,
		loading: false,
	});

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(
			firebaseAuth,
			(user) => {
				if (user) {
					console.log(user);
					setAuthState({
						user: {
							uid: user.uid,
							displayName: user.displayName,
							email: user.email,
							photoUrl: user.photoURL,
						},
						error: null,
						loading: false,
					});
				} else {
					setAuthState({
						user: null,
						error: null,
						loading: false,
					});
				}
			},
			(error) => {
				console.error("Error trying to log in with Google!");
				setAuthState({
					user: null,
					error: error.message,
					loading: false,
				});
			},
		);

		return () => unsubscribe();
	}, []);

	async function signWithGoogle(): Promise<void> {
		setAuthState((prev) => ({
			...prev,
			loading: true,
		}));

		try {
			await signInWithPopup(firebaseAuth, googleAuthProvider);
		} catch (err) {
			console.error("Error trying to log in with Google!");

			const errorMessage =
				err instanceof Error
					? err.message
					: "Error trying to log in with Google!";

			setAuthState((prev) => ({
				...prev,
				loading: false,
				error: errorMessage,
			}));
		}
	}

	async function signOut(): Promise<void> {
		setAuthState((prev) => ({
			...prev,
			loading: true,
		}));
		try {
			await firebaseSignOut(firebaseAuth);
		} catch (err) {
			console.error("Error trying to log in with Google!");

			const errorMessage =
				err instanceof Error
					? err.message
					: "Error trying to log in with Google!";

			setAuthState((prev) => ({
				...prev,
				loading: false,
				error: errorMessage,
			}));
		}
	}

	return (
		<AuthContext.Provider value={{ authState, signWithGoogle, signOut }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("Something went wrong while creating AuthContext.");
	}

	return context;
}
