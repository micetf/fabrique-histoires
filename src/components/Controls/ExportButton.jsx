import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * Bouton pour exporter l'histoire en image PNG
 * Permet aux élèves de conserver leurs créations
 * @component
 */
const ExportButton = ({ sentence, disabled = false }) => {
    const [isExporting, setIsExporting] = useState(false);

    const exportAsImage = async () => {
        if (!sentence || disabled) return;

        setIsExporting(true);

        try {
            // Créer un canvas
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            // Dimensions de l'image (format A5 paysage)
            canvas.width = 1200;
            canvas.height = 800;

            // Fond dégradé
            const gradient = ctx.createLinearGradient(
                0,
                0,
                canvas.width,
                canvas.height
            );
            gradient.addColorStop(0, "#EBF4FF");
            gradient.addColorStop(0.5, "#F3E8FF");
            gradient.addColorStop(1, "#FCE7F3");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Titre
            ctx.fillStyle = "#4F46E5";
            ctx.font = "bold 48px Arial, sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("🎨 Fabrique à Histoires", canvas.width / 2, 100);

            // Bordure décorative
            ctx.strokeStyle = "#818CF8";
            ctx.lineWidth = 4;
            ctx.strokeRect(50, 180, canvas.width - 100, 480);

            // Fond blanc pour le texte
            ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
            ctx.fillRect(60, 190, canvas.width - 120, 460);

            // L'histoire
            ctx.fillStyle = "#1F2937";
            ctx.font = "bold 56px Arial, sans-serif";
            ctx.textAlign = "center";

            // Découper le texte en plusieurs lignes si nécessaire
            const maxWidth = canvas.width - 200;
            const words = sentence.split(" ");
            const lines = [];
            let currentLine = words[0];

            for (let i = 1; i < words.length; i++) {
                const testLine = currentLine + " " + words[i];
                const metrics = ctx.measureText(testLine);

                if (metrics.width > maxWidth) {
                    lines.push(currentLine);
                    currentLine = words[i];
                } else {
                    currentLine = testLine;
                }
            }
            lines.push(currentLine);

            // Centrer verticalement les lignes
            const lineHeight = 70;
            const totalHeight = lines.length * lineHeight;
            const startY = (canvas.height - totalHeight) / 2 + 100;

            lines.forEach((line, index) => {
                ctx.fillText(
                    line,
                    canvas.width / 2,
                    startY + index * lineHeight
                );
            });

            // Signature
            ctx.fillStyle = "#9CA3AF";
            ctx.font = "20px Arial, sans-serif";
            ctx.textAlign = "right";
            ctx.fillText("micetf.fr", canvas.width - 60, canvas.height - 40);

            // Convertir en blob et télécharger
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                const date = new Date().toISOString().split("T")[0];
                link.download = `fabrique-histoires-${date}.png`;
                link.href = url;
                link.click();
                URL.revokeObjectURL(url);

                setIsExporting(false);
            }, "image/png");
        } catch (error) {
            console.error("Erreur lors de l'export:", error);
            setIsExporting(false);
        }
    };

    return (
        <button
            onClick={exportAsImage}
            disabled={disabled || isExporting}
            className={`
        bg-gradient-to-r from-green-500 to-emerald-500
        hover:from-green-600 hover:to-emerald-600
        disabled:from-gray-300 disabled:to-gray-400
        disabled:cursor-not-allowed
        text-white font-bold
        py-3 px-6 md:py-4 md:px-8
        rounded-full
        shadow-lg hover:shadow-xl
        transform hover:scale-105 active:scale-95
        transition-all duration-200
        focus:outline-none focus:ring-4 focus:ring-green-300
        flex items-center gap-2
      `}
            aria-label="Télécharger l'histoire en image"
            title={
                disabled ? "Créez une histoire d'abord" : "Télécharger en PNG"
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
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                    </svg>
                    <span className="hidden sm:inline">Télécharger</span>
                    <span className="sm:hidden">💾</span>
                </>
            )}
        </button>
    );
};

ExportButton.propTypes = {
    sentence: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
};

export default ExportButton;
