import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faArrowLeft,
  faVolumeUp,
  faVolumeMute,
  faTrash,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";

export default function Rankings() {
  const navigate = useNavigate();
  const { musicOn, setMusicOn } = useQuiz();
  const [rankings, setRankings] = useState([]);
  const [filter, setFilter] = useState("all");

  // Music fade in/out
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

  // Load rankings from localStorage quizHistory key
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("quizHistory") || "[]");
    // Sort descending by score
    const sorted = [...storedHistory].sort((a, b) => b.score - a.score);
    setRankings(sorted);
  }, []);

  const handleClear = () => {
    localStorage.removeItem("quizHistory");
    setRankings([]);
  };

  // Filter by category if filter applied
  const filteredRankings = filter === "all" ? rankings : rankings.filter(r => r.category === filter);
  const uniqueCategories = [...new Set(rankings.map(r => r.category).filter(Boolean))];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center bg-gradient-to-tr from-indigo-900 to-purple-900 text-white p-6 relative"
    >
      {/* Music Toggle */}
      <button
        onClick={() => setMusicOn(!musicOn)}
        className="absolute top-4 right-4 p-3 bg-white bg-opacity-20 text-white rounded-full shadow-lg hover:bg-opacity-40 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
        aria-label={musicOn ? "Mute background music" : "Play background music"}
      >
        <FontAwesomeIcon icon={musicOn ? faVolumeUp : faVolumeMute} size="lg" />
      </button>

      {/* Back Button */}
      <button
        onClick={() => navigate("/home")}
        className="self-start mb-6 flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full shadow hover:bg-opacity-40 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        Back to Home
      </button>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-wide">
        🏆 Top Rankings
      </h1>

      {/* Clear and Filter Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-full text-white font-semibold shadow flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faTrash} /> Clear All
        </button>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="pl-4 pr-4 py-2 rounded-full bg-white/20 backdrop-blur text-white appearance-none focus:outline-none"
          aria-label="Filter by category"
        >
          <option value="all">All Categories</option>
          {uniqueCategories.map(cat => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Rankings List */}
      <div className="w-full max-w-3xl bg-white bg-opacity-10 rounded-3xl p-6 shadow-lg backdrop-blur-md">
        {filteredRankings.length === 0 ? (
          <p className="text-center text-lg text-yellow-300">
            No rankings available yet.
          </p>
        ) : (
          <ul className="divide-y divide-white/30">
            {filteredRankings.map((entry, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center py-4 px-3 hover:bg-white/20 rounded-lg transition"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold w-8 text-yellow-400">
                    {idx + 1}
                  </span>
                  <FontAwesomeIcon
                    icon={faTrophy}
                    className="text-yellow-400 w-6 h-6"
                  />
                  <span className="text-lg font-semibold capitalize">
                    {entry.name || "Unknown"}
                  </span>
                  <span className="text-sm text-white/70 italic">
                    ({entry.category || "General"})
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xl font-bold">
                    {entry.score} / {entry.total}
                  </span>
                  <span className="text-sm text-white/70">{entry.date}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Background Music */}
      {musicOn && (
        <audio id="bg-music" loop autoPlay hidden>
          <source src="/sounds/pixel-dreams.mp3" type="audio/mp3" />
        </audio>
      )}
    </motion.div>
  );
}
