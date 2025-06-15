import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleChangePassword = () => {
    navigate('/change-password');
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow-md border-b relative">
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>
        <Link to="/help" className="hover:underline">Help</Link>
        {user?.role === 'admin' && (
          <Link to="/admin-panel" className="hover:underline">Admin Panel</Link>
        )}
      </div>

      <div className="space-x-4 relative">
        {user ? (
          <>
            <span>Welcome, {user.email}</span>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
            >
              Menu
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                <button
                  onClick={handleChangePassword}
                  className="block w-full text-left px-4 py-2 hover:bg-blue-100 text-blue-600"
                >
                  Change Password
                </button>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
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
