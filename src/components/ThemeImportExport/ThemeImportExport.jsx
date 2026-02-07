import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import {
    downloadThemeAsMarkdown,
    importThemeFile,
    checkThemeNameConflict,
    generateUniqueName,
    validateTheme,
} from "../../utils/themeImportExport";
import { saveCustomTheme } from "../../utils/storageManager";

/**
 * Composant de gestion de l'import/export de thèmes
 * @component
 */
const ThemeImportExport = ({
    currentTheme,
    allThemes,
    onThemeImported,
    onClose,
}) => {
    const [importStatus, setImportStatus] = useState(null);
    const [showConflictDialog, setShowConflictDialog] = useState(false);
    const [conflictTheme, setConflictTheme] = useState(null);
    const [newName, setNewName] = useState("");
    const fileInputRef = useRef(null);

    /**
     * Gère l'export du thème actuel
     */
    const handleExport = () => {
        if (!currentTheme) {
            setImportStatus({
                type: "error",
                message: "Aucun thème sélectionné",
            });
            return;
        }

        try {
            downloadThemeAsMarkdown(currentTheme);
            setImportStatus({
                type: "success",
                message: `Thème "${currentTheme.name}" exporté avec succès !`,
            });
        } catch (error) {
            setImportStatus({
                type: "error",
                message: `Erreur lors de l'export : ${error.message}`,
            });
        }
    };

    /**
     * Gère la sélection d'un fichier à importer
     */
    const handleFileSelect = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setImportStatus({
            type: "info",
            message: "Import en cours...",
        });

        try {
            const importedTheme = await importThemeFile(file);

            if (!importedTheme) {
                throw new Error("Impossible de lire le fichier");
            }

            // Validation
            const validation = validateTheme(importedTheme);
            if (!validation.valid) {
                throw new Error(
                    `Thème invalide : ${validation.errors.join(", ")}`
                );
            }

            // Vérifier les conflits de nom
            if (checkThemeNameConflict(importedTheme.name, allThemes)) {
                setConflictTheme(importedTheme);
                setNewName(generateUniqueName(importedTheme.name, allThemes));
                setShowConflictDialog(true);
                setImportStatus(null);
            } else {
                // Pas de conflit, sauvegarder directement
                saveImportedTheme(importedTheme);
            }
        } catch (error) {
            setImportStatus({
                type: "error",
                message: `Erreur lors de l'import : ${error.message}`,
            });
        }

        // Réinitialiser l'input pour permettre de ré-importer le même fichier
        event.target.value = "";
    };

    /**
     * Sauvegarde un thème importé
     */
    const saveImportedTheme = (theme) => {
        const success = saveCustomTheme(theme);

        if (success) {
            setImportStatus({
                type: "success",
                message: `Thème "${theme.name}" importé avec succès !`,
            });
            onThemeImported(theme);
        } else {
            setImportStatus({
                type: "error",
                message: "Erreur lors de la sauvegarde du thème",
            });
        }
    };

    /**
     * Résout le conflit de nom en renommant
     */
    const handleResolveConflict = (action) => {
        if (action === "rename") {
            const renamedTheme = {
                ...conflictTheme,
                name: newName,
            };
            saveImportedTheme(renamedTheme);
        } else if (action === "replace") {
            // Trouver l'ancien thème et le remplacer
            const existingTheme = allThemes.find(
                (t) => t.name.toLowerCase() === conflictTheme.name.toLowerCase()
            );
            if (existingTheme) {
                const replacedTheme = {
                    ...conflictTheme,
                    id: existingTheme.id, // Garder l'ID existant
                };
                saveImportedTheme(replacedTheme);
            }
        }

        setShowConflictDialog(false);
        setConflictTheme(null);
        setNewName("");
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full">
                {/* En-tête */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold mb-1">
                                📤 Import / Export de thèmes
                            </h2>
                            <p className="text-blue-100 text-sm">
                                Partagez vos thèmes avec d'autres enseignants
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                            aria-label="Fermer"
                        >
                            <svg
                                className="w-6 h-6"
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
                </div>

                {/* Corps */}
                <div className="p-6 space-y-6">
                    {/* Message de statut */}
                    {importStatus && (
                        <div
                            className={`
                            p-4 rounded-lg border-2
                            ${importStatus.type === "success" ? "bg-green-50 border-green-300 text-green-800" : ""}
                            ${importStatus.type === "error" ? "bg-red-50 border-red-300 text-red-800" : ""}
                            ${importStatus.type === "info" ? "bg-blue-50 border-blue-300 text-blue-800" : ""}
                        `}
                        >
                            <p className="flex items-center gap-2">
                                {importStatus.type === "success" && "✅"}
                                {importStatus.type === "error" && "❌"}
                                {importStatus.type === "info" && "ℹ️"}
                                {importStatus.message}
                            </p>
                        </div>
                    )}

                    {/* Export */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                            <span className="text-2xl">📤</span>
                            Exporter le thème actuel
                        </h3>
                        <p className="text-sm text-gray-600">
                            Téléchargez le thème actuel au format Markdown (.md)
                            pour le partager
                        </p>
                        <button
                            onClick={handleExport}
                            disabled={!currentTheme || !currentTheme.isCustom}
                            className="
                                w-full py-3 px-4 rounded-lg
                                bg-gradient-to-r from-blue-500 to-indigo-500
                                hover:from-blue-600 hover:to-indigo-600
                                disabled:from-gray-300 disabled:to-gray-400
                                text-white font-medium
                                transition-all duration-200
                                shadow-md hover:shadow-lg
                                disabled:cursor-not-allowed
                                flex items-center justify-center gap-2
                            "
                            title={
                                currentTheme && !currentTheme.isCustom
                                    ? "Seuls les thèmes personnalisés peuvent être exportés"
                                    : "Télécharger le thème au format .md"
                            }
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
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                            </svg>
                            Exporter "{currentTheme?.name || "Aucun thème"}"
                        </button>
                        {currentTheme && !currentTheme.isCustom && (
                            <p className="text-xs text-gray-500 italic">
                                💡 Les thèmes prédéfinis ne peuvent pas être
                                exportés. Créez d'abord une copie personnalisée.
                            </p>
                        )}
                    </div>

                    <div className="border-t border-gray-200"></div>

                    {/* Import */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                            <span className="text-2xl">📥</span>
                            Importer un thème
                        </h3>
                        <p className="text-sm text-gray-600">
                            Formats supportés : Markdown (.md) et ancien format
                            TXT
                        </p>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".md,.txt"
                            onChange={handleFileSelect}
                            className="hidden"
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="
                                w-full py-3 px-4 rounded-lg
                                bg-gradient-to-r from-green-500 to-emerald-500
                                hover:from-green-600 hover:to-emerald-600
                                text-white font-medium
                                transition-all duration-200
                                shadow-md hover:shadow-lg
                                flex items-center justify-center gap-2
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
                            Sélectionner un fichier
                        </button>
                    </div>

                    {/* Info format Markdown */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                            <span>💡</span>
                            Format Markdown
                        </h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>
                                • Les enseignants peuvent créer des thèmes
                                directement en Markdown
                            </li>
                            <li>
                                • Structure simple avec métadonnées et listes de
                                segments
                            </li>
                            <li>
                                • Compatible avec l'ancien format TXT
                                (rétrocompatibilité)
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Pied de page */}
                <div className="border-t p-4 bg-gray-50 rounded-b-xl">
                    <button
                        onClick={onClose}
                        className="
                            w-full py-2 px-4 rounded-lg
                            bg-gray-200 hover:bg-gray-300
                            text-gray-700 font-medium
                            transition-colors duration-200
                        "
                    >
                        Fermer
                    </button>
                </div>
            </div>

            {/* Dialogue de conflit de nom */}
            {showConflictDialog && conflictTheme && (
                <div className="fixed inset-0 bg-black bg-opacity-60 z-[60] flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
                        <div className="bg-yellow-100 border-b-2 border-yellow-300 p-6 rounded-t-xl">
                            <h3 className="text-xl font-bold text-yellow-900 flex items-center gap-2">
                                <span className="text-2xl">⚠️</span>
                                Conflit de nom
                            </h3>
                        </div>

                        <div className="p-6 space-y-4">
                            <p className="text-gray-700">
                                Un thème nommé{" "}
                                <strong>"{conflictTheme.name}"</strong> existe
                                déjà. Que voulez-vous faire ?
                            </p>

                            {/* Option 1 : Renommer */}
                            <div className="border-2 border-gray-200 rounded-lg p-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Option 1 : Renommer le nouveau thème
                                </label>
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    maxLength={50}
                                />
                                <button
                                    onClick={() =>
                                        handleResolveConflict("rename")
                                    }
                                    disabled={
                                        !newName.trim() ||
                                        newName === conflictTheme.name
                                    }
                                    className="
                                        mt-2 w-full py-2 px-4 rounded-lg
                                        bg-blue-500 hover:bg-blue-600
                                        disabled:bg-gray-300
                                        text-white font-medium
                                        transition-colors
                                    "
                                >
                                    Importer avec ce nouveau nom
                                </button>
                            </div>

                            {/* Option 2 : Remplacer */}
                            <div className="border-2 border-red-200 rounded-lg p-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Option 2 : Remplacer l'ancien thème
                                </label>
                                <p className="text-xs text-red-600 mb-2">
                                    ⚠️ Le thème existant sera écrasé de manière
                                    permanente
                                </p>
                                <button
                                    onClick={() =>
                                        handleResolveConflict("replace")
                                    }
                                    className="
                                        w-full py-2 px-4 rounded-lg
                                        bg-red-500 hover:bg-red-600
                                        text-white font-medium
                                        transition-colors
                                    "
                                >
                                    Remplacer l'ancien thème
                                </button>
                            </div>

                            {/* Annuler */}
                            <button
                                onClick={() => {
                                    setShowConflictDialog(false);
                                    setConflictTheme(null);
                                    setNewName("");
                                }}
                                className="
                                    w-full py-2 px-4 rounded-lg
                                    bg-gray-200 hover:bg-gray-300
                                    text-gray-700 font-medium
                                    transition-colors
                                "
                            >
                                Annuler l'import
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

ThemeImportExport.propTypes = {
    currentTheme: PropTypes.object,
    allThemes: PropTypes.array.isRequired,
    onThemeImported: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ThemeImportExport;
