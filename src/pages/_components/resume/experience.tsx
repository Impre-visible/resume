import { type Resume } from '@/lib/useResume'
import { Separator } from '@/components/ui/separator'

type ExperienceItemType = Resume['sections']['experience']['items'][number]

function ExperienceRow({
    experienceItem,
}: {
    experienceItem: ExperienceItemType
}) {
    return (
        <div className="flex flex-col gap-1 w-full">
            <div className="flex flex-row items-center justify-between gap-4 w-full">
                <h2 className="font-bold text-xl">{experienceItem.company}</h2>
                <p className="text-gray-500 font-mono tabular-nums">{experienceItem.date}</p>
            </div>
            <div className="flex flex-col items-start justify-center gap-1 w-full">
                <p className="text-gray-500">{experienceItem.position}</p>
            </div>
            <div className="flex flex-col items-start justify-center mt-2 w-full">
                <p className="text-gray-500 font-mono text-sm" dangerouslySetInnerHTML={{ __html: experienceItem.summary }}></p>
            </div>
        </div>
    )
}

export default function Experience({
    resume,
    loading,
    error
}: {
    resume: Resume | null,
    loading: boolean,
    error: Error | null
}) {
    if (loading) return null
    if (error || !resume) return null
    if (resume.sections.experience.items.length === 0) return null

    return (
        <>
            <Separator className="bg-primary/25" />
            <div className="flex flex-col items-start justify-between gap-8 h-fit w-full rounded-lg">
                <h1 className="font-bold text-3xl">{resume.sections.experience.name}</h1>
                <div className="flex flex-col items-start justify-center gap-6 h-fit w-full">
                    {resume.sections.experience.items.map((experienceItem: ExperienceItemType) => (
                        experienceItem.visible && (
                            <ExperienceRow key={experienceItem.id} experienceItem={experienceItem} />
                        )
                    ))}
                </div>
            </div>
        </>
    )
}