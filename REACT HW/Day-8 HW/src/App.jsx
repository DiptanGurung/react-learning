import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TodoProvider } from "./context/TodoContext";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

export default function App() {

  return (
    <>
      <TodoProvider>
        <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-4">To-Do List</h1>
          <TodoInput />
          <TodoList />
        </div>
      </TodoProvider>
    </>
  )
}


