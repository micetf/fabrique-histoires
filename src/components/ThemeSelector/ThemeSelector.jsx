import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * Sélecteur de thèmes avec preview, rename, delete, et IMPORT
 * @component
 */
const ThemeSelector = ({
    themes,
    currentThemeId,
    onThemeChange,
    onCreateNew,
    onThemeDeleted,
    onThemeRenamed,
    onImportTheme, // ⭐ NOUVEAU
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [renamingThemeId, setRenamingThemeId] = useState(null);
    const [newName, setNewName] = useState("");

    const handleThemeSelect = (themeId) => {
        onThemeChange(themeId);
        setIsOpen(false);
    };

    const handleStartRename = (theme, e) => {
        e.stopPropagation();
        setRenamingThemeId(theme.id);
        setNewName(theme.name);
    };

    const handleConfirmRename = (themeId, e) => {
        e.stopPropagation();

        if (
            newName.trim() &&
            newName !== themes.find((t) => t.id === themeId)?.name
        ) {
            onThemeRenamed(themeId, newName.trim());
        }

        setRenamingThemeId(null);
        setNewName("");
    };

    const handleCancelRename = (e) => {
        e.stopPropagation();
        setRenamingThemeId(null);
        setNewName("");
    };

    const handleDelete = (themeId, themeName, e) => {
        e.stopPropagation();

        if (
            window.confirm(`Supprimer définitivement le thème "${themeName}" ?`)
        ) {
            onThemeDeleted(themeId);
        }
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
                        <div
                            key={theme.id}
                            className={`
                                flex items-center gap-3 p-3
                                hover:bg-indigo-50
                                transition-colors duration-150
                                ${theme.id === currentThemeId ? "bg-indigo-100" : ""}
                            `}
                        >
                            {/* Zone cliquable pour sélection */}
                            <button
                                onClick={() => handleThemeSelect(theme.id)}
                                className="flex-1 flex items-center gap-3 text-left"
                            >
                                <span className="text-2xl">{theme.icon}</span>
                                <div className="flex-1">
                                    {renamingThemeId === theme.id ? (
                                        <div
                                            className="flex items-center gap-2"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <input
                                                type="text"
                                                value={newName}
                                                onChange={(e) =>
                                                    setNewName(e.target.value)
                                                }
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter")
                                                        handleConfirmRename(
                                                            theme.id,
                                                            e
                                                        );
                                                    if (e.key === "Escape")
                                                        handleCancelRename(e);
                                                }}
                                                className="flex-1 px-2 py-1 border border-indigo-400 rounded text-sm"
                                                autoFocus
                                                maxLength={50}
                                            />
                                            <button
                                                onClick={(e) =>
                                                    handleConfirmRename(
                                                        theme.id,
                                                        e
                                                    )
                                                }
                                                className="p-1 text-green-600 hover:bg-green-100 rounded"
                                                title="Valider"
                                            >
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={handleCancelRename}
                                                className="p-1 text-red-600 hover:bg-red-100 rounded"
                                                title="Annuler"
                                            >
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="font-semibold text-gray-800 flex items-center gap-2">
                                            {theme.name}
                                            {theme.isCustom && (
                                                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                                                    Personnalisé
                                                </span>
                                            )}
                                        </div>
                                    )}
                                    {renamingThemeId !== theme.id && (
                                        <div className="text-xs text-gray-500">
                                            {theme.description}
                                        </div>
                                    )}
                                </div>
                            </button>

                            {/* Icône de sélection */}
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

                            {/* Boutons Renommer/Supprimer pour thèmes custom */}
                            {theme.isCustom && renamingThemeId !== theme.id && (
                                <div className="flex gap-1">
                                    <button
                                        onClick={(e) =>
                                            handleStartRename(theme, e)
                                        }
                                        className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                                        title="Renommer"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                            />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={(e) =>
                                            handleDelete(
                                                theme.id,
                                                theme.name,
                                                e
                                            )
                                        }
                                        className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                                        title="Supprimer"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* ⭐ NOUVEAU : Bouton Importer un thème */}
                    <button
                        onClick={() => {
                            onImportTheme();
                            setIsOpen(false);
                        }}
                        className="
                            w-full flex items-center justify-center gap-2 p-3
                            border-t-2 border-gray-200
                            bg-gradient-to-r from-blue-50 to-cyan-50
                            hover:from-blue-100 hover:to-cyan-100
                            font-semibold text-blue-700
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
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                        </svg>
                        Importer un thème (.md / .txt)
                    </button>

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
    onThemeDeleted: PropTypes.func.isRequired,
    onThemeRenamed: PropTypes.func.isRequired,
    onImportTheme: PropTypes.func.isRequired, // ⭐ NOUVEAU
};

export default ThemeSelector;
