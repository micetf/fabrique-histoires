# 📘 Documentation Technique - Fabrique à Histoires

## 🎯 Vue d'ensemble du projet

**Fabrique à Histoires** est une application web éducative interactive destinée aux élèves de 5 à 11 ans (GS-CM2). Elle permet de créer des phrases amusantes en combinant des segments de texte disposés sur des "bandes" horizontales rotatives, inspirée du principe du "cadavre exquis".

### Objectifs pédagogiques

- Développer la créativité langagière
- Comprendre la structure grammaticale des phrases
- Favoriser l'apprentissage ludique de la syntaxe
- Encourager la production d'écrits
- Favoriser l'inclusion (support dyslexie)

---

## 🏗️ Architecture technique

### Stack technologique

| Technologie      | Version | Usage                       |
| ---------------- | ------- | --------------------------- |
| **React**        | 19.2.0  | Framework UI                |
| **Vite**         | 7.2.4   | Build tool & dev server     |
| **Tailwind CSS** | 3.4.3   | Framework CSS utility-first |
| **pnpm**         | Latest  | Gestionnaire de packages    |
| **PropTypes**    | 15.8.1  | Validation des props        |
| **OpenDyslexic** | 5.2.5   | Police pour dyslexiques     |

### Prérequis système

```bash
Node.js >= 16.x
pnpm >= 8.x
Navigateur moderne (Chrome, Firefox, Safari, Edge)
```

### Installation et lancement

```bash
# Installation des dépendances
pnpm install

# Lancement en mode développement (port 3020)
pnpm dev

# Build de production
pnpm build

# Preview du build
pnpm preview
```

---

## 📁 Structure du projet

