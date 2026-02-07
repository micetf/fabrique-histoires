/**
 * Module d'import/export de thèmes
 * Supporte les formats Markdown (.md) et l'ancien format TXT
 */

/**
 * Exporte un thème au format Markdown
 * @param {Object} theme - Le thème à exporter
 * @returns {string} Contenu Markdown
 */
export const exportThemeToMarkdown = (theme) => {
    // Front matter YAML
    const frontMatter = `---
name: ${theme.name}
icon: ${theme.icon}
description: ${theme.description || ""}
---
`;

    // Titres par défaut pour les bandes
    const bandTitles = [
        "Personnages",
        "Actions",
        "Objets",
        "Lieux",
        "Circonstances",
    ];

    // Générer les sections de bandes
    const bandsSections = theme.bands
        .map((band, index) => {
            const title = bandTitles[index] || `Bande ${index + 1}`;
            const segments = band.map((segment) => `- ${segment}`).join("\n");
            return `## Bande ${index + 1} : ${title}\n${segments}`;
        })
        .join("\n\n");

    return frontMatter + "\n" + bandsSections;
};

/**
 * Télécharge un thème en tant que fichier .md
 * @param {Object} theme - Le thème à télécharger
 */
export const downloadThemeAsMarkdown = (theme) => {
    const content = exportThemeToMarkdown(theme);
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    const filename = `${sanitizeFilename(theme.name)}.md`;
    link.download = filename;
    link.href = url;
    link.click();

    URL.revokeObjectURL(url);
};

/**
 * Parse un fichier Markdown et retourne un objet thème
 * @param {string} markdownContent - Contenu du fichier .md
 * @returns {Object|null} Objet thème ou null si erreur
 */
export const parseMarkdownTheme = (markdownContent) => {
    try {
        // Extraire le front matter YAML
        const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
        const frontMatterMatch = markdownContent.match(frontMatterRegex);

        if (!frontMatterMatch) {
            throw new Error("Front matter YAML manquant");
        }

        // Parser le YAML (simple, ne supporte que les cas basiques)
        const yamlContent = frontMatterMatch[1];
        const metadata = {};
        yamlContent.split("\n").forEach((line) => {
            const [key, ...valueParts] = line.split(":");
            if (key && valueParts.length > 0) {
                metadata[key.trim()] = valueParts.join(":").trim();
            }
        });

        // Extraire le contenu après le front matter
        const content = markdownContent.replace(frontMatterRegex, "");

        // Extraire les bandes (sections ## Bande X)
        const bandRegex = /## Bande \d+ : [^\n]+\n((?:- [^\n]+\n?)+)/g;
        const bands = [];
        let match;

        while ((match = bandRegex.exec(content)) !== null) {
            const segmentsText = match[1];
            const segments = segmentsText
                .split("\n")
                .filter((line) => line.trim().startsWith("-"))
                .map((line) => line.replace(/^-\s*/, "").trim())
                .filter(Boolean);

            bands.push(segments);
        }

        // Validation
        if (!metadata.name || bands.length === 0) {
            throw new Error("Thème invalide : nom ou bandes manquants");
        }

        // Validation des bandes
        for (let i = 0; i < bands.length; i++) {
            if (bands[i].length < 2) {
                throw new Error(
                    `Bande ${i + 1} doit contenir au moins 2 segments`
                );
            }
        }

        return {
            name: metadata.name,
            icon: metadata.icon || "🎨",
            description: metadata.description || "",
            bands: bands,
            isCustom: true,
        };
    } catch (error) {
        console.error("Erreur parsing Markdown:", error);
        return null;
    }
};

/**
 * Parse l'ancien format TXT (projet.txt)
 * @param {string} txtContent - Contenu du fichier .txt
 * @returns {Object|null} Objet thème ou null si erreur
 */
