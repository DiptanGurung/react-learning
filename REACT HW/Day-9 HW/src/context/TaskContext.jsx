import { createContext, useState } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      status: 'pending',
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateStatus = (id, status) => {
    setTasks(prev =>
      prev.map(task =>
        task.id == id ? { ...task, status } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      updateStatus,
      deleteTask,
      filter,
      setFilter,
      searchTerm,
      setSearchTerm
    }}>
      {children}
    </TaskContext.Provider>
  );
};
  