import { ChevronDown } from "lucide-react";
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
		<div className={`${fullWidth ? "w-full" : ""} mb-4 relative`}>
			{label && (
				<label
					className="text-sm text-text-muted font-bold block mb-1"
					htmlFor={selectId}
				>
					{label}
				</label>
			)}

			<div className="relative">
				{icon && (
					<div className="absolute top-3.5 left-3 flex items-center">
						{icon}
					</div>
				)}
			</div>

			<select
				id={selectId}
				{...rest}
				className={`block text-sm appearance-none w-full bg-bg-dark py-2.5 pl-10 pr-8 rounded-xl text-text-light border focus:outline-none focus:border-primary-light
               ${error ? "border-error-base focus:border-error-base" : "border-neutral-base"}
            `}
			>
				{options.map((o) => (
					<option key={o.value} value={o.value}>
						{o.label}
					</option>
				))}
			</select>

			<div className="absolute inset-y-0 top-6.5 right-0 flex items-center pr-3">
				<ChevronDown size={20} className="text-teal-50" />
			</div>

			{error && (
				<p className="mt-1 text-sm text-error-base font-light">{error}</p>
			)}
		</div>
	);
}
