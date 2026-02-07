import React, { useState, useEffect } from "react";

/**
 * Toggle pour activer/désactiver la police OpenDyslexic
 * Améliore la lisibilité pour les personnes dyslexiques
 * @component
 */
const DyslexiaToggle = () => {
    const [isDyslexiaMode, setIsDyslexiaMode] = useState(() => {
        // Initialisation depuis localStorage
        const saved = localStorage.getItem("fabrique_histoires_dyslexia_mode");
        return saved === "true";
    });

    useEffect(() => {
        // Appliquer ou retirer la classe au body
        if (isDyslexiaMode) {
            document.body.classList.add("dyslexia-font");
        } else {
            document.body.classList.remove("dyslexia-font");
        }

        // Sauvegarder dans localStorage
        localStorage.setItem(
            "fabrique_histoires_dyslexia_mode",
            isDyslexiaMode.toString()
        );
    }, [isDyslexiaMode]);

    const toggleDyslexiaMode = () => {
        setIsDyslexiaMode((prev) => !prev);
    };

    return (
        <button
            onClick={toggleDyslexiaMode}
            className={`
                fixed bottom-4 right-4 z-50
                flex items-center gap-2
                px-4 py-2 rounded-lg shadow-lg
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-offset-2
                ${
                    isDyslexiaMode
                        ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
                        : "bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-500"
                }
            `}
            aria-label={
                isDyslexiaMode
                    ? "Désactiver la police pour dyslexie"
                    : "Activer la police pour dyslexie"
            }
            title={
                isDyslexiaMode
                    ? "Police dyslexie activée - Cliquer pour désactiver"
                    : "Activer la police OpenDyslexic (aide à la lecture)"
            }
        >
            {/* Icône livre/texte */}
            <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
            </svg>

            <span className="text-sm font-medium hidden sm:inline">
                {isDyslexiaMode ? "Police dyslexie ON" : "Police dyslexie"}
            </span>

            {/* Indicateur visuel ON/OFF */}
            <div
                className={`
                    w-10 h-6 rounded-full relative transition-colors
                    ${isDyslexiaMode ? "bg-blue-400" : "bg-gray-300"}
                `}
            >
                <div
                    className={`
                        absolute top-1 w-4 h-4 rounded-full bg-white
                        transition-transform duration-200
                        ${isDyslexiaMode ? "translate-x-5" : "translate-x-1"}
                    `}
                />
            </div>
        </button>
    );
};

export default DyslexiaToggle;