export const parseLegacyTxtTheme = (txtContent) => {
    try {
        // Vérifier les marqueurs MPFH
        if (!txtContent.startsWith("MPFH") || !txtContent.endsWith("MPFH")) {
            throw new Error("Format TXT invalide : marqueurs MPFH manquants");
        }

        // Extraire le contenu entre les marqueurs
        const content = txtContent.slice(4, -4);

        // Parser les phrases (divs)
        const phraseRegex = /<div class="phrase">(.*?)<\/div>/g;
        const bands = [[], [], []]; // 3 bandes dans l'ancien format
        let match;

        while ((match = phraseRegex.exec(content)) !== null) {
            const phraseContent = match[1];

            // Extraire les inputs de chaque bande
            const input1Match = phraseContent.match(
                /class="bande1" value="([^"]+)"/
            );
            const input2Match = phraseContent.match(
                /class="bande2" value="([^"]+)"/
            );
            const input3Match = phraseContent.match(
                /class="bande3" value="([^"]+)"/
            );

            if (input1Match) bands[0].push(input1Match[1]);
            if (input2Match) bands[1].push(input2Match[1]);
            if (input3Match) bands[2].push(input3Match[1]);
        }

        // Validation
        if (bands.every((band) => band.length === 0)) {
            throw new Error("Aucune donnée valide trouvée");
        }

        // Compléter avec des bandes vides si nécessaire (minimum 3)
        while (bands.length < 3) {
            bands.push([""]);
        }

        return {
            name: "Thème importé (TXT)",
            icon: "📄",
            description: "Thème importé depuis l'ancien format",
            bands: bands,
            isCustom: true,
        };
    } catch (error) {
        console.error("Erreur parsing TXT legacy:", error);
        return null;
    }
};

/**
 * Importe un fichier thème (détecte automatiquement le format)
 * @param {File} file - Fichier à importer
 * @returns {Promise<Object|null>} Objet thème ou null si erreur
 */
export const importThemeFile = async (file) => {
    try {
        const content = await file.text();
        const extension = file.name.split(".").pop().toLowerCase();

        let theme = null;

        if (extension === "md") {
            theme = parseMarkdownTheme(content);
        } else if (extension === "txt") {
            theme = parseLegacyTxtTheme(content);
        } else {
            // Tentative de détection automatique
            if (content.startsWith("MPFH")) {
                theme = parseLegacyTxtTheme(content);
            } else if (content.startsWith("---")) {
                theme = parseMarkdownTheme(content);
            } else {
                throw new Error("Format de fichier non reconnu");
            }
        }

        if (!theme) {
            throw new Error("Impossible de parser le fichier");
        }

        // Générer un ID unique
        theme.id = `imported_${Date.now()}`;

        return theme;
    } catch (error) {
        console.error("Erreur import fichier:", error);
        return null;
    }
};

/**
 * Vérifie si un thème avec le même nom existe déjà
 * @param {string} themeName - Nom du thème à vérifier
 * @param {Array} existingThemes - Liste des thèmes existants
 * @returns {boolean} true si le nom existe déjà
 */
export const checkThemeNameConflict = (themeName, existingThemes) => {
    return existingThemes.some(
        (theme) => theme.name.toLowerCase() === themeName.toLowerCase()
    );
};

/**
 * Génère un nom unique en ajoutant un suffixe numérique
 * @param {string} baseName - Nom de base
 * @param {Array} existingThemes - Liste des thèmes existants
 * @returns {string} Nom unique
 */
export const generateUniqueName = (baseName, existingThemes) => {
    let name = baseName;
    let counter = 1;

    while (checkThemeNameConflict(name, existingThemes)) {
        name = `${baseName} (${counter})`;
        counter++;
    }

    return name;
};

/**
 * Sanitize un nom de fichier (retire les caractères interdits)
 * @param {string} filename - Nom à nettoyer
 * @returns {string} Nom nettoyé
 */
const sanitizeFilename = (filename) => {
    return filename
        .replace(/[<>:"/\\|?*]/g, "") // Caractères interdits Windows
        .replace(/\s+/g, "_") // Espaces -> underscores
        .substring(0, 100); // Limite de longueur
};

/**
 * Valide un objet thème
 * @param {Object} theme - Thème à valider
 * @returns {Object} { valid: boolean, errors: string[] }
 */
export const validateTheme = (theme) => {
    const errors = [];

    if (!theme) {
        return { valid: false, errors: ["Thème null ou undefined"] };
    }

    if (!theme.name || theme.name.trim().length === 0) {
        errors.push("Le nom du thème est requis");
    }

    if (!theme.bands || !Array.isArray(theme.bands)) {
        errors.push("Les bandes doivent être un tableau");
    } else {
        if (theme.bands.length < 2) {
            errors.push("Le thème doit contenir au moins 2 bandes");
        }

        theme.bands.forEach((band, index) => {
            if (!Array.isArray(band)) {
                errors.push(`Bande ${index + 1} invalide`);
            } else if (band.length < 2) {
                errors.push(
                    `Bande ${index + 1} doit contenir au moins 2 segments`
                );
            }
        });
    }

    return {
        valid: errors.length === 0,
        errors,
    };
};
