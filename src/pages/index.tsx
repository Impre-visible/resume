import resume from '../assets/resume.json';
import Basics from './_components/basics';
import Education from './_components/education';

export default function Home() {
    return (
        <section className="flex flex-col gap-8 items-center justify-start p-24 h-full w-screen">
            <section className="flex flex-col gap-6 items-start justify-center w-3xl">
                <Basics basics={resume.basics} profiles={resume.sections.profiles.items} />
                <Education education={resume.sections.education} />
            </section>
        </section>
    );
}