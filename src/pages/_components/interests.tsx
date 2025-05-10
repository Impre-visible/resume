import { useResume, type Resume } from '@/lib/useResume'
import { Separator } from '@/components/ui/separator'

export default function Interests() {
    const { resume, loading, error } = useResume()
    if (loading) return <div>Chargement...</div>
    if (error || !resume) return <div>Erreur lors du chargement du CV</div>

    return (
        <>
            <Separator className="bg-primary/25" />
            <div className="flex flex-col items-start justify-between gap-8 h-fit w-full rounded-lg">
                <h1 className="font-bold text-3xl">{resume.sections.interests.name}</h1>
                <div className="flex flex-col items-start flex-wrap gap-2">
                    {resume.sections.interests.items.map((interestItem: Resume['sections']['interests']['items'][number]) => (
                        interestItem.visible && (
                            <div key={interestItem.id} className="flex flex-row items-start gap-2">
                                <h2 className="font-mono">
                                    {interestItem.name}
                                    {interestItem.keywords.length > 0 && (
                                        <span className="text-gray-500"> - </span>
                                    )}
                                    {interestItem.keywords.map((keyword: string, index: number) => (
                                        <span key={index} className="text-gray-500">
                                            {keyword}
                                            {index < interestItem.keywords.length - 1 && (
                                                <span className="text-gray-500">, </span>
                                            )}
                                        </span>
                                    ))}
                                </h2>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </>
    )
}