# Lindy AI Landing Page

This is the official landing page for Lindy AI, a platform for building intelligent AI assistants. This project is a single-page application built with modern web technologies to showcase the capabilities of Lindy AI.

## Technologies Used

*   **Vite:** A next-generation front-end tooling that provides a faster and leaner development experience.
*   **React:** A JavaScript library for building user interfaces.
*   **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
*   **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
*   **Lucide React:** A library of simply designed, beautiful icons.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have Node.js and npm installed on your machine. You can download them from [here](https://nodejs.org/).

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/lindy-ai/website.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```

### Running the Application

To run the application in development mode, use the following command:

```sh
npm run dev
```

This will start the development server, and you can view the application by navigating to `http://localhost:5173` in your browser.

## Scripts

This project comes with the following scripts:

*   `npm run dev`: Runs the app in the development mode.
*   `npm run build`: Builds the app for production to the `dist` folder.
*   `npm run lint`: Lints the code using ESLint.
*   `npm run preview`: Serves the production build locally for preview.

## Project Structure

The source code for this project is located in the `src` directory.

```
src/
├── components/       # Reusable React components
│   ├── AnimatedBackground.tsx
│   ├── Features.tsx
│   ├── FloatingElements.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── InteractiveStats.tsx
│   ├── MouseFollower.tsx
│   ├── Navigation.tsx
│   ├── ParticleSystem.tsx
│   ├── ScrollProgress.tsx
│   ├── Testimonials.tsx
│   └── TypingAnimation.tsx
├── App.tsx           # Main application component
├── index.css         # Global CSS styles
├── main.tsx          # Entry point of the application
└── vite-env.d.ts     # TypeScript definitions for Vite
```

The `App.tsx` file is the main component that assembles all the other components. The `components` directory contains all the individual sections of the landing page.
