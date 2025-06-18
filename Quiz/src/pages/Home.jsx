import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  FlaskConical,
  Globe,
  BookOpenCheck,
  Rocket,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect } from "react";

const categories = [
  { id: "general", name: "General", icon: <Globe className="w-8 h-8" /> },
  { id: "science", name: "Science", icon: <FlaskConical className="w-8 h-8" /> },
  { id: "logic", name: "Logic", icon: <BrainCircuit className="w-8 h-8" /> },
  { id: "history", name: "History", icon: <BookOpenCheck className="w-8 h-8" /> },
  { id: "space", name: "Space", icon: <Rocket className="w-8 h-8" /> },
];

export default function Home() {
  const navigate = useNavigate();
  const { setCategory, category, resetQuiz, musicOn, setMusicOn } = useQuiz();

  useEffect(() => {
    const audio = document.getElementById("bg-music");
    if (!audio) return;

    if (musicOn) {
      audio.volume = 0;
      audio.play();
      let vol = 0; // Use a local variable to track volume
      const fadeIn = setInterval(() => {
        if (vol < 1) {
          vol = Math.min(vol + 0.1, 1);
          audio.volume = vol;
        } else {
          clearInterval(fadeIn);
        }
      }, 100);
    } else {
      let vol = audio.volume; // Start from current volume
      const fadeOut = setInterval(() => {
        if (vol > 0.1) {
          vol = Math.max(vol - 0.1, 0);
          audio.volume = vol;
        } else {
          audio.pause();
          clearInterval(fadeOut);
        }
      }, 100);
    }
  }, [musicOn]);

  const handleStart = () => {
    if (!category) {
      alert("Please select a category first!");
      return;
    }
    resetQuiz();
    navigate("/quiz");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-indigo-700 to-purple-800 text-white p-6 relative"
    >
      {/* Music Toggle */}
      <button
        onClick={() => setMusicOn(!musicOn)}
        className="absolute top-4 right-4 p-2 bg-white text-black rounded-full shadow hover:bg-gray-200 focus:outline-none"
      >
        {musicOn ? <Volume2 /> : <VolumeX />}
      </button>

      {musicOn && (
        <audio id="bg-music" loop autoPlay hidden>
          <source src="/sounds/pixel-dreams.mp3" type="audio/mp3" />
        </audio>
      )}

      {/* Title */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl md:text-5xl font-bold mb-10 text-center"
      >
        Choose a Quiz Category
      </motion.h1>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl mb-8">
        {categories.map((cat, idx) => (
          <motion.button
            key={cat.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCategory(cat.id)}
            className={`bg-white text-purple-700 font-semibold rounded-2xl shadow-lg p-6 flex flex-col items-center gap-2 transition duration-300 ease-in-out hover:scale-105 hover:bg-purple-100 hover:shadow-xl focus:outline-none
              ${category === cat.id ? "ring-4 ring-yellow-400 scale-105" : ""}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            {cat.icon}
            <span className="text-lg">{cat.name}</span>
          </motion.button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleStart}
          className="px-8 py-3 bg-yellow-400 text-black rounded-full text-lg font-bold shadow-md hover:bg-yellow-300 transition"
        >
          Start Quiz
        </button>
        <button
          onClick={() => navigate("/rankings")}
          className="px-8 py-3 bg-white/20 border border-white rounded-full text-white font-semibold hover:bg-white/30 transition"
        >
          View Rankings
        </button>
      </div>
    </motion.div>
  );
}
