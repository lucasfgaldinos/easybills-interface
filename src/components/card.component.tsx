import type { ReactNode } from "react";

interface CardProps {
	children: ReactNode;
	title?: string;
	subtitle?: string;
	icon?: ReactNode;
	hover?: boolean;
	glowEffect?: boolean;
	className?: string;
}

export function Card({
	children,
	subtitle,
	className = "",
	glowEffect = false,
	hover = false,
	icon,
	title,
}: CardProps) {
	return (
		<div
			className={`bg-neutral-dark rounded-xl border border-neutral-base shadow-md p-6 transition-all
         ${hover ? "hover:border-primary-light hover:shadow-lg hover:-translate-y-0.5" : ""}
         ${glowEffect ? "glow" : ""}
         ${className}
      `}
		>
			{(title || icon) && (
				<div className="flex items-center space-x-3 mb-4">
					{icon && (
						<div className="p-2 bg-neutral-base rounded-xl flex items-center justify-center">
							{icon}
						</div>
					)}

					{(title || subtitle) && (
						<div className="">
							{title && (
								<h3 className="text-lg font-medium text-text-light">{title}</h3>
							)}
							{subtitle && (
								<p className="text-sm font-light text-text-muted">{subtitle}</p>
							)}
						</div>
					)}
				</div>
			)}
			{children}
		</div>
	);
}
