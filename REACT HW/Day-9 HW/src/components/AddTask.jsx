import { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

export default function AddTask() {
  const [text, setText] = useState('');
  const { addTask } = useContext(TaskContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTask(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-4 mr-5">
      <input
        className="border p-2 w-full"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add task"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded whitespace-nowrap">
        Add Task
      </button>
    </form>
  );
}
