import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { CheckCircle, Ban, Trash2 } from 'lucide-react';

export default function TaskList() {
  const { tasks, filter, searchTerm, updateStatus, deleteTask } = useContext(TaskContext);

  const filtered = tasks.filter(task => {
    const matchStatus = filter == 'all' || task.status == filter;
    const matchText = task.text.toLowerCase().includes(searchTerm);
    return matchStatus && matchText;
  });

  return (
    <div>
      {filtered.length == 0 && <p className="text-blue-500">No matching tasks.</p>}
      {filtered.map(task => (
        <div key={task.id} className="border p-3 mb-2 rounded shadow">
          <div className="flex justify-between items-center">
            <p>{task.text}</p>
            <div className="flex gap-2">
              <CheckCircle
                size={20}
                className="text-green-600 cursor-pointer"
                onClick={() => updateStatus(task.id, 'completed')}
              />
              <Ban
                size={20}
                className="text-yellow-600 cursor-pointer"
                onClick={() => updateStatus(task.id, 'block')}
              />
              <Trash2
                size={20}
                className="text-red-600 cursor-pointer"
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this task?')) {
                    deleteTask(task.id);
                  }
                }}
              />
            </div>
          </div>
          <p className="text-sm text-gray-400">Status: {task.status}</p>
        </div>
      ))}
    </div>
  );
}
