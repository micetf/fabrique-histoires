import React from "react";
import StoryBuilder from "./components/StoryBuilder";
import { FullscreenButton } from "./components/Controls";

/**
 * Composant racine de l'application Fabrique à Histoires
 * @component
 */
function App() {
    return (
        <div className="min-h-screen">
            <FullscreenButton />
            <StoryBuilder />
        </div>
    );
}

export default App;
