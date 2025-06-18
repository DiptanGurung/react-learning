import { useState } from "react";

export default function QuestionCard({ question, answers, onAnswer }) {
  const [selected, setSelected] = useState(null);

  const handleClick = (ans) => {
    setSelected(ans);
    onAnswer(ans);
  };

  return (
    <div className="p-4 rounded-xl shadow-lg bg-white text-black">
      <h2 className="text-xl font-bold">{question}</h2>
      <div className="mt-4 grid gap-2">
        {answers.map((ans, i) => (
          <button
            key={i}
            onClick={() => handleClick(ans)}
            className={`btn-quiz ${
              selected === ans ? "bg-pink-500 text-white" : ""
            }`}
            disabled={selected !== null}
            aria-pressed={selected === ans}
          >
            {ans}
          </button>
        ))}
      </div>
    </div>
  );
}
