/**
 * Bibliothèque de thèmes prédéfinis pour la Fabrique à Histoires
 * Chaque thème contient 5 bandes avec 6 segments minimum
 * La ponctuation finale est ajoutée automatiquement
 *
 * Structure grammaticale respectée :
 * - Bande 1 : Groupe nominal sujet (qui ?)
 * - Bande 2 : Verbe transitif (fait quoi ?)
 * - Bande 3 : Complément d'objet direct (quoi ?)
 * - Bande 4 : Complément circonstanciel de lieu (où ?)
 * - Bande 5 : Complément circonstanciel ou proposition finale (quand/comment/pourquoi ?)
 */

export const themes = {
    default: {
        id: "default",
        name: "Classique",
        icon: "🎨",
        description: "Le thème original avec des histoires variées",
        bands: [
            [
                "Le petit chat",
                "La souris verte",
                "Un gentil dragon",
                "Une princesse courageuse",
                "Le robot rigolo",
                "Un astronaute curieux",
            ],
            [
                "mange",
                "poursuit",
                "rencontre",
                "cherche",
                "découvre",
                "imagine",
            ],
            [
                "une grosse pomme rouge",
                "son meilleur ami",
                "un trésor caché",
                "une étoile filante",
                "un gâteau magique",
                "une carte mystérieuse",
            ],
            [
                "dans la forêt enchantée",
                "sur la Lune",
                "sous l'océan",
                "au pays des bonbons",
                "dans un château volant",
                "au sommet d'une montagne",
            ],
            [
                "pour sauver le monde",
                "avant le coucher du soleil",
                "avec l'aide d'un perroquet",
                "et trouve un ami surprise",
                "sous les applaudissements",
                "pour devenir un héros",
            ],
        ],
    },

    animaux: {
        id: "animaux",
        name: "Animaux",
        icon: "🦁",
        description: "Histoires d'animaux de la ferme et de la forêt",
        bands: [
            [
                "Le lion majestueux",
                "La petite grenouille",
                "Un éléphant sage",
                "Le renard rusé",
                "La tortue patiente",
                "Le papillon coloré",
            ],
            ["observe", "poursuit", "cherche", "rencontre", "regarde", "guide"],
            [
                "une coccinelle rouge",
                "un poisson argenté",
                "une libellule bleue",
                "son reflet dans l'eau",
                "un scarabée doré",
                "une fourmi travailleuse",
            ],
            [
                "près du lac",
                "dans la rivière",
                "sur un rocher",
                "entre les arbres",
                "sous les feuilles",
                "au bord du sentier",
            ],
            [
                "pendant l'orage",
                "au lever du soleil",
                "avant la tombée de la nuit",
                "sous la pluie fine",
                "en plein été",
                "par une nuit étoilée",
            ],
        ],
    },

    ecole: {
        id: "ecole",
        name: "À l'école",
        icon: "🎒",
        description: "La vie à l'école et les apprentissages",
        bands: [
            [
                "La maîtresse",
                "Les élèves de CE1",
                "Le directeur",
                "Mon copain Jules",
                "Ma copine Léa",
                "Nos camarades",
            ],
            ["dessine", "écrit", "lit", "chante", "apprend", "présente"],
            [
                "une belle histoire",
                "un poème rigolo",
                "les lettres de l'alphabet",
                "une chanson douce",
                "un projet artistique",
                "une expérience scientifique",
            ],
            [
                "dans la classe",
                "à la bibliothèque",
                "dans la cour",
                "à la cantine",
                "en salle informatique",
                "dans le gymnase",
            ],
            [
                "et tout le monde applaudit",
                "pour la fête de l'école",
                "avec beaucoup de plaisir",
                "et gagne une étoile",
                "devant tous ses camarades",
                "en s'amusant beaucoup",
            ],
        ],
    },

    vacances: {
        id: "vacances",
        name: "Vacances",
        icon: "🏖️",
        description: "Aventures pendant les vacances",
        bands: [
            [
                "Toute la famille",
                "Mamie et papi",
                "Mon cousin",
                "Ma petite sœur",
                "Mon grand frère",
                "Mes parents",
            ],
            [
                "visitent",
                "découvrent",
                "explorent",
                "admirent",
                "photographient",
                "parcourent",
            ],
            [
                "la mer bleue",
                "une grande montagne",
                "un musée passionnant",
                "un parc d'attractions",
                "un château fort",
                "une grotte mystérieuse",
            ],
            [
                "pendant l'été",
                "en automne",
                "sous le soleil",
                "par beau temps",
                "en fin de journée",
                "le week-end",
            ],
            [
                "et prennent plein de photos",
                "en mangeant des glaces",
                "et rentrent fatigués mais heureux",
                "pour garder de beaux souvenirs",
                "et racontent leur journée",
                "avant de repartir à la maison",
            ],
        ],
    },

    contes: {
        id: "contes",
        name: "Contes de fées",
        icon: "🧚",
        description: "Univers magique des contes classiques",
        bands: [
            [
                "La fée Clochette",
                "Le prince charmant",
                "La méchante sorcière",
                "Un lutin farceur",
                "La Belle au bois dormant",
                "Le Petit Poucet",
            ],
            ["cherche", "protège", "utilise", "découvre", "libère", "enchante"],
            [
                "un miroir magique",
                "une baguette dorée",
                "un livre de sorts",
                "une clé en argent",
                "une potion mystérieuse",
                "un coffre enchanté",
            ],
            [
                "au clair de lune",
                "dans le château hanté",
                "près de la fontaine magique",
                "au fond des bois",
                "dans la tour la plus haute",
                "au royaume enchanté",
            ],
            [
                "et tout le monde vécut heureux",
                "pour briser la malédiction",
                "et le royaume fut sauvé",
                "jusqu'à la fin des temps",
                "et la paix revint partout",
                "pour l'éternité",
            ],
        ],
    },

    espace: {
        id: "espace",
        name: "Sciences et Espace",
        icon: "🚀",
        description: "Exploration spatiale et découvertes scientifiques",
        bands: [
            [
                "L'astronaute Thomas",
                "Le robot explorateur",
                "La fusée spatiale",
                "Un extraterrestre gentil",
                "La scientifique Clara",
                "Les astronomes",
            ],
            [
                "observe",
                "explore",
                "analyse",
                "étudie",
                "photographie",
                "découvre",
            ],
            [
                "une planète rouge",
                "des étoiles filantes",
                "la galaxie d'Andromède",
                "un trou noir",
                "des météorites brillantes",
                "la Station Spatiale",
            ],
            [
                "à bord de la fusée",
                "depuis l'observatoire",
                "en flottant dans l'espace",
                "dans le laboratoire spatial",
                "au centre de contrôle",
                "près de la Lune",
            ],
            [
                "et fait une grande découverte",
                "pour comprendre l'univers",
                "et envoie des images sur Terre",
                "en rêvant de nouvelles missions",
                "pour partager avec les enfants",
                "et inspire les générations futures",
            ],
        ],
    },
};

/**
 * Liste de tous les thèmes disponibles
 * @returns {Array} Tableau des thèmes
 */
export const getAllThemes = () => {
    return Object.values(themes);
};
