import { ChevronLeft, ChevronRight } from "lucide-react";
import { useId } from "react";

interface MonthYearSelectProps {
	month: number;
	year: number;
	onMonthChange: (month: number) => void;
	onYearChange: (year: number) => void;
}

interface YearsArray {
	id: number;
	year: number;
}

const monthNames: readonly string[] = [
	"Janeiro",
	"Fevereiro",
	"Março",
	"Abril",
	"Maio",
	"Junho",
	"Julho",
	"Agosto",
	"Setembro",
	"Outubro",
	"Novembro",
	"Dezembro",
];

export function MonthYearSelect({
	month,
	year,
	onMonthChange,
	onYearChange,
}: MonthYearSelectProps) {
	const monthSelectId = useId();
	const yearSelectId = useId();
	const currentYear = new Date().getFullYear();
	const years: YearsArray[] = Array.from({ length: 6 }, (_, i) => ({
		id: i + 1,
		year: currentYear - 5 + i,
	}));

	function handleNextMonth(): void {
		if (month === 12) {
			onMonthChange(1);
			if (year === currentYear) {
				onYearChange(year);
			} else {
				onYearChange(year + 1);
			}
		} else {
			onMonthChange(month + 1);
		}
	}

	function handlePrevMonth(): void {
		if (month === 1) {
			onMonthChange(12);
			if (year === years[0].year) {
				onYearChange(year);
			} else {
				onYearChange(year - 1);
			}
		} else {
			onMonthChange(month - 1);
		}
	}

	return (
		<div className="flex items-center justify-between gap-1 bg-bg-dark rounded-lg p-3 border border-neutral-base">
			<button
				type="button"
				className="text-text-muted cursor-pointer p-1 rounded-md hover:bg-neutral-dark hover:text-primary-light transition-colors"
				aria-label="Mês anterior"
				onClick={handlePrevMonth}
			>
				<ChevronLeft />
			</button>

			<div>
				<label htmlFor={monthSelectId} className="sr-only">
					Selecionar mês
				</label>
				<select
					value={month}
					onChange={(e) => onMonthChange(Number(e.target.value))}
					id={monthSelectId}
					className="bg-neutral-dark cursor-pointer border border-neutral-light rounded-md py-1 px-3 text-sm font-medium text-text-light focus:outline-none focus:ring-1 ring-primary-light"
				>
					{monthNames.map((name, index) => (
						<option key={name} value={index + 1}>
							{name}
						</option>
					))}
				</select>
			</div>

			<div>
				<label htmlFor={yearSelectId} className="sr-only">
					Selecionar ano
				</label>
				<select
					value={year}
					onChange={(e) => onYearChange(Number(e.target.value))}
					id={yearSelectId}
					className="bg-neutral-dark cursor-pointer border border-neutral-light rounded-md py-1 px-3 text-sm font-medium text-text-light focus:outline-none focus:ring-1 ring-primary-light"
				>
					{years.sort().map((item) => (
						<option key={item.id} value={item.year}>
							{item.year}
						</option>
					))}
				</select>
			</div>

			<button
				type="button"
				className="text-text-muted cursor-pointer p-1 rounded-md hover:bg-neutral-dark hover:text-primary-light transition-colors"
				aria-label="Próximo mês"
				onClick={handleNextMonth}
			>
				<ChevronRight />
			</button>
		</div>
	);
}
