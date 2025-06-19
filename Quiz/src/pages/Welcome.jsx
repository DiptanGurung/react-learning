import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function NeonLoader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white px-6">
      <motion.div
        className="relative w-24 h-24"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      >
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-pink-400 opacity-70 shadow-[0_0_20px_5px_rgb(236,72,153)]"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-4 rounded-full border-2 border-purple-400 opacity-80 shadow-[0_0_15px_3px_rgb(139,92,246)]"
          animate={{ scale: [1, 0.85, 1] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-8 rounded-full bg-pink-600 shadow-[0_0_15px_6px_rgb(236,72,153)]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
        />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
        className="mt-8 text-2xl font-extrabold tracking-widest text-pink-400 drop-shadow-lg"
      >
        LOADING...
      </motion.p>
    </div>
  );
}

export default function Welcome() {
  const navigate = useNavigate();
  const [musicOn, setMusicOn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const audio = document.getElementById("welcome-music");
    if (!audio) return;

    if (musicOn) {
      audio.volume = 0;
      audio.play();
      let vol = 0;
      const fadeIn = setInterval(() => {
        if (vol < 1) {
          vol += 0.05;
          audio.volume = vol;
        } else clearInterval(fadeIn);
      }, 100);
    } else {
      audio.pause();
    }
  }, [musicOn]);

  const handleEnter = () => {
    setIsLoading(true);

    const audio = document.getElementById("welcome-music");
    if (audio) {
      let vol = audio.volume;
      const fadeOut = setInterval(() => {
        if (vol > 0) {
          vol -= 0.05;
          audio.volume = Math.max(vol, 0);
        } else {
          clearInterval(fadeOut);
          audio.pause();
        }
      }, 50);
    }

    setTimeout(() => {
      navigate("/home");
    }, 1800);
  };

  if (isLoading) return <NeonLoader />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white px-6"
    >
      <audio id="welcome-music" loop autoPlay hidden>
        <source src="/sounds/enter.mp3" type="audio/mp3" />
      </audio>

      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-extrabold mb-4 select-none tracking-widest drop-shadow-lg"
      >
        Welcome to QuizMaster!
      </motion.h1>

      <motion.p
        className="text-pink-300 text-lg italic mb-8 select-none"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Ready to test your knowledge? Answer challenging questions and beat your high score!
      </motion.p>

      {/* Quiz features */}
      <motion.div
        className="flex space-x-8 text-pink-400 mb-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        aria-label="Quiz features"
      >
        {/* Question icon */}
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 18h.01" />
            <path d="M12 12a3 3 0 0 0-3 3h6a3 3 0 0 0-3-3z" />
            <path d="M12 6a4 4 0 0 0-4 4v1h8v-1a4 4 0 0 0-4-4z" />
          </svg>
          <span className="mt-1 text-sm">Different Category</span>
        </div>

        {/* Timer icon */}
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="mt-1 text-sm">Timed Quiz</span>
        </div>

        {/* Score icon */}
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 20l9-5-9-5-9 5 9 5z" />
            <path d="M12 12v8" />
            <path d="M21 7v6" />
            <path d="M3 7v6" />
          </svg>
          <span className="mt-1 text-sm">High Score</span>
        </div>
      </motion.div>

      <motion.button
        onClick={handleEnter}
        whileHover={{ scale: 1.05, textShadow: "0 0 8px #ff77ff" }}
        whileTap={{ scale: 0.95 }}
        className="bg-white hover:bg-blue-400 text-black font-bold px-14 py-4 rounded-full shadow-lg transition duration-300"
        aria-label="Enter Quiz Game"
      >
        Start Quiz
      </motion.button>
    </motion.div>
  );
}
