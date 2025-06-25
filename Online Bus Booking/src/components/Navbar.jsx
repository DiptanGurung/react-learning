import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useBusContext } from '../context/BusContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, logoutUser, currentUser } = useBusContext();

  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <FontAwesomeIcon icon="bus-alt" className="text-2xl mr-2" />
            <Link to="/" className="text-xl font-bold">Book_your_Bus</Link>
          </div>

          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="hover:text-yellow-300">Home</Link>
            <Link to="/buses" className="hover:text-yellow-300">Search Buses</Link>
            <Link to="/bookings" className="hover:text-yellow-300">My Bookings</Link>
            <Link to="/admin" className="hover:text-yellow-300">Admin</Link>

            {!isLoggedIn ? (
              <>
                <Link to="/login" className="hover:text-yellow-300">
                  <FontAwesomeIcon icon="user" className="mr-1" /> Login
                </Link>
                <Link to="/signup" className="hover:text-yellow-300">
                  <FontAwesomeIcon icon="user-plus" className="ml-3 mr-1" /> Signup
                </Link>
              </>
            ) : (
              <>
                <span className="mr-3">Welcome, {currentUser?.name || 'User'}</span>
                <button onClick={logoutUser} className="hover:text-yellow-300 flex items-center">
                  <FontAwesomeIcon icon="sign-in-alt" className="mr-1" /> Logout
                </button>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              <FontAwesomeIcon icon="bars" className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link to="/" className="block hover:text-yellow-300">Home</Link>
          <Link to="/buses" className="block hover:text-yellow-300">Search Buses</Link>
          <Link to="/bookings" className="block hover:text-yellow-300">My Bookings</Link>
          <Link to="/admin" className="block hover:text-yellow-300">Admin</Link>

          {!isLoggedIn ? (
            <>
              <Link to="/login" className="block hover:text-yellow-300">
                <FontAwesomeIcon icon="user" className="mr-1" /> Login
              </Link>
              <Link to="/signup" className="block hover:text-yellow-300">
                <FontAwesomeIcon icon="user-plus" className="mr-1" /> Signup
              </Link>
            </>
          ) : (
            <>
              <span className="block mb-2">Welcome, {currentUser?.name || 'User'}</span>
              <button onClick={logoutUser} className="block hover:text-yellow-300 flex items-center">
                <FontAwesomeIcon icon="sign-in-alt" className="mr-1" /> Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
