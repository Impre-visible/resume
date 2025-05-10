import Basics from './_components/basics';
import Education from './_components/education';
import Experience from './_components/experience';
import Footer from './_components/footer';
import Interests from './_components/interests';
import Languages from './_components/languages';
import Projects from './_components/projects';
import Skills from './_components/skills';

export default function Home() {
    return (
        <section className="flex flex-col gap-8 items-center justify-start py-4 px-2 sm:p-4 md:p-8 lg:p-24 h-full w-screen max-w-screen overflow-x-hidden">
            <section className="flex flex-col gap-6 items-start justify-center w-full lg:w-3xl">
                <Basics />
                <Languages />
                <Education />
                <Experience />
                <Projects />
                <Skills />
                <Interests />
                <Footer />
            </section>
        </section>
    );
}