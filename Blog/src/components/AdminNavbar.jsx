import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';

const AdminNavbar = () => {
  const { logout } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu((prev) => !prev);

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-red-100 shadow-md border-b relative">
      <div className="space-x-6 flex items-center">
        <Link to="/admin" className="hover:underline font-bold text-red-600">Admin Dashboard</Link>
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>
        <Link to="/help" className="hover:underline">Help</Link>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleMenu}
          className="bg-red-300 px-5 py-1 rounded hover:bg-red-400"
        >
          <Settings className="h-4 w-5 inline-block mr-1" />
          Settings
        </button>
        {showMenu && (
          <div className="absolute right-0 mt-2 w-40 bg-white border shadow-md rounded z-10">
            <button
              onClick={logout}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNavbar;
