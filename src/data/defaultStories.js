/**
 * Configuration par défaut pour l'application
 * Maintenu pour la compatibilité avec le code existant
 */

/**
 * Configuration par défaut du nombre de bandes
 */
export const DEFAULT_BAND_COUNT = 3;

/**
 * Limites du nombre de bandes
 */
export const MIN_BANDS = 2;
export const MAX_BANDS = 5;

/**
 * Contenu par défaut (thème classique)
 * Redirige vers le système de thèmes pour centraliser la gestion
 */
import { themes } from "./themes";

export const defaultStories = themes.default.bands;
