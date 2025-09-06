import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariants =
	| "primary"
	| "outline"
	| "secondary"
	| "success"
	| "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: ButtonVariants;
	fullWidth?: boolean;
	isLoading?: boolean;
}

export function Button({
	children,
	variant = "primary",
	fullWidth = false,
	isLoading = false,
	className,
	disabled,
	...rest
}: ButtonProps) {
	const variantClasses = {
		primary:
			"bg-emerald-600 border border-emerald-950 text-white hover:bg-emerald-800 active:bg-emerald-950",
		outline:
			"border border-emerald-600 text-emerald-600 hover:bg-emerald-600/10 active:bg-emerald-600/30",
		secondary:
			"bg-gray-600 border border-gray-950 text-white hover:bg-gray-800 active:bg-gray-950",
		success:
			"bg-lime-600 border border-lime-950 text-white hover:bg-lime-800 active:bg-lime-950",
		danger:
			"bg-red-600 border border-red-950 text-white hover:bg-red-800 active:bg-red-950",
	};

	function renderLoading() {
		return (
			<div className="flex items-center justify-center">
				<div className="w-4 h-4 border-2 border-t-white border-gray-800 rounded-4xl animate-spin mr-3" />
				{children}
			</div>
		);
	}

	return (
		<button
			type="button"
			className={`cursor-pointer px-4 py-1.5 rounded-lg font-medium transition-colors flex items-center justify-center
            ${variantClasses[variant]}
            ${fullWidth && "w-full"}
            ${(isLoading || disabled) && "opacity-30 cursor-not-allowed"}
            ${className}
         `}
			disabled={isLoading || disabled}
			{...rest}
		>
			{isLoading ? renderLoading() : children}
		</button>
	);
}
