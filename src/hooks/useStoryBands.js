import { useState, useCallback, useMemo } from "react";

/**
 * Hook personnalisé pour gérer l'état et la logique des bandes d'histoire
 * @param {number} initialBandCount - Nombre initial de bandes (2-5)
 * @param {Array} initialContent - Contenu initial des bandes
 * @returns {Object} État et fonctions de manipulation des bandes
 */
export const useStoryBands = (initialBandCount = 3, initialContent = []) => {
    const [bandsContent, setBandsContent] = useState(initialContent);

    const [bandCount, setBandCount] = useState(() => {
        return Math.min(initialBandCount, initialContent.length);
    });

    const [activeIndices, setActiveIndices] = useState(() => {
        const count = Math.min(initialBandCount, initialContent.length);
        return new Array(count).fill(0);
    });

    /**
     * Change le nombre de bandes actives
     * @param {number} count - Nouveau nombre de bandes (2-5)
     */
    const changeBandCount = useCallback(
        (count) => {
            const validCount = Math.max(
                2,
                Math.min(5, Math.min(count, bandsContent.length))
            );
            setBandCount(validCount);

            setActiveIndices((prev) => {
                if (validCount > prev.length) {
                    return [
                        ...prev,
                        ...new Array(validCount - prev.length).fill(0),
                    ];
                }
                return prev.slice(0, validCount);
            });
        },
        [bandsContent.length]
    );

    /**
     * Fait défiler une bande vers le segment suivant
     * @param {number} bandIndex - Index de la bande à faire défiler
     */
    const rotateBand = useCallback(
        (bandIndex) => {
            setActiveIndices((prev) => {
                const newIndices = [...prev];
                const bandLength = bandsContent[bandIndex]?.length || 1;
                newIndices[bandIndex] =
                    (newIndices[bandIndex] + 1) % bandLength;
                return newIndices;
            });
        },
        [bandsContent]
    );

    /**
     * Génère une combinaison aléatoire
     */
    const randomize = useCallback(() => {
        setActiveIndices((prev) => {
            return prev.map((_, index) => {
                const bandLength = bandsContent[index]?.length || 1;
                return Math.floor(Math.random() * bandLength);
            });
        });
    }, [bandsContent]);

    /**
     * Change complètement le contenu des bandes (pour changement de thème)
     * @param {Array} newContent - Nouveau contenu des bandes
     */
    const setContent = useCallback(
        (newContent) => {
            setBandsContent(newContent);
            const newCount = Math.min(bandCount, newContent.length);
            setBandCount(newCount);
            setActiveIndices(new Array(newCount).fill(0));
        },
        [bandCount]
    );

    /**
     * Récupère la phrase complète actuelle avec ponctuation finale
     * Utilise useMemo pour éviter les recalculs inutiles
     * @returns {string} Phrase formée par les segments actifs avec ponctuation
     */
    const getCurrentSentence = useMemo(() => {
        const sentence = activeIndices
            .slice(0, bandCount)
            .map((index, bandIndex) => {
                const segment = bandsContent[bandIndex]?.[index];
                return segment || "";
            })
            .filter(Boolean)
            .join(" ")
            .trim();

        // Ajouter un point si la phrase ne se termine pas par une ponctuation
        if (sentence && !/[.!?]$/.test(sentence)) {
            return sentence + ".";
        }

        return sentence;
    }, [activeIndices, bandsContent, bandCount]);

    return {
        bandCount,
        bandsContent,
        activeIndices,
        changeBandCount,
        rotateBand,
        randomize,
        setContent,
        getCurrentSentence,
    };
};