```
fabrique-histoires/
├── public/                     # Fichiers statiques
├── src/
│   ├── components/            # Composants React
│   │   ├── StoryBand/        # Bandes interactives
│   │   │   ├── StoryBand.jsx
│   │   │   ├── BandSegment.jsx
│   │   │   └── index.js
│   │   ├── StoryBuilder/     # Composant principal
│   │   │   ├── StoryBuilder.jsx
│   │   │   ├── StoryPreview.jsx
│   │   │   └── index.js
│   │   ├── Controls/         # Boutons d'action
│   │   │   ├── RandomButton.jsx
│   │   │   ├── BandCountSelector.jsx
│   │   │   ├── FullscreenButton.jsx
│   │   │   ├── ExportButton.jsx
│   │   │   ├── FavoriteButton.jsx
│   │   │   ├── ExportThemeButton.jsx
│   │   │   ├── DyslexiaToggle.jsx        ⭐ NOUVEAU
│   │   │   └── index.js
│   │   ├── ThemeSelector/    # Sélecteur de thèmes
│   │   │   ├── ThemeSelector.jsx
│   │   │   └── index.js
│   │   ├── ThemeEditor/      # Éditeur de thèmes
│   │   │   ├── ThemeEditor.jsx
│   │   │   ├── BandEditor.jsx
│   │   │   └── index.js
│   │   ├── ThemeImportExport/ # Import/Export thèmes
│   │   │   ├── ThemeImportExport.jsx
│   │   │   └── index.js
│   │   └── Favorites/        # Gestion des favoris
│   │       ├── FavoritesList.jsx
│   │       └── index.js
│   ├── hooks/                # Hooks personnalisés
│   │   ├── useStoryBands.js
│   │   └── useThemes.js
│   ├── data/                 # Données de l'application
│   │   ├── defaultStories.js
│   │   └── themes.js
│   ├── utils/                # Fonctions utilitaires
│   │   ├── storageManager.js
│   │   ├── generateStandaloneHTML.js
│   │   └── themeImportExport.js         ⭐ NOUVEAU
│   ├── App.jsx               # Composant racine
│   ├── main.jsx              # Point d'entrée
│   └── index.css             # Styles globaux + animations + dyslexie
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## 🧩 Composants principaux

### 1. StoryBuilder (Composant racine)

**Fichier** : `src/components/StoryBuilder/StoryBuilder.jsx`

**Responsabilités** :

- Orchestration de l'application
- Gestion des thèmes (sélection, création, import/export)
- Gestion des favoris
- Coordination entre les sous-composants

**Props** : Aucune (composant racine)

**État local** :

```javascript
const [showThemeEditor, setShowThemeEditor] = useState(false);
const [showFavorites, setShowFavorites] = useState(false);
const [showImportExport, setShowImportExport] = useState(false); // ⭐ AJOUT
const [editingTheme, setEditingTheme] = useState(null);
```

**Hooks utilisés** :

- `useThemes()` : Gestion des thèmes
- `useStoryBands()` : Gestion de l'état des bandes

---

### 2. StoryBand (Bande interactive)

**Fichier** : `src/components/StoryBand/StoryBand.jsx`

**Responsabilités** :

- Affichage d'une bande cliquable
- Gestion des interactions (clic, clavier)
- Animation de rotation
- **Ajout du point final sur la dernière bande active**

**Props** :

```javascript
StoryBand.propTypes = {
    bandIndex: PropTypes.number.isRequired, // Index de la bande (0-4)
    segments: PropTypes.arrayOf(PropTypes.string).isRequired, // Contenus
    activeIndex: PropTypes.number.isRequired, // Segment actif
    onRotate: PropTypes.func.isRequired, // Callback de rotation
};
```

**Comportement** :

- Clic ou Entrée/Espace : Fait défiler vers le segment suivant
- 5 couleurs différenciées (blue, green, yellow, pink, purple)
- Affiche l'indicateur de position (ex: "3/6")
- **Point final automatique ajouté dans StoryBuilder sur la dernière bande**

**Note importante** : La logique d'ajout du point final est dans `StoryBuilder.jsx` qui mappe les segments avant de les passer à `StoryBand` :

```javascript
segments={
    bandsContent[index]?.map((seg) => {
        if (isLastBand && seg && !/[.!?]$/.test(seg)) {
            return seg + ".";
        }
        return seg;
    }) || [""]
}
```

---

### 3. BandSegment (Segment de texte)

**Fichier** : `src/components/StoryBand/BandSegment.jsx`

**Responsabilités** :

- Affichage du texte avec animation
- Animation CSS `animate-flip-in` au changement

**Props** :

```javascript
BandSegment.propTypes = {
    text: PropTypes.string.isRequired,
    activeIndex: PropTypes.number.isRequired, // Utilisé comme key pour forcer remontage
};
```

**Note importante** : La `key={activeIndex}` force React à démonter/remonter le composant à chaque changement, déclenchant l'animation CSS.

---

### 4. StoryPreview (Aperçu de phrase)

**Fichier** : `src/components/StoryBuilder/StoryPreview.jsx`

**Responsabilités** :

- Affichage de la phrase complète générée
- Message placeholder si aucune phrase

**Props** :

```javascript
// ⚠️ ATTENTION : PropTypes NON UTILISÉ dans ce composant (écart aux conventions)
// Props attendues :
// sentence: PropTypes.string.isRequired
```

---

### 5. ThemeSelector (Sélecteur de thèmes)

**Fichier** : `src/components/ThemeSelector/ThemeSelector.jsx`

**Responsabilités** :

- Affichage d'un menu déroulant de thèmes
- Preview avec icône et description
- Bouton "Créer un nouveau thème"
- **Bouton "Importer un thème" (.md/.txt)** ⭐ NOUVEAU
- Renommer/supprimer les thèmes personnalisés

**Props** :

```javascript
ThemeSelector.propTypes = {
    themes: PropTypes.array.isRequired,
    currentThemeId: PropTypes.string.isRequired,
    onThemeChange: PropTypes.func.isRequired,
    onCreateNew: PropTypes.func.isRequired,
    onThemeDeleted: PropTypes.func.isRequired,
    onThemeRenamed: PropTypes.func.isRequired,
    onImportTheme: PropTypes.func.isRequired, // ⭐ NOUVEAU
};
```

---

### 6. ThemeEditor (Éditeur de thèmes)

**Fichier** : `src/components/ThemeEditor/ThemeEditor.jsx`

**Responsabilités** :

- Création/modification de thèmes personnalisés
- Validation des données
- Sauvegarde dans localStorage

**Props** :

```javascript
ThemeEditor.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    initialTheme: PropTypes.object, // null pour création, objet pour édition
};
```

**Validation** :

- Nom du thème obligatoire
- Minimum 2 segments remplis par bande
- Maximum 12 segments par bande
- Pas de segments vides au milieu d'une bande

**Suggestions de noms de bandes** :

```javascript
const bandNameSuggestions = [
    "Groupe nominal sujet (Qui ?)",
    "Verbe transitif (Fait quoi ?)",
    "Complément d'objet direct (Quoi ?)",
    "Complément circonstanciel de lieu (Où ?)",
    "Complément circonstanciel / Finale (Quand ? Comment ? Pourquoi ?)",
];
```

---

### 7. ⭐ ThemeImportExport (NOUVEAU)

**Fichier** : `src/components/ThemeImportExport/ThemeImportExport.jsx`

**Ajouté le** : 2026-02-07

**Responsabilités** :

- Export de thème personnalisé en Markdown (.md)
- Import de thème depuis Markdown (.md) ou ancien format TXT
- Gestion des conflits de noms (renommer/remplacer)
- Validation des thèmes importés

**Props** :

```javascript
ThemeImportExport.propTypes = {
    currentTheme: PropTypes.object,
    allThemes: PropTypes.array.isRequired,
    onThemeImported: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};
```

**Format Markdown supporté** :

```markdown
---
name: Nom du thème
icon: 🎨
description: Description du thème
---

## Bande 1 : Personnages

- Segment 1
- Segment 2

## Bande 2 : Actions

- Segment 1
- Segment 2
```

**Compatibilité** :

- Format Markdown moderne (.md avec YAML front matter)
- Format TXT legacy (ancien format avec balises HTML `MPFH...MPFH`)

---

### 8. Controls (Boutons d'action)

#### RandomButton

Génère une combinaison aléatoire de tous les segments.

#### BandCountSelector

Permet de choisir le nombre de bandes actives (2-5).

#### FullscreenButton

Active/désactive le mode plein écran (API Fullscreen multi-navigateurs).

#### ExportButton

Exporte la phrase en image PNG (1200×800px) via Canvas API.

#### FavoriteButton

Sauvegarde l'histoire actuelle dans localStorage.

#### ExportThemeButton

Exporte le thème actuel en fichier HTML standalone (voir section dédiée).

#### ⭐ DyslexiaToggle (NOUVEAU)

**Fichier** : `src/components/Controls/DyslexiaToggle.jsx`

**Ajouté le** : 2026-02-07

**Responsabilités** :

- Active/désactive la police OpenDyslexic
- Sauvegarde la préférence dans localStorage
- Applique la classe `dyslexia-font` au `<body>`

**Fonctionnement** :

```javascript
// Activation : ajoute la classe au body
document.body.classList.add("dyslexia-font");

