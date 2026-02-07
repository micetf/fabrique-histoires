// Imports des polices OpenDyslexic
import "@fontsource/opendyslexic/400.css";
import "@fontsource/opendyslexic/700.css";

import React from "react";
import StoryBuilder from "./components/StoryBuilder";
import { FullscreenButton, DyslexiaToggle } from "./components/Controls"; // ⭐ Ajout

/**
 * Composant racine de l'application Fabrique à Histoires
 * @component
 */
function App() {
    return (
        <div className="min-h-screen">
            <FullscreenButton />
            <DyslexiaToggle /> {/* ⭐ NOUVEAU */}
            <StoryBuilder />
        </div>
    );
}

export default App;
