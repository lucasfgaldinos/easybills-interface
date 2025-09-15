import { type InputHTMLAttributes, type ReactNode, useId } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	fullWidth?: boolean;
	icon?: ReactNode;
	label?: string;
	error?: string;
	id?: string;
	className?: string;
}

export function Input({
	fullWidth,
	icon,
	label,
	error,
	id,
	className,
	...rest
}: InputProps) {
	const generateId = useId();
	const inputId = id || generateId;

	return (
		<div className={`${fullWidth ? "w-full" : ""} mb-4`}>
			{label && (
				<label
					htmlFor={inputId}
					className="block text-sm font-bold text-text-muted mb-2"
				>
					{label}
				</label>
			)}
			<div className="relative">
				{icon && (
					<div className="absolute -bottom-8 pl-3 flex items-center cursor-pointer text-text-muted">
						{icon}
					</div>
				)}
			</div>
			<input
				id={inputId}
				{...rest}
				className={`block w-full rounded-xl border
            ${error ? "border-error-base placeholder:text-text-muted focus:border-error-base focus:ring-error-base/30" : "border-neutral-base focus:border-primary-base focus:ring-primary-base/30"}
            bg-bg-dark px-4 py-3 text-sm font-medium text-text-light transition-all focus:outline-none focus:ring-2
            ${icon ? "pl-10" : ""}
            ${className}
            `}
			/>

			{error && (
				<p className="mt-1 text-sm text-error-base font-light">{error}</p>
			)}
		</div>
	);
}