// CSS appliqué (index.css)
body.dyslexia-font {
    font-family: "OpenDyslexic", "Comic Sans MS", sans-serif !important;
    line-height: 1.7;
}
```

**Interface** :

- Bouton fixe en bas à droite
- Toggle switch visuel ON/OFF
- Texte "Police dyslexie ON" / "Police dyslexie"
- Persistance localStorage avec clé `fabrique_histoires_dyslexia_mode`

**Cas d'usage pédagogiques** :

- Élèves dyslexiques ou en difficulté de lecture
- Accessibilité renforcée conformément aux programmes d'éducation inclusive
- Paramètre individuel conservé entre les sessions

---

## 🎣 Hooks personnalisés

### useStoryBands

**Fichier** : `src/hooks/useStoryBands.js`

**Responsabilités** :

- Gestion de l'état des bandes (contenu, indices actifs)
- Logique de rotation et randomisation
- Construction de la phrase finale avec ponctuation

**API** :

```javascript
const {
    bandCount, // Nombre de bandes actives (2-5)
    bandsContent, // Contenu de toutes les bandes
    activeIndices, // Indices des segments actifs
    changeBandCount, // Fonction : changer le nombre de bandes
    rotateBand, // Fonction : faire tourner une bande
    randomize, // Fonction : randomiser tous les indices
    setContent, // Fonction : changer le contenu (changement de thème)
    getCurrentSentence, // Valeur mémorisée : phrase complète avec point
} = useStoryBands(initialBandCount, initialContent);
```

**Optimisations** :

- `useState` avec fonction d'initialisation lazy
- `useCallback` pour les fonctions (évite re-création)
- `useMemo` pour `getCurrentSentence` (évite recalculs)
- **Pas de `useEffect`** pour éviter les cascading renders

**Ponctuation automatique** :

```javascript
// Ajoute un point si absent
if (sentence && !/[.!?]$/.test(sentence)) {
    return sentence + ".";
}
```

---

### useThemes

**Fichier** : `src/hooks/useThemes.js`

**Responsabilités** :

- Gestion des thèmes (prédéfinis + personnalisés)
- Sauvegarde du dernier thème utilisé
- Rechargement depuis localStorage

**API** :

```javascript
const {
    currentThemeId, // ID du thème actuel
    currentTheme, // Objet thème complet
    allThemes, // Tous les thèmes (prédéfinis + custom)
    predefinedThemes, // Uniquement les thèmes prédéfinis
    customThemes, // Uniquement les thèmes personnalisés
    changeTheme, // Fonction : changer de thème
    reloadCustomThemes, // Fonction : recharger depuis localStorage
} = useThemes();
```

**Initialisation** :

```javascript
// Initialisation lazy pour éviter useEffect
const [currentThemeId, setCurrentThemeId] = useState(() => getLastTheme());
const [customThemes, setCustomThemes] = useState(() => getCustomThemes());
```

---

## 💾 Système de persistance (localStorage)

### storageManager

**Fichier** : `src/utils/storageManager.js`

**Clés de stockage** :

```javascript
const STORAGE_KEYS = {
    FAVORITES: "fabrique_histoires_favorites",
    CUSTOM_THEMES: "fabrique_histoires_custom_themes",
    LAST_THEME: "fabrique_histoires_last_theme",
    SETTINGS: "fabrique_histoires_settings",
};
```

### API des favoris

```javascript
// Sauvegarder un favori
saveFavorite({ sentence, bandCount, themeId });

// Récupérer tous les favoris
const favorites = getFavorites();
// Retourne : Array<{ id, sentence, bandCount, themeId, date }>

// Supprimer un favori
deleteFavorite(id);
```

### API des thèmes personnalisés

```javascript
// Sauvegarder un thème
saveCustomTheme(themeObject);

// Récupérer les thèmes personnalisés
const themes = getCustomThemes();
// Retourne : Array<{ id, name, icon, description, bands, isCustom, createdAt }>

// Supprimer un thème
deleteCustomTheme(themeId);

// Renommer un thème
renameCustomTheme(themeId, newName);
```

### API de sauvegarde/restauration

```javascript
// Export complet en JSON
const jsonData = exportAllData();

// Import depuis JSON
const success = importAllData(jsonData);
```

**Limites** :

- Maximum 50 favoris (FIFO)
- Pas de limite pour les thèmes personnalisés
- Données stockées en JSON stringifié

---

## ⭐ Système d'import/export de thèmes (NOUVEAU)

### themeImportExport

**Fichier** : `src/utils/themeImportExport.js`

**Ajouté le** : 2026-02-07

**Responsabilités** :

- Export de thème en Markdown (.md)
- Import depuis Markdown (.md) ou TXT legacy
- Validation de thème
- Gestion des conflits de noms

### API principale

```javascript
/**
 * Exporte un thème au format Markdown
 */
exportThemeToMarkdown(theme) → string

/**
 * Télécharge le fichier Markdown
 */
downloadThemeAsMarkdown(theme) → void

/**
 * Parse un fichier Markdown
 */
parseMarkdownTheme(markdownContent) → Object|null

/**
 * Parse l'ancien format TXT
 */
parseLegacyTxtTheme(txtContent) → Object|null

/**
 * Importe un fichier (détection automatique)
 */
importThemeFile(file) → Promise<Object|null>

/**
 * Vérifie les conflits de noms
 */
checkThemeNameConflict(themeName, existingThemes) → boolean

/**
 * Génère un nom unique
 */
generateUniqueName(baseName, existingThemes) → string

/**
 * Valide un thème
 */
