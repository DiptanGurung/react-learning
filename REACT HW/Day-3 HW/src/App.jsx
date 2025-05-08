import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [task, setTask] = useState('');
  const [savedTasks, setSavedTasks] = useState([]);
  
  const handleAddTask = () => {
    if (task.trim() === '') return;
    setSavedTasks([...savedTasks, task]);
    setTask('');
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = savedTasks.filter((_, i) => i !== index);
    setSavedTasks(updatedTasks);
  };

  return (
    <>
<div className="bg-blue-400 w-full text-center py-3 mb-3 text-xl font-bold border-4 border-x-black rounded-xl shadow-2xl">
    TO - DO - LIST WINDOW

<div className="bg-red-500 w-full text-center py-3 text-xl mt-4">
        
    <div className="mt-2 flex justify-center items-center gap-10">
          <input
            type="text" 
            placeholder="Enter a task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="p-2 border rounded w-[500px] text-center"
          />
          <button onClick={handleAddTask} className="bg-blue-600 text-white px-4 py-2 rounded w-[200px] drop-shadow-lg">
            Add Task
          </button>
        </div>
    </div>

<div className="flex flex-col text-xl font-bold gap-2 bg-white h-[500px] mb-7">
      <div className="flex flex-col text-xl font-bold gap-2 bg-white mt-5 underline">
        CURRENT SAVED TASKS
      </div>
          <div className="flex flex-col text-xl font-bold gap-2 bg-white mt-6">
            {savedTasks.map((savedTask, index) => (
              <div key={index} className="flex justify-around p-3 border-b">
                <span>{savedTask}</span>
                <button onClick={() => handleDeleteTask(index)} className="bg-red-600 text-white px-4 py-1 rounded flex flex-row justify-center items-center">
                  Delete
                </button>
              </div>
            ))}
          </div>
  </div>
</div>
</>
  )
}

export default App