// src/components/StoryBuilder/StoryBuilder.jsx
import React, { useState, useEffect } from "react";
import StoryBand from "../StoryBand/StoryBand";
import StoryPreview from "./StoryPreview";
import ThemeSelector from "../ThemeSelector/ThemeSelector";
import ThemeEditor from "../ThemeEditor";
import FavoritesList from "../Favorites/FavoritesList";
import ThemeImportExport from "../ThemeImportExport";
import {
    RandomButton,
    BandCountSelector,
    ExportButton,
    FavoriteButton,
    ExportThemeButton,
} from "../Controls";
import { useStoryBands } from "../../hooks/useStoryBands";
import { useThemes } from "../../hooks/useThemes";
import { DEFAULT_BAND_COUNT } from "../../data/defaultStories";
import {
    deleteCustomTheme,
    renameCustomTheme,
} from "../../utils/storageManager";

/**
 * Composant principal de construction d'histoires
 * @component
 */
const StoryBuilder = () => {
    const {
        currentThemeId,
        currentTheme,
        allThemes,
        changeTheme,
        reloadCustomThemes,
    } = useThemes();

    const {
        bandCount,
        bandsContent,
        activeIndices,
        changeBandCount,
        rotateBand,
        randomize,
        setContent,
        getCurrentSentence,
    } = useStoryBands(DEFAULT_BAND_COUNT, currentTheme.bands);

    const [showThemeEditor, setShowThemeEditor] = useState(false);
    const [showFavorites, setShowFavorites] = useState(false);
    const [showImportExport, setShowImportExport] = useState(false);
    const [editingTheme, setEditingTheme] = useState(null);

    // Mettre à jour le contenu quand le thème change
    useEffect(() => {
        setContent(currentTheme.bands);
    }, [currentTheme, setContent]);

    /**
     * Gère le changement de thème
     */
    const handleThemeChange = (themeId) => {
        changeTheme(themeId);
    };

    /**
     * Ouvre l'éditeur pour créer un nouveau thème
     */
    const handleCreateNewTheme = () => {
        setEditingTheme(null);
        setShowThemeEditor(true);
    };

    /**
     * Ouvre la modale d'import (appelé depuis ThemeSelector)
     */
    const handleOpenImport = () => {
        setShowImportExport(true);
    };

    /**
     * Sauvegarde un thème (nouveau ou modifié)
     */
    const handleSaveTheme = (theme) => {
        reloadCustomThemes();
        changeTheme(theme.id);
        setShowThemeEditor(false);
        setEditingTheme(null);
    };

    /**
     * Renomme un thème personnalisé
     */
    const handleThemeRenamed = (themeId, newName) => {
        const success = renameCustomTheme(themeId, newName);

        if (success) {
            reloadCustomThemes();
        } else {
            alert("Erreur lors du renommage du thème");
        }
    };

    /**
     * Supprime un thème personnalisé
     */
    const handleThemeDeleted = (themeId) => {
        const success = deleteCustomTheme(themeId);

        if (success) {
            reloadCustomThemes();

            // Si le thème supprimé était le thème actuel, basculer sur le thème par défaut
            if (themeId === currentThemeId) {
                changeTheme("default");
            }
        } else {
            alert("Erreur lors de la suppression du thème");
        }
    };

    /**
     * Gère l'import d'un thème
     */
    const handleThemeImported = (theme) => {
        reloadCustomThemes();
        changeTheme(theme.id);
        setShowImportExport(false);
    };

    /**
     * Charge une histoire favorite
     */
    const handleSelectFavorite = (favorite) => {
        // Charger le thème du favori si différent
        if (favorite.themeId && favorite.themeId !== currentThemeId) {
            changeTheme(favorite.themeId);
        }

        // Ajuster le nombre de bandes
        if (favorite.bandCount !== bandCount) {
            changeBandCount(favorite.bandCount);
        }

        setShowFavorites(false);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Contrôles de configuration : Thème + Nombre de bandes */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
                {/* Sélecteur de thème - occupe plus d'espace */}
                <div className="flex-1">
                    <ThemeSelector
                        themes={allThemes}
                        currentThemeId={currentThemeId}
                        onThemeChange={handleThemeChange}
                        onCreateNew={handleCreateNewTheme}
                        onThemeDeleted={handleThemeDeleted}
                        onThemeRenamed={handleThemeRenamed}
                        onImportTheme={handleOpenImport}
                    />
                </div>

                {/* Sélecteur de nombre de bandes - plus compact */}
                <div className="lg:w-auto">
                    <BandCountSelector
                        currentCount={bandCount}
                        onChange={changeBandCount}
                        maxBands={bandsContent.length}
                    />
                </div>
            </div>
            {/* Aperçu de la phrase */}
            <StoryPreview sentence={getCurrentSentence} />

            {/* Bandes interactives */}
            <div
                className="space-y-4 mb-6"
                role="group"
                aria-label="Bandes d'histoire interactives"
            >
                {Array.from({ length: bandCount }).map((_, index) => {
                    const isLastBand = index === bandCount - 1;

                    return (
                        <StoryBand
                            key={index}
                            bandIndex={index}
                            segments={
                                bandsContent[index]?.map((seg) => {
                                    // Ajouter le point à tous les segments de la dernière bande
                                    if (
                                        isLastBand &&
                                        seg &&
                                        !/[.!?]$/.test(seg)
                                    ) {
                                        return seg + ".";
                                    }
                                    return seg;
                                }) || [""]
                            }
                            activeIndex={activeIndices[index] || 0}
                            onRotate={rotateBand}
                        />
                    );
                })}
            </div>

            {/* Contrôles principaux */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 mb-6">
                <RandomButton onClick={randomize} />
                <FavoriteButton
                    sentence={getCurrentSentence}
                    bandCount={bandCount}
                    themeId={currentThemeId}
                    disabled={!getCurrentSentence}
                />
                <ExportButton
                    sentence={getCurrentSentence}
                    disabled={!getCurrentSentence}
                />
            </div>

            {/* Export de thème en HTML standalone */}
            <div className="flex justify-center mb-6">
                <ExportThemeButton theme={currentTheme} />
            </div>

            {/* Bouton Mes Favoris */}
            <div className="flex justify-center">
                <button
                    onClick={() => setShowFavorites(true)}
                    className="
                        text-indigo-600 hover:text-indigo-800
                        font-medium text-sm
                        flex items-center gap-2
                        transition-colors duration-200
                    "
                >
                    <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Voir mes favoris
                </button>
            </div>

            {/* Modale éditeur de thème */}
            {showThemeEditor && (
                <ThemeEditor
                    initialTheme={editingTheme}
                    onSave={handleSaveTheme}
                    onCancel={() => {
                        setShowThemeEditor(false);
                        setEditingTheme(null);
                    }}
                />
            )}

            {/* Modale Import/Export */}
            {showImportExport && (
                <ThemeImportExport
                    currentTheme={currentTheme}
                    allThemes={allThemes}
                    onThemeImported={handleThemeImported}
                    onClose={() => setShowImportExport(false)}
                />
            )}

            {/* Modale favoris */}
            {showFavorites && (
                <FavoritesList
                    onClose={() => setShowFavorites(false)}
                    onSelectFavorite={handleSelectFavorite}
                />
            )}
        </div>
    );
};

export default StoryBuilder;