validateTheme(theme) → { valid: boolean, errors: string[] }
```

### Format Markdown

**Structure** :

```markdown
---
name: Les Pirates
icon: 🏴‍☠️
description: Aventures de pirates sur les océans
---

## Bande 1 : Personnages

- Le capitaine Barbe-Rouge
- La pirate courageuse
- Le mousse malicieux

## Bande 2 : Actions

- navigue
- cherche
- découvre
```

**Parser YAML simple** : Le parser ne supporte que les paires `clé: valeur` basiques (pas de YAML complexe).

### Format TXT legacy

**Structure** :

```
MPFH
<div class="phrase">
  <input class="bande1" value="Segment 1">
  <input class="bande2" value="Segment 2">
  <input class="bande3" value="Segment 3">
</div>
MPFH
```

**Compatibilité rétroactive** : Permet aux enseignants d'importer leurs anciens fichiers sans conversion manuelle.

### Cas d'usage

#### Scénario 1 : Partage entre enseignants

1. Enseignant A crée un thème "Les Volcans"
2. Exporte en Markdown
3. Partage le fichier .md par email
4. Enseignant B importe le fichier
5. Utilise directement le thème

#### Scénario 2 : Bibliothèque de thèmes

- Constitution d'une bibliothèque de fichiers .md
- Partage sur un drive commun
- Import selon les besoins pédagogiques

---

## ⭐ Système d'export HTML standalone

### generateStandaloneHTML

**Fichier** : `src/utils/generateStandaloneHTML.js`

**Ajouté le** : 2026-02-07

**Responsabilités** :

- Génération d'un fichier HTML autonome contenant un thème complet
- Embarquement du CSS Tailwind optimisé (~15 KB)
- Application JavaScript vanilla (pas de React dans le fichier exporté)
- Échappement XSS des données JSON

**API** :

```javascript
/**
 * Génère un fichier HTML standalone pour un thème
 * @param {Object} theme - Le thème à exporter
 * @returns {string} Contenu HTML complet
 */
export const generateStandaloneHTML = (theme) => { ... }

/**
 * Télécharge le fichier HTML généré
 * @param {string} filename - Nom du fichier
 * @param {string} content - Contenu HTML
 */
export const downloadHTMLFile = (filename, content) => { ... }
```

### Architecture du fichier HTML généré

```html
<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8" />
        <title>Fabrique à Histoires - [Nom du thème]</title>
        <style>
            /* CSS Tailwind optimisé (~15 KB) */
        </style>
    </head>
    <body>
        <div id="root"></div>
        <script>
            const THEME_DATA = {...}; // Données échappées
            class StoryBandApp { ... } // Application vanilla
        </script>
    </body>
</html>
```

### Fonctionnalités du fichier exporté

✅ **Incluses** :

- Rotation des bandes (clic + clavier)
- Aperçu de la phrase complète
- Génération aléatoire
- Sélecteur de nombre de bandes (2-5)
- Export PNG de la phrase
- Animations CSS
- Responsive design

❌ **Exclues** :

- Sauvegarde de favoris
- Création/modification de thème
- Sélection d'autres thèmes
- Mode dyslexie (police non embarquée)

### Performance

| Métrique            | Valeur                                        |
| ------------------- | --------------------------------------------- |
| Taille fichier      | 150-200 KB                                    |
| Temps de génération | < 200 ms                                      |
| CSS optimisé        | ~15 KB                                        |
| Compatible          | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ |

---

## ⭐ Système de police dyslexie (NOUVEAU)

### Configuration

**Package** : `@fontsource/opendyslexic` version 5.2.5

**Import** : Dans `App.jsx`

```javascript
import "@fontsource/opendyslexic/400.css";
import "@fontsource/opendyslexic/700.css";
```

### CSS dédié

**Fichier** : `src/index.css`

```css
/* Classe appliquée au body */
body.dyslexia-font {
    font-family: "OpenDyslexic", "Comic Sans MS", sans-serif !important;
    line-height: 1.7;
}

/* Forcer sur tous les éléments */
body.dyslexia-font * {
    font-family: inherit !important;
}

/* Ajustements lisibilité */
body.dyslexia-font p,
body.dyslexia-font h1,
body.dyslexia-font h2,
body.dyslexia-font h3,
body.dyslexia-font button,
body.dyslexia-font input,
body.dyslexia-font label {
    letter-spacing: 0.04em;
}

