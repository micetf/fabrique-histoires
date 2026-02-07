// src/App.jsx
import "@fontsource/opendyslexic/400.css";
import "@fontsource/opendyslexic/700.css";

import React from "react";
import { Navbar } from "@micetf/ui";
import StoryBuilder from "./components/StoryBuilder";
import { FullscreenButton, DyslexiaToggle } from "./components/Controls";

/**
 * Composant racine de l'application Fabrique à Histoires
 * @component
 */
function App() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Navbar MiCetF */}
            <Navbar
                breadcrumb={["MiCetF", "Fabrique à Histoires"]}
                subtitle="Clique sur les bandes pour créer des histoires rigolotes !"
                showHelp={false}
                showSearch={false}
                baseUrl="https://micetf.fr"
                contactEmail="webmaster@micetf.fr"
            />

            {/* Espaceur pour compenser la navbar fixe */}
            <div className="pt-16"></div>

            {/* Boutons flottants */}
            <FullscreenButton />
            <DyslexiaToggle />

            {/* Contenu principal */}
            <StoryBuilder />
        </div>
    );
}

export default App;
