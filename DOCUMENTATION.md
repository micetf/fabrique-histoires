# 📘 Documentation Technique - Fabrique à Histoires

## 🎯 Vue d'ensemble du projet

**Fabrique à Histoires** est une application web éducative interactive destinée aux élèves de 5 à 11 ans (GS-CM2). Elle permet de créer des phrases amusantes en combinant des segments de texte disposés sur des "bandes" horizontales rotatives, inspirée du principe du "cadavre exquis".

### Objectifs pédagogiques

- Développer la créativité langagière
- Comprendre la structure grammaticale des phrases
- Favoriser l'apprentissage ludique de la syntaxe
- Encourager la production d'écrits

---

## 🏗️ Architecture technique

### Stack technologique

| Technologie      | Version | Usage                       |
| ---------------- | ------- | --------------------------- |
| **React**        | 18.2.0  | Framework UI                |
| **Vite**         | 6.1.1   | Build tool & dev server     |
| **Tailwind CSS** | 3.4.1   | Framework CSS utility-first |
| **pnpm**         | Latest  | Gestionnaire de packages    |
| **PropTypes**    | Latest  | Validation des props        |

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

# Lancement en mode développement (port 3000)
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
│   │   │   └── index.js
│   │   ├── ThemeSelector/    # Sélecteur de thèmes
│   │   │   ├── ThemeSelector.jsx
│   │   │   └── index.js
│   │   ├── ThemeEditor/      # Éditeur de thèmes
│   │   │   ├── ThemeEditor.jsx
│   │   │   ├── BandEditor.jsx
│   │   │   └── index.js
│   │   ├── ThemeImportExport/ # Import/Export de thèmes ✨ NOUVEAU
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
│   │   └── themeImportExport.js ✨ NOUVEAU
│   ├── App.jsx               # Composant racine
│   ├── main.jsx              # Point d'entrée
│   └── index.css             # Styles globaux + animations
├── docs/                     # Documentation ✨ NOUVEAU
│   ├── GUIDE-IMPORT-EXPORT.md
│   └── exemple-theme-pirates.md
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
- Gestion des thèmes (sélection, création, import/export) ✨
- Gestion des favoris
- Coordination entre les sous-composants

**Props** : Aucune (composant racine)

**État local** :

```javascript
const [showThemeEditor, setShowThemeEditor] = useState(false);
const [showFavorites, setShowFavorites] = useState(false);
const [showImportExport, setShowImportExport] = useState(false); // ✨ NOUVEAU
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
- **Point final automatique sur la dernière bande active**

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

### 4. ThemeSelector (Sélecteur de thèmes)

**Fichier** : `src/components/ThemeSelector/ThemeSelector.jsx`

**Responsabilités** :

- Affichage d'un menu déroulant de thèmes
- Preview avec icône et description
- Bouton "Créer un nouveau thème"

**Props** :

```javascript
ThemeSelector.propTypes = {
    themes: PropTypes.array.isRequired, // Liste des thèmes
    currentThemeId: PropTypes.string.isRequired, // ID du thème actuel
    onThemeChange: PropTypes.func.isRequired, // Callback changement
    onCreateNew: PropTypes.func.isRequired, // Callback création
};
```

---

### 5. ThemeEditor (Éditeur de thèmes)

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

---

### 6. ThemeImportExport ✨ NOUVEAU

**Fichier** : `src/components/ThemeImportExport/ThemeImportExport.jsx`

**Responsabilités** :

- Export de thèmes au format Markdown
- Import de thèmes (Markdown ou ancien format TXT)
- Gestion des conflits de noms
- Validation des thèmes importés

**Props** :

```javascript
ThemeImportExport.propTypes = {
    currentTheme: PropTypes.object, // Thème actuellement sélectionné
    allThemes: PropTypes.array.isRequired, // Tous les thèmes disponibles
    onThemeImported: PropTypes.func.isRequired, // Callback après import réussi
    onClose: PropTypes.func.isRequired, // Callback fermeture
};
```

**Fonctionnalités** :

- **Export** :

    - Télécharge le thème actuel au format `.md`
    - Uniquement pour les thèmes personnalisés
    - Nom de fichier sanitizé automatiquement

- **Import** :

    - Formats supportés : `.md` (Markdown) et `.txt` (ancien format)
    - Détection automatique du format
    - Validation complète du contenu

- **Gestion des conflits** :
    - Détection des noms en doublon
    - Option "Renommer" avec génération automatique
    - Option "Remplacer" avec confirmation

**État local** :

```javascript
const [importStatus, setImportStatus] = useState(null);
const [showConflictDialog, setShowConflictDialog] = useState(false);
const [conflictTheme, setConflictTheme] = useState(null);
const [newName, setNewName] = useState("");
```

---

### 7. Controls (Boutons d'action)

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

## 📦 Module themeImportExport ✨ NOUVEAU

**Fichier** : `src/utils/themeImportExport.js`

Module utilitaire pour l'import/export de thèmes au format Markdown avec rétrocompatibilité TXT.

### API Export

```javascript
/**
 * Exporte un thème au format Markdown
 */
