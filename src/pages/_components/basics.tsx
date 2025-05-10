import basicsData from '@/assets/resume.json';
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

type BasicsType = typeof basicsData.basics;
type ProfilesType = typeof basicsData.sections.profiles.items[0][];

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

export default function Basics({
    basics,
    profiles,
}: {
    basics: BasicsType
    profiles: ProfilesType
}) {
    const renderIcon = (iconName: string, className?: string) => {
        const IconComponent = iconMap[iconName.toLowerCase()] || User
        return <IconComponent className={`flex-shrink-0 text-gray-500 ${className}`} />
    }

    /*
    "customFields": [
      {
        "id": "oc19gord8tfgc24crhg75xjs",
        "icon": "car",
        "name": "Permis B & véhiculé",
        "value": ""
      }
    ],
    */

    return (
        <div className="flex flex-row items-center justify-between gap-8 h-fit w-full rounded-lg p-8">
            <div className="flex flex-col items-start justify-center gap-4 h-fit">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <div className="text-center sm:text-left flex flex-col gap-2">
                        {basics.name && <h1 className="text-2xl font-bold text-primary">{basics.name}</h1>}
                        {<p className="mt-1 text-lg  text-primary">{basics.headline} Teest test etest tetst qsdqsd qsd qsd qsd qsd qsd qd sdfsdfsqdfsdf sdf qsd qsd qsd qsd qsd qsd </p>}
                    </div>
                </div>
                <section className="flex flex-col items-start gap-4">
                    <section className="grid grid-cols-2 sm:flex sm:flex-row items-start sm:items-center gap-4">
                        {/* Contact information */}
                        <Button variant="outline" className="w-11 h-11" asChild>
                            <a href={`mailto:${basics.email}`}>
                                {renderIcon("mail")}
                            </a>
                        </Button>

                        <Button variant="outline" className="w-11 h-11" asChild>
                            <a href={`tel:${basics.phone}`}>
                                {renderIcon("phone")}
                            </a>
                        </Button>

                        <Button variant="outline" className="w-11 h-11" asChild>
                            <a href={`https://www.google.com/maps/search/?api=1&query=${basics.location}`} target='_blank' rel="noopener noreferrer">
                                {renderIcon("pin")}
                            </a>
                        </Button>

                        <Button variant="outline" className="w-11 h-11" asChild>
                            <a href={basics.url.href} target='_blank' rel="noopener noreferrer">
                                {renderIcon("link")}
                            </a>
                        </Button>

                        {/* Profiles */}
                        {profiles.map((profile) => (
                            <Button key={profile.network} variant="outline" className="w-11 h-11" asChild>
                                <a href={profile.url.href} target='_blank' rel="noopener noreferrer">
                                    {renderIcon(profile.icon)}
                                </a>
                            </Button>
                        ))}

                    </section>
                    <section>

                        {basics.customFields.map((field) => (
                            /*
                            <span key={field.id} className="flex flex-row items-center gap-2 text-sm text-gray-500">
                                {renderIcon(field.icon)}
                                {field.name}
                                {field.value && <span className="text-gray-400">({field.value})</span>}
                            </span>
                            */
                            <Badge key={field.id} className="flex flex-row items-center gap-2 text-md" >
                                {renderIcon(field.icon, "text-secondary !h-4 !w-4")}
                                {field.name}
                                {field.value && <span >({field.value})</span>}
                            </Badge>
                        ))}</section>
                </section>
            </div>
            <img
                src={basics.picture.url !== "" ? basics.picture.url : "https://storage.rxresu.me/cma7xyhyu3bhiq9p3kl3xcwxg/pictures/kgtx54slecbw4isrg60f02uc.jpg"}
                alt={basics.name}
                className="object-cover aspect-square rounded-lg h-full min-h-[100px] max-h-32"
            />
        </div>
    )
}