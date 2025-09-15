import type { TransactionType } from "../types";

interface TransactionTypeSelectorProps {
	value: TransactionType;
	id?: string;
	onChange: (type: TransactionType) => void;
}

interface TransactionsTypeButtonsProps {
	type: TransactionType;
	label: string;
	inativeClass: string;
	activeClass: string;
}

export function TransactionTypeSelector({
	value,
	onChange,
	id,
}: TransactionTypeSelectorProps) {
	const transactionsTypeButtons: TransactionsTypeButtonsProps[] = [
		{
			type: "expense",
			label: "Despesa",
			inativeClass: "border-error-base text-error-dark hover:bg-error-base/10",
			activeClass:
				"bg-text-light/80 shadow-md border-error-base text-error-dark ring ring-text-light",
		},
		{
			type: "income",
			label: "Receita",
			inativeClass:
				"border-primary-light text-primary-dark hover:bg-primary-base/10",
			activeClass:
				"bg-text-light/80 shadow-md border-primary-light text-primary-dark ring ring-text-light",
		},
	];

	return (
		<fieldset id={id} className="grid grid-cols-1 md:grid-cols-2 gap-2">
			<legend>Tipo de transação</legend>
			{transactionsTypeButtons.map((item) => (
				<button
					className={`cursor-pointer font-bold flex items-center justify-center border rounded-md p-2 w-full transition-all
                  ${value === item.type ? item.activeClass : item.inativeClass}
               `}
					key={item.type}
					type="button"
					onClick={() => onChange(item.type)}
				>
					{item.label}
				</button>
			))}
		</fieldset>
	);
}
