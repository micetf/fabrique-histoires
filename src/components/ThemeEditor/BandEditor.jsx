import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * Éditeur pour une bande individuelle
 * @component
 */
const BandEditor = ({
    bandIndex,
    segments,
    onUpdateSegment,
    onAddSegment,
    onRemoveSegment,
    error,
    nameSuggestions,
}) => {
    const [bandName, setBandName] = useState(
        nameSuggestions[bandIndex] || `Bande ${bandIndex + 1}`
    );
    const [isExpanded, setIsExpanded] = useState(true);

    const bandColors = [
        "border-blue-300 bg-blue-50",
        "border-green-300 bg-green-50",
        "border-yellow-300 bg-yellow-50",
        "border-pink-300 bg-pink-50",
        "border-purple-300 bg-purple-50",
    ];

    const colorClass = bandColors[bandIndex % bandColors.length];

    return (
        <div className={`border-2 rounded-lg overflow-hidden ${colorClass}`}>
            {/* En-tête de la bande */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between p-3 hover:bg-opacity-50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-700">
                        Bande {bandIndex + 1}
                    </span>
                    <input
                        type="text"
                        value={bandName}
                        onChange={(e) => {
                            e.stopPropagation();
                            setBandName(e.target.value);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="px-2 py-1 border border-gray-300 rounded text-sm bg-white"
                        placeholder="Nom de la bande"
                        maxLength={30}
                    />
                    <span className="text-xs text-gray-500">
                        {segments.filter((s) => s.trim()).length} segment(s)
                    </span>
                </div>
                <svg
                    className={`w-5 h-5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {/* Erreur de validation */}
            {error && (
                <div className="px-3 pb-2">
                    <p className="text-red-600 text-sm">{error}</p>
                </div>
            )}

            {/* Liste des segments */}
            {isExpanded && (
                <div className="p-3 space-y-2 bg-white bg-opacity-50">
                    {segments.map((segment, segmentIndex) => (
                        <div
                            key={segmentIndex}
                            className="flex items-center gap-2"
                        >
                            <span className="text-xs text-gray-500 w-6">
                                {segmentIndex + 1}.
                            </span>
                            <input
                                type="text"
                                value={segment}
                                onChange={(e) =>
                                    onUpdateSegment(
                                        bandIndex,
                                        segmentIndex,
                                        e.target.value
                                    )
                                }
                                placeholder={`Segment ${segmentIndex + 1}`}
                                className="
                  flex-1 px-3 py-2 border border-gray-300 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-purple-500
                  text-sm
                "
                                maxLength={50}
                            />
                            {segments.length > 2 && (
                                <button
                                    onClick={() =>
                                        onRemoveSegment(bandIndex, segmentIndex)
                                    }
                                    className="
                    p-2 rounded-lg
                    text-red-600 hover:bg-red-100
                    transition-colors duration-150
                  "
                                    title="Supprimer ce segment"
                                >
                                    <svg
                                        className="w-4 h-4"
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
                            )}
                        </div>
                    ))}

                    {/* Bouton ajouter segment */}
                    {segments.length < 12 && (
                        <button
                            onClick={() => onAddSegment(bandIndex)}
                            className="
                w-full py-2 mt-2
                border-2 border-dashed border-gray-300
                rounded-lg
                text-gray-600 hover:text-purple-600
                hover:border-purple-400
                transition-colors duration-150
                flex items-center justify-center gap-2
                text-sm font-medium
              "
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            Ajouter un segment
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

BandEditor.propTypes = {
    bandIndex: PropTypes.number.isRequired,
    segments: PropTypes.arrayOf(PropTypes.string).isRequired,
    onUpdateSegment: PropTypes.func.isRequired,
    onAddSegment: PropTypes.func.isRequired,
    onRemoveSegment: PropTypes.func.isRequired,
    error: PropTypes.string,
    nameSuggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BandEditor;
