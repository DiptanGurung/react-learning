import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { motion } from "framer-motion";
import { Target } from "lucide-react";

const categories = ["General", "Science", "History", "Technology"];

export default function Home() {
  const { setCategory } = useQuiz();
  const navigate = useNavigate();

  const handleSelect = (cat) => {
    setCategory(cat);
    navigate("/quiz");
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-indigo-500 to-purple-600 text-white"
    >
      <h1 className="text-4xl font-bold mb-6 flex items-center gap-2">
        <Target className="w-8 h-8" /> Choose a Category
      </h1>
      <div className="grid gap-4">
        {categories.map((cat) => (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            key={cat}
            onClick={() => handleSelect(cat)}
            className="btn-primary"
          >
            {cat}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}