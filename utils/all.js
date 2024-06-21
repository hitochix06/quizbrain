// Fonction pour mélanger un tableau
export const shuffle = (array) => {
  // Parcourt le tableau à l'envers
  for (let i = array.length - 1; i >= 0; i--) {
    // Génère un index aléatoire
    const randomIndex = Math.floor(Math.random() * (i + 1));
    // Ajoute l'élément aléatoire à la fin du tableau
    array.push(array[randomIndex]);
    // Supprime l'élément aléatoire de sa position d'origine
    array.splice(randomIndex, 1);
  }
  // Retourne le tableau mélangé
  return array;
};

// Fonction pour supprimer un zéro en tête
export const removeLeadingZero = (num) => {
  // Vérifie si num est un nombre et est inférieur à 10
  if (typeof num === "number" && num < 10) {
    return parseInt(num.toString().slice(1), 10); // Convertit en chaîne, supprime le premier caractère et reconvertit en nombre
  }
  // Vérifie si num est une chaîne de caractères et converti en nombre est inférieur à 10
  else if (typeof num === "string" && parseInt(num, 10) < 10) {
    return parseInt(num.slice(1), 10); // Supprime le premier caractère et reconvertit en nombre
  }
  // Retourne le nombre tel quel s'il n'a pas de zéro en tête
  return num;
};

// Tableau des catégories avec leurs noms, slugs et émojis
export const categories = [
  {
    name: "TV et Cinéma",
    slug: "tv_cinema",
    emoji: "📺🎬",
  },
  {
    name: "Art et Littérature",
    slug: "art_litterature",
    emoji: "🎨📚",
  },
  {
    name: "Musique",
    slug: "musique",
    emoji: "🎵",
  },
  {
    name: "Actualité Politique",
    slug: "actu_politique",
    emoji: "📰🏛️",
  },
  {
    name: "Culture Générale",
    slug: "culture_generale",
    emoji: "🌍📖",
  },
  {
    name: "Sport",
    slug: "sport",
    emoji: "⚽🏅",
  },
  {
    name: "Jeux Vidéos",
    slug: "jeux_videos",
    emoji: "🎮",
  },
];

// Fonction pour convertir un slug en nom de catégorie
export const slugToNameCategory = (slug) =>
  categories.find((cat) => cat.slug === slug).name; // Trouve la catégorie correspondant au slug et retourne son nom
