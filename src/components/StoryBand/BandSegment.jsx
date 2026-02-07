import React from "react";
import PropTypes from "prop-types";

/**
 * Composant représentant un segment de texte dans une bande
 * Affiche le texte avec animation de flip
 * @component
 */
const BandSegment = ({ text, activeIndex }) => {
    return (
        <div
            key={activeIndex}
            className="
        text-xl md:text-2xl font-bold text-gray-800
        animate-flip-in
        text-center w-full
      "
            style={{ perspective: "1000px" }}
        >
            {text}
        </div>
    );
};

BandSegment.propTypes = {
    text: PropTypes.string.isRequired,
    activeIndex: PropTypes.number.isRequired,
};

export default BandSegment;
