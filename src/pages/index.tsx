export default function Home() {
    return (
        <section className="flex flex-col gap-8 items-center justify-center h-screen bg-gray-100">
            <h1 className="font-bold text-3xl" >Welcome to my resume.</h1>
            <p>
                This is a simple resume website built with React and Vite. It uses the Generouted plugin for routing.
                <br />
                Shadcn/ui is used for the UI components, and Tailwind CSS is used for styling.
            </p>
        </section>
    )
}