import { useResume, type Resume } from '@/lib/useResume'
import { Separator } from '@/components/ui/separator'

type EducationItemType = Resume['sections']['education']['items'][number]

function EducationRow({
    educationItem,
}: {
    educationItem: EducationItemType
}) {
    return (
        <div className="flex flex-col gap-1 w-full">
            <div className="flex flex-row flex-wrap sm:items-center justify-between gap-4 w-full">
                <h2 className="font-bold text-xl">{educationItem.institution}</h2>
                <p className="text-gray-500 font-mono tabular-nums">{educationItem.date}</p>
            </div>
            <div className="flex flex-col items-start justify-center gap-1 w-full">
                <p className="text-gray-500">{educationItem.studyType} - {educationItem.area}</p>
                <p className="text-gray-500">{educationItem.score}</p>
            </div>
            <div className="flex flex-col items-start justify-center mt-2 w-full">
                <p className="text-gray-500 font-mono text-sm" dangerouslySetInnerHTML={{ __html: educationItem.summary }}></p>
            </div>
        </div>
    )
}

export default function Education() {
    const { resume, loading, error } = useResume()
    if (loading) return <div>Chargement...</div>
    if (error || !resume) return <div>Erreur lors du chargement du CV</div>

    return (
        <>
            <Separator className="bg-primary/25" />
            <div className="flex flex-col items-start justify-between gap-8 h-fit w-full rounded-lg">
                <h1 className="font-bold text-3xl">{resume.sections.education.name}</h1>
                <div className="flex flex-col items-start justify-center gap-6 h-fit w-full">
                    {resume.sections.education.items.map((educationItem: EducationItemType) => (
                        educationItem.visible && (
                            <EducationRow key={educationItem.id} educationItem={educationItem} />
                        )
                    ))}
                </div>
            </div>
        </>
    )
}