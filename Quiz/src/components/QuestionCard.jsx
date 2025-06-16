export default function QuestionCard({ question, answers, onAnswer }) {
  return (
    <div className="p-4 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold">{question}</h2>
      <div className="mt-4 grid gap-2">
        {answers.map((ans, i) => (
          <button key={i} onClick={() => onAnswer(ans)} className="btn-quiz">
            {ans}
          </button>
        ))}
      </div>
    </div>
  );
}
