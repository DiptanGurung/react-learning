import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { Filter, Search } from 'lucide-react';

export default function NavBar() {
  const { setFilter, setSearchTerm } = useContext(TaskContext);

  return (
    <nav className="flex gap-20 justify-center items-between bg-blue-300 py-5 mb-5">
      <button onClick={() => setFilter('all')}>All</button>
      <button onClick={() => setFilter('completed')}>Completed</button>
      <button onClick={() => setFilter('block')}>Blocked</button>
      <button onClick={() => setFilter('pending')}>Pending</button>
    </nav>
  );
}
