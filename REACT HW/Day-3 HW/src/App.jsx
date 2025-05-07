import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState('');

  return (
    <>
<div className="bg-purple-500 w-full text-center py-4 text-xl font-bold underline">
        TO - DO - LIST
</div>

<div className="bg-blue-300 w-full text-center py-4 text-lg font-medium">
        
    <div className="mt-4 flex justify-center items-center gap-10">
          <input
            type="text" 
            placeholder="Enter a task"
            value={task}
            onClick={(e) => setTask(e.target.value)}
              className="p-2 border rounded w-[500px] text-center"
          />
          <button onClick={()=> setTask({task})} className="bg-blue-600 text-white px-4 py-2 rounded w-[100px]">
            Add
          </button>
    </div>
</div>

<div className="flex flex-col justify-center text-xl font-bold underline gap-2 bg-green-500 h-[550px] mb-8">
        CURRENT TASKS
    <div className='bg-gray-300 h-[500px] w-full text-center py-4 text-lg flex flex-col justify-between items-center'>
        {task}
    </div>
</div>
</>
  )
}

export default App
