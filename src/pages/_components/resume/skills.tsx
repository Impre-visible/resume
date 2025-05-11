import { type Resume } from '@/lib/useResume'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export default function Skills({
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
    if (resume.sections.interests.items.length === 0) return null

    return (
        <>
            <Separator className="bg-primary/25" />
            <div className="flex flex-col items-start justify-between gap-8 h-fit w-full rounded-lg">
                <h1 className="font-bold text-3xl">{resume.sections.skills.name}</h1>
                <div className="flex flex-row items-start flex-wrap gap-2">
                    {resume.sections.skills.items.map((skillItem: Resume['sections']['skills']['items'][number]) => (
                        skillItem.visible && (
                            <Badge key={skillItem.id} >
                                {skillItem.name}
                                {skillItem.description && ` - ${skillItem.description}`}
                                {skillItem.level > 0 && ` - (${skillItem.level}/5)`}
                            </Badge>
                        )
                    ))}
                </div>
            </div>
        </>
    )
}