exportThemeToMarkdown(theme);
// Retourne : string (contenu Markdown)

/**
 * Télécharge un thème en tant que fichier .md
 */
downloadThemeAsMarkdown(theme);
// Télécharge automatiquement le fichier
```

### API Import

```javascript
/**
 * Parse un fichier Markdown
 */
parseMarkdownTheme(markdownContent);
// Retourne : Object (thème) ou null si erreur

/**
 * Parse l'ancien format TXT
 */
parseLegacyTxtTheme(txtContent);
// Retourne : Object (thème) ou null si erreur

/**
 * Importe un fichier (détection automatique du format)
 */
await importThemeFile(file);
// Retourne : Promise<Object|null>
```

### API Gestion des conflits

```javascript
/**
 * Vérifie si un nom existe déjà
 */
checkThemeNameConflict(themeName, existingThemes);
// Retourne : boolean

/**
 * Génère un nom unique
 */
generateUniqueName(baseName, existingThemes);
// Retourne : string (ex: "Pirates (3)")
```

### API Validation

```javascript
/**
 * Valide un objet thème
 */
validateTheme(theme);
// Retourne : { valid: boolean, errors: string[] }
```

### Format Markdown des thèmes

**Structure** :

```markdown
---
name: Nom du thème
icon: 🎨
description: Description du thème
---

## Bande 1 : Titre

- Segment 1
- Segment 2
- ...

## Bande 2 : Titre

