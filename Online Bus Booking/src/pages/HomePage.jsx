import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">
          <FontAwesomeIcon icon="bus-alt" className="mr-2" />
          Welcome to Book_your_Bus
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Book your journey quickly and easily with our reliable online bus booking system.
        </p>
        <Link
          to="/buses"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          <FontAwesomeIcon icon="search" className="mr-2" />
          Search Buses
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
