import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { motion } from "framer-motion";
import { BrainCircuit, FlaskConical, Globe, BookOpenCheck, Rocket } from "lucide-react";

const categories = [
  { id: "general", name: "General", icon: <Globe className="w-8 h-8" /> },
  { id: "science", name: "Science", icon: <FlaskConical className="w-8 h-8" /> },
  { id: "logic", name: "Logic", icon: <BrainCircuit className="w-8 h-8" /> },
  { id: "history", name: "History", icon: <BookOpenCheck className="w-8 h-8" /> },
  { id: "space", name: "Space", icon: <Rocket className="w-8 h-8" /> },
];

export default function Home() {
  const navigate = useNavigate();
  const { setCategory, resetQuiz } = useQuiz();

  const handleSelect = (cat) => {
    resetQuiz(); // in case user restarts
    setCategory(cat);
    navigate("/quiz");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-indigo-500 to-purple-600 text-white p-6">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl md:text-5xl font-bold mb-8 text-center"
      >
        Choose a Quiz Category
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {categories.map((cat, idx) => (
          <motion.button
            key={cat.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect(cat.id)}
            className="bg-white text-purple-600 font-semibold rounded-2xl shadow-xl p-6 flex flex-col items-center gap-2 transition hover:bg-purple-100"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            {cat.icon}
            <span className="text-lg">{cat.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
