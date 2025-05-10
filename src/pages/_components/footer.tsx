import { useResume } from '@/lib/useResume'
import { Separator } from '@/components/ui/separator'
import { Copyright, Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
    const { resume, loading, error } = useResume()
    if (loading) return <div>Chargement...</div>
    if (error || !resume) return <div>Erreur lors du chargement du CV</div>

    return (
        <section className="flex flex-col items-center justify-center gap-8 w-full h-fit p-4 bg-gray-50 rounded-lg">
            <Separator className="bg-primary/25" />
            <div className="flex flex-col items-center gap-4">
                <div className="flex flex-row items-center flex-wrap gap-4">
                    <a href={`mailto:${resume.basics.email}`} className='flex flex-row items-center gap-2 text-sm'>
                        <Mail className="flex-shrink-0 w-4 text-gray-500" />
                        {resume.basics.email}
                    </a>

                    <a href={`tel:${resume.basics.phone}`} className='flex flex-row items-center gap-2 text-sm'>
                        <Phone className="flex-shrink-0 w-4 text-gray-500" />
                        {resume.basics.phone}
                    </a>

                    <a href={`https://google.com/maps/search/?api=1&query=${resume.basics.location}`} target="_blank" rel="noopener noreferrer" className='flex flex-row items-center gap-2 text-sm'>
                        <MapPin className="flex-shrink-0 w-4 text-gray-500" />
                        {resume.basics.location}
                    </a>

                    <a href={`${resume.basics.url.href}`} target="_blank" rel="noopener noreferrer" className='flex flex-row items-center gap-2 text-sm'>
                        <MapPin className="flex-shrink-0 w-4 text-gray-500" />
                        {resume.basics.url.label || resume.basics.url.href}
                    </a>
                </div>
                <div className="flex flex-col items-center flex-wrap gap-4">
                    <section className="flex flex-row items-center gap-2">
                        <Copyright className="flex-shrink-0 w-4 text-gray-700" />
                        <p className="text-sm text-gray-700">
                            {resume.basics.name} - {new Date().getFullYear()}
                        </p>
                    </section>
                </div>
            </div>
        </section>
    )
}