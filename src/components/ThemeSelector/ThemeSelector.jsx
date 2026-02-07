import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * Sélecteur de thèmes avec preview
 * @component
 */
const ThemeSelector = ({
    themes,
    currentThemeId,
    onThemeChange,
    onCreateNew,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleThemeSelect = (themeId) => {
        onThemeChange(themeId);
        setIsOpen(false);
    };

    const currentTheme =
        themes.find((t) => t.id === currentThemeId) || themes[0];

    return (
        <div className="relative mb-6">
            {/* Bouton sélecteur */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="
          w-full sm:w-auto
          flex items-center justify-between gap-3
          bg-white border-2 border-gray-300
          hover:border-indigo-400
          px-4 py-3 rounded-lg
          shadow-md hover:shadow-lg
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-indigo-500
        "
            >
                <div className="flex items-center gap-2">
                    <span className="text-2xl">{currentTheme.icon}</span>
                    <div className="text-left">
                        <div className="font-semibold text-gray-800">
                            {currentTheme.name}
                        </div>
                        <div className="text-xs text-gray-500">
                            {currentTheme.description}
                        </div>
                    </div>
                </div>
                <svg
                    className={`w-5 h-5 text-gray-600 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {/* Menu déroulant */}
            {isOpen && (
                <div
                    className="
          absolute top-full left-0 right-0 mt-2 z-50
          bg-white border-2 border-gray-300 rounded-lg shadow-xl
          max-h-96 overflow-y-auto
        "
                >
                    {themes.map((theme) => (
                        <button
                            key={theme.id}
                            onClick={() => handleThemeSelect(theme.id)}
                            className={`
                w-full flex items-center gap-3 p-3
                hover:bg-indigo-50
                transition-colors duration-150
                ${theme.id === currentThemeId ? "bg-indigo-100" : ""}
              `}
                        >
                            <span className="text-2xl">{theme.icon}</span>
                            <div className="flex-1 text-left">
                                <div className="font-semibold text-gray-800 flex items-center gap-2">
                                    {theme.name}
                                    {theme.isCustom && (
                                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                                            Personnalisé
                                        </span>
                                    )}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {theme.description}
                                </div>
                            </div>
                            {theme.id === currentThemeId && (
                                <svg
                                    className="w-5 h-5 text-indigo-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                        </button>
                    ))}

                    {/* Bouton créer nouveau thème */}
                    <button
                        onClick={() => {
                            onCreateNew();
                            setIsOpen(false);
                        }}
                        className="
              w-full flex items-center justify-center gap-2 p-3
              border-t-2 border-gray-200
              bg-gradient-to-r from-purple-50 to-pink-50
              hover:from-purple-100 hover:to-pink-100
              font-semibold text-purple-700
              transition-colors duration-150
            "
                    >
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
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        Créer un nouveau thème
                    </button>
                </div>
            )}

            {/* Overlay pour fermer le menu */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

ThemeSelector.propTypes = {
    themes: PropTypes.array.isRequired,
    currentThemeId: PropTypes.string.isRequired,
    onThemeChange: PropTypes.func.isRequired,
    onCreateNew: PropTypes.func.isRequired,
};

export default ThemeSelector;
