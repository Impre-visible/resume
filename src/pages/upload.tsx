import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

const langs = [
    { label: "Français", value: "fr", emoji: "🇫🇷" },
    { label: "English", value: "en", emoji: "🇬🇧" },
    { label: "Español", value: "es", emoji: "🇪🇸" },
    { label: "Deutsch", value: "de", emoji: "🇩🇪" },
    { label: "Italiano", value: "it", emoji: "🇮🇹" },
    { label: "Português", value: "pt", emoji: "🇧🇷" },
    { label: "Nederlands", value: "nl", emoji: "🇳🇱" },
    { label: "Русский", value: "ru", emoji: "🇷🇺" },
]

export default function ResumeAdmin() {
    const [file, setFile] = useState<File | null>(null)
    const [lang, setLang] = useState("fr")
    const [passcode, setPasscode] = useState("")
    const [history, setHistory] = useState<string[]>([])

    const fetchHistory = async () => {
        const res = await fetch(`/api/resume/list?lang=${lang}`)
        const data = await res.json()
        setHistory(data.files)
    }

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!file) return
        const formData = new FormData()
        formData.append("resume", file)
        formData.append("lang", lang)
        formData.append("passcode", passcode)
        const res = await fetch("/api/resume", {
            method: "POST",
            headers: { "x-passcode": passcode },
            body: formData,
        })
        if (res.ok) {
            toast.success("Upload successful")
            fetchHistory()
        } else {
            const error = await res.json()
            toast.error(`Upload failed: ${error.message}`)
        }
    }

    React.useEffect(() => { fetchHistory() }, [lang])

    return (
        <section className="h-screen w-screen flex items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Upload CV</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleUpload} className="flex flex-col gap-4">
                        <Input type="file" accept="application/json" onChange={e => setFile(e.target.files?.[0] || null)} />
                        <Select value={lang} onValueChange={setLang}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Language" />
                            </SelectTrigger>
                            <SelectContent>
                                {langs.map(l => (
                                    <SelectItem key={l.value} value={l.value}>
                                        {l.emoji} {l.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Input type="password" value={passcode} onChange={e => setPasscode(e.target.value)} placeholder="Password" />
                        <Button type="submit">Upload</Button>
                    </form>
                    <div className="mt-4">
                        <h3 className="font-semibold">History</h3>
                        <ul className="text-xs list-disc pl-5">
                            {history.map(f => <li key={f}>{f}</li>)}
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}
