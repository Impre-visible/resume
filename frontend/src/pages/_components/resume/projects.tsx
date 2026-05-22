import type { Resume } from "@/lib/useResume";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { stripHtml } from "@/lib/utils";

type ProjectItemType = Resume["sections"]["projects"]["items"][number];

function ProjectsRow({ projectItem }: { projectItem: ProjectItemType }) {
	const projectBody = projectItem.description || projectItem.summary;

	return (
		<div>
			<div className="flex flex-col gap-1 w-full">
				<div className="flex flex-row items-center justify-between gap-4 w-full">
					<h2 className="font-bold text-xl">{projectItem.name}</h2>
					{projectItem.url?.href && (
						<Button
							variant="link"
							className="text-gray-500 hover:text-gray-700"
							asChild
						>
							<a
								href={projectItem.url.href}
								target="_blank"
								rel="noopener noreferrer"
							>
								<ExternalLink className="flex-shrink-0 w-4" />
							</a>
						</Button>
					)}
				</div>
				<p className="text-gray-500 font-mono tabular-nums">
					{projectItem.date}
				</p>
			</div>
			{(projectBody || projectItem.keywords.length > 0) && (
				<div className="flex flex-col items-start justify-center gap-1 w-full">
					{projectBody && (
						<p className="text-gray-500 whitespace-pre-line">
							{stripHtml(projectBody)}
						</p>
					)}
					{projectItem.keywords.length > 0 && (
						<section className="flex flex-row items-center justify-start gap-2">
							{projectItem.keywords.map((keyword) => (
								<Badge key={keyword}>{keyword}</Badge>
							))}
						</section>
					)}
				</div>
			)}
		</div>
	);
}

export default function Projects({
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
	if (resume.sections.projects.items.length === 0) return null;

	return (
		<>
			<Separator className="bg-primary/25" />
			<div className="flex flex-col items-start justify-between gap-8 h-fit w-full rounded-lg">
				<h1 className="font-bold text-3xl">{resume.sections.projects.name}</h1>
				<div className="flex flex-col items-start justify-center gap-6 h-fit w-full">
					{resume.sections.projects.items.map(
						(projectItem: ProjectItemType) =>
							projectItem.visible && (
								<ProjectsRow key={projectItem.id} projectItem={projectItem} />
							),
					)}
				</div>
			</div>
		</>
	);
}
