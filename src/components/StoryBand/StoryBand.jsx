import React from "react";
import PropTypes from "prop-types";
import BandSegment from "./BandSegment";

/**
 * Composant représentant une bande interactive d'histoire
 * @component
 */
const StoryBand = ({ bandIndex, segments, activeIndex, onRotate }) => {
    const colors = ["blue", "green", "yellow", "pink", "purple"];
    const color = colors[bandIndex % colors.length];

    const colorClasses = {
        blue: "bg-blue-100 border-blue-300 hover:bg-blue-200",
        green: "bg-green-100 border-green-300 hover:bg-green-200",
        yellow: "bg-yellow-100 border-yellow-300 hover:bg-yellow-200",
        pink: "bg-pink-100 border-pink-300 hover:bg-pink-200",
        purple: "bg-purple-100 border-purple-300 hover:bg-purple-200",
    };

    const handleClick = () => {
        onRotate(bandIndex);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onRotate(bandIndex);
        }
    };

    return (
        <div
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-label={`Bande ${bandIndex + 1}, cliquez pour faire défiler`}
            className={`
        ${colorClasses[color]}
        border-4 rounded-2xl p-6
        cursor-pointer
        transition-all duration-200
        hover:shadow-lg hover:scale-[1.02]
        focus:outline-none focus:ring-4 focus:ring-indigo-300
        active:scale-[0.98]
      `}
        >
            <div className="flex items-center justify-between gap-4">
                {/* Segment de texte avec point final si dernière bande */}
                <div className="flex-1 min-h-[3rem] flex items-center">
                    <div className="w-full flex items-center gap-1">
                        <BandSegment
                            text={segments[activeIndex]}
                            activeIndex={activeIndex}
                        />
                    </div>
                </div>

                {/* Indicateur de position et icône de rotation */}
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
                        {activeIndex + 1}/{segments.length}
                    </span>
                    <svg
                        className="w-6 h-6 text-gray-600 animate-spin-slow"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

StoryBand.propTypes = {
    bandIndex: PropTypes.number.isRequired,
    segments: PropTypes.arrayOf(PropTypes.string).isRequired,
    activeIndex: PropTypes.number.isRequired,
    onRotate: PropTypes.func.isRequired,
};

export default StoryBand;
