import React, { useState } from "react";
import PropTypes from "prop-types";
import BandEditor from "./BandEditor";
import { saveCustomTheme } from "../../utils/storageManager";

/**
 * Éditeur de thèmes personnalisés
 * Permet aux enseignants de créer leurs propres corpus
 * @component
 */
const ThemeEditor = ({ onSave, onCancel, initialTheme = null }) => {
    const [themeName, setThemeName] = useState(initialTheme?.name || "");
    const [themeIcon, setThemeIcon] = useState(initialTheme?.icon || "🎨");
    const [themeDescription, setThemeDescription] = useState(
        initialTheme?.description || ""
    );
    const [bands, setBands] = useState(() => {
        if (initialTheme?.bands) {
            return initialTheme.bands;
        }
        // Template vide : 5 bandes avec 6 segments vides chacune
        return Array(5)
            .fill(null)
            .map(() => Array(6).fill(""));
    });
    const [errors, setErrors] = useState({});

    /**
     * Icônes suggérées pour les thèmes
     */
    const suggestedIcons = [
        "🎨",
        "📚",
        "🦁",
        "🎒",
        "🏖️",
        "🧚",
        "🚀",
        "⚽",
        "🎭",
        "🎵",
        "🌍",
        "🍎",
        "🌈",
        "⭐",
        "🎪",
        "🎨",
        "🔬",
        "🏰",
        "🌳",
        "🎁",
    ];

    /**
     * Suggestions de noms de bandes
     * Structure grammaticale explicite alignée sur les programmes cycles 2-3
     */
    const bandNameSuggestions = [
        "Groupe nominal sujet (Qui ?)",
        "Verbe transitif (Fait quoi ?)",
        "Complément d'objet direct (Quoi ?)",
        "Complément circonstanciel de lieu (Où ?)",
        "Complément circonstanciel / Finale (Quand ? Comment ? Pourquoi ?)",
    ];

    /**
     * Met à jour un segment d'une bande
     */
    const updateSegment = (bandIndex, segmentIndex, value) => {
        setBands((prev) => {
            const newBands = [...prev];
            newBands[bandIndex] = [...newBands[bandIndex]];
            newBands[bandIndex][segmentIndex] = value;
            return newBands;
        });

        // Effacer l'erreur pour ce segment
        if (errors[`band-${bandIndex}-segment-${segmentIndex}`]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[`band-${bandIndex}-segment-${segmentIndex}`];
                return newErrors;
            });
        }
    };

    /**
     * Ajoute un segment à une bande
     */
    const addSegment = (bandIndex) => {
        setBands((prev) => {
            const newBands = [...prev];
            newBands[bandIndex] = [...newBands[bandIndex], ""];
            return newBands;
        });
    };

    /**
     * Supprime un segment d'une bande
     */
    const removeSegment = (bandIndex, segmentIndex) => {
        if (bands[bandIndex].length <= 2) {
            alert("Une bande doit contenir au moins 2 segments");
            return;
        }

        setBands((prev) => {
            const newBands = [...prev];
            newBands[bandIndex] = newBands[bandIndex].filter(
                (_, i) => i !== segmentIndex
            );
            return newBands;
        });
    };

    /**
     * Valide le formulaire
     */
    const validate = () => {
        const newErrors = {};

        // Valider le nom
        if (!themeName.trim()) {
            newErrors.name = "Le nom du thème est requis";
        }

        // Valider chaque bande
        bands.forEach((band, bandIndex) => {
            const filledSegments = band.filter((s) => s.trim() !== "");

            if (filledSegments.length < 2) {
                newErrors[`band-${bandIndex}`] =
                    `La bande ${bandIndex + 1} doit contenir au moins 2 segments remplis`;
            }

            // Vérifier les segments vides au milieu
            band.forEach((segment, segmentIndex) => {
                if (
                    !segment.trim() &&
                    segmentIndex < band.length - 1 &&
                    band[segmentIndex + 1].trim()
                ) {
                    newErrors[`band-${bandIndex}-segment-${segmentIndex}`] =
                        "Segment vide";
                }
            });
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * Sauvegarde le thème
     */
    const handleSave = () => {
        if (!validate()) {
            return;
        }

        // Nettoyer les bandes (supprimer les segments vides à la fin)
        const cleanedBands = bands.map((band) =>
            band.filter((segment) => segment.trim() !== "")
        );

        const theme = {
            id: initialTheme?.id || `custom_${Date.now()}`,
            name: themeName.trim(),
            icon: themeIcon,
            description:
                themeDescription.trim() || `Thème personnalisé : ${themeName}`,
            bands: cleanedBands,
            isCustom: true,
        };

        const success = saveCustomTheme(theme);

        if (success) {
            onSave(theme);
        } else {
            alert("Erreur lors de la sauvegarde du thème");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* En-tête */}
                <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-xl">
                    <h2 className="text-2xl font-bold mb-2">
                        {initialTheme
                            ? "✏️ Modifier le thème"
                            : "✨ Créer un nouveau thème"}
                    </h2>
                    <p className="text-purple-100">
                        Personnalisez les bandes pour créer vos propres
                        histoires
                    </p>
                </div>

                {/* Corps */}
                <div className="p-6 space-y-6">
                    {/* Informations du thème */}
                    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                        <h3 className="font-semibold text-lg text-gray-800 mb-3">
                            📋 Informations du thème
                        </h3>

                        {/* Nom du thème */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nom du thème *
                            </label>
                            <input
                                type="text"
                                value={themeName}
                                onChange={(e) => setThemeName(e.target.value)}
                                placeholder="Ex: Les pirates, La préhistoire..."
                                className={`
                  w-full px-3 py-2 border rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-purple-500
                  ${errors.name ? "border-red-500" : "border-gray-300"}
                `}
                                maxLength={50}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Icône */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Icône du thème
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={themeIcon}
                                    onChange={(e) =>
                                        setThemeIcon(e.target.value)
                                    }
                                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center text-2xl"
                                    maxLength={2}
                                />
                                <div className="flex flex-wrap gap-1">
                                    {suggestedIcons.map((icon) => (
                                        <button
                                            key={icon}
                                            onClick={() => setThemeIcon(icon)}
                                            className={`
                        w-10 h-10 rounded-lg text-xl
                        hover:bg-purple-100 transition-colors
                        ${icon === themeIcon ? "bg-purple-200 ring-2 ring-purple-500" : "bg-gray-100"}
                      `}
                                        >
                                            {icon}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description (optionnelle)
                            </label>
                            <input
                                type="text"
                                value={themeDescription}
                                onChange={(e) =>
                                    setThemeDescription(e.target.value)
                                }
                                placeholder="Ex: Aventures de pirates et trésors cachés"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                maxLength={100}
                            />
                        </div>
                    </div>

                    {/* Éditeur de bandes */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg text-gray-800">
                                🎬 Contenu des bandes
                            </h3>
                            <p className="text-sm text-gray-500">
                                Minimum 2 segments par bande
                            </p>
                        </div>

                        {bands.map((band, bandIndex) => (
                            <BandEditor
                                key={bandIndex}
                                bandIndex={bandIndex}
                                segments={band}
                                onUpdateSegment={updateSegment}
                                onAddSegment={addSegment}
                                onRemoveSegment={removeSegment}
                                error={errors[`band-${bandIndex}`]}
                                nameSuggestions={bandNameSuggestions}
                            />
                        ))}
                    </div>

                    {/* Aide */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 mb-2">
                            💡 Conseils
                        </h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>
                                • Utilisez 3 à 5 bandes selon le niveau des
                                élèves
                            </li>
                            <li>
                                • Prévoyez au moins 4-6 segments par bande pour
                                varier les histoires
                            </li>
                            <li>
                                • Gardez les segments courts et simples (3-5
                                mots maximum)
                            </li>
                            <li>
                                • Pensez à la cohérence grammaticale entre les
                                bandes
                            </li>
                            <li>• Testez votre thème avant de le valider !</li>
                        </ul>
                    </div>
                </div>

                {/* Pied de page */}
                <div className="sticky bottom-0 bg-gray-50 p-6 rounded-b-xl border-t flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="
              px-6 py-2 rounded-lg
              bg-gray-200 hover:bg-gray-300
              text-gray-700 font-medium
              transition-colors duration-200
            "
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleSave}
                        className="
              px-6 py-2 rounded-lg
              bg-gradient-to-r from-purple-600 to-pink-600
              hover:from-purple-700 hover:to-pink-700
              text-white font-medium
              transition-all duration-200
              shadow-lg hover:shadow-xl
            "
                    >
                        💾 Sauvegarder le thème
                    </button>
                </div>
            </div>
        </div>
    );
};

ThemeEditor.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    initialTheme: PropTypes.object,
};

export default ThemeEditor;
