import React from "react";
import PropTypes from "prop-types";
import { getFavorites, deleteFavorite } from "../../utils/storageManager";

/**
 * Liste des histoires favorites sauvegardées
 * @component
 */
const FavoritesList = ({ onClose, onSelectFavorite }) => {
    const [favorites, setFavorites] = React.useState(() => getFavorites());

    const handleDelete = (id) => {
        if (window.confirm("Supprimer cette histoire des favoris ?")) {
            deleteFavorite(id);
            setFavorites(getFavorites());
        }
    };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
                {/* En-tête */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold mb-1">
                                ⭐ Mes histoires favorites
                            </h2>
                            <p className="text-indigo-100">
                                {favorites.length} histoire(s) sauvegardée(s)
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
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

                {/* Liste des favoris */}
                <div className="flex-1 overflow-y-auto p-6">
                    {favorites.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📝</div>
                            <p className="text-gray-500 text-lg mb-2">
                                Aucune histoire favorite
                            </p>
                            <p className="text-gray-400 text-sm">
                                Cliquez sur l'étoile pour sauvegarder vos
                                histoires préférées !
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {favorites.map((fav) => (
                                <div
                                    key={fav.id}
                                    className="
                    border-2 border-gray-200 rounded-lg p-4
                    hover:border-indigo-300 hover:shadow-md
                    transition-all duration-200
                    group
                  "
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1">
                                            <p className="text-gray-800 font-medium mb-2 leading-relaxed">
                                                {fav.sentence}
                                            </p>
                                            <div className="flex items-center gap-3 text-xs text-gray-500">
                                                <span>
                                                    🎬 {fav.bandCount} bandes
                                                </span>
                                                <span>•</span>
                                                <span>
                                                    📅 {formatDate(fav.date)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() =>
                                                    onSelectFavorite(fav)
                                                }
                                                className="
                          p-2 rounded-lg
                          text-indigo-600 hover:bg-indigo-100
                          transition-colors
                        "
                                                title="Charger cette histoire"
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
                                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                                    />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(fav.id)
                                                }
                                                className="
                          p-2 rounded-lg
                          text-red-600 hover:bg-red-100
                          transition-colors
                        "
                                                title="Supprimer"
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
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Pied de page */}
                <div className="border-t p-4 bg-gray-50">
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
        </div>
    );
};

FavoritesList.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSelectFavorite: PropTypes.func.isRequired,
};

export default FavoritesList;
