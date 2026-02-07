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
| **React**        | 19.2.0  | Framework UI                |
| **Vite**         | 7.2.4   | Build tool & dev server     |
| **Tailwind CSS** | 3.4.3   | Framework CSS utility-first |
| **pnpm**         | Latest  | Gestionnaire de packages    |
| **PropTypes**    | 15.8.1  | Validation des props        |

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
│   │   │   ├── ExportThemeButton.jsx        ⭐ NOUVEAU
│   │   │   └── index.js
│   │   ├── ThemeSelector/    # Sélecteur de thèmes
│   │   │   ├── ThemeSelector.jsx
│   │   │   └── index.js
│   │   ├── ThemeEditor/      # Éditeur de thèmes
│   │   │   ├── ThemeEditor.jsx
│   │   │   ├── BandEditor.jsx
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
│   │   └── generateStandaloneHTML.js        ⭐ NOUVEAU
│   ├── App.jsx               # Composant racine
│   ├── main.jsx              # Point d'entrée
│   └── index.css             # Styles globaux + animations
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
- Gestion des thèmes (sélection, création)
- Gestion des favoris
- Coordination entre les sous-composants

**Props** : Aucune (composant racine)

**État local** :

```javascript
const [showThemeEditor, setShowThemeEditor] = useState(false);
const [showFavorites, setShowFavorites] = useState(false);
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

### 6. Controls (Boutons d'action)

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

#### ⭐ ExportThemeButton (NOUVEAU)

**Fichier** : `src/components/Controls/ExportThemeButton.jsx`

**Ajouté le** : 2026-02-07

**Responsabilités** :

- Exporte le thème actuel en fichier HTML standalone
- Génère un fichier 100% offline fonctionnel
- Nom de fichier automatique basé sur le nom du thème

**Props** :

```javascript
ExportThemeButton.propTypes = {
    theme: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        bands: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
            .isRequired,
    }).isRequired,
    disabled: PropTypes.bool,
};
```

**Comportement** :

1. Génère un fichier HTML complet avec CSS et JS inline
2. Crée un nom de fichier slug (ex: "Les Dinosaures" → "theme-les-dinosaures.html")
3. Télécharge le fichier (~150-200 KB)
4. Affiche un feedback visuel pendant la génération

**Cas d'usage** :

- Enseignant crée un thème et l'exporte pour utilisation offline
- Partage du fichier HTML sur clé USB ou par email
- Utilisation en classe sans connexion Internet stable
- TBI en mode plein écran sans risque de coupure réseau

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

## ⭐ Système d'export HTML standalone (NOUVEAU)

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
            /* Contient uniquement les classes utilisées */
        </style>
    </head>
    <body>
        <div id="root"></div>
        <script>
            // Données du thème en JSON échappé
            const THEME_DATA = {...};

            // Application vanilla JavaScript
            class StoryBandApp {
              rotateBand(bandIndex) { ... }
              randomize() { ... }
              changeBandCount(count) { ... }
              exportAsImage() { ... }
              getCurrentSentence() { ... }
              render() { ... }
            }
        </script>
    </body>
</html>
```

### Fonctionnalités du fichier exporté

✅ **Incluses** :

- Rotation des bandes (clic + clavier Enter/Espace)
- Aperçu de la phrase complète avec ponctuation
- Génération aléatoire
- Sélecteur de nombre de bandes (2-5)
- Export PNG de la phrase
- Animations CSS (flip, rotation)
- Responsive design

❌ **Exclues** :

- Sauvegarde de favoris
- Création/modification de thème
- Sélection d'autres thèmes
- Connexion Internet requise

### CSS Tailwind optimisé

Le CSS embarqué contient **uniquement les classes utilisées** :

**Taille** : ~15 KB (vs 3.5 MB Tailwind complet)

**Classes incluses** :

- Layout, spacing, typography
- Palette de couleurs (blue/green/yellow/pink/purple/indigo/gray)
- Effects, responsive, states
- Animations personnalisées

### Sécurité - Échappement XSS

```javascript
const themeDataJSON = JSON.stringify(theme)
    .replace(/</g, "\\u003c") // Échapper <
    .replace(/>/g, "\\u003e") // Échapper >
    .replace(/&/g, "\\u0026"); // Échapper &
```

### Performance

| Métrique            | Valeur                                        |
| ------------------- | --------------------------------------------- |
| Taille fichier      | 150-200 KB                                    |
| Temps de génération | < 200 ms                                      |
| CSS optimisé        | ~15 KB                                        |
| Compatible          | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ |

### Cas d'usage pédagogiques

#### Scénario 1 : Classe sans Internet

1. Enseignant crée le thème sur PC connecté
2. Exporte en HTML
3. Copie sur clé USB
4. Distribue aux élèves

#### Scénario 2 : TBI en classe

1. Exporte le thème
2. Ouvre en plein écran (F11)
3. Utilise pendant la séance
4. Pas de risque de coupure

#### Scénario 3 : Devoirs à la maison

1. Partage le fichier par email
2. Élèves créent des histoires
3. Exportent en PNG
4. Renvoient par email

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
    │   └─ ExportThemeButton ──→ generateStandaloneHTML ⭐ NOUVEAU
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

### ⭐ Export de thème (NOUVEAU)

