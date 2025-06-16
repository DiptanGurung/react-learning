import { createContext, useState, useContext } from "react";

const QuizContext = createContext();

export function QuizProvider({ children }) {
  const [category, setCategory] = useState(null);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const resetQuiz = () => {
    setScore(0);
    setCurrentIndex(0);
    setQuestions([]);
    setCategory(null);
  };

  return (
    <QuizContext.Provider
      value={{ category, setCategory, score, setScore, questions, setQuestions, currentIndex, setCurrentIndex, resetQuiz }}>
      {children}
    </QuizContext.Provider>
  );
}

export const useQuiz = () => useContext(QuizContext);