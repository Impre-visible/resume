import { useResume, type Resume } from '@/lib/useResume'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

// Impossible de typer dynamiquement, donc on utilise 'any'
type ProjectItemType = Resume['sections']['projects']['items'][number]

function ProjectsRow({
    projectItem,
}: {
    projectItem: ProjectItemType
}) {
    return (
        <div>
            <div className="flex flex-col gap-1 w-full">
                <div className="flex flex-row items-center justify-between gap-4 w-full"></div>
                <h2 className="font-bold text-xl">{projectItem.name}</h2>
                <p className="text-gray-500 font-mono tabular-nums">{projectItem.date}</p>
            </div>
            {
                (projectItem.description || projectItem.keywords.length > 0) && (
                    <div className="flex flex-col items-start justify-center gap-1 w-full">
                        {projectItem.description && (
                            <p className="text-gray-500">{projectItem.description}</p>
                        )}
                        {projectItem.keywords.length > 0 && (
                            <section className="flex flex-row items-center justify-start gap-2">
                                {projectItem.keywords.map((keyword, index) => (
                                    <Badge key={index}>
                                        {keyword}
                                    </Badge>
                                ))}
                            </section>
                        )}
                    </div>
                )
            }

            <div className="flex flex-col items-start justify-center mt-2 w-full">
                <p className="text-gray-500 font-mono text-sm" dangerouslySetInnerHTML={{ __html: projectItem.summary }}></p>
            </div>
        </div>
    )
}

export default function Projects() {
    const { resume, loading, error } = useResume()
    if (loading) return <div>Chargement...</div>
    if (error || !resume) return <div>Erreur lors du chargement du CV</div>

    return (
        <>
            <Separator className="bg-primary/25" />
            <div className="flex flex-col items-start justify-between gap-8 h-fit w-full rounded-lg">
                <h1 className="font-bold text-3xl">{resume.sections.projects.name}</h1>
                <div className="flex flex-col items-start justify-center gap-6 h-fit w-full">
                    {resume.sections.projects.items.map((projectItem: ProjectItemType) => (
                        projectItem.visible && (
                            <ProjectsRow key={projectItem.id} projectItem={projectItem} />
                        )
                    ))}
                </div>
            </div>
        </>
    )
}