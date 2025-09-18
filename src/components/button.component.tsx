import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariants = "primary" | "outline" | "secondary" | "danger";

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
	type = "button",
	...rest
}: ButtonProps) {
	const variantClasses = {
		primary:
			"bg-primary-base border border-text-muted text-text-light hover:bg-primary-light active:bg-primary-dark",
		outline:
			"border border-primary-base text-primary-base hover:bg-primary-base/10 active:primary-base/30",
		secondary:
			"bg-neutral-base border border-text-light text-text-light hover:bg-neutral-light active:bg-neutral-dark",
		danger:
			"bg-error-base border border-error-dark text-text-light hover:bg-error-base/50 active:bg-error-dark",
	};

	function renderLoading() {
		return (
			<div className="flex items-center justify-center gap-2">
				<div className="w-4 h-4 border-2 border-t-text-light border-text-muted rounded-full animate-spin" />
				{children}
			</div>
		);
	}

	return (
		<button
			type={type}
			className={`cursor-pointer px-4 py-2 rounded-full font-medium transition-colors flex items-center justify-center gap-2
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
