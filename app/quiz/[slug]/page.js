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
    <div className="grid grid-cols-12 grow">
      {/* Section gauche avec l'image de la catégorie */}
      <div
        className="col-span-12 lg:col-span-4 bg-center bg-cover bg-no-repeat bg-black min-h-8"
        style={{ backgroundImage: `url('/illustrations/${params.slug}.webp')` }}
      ></div>

      {/* Section droite avec les questions et les réponses */}
      <div className="col-span-12 lg:col-span-8 p-4 lg:px-24 flex flex-col justify-between">
        {questions.length && currentIndex !== questions.length ? (
          <>
            <div>
              {/* Affichage du compteur de questions */}
              <div className="text-end text-primary text-xl font-medium my-3 lg:my-6">
                <span className="countdown font-bold badge-score">
                  <span style={{ "--value": currentIndex + 1 }}></span>/
                  {questions.length}
                </span>
              </div>
              <div className="text-center">
                {/* Affichage de la catégorie */}
                <div className="text-blue-500 animate-pulse-slow text-4xl font-bold capitalize">
                  {slugToNameCategory(params.slug)}
                </div>
                {/* Affichage de la question actuelle */}
                <div className="lg:min-h-28 mt-3 grid">
                  <AnimatePresence mode="wait">
                    <motion.h1
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      key={currentIndex}
                      className="text-center lg:text-3xl mt-2 lg:mt-8"
                    >
                      {questions[currentIndex].question}
                    </motion.h1>
                  </AnimatePresence>
                </div>
              </div>

              {/* Affichage des réponses */}
              <div className="flex mt-8 gap-6 min-h-32 m-auto content-center flex-wrap justify-center max-w-3xl ">
                <Answers
                  id={questions[currentIndex]._id}
                  answers={questions[currentIndex].allAnswers}
                  selectedAnswer={selectedAnswer}
                  selectAnswer={selectAnswer}
                />
              </div>
            </div>

            {/* Bouton pour valider la réponse */}
            <div className="text-end my-8 ">
              <div
                onClick={validateAnswer}
                className={`btn px-8 text-lg text-white ${
                  selectedAnswer ? "bouton-primary" : "btn-disabled"
                }`}
              >
                Valider
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
    </div>
  );
}

// Composant pour afficher les réponses
const Answers = ({ answers, selectAnswer, selectedAnswer, id }) => {
  return (
    <AnimatePresence mode="wait">
      {answers.map((answer, i) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{
            delay: 0.15 * i,
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