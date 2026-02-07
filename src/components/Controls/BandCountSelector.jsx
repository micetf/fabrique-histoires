import React from "react";
import PropTypes from "prop-types";

/**
 * Sélecteur du nombre de bandes (2-5)
 * Permet d'adapter la complexité selon le niveau des élèves
 * @component
 */
const BandCountSelector = ({ currentCount, onChange, maxBands }) => {
    return (
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-6 justify-center">
            <label className="text-gray-700 font-medium text-sm sm:text-base">
                Nombre de bandes :
            </label>
            <div className="flex gap-2">
                {[2, 3, 4, 5].map((count) => (
                    <button
                        key={count}
                        onClick={() => onChange(count)}
                        disabled={count > maxBands}
                        className={`
              w-12 h-12 rounded-full font-bold text-lg
              transition-all duration-200
              ${
                  count === currentCount
                      ? "bg-indigo-600 text-white scale-110 shadow-lg ring-2 ring-indigo-300"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105"
              }
              ${
                  count > maxBands
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer active:scale-95"
              }
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
            `}
                        aria-label={`${count} bandes`}
                        aria-pressed={count === currentCount}
                        title={
                            count > maxBands
                                ? "Pas assez de contenu disponible"
                                : `Afficher ${count} bandes`
                        }
                    >
                        {count}
                    </button>
                ))}
            </div>
        </div>
    );
};

BandCountSelector.propTypes = {
    currentCount: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    maxBands: PropTypes.number.isRequired,
};

export default BandCountSelector;