/* Amélioration contraste */
body.dyslexia-font .text-gray-600 {
    color: #374151 !important;
}
```

### Persistance

**Clé localStorage** : `fabrique_histoires_dyslexia_mode`

**Valeurs** : `"true"` ou `"false"`

### Accessibilité

- Conforme aux recommandations WCAG 2.1
- Améliore la lisibilité pour dyslexiques
- Police spécialement conçue avec empattements distincts
- Espacement accru entre lettres et lignes

---

## 🎨 Système de thèmes

### Structure d'un thème

**Fichier** : `src/data/themes.js`

```javascript
{
  id: 'unique_id',
  name: 'Nom du thème',
  icon: '🎨',
  description: 'Description',
  isCustom: false, // true pour thèmes utilisateur
  bands: [
    ['Segment 1', 'Segment 2', ...], // Bande 1 (min 2 segments)
    ['Segment 1', 'Segment 2', ...], // Bande 2
    ['Segment 1', 'Segment 2', ...], // Bande 3
    ['Segment 1', 'Segment 2', ...], // Bande 4
    ['Segment 1', 'Segment 2', ...]  // Bande 5
  ]
}
```

### Thèmes prédéfinis

| ID         | Nom                | Description                          |
| ---------- | ------------------ | ------------------------------------ |
| `default`  | Classique          | Histoires variées (thème par défaut) |
| `animaux`  | Animaux            | Animaux de la ferme et de la forêt   |
| `ecole`    | À l'école          | Vie à l'école et apprentissages      |
| `vacances` | Vacances           | Aventures pendant les vacances       |
| `contes`   | Contes de fées     | Univers magique des contes           |
| `espace`   | Sciences et Espace | Exploration spatiale                 |

### Règles de conception des thèmes

1. **Structure grammaticale** : Les bandes forment une phrase cohérente

    - Bande 1 : Groupe nominal sujet (Qui ?)
    - Bande 2 : Verbe transitif (Fait quoi ?)
    - Bande 3 : Complément d'objet direct (Quoi ?)
    - Bande 4 : Complément circonstanciel de lieu (Où ?)
    - Bande 5 : Complément circonstanciel / Finale (Quand ? Comment ? Pourquoi ?)

2. **Longueur des segments** : 3-5 mots maximum par segment

3. **Cohérence** : Tous les segments d'une bande doivent être interchangeables grammaticalement

4. **Ponctuation** :

    - **NE PAS** mettre de point dans les données `themes.js`
    - Le point est ajouté automatiquement par l'application sur la dernière bande active
    - Logique dans `StoryBuilder.jsx` lors du mapping des segments

5. **Variété** : Minimum 6 segments par bande pour générer assez de combinaisons

---

## 🎬 Animations CSS

### Animation flip

**Fichier** : `src/index.css`

```css
@keyframes pageFlip {
    0% {
        transform: perspective(600px) rotateX(-90deg);
        transform-origin: center top;
        opacity: 0;
    }
    30% {
        transform: perspective(600px) rotateX(-30deg);
        opacity: 0.5;
    }
    100% {
        transform: perspective(600px) rotateX(0deg);
        transform-origin: center top;
        opacity: 1;
    }
}

.animate-flip-in {
    animation: pageFlip 0.5s ease-out;
}
```

**Usage** : Appliquée à `BandSegment` via la classe Tailwind `animate-flip-in`

### Animation rotation lente

**Fichier** : `tailwind.config.js`

```javascript
theme: {
  extend: {
    animation: {
      'spin-slow': 'spin 3s linear infinite'
    }
  }
}
```

**Usage** : Icône de rotation sur les bandes (`animate-spin-slow`)

---

## 📊 Flux de données

### Diagramme de flux principal

```
App.jsx (root)
    ↓
    ├─ FullscreenButton
    ├─ DyslexiaToggle ⭐
    └─ StoryBuilder
        ↓
        ├─→ useThemes() ──→ localStorage (thèmes)
        │       ↓
        │   ThemeSelector ──→ onImportTheme() ⭐
        │       ↓
        │   ThemeEditor
        │       ↓
        │   ThemeImportExport ⭐
        │
        ├─→ useStoryBands() ──→ État des bandes
        │       ↓
        │   StoryBand × N
        │       ↓
        │   BandSegment
        │
        ├─→ Controls
        │   ├─ RandomButton
        │   ├─ BandCountSelector
        │   ├─ FavoriteButton ──→ localStorage (favoris)
        │   ├─ ExportButton ──→ Canvas API
        │   └─ ExportThemeButton ──→ generateStandaloneHTML
        │
        └─→ Favorites ──→ localStorage (favoris)
