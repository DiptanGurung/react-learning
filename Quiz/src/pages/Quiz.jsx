import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import questionsData from "../data/questions";
import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";

export default function Quiz() {
  const { category, questions, setQuestions, currentIndex, setCurrentIndex, score, setScore } = useQuiz();
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    if (!questions.length) {
      const filtered = questionsData[category] || [];
      setQuestions(filtered);
    }
  }, [category, questions, setQuestions]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0) setTimeLeft(timeLeft - 1);
      else handleNext();
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleAnswer = (option) => {
    if (selected) return;
    setSelected(option);
    if (option === questions[currentIndex].answer) setScore(score + 1);
    setTimeout(() => handleNext(), 1000);
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelected(null);
      setTimeLeft(10);
    } else {
      navigate("/result");
    }
  };

  if (!questions.length) return <p className="text-center mt-10 text-white">Loading questions...</p>;

  const q = questions[currentIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-800 text-white p-6">
      <div className="text-xl mb-4 flex items-center gap-2">
        <Clock className="w-6 h-6 text-white" /> {timeLeft}s
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={q.question}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xl"
        >
          <h2 className="text-2xl font-bold mb-4">{q.question}</h2>
          <div className="grid gap-4">
            {q.options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                className={`px-5 py-3 rounded-xl text-lg shadow transition ${selected === opt
                    ? opt === q.answer
                      ? "bg-green-500"
                      : "bg-red-500"
                    : "bg-white text-black hover:bg-gray-200"
                  }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}