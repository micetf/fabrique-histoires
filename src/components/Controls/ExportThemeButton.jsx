import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    generateStandaloneHTML,
    downloadHTMLFile,
} from "../../utils/generateStandaloneHTML";

/**
 * Bouton pour exporter un thème en fichier HTML standalone
 * Le fichier généré fonctionne 100% offline
 * @component
 */
const ExportThemeButton = ({ theme, disabled = false }) => {
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = () => {
        if (disabled) return;

        setIsExporting(true);

        try {
            // Générer le HTML standalone
            const htmlContent = generateStandaloneHTML(theme);

            // Créer le nom de fichier
            const safeThemeName = theme.name
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "") // Retirer accents
                .replace(/[^a-z0-9]/g, "-") // Remplacer caractères spéciaux
                .replace(/-+/g, "-") // Fusionner tirets multiples
                .replace(/^-|-$/g, ""); // Retirer tirets début/fin

            const filename = `theme-${safeThemeName}.html`;

            // Télécharger le fichier
            downloadHTMLFile(filename, htmlContent);

            // Feedback visuel
            setTimeout(() => setIsExporting(false), 1000);
        } catch (error) {
            console.error("Erreur lors de l'export du thème:", error);
            alert("Une erreur est survenue lors de l'export du thème.");
            setIsExporting(false);
        }
    };

    return (
        <button
            onClick={handleExport}
            disabled={disabled || isExporting}
            className={`
        bg-gradient-to-r from-indigo-500 to-purple-500
        hover:from-indigo-600 hover:to-purple-600
        disabled:from-gray-300 disabled:to-gray-400
        disabled:cursor-not-allowed
        text-white font-bold
        py-3 px-6 md:py-4 md:px-8
        rounded-full
        shadow-lg hover:shadow-xl
        transform hover:scale-105 active:scale-95
        transition-all duration-200
        focus:outline-none focus:ring-4 focus:ring-indigo-300
        flex items-center gap-2
      `}
            aria-label="Exporter le thème en HTML"
            title={
                disabled
                    ? "Sélectionnez un thème d'abord"
                    : "Exporter ce thème en fichier HTML standalone"
            }
        >
            {isExporting ? (
                <>
                    <svg
                        className="animate-spin h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    <span className="hidden sm:inline">Export...</span>
                </>
            ) : (
                <>
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
                            d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                        />
                    </svg>
                    <span className="hidden sm:inline">
                        Exporter thème HTML
                    </span>
                    <span className="sm:hidden">📦 HTML</span>
                </>
            )}
        </button>
    );
};

ExportThemeButton.propTypes = {
    theme: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        bands: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
            .isRequired,
    }).isRequired,
    disabled: PropTypes.bool,
};

export default ExportThemeButton;
