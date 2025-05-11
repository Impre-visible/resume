import { useState, useEffect } from 'react';
import ResumeSelector from './_components/resume-selector';
import Basics from './_components/resume/basics';
import Education from './_components/resume/education';
import Experience from './_components/resume/experience';
import Footer from './_components/resume/footer';
import Interests from './_components/resume/interests';
import Languages from './_components/resume/languages';
import Projects from './_components/resume/projects';
import Skills from './_components/resume/skills';

import type { Resume } from '@/lib/useResume';
import { toast } from 'sonner';

export default function Home() {
    const [selectedVersion, setSelectedVersion] = useState<string>("/api/resume");
    const [resume, setResume] = useState<Resume | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!selectedVersion) return;
        setLoading(true);
        setError(null);
        fetch(`/api/resume?filename=${encodeURIComponent(selectedVersion)}`)
            .then(res => {
                if (!res.ok) throw new Error("Erreur lors du chargement du CV");
                return res.json();
            })
            .then(setResume)
            .catch((err) => {
                toast.error(err.message);
                setError(err);
            })
            .finally(() => setLoading(false));
    }, [selectedVersion]);

    return (
        <>
            <ResumeSelector setSelectedVersion={setSelectedVersion} />
            {error && (
                <section className="flex flex-col gap-8 items-center justify-start py-4 px-2 sm:p-4 md:p-8 lg:p-24 h-full w-screen max-w-screen overflow-x-hidden">
                    <a href="/upload" className="text-2xl font-bold text-primary">
                        <h1>Error during loading</h1>
                        <p className="text-gray-500">Please upload a valid resume</p>
                    </a>
                </section>
            )}
            {!error && (
                <section className="flex flex-col gap-8 items-center justify-start py-4 px-2 sm:p-4 md:p-8 lg:p-24 h-full w-screen max-w-screen overflow-x-hidden">
                    <section className="flex flex-col gap-6 items-start justify-center w-full lg:w-3xl">
                        <Basics resume={resume} loading={loading} error={error} />
                        <Languages resume={resume} loading={loading} error={error} />
                        <Education resume={resume} loading={loading} error={error} />
                        <Experience resume={resume} loading={loading} error={error} />
                        <Projects resume={resume} loading={loading} error={error} />
                        <Skills resume={resume} loading={loading} error={error} />
                        <Interests resume={resume} loading={loading} error={error} />
                        <Footer resume={resume} loading={loading} error={error} />
                    </section>
                </section>
            )}
        </>
    );
}