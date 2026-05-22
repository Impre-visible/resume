import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function stripHtml(input: string) {
	const decoded =
		typeof document !== "undefined"
			? (() => {
					const textarea = document.createElement("textarea");
					textarea.innerHTML = input;
					return textarea.value;
				})()
			: input
					.replace(/&amp;/gi, "&")
					.replace(/&lt;/gi, "<")
					.replace(/&gt;/gi, ">")
					.replace(/&quot;/gi, '"')
					.replace(/&#39;/gi, "'");

	return decoded
		.replace(/<\/?p>/gi, "\n")
		.replace(/<\/?li>/gi, "\n")
		.replace(/<[^>]+>/g, "")
		.replace(/\n{3,}/g, "\n\n")
		.trim();
}