```

### Changement de thème

```
1. User clique sur ThemeSelector
2. ThemeSelector appelle onThemeChange(themeId)
3. StoryBuilder → changeTheme(themeId) [useThemes]
4. useThemes met à jour currentTheme
5. useEffect dans StoryBuilder détecte le changement
6. StoryBuilder → setContent(newTheme.bands) [useStoryBands]
7. useStoryBands réinitialise bandCount et activeIndices
8. Composants enfants re-render avec nouveau contenu
```

### Rotation d'une bande

```
1. User clique sur StoryBand
2. StoryBand appelle onRotate(bandIndex)
3. StoryBuilder → rotateBand(bandIndex) [useStoryBands]
4. useStoryBands met à jour activeIndices[bandIndex]
5. getCurrentSentence recalculé (useMemo)
6. StoryBuilder mappe les segments et ajoute le point sur dernière bande
7. StoryBand re-render avec nouveau activeIndex
8. BandSegment remonte (key change) → animation CSS
```

### ⭐ Import de thème

```
1. User clique sur "Importer un thème" dans ThemeSelector
2. ThemeSelector appelle onImportTheme()
3. StoryBuilder ouvre la modale ThemeImportExport
4. User sélectionne un fichier .md ou .txt
5. ThemeImportExport → importThemeFile(file)
6. Détection automatique du format (Markdown/TXT)
7. Parsing avec parseMarkdownTheme() ou parseLegacyTxtTheme()
8. Validation avec validateTheme()
9. Vérification des conflits de noms
10. Si conflit → Affichage dialogue renommer/remplacer
11. Sinon → saveCustomTheme() direct
12. StoryBuilder → reloadCustomThemes() et changeTheme(importedTheme.id)
```

---

## 🔧 Configuration

### Vite

**Fichier** : `vite.config.js`

```javascript
export default defineConfig({
    plugins: [react()],
    build: {
        target: "es2015",
        minify: "terser",
        rollupOptions: {
            output: {
                manualChunks: {
                    "react-vendor": ["react", "react-dom"],
                },
            },
        },
    },
    server: {
        port: 3020,
        open: true,
    },
});
```

### Tailwind CSS

**Fichier** : `tailwind.config.js`

```javascript
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            animation: {
                "spin-slow": "spin 3s linear infinite",
                "flip-in": "pageFlip 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)",
            },
            keyframes: {
                pageFlip: {
                    // Défini dans tailwind.config.js mais utilisé via index.css
                },
            },
            fontFamily: {
                comic: ["Comic Neue", "Comic Sans MS", "cursive"],
            },
        },
    },
    plugins: [],
};
```

---

## ✅ Bonnes pratiques React appliquées

### 1. Pas de useEffect pour synchronisation d'état interne

❌ **Mauvais** :

```javascript
useEffect(() => {
    setState(getValue());
}, []);
```

✅ **Bon** :

```javascript
const [state, setState] = useState(() => getValue());
```

### 2. useMemo pour valeurs dérivées

✅ **Bon** :

```javascript
const getCurrentSentence = useMemo(() => {
    return computeSentence();
}, [dependencies]);
```

### 3. Key dynamique pour forcer remontage

✅ **Bon** :

```javascript
<BandSegment key={activeIndex} text={text} />
```

### 4. PropTypes systématiques

✅ **Bon** :

```javascript
Component.propTypes = {
    prop1: PropTypes.string.isRequired,
    prop2: PropTypes.number,
};
```

⚠️ **Exception détectée** : `StoryPreview.jsx` n'utilise pas PropTypes (écart à la convention du projet)

### 5. Composants purs et idempotents

- Pas d'effets de bord dans le render
- Résultat prévisible pour des props identiques
- Logique métier dans les hooks

---

## 🧪 Guide de test

### Tests manuels essentiels

#### 1. Rotation des bandes

- [ ] Clic sur chaque bande fait défiler le segment
- [ ] Touche Entrée/Espace fait défiler
- [ ] Animation flip visible à chaque changement
- [ ] Indicateur de position se met à jour (ex: 2/6)
- [ ] Point final présent sur la dernière bande active

#### 2. Changement de nombre de bandes

- [ ] Sélecteur 2/3/4/5 fonctionne
- [ ] Les bandes s'ajoutent/retirent correctement
- [ ] La phrase se met à jour immédiatement
- [ ] Le point final reste sur la dernière bande après changement

#### 3. Génération aléatoire

- [ ] Bouton "Surprise" change tous les segments
- [ ] Résultat différent à chaque clic
- [ ] Animation visible sur toutes les bandes

#### 4. Thèmes

- [ ] Menu déroulant affiche tous les thèmes
- [ ] Changement de thème met à jour le contenu
- [ ] Thème actuel correctement indiqué
- [ ] Création de nouveau thème fonctionne
- [ ] Badge "Personnalisé" visible sur thèmes custom

#### 5. Éditeur de thèmes

- [ ] Formulaire de création accessible
- [ ] Validation empêche sauvegarde si erreurs
- [ ] Ajout/suppression de segments fonctionne
- [ ] Icônes suggérées cliquables
- [ ] Thème personnalisé apparaît dans la liste
- [ ] Suggestions de noms de bandes affichées

#### 6. ⭐ Import/Export de thèmes (NOUVEAU)

- [ ] Bouton "Importer un thème" visible dans ThemeSelector
- [ ] Modale ThemeImportExport s'ouvre
- [ ] Import fichier .md fonctionne
- [ ] Import fichier .txt legacy fonctionne
- [ ] Validation détecte les thèmes invalides
- [ ] Gestion des conflits de noms :
    - [ ] Dialogue renommer/remplacer s'affiche
    - [ ] Renommage génère un nom unique
    - [ ] Remplacement écrase l'ancien thème
- [ ] Export en Markdown fonctionne
- [ ] Fichier .md téléchargé contient YAML + bandes
- [ ] Réimport du fichier exporté fonctionne

#### 7. ⭐ Police dyslexie (NOUVEAU)

- [ ] Bouton toggle visible en bas à droite
- [ ] Switch ON/OFF fonctionne
- [ ] Police OpenDyslexic s'applique à tout le texte
- [ ] Contraste amélioré en mode dyslexie
- [ ] Letter-spacing augmenté
- [ ] Préférence sauvegardée après F5
- [ ] Fonctionne dans tous les composants

#### 8. Favoris

- [ ] Bouton étoile sauvegarde l'histoire
- [ ] Feedback visuel "Sauvegardée !"
- [ ] Liste des favoris affichable
- [ ] Chargement d'un favori restaure l'état
- [ ] Suppression fonctionne avec confirmation

#### 9. Export PNG

- [ ] Export génère une image
- [ ] Nom de fichier contient la date
- [ ] Image contient titre + phrase complète
- [ ] Découpage multi-lignes si phrase longue
- [ ] Signature "micetf.fr" présente

#### 10. Export HTML standalone

- [ ] Bouton "Exporter thème HTML" visible
- [ ] Fichier HTML se télécharge (~150-200 KB)
- [ ] Nom de fichier correct (slug du thème)
- [ ] **Déconnecter Internet**
- [ ] Ouvrir le fichier HTML téléchargé
- [ ] Toutes les fonctionnalités marchent offline
- [ ] Animations CSS fonctionnent
- [ ] Responsive design OK

#### 11. Mode plein écran

- [ ] Bouton disponible (si API supportée)
- [ ] Passage en plein écran fonctionne
- [ ] Sortie avec Échap fonctionne
- [ ] Icône change selon l'état

#### 12. Persistance localStorage

- [ ] Thèmes personnalisés conservés après F5
- [ ] Favoris conservés après F5
- [ ] Dernier thème utilisé restauré au lancement
- [ ] Préférence dyslexie conservée après F5

#### 13. Responsive

- [ ] Layout adapté sur mobile (320px)
- [ ] Layout adapté sur tablette (768px)
- [ ] Layout adapté sur desktop (1024px+)
- [ ] Texte lisible à toutes les tailles
- [ ] Boutons accessibles au doigt

---

## 🐛 Problèmes connus et limitations

### Écarts aux conventions détectés

1. **StoryPreview.jsx** : PropTypes non utilisé (incohérence avec les autres composants)

### Limitations actuelles

1. **Pas de mode collaboratif** : Un seul utilisateur à la fois
2. **Pas de sauvegarde cloud** : Données uniquement en local
3. **Pas d'historique d'annulation** : Impossible de revenir en arrière
4. **Pas d'impression directe** : Export PNG uniquement
5. **Pas de sons** : Pas de feedback audio
6. **Pas de mode sombre** : Thème clair uniquement
7. **Police dyslexie non embarquée dans export HTML** : Fichiers standalone ne supportent pas la police OpenDyslexic
8. **Parser YAML limité** : Ne supporte que les paires clé:valeur simples (pas de YAML complexe)

### Bugs potentiels à surveiller

1. **localStorage plein** : Peut causer des erreurs de sauvegarde

    - Solution : Limiter à 50 favoris, ajouter gestion d'erreur

2. **API Fullscreen non supportée** : Sur anciens navigateurs

    - Solution : Bouton masqué si API absente

3. **Export PNG sur Safari iOS** : Peut échouer

    - Solution : Utiliser blob + download attribute

4. **Animation saccadée** : Si trop de bandes ou segments

    - Solution : Limiter à 5 bandes, 12 segments max

5. **Export HTML avec caractères spéciaux** : Risque XSS

    - Solution : Échappement JSON déjà implémenté

6. **Import fichier Markdown mal formé** : Peut crasher le parser
    - Solution : Try/catch et validation déjà implémentés

---

## 🚀 Roadmap et évolutions futures

### ✅ Fonctionnalités terminées (v1.2.0 - 2026-02-07)

- [x] Export HTML standalone
- [x] Import/Export thèmes Markdown
- [x] Police dyslexie OpenDyslexic
- [x] Renommer/supprimer thèmes personnalisés
- [x] Gestion conflits de noms à l'import

### Priorité 1 : Améliorations export/import

- [ ] Notification toast après export réussi
- [ ] Option pour personnaliser le nom du fichier
- [ ] Prévisualisation avant export
- [ ] Export de plusieurs thèmes dans un seul fichier
- [ ] Embarquement police dyslexie dans export HTML
- [ ] Support YAML complexe (listes, objets imbriqués)

### Priorité 2 : Améliorations UX

- [ ] **Sons optionnels** : Clic, rotation, génération aléatoire
- [ ] **Confettis** : Animation lors de la génération aléatoire
- [ ] **Animation 3D avancée** : Bandes cylindriques 3D
- [ ] **Mode sombre** : Thème sombre avec switch
- [ ] **Partage direct** : Email, réseaux sociaux, QR code
- [ ] **Correction PropTypes** : Ajouter PropTypes à StoryPreview.jsx

### Priorité 3 : Fonctionnalités avancées

- [ ] **Galerie de thèmes** : Partage communautaire
- [ ] **Historique d'annulation** : Ctrl+Z / Ctrl+Y
- [ ] **Mode collaboratif** : Plusieurs utilisateurs en temps réel
- [ ] **Impression PDF** : Export multi-histoires
- [ ] **Statistiques** : Compteur de phrases générées
- [ ] **Défis quotidiens** : Phrase imposée à compléter

### Priorité 4 : Accessibilité

- [ ] **Support lecteur d'écran** : ARIA labels complets
- [ ] **Navigation clavier avancée** : Tab, flèches, raccourcis
- [ ] **Contraste amélioré** : Respect WCAG 2.1 AAA
- [ ] **Taille de texte ajustable** : Zoom sans casse du layout
- [ ] **Alternatives textuelles** : Descriptions pour chaque interaction

### Priorité 5 : Performance

- [ ] **Lazy loading** : Chargement différé des modales
- [ ] **Code splitting** : Découpage des bundles
- [ ] **Service Worker** : Mode offline (PWA)
- [ ] **IndexedDB** : Alternative à localStorage
- [ ] **Optimisation images** : WebP, compression

---

## 📚 Ressources et références

### Documentation officielle

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [MDN Web APIs](https://developer.mozilla.org/en-US/docs/Web/API)
- [OpenDyslexic Font](https://opendyslexic.org/)

### Inspirations pédagogiques

- Méthode Montessori : Manipulation et autonomie
- Cadavre exquis : Créativité collective
- Flipbook : Animation mécanique
- Jeux combinatoires : Permutations et surprises

### Icônes et assets

- Émojis natifs : Unicode standard
- SVG custom : Inline dans les composants
- Pas de dépendance externe d'icônes

---

## 👥 Contribution

### Workflow Git recommandé

```bash
# Créer une branche feature
git checkout -b feature/nom-feature

