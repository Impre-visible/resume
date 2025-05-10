import resume from '@/assets/resume/resume.json';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function Languages() {
    return (
        <>
            <Separator className="bg-primary/25" />
            <div className="flex flex-col items-start justify-between gap-8 h-fit w-full rounded-lg">
                <h1 className="font-bold text-3xl">{resume.sections.languages.name}</h1>
                <div className="flex flex-row items-start flex-wrap gap-2">
                    {resume.sections.languages.items.map((languageItem) => (
                        languageItem.visible && (
                            <Badge key={languageItem.id}>
                                {languageItem.name}
                                {languageItem.description && ` - ${languageItem.description}`}
                                {languageItem.level > 0 && ` - (${languageItem.level}/5)`}
                            </Badge>
                        )
                    ))}
                </div>
            </div>
        </>
    )
}