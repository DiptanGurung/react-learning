import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <i className="fas fa-bus-alt text-2xl mr-2"></i>
            <Link to="/" className="text-xl font-bold">
              Book_your_Bus
            </Link>
          </div>

          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-yellow-300">Home</Link>
            <Link to="/buses" className="hover:text-yellow-300">Search Buses</Link>
            <Link to="/bookings" className="hover:text-yellow-300">My Bookings</Link>
            <Link to="/admin" className="hover:text-yellow-300">Admin</Link>
            <Link to="/login" className="hover:text-yellow-300">
              <i className="fas fa-user mr-1"></i> Login
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              <i className="fas fa-bars text-xl"></i>
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
          <Link to="/login" className="block hover:text-yellow-300">
            <i className="fas fa-user mr-1"></i> Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
