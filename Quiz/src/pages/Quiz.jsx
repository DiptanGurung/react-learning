import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import questionsData from "../data/Questions";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Clock, Volume2, VolumeX, ThumbsUp, ThumbsDown, Zap, ZapOff } from "lucide-react";

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
    const timer = setTimeout(() => {
      if (timeLeft > 0) setTimeLeft(timeLeft - 1);
      else handleNext();
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
      audio.play();
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
          colors: ['#4ade80', '#22d3ee', '#facc15'],
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
    return <p className="text-center mt-10 text-white">Loading questions...</p>;

  const q = questions[currentIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-gradient-to-br from-blue-800 to-purple-900 text-white">
      <div className="flex justify-end gap-2 w-full max-w-xl mb-4">
        <button
          onClick={() => setMusicOn(!musicOn)}
          className="p-2 bg-white text-black rounded-full shadow hover:bg-gray-200"
          aria-label={musicOn ? "Mute background music" : "Play background music"}
          title={musicOn ? "Mute background music" : "Play background music"}
        >
          {musicOn ? <Volume2 /> : <VolumeX />}
        </button>

        <button
          onClick={() => setConfettiOn(!confettiOn)}
          className="p-2 bg-white text-black rounded-full shadow hover:bg-gray-200"
          aria-label={confettiOn ? "Disable confetti" : "Enable confetti"}
          title={confettiOn ? "Disable confetti" : "Enable confetti"}
        >
          {confettiOn ? <Zap /> : <ZapOff />}
        </button>
      </div>

      {musicOn && (
        <audio id="bg-music" loop autoPlay hidden>
          <source src="/sounds/pixel-run.mp3" type="audio/mp3" />
        </audio>
      )}

      <div className="w-full max-w-xl">
        <div className="flex justify-between items-center text-xl mb-2">
          <span>Question {currentIndex + 1} / {questions.length}</span>
          <span className="flex items-center gap-1"><Clock className="w-5 h-5" /> {timeLeft}s</span>
        </div>
        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-green-400 transition-all duration-300 ease-out"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={q.question}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-6 leading-snug">
              {q.question}
            </h2>
            <div className="grid gap-4">
              {q.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  className={`w-full px-6 py-4 rounded-xl text-lg font-semibold transition shadow-lg focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-white/50 transform hover:scale-[1.02] ${selected
                    ? opt === q.answer
                      ? "bg-green-500 text-white"
                      : selected === opt
                        ? "bg-red-500 text-white"
                        : "bg-white text-black opacity-50"
                    : "bg-white text-black hover:bg-gray-200"
                    }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {showPopup && (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
              className="absolute top-1/3 left-1/2 transform -translate-x-1/2 bg-white text-black px-6 py-4 rounded-xl shadow-xl text-xl font-semibold flex items-center gap-3"
            >
              {popupContent.correct ? (
                <><ThumbsUp className="text-green-600 w-6 h-6" /> Correct!</>
              ) : (
                <><ThumbsDown className="text-red-600 w-6 h-6" /> Incorrect</>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
