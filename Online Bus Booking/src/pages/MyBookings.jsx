import React from 'react';
import { useBusContext } from '../context/BusContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MyBookings = () => {
  const { bookings } = useBusContext();

  return (
    <div className="min-h-screen bg-white p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        <FontAwesomeIcon icon="clipboard-list" className="mr-2" />
        My Bookings
      </h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((b) => (
          <div
            key={b.id}
            className="border rounded p-4 mb-3 shadow-sm hover:shadow-md transition"
          >
            <p><strong>Name:</strong> {b.name}</p>
            <p><strong>Route:</strong> {b.route}</p>
            <p><strong>Date:</strong> {b.date}</p>
            <p><strong>Time:</strong> {b.time}</p>
            <p><strong>Seats:</strong> {b.seats}</p>
            <p><strong>Total:</strong> NPR {b.seats * b.price}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBookings;
