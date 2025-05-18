import { useTodo } from "../context/TodoContext";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { todos} = useTodo();

  if (todos.length == 0) return <p className="text-gray-400">No tasks yet.</p>;

  return (
    <ul className="w-full max-w-md space-y-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}