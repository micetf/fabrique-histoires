import { useState, useEffect, useCallback } from "react";
import { themes as predefinedThemes } from "../data/themes";
import {
    getCustomThemes,
    saveLastTheme,
    getLastTheme,
} from "../utils/storageManager";

/**
 * Hook personnalisé pour gérer les thèmes (prédéfinis et personnalisés)
 * @returns {Object} Thèmes et fonctions de gestion
 */
export const useThemes = () => {
    // Initialiser avec une fonction lazy pour éviter le useEffect
    const [currentThemeId, setCurrentThemeId] = useState(() => getLastTheme());
    const [customThemes, setCustomThemes] = useState(() => getCustomThemes());

    // Sauvegarder le dernier thème sélectionné (pas de setState dans useEffect)
    useEffect(() => {
        saveLastTheme(currentThemeId);
    }, [currentThemeId]);

    /**
     * Récupère tous les thèmes disponibles (prédéfinis + personnalisés)
     */
    const getAllAvailableThemes = useCallback(() => {
        const predefined = Object.values(predefinedThemes);
        return [...predefined, ...customThemes];
    }, [customThemes]);

    /**
     * Récupère le thème actuel
     */
    const getCurrentTheme = useCallback(() => {
        // Chercher d'abord dans les thèmes prédéfinis
        if (predefinedThemes[currentThemeId]) {
            return predefinedThemes[currentThemeId];
        }

        // Puis dans les thèmes personnalisés
        const customTheme = customThemes.find((t) => t.id === currentThemeId);
        if (customTheme) {
            return customTheme;
        }

        // Fallback sur le thème par défaut
        return predefinedThemes.default;
    }, [currentThemeId, customThemes]);

    /**
     * Change le thème actuel
     */
    const changeTheme = useCallback((themeId) => {
        setCurrentThemeId(themeId);
    }, []);

    /**
     * Recharge les thèmes personnalisés depuis le localStorage
     */
    const reloadCustomThemes = useCallback(() => {
        const loaded = getCustomThemes();
        setCustomThemes(loaded);
    }, []);

    return {
        currentThemeId,
        currentTheme: getCurrentTheme(),
        allThemes: getAllAvailableThemes(),
        predefinedThemes: Object.values(predefinedThemes),
        customThemes,
        changeTheme,
        reloadCustomThemes,
    };
};