- Segment 1
- ...
```

**Caractéristiques** :

- **Front matter YAML** : Métadonnées du thème
- **Sections Markdown** : Une section par bande
- **Listes à puces** : Un item par segment
- **Lisible et éditable** : Les enseignants peuvent créer des thèmes manuellement

### Compatibilité ancien format TXT

**Format MPFH** (ancien système) :

```
MPFH<div class="phrase"><input type="text" class="bande1" value="..."/>...</div>MPFH
```

**Conversion** :

- Détection automatique par marqueurs `MPFH`
- Extraction des 3 bandes (limitation de l'ancien format)
- Génération des métadonnées par défaut
- Import transparent pour l'utilisateur

**Limitations de l'ancien format** :

- Maximum 3 bandes (vs 5 pour le nouveau)
- Pas de métadonnées (nom, icône, description)
- Format HTML verbeux

---

## 🎨 Système de thèmes

### Structure d'un thème

**Fichier** : `src/data/themes.js`

```javascript
{
  id: 'unique_id',           // Identifiant unique
  name: 'Nom du thème',      // Nom affiché
  icon: '🎨',                // Émoji/icône
  description: 'Description',// Texte descriptif
  isCustom: false,           // true pour thèmes utilisateur
  bands: [                   // 5 bandes minimum
    ['Segment 1', 'Segment 2', ...],  // Bande 1 (min 2 segments)
    ['Segment 1', 'Segment 2', ...],  // Bande 2
    ['Segment 1', 'Segment 2', ...],  // Bande 3
    ['Segment 1', 'Segment 2', ...],  // Bande 4
    ['Segment 1', 'Segment 2', ...]   // Bande 5
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

1. **Structure grammaticale** : Les bandes doivent former une phrase cohérente

    - Bande 1 : Sujets (Qui ?)
    - Bande 2 : Verbes (Fait quoi ?)
    - Bande 3 : Compléments (Quoi ? Avec qui ?)
    - Bande 4 : Lieux (Où ?)
    - Bande 5 : Circonstances/Finales (Quand ? Pourquoi ?)

2. **Longueur des segments** : 3-5 mots maximum par segment

3. **Cohérence** : Tous les segments d'une bande doivent être interchangeables grammaticalement

4. **Ponctuation** :

    - **NE PAS** mettre de point dans les données
    - Le point est ajouté automatiquement par l'application

5. **Variété** : Minimum 6 segments par bande pour générer assez de combinaisons

---

## 🎬 Animations CSS

### Animation flip

**Fichier** : `src/index.css`

```css
@keyframes pageFlip {
    0% {
        transform: perspective(600px) rotateX(-90deg);
        opacity: 0;
    }
    30% {
        transform: perspective(600px) rotateX(-30deg);
        opacity: 0.5;
    }
    100% {
        transform: perspective(600px) rotateX(0deg);
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
StoryBuilder (root)
    ↓
    ├─→ useThemes() ──→ localStorage (thèmes)
    │       ↓
    │   ThemeSelector
    │       ↓
    │   ThemeEditor
    │       ↓
    │   ThemeImportExport ✨ NOUVEAU
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
    │   └─ ExportButton ──→ Canvas API
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
6. StoryBand re-render avec nouveau activeIndex
7. BandSegment remonte (key change) → animation CSS
```

### Import/Export de thème ✨ NOUVEAU

**Flux d'export** :

```
1. User clique sur bouton "Import/Export"
2. StoryBuilder affiche ThemeImportExport
3. User clique sur "Exporter"
4. ThemeImportExport → exportThemeToMarkdown(currentTheme)
5. Génération du contenu Markdown
6. downloadThemeAsMarkdown() → Téléchargement fichier .md
7. User reçoit le fichier sur son ordinateur
```

**Flux d'import** :

```
1. User clique sur "Sélectionner un fichier"
2. User choisit un fichier .md ou .txt
3. ThemeImportExport → importThemeFile(file)
4. Détection automatique du format
5. Parse du contenu (parseMarkdownTheme ou parseLegacyTxtTheme)
6. Validation du thème (validateTheme)
7. Vérification des conflits (checkThemeNameConflict)
8a. Si conflit → Affichage dialogue de résolution
8b. Si pas de conflit → Sauvegarde directe
9. saveCustomTheme() → localStorage
10. reloadCustomThemes() → Mise à jour de la liste
11. changeTheme() → Sélection du nouveau thème
```

**Résolution de conflits** :

```
1. Conflit détecté (nom identique)
2. Affichage du dialogue avec 2 options :

   Option A : Renommer
   ├─ Génération nom unique (generateUniqueName)
   ├─ User peut modifier le nom proposé
   └─ Sauvegarde avec nouveau nom

   Option B : Remplacer
   ├─ Récupération de l'ancien thème
   ├─ Remplacement avec même ID
   └─ Sauvegarde écrase l'ancien

3. Confirmation et fermeture du dialogue
4. Message de succès à l'utilisateur
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
        port: 3000,
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

### 5. Composants purs et idempotents

- Pas d'effets de bord dans le render
- Résultat prévisible pour des props identiques
- Logique métier dans les hooks

### 6. Gestion des fichiers ✨ NOUVEAU

✅ **Bonnes pratiques pour File API** :

```javascript
// Utiliser async/await pour file.text()
const content = await file.text();

// Réinitialiser l'input après traitement
event.target.value = "";

// Créer des Blobs avec type MIME correct
const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });

