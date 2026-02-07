/**
 * Gestionnaire de sauvegarde locale (localStorage)
 * Gère les histoires favorites et les thèmes personnalisés
 */

const STORAGE_KEYS = {
    FAVORITES: "fabrique_histoires_favorites",
    CUSTOM_THEMES: "fabrique_histoires_custom_themes",
    LAST_THEME: "fabrique_histoires_last_theme",
    SETTINGS: "fabrique_histoires_settings",
};

/**
 * Sauvegarde une histoire favorite
 * @param {Object} story - Objet contenant sentence, bandCount, date
 * @returns {boolean} Succès de la sauvegarde
 */
export const saveFavorite = (story) => {
    try {
        const favorites = getFavorites();
        const newFavorite = {
            id: Date.now(),
            sentence: story.sentence,
            bandCount: story.bandCount,
            themeId: story.themeId || "default",
            date: new Date().toISOString(),
        };

        favorites.unshift(newFavorite); // Ajouter au début

        // Limiter à 50 favoris
        if (favorites.length > 50) {
            favorites.pop();
        }

        localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
        return true;
    } catch (error) {
        console.error("Erreur sauvegarde favori:", error);
        return false;
    }
};

/**
 * Récupère tous les favoris
 * @returns {Array} Liste des histoires favorites
 */
export const getFavorites = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Erreur lecture favoris:", error);
        return [];
    }
};

/**
 * Supprime un favori
 * @param {number} id - ID du favori à supprimer
 * @returns {boolean} Succès de la suppression
 */
export const deleteFavorite = (id) => {
    try {
        const favorites = getFavorites();
        const filtered = favorites.filter((fav) => fav.id !== id);
        localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(filtered));
        return true;
    } catch (error) {
        console.error("Erreur suppression favori:", error);
        return false;
    }
};

/**
 * Sauvegarde un thème personnalisé
 * @param {Object} theme - Objet thème complet
 * @returns {boolean} Succès de la sauvegarde
 */
export const saveCustomTheme = (theme) => {
    try {
        const customThemes = getCustomThemes();
        const newTheme = {
            ...theme,
            id: theme.id || `custom_${Date.now()}`,
            createdAt: new Date().toISOString(),
            isCustom: true,
        };

        // Vérifier si le thème existe déjà (mise à jour)
        const existingIndex = customThemes.findIndex(
            (t) => t.id === newTheme.id
        );
        if (existingIndex >= 0) {
            customThemes[existingIndex] = newTheme;
        } else {
            customThemes.push(newTheme);
        }

        localStorage.setItem(
            STORAGE_KEYS.CUSTOM_THEMES,
            JSON.stringify(customThemes)
        );
        return true;
    } catch (error) {
        console.error("Erreur sauvegarde thème:", error);
        return false;
    }
};

/**
 * Récupère tous les thèmes personnalisés
 * @returns {Array} Liste des thèmes personnalisés
 */
export const getCustomThemes = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_THEMES);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Erreur lecture thèmes:", error);
        return [];
    }
};

/**
 * Supprime un thème personnalisé
 * @param {string} themeId - ID du thème à supprimer
 * @returns {boolean} Succès de la suppression
 */
export const deleteCustomTheme = (themeId) => {
    try {
        const customThemes = getCustomThemes();
        const filtered = customThemes.filter((theme) => theme.id !== themeId);
        localStorage.setItem(
            STORAGE_KEYS.CUSTOM_THEMES,
            JSON.stringify(filtered)
        );
        return true;
    } catch (error) {
        console.error("Erreur suppression thème:", error);
        return false;
    }
};

/**
 * Sauvegarde le dernier thème utilisé
 * @param {string} themeId - ID du thème
 */
export const saveLastTheme = (themeId) => {
    try {
        localStorage.setItem(STORAGE_KEYS.LAST_THEME, themeId);
    } catch (error) {
        console.error("Erreur sauvegarde dernier thème:", error);
    }
};

/**
 * Récupère le dernier thème utilisé
 * @returns {string} ID du dernier thème ou 'default'
 */
export const getLastTheme = () => {
    try {
        return localStorage.getItem(STORAGE_KEYS.LAST_THEME) || "default";
    } catch (error) {
        console.error("Erreur lecture dernier thème:", error);
        return "default";
    }
};

/**
 * Exporte toutes les données en JSON
 * @returns {string} JSON des données
 */
export const exportAllData = () => {
    try {
        const data = {
            favorites: getFavorites(),
            customThemes: getCustomThemes(),
            lastTheme: getLastTheme(),
            exportDate: new Date().toISOString(),
        };
        return JSON.stringify(data, null, 2);
    } catch (error) {
        console.error("Erreur export données:", error);
        return null;
    }
};

/**
 * Importe des données depuis JSON
 * @param {string} jsonData - Données JSON
 * @returns {boolean} Succès de l'import
 */
export const importAllData = (jsonData) => {
    try {
        const data = JSON.parse(jsonData);

        if (data.favorites) {
            localStorage.setItem(
                STORAGE_KEYS.FAVORITES,
                JSON.stringify(data.favorites)
            );
        }
        if (data.customThemes) {
            localStorage.setItem(
                STORAGE_KEYS.CUSTOM_THEMES,
                JSON.stringify(data.customThemes)
            );
        }
        if (data.lastTheme) {
            localStorage.setItem(STORAGE_KEYS.LAST_THEME, data.lastTheme);
        }

        return true;
    } catch (error) {
        console.error("Erreur import données:", error);
        return false;
    }
};
