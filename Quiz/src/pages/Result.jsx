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
  }, [score]);

  const getMusicSrc = () => {
    if (score === questions.length) {
      return "/sounds/pixel-paradise.mp3";
    } else if (score >= questions.length * 0.8) {
      return "/sounds/pixel.mp3";
    } else if (score >= questions.length * 0.5) {
      return "/sounds/8-bit.mp3";
    } else {
      return "/sounds/bad-dreams.mp3";
    }
  };

  useEffect(() => {
    const audio = document.getElementById("bg-music");
    if (!audio) return;

    let fadeIn;
    let fadeOut;

    if (musicOn) {
      audio.volume = 0;
      audio.play().catch(() => {
      });
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
      if (fadeIn) clearInterval(fadeIn);
      if (fadeOut) clearInterval(fadeOut);
    };
  }, [musicOn, score]);

  const handleRestart = () => {
    resetQuiz();
    navigate("/");
  };

  const emoji =
    score === questions.length ? (
      <PartyPopper className="w-10 h-10" />
    ) : score > questions.length / 5 ? (
      <Smile className="w-10 h-10 inline-block ml-2" />
    ) : (
      <Meh className="w-10 h-10 inline-block ml-2" />
    );

  let message;
  if (score === questions.length) {
    message = (
      <>
        Perfect! You're a quiz master!{" "}
        <Target className="w-8 h-8 inline-block ml-2" />
      </>
    );
  } else if (score > questions.length / 4) {
    message = (
      <>
        Great job! Keep it up!{" "}
        <Rocket className="w-8 h-8 inline-block ml-2" />
      </>
    );
  } else if (score > 3) {
    message = (
      <>
        Not bad, try again and improve!{" "}
        <RefreshCcw className="w-8 h-8 inline-block ml-2" />
      </>
    );
  } else {
    message = (
      <>
        You don't have brains to work!{" "}
        <Brain className="w-8 h-8 inline-block ml-2" />
      </>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-400 to-blue-500 text-white text-center p-6 relative"
    >
      <button
        onClick={() => setMusicOn(!musicOn)}
        className="absolute top-4 right-4 p-2 bg-white text-black rounded-full shadow"
        aria-label={musicOn ? "Mute background music" : "Play background music"}
        title={musicOn ? "Mute background music" : "Play background music"}
      >
        {musicOn ? <Volume2 /> : <VolumeX />}
      </button>

      {musicOn && (
        <audio
          id="bg-music"
          loop
          hidden
          key={getMusicSrc()}
        >
          <source src={getMusicSrc()} type="audio/mp3" />
        </audio>
      )}

      <h1 className="text-5xl font-bold mb-4 flex items-center gap-3">
        <Trophy className="w-10 h-10" /> {emoji} Your Score: {score}/{questions.length}
      </h1>

      <p className="text-xl mb-2 mt-5">{message}</p>

      <p className="text-md mb-6 mt-5">
        <Medal className="w-8 h-8 inline-block" /> High Score: {highScore}
      </p>

      <button
        onClick={handleRestart}
        className="mt-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow hover:scale-105 transition flex items-center gap-2"
      >
        <RefreshCcw className="w-8 h-8" />
        Try Again
      </button>
    </motion.div>
  );
}
