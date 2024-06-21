"use client"; // Indique que ce fichier est exécuté côté client

import { motion } from "framer-motion"; // Importation du composant motion de Framer Motion pour les animations
import Link from "next/link"; // Importation du composant Link de Next.js pour la navigation entre les pages

// Définition du composant CategoryCard qui prend en props name, index, slug et emoji
export default function CategoryCard({ name, index, slug, emoji }) {
  return (
    <motion.div
      key={slug} // Clé unique pour chaque élément basé sur le slug
      initial={{ opacity: 0, scale: 0.6 }} // États initiaux de l'animation : opacité à 0 et échelle à 0.6
      animate={{ opacity: 1, scale: 1 }} // États d'animation : opacité à 1 et échelle à 1
      transition={{
        duration: 0.5, // Durée de l'animation de 0.5 secondes
        delay: Number("0." + index), // Délai basé sur l'index, converti en nombre
      }}
    >
      {/* Utilisation de Link pour la navigation vers la page du quiz correspondant au slug */}
      <Link href={`/quiz/${slug}`} className="card">
        <div className="p-4 bg-gray-200 border-3 rounded-2xl hover:bg-blue-500 hover:text-white">
          {/* Affichage du nom de la catégorie avec son emoji */}
          <span className="capitalize flex items-center gap-4 text-xl font-bold">
            {emoji} {/* Emoji de la catégorie */}
            <span>{name}</span> {/* Nom de la catégorie */}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