// Nettoyer les URLs d'objets
URL.revokeObjectURL(url);
```

---

## 🧪 Guide de test

### Tests manuels essentiels

#### 1. Rotation des bandes

- [ ] Clic sur chaque bande fait défiler le segment
- [ ] Touche Entrée/Espace fait défiler
- [ ] Animation flip visible à chaque changement
- [ ] Indicateur de position se met à jour (ex: 2/6)

#### 2. Changement de nombre de bandes

- [ ] Sélecteur 2/3/4/5 fonctionne
- [ ] Les bandes s'ajoutent/retirent correctement
- [ ] La phrase se met à jour immédiatement
- [ ] Le point final reste sur la dernière bande

#### 3. Génération aléatoire

- [ ] Bouton "Surprise" change tous les segments
- [ ] Résultat différent à chaque clic
- [ ] Animation visible sur toutes les bandes

#### 4. Thèmes

- [ ] Menu déroulant affiche tous les thèmes
- [ ] Changement de thème met à jour le contenu
- [ ] Thème actuel correctement indiqué
- [ ] Création de nouveau thème fonctionne

#### 5. Éditeur de thèmes

- [ ] Formulaire de création accessible
- [ ] Validation empêche sauvegarde si erreurs
- [ ] Ajout/suppression de segments fonctionne
- [ ] Icônes suggérées cliquables
- [ ] Thème personnalisé apparaît dans la liste

#### 6. Import/Export de thèmes ✨ NOUVEAU

**Export** :

- [ ] Bouton "Import/Export" visible et accessible
- [ ] Export désactivé pour thèmes prédéfinis
- [ ] Export activé pour thèmes personnalisés
- [ ] Fichier .md téléchargé avec bon nom
- [ ] Contenu Markdown valide et complet
- [ ] Métadonnées correctes (nom, icône, description)
- [ ] Toutes les bandes et segments présents

**Import Markdown** :

- [ ] Sélection de fichier .md fonctionne
- [ ] Parse correctement un fichier valide
- [ ] Message de succès affiché
- [ ] Thème apparaît dans la liste
- [ ] Thème automatiquement sélectionné
- [ ] Erreur affichée si fichier invalide
- [ ] Détection des segments manquants
- [ ] Validation du front matter YAML

**Import TXT legacy** :

- [ ] Sélection de fichier .txt fonctionne
- [ ] Parse ancien format MPFH correctement
- [ ] Conversion en 3 bandes minimum
- [ ] Métadonnées par défaut générées
- [ ] Message indiquant format legacy
- [ ] Compatibilité ascendante préservée

**Gestion des conflits** :

- [ ] Détection de nom en doublon
- [ ] Dialogue de résolution affiché
- [ ] Option "Renommer" avec nom suggéré
- [ ] Modification du nom suggéré possible
- [ ] Import avec nouveau nom fonctionne
- [ ] Option "Remplacer" affiche avertissement
- [ ] Remplacement écrase bien l'ancien thème
- [ ] Annulation retourne à l'état initial
- [ ] Génération de noms uniques (suffixes numériques)

**Validation** :

- [ ] Fichier sans front matter rejeté
- [ ] Fichier sans bandes rejeté
- [ ] Bandes avec <2 segments rejetées
- [ ] Messages d'erreur explicites
- [ ] Validation ne casse pas l'interface

#### 7. Favoris

- [ ] Bouton étoile sauvegarde l'histoire
- [ ] Feedback visuel "Sauvegardée !"
- [ ] Liste des favoris affichable
- [ ] Chargement d'un favori restaure l'état
- [ ] Suppression fonctionne

#### 8. Export PNG

- [ ] Export génère une image
- [ ] Nom de fichier contient la date
- [ ] Image contient titre + phrase complète
- [ ] Découpage multi-lignes si phrase longue
- [ ] Signature "micetf.fr" présente

#### 9. Mode plein écran

- [ ] Bouton disponible (si API supportée)
- [ ] Passage en plein écran fonctionne
- [ ] Sortie avec Échap fonctionne
- [ ] Icône change selon l'état

#### 10. Persistance localStorage

- [ ] Thèmes personnalisés conservés après F5
- [ ] Thèmes importés conservés après F5
- [ ] Favoris conservés après F5
- [ ] Dernier thème utilisé restauré au lancement

#### 11. Responsive

- [ ] Layout adapté sur mobile (320px)
- [ ] Layout adapté sur tablette (768px)
- [ ] Layout adapté sur desktop (1024px+)
- [ ] Texte lisible à toutes les tailles
- [ ] Boutons accessibles au doigt

#### 12. Tests avancés Import/Export ✨

**Round-trip** :

- [ ] Exporter un thème puis le réimporter
- [ ] Données identiques après round-trip
- [ ] Pas de perte d'information

**Édition manuelle Markdown** :

- [ ] Créer un .md manuellement
- [ ] Import d'un fichier créé à la main
- [ ] Tolérance aux variations de format
- [ ] Espaces/indentation tolérés

**Cas limites** :

- [ ] Fichier vide
- [ ] Fichier avec caractères spéciaux
- [ ] Fichier très long (>100 segments)
- [ ] Accents et emojis dans le contenu
- [ ] Noms avec caractères Unicode

---

## 🐛 Problèmes connus et limitations

### Limitations actuelles

1. **Pas de mode collaboratif** : Un seul utilisateur à la fois
2. **Pas de sauvegarde cloud** : Données uniquement en local
3. **Pas d'historique d'annulation** : Impossible de revenir en arrière
4. **Pas d'impression directe** : Export PNG uniquement
5. **Pas de sons** : Pas de feedback audio
6. **Pas de mode sombre** : Thème clair uniquement
7. **Parser YAML simplifié** ✨ : Supporte uniquement les métadonnées basiques (clé:valeur)

### Bugs potentiels à surveiller

1. **localStorage plein** : Peut causer des erreurs de sauvegarde

    - Solution : Limiter à 50 favoris, ajouter gestion d'erreur

2. **API Fullscreen non supportée** : Sur anciens navigateurs

    - Solution : Bouton masqué si API absente

3. **Export PNG sur Safari iOS** : Peut échouer

    - Solution : Utiliser blob + download attribute

4. **Animation saccadée** : Si trop de bandes ou segments

    - Solution : Limiter à 5 bandes, 12 segments max

5. **Import de fichiers volumineux** ✨ : Peut bloquer l'interface

    - Solution actuelle : Pas de limite implémentée
    - Solution future : Ajouter vérification de taille (max 1MB)

6. **Encodage non-UTF8** ✨ : Peut causer des erreurs de lecture
    - Solution : Documenter l'exigence UTF-8
    - Les navigateurs modernes gèrent généralement UTF-8 par défaut

---

## 🚀 Roadmap et évolutions futures

### Priorité 1 : Import/Export amélioré ✨

- [x] Export au format Markdown
- [x] Import Markdown avec validation
- [x] Rétrocompatibilité ancien format TXT
- [x] Gestion des conflits de noms
- [ ] **Parser YAML complet** : Intégrer bibliothèque `js-yaml` pour métadonnées avancées
- [ ] **Validation stricte** : Schéma JSON pour valider les thèmes
- [ ] **Prévisualisation avant import** : Afficher le thème avant de l'importer
- [ ] **Import par URL** : Importer depuis un lien web
- [ ] **Batch import** : Importer plusieurs thèmes à la fois
- [ ] **Export multi-thèmes** : Exporter plusieurs thèmes en un seul fichier

### Priorité 2 : Partage et collaboration

- [ ] **Hub de thèmes** : Plateforme de partage communautaire
- [ ] **QR Code** : Générer QR code pour partage rapide
- [ ] **Export vers Google Drive** : Intégration Google Drive API
- [ ] **Versioning des thèmes** : Historique des modifications
- [ ] **Commentaires et notes** : Ajouter des annotations aux thèmes
- [ ] **Catégories et tags** : Organiser les thèmes par niveau/matière

### Priorité 3 : Améliorations UX

- [ ] **Sons optionnels** : Clic, rotation, génération aléatoire
- [ ] **Confettis** : Animation lors de la génération aléatoire
- [ ] **Animation 3D avancée** : Bandes cylindriques 3D
- [ ] **Mode sombre** : Thème sombre avec switch
- [ ] **Partage direct** : Email, réseaux sociaux, QR code
- [ ] **Templates de thèmes** : Modèles prêts à personnaliser

### Priorité 4 : Fonctionnalités avancées

- [ ] **Historique d'annulation** : Ctrl+Z / Ctrl+Y
- [ ] **Mode collaboratif** : Plusieurs utilisateurs en temps réel
- [ ] **Impression PDF** : Export multi-histoires
- [ ] **Statistiques** : Compteur de phrases générées
- [ ] **Défis quotidiens** : Phrase imposée à compléter
- [ ] **Mode enseignant** : Tableau de bord avec analytics

### Priorité 5 : Accessibilité

- [ ] **Support lecteur d'écran** : ARIA labels complets
- [ ] **Navigation clavier avancée** : Tab, flèches, raccourcis
- [ ] **Contraste amélioré** : Respect WCAG 2.1 AAA
- [ ] **Taille de texte ajustable** : Zoom sans casse du layout
- [ ] **Support dyslexie** : Police OpenDyslexic optionnelle

### Priorité 6 : Performance

- [ ] **Lazy loading** : Chargement différé des modales
- [ ] **Code splitting** : Découpage des bundles
- [ ] **Service Worker** : Mode offline (PWA)
- [ ] **IndexedDB** : Alternative à localStorage pour gros volumes
- [ ] **Optimisation images** : WebP, compression
- [ ] **Compression des exports** : ZIP pour multi-thèmes

---

## 📚 Ressources et références

### Documentation officielle

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [MDN Web APIs](https://developer.mozilla.org/en-US/docs/Web/API)
- [File API](https://developer.mozilla.org/en-US/docs/Web/API/File)
- [Blob API](https://developer.mozilla.org/en-US/docs/Web/API/Blob)

### Markdown et YAML

- [Markdown Guide](https://www.markdownguide.org/)
- [YAML Specification](https://yaml.org/)
- [Front Matter](https://jekyllrb.com/docs/front-matter/)

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
2. **PropTypes** : Validation systématique
3. **JSDoc** : Documentation des fonctions complexes
4. **Nommage** : camelCase pour variables/fonctions, PascalCase pour composants
5. **Indentation** : 2 espaces (config Prettier)

---

## 📞 Support et contact

### Pour les enseignants

- Site principal : [https://micetf.fr](https://micetf.fr)
- Email : webmaster@micetf.fr
- Tutoriels vidéo : Chaîne YouTube MiCetF
- **Guide Import/Export** ✨ : Voir `docs/GUIDE-IMPORT-EXPORT.md`
- **Exemple de thème** ✨ : Voir `docs/exemple-theme-pirates.md`

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
| **Front matter**        | ✨ Métadonnées YAML au début d'un fichier Markdown              |
| **Markdown**            | ✨ Langage de balisage léger pour formater du texte             |
| **Parser**              | ✨ Analyseur syntaxique qui transforme du texte en structure    |
| **Blob**                | ✨ Objet JavaScript représentant des données binaires brutes    |
| **MIME type**           | ✨ Identifiant du type de contenu d'un fichier                  |
| **Round-trip**          | ✨ Export puis import pour tester la conservation des données   |

---

## 📊 Métriques du projet

### Statistiques actuelles

- **Composants React** : 16 (+1) ✨
- **Hooks personnalisés** : 2
- **Modules utilitaires** : 2 (+1) ✨
- **Thèmes prédéfinis** : 6
- **Lignes de code** : ~3200 (+700) ✨
- **Taille du bundle** : ~160 KB (gzipped) (+10 KB) ✨
- **Temps de build** : ~5 secondes
- **Compatibilité navigateurs** : Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

### Combinaisons possibles

Avec les thèmes par défaut (6 segments/bande) :

| Bandes | Combinaisons | Formule |
| ------ | ------------ | ------- |
| 2      | 36           | 6²      |
| 3      | 216          | 6³      |
| 4      | 1 296        | 6⁴      |
| 5      | 7 776        | 6⁵      |

### Formats supportés ✨ NOUVEAU

| Format   | Extension | Support      | Direction     |
| -------- | --------- | ------------ | ------------- |
| Markdown | .md       | Complet      | Import/Export |
| TXT      | .txt      | Legacy       | Import seul   |
| JSON     | .json     | localStorage | Interne       |
| PNG      | .png      | Image        | Export phrase |

---

## 🔐 Sécurité et bonnes pratiques

### Validation des entrées ✨

- **Sanitization des noms de fichiers** : Caractères interdits retirés
- **Validation MIME types** : Vérification des extensions
- **Taille maximale** : Pas de limite actuellement (à implémenter)
- **Injection de code** : Pas de `eval()` ou `innerHTML` avec données utilisateur

### Données sensibles

- **Pas de données personnelles** : Aucune collecte d'informations utilisateur
- **localStorage uniquement** : Pas de transmission réseau
- **Thèmes publics** : Attention au partage de contenus inappropriés

### Recommandations

1. **Ne pas inclure** dans les thèmes :

    - Informations personnelles
    - Contenus offensants ou inappropriés
    - Données confidentielles

2. **Vérifier** les thèmes importés :
    - Source fiable
    - Contenu adapté à l'âge des élèves
    - Qualité linguistique

---

**Document généré le** : 2026-02-07  
**Version de l'application** : 1.1.0 ✨  
**Dernière mise à jour** : Ajout de l'import/export de thèmes  
**Auteur** : MiCetF - Frédéric MISERY

---

🎉 **Merci d'avoir lu cette documentation !**

Pour toute question, n'hésitez pas à contacter l'équipe de développement.
