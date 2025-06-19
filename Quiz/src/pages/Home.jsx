import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faFlask,
  faBrain,
  faBookOpen,
  faRocket,
  faCalculator,
  faFutbol,
  faFilm,
  faGamepad,
  faMusic,
  faPaintBrush,
  faLandmark,
  faVolumeUp,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";

const categories = [
  { id: "general", name: "GENERAL", icon: faGlobe, color: "bg-indigo-500" },
  { id: "science", name: "SCIENCE", icon: faFlask, color: "bg-green-500" },
  { id: "logic", name: "LOGIC", icon: faBrain, color: "bg-purple-600" },
  { id: "history", name: "HISTORY", icon: faBookOpen, color: "bg-yellow-500" },
  { id: "space", name: "SPACE", icon: faRocket, color: "bg-pink-500" },
  { id: "math", name: "MATH", icon: faCalculator, color: "bg-red-500" },
  { id: "sports", name: "SPORTS", icon: faFutbol, color: "bg-orange-500" },
  { id: "movies", name: "MOVIES", icon: faFilm, color: "bg-blue-500" },
  { id: "games", name: "GAMING", icon: faGamepad, color: "bg-cyan-500" },
  { id: "music", name: "MUSIC", icon: faMusic, color: "bg-pink-400" },
  { id: "art", name: "ART", icon: faPaintBrush, color: "bg-purple-400" },
  { id: "geography", name: "GEOGRAPHY", icon: faLandmark, color: "bg-teal-500" },
];

export default function Home() {
  const navigate = useNavigate();
  const { setCategory, category, resetQuiz, musicOn, setMusicOn } = useQuiz();
  const [error, setError] = useState("");

  useEffect(() => {
    const audio = document.getElementById("bg-music");
    if (!audio) return;

    let fadeInterval;
    if (musicOn) {
      audio.volume = 0;
      audio.play().catch(() => {});
      fadeInterval = setInterval(() => {
        if (audio.volume < 1) {
          audio.volume = Math.min(audio.volume + 0.1, 1);
        } else {
          clearInterval(fadeInterval);
        }
      }, 100);
    } else {
      fadeInterval = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume = Math.max(audio.volume - 0.1, 0);
        } else {
          audio.pause();
          clearInterval(fadeInterval);
        }
      }, 100);
    }

    return () => clearInterval(fadeInterval);
  }, [musicOn]);

  const handleStart = () => {
    if (!category) {
      setError("Please select a category first!");
      return;
    }
    setError("");
    resetQuiz();
    navigate("/quiz");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-indigo-900 to-purple-900 text-white p-6 relative"
    >
      {/* Music Toggle Button */}
      <button
        onClick={() => setMusicOn(!musicOn)}
        className="absolute top-4 right-4 p-3 bg-white bg-opacity-20 text-white rounded-full shadow-lg hover:bg-opacity-40 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
        aria-label={musicOn ? "Mute background music" : "Play background music"}
      >
        <FontAwesomeIcon icon={musicOn ? faVolumeUp : faVolumeMute} size="lg" />
      </button>

      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl md:text-5xl font-extrabold mb-12 tracking-wide text-center"
      >
        Choose a Quiz Category
      </motion.h1>

      {error && (
        <p className="mb-6 text-yellow-400 font-semibold animate-pulse text-center">
          {error}
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 max-w-6xl w-full px-2">
        {categories.map((cat, idx) => (
          <motion.button
            key={cat.id}
            whileHover={{ scale: 1.1, boxShadow: `0 0 15px ${cat.color.replace('bg-', '')}` }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setCategory(cat.id);
              setError("");
            }}
            className={`flex flex-col items-center justify-center gap-3 bg-white bg-opacity-10 rounded-3xl p-6 cursor-pointer transition 
              focus:outline-none focus:ring-4 focus:ring-yellow-400
              ${category === cat.id ? "ring-4 ring-yellow-400 scale-110" : ""}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            aria-pressed={category === cat.id}
          >
            <div
              className={`${cat.color} p-5 rounded-full shadow-lg flex items-center justify-center text-white`}
              style={{ width: 72, height: 72 }}
            >
              <FontAwesomeIcon icon={cat.icon} size="2x" />
            </div>
            <span className="uppercase font-semibold tracking-wide text-lg select-none">
              {cat.name}
            </span>
          </motion.button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-6 mt-14">
        <button
          onClick={handleStart}
          className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-10 py-3 rounded-full text-black font-extrabold shadow-lg hover:from-yellow-300 hover:to-yellow-400 transition focus:outline-none focus:ring-4 focus:ring-yellow-300"
        >
          Start Quiz
        </button>
        <button
          onClick={() => navigate("/rankings")}
          className="border border-white rounded-full px-10 py-3 font-semibold text-white hover:bg-white/20 transition focus:outline-none focus:ring-4 focus:ring-white"
        >
          View Rankings
        </button>
      </div>

      {musicOn && (
        <audio id="bg-music" loop autoPlay hidden>
          <source src="/sounds/pixel-dreams.mp3" type="audio/mp3" />
        </audio>
      )}
    </motion.div>
  );
}
