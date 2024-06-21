import { create } from "zustand";

// Création du store Zustand pour gérer l'état du joueur
export const usePlayerStore = create((set) => ({
  // État initial du score du joueur
  score: 0,

  // État initial de la catégorie du quiz
  category: "",

  // Fonction pour augmenter le score du joueur de 1
  increaseScore: () => set((state) => ({ score: state.score + 1 })),

  // Fonction pour réinitialiser le score du joueur à 0
  resetScore: () => set(() => ({ score: 0 })),

  // Fonction pour définir une nouvelle catégorie pour le quiz
  setCategory: (newCategory) => set(() => ({ category: newCategory })),
}));
