import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import confetti from "canvas-confetti";

// Add Font Awesome icons
library.add(faWhatsapp, faTwitter);

export default function Result() {
  const { score, questions, resetQuiz, musicOn, setMusicOn, category } = useQuiz();
  const navigate = useNavigate();
  const [highScore, setHighScore] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [scoreSaved, setScoreSaved] = useState(false);
  const shareRef = useRef(null);

  const shareText = encodeURIComponent(
    `I scored ${score} out of ${questions.length} on this awesome quiz!`
  );

  const getMusicSrc = () => {
    if (score === questions.length) return "/sounds/pixel-paradise.mp3";
    if (score >= questions.length * 0.8) return "/sounds/pixel.mp3";
    if (score >= questions.length * 0.5) return "/sounds/8-bit.mp3";
    return "/sounds/bad-dreams.mp3";
  };

  useEffect(() => {
    const stored = Number(localStorage.getItem("highScore")) || 0;
    if (score > stored) {
      localStorage.setItem("highScore", score);
      setHighScore(score);
    } else {
      setHighScore(stored);
    }

    if (score === questions.length && questions.length > 0) {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        ticks: 200,
        colors: ["#facc15", "#4ade80", "#60a5fa"],
      });
    }
  }, [score, questions.length]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        setShareOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const audio = document.getElementById("bg-music");
    if (!audio) return;

    let fadeIn, fadeOut;
    if (musicOn) {
      audio.volume = 0;
      audio.play().catch(() => {});
      fadeIn = setInterval(() => {
        if (audio.volume < 1) {
          audio.volume = Math.min(audio.volume + 0.1, 1);
        } else {
          clearInterval(fadeIn);
        }
      }, 100);
    } else {
      fadeOut = setInterval(() => {
        if (audio.volume > 0.1) {
          audio.volume = Math.max(audio.volume - 0.1, 0);
        } else {
          audio.pause();
          clearInterval(fadeOut);
        }
      }, 100);
    }

    return () => {
      clearInterval(fadeIn);
      clearInterval(fadeOut);
    };
  }, [musicOn, score]);

  const handleSaveScore = () => {
    if (!playerName.trim()) return alert("Please enter your name first!");

    const history = JSON.parse(localStorage.getItem("quizHistory")) || [];

    // Check if this exact score for this player & category already exists
    const alreadyExists = history.some(
      (entry) =>
        entry.name === playerName &&
        entry.score === score &&
        entry.category === category
    );

    if (alreadyExists) {
      alert("This score is already saved.");
      return;
    }

    // Add new entry with full details
    history.push({
      name: playerName,
      score,
      total: questions.length,
      category,
      date: new Date().toLocaleString(),
    });

    localStorage.setItem("quizHistory", JSON.stringify(history));
    setScoreSaved(true);
  };

  const handleRestart = () => {
    resetQuiz();
    navigate("/home");
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-600 text-white text-center px-4 py-10 relative"
    >
      <button
        onClick={() => setMusicOn(!musicOn)}
        className="absolute top-4 right-4 p-2 bg-white text-black rounded-full shadow"
      >
        {musicOn ? "🔊" : "🔇"}
      </button>

      {musicOn && (
        <audio id="bg-music" loop hidden key={getMusicSrc()}>
          <source src={getMusicSrc()} type="audio/mp3" />
        </audio>
      )}

      <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-lg shadow-xl max-w-xl w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          🏆 Score: {score}/{questions.length}
        </h1>

        <p className="text-lg mt-2">🥇 High Score: {highScore}</p>

        <div className="mt-6">
          {!scoreSaved ? (
            <>
              <input
                type="text"
                placeholder="Enter your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full p-3 rounded-lg text-black text-lg mb-4"
              />
              <button
                onClick={handleSaveScore}
                className="w-full bg-yellow-400 text-black font-bold py-3 rounded-xl hover:bg-yellow-300 transition"
              >
                Save Score
              </button>
            </>
          ) : (
            <p className="text-green-400 font-bold text-lg mb-4">✅ Score saved!</p>
          )}
        </div>

        <div
          className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4 relative"
          ref={shareRef}
        >
          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow hover:scale-105 transition"
          >
            🔄 Try Again
          </button>

          <button
            onClick={() => setShareOpen(!shareOpen)}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:scale-105 transition"
          >
            🔗 Share {shareOpen ? "▲" : "▼"}
          </button>

          <AnimatePresence>
            {shareOpen && (
              <motion.div
                key="share-popup"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg text-black py-2 w-48 z-50"
              >
                <button
                  onClick={() =>
                    window.open(`https://wa.me/?text=${shareText}`, "_blank")
                  }
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
                >
                  <FontAwesomeIcon icon={["fab", "whatsapp"]} />
                  WhatsApp
                </button>
                <button
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?text=${shareText}`,
                      "_blank"
                    )
                  }
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
                >
                  <FontAwesomeIcon icon={["fab", "twitter"]} />
                  Twitter
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
