import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import { useState } from "react";

export default function Welcome() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleEnter = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/home");
    }, 2000); // 2 seconds delay
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-800 to-purple-900 text-white p-6"
    >
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center"
        >
          <Rocket className="w-16 h-16 animate-bounce text-yellow-400 mb-4" />
          <p className="text-xl font-medium mb-2">Preparing your quiz...</p>
          <div className="flex space-x-2">
            <div className="w-4 h-4 bg-yellow-400 rounded-full animate-bounce [animation-delay:0ms]"></div>
            <div className="w-4 h-4 bg-yellow-400 rounded-full animate-bounce [animation-delay:150ms]"></div>
            <div className="w-4 h-4 bg-yellow-400 rounded-full animate-bounce [animation-delay:300ms]"></div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <Rocket className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
          <h1 className="text-5xl font-bold mb-4">Welcome to Quiz Galaxy!</h1>
          <p className="text-lg text-purple-100 mb-10">
            Test your brain power across fun and challenging categories.
          </p>
          <button
            onClick={handleEnter}
            className="bg-yellow-400 text-black px-8 py-3 rounded-full text-lg font-bold shadow-lg hover:bg-yellow-300 transition"
          >
            Enter the Game
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
  