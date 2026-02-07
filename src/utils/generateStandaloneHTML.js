/**
 * Générateur de fichier HTML standalone pour export de thème
 * Crée un fichier HTML autonome fonctionnant 100% offline
 */

// CSS Tailwind optimisé embarqué (sera inliné dans le HTML)
const embeddedCSS = `/* CSS Tailwind optimisé pour l'export standalone */
*, ::before, ::after { box-sizing: border-box; border-width: 0; border-style: solid; border-color: #e5e7eb; }
html { line-height: 1.5; -webkit-text-size-adjust: 100%; }
body { margin: 0; font-family: system-ui, -apple-system, sans-serif; background: linear-gradient(to bottom right, #eff6ff, #faf5ff, #fdf2f8); min-height: 100vh; }
button { background-color: transparent; background-image: none; }
button:focus { outline: 1px dotted; outline: 5px auto -webkit-focus-ring-color; }

.min-h-screen { min-height: 100vh; }
.container { width: 100%; }
@media (min-width: 640px) { .container { max-width: 640px; } }
@media (min-width: 768px) { .container { max-width: 768px; } }
@media (min-width: 1024px) { .container { max-width: 1024px; } }
.mx-auto { margin-left: auto; margin-right: auto; }
.flex { display: flex; }
.flex-col { flex-direction: column; }
.flex-1 { flex: 1 1 0%; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.justify-center { justify-content: center; }
.gap-1 { gap: 0.25rem; }
.gap-2 { gap: 0.5rem; }
.gap-3 { gap: 0.75rem; }
.gap-4 { gap: 1rem; }
.space-y-4 > :not([hidden]) ~ :not([hidden]) { margin-top: 1rem; }

.p-2 { padding: 0.5rem; }
.p-3 { padding: 0.75rem; }
.p-4 { padding: 1rem; }
.p-6 { padding: 1.5rem; }
.p-8 { padding: 2rem; }
.px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
.py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
.py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
.py-4 { padding-top: 1rem; padding-bottom: 1rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-3 { margin-bottom: 0.75rem; }
.mb-6 { margin-bottom: 1.5rem; }
.mb-8 { margin-bottom: 2rem; }
.mt-1 { margin-top: 0.25rem; }
.mt-8 { margin-top: 2rem; }

.w-5 { width: 1.25rem; }
.w-6 { width: 1.5rem; }
.w-12 { width: 3rem; }
.w-full { width: 100%; }
.h-5 { height: 1.25rem; }
.h-6 { height: 1.5rem; }
.h-12 { height: 3rem; }
.max-w-4xl { max-width: 56rem; }
.min-h-\\[3rem\\] { min-height: 3rem; }
.min-h-\\[60px\\] { min-height: 60px; }

.text-center { text-align: center; }
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }
.text-2xl { font-size: 1.5rem; line-height: 2rem; }
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
.text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
.text-5xl { font-size: 3rem; line-height: 1; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
.uppercase { text-transform: uppercase; }
.tracking-wide { letter-spacing: 0.025em; }
.leading-relaxed { line-height: 1.625; }

.bg-white { background-color: #fff; }
.bg-gray-100 { background-color: #f3f4f6; }
.bg-gray-200 { background-color: #e5e7eb; }
.bg-blue-100 { background-color: #dbeafe; }
.bg-green-100 { background-color: #dcfce7; }
.bg-yellow-100 { background-color: #fef9c3; }
.bg-pink-100 { background-color: #fce7f3; }
.bg-purple-100 { background-color: #f3e8ff; }
.bg-indigo-600 { background-color: #4f46e5; }

.text-gray-500 { color: #6b7280; }
.text-gray-600 { color: #4b5563; }
.text-gray-700 { color: #374151; }
.text-gray-800 { color: #1f2937; }
.text-white { color: #fff; }
.text-indigo-600 { color: #4f46e5; }

.border-2 { border-width: 2px; }
.border-4 { border-width: 4px; }
.border-blue-300 { border-color: #93c5fd; }
.border-green-300 { border-color: #86efac; }
.border-yellow-300 { border-color: #fde047; }
.border-pink-300 { border-color: #f9a8d4; }
.border-purple-300 { border-color: #d8b4fe; }
.border-indigo-200 { border-color: #c7d2fe; }

.rounded-lg { border-radius: 0.5rem; }
.rounded-xl { border-radius: 0.75rem; }
.rounded-2xl { border-radius: 1rem; }
.rounded-full { border-radius: 9999px; }
.shadow-lg { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); }

.cursor-pointer { cursor: pointer; }
.cursor-not-allowed { cursor: not-allowed; }
.transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
.duration-200 { transition-duration: 200ms; }

.hover\\:bg-blue-200:hover { background-color: #bfdbfe; }
.hover\\:bg-green-200:hover { background-color: #bbf7d0; }
.hover\\:bg-yellow-200:hover { background-color: #fef08a; }
.hover\\:bg-pink-200:hover { background-color: #fbcfe8; }
.hover\\:bg-purple-200:hover { background-color: #e9d5ff; }
.hover\\:bg-gray-300:hover { background-color: #d1d5db; }
.hover\\:shadow-lg:hover { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); }
.hover\\:shadow-xl:hover { box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1); }
.hover\\:scale-\\[1\\.02\\]:hover { transform: scale(1.02); }
.hover\\:scale-105:hover { transform: scale(1.05); }
.hover\\:underline:hover { text-decoration: underline; }

.active\\:scale-\\[0\\.98\\]:active { transform: scale(0.98); }
.active\\:scale-95:active { transform: scale(0.95); }

.focus\\:outline-none:focus { outline: 2px solid transparent; outline-offset: 2px; }
.focus\\:ring-4:focus { box-shadow: 0 0 0 2px #fff, 0 0 0 6px #a5b4fc; }

.disabled\\:opacity-50:disabled { opacity: 0.5; }
.disabled\\:cursor-not-allowed:disabled { cursor: not-allowed; }

.bg-gradient-to-r { background-image: linear-gradient(to right, var(--tw-gradient-stops)); }
.from-indigo-50 { --tw-gradient-from: #eef2ff; --tw-gradient-to: rgb(238 242 255 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.from-purple-500 { --tw-gradient-from: #a855f7; --tw-gradient-to: rgb(168 85 247 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.from-green-500 { --tw-gradient-from: #22c55e; --tw-gradient-to: rgb(34 197 94 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.to-purple-50 { --tw-gradient-to: #faf5ff; }
.to-pink-500 { --tw-gradient-to: #ec4899; }
.to-emerald-500 { --tw-gradient-to: #10b981; }

@media (min-width: 640px) {
  .sm\\:flex-row { flex-direction: row; }
  .sm\\:inline { display: inline; }
  .sm\\:hidden { display: none; }
  .sm\\:text-base { font-size: 1rem; line-height: 1.5rem; }
}

@media (min-width: 768px) {
  .md\\:text-2xl { font-size: 1.5rem; line-height: 2rem; }
  .md\\:text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
  .md\\:text-5xl { font-size: 3rem; line-height: 1; }
  .md\\:p-8 { padding: 2rem; }
  .md\\:py-4 { padding-top: 1rem; padding-bottom: 1rem; }
  .md\\:px-8 { padding-left: 2rem; padding-right: 2rem; }
}

@media (min-width: 1024px) {
  .lg\\:text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
}

@keyframes pageFlip {
  0% { transform: perspective(600px) rotateX(-90deg); transform-origin: center top; opacity: 0; }
  30% { transform: perspective(600px) rotateX(-30deg); opacity: 0.5; }
  100% { transform: perspective(600px) rotateX(0deg); transform-origin: center top; opacity: 1; }
}
.animate-flip-in { animation: pageFlip 0.5s ease-out; }

@keyframes spin { to { transform: rotate(360deg); } }
.animate-spin-slow { animation: spin 3s linear infinite; }
.animate-spin { animation: spin 1s linear infinite; }
`;

