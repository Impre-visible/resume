import { Separator } from "@/components/ui/separator";
import type { Resume } from "@/lib/useResume";

type InterestItemType = Resume["sections"]["interests"]["items"][number];

export default function Interests({
	resume,
	loading,
	error,
}: {
	resume: Resume | null;
	loading: boolean;
	error: Error | null;
}) {
	if (loading) return null;
	if (error || !resume) return null;
	if (resume.sections.interests.items.length === 0) return null;

	return (
		<>
			<Separator className="bg-primary/25" />
			<div className="flex flex-col items-start justify-between gap-8 h-fit w-full rounded-lg">
				<h1 className="font-bold text-3xl">{resume.sections.interests.name}</h1>
				<div className="flex flex-col items-start flex-wrap gap-2">
					{resume.sections.interests.items.map(
						(interestItem: InterestItemType) =>
							interestItem.visible && (
								<div
									key={interestItem.id}
									className="flex flex-row items-start gap-2"
								>
									<h2 className="font-mono">
										{interestItem.name}
										{interestItem.keywords.length > 0 && (
											<span className="text-gray-500"> - </span>
										)}
										{interestItem.keywords.map(
											(keyword: string, index: number) => (
												<span
													key={`${interestItem.id}-${keyword}`}
													className="text-gray-500"
												>
													{keyword}
													{index < interestItem.keywords.length - 1 && (
														<span className="text-gray-500">, </span>
													)}
												</span>
											),
										)}
									</h2>
								</div>
							),
					)}
				</div>
			</div>
		</>
	);
}
