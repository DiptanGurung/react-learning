import { useState } from "react";
import { useTodo } from "../context/TodoContext";

export default function TodoInput() {
  const [text, setText] = useState("");
  const { addTodo } = useTodo();

  const handleAdd = () => {
    if (text.trim()) {
      addTodo(text);
      setText("");
    }
  };

  return (
    <div className="mb-4 flex gap-2">
      <input
        type="text"
        className="px-4 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none"
        placeholder="Enter a task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
}
