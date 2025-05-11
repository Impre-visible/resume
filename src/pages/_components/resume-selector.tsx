import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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


const ResumeSelector = ({
    setSelectedVersion
}: {
    setSelectedVersion: (version: string) => void;
}) => {
    const [languages, setLanguages] = useState<string[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
    const [versions, setVersions] = useState<string[]>([]);

    const getDateFromFilename = (filename: string): string => {
        // filename format: resume.[lang].[timestamp].json
        const timestamp = parseInt(filename.split(".")[2]);
        const date = new Date(timestamp);

        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        };

        return date.toLocaleString("fr-FR", options);
    };



    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await fetch("/api/languages");
                const data = await response.json();
                setLanguages(data.languages);
            } catch (error) {
                console.error(error);
            }
        };

        fetchLanguages();
    }, []);

    useEffect(() => {
        if (selectedLanguage) {
            const fetchVersions = async () => {
                try {
                    const response = await fetch(`/api/versions?lang=${selectedLanguage}`);
                    const data = await response.json();
                    setVersions(data.versions);
                } catch (error) {
                    console.error(error);
                }
            };

            fetchVersions();
        } else {
            setVersions([]);
        }
    }, [selectedLanguage]);

    return (
        <div className="fixed top-2.5 right-2.5 z-50 flex flex-col space-y-2">
            <Select onValueChange={(value) => setSelectedLanguage(value)}>
                <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                    {langs.filter(lang => languages.includes(lang.value)).map(({ label, value, emoji }) => (
                        <SelectItem key={value} value={value}>
                            {emoji} {label}
                        </SelectItem>
                    ))}
                    {languages.length === 0 && (
                        <SelectItem value="none" disabled>
                            No languages available
                        </SelectItem>
                    )}
                </SelectContent>
            </Select>
            <Select onValueChange={(value) => setSelectedVersion(value)} disabled={!selectedLanguage}>
                <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select Version" />
                </SelectTrigger>
                <SelectContent>
                    {versions.map((version, _index) => (
                        <SelectItem key={version} value={version}>
                            {getDateFromFilename(version)}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default ResumeSelector;