# Commits atomiques avec messages clairs
git commit -m "feat: ajout du mode sombre"
git commit -m "fix: correction du bug d'export PNG"

# Push et Pull Request
git push origin feature/nom-feature
```

### Convention de commits

```
feat: Nouvelle fonctionnalité
fix: Correction de bug
docs: Documentation
style: Formatage, points-virgules
refactor: Refactoring sans changement de comportement
perf: Amélioration de performance
test: Ajout de tests
chore: Tâches de maintenance
```

### Standards de code

1. **ESLint** : Pas de warnings autorisés
2. **PropTypes** : Validation systématique (⚠️ exception StoryPreview.jsx à corriger)
3. **JSDoc** : Documentation des fonctions complexes
4. **Nommage** : camelCase pour variables/fonctions, PascalCase pour composants
5. **Indentation** : 4 espaces (config actuelle du projet)

---

## 📞 Support et contact

### Pour les enseignants

- Site principal : [https://micetf.fr](https://micetf.fr)
- Email : webmaster@micetf.fr
- Tutoriels vidéo : Chaîne YouTube MiCetF

### Pour les développeurs

- Dépôt GitHub : [À définir]
- Issues : [À définir]
- Discussions : [À définir]

---

## 📄 Licence

**MIT License**

```
Copyright (c) 2026 MiCetF - Frédéric MISERY

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 🎓 Glossaire