```
1. User clique sur ExportThemeButton
2. ExportThemeButton appelle generateStandaloneHTML(theme)
3. generateStandaloneHTML :
   a. Échappe les données JSON du thème
   b. Génère le HTML avec CSS inline
   c. Crée l'application JavaScript vanilla
   d. Retourne la string HTML complète
4. ExportThemeButton crée le nom de fichier (slug)
5. downloadHTMLFile télécharge le fichier
6. Feedback visuel (spinner → succès)
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

#### 6. Favoris

- [ ] Bouton étoile sauvegarde l'histoire
- [ ] Feedback visuel "Sauvegardée !"
- [ ] Liste des favoris affichable
- [ ] Chargement d'un favori restaure l'état
- [ ] Suppression fonctionne

#### 7. Export PNG

- [ ] Export génère une image
- [ ] Nom de fichier contient la date
- [ ] Image contient titre + phrase complète
- [ ] Découpage multi-lignes si phrase longue
- [ ] Signature "micetf.fr" présente

#### 8. ⭐ Export HTML standalone (NOUVEAU)

- [ ] Bouton "Exporter thème HTML" visible
- [ ] Fichier HTML se télécharge (~150-200 KB)
- [ ] Nom de fichier correct (slug du thème)
- [ ] **Déconnecter Internet**
- [ ] Ouvrir le fichier HTML téléchargé
- [ ] Toutes les fonctionnalités marchent offline :
    - [ ] Rotation des bandes
    - [ ] Génération aléatoire
    - [ ] Changement nombre de bandes
    - [ ] Export PNG
- [ ] Animations CSS fonctionnent
- [ ] Responsive design OK
- [ ] Pas d'erreur console

#### 9. Mode plein écran

- [ ] Bouton disponible (si API supportée)
- [ ] Passage en plein écran fonctionne
- [ ] Sortie avec Échap fonctionne
- [ ] Icône change selon l'état

#### 10. Persistance localStorage

- [ ] Thèmes personnalisés conservés après F5
- [ ] Favoris conservés après F5
- [ ] Dernier thème utilisé restauré au lancement

#### 11. Responsive

- [ ] Layout adapté sur mobile (320px)
- [ ] Layout adapté sur tablette (768px)
- [ ] Layout adapté sur desktop (1024px+)
- [ ] Texte lisible à toutes les tailles
- [ ] Boutons accessibles au doigt

---

## 🐛 Problèmes connus et limitations

### Limitations actuelles

1. **Pas de mode collaboratif** : Un seul utilisateur à la fois
2. **Pas de sauvegarde cloud** : Données uniquement en local
3. **Pas d'historique d'annulation** : Impossible de revenir en arrière
4. **Pas d'impression directe** : Export PNG uniquement
5. **Pas de sons** : Pas de feedback audio
6. **Pas de mode sombre** : Thème clair uniquement

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

---

## 🚀 Roadmap et évolutions futures

### Priorité 1 : Export HTML (✅ TERMINÉ - 2026-02-07)

- [x] Génération fichier HTML standalone
- [x] CSS Tailwind optimisé embarqué
- [x] Application JavaScript vanilla
- [x] Export PNG dans le fichier standalone
- [x] 100% offline

### Priorité 2 : Améliorations export HTML

- [ ] Notification toast après export réussi
- [ ] Option pour personnaliser le nom du fichier
- [ ] Prévisualisation avant export
- [ ] Export de plusieurs thèmes dans un seul HTML

### Priorité 3 : Améliorations UX

- [ ] **Sons optionnels** : Clic, rotation, génération aléatoire
- [ ] **Confettis** : Animation lors de la génération aléatoire
- [ ] **Animation 3D avancée** : Bandes cylindriques 3D
- [ ] **Mode sombre** : Thème sombre avec switch
- [ ] **Partage direct** : Email, réseaux sociaux, QR code

### Priorité 4 : Fonctionnalités avancées

- [ ] **Import/Export de thèmes** : Fichiers JSON
- [ ] **Galerie de thèmes** : Partage communautaire
- [ ] **Historique d'annulation** : Ctrl+Z / Ctrl+Y
- [ ] **Mode collaboratif** : Plusieurs utilisateurs en temps réel
- [ ] **Impression PDF** : Export multi-histoires
- [ ] **Statistiques** : Compteur de phrases générées
- [ ] **Défis quotidiens** : Phrase imposée à compléter

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
- [ ] **IndexedDB** : Alternative à localStorage
- [ ] **Optimisation images** : WebP, compression

---

## 📚 Ressources et références

### Documentation officielle

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [MDN Web APIs](https://developer.mozilla.org/en-US/docs/Web/API)

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

---

## 📊 Métriques du projet

### Statistiques actuelles

- **Composants React** : 16 (+ ExportThemeButton)
- **Hooks personnalisés** : 2
- **Utilitaires** : 2 (+ generateStandaloneHTML)
- **Thèmes prédéfinis** : 6
- **Lignes de code** : ~3200
- **Taille du bundle** : ~150 KB (gzipped)
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

---

## 📝 Changelog

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

**🐛 Corrections**

- Aucune correction dans cette version (nouvelle fonctionnalité uniquement)

### Version 1.0.0 - 2026-01-XX

- Version initiale de la Fabrique à Histoires
- 6 thèmes prédéfinis
- Système de favoris
- Éditeur de thèmes personnalisés
- Export PNG des phrases
- Mode plein écran

---

**Document généré le** : 2026-02-07  
**Version de l'application** : 1.1.0  
**Auteur** : MiCetF - Frédéric MISERY  
**Dernière mise à jour** : 2026-02-07

---

🎉 **Merci d'avoir lu cette documentation !**

Pour toute question, n'hésitez pas à contacter l'équipe de développement.
