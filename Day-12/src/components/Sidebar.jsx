import { useAppContext } from '../context/AppContext';
import {
  FileText,
  Search,
  Folder,
  FileCheck,
  Mic,
} from 'lucide-react';

export default function Sidebar() {
  const { setIsModalOpen } = useAppContext();

  return (
    <div className="w-72 bg-gradient-to-r from-blue-500 to-red-500 p-4 text-white h-screen">
      <div className="text-3xl font-bold mb-6 flex items-center drop-shadow-lg mt-4 ml-2">
        <span className="text-red-500">P</span>
        <span>hoenix</span>
      </div>

      <button
        className="w-full bg-green-600 py-2 rounded mt-5 mb-8 hover:bg-green-700 transition"
        onClick={() => setIsModalOpen(true)}
      >
        Create New Resume
      </button>

      {/* Navigation Links */}
      <nav className="space-y-4 ml-3">
        <p className="flex items-center space-x-2 cursor-pointer hover:underline">
          <FileText className="w-5 h-5" />
          <span>My Dashboard</span>
        </p>

        <p className="flex items-center justify-between cursor-pointer hover:underline">
          <span className="flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>Job Search</span>
          </span>
        </p>

        <p className="flex items-center space-x-2 cursor-pointer hover:underline">
          <Folder className="w-5 h-5" />
          <span>Sample Library</span>
        </p>

        <p className="flex items-center space-x-2 cursor-pointer hover:underline">
          <FileCheck className="w-5 h-5" />
          <span>Review My Resume</span>
        </p>

        <p className="flex items-center space-x-2 cursor-pointer hover:underline">
          <Mic className="w-5 h-5" />
          <span>AI Interview</span>
        </p>
      </nav>
    </div>
  );
}