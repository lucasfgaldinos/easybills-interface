import { Activity, LogIn, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { useAuth } from "../context/auth.context";

interface NavLink {
	name: string;
	path: string;
}

export function Header() {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { authState, signOut } = useAuth();
	const { pathname } = useLocation();
	const isAuthenticated: boolean = !!authState.user;

	const navLink: NavLink[] = [
		{ name: "Dashboard", path: "/dashboard" },
		{ name: "Transações", path: "/transactions" },
	];

	const handleSignOut = (): void => {
		setIsOpen(false);
		signOut();
	};

	const changeMenu = (): void => {
		setIsOpen(!isOpen);
	};

	const renderAvatar = () => {
		if (!authState.user) return null;

		if (authState.user.photoUrl) {
			return (
				<img
					src={authState.user.photoUrl}
					alt={`Foto de perfil do(a) ${authState.user.displayName}`}
					className="w-10 h-10 rounded-full border border-neutral-base"
				/>
			);
		}

		return (
			<div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-text-light font-bold">
				{authState.user.displayName?.charAt(0)}
			</div>
		);
	};

	return (
		<header className="bg-neutral-dark border-b border-neutral-light">
			<div className="container-app">
				<div className="flex justify-between items-center">
					<Link to={"/"} className="font-bold flex gap-2 text-primary-light">
						<Activity />
						EasyBills
					</Link>

					{/* MENU DESKTOP */}
					{isAuthenticated && (
						<nav className="hidden md:flex space-x-3">
							{navLink.map((link) => (
								<Link
									className={`py-1.5 px-2 rounded-lg transition-colors border border-transparent
                              ${pathname === link.path ? "bg-primary-base hover:bg-primary-base" : "bg-neutral-light/60 hover:border-primary-light"}`}
									to={link.path}
									key={link.path}
								>
									{link.name}
								</Link>
							))}
						</nav>
					)}

					<div className="hidden md:flex items-center space-x-4">
						{isAuthenticated ? (
							<div className="flex items-center space-x-4">
								<div className="flex items-center space-x-2">
									{renderAvatar()}
									<span className="text-xs font-medium">
										{authState.user?.displayName}
									</span>
								</div>

								<button
									onClick={handleSignOut}
									type="button"
									className="text-text-muted hover:text-error-base rounded-full hover:bg-error-dark/40 p-2 cursor-pointer transition-all"
								>
									<LogOut size={20} />
								</button>
							</div>
						) : (
							<Link
								to="/login"
								className="bg-primary-light text-text-muted font-semibold px-5 py-2.5 rounded-xl flex items-center justify-center hover:bg-primary-base transition-colors"
							>
								<LogIn />
							</Link>
						)}
					</div>

					{/* MENU MOBILE */}
					<div className="md:hidden flex items-center">
						<button
							onClick={changeMenu}
							className="text-text-muted p-2 rounded-lg cursor-pointer hover:bg-text-muted/10 transition-colors"
							type="button"
						>
							{isOpen ? <X /> : <Menu />}
						</button>
					</div>
				</div>
			</div>

			{isOpen && (
				<div className="md:hidden">
					<div>
						{isAuthenticated ? (
							<div>
								<nav className="py-6 flex items-center justify-center gap-2 border-t border-neutral-light">
									{navLink.map((link) => (
										<Link
											className={`py-1.5 px-2 rounded-lg transition-colors border border-transparent
                              ${pathname === link.path ? "bg-primary-base hover:bg-primary-base" : "bg-neutral-light/60 hover:border-primary-light"}`}
											to={link.path}
											key={link.path}
											onClick={() => setIsOpen(false)}
										>
											{link.name}
										</Link>
									))}
								</nav>
								<div className="flex items-center justify-between py-3 px-3 border-t border-neutral-light">
									<div className="flex items-center space-x-2">
										{renderAvatar()}
										<span className="text-xs font-medium">
											{authState.user?.displayName}
										</span>
									</div>

									<button
										onClick={handleSignOut}
										type="button"
										className="text-text-muted hover:text-error-base rounded-full hover:bg-error-dark/40 p-2 cursor-pointer transition-all"
									>
										<LogOut size={20} />
									</button>
								</div>
							</div>
						) : (
							<Link
								to="/login"
								onClick={() => setIsOpen(false)}
								className="bg-primary-light text-text-light font-semibold px-5 py-2.5 rounded-2xl flex items-center justify-center hover:bg-primary-base"
							>
								Entrar
							</Link>
						)}
					</div>
				</div>
			)}
		</header>
	);
}
