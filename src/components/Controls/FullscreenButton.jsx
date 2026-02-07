import React, { useState, useEffect } from "react";

/**
 * Bouton pour activer/désactiver le mode plein écran
 * Utile pour une utilisation sur TBI en classe
 * @component
 */
const FullscreenButton = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Calculer le support au montage avec fonction d'initialisation
    const [isSupported] = useState(() => {
        return !!(
            document.fullscreenEnabled ||
            document.webkitFullscreenEnabled ||
            document.mozFullScreenEnabled ||
            document.msFullscreenEnabled
        );
    });

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(
                !!(
                    document.fullscreenElement ||
                    document.webkitFullscreenElement ||
                    document.mozFullScreenElement ||
                    document.msFullscreenElement
                )
            );
        };

        // Écouter les changements de plein écran (multi-navigateurs)
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        document.addEventListener(
            "webkitfullscreenchange",
            handleFullscreenChange
        );
        document.addEventListener(
            "mozfullscreenchange",
            handleFullscreenChange
        );
        document.addEventListener("MSFullscreenChange", handleFullscreenChange);

        return () => {
            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange
            );
            document.removeEventListener(
                "webkitfullscreenchange",
                handleFullscreenChange
            );
            document.removeEventListener(
                "mozfullscreenchange",
                handleFullscreenChange
            );
            document.removeEventListener(
                "MSFullscreenChange",
                handleFullscreenChange
            );
        };
    }, []);

    const toggleFullscreen = async () => {
        try {
            const elem = document.documentElement;

            if (!isFullscreen) {
                // Entrer en plein écran (multi-navigateurs)
                if (elem.requestFullscreen) {
                    await elem.requestFullscreen();
                } else if (elem.webkitRequestFullscreen) {
                    await elem.webkitRequestFullscreen();
                } else if (elem.mozRequestFullScreen) {
                    await elem.mozRequestFullScreen();
                } else if (elem.msRequestFullscreen) {
                    await elem.msRequestFullscreen();
                }
            } else {
                // Sortir du plein écran (multi-navigateurs)
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    await document.webkitExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    await document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    await document.msExitFullscreen();
                }
            }
        } catch (error) {
            console.error("Erreur plein écran:", error);
        }
    };

    // Ne pas afficher le bouton si non supporté
    if (!isSupported) {
        return null;
    }

    return (
        <button
            onClick={toggleFullscreen}
            className="
        fixed top-4 right-4 z-50
        bg-white border-2 border-gray-300
        p-3 rounded-lg shadow-lg
        hover:bg-gray-100 hover:scale-105 hover:shadow-xl
        active:scale-95
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
      "
            aria-label={
                isFullscreen ? "Quitter le plein écran" : "Mode plein écran"
            }
            title={
                isFullscreen
                    ? "Quitter le plein écran (Échap)"
                    : "Mode plein écran pour TBI"
            }
        >
            <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                {isFullscreen ? (
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                ) : (
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    />
                )}
            </svg>
        </button>
    );
};

export default FullscreenButton;
