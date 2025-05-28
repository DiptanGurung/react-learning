import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const location = useLocation();

  // if (location.pathname.startsWith('/admin-panel')) {
  //   return null;
  // }

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow-md border-b">
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>
        <Link to="/help" className="hover:underline">Help</Link>
        {user?.role === 'admin' && (
          <Link to="/admin-panel" className="hover:underline">Admin Panel</Link>
        )}
      </div>
      <div className="space-x-4">
        {user ? (
          <>
            <span>Welcome, {user.name} ({user.role})</span>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
              Login
            </Link>
            <Link to="/register" className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
