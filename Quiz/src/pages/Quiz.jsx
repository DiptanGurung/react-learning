import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import questionsData from "../data/Questions";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Clock,
  Volume2,
  VolumeX,
  ThumbsUp,
  ThumbsDown,
  Zap,
  ZapOff,
} from "lucide-react";

export default function Quiz() {
  const {
    category,
    questions,
    setQuestions,
    currentIndex,
    setCurrentIndex,
    score,
    setScore,
    musicOn,
    setMusicOn,
    confettiOn,
    setConfettiOn,
  } = useQuiz();

  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({ correct: false, option: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (!questions.length) {
      const filtered = questionsData[category] || [];
      setQuestions(filtered);
    }
  }, [category, questions, setQuestions]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleNext();
      return;
    }
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => {
    const audio = document.getElementById("bg-music");
    if (!audio) return;

    let fadeIn;
    let fadeOut;

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
      if (fadeIn) clearInterval(fadeIn);
      if (fadeOut) clearInterval(fadeOut);
    };
  }, [musicOn]);

  const handleAnswer = (option) => {
    if (selected) return;
    const correct = option === questions[currentIndex].answer;
    setSelected(option);
    setPopupContent({ correct, option });
    setShowPopup(true);
    if (correct) {
      setScore(score + 1);
      if (confettiOn) {
        confetti({
          particleCount: 150,
          spread: 100,
          startVelocity: 30,
          ticks: 200,
          gravity: 0.5,
          colors: ["#4ade80", "#22d3ee", "#facc15"],
          origin: { y: 0.6 },
        });
      }
    }
    setTimeout(() => {
      setShowPopup(false);
      handleNext();
    }, 1200);
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelected(null);
      setTimeLeft(10);
    } else {
      navigate("/result");
    }
  };

  if (!questions.length)
    return (
      <p className="text-center mt-10 text-white text-xl font-semibold">
        Loading questions...
      </p>
    );

  const q = questions[currentIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white relative">
      {/* Top controls */}
      <div className="flex justify-end gap-3 w-full max-w-xl mb-6">
        <button
          onClick={() => setMusicOn(!musicOn)}
          className="p-3 bg-white bg-opacity-20 hover:bg-opacity-40 rounded-full shadow-lg transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
          aria-label={musicOn ? "Mute background music" : "Play background music"}
          title={musicOn ? "Mute background music" : "Play background music"}
        >
          {musicOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>

        <button
          onClick={() => setConfettiOn(!confettiOn)}
          className="p-3 bg-white bg-opacity-20 hover:bg-opacity-40 rounded-full shadow-lg transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
          aria-label={confettiOn ? "Disable confetti" : "Enable confetti"}
          title={confettiOn ? "Disable confetti" : "Enable confetti"}
        >
          {confettiOn ? <Zap size={20} /> : <ZapOff size={20} />}
        </button>
      </div>

      {musicOn && (
        <audio id="bg-music" loop autoPlay hidden key={q.question}>
          <source src="/sounds/pixel-run.mp3" type="audio/mp3" />
        </audio>
      )}

      <div className="w-full max-w-xl bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-xl">
        {/* Question header */}
        <div className="flex justify-between items-center text-xl font-semibold mb-4 text-yellow-300 select-none">
          <span>
            Question{" "}
            <span className="font-bold text-white">
              {currentIndex + 1} / {questions.length}
            </span>
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-6 h-6" />{" "}
            <span className={`font-bold ${timeLeft <= 3 ? "text-red-400" : ""}`}>
              {timeLeft}s
            </span>
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 rounded-full bg-white/20 overflow-hidden mb-6">
          <div
            className={`h-full bg-yellow-400 transition-all duration-500 ease-out`}
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question & Options */}
        <AnimatePresence mode="wait">
          <motion.div
            key={q.question}
            initial={{ opacity: 0, x: 120 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -120 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-8 leading-snug tracking-tight">
              {q.question}
            </h2>
            <div className="grid gap-5">
              {q.options.map((opt) => {
                const isCorrect = opt === q.answer;
                const isSelected = opt === selected;
                let bgColor =
                  "bg-white text-gray-900 hover:bg-gray-200 shadow-md";
                if (selected) {
                  if (isCorrect) bgColor = "bg-green-500 text-white shadow-lg";
                  else if (isSelected) bgColor = "bg-red-500 text-white shadow-lg";
                  else bgColor = "bg-white text-gray-400 opacity-70 cursor-not-allowed";
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleAnswer(opt)}
                    disabled={!!selected}
                    className={`w-full px-6 py-4 rounded-2xl text-lg font-semibold transition transform focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-yellow-400 ${
                      bgColor
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Feedback Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.25 }}
            className="fixed top-1/3 left-1/2 transform -translate-x-1/2 bg-white text-gray-900 px-8 py-5 rounded-3xl shadow-2xl flex items-center gap-4 text-2xl font-bold z-50 select-none"
          >
            {popupContent.correct ? (
              <>
                <ThumbsUp className="text-green-600 w-8 h-8" /> Correct!
              </>
            ) : (
              <>
                <ThumbsDown className="text-red-600 w-8 h-8" /> Incorrect
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
