"use client";
import { PropsWithChildren } from "react";

interface CardProps {
	children: React.ReactNode;
	className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
	return (
		<div
			className="overflow-hidden relative duration-700 border rounded-xl hover:bg-zinc-800/10 group md:gap-8 hover:border-zinc-400/50 border-zinc-600 w-full sm:w-auto"
		>
			<div className="pointer-events-none">
				<div className="absolute inset-0 z-0 transition duration-1000 [mask-image:linear-gradient(black,transparent)]" />
			</div>

			{children}
		</div>
	);
};