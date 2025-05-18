import { useTodo } from "../context/TodoContext";

export default function TodoItem({ todo }) {
  const { toggleTodo, deleteTodo, editTodo } = useTodo();

  const handleEdit = () => {
    const newText = prompt("Edit your todo:", todo.text);
    if (newText !== null && newText.trim() !== "") {
      editTodo(todo.id, newText.trim());
    }
  };

  return (
    <>
      <li
        className={`flex items-center justify-between px-4 py-2 rounded bg-gray-800 border border-gray-700 ${todo.completed ? "line-through text-gray-500" : ""
          }`}
      >
        <button
          onClick={() => toggleTodo(todo.id)}
          className="text-left flex-1 cursor-pointer focus:outline-none"
          title="Toggle Complete"
          aria-checked = {todo.completed}
        >
          {todo.text}
        </button>
        <div className="flex items-center space-x-4 ml-4">
          <button
            onClick={handleEdit}
            className="text-blue-400 hover:text-blue-600"
            title="Edit Todo"
          >
            Edit
          </button>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="text-red-500 hover:text-red-700"
            title="Delete Todo"
          >
            Delete
          </button>
        </div>
      </li>
    </>
  );
}
