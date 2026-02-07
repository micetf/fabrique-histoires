import React from 'react';
import PropTypes from 'prop-types';

/**
 * Bouton de génération aléatoire d'histoire
 * @component
 */
const RandomButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        bg-gradient-to-r from-purple-500 to-pink-500
        hover:from-purple-600 hover:to-pink-600
        text-white font-bold
        py-3 px-6 md:py-4 md:px-8
        rounded-full
        shadow-lg hover:shadow-xl
        transform hover:scale-105
        transition-all duration-200
        focus:outline-none focus:ring-4 focus:ring-purple-300
        flex items-center gap-2
      "
      aria-label="Générer une histoire aléatoire"
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
      <span className="hidden sm:inline">Histoire surprise !</span>
      <span className="sm:hidden">Surprise !</span>
    </button>
  );
};

RandomButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default RandomButton;
