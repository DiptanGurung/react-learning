import { TaskProvider } from './context/TaskContext';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import NavBar from './components/NavBar';

export default function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen">
        <NavBar />
        <div className="p-4 max-w-xl mx-auto">
          <AddTask />
          <TaskList />
        </div>
      </div>
    </TaskProvider>
  );
}
