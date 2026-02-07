import React from 'react';
import PropTypes from 'prop-types';

/**
 * Composant d'aperçu de la phrase complète
 * @component
 */
const StoryPreview = ({ sentence }) => {
  return (
    <div 
      className="
        bg-gradient-to-r from-indigo-50 to-purple-50
        border-2 border-indigo-200
        rounded-xl p-6 md:p-8
        shadow-lg
        mb-6
      "
      role="region"
      aria-label="Aperçu de votre histoire"
    >
      <h2 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-3">
        Votre histoire :
      </h2>
      <p 
        className="
          text-2xl md:text-3xl lg:text-4xl
          font-bold text-gray-800
          leading-relaxed
          min-h-[60px]
          flex items-center
        "
      >
        {sentence || 'Cliquez sur les bandes pour créer votre histoire...'}
      </p>
    </div>
  );
};

StoryPreview.propTypes = {
  sentence: PropTypes.string.isRequired
};

export default StoryPreview;
