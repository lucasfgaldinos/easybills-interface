import { type ReactNode, type SelectHTMLAttributes, useId } from "react";

interface SelectOption {
	value: string;
	label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	label?: string;
	error?: string;
	icon?: ReactNode;
	fullWidth?: boolean;
	options: SelectOption[];
}

export function Select({
	label,
	options,
	error,
	icon,
	fullWidth = true,
	className = "",
	id,
	...rest
}: SelectProps) {
	const selectId = useId();

	return (
		<div className={`${fullWidth ? "w-full" : ""} mb-4`}>
			{label && <label htmlFor={selectId}>{label}</label>}

			<div className="relative">
				{icon && (
					<div className="absolute inset-y-0 left-0 pl-2 flex items-center">
						{icon}
					</div>
				)}
			</div>

			<select id={selectId} {...rest}>
				{options.map((o) => (
					<option key={o.value} value={o.value}>
						{o.label}
					</option>
				))}
			</select>
			{error && (
				<p className="mt-1 text-sm text-error-base font-light">{error}</p>
			)}
		</div>
	);
}
