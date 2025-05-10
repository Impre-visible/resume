import resume from '@/assets/resume.json';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import {
    Mail,
    Phone,
    MapPin,
    LinkIcon,
    Car,
    Briefcase,
    GraduationCap,
    Heart,
    Home,
    Globe,
    User,
    Calendar,
    Award,
    type LucideIcon,
    Github,
    Linkedin,
} from "lucide-react"

type ProfileType = typeof resume.sections.profiles.items[0];

const iconMap: Record<string, LucideIcon> = {
    mail: Mail,
    phone: Phone,
    pin: MapPin,
    link: LinkIcon,
    car: Car,
    briefcase: Briefcase,
    graduation: GraduationCap,
    heart: Heart,
    home: Home,
    globe: Globe,
    user: User,
    calendar: Calendar,
    award: Award,
    github: Github,
    linkedin: Linkedin
}

export default function Basics() {
    const renderIcon = (iconName: string, className?: string) => {
        const IconComponent = iconMap[iconName.toLowerCase()] || User
        return <IconComponent className={`flex-shrink-0 text-gray-500 ${className}`} />
    }

    return (
        <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-16 h-fit w-full rounded-lg">
            <div className="flex flex-col items-start justify-center gap-4 h-fit">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <div className="text-center sm:text-left flex flex-col gap-2">
                        {resume.basics.name && <h1 className="text-4xl font-bold text-primary">{resume.basics.name}</h1>}
                        {resume.basics.headline && <p className="mt-1 text-1xl text-primary">{resume.basics.headline}</p>}
                    </div>
                </div>
                <section className="flex flex-col items-start gap-4">
                    <section className="flex flex-row flex-wrap items-start sm:items-center gap-4">
                        {/* Contact information */}
                        <Button variant="outline" className="w-11 h-11" asChild>
                            <a href={`mailto:${resume.basics.email}`}>
                                {renderIcon("mail")}
                            </a>
                        </Button>

                        <Button variant="outline" className="w-11 h-11" asChild>
                            <a href={`tel:${resume.basics.phone}`}>
                                {renderIcon("phone")}
                            </a>
                        </Button>

                        <Button variant="outline" className="w-11 h-11" asChild>
                            <a href={`https://www.google.com/maps/search/?api=1&query=${resume.basics.location}`} target='_blank' rel="noopener noreferrer">
                                {renderIcon("pin")}
                            </a>
                        </Button>

                        <Button variant="outline" className="w-11 h-11" asChild>
                            <a href={resume.basics.url.href} target='_blank' rel="noopener noreferrer">
                                {renderIcon("link")}
                            </a>
                        </Button>

                        {/* Profiles */}
                        {resume.sections.profiles.items.map((profile: ProfileType) => (
                            <Button key={profile.network} variant="outline" className="w-11 h-11" asChild>
                                <a href={profile.url.href} target='_blank' rel="noopener noreferrer">
                                    {renderIcon(profile.icon)}
                                </a>
                            </Button>
                        ))}

                    </section>
                    <section className='flex flex-wrap gap-2'>
                        {resume.basics.customFields.map((field: typeof resume.basics.customFields[0]) => (
                            <Badge key={field.id} className="flex flex-row items-center gap-2 text-xs" >
                                {renderIcon(field.icon, "text-secondary !h-4 !w-4")}
                                {field.name}
                                {field.value && <span >({field.value})</span>}
                            </Badge>
                        ))}
                    </section>
                </section>
            </div>
            {/* Profile picture */}
            {resume.basics.picture.url && (
                <img
                    src={resume.basics.picture.url}
                    alt={resume.basics.name}
                    className="object-cover aspect-square rounded-lg h-full min-h-[100px] max-h-32"
                />
            )}
        </div>
    )
}