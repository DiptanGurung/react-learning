import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import confetti from "canvas-confetti";

library.add(faWhatsapp, faTwitter);

export default function Result() {
  const { score, questions, resetQuiz, musicOn, setMusicOn, category } = useQuiz();
  const navigate = useNavigate();
  const [highScore, setHighScore] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);
  const shareRef = useRef(null);

  useEffect(() => {
    const storedHigh = Number(localStorage.getItem("highScore")) || 0;
    if (score > storedHigh) {
      localStorage.setItem("highScore", score);
      setHighScore(score);
    } else {
      setHighScore(storedHigh);
    }

    const history = JSON.parse(localStorage.getItem("quizHistory")) || [];
    history.push({
      score,
      total: questions.length,
      category,
      date: new Date().toLocaleString()
    });
    localStorage.setItem("quizHistory", JSON.stringify(history));

    if (score === questions.length && questions.length > 0) {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        ticks: 200,
        colors: ["#facc15", "#4ade80", "#60a5fa"],
      });
    }
  }, [score, questions.length, category]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        setShareOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getMusicSrc = () => {
    if (score === questions.length) return "/sounds/pixel-paradise.mp3";
    if (score >= questions.length * 0.8) return "/sounds/pixel.mp3";
    if (score >= questions.length * 0.5) return "/sounds/8-bit.mp3";
    return "/sounds/bad-dreams.mp3";
  };

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

  const handleRestart = () => {
    resetQuiz();
    navigate("/home");
  };

  const emoji = (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
    >
      {score === questions.length
        ? "🎉"
        : score > questions.length / 5
        ? "😊"
        : "😐"}
    </motion.div>
  );

  let message;
  if (score === questions.length) {
    message = <>Perfect! You're a quiz master! 🎯</>;
  } else if (score > questions.length / 4) {
    message = <>Great job! Keep it up! 🚀</>;
  } else if (score > 3) {
    message = <>Not bad, try again and improve! 🔄</>;
  } else {
    message = <>You don't have brains to work! 🧠</>;
  }

  const shareText = encodeURIComponent(
    `I scored ${score} out of ${questions.length} on this awesome quiz!`
  );

  const popupVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
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
        aria-label={musicOn ? "Mute background music" : "Play background music"}
      >
        {musicOn ? "🔊" : "🔇"}
      </button>

      {musicOn && (
        <audio id="bg-music" loop hidden key={getMusicSrc()}>
          <source src={getMusicSrc()} type="audio/mp3" />
        </audio>
      )}

      <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-lg shadow-xl max-w-xl w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
          🏆 {emoji} Score: {score}/{questions.length}
        </h1>

        <p className="text-xl mt-4">{message}</p>

        <p className="text-md mt-6">🥇 High Score: {highScore}</p>

        <div className="w-full mt-6 bg-white/30 h-4 rounded-full overflow-hidden">
          <div
            className="h-full bg-yellow-300 transition-all duration-500 ease-out"
            style={{ width: `${(score / questions.length) * 100}%` }}
          />
        </div>

        <p className="text-sm mt-1">XP: {score * 10} XP</p>
        <p className="text-sm mt-1">
          🔥 Streak: {score >= 3 ? `${score} correct in a row!` : "No streak"}
        </p>

        <div
          className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4 relative"
          ref={shareRef}
        >
          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow hover:scale-105 transition flex items-center gap-2"
          >
            🔄 Try Again
          </button>

          <button
            onClick={() => setShareOpen(!shareOpen)}
            aria-haspopup="true"
            aria-expanded={shareOpen}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:scale-105 transition flex items-center gap-2 relative"
          >
            🔗 Share {shareOpen ? "▲" : "▼"}
          </button>

          <AnimatePresence>
            {shareOpen && (
              <motion.div
                key="share-popup"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={popupVariants}
                transition={{ duration: 0.3 }}
                className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg text-black py-2 w-48 z-50"
              >
                <button
                  onClick={() =>
                    window.open(`https://wa.me/?text=${shareText}`, "_blank")
                  }
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left cursor-pointer"
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
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left cursor-pointer"
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
