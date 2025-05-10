import resume from '@/assets/resume/resume.json';
import { Separator } from '@/components/ui/separator';

type ExperienceItemType = typeof resume.sections.experience.items[0];

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

export default function Experience() {
    return (
        <>
            <Separator className="bg-primary/25" />
            <div className="flex flex-col items-start justify-between gap-8 h-fit w-full rounded-lg">
                <h1 className="font-bold text-3xl">{resume.sections.experience.name}</h1>
                <div className="flex flex-col items-start justify-center gap-6 h-fit w-full">
                    {resume.sections.experience.items.map((experienceItem) => (
                        experienceItem.visible && (
                            <ExperienceRow key={experienceItem.id} experienceItem={experienceItem} />
                        )
                    ))}
                </div>
            </div>
        </>
    )
}