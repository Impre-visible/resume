# Dynamic CV Portfolio

This project is an online CV/portfolio that dynamically generates content from a [Reactive Resume](https://rxresu.me/) export. The goal is to automatically synchronize the paper CV with the online CV: as soon as I update my CV on Reactive Resume, I export it here, and my website immediately reflects these changes.

The site is hosted at [cv.chevrier.dev](https://cv.chevrier.dev)

## Features

- Dynamic CV generation from a JSON file exported from Reactive Resume
- Responsive display adapted to all devices
- Modern and clean design
- Customizable sections (experience, education, skills, projects, languages, interests)
- Links to social profiles and contact information

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Build**: Vite 6
- **Styling**: Tailwind CSS 4, shadcn/ui (components)
- **Routing**: Generouted (based on React Router 7)
- **Icons**: Lucide React
- **Utilities**: class-variance-authority, tailwind-merge, clsx

## Installation

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

## Project Structure

- `/src/assets/resume/resume.json`: The JSON file exported from Reactive Resume
- `/src/pages/_components`: Components for each section of the CV
- `/src/pages/index.tsx`: The main page that assembles all sections

## Todo

- [ ] Add dark theme with toggle (CSS is already prepared for this)
- [ ] Implement multilingual support to have the CV in multiple languages
- [ ] Add animations to improve user experience
- [ ] Optimize font and image loading
- [ ] Create a Dockerfile for easy deployment

## Contribution

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

MIT
