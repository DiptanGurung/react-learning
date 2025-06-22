import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useBusContext } from '../context/BusContext';

const BusList = () => {
  const { buses } = useBusContext();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        <FontAwesomeIcon icon="search" className="mr-2" />
        Available Buses
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {buses.map((bus) => (
          <div
            key={bus.id}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              <FontAwesomeIcon icon="bus-alt" className="mr-2 text-blue-600" />
              {bus.name}
            </h3>
            <p className="text-gray-600 mb-1">
              <FontAwesomeIcon icon="ticket-alt" className="mr-2 text-gray-500" />
              {bus.from} → {bus.to}
            </p>
            <p className="text-gray-600 mb-1">
              <FontAwesomeIcon icon="calendar-alt" className="mr-2 text-gray-500" />
              {bus.date}
            </p>
            <p className="text-gray-600 mb-1">
              <FontAwesomeIcon icon="clock" className="mr-2 text-gray-500" />
              Departure: {bus.time}
            </p>
            <p className="text-blue-700 font-bold text-lg mt-2">
              NPR {bus.price}
            </p>
            <Link
              to={`/book/${bus.id}`}
              className="block mt-4 w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg"
            >
              Book Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusList;