/**
 * Génère un fichier HTML standalone pour un thème
 * @param {Object} theme - Le thème à exporter
 * @returns {string} Contenu HTML complet
 */
export const generateStandaloneHTML = (theme) => {
    // Échapper les données JSON pour injection sécurisée
    const themeDataJSON = JSON.stringify(theme)
        .replace(/</g, "\\u003c")
        .replace(/>/g, "\\u003e")
        .replace(/&/g, "\\u0026");

    return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fabrique à Histoires - ${theme.name}</title>
  <style>
${embeddedCSS}
  </style>
</head>
<body>
  <div id="root"></div>

  <script>
    // ========================================
    // DONNÉES DU THÈME EMBARQUÉES
    // ========================================
    const THEME_DATA = ${themeDataJSON};

    // ========================================
    // APPLICATION STANDALONE
    // ========================================
    class StoryBandApp {
      constructor(theme) {
        this.theme = theme;
        this.bandCount = 3;
        this.activeIndices = new Array(this.bandCount).fill(0);
        this.init();
      }

      init() {
        this.render();
        this.attachEventListeners();
      }

      // Fait défiler une bande
      rotateBand(bandIndex) {
        const bandLength = this.theme.bands[bandIndex].length;
        this.activeIndices[bandIndex] = (this.activeIndices[bandIndex] + 1) % bandLength;
        this.updateBandDisplay(bandIndex);
        this.updatePreview();
      }

      // Génération aléatoire
      randomize() {
        this.activeIndices = this.activeIndices.map((_, index) => {
          const bandLength = this.theme.bands[index].length;
          return Math.floor(Math.random() * bandLength);
        });
        this.render();
      }

      // Change le nombre de bandes
      changeBandCount(count) {
        const validCount = Math.max(2, Math.min(5, Math.min(count, this.theme.bands.length)));
        this.bandCount = validCount;
        
        // Ajuster activeIndices
        if (validCount > this.activeIndices.length) {
          const diff = validCount - this.activeIndices.length;
          this.activeIndices.push(...new Array(diff).fill(0));
        } else {
          this.activeIndices = this.activeIndices.slice(0, validCount);
        }
        
        this.render();
      }

      // Récupère la phrase actuelle
      getCurrentSentence() {
        const sentence = this.activeIndices
          .slice(0, this.bandCount)
          .map((index, bandIndex) => this.theme.bands[bandIndex][index])
          .filter(Boolean)
          .join(' ')
          .trim();

        // Ajouter un point si absent
        if (sentence && !/[.!?]$/.test(sentence)) {
          return sentence + '.';
        }
        return sentence;
      }

      // Export PNG
      exportAsImage() {
        const sentence = this.getCurrentSentence();
        if (!sentence) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = 1200;
        canvas.height = 800;

        // Fond dégradé
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#EBF4FF');
        gradient.addColorStop(0.5, '#F3E8FF');
        gradient.addColorStop(1, '#FCE7F3');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Titre
        ctx.fillStyle = '#4F46E5';
        ctx.font = 'bold 48px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🎨 Fabrique à Histoires', canvas.width / 2, 100);

        // Sous-titre avec le thème
        ctx.fillStyle = '#6B7280';
        ctx.font = '32px Arial, sans-serif';
        ctx.fillText('Thème: ${theme.icon} ${theme.name}', canvas.width / 2, 150);

        // Bordure
        ctx.strokeStyle = '#818CF8';
        ctx.lineWidth = 4;
        ctx.strokeRect(50, 200, canvas.width - 100, 450);

        // Fond blanc
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillRect(60, 210, canvas.width - 120, 430);

        // Phrase
        ctx.fillStyle = '#1F2937';
        ctx.font = 'bold 56px Arial, sans-serif';
        ctx.textAlign = 'center';

        // Découpage multi-lignes
        const maxWidth = canvas.width - 200;
        const words = sentence.split(' ');
        const lines = [];
        let currentLine = words[0];

        for (let i = 1; i < words.length; i++) {
          const testLine = currentLine + ' ' + words[i];
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxWidth) {
            lines.push(currentLine);
            currentLine = words[i];
          } else {
            currentLine = testLine;
          }
        }
        lines.push(currentLine);

        // Centrage vertical
        const lineHeight = 70;
        const totalHeight = lines.length * lineHeight;
        const startY = (canvas.height - totalHeight) / 2 + 150;

        lines.forEach((line, index) => {
          ctx.fillText(line, canvas.width / 2, startY + index * lineHeight);
        });

        // Signature
        ctx.fillStyle = '#9CA3AF';
        ctx.font = '20px Arial, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText('micetf.fr', canvas.width - 60, canvas.height - 40);

        // Téléchargement
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          const date = new Date().toISOString().split('T')[0];
          link.download = \`theme-${theme.id}-\${date}.png\`;
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
        }, 'image/png');
      }

      // Met à jour l'affichage d'une bande
      updateBandDisplay(bandIndex) {
        const bandElement = document.querySelector(\`[data-band-index="\${bandIndex}"]\`);
        if (!bandElement) return;

        const segment = bandElement.querySelector('.band-segment');
        const indicator = bandElement.querySelector('.band-indicator');
        
        const activeIndex = this.activeIndices[bandIndex];
        let text = this.theme.bands[bandIndex][activeIndex];
        
        // Ajouter point sur dernière bande
        if (bandIndex === this.bandCount - 1 && text && !/[.!?]$/.test(text)) {
          text += '.';
        }

        segment.textContent = text;
        segment.classList.remove('animate-flip-in');
        void segment.offsetWidth; // Force reflow
        segment.classList.add('animate-flip-in');
        
        indicator.textContent = \`\${activeIndex + 1}/\${this.theme.bands[bandIndex].length}\`;
      }

      // Met à jour l'aperçu de la phrase
      updatePreview() {
        const preview = document.getElementById('sentence-preview');
        if (preview) {
          preview.textContent = this.getCurrentSentence() || 'Cliquez sur les bandes pour créer votre histoire...';
        }
      }

      // Rendu complet de l'interface
      render() {
        const colors = ['blue', 'green', 'yellow', 'pink', 'purple'];
        
        const colorClasses = {
          blue: 'bg-blue-100 border-blue-300 hover:bg-blue-200',
          green: 'bg-green-100 border-green-300 hover:bg-green-200',
          yellow: 'bg-yellow-100 border-yellow-300 hover:bg-yellow-200',
          pink: 'bg-pink-100 border-pink-300 hover:bg-pink-200',
          purple: 'bg-purple-100 border-purple-300 hover:bg-purple-200'
        };

        const bandsHTML = Array.from({ length: this.bandCount }).map((_, index) => {
          const color = colors[index % colors.length];
          const activeIndex = this.activeIndices[index];
          let text = this.theme.bands[index][activeIndex];
          
          // Ajouter point sur dernière bande
          if (index === this.bandCount - 1 && text && !/[.!?]$/.test(text)) {
            text += '.';
          }

          return \`
            <div 
              class="\${colorClasses[color]} border-4 rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              data-band-index="\${index}"
              onclick="app.rotateBand(\${index})"
              tabindex="0"
              role="button"
              aria-label="Bande \${index + 1}, cliquez pour faire défiler"
            >
              <div class="flex items-center justify-between gap-4">
                <div class="flex-1 min-h-[3rem] flex items-center">
                  <div class="w-full flex items-center gap-1">
                    <div class="band-segment text-xl md:text-2xl font-bold text-gray-800 animate-flip-in text-center w-full">
                      \${text}
                    </div>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <span class="band-indicator text-sm text-gray-600 font-medium">
                    \${activeIndex + 1}/\${this.theme.bands[index].length}
                  </span>
                  <svg class="w-6 h-6 text-gray-600 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
              </div>
            </div>
          \`;
        }).join('');

        const bandCountButtons = [2, 3, 4, 5].map(count => {
          const isActive = count === this.bandCount;
          const isDisabled = count > this.theme.bands.length;
          
          return \`
            <button
              onclick="app.changeBandCount(\${count})"
              class="w-12 h-12 rounded-full font-bold text-lg transition-all duration-200 \${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : isDisabled
                    ? 'bg-gray-200 text-gray-700 opacity-50 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105 active:scale-95 cursor-pointer'
              }"
              \${isDisabled ? 'disabled' : ''}
              aria-label="\${count} bandes"
              title="\${isDisabled ? 'Pas assez de contenu' : count + ' bandes'}"
            >
              \${count}
            </button>
          \`;
        }).join('');

        document.getElementById('root').innerHTML = \`
          <div class="min-h-screen">
            <div class="container mx-auto px-4 py-8 max-w-4xl">
              <!-- En-tête -->
              <header class="text-center mb-8">
                <h1 class="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">
                  🎨 Fabrique à Histoires
                </h1>
                <div class="flex items-center justify-center gap-2 mb-3">
                  <span class="text-3xl">\${this.theme.icon}</span>
                  <h2 class="text-2xl font-semibold text-gray-700">\${this.theme.name}</h2>
                </div>
                <p class="text-gray-600 text-lg">\${this.theme.description}</p>
              </header>

              <!-- Sélecteur de nombre de bandes -->
              <div class="flex flex-col sm:flex-row items-center gap-3 mb-6 justify-center">
                <label class="text-gray-700 font-medium text-sm sm:text-base">
                  Nombre de bandes :
                </label>
                <div class="flex gap-2">
                  \${bandCountButtons}
                </div>
              </div>

              <!-- Aperçu de la phrase -->
              <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-6 md:p-8 shadow-lg mb-6">
                <h2 class="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-3">
                  Votre histoire :
                </h2>
                <p id="sentence-preview" class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-relaxed min-h-[60px] flex items-center">
                  \${this.getCurrentSentence() || 'Cliquez sur les bandes pour créer votre histoire...'}
                </p>
              </div>

              <!-- Bandes interactives -->
              <div class="space-y-4 mb-6">
                \${bandsHTML}
              </div>

              <!-- Contrôles -->
              <div class="flex flex-col sm:flex-row justify-center gap-3 mb-6">
                <!-- Bouton Surprise -->
                <button
                  onclick="app.randomize()"
                  class="bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-xl text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-300 flex items-center gap-2 justify-center"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span class="hidden sm:inline">Histoire surprise !</span>
                  <span class="sm:hidden">Surprise !</span>
                </button>

                <!-- Bouton Export PNG -->
                <button
                  onclick="app.exportAsImage()"
                  class="bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-xl text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-300 flex items-center gap-2 justify-center"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span class="hidden sm:inline">Télécharger</span>
                  <span class="sm:hidden">💾</span>
                </button>
              </div>

              <!-- Footer -->
              <footer class="text-center text-gray-500 text-sm mt-8">
                <p>Fichier généré depuis <a href="https://micetf.fr" class="text-indigo-600 hover:underline">micetf.fr</a></p>
                <p class="mt-1">Thème : \${this.theme.name} - Version standalone offline</p>
              </footer>
            </div>
          </div>
        \`;
      }

      // Attache les événements clavier
      attachEventListeners() {
        document.addEventListener('keydown', (e) => {
          const bandElements = document.querySelectorAll('[data-band-index]');
          const focusedElement = document.activeElement;
          
          bandElements.forEach((element, index) => {
            if (element === focusedElement && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              this.rotateBand(index);
            }
          });
        });
      }
    }

    // ========================================
    // INITIALISATION
    // ========================================
    let app;
    window.addEventListener('DOMContentLoaded', () => {
      app = new StoryBandApp(THEME_DATA);
      window.app = app; // Expose globalement pour onclick
    });
  </script>
</body>
</html>`;
};

/**
 * Télécharge le fichier HTML généré
 * @param {string} filename - Nom du fichier
 * @param {string} content - Contenu HTML
 */
export const downloadHTMLFile = (filename, content) => {
    const blob = new Blob([content], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
};
