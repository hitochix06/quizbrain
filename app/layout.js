import Navbar from "@/components/NavBar"; // Importation du composant Navbar depuis le chemin spécifié
import { Inter } from "next/font/google"; // Importation de la police Inter depuis Google Fonts
import "./globals.css"; // Importation des styles globaux

// Configuration de la police Inter avec le sous-ensemble latin
const inter = Inter({ subsets: ["latin"] });

// Métadonnées pour le document HTML, telles que le titre et la description
export const metadata = {
  title: "QuizBrain", // Titre de la page
  description: "Generated by create next app", // Description de la page
};

// Composant RootLayout qui définit la structure de base de la page
export default function RootLayout({ children }) {
  return (
    <html>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        {/* Inclusion de la barre de navigation */}
        <Navbar />
        {/* Affichage des enfants passés en props */}
        {children}
      </body>
    </html>
  );
}