| Terme                   | Définition                                                      |
| ----------------------- | --------------------------------------------------------------- |
| **Bande**               | Ligne horizontale contenant plusieurs segments interchangeables |
| **Segment**             | Élément de texte individuel d'une bande (ex: "Le petit chat")   |
| **Thème**               | Collection de 5 bandes formant un univers cohérent              |
| **Cadavre exquis**      | Jeu littéraire de phrases collaboratives aléatoires             |
| **Lazy initialization** | Pattern React pour initialiser useState sans useEffect          |
| **Cascading render**    | Anti-pattern React causant des renders en cascade               |
| **PropTypes**           | Système de validation des props en JavaScript                   |
| **useMemo**             | Hook React pour mémoriser une valeur calculée                   |
| **useCallback**         | Hook React pour mémoriser une fonction                          |
| **Standalone**          | Fichier autonome fonctionnant sans dépendances externes         |
| **Offline**             | Fonctionnement sans connexion Internet                          |
| **Markdown**            | Format de texte balisé léger                                    |
| **YAML Front Matter**   | Métadonnées au début d'un fichier Markdown                      |
| **OpenDyslexic**        | Police conçue pour faciliter la lecture aux dyslexiques         |

---

## 📊 Métriques du projet

### Statistiques actuelles

- **Composants React** : 18 (+ DyslexiaToggle, + ThemeImportExport)
- **Hooks personnalisés** : 2
- **Utilitaires** : 3 (+ themeImportExport)
- **Thèmes prédéfinis** : 6
- **Lignes de code** : ~3800
- **Taille du bundle** : ~180 KB (gzipped, incluant OpenDyslexic)
- **Temps de build** : ~6 secondes
- **Compatibilité navigateurs** : Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

### Combinaisons possibles

Avec les thèmes par défaut (6 segments/bande) :

| Bandes | Combinaisons | Formule |
| ------ | ------------ | ------- |
| 2      | 36           | 6²      |
| 3      | 216          | 6³      |
| 4      | 1 296        | 6⁴      |
| 5      | 7 776        | 6⁵      |

---

## 📝 Changelog

### Version 1.2.0 - 2026-02-07

**✨ Nouvelles fonctionnalités**

- Ajout du système d'import/export de thèmes
- Nouveau composant `ThemeImportExport`
- Nouveau utilitaire `themeImportExport.js`
- Support format Markdown (.md) avec YAML front matter
- Support rétrocompatibilité format TXT legacy
- Gestion des conflits de noms (renommer/remplacer)
- Validation complète des thèmes importés
- Ajout du mode police dyslexie `DyslexiaToggle`
- Package `@fontsource/opendyslexic` intégré
- Renommer/supprimer thèmes personnalisés depuis ThemeSelector

**🔒 Sécurité**

- Validation stricte des fichiers importés
- Parser YAML sécurisé (paires clé:valeur uniquement)
- Try/catch sur toutes les opérations de parsing

**♿ Accessibilité**

- Police OpenDyslexic pour dyslexiques
- Amélioration contraste en mode dyslexie
- Persistance préférence dyslexie

**📚 Documentation**

- Documentation complète de l'import/export
- Guide d'utilisation du format Markdown
- Documentation du mode dyslexie

**🐛 Corrections**

- Aucune correction dans cette version (nouvelles fonctionnalités uniquement)

### Version 1.1.0 - 2026-02-07

**✨ Nouvelles fonctionnalités**

- Ajout de l'export de thème en HTML standalone
- Nouveau composant `ExportThemeButton`
- Nouveau utilitaire `generateStandaloneHTML`
- CSS Tailwind optimisé embarqué (~15 KB)
- Application JavaScript vanilla pour fichiers exportés
- Fonctionnement 100% offline garanti

**🔒 Sécurité**

- Échappement XSS des données JSON dans l'export HTML
- Validation des noms de fichiers (slug)

**📚 Documentation**

- Documentation complète de l'export HTML
- Guide d'installation rapide
- Exemples de cas d'usage pédagogiques

### Version 1.0.0 - 2026-01-XX

- Version initiale de la Fabrique à Histoires
- 6 thèmes prédéfinis
- Système de favoris
- Éditeur de thèmes personnalisés
- Export PNG des phrases
- Mode plein écran

---

**Document généré le** : 2026-02-07  
**Version de l'application** : 1.2.0  
**Auteur** : MiCetF - Frédéric MISERY  
**Dernière mise à jour** : 2026-02-07

---

🎉 **Merci d'avoir lu cette documentation !**

Pour toute question, n'hésitez pas à contacter l'équipe de développement.
