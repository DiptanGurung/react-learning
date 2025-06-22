import React from 'react';
import { useBusContext } from '../context/BusContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AdminDashboard = () => {
  const { bookings } = useBusContext();

  if (!bookings) return <p>Loading bookings...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">
        <FontAwesomeIcon icon="tools" className="mr-2" />
        Admin Dashboard
      </h2>

      <div className="bg-white rounded-xl p-4 shadow-md">
        <h3 className="text-xl font-semibold mb-4">
          <FontAwesomeIcon icon="clipboard-list" className="mr-2" />
          All Bookings
        </h3>
        {bookings.length === 0 ? (
          <p>No bookings made yet.</p>
        ) : (
          bookings.map((b) => (
            <div key={b.id} className="border-b py-2">
              <p><strong>{b.name}</strong> booked {b.seats} seat(s) on {b.route}</p>
              <p className="text-sm text-gray-600">
                {b.date} at {b.time} | Total: NPR {b.seats * b.price}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
