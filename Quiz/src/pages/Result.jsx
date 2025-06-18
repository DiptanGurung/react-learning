import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { motion } from "framer-motion";
import {
  Trophy,
  RefreshCcw,
  PartyPopper,
  Target,
  Rocket,
  Meh,
  Smile,
  Brain,
  Medal,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function Result() {
  const {
    score,
    questions,
    resetQuiz,
    musicOn,
    setMusicOn,
  } = useQuiz();
  const navigate = useNavigate();
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const stored = Number(localStorage.getItem("highScore")) || 0;
    if (score > stored) {
      localStorage.setItem("highScore", score);
      setHighScore(score);
    } else {
      setHighScore(stored);
    }

    if (score === questions.length) {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        ticks: 200,
        colors: ["#facc15", "#4ade80", "#60a5fa"],
      });
    }
  }, [score]);

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
      {score === questions.length ? (
        <span className="text-3xl">🎉</span>
      ) : score > questions.length / 5 ? (
        <span className="text-3xl">😊</span>
      ) : (
        <span className="text-3xl">😐</span>
      )}
    </motion.div>
  );

  let message;
  if (score === questions.length) {
    message = (
      <>
        Perfect! You're a quiz master! <span className="ml-1">🎯</span>
      </>
    );
  } else if (score > questions.length / 4) {
    message = (
      <>
        Great job! Keep it up! <span className="ml-1">🚀</span>
      </>
    );
  } else if (score > 3) {
    message = (
      <>
        Not bad, try again and improve! <span className="ml-1">🔄</span>
      </>
    );
  } else {
    message = (
      <>
        You don't have brains to work! <span className="ml-1">🧠</span>
      </>
    );
  }

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
        title={musicOn ? "Mute background music" : "Play background music"}
      >
        {musicOn ? <span>🔊</span> : <span>🔇</span>}
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

        <p className="text-md mt-6">
          🥇 High Score: {highScore}
        </p>

        <div className="w-full mt-6 bg-white/30 h-4 rounded-full overflow-hidden">
          <div
            className="h-full bg-yellow-300 transition-all duration-500 ease-out"
            style={{ width: `${(score / questions.length) * 100}%` }}
          />
        </div>
        <p className="text-sm mt-1">XP: {score * 10} XP</p>

        <p className="text-sm mt-1">
          🔥 Streak: {score >= 3 ? `${score} correct in a row!` : `No streak`}
        </p>

        <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4">
          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow hover:scale-105 transition flex items-center gap-2"
          >
            🔄 Try Again
          </button>

          <a
            href={`https://wa.me/?text=I%20scored%20${score}%20out%20of%20${questions.length}%20on%20the%20Ultimate%20Quiz!`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-green-500 text-white rounded-xl shadow hover:scale-105 transition"
          >
            📤 Share on WhatsApp
          </a>

          <a
            href={`https://twitter.com/intent/tweet?text=I%20scored%20${score}%20out%20of%20${questions.length}%20on%20this%20awesome%20quiz!`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-blue-500 text-white rounded-xl shadow hover:scale-105 transition"
          >
            🐦 Share on X
          </a>
        </div>
      </div>
    </motion.div>
  );
}
