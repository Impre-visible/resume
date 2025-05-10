import resume from '../assets/resume.json';
import Basics from './_components/basics';

export default function Home() {
    return (
        <section className="flex flex-col gap-8 items-center h-screen w-screen">
            <section className="flex flex-col gap-8 items-start justify-center h-screen w-3xl">
                <Basics basics={resume.basics} profiles={resume.sections.profiles.items} />
            </section>
        </section>
    );
}