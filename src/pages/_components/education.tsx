import basicsData from '@/assets/resume.json';
import { Separator } from '@/components/ui/separator';

type EducationType = typeof basicsData.sections.education;
type EducationItemType = typeof basicsData.sections.education.items[0];

function EducationRow({
    educationItem,
}: {
    educationItem: EducationItemType
}) {
    return (
        <div className="flex flex-col gap-1 w-full">
            <div className="flex flex-row items-center justify-between gap-4 w-full">
                <h2 className="font-bold text-xl">{educationItem.institution}</h2>
                <p className="text-gray-500">{educationItem.date}</p>
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

export default function Education({
    education,
}: {
    education: EducationType
}) {
    return (
        <>
            <Separator className="w-full bg-primary" />
            <div className="flex flex-col items-start justify-between gap-8 h-fit w-full rounded-lg">
                <h1 className="font-bold text-3xl">{education.name}</h1>
                <div className="flex flex-col items-start justify-center gap-6 h-fit w-full">
                    {education.items.map((educationItem) => (
                        educationItem.visible && (
                            <EducationRow key={educationItem.id} educationItem={educationItem} />
                        )
                    ))}
                </div>
            </div>
        </>
    )
}