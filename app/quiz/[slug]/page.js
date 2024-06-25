"use client";
import { useState, useEffect, useCallback } from "react";
import { shuffle, slugToNameCategory } from "@/utils/all";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { usePlayerStore } from "@/store/player";

// Composant principal de la page de quiz
export default function Page({ params }) {
  // Récupération des fonctions et états du store
  const { increaseScore, setCategory, resetScore } = usePlayerStore();
  const router = useRouter();
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fonction pour récupérer les questions depuis l'API
  const fetchQuestions = useCallback(async () => {
    const res = await fetch(
      `https://quizzapi.jomoreschi.fr/api/v1/quiz?limit=10&category=${params.slug}`
    );
    const data = await res.json();

    // Mélange les réponses pour chaque question
    const formattedQuizzes = data.quizzes.map((quiz) => ({
      ...quiz,
      allAnswers: shuffle([...quiz.badAnswers, quiz.answer]),
    }));

    setQuestions(formattedQuizzes);
    setCategory(slugToNameCategory(params.slug));
    resetScore();
  }, [params.slug, setCategory, resetScore]);

  // Appel à l'API pour récupérer les questions quand le composant est monté
  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  // Redirection vers la page de fin de quiz lorsque toutes les questions ont été répondues
  useEffect(() => {
    if (currentIndex === questions.length && questions.length > 0) {
      router.push("/quiz/end");
    }
  }, [currentIndex, questions.length, router]);

  // Fonction pour sélectionner une réponse
  const selectAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  // Fonction pour valider la réponse sélectionnée
  const validateAnswer = () => {
    if (!questions[currentIndex].badAnswers.includes(selectedAnswer)) {
      increaseScore(); // Augmente le score si la réponse est correcte
    }
    setCurrentIndex((prev) => prev + 1); // Passe à la question suivante
    setSelectedAnswer(""); // Réinitialise la réponse sélectionnée
  };

  return (
    <div
      className="col-span-12 lg:col-span-8 p-4 lg:px-24 lg"
      style={{ backgroundImage: `url('/illustrations/${params.slug}.webp')` }}
    >
      {questions.length && currentIndex !== questions.length ? (
        <>
          {/* Affichage de la question actuelle */}
          <div className="lg:min-h-28 mt-3 grid bg-white p-4 rounded-lg  gap-5">
            {/* Affichage du compteur de questions */}

            <div className="flex justify-center items-center my-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{
                    width: `${((currentIndex + 1) / questions.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
            {/* Affichage de la catégorie */}
            <div className="text-blue-500 animate-pulse-slow text-4xl font-bold capitalize text-center">
              {slugToNameCategory(params.slug)}
            </div>
            {/* Affichage de la question */}
            <AnimatePresence mode="wait">
              <motion.h1
                initial={{ opacity: 0, x: 100 }} // Démarre à gauche avec x: -100
                animate={{ opacity: 1, x: 0 }} // Anime vers la position initiale
                exit={{ opacity: 0, x: -100 }} // Sort vers la gauche
                transition={{
                  delay: 1.0, // Apparaît un par un, retardé par l'index
                }}
                key={currentIndex}
                className="text-center lg:text-3xl mt-2 lg:mt-8 "
              >
                {questions[currentIndex].question}
              </motion.h1>
            </AnimatePresence>
            {/* Affichage des réponses */}
            <div className="flex flex-wrap justify-center gap-3">
              <Answers
                id={questions[currentIndex]._id}
                answers={questions[currentIndex].allAnswers}
                selectedAnswer={selectedAnswer}
                selectAnswer={selectAnswer}
              />
            </div>
            {/* Bouton pour valider la réponse */}
            <div className="text-center my-8 ">
              {" "}
              {/* Modification de "text-end" à "text-center" pour centrer le bouton */}
              <div
                onClick={validateAnswer}
                className={`btn px-8 text-lg text-white ${
                  selectedAnswer ? "bouton-primary" : "btn-disabled"
                }`}
              >
                Valider
              </div>
            </div>
          </div>
        </>
      ) : (
        // Affichage d'un spinner de chargement si les questions ne sont pas encore prêtes
        <div className="grid place-items-center h-full">
          <span className="loading loading-spinner loading-md mb-20"></span>
        </div>
      )}
    </div>
  );
}

// Composant pour afficher les réponses
const Answers = ({ answers, selectAnswer, selectedAnswer, id }) => {
  return (
    <AnimatePresence mode="wait">
      {answers.map((answer, i) => (
        <motion.div
          initial={{ opacity: 0, x: 100 }} // Démarre à gauche avec x: -100
          animate={{ opacity: 1, x: 0 }} // Anime vers la position initiale
          exit={{ opacity: 0, x: -100 }} // Sort vers la gauche
          transition={{
            delay: 1.0, // Apparaît un par un, retardé par l'index
          }}
          key={`${id}-${i}`}
          className={`transition max-w-80 w-full px-3 py-6 rounded-lg text-center cursor-pointer grid place-items-center ${
            selectedAnswer === answer
              ? "ring-primary ring-4"
              : "ring-gray-200 ring-2"
          }`}
          onClick={() => selectAnswer(answer)}
        >
          <p>{answer}</p>
        </motion.div>
      ))}
    </AnimatePresence>
  );
};
