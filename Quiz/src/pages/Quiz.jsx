import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import questionsData from "../data/questions";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Volume2, VolumeX } from "lucide-react";

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
  } = useQuiz();
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
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
    setSelected(option);
    if (option === questions[currentIndex].answer) setScore(score + 1);
    setTimeout(() => handleNext(), 1000);
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6 relative">
      <button
        onClick={() => setMusicOn(!musicOn)}
        className="absolute top-4 right-4 p-2 bg-white text-black rounded-full shadow hover:bg-gray-200"
      >
        {musicOn ? <Volume2 /> : <VolumeX />}
      </button>

      {musicOn && (
        <audio id="bg-music" loop autoPlay hidden>
          <source src="/sounds/pixel-run.mp3" type="audio/mp3" />
        </audio>
      )}

      <div className="w-full max-w-xl mb-6">
        <div className="flex justify-between items-center text-xl mb-2">
          <span>Question {currentIndex + 1} / {questions.length}</span>
          <span className="flex items-center gap-1"><Clock className="w-5 h-5" /> {timeLeft}s</span>
        </div>
        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-400 transition-all duration-300 ease-out"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.question}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xl text-center"
        >
          <h2 className="text-3xl font-bold mb-6 leading-snug text-white">
            {q.question}
          </h2>
          <div className="grid gap-4">
            {q.options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                className={`w-full px-6 py-4 rounded-xl text-lg font-semibold transition shadow-lg focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-white/50 transform hover:scale-[1.02] ${
                  selected === opt
                    ? opt === q.answer
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}