import { useEffect, useState } from "react"

export interface Resume {
    basics: {
        name: string
        headline: string
        email: string
        phone: string
        location: string
        url: { label: string; href: string }
        customFields: { id: string; icon: string; name: string; value: string }[]
        picture: {
            url: string
            size: number
            aspectRatio: number
            borderRadius: number
            effects: { hidden: boolean; border: boolean; grayscale: boolean }
        }
    }
    metadata: any
    sections: {
        education: {
            name: string
            items: {
                id: string
                institution: string
                date: string
                studyType: string
                area: string
                score: string
                summary: string
                visible: boolean
                url: { label: string; href: string }
            }[]
        }
        experience: {
            name: string
            items: {
                id: string
                company: string
                position: string
                date: string
                summary: string
                visible: boolean
                url: { label: string; href: string }
            }[]
        }
        languages: {
            name: string
            items: {
                id: string
                name: string
                description: string
                level: number
                visible: boolean
            }[]
        }
        skills: {
            name: string
            items: {
                id: string
                name: string
                description: string
                level: number
                visible: boolean
                keywords: string[]
            }[]
        }
        interests: {
            name: string
            items: {
                id: string
                name: string
                keywords: string[]
                visible: boolean
            }[]
        }
        projects: {
            name: string
            items: {
                id: string
                name: string
                date: string
                description: string
                summary: string
                keywords: string[]
                visible: boolean
                url: { label: string; href: string }
            }[]
        }
        profiles: {
            name: string
            items: {
                id: string
                network: string
                username: string
                icon: string
                url: { label: string; href: string }
                visible: boolean
            }[]
        }
        [key: string]: any
    }
}

export function useResume() {
    const [resume, setResume] = useState<Resume | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        setLoading(true)
        fetch("/src/assets/resume/resume.json")
            .then((res) => {
                if (!res.ok) throw new Error("Erreur lors du chargement du CV")
                return res.json()
            })
            .then(setResume)
            .catch(setError)
            .finally(() => setLoading(false))
    }, [])

    return { resume, loading, error }
}
