import { createContext, useContext, useState } from "react";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [category, setCategory] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [musicOn, setMusicOn] = useState(true);
  const [confettiOn, setConfettiOn] = useState(true); // NEW

  const resetQuiz = () => {
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);
  };

  return (
    <QuizContext.Provider
      value={{
        category,
        setCategory,
        questions,
        setQuestions,
        currentIndex,
        setCurrentIndex,
        score,
        setScore,
        resetQuiz,
        musicOn,
        setMusicOn,
        confettiOn,     // NEW
        setConfettiOn,  // NEW
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
