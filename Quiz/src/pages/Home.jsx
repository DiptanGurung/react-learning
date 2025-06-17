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
  const { setCategory, resetQuiz, musicOn, setMusicOn } = useQuiz();

  const handleSelect = (cat) => {
    resetQuiz();
    setCategory(cat);
    navigate("/quiz");
  };

  useEffect(() => {
    const audio = document.getElementById("bg-music");
    if (!audio) return;

    if (musicOn) {
      audio.volume = 0;
      audio.play();
      const fadeIn = setInterval(() => {
        if (audio.volume < 1) {
          audio.volume = Math.min(audio.volume + 0.1, 1);
        } else {
          clearInterval(fadeIn);
        }
      }, 100);
    } else {
      const fadeOut = setInterval(() => {
        if (audio.volume > 0.1) {
          audio.volume = Math.max(audio.volume - 0.1, 0);
        } else {
          audio.pause();
          clearInterval(fadeOut);
        }
      }, 100);
    }
  }, [musicOn]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-indigo-700 to-purple-800 text-white p-6 relative"
    >
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

      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl md:text-5xl font-bold mb-10 text-center"
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
            className="bg-white text-purple-700 font-semibold rounded-2xl shadow-lg p-6 flex flex-col items-center gap-2 transition duration-300 ease-in-out hover:scale-105 hover:bg-purple-100 hover:shadow-xl focus:outline-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            {cat.icon}
            <span className="text-lg">{cat.name}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
