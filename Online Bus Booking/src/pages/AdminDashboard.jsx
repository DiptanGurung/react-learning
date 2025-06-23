import React from 'react';
import { useBusContext } from '../context/BusContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  let context;
  try {
    context = useBusContext();
    if (!context || !context.bookings) throw new Error('Context unavailable');
  } catch (error) {
    return (
      <div className="p-6 text-red-600">
        <strong>Admin Error:</strong> {error.message}
      </div>
    );
  }

  const { bookings } = context;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">
        <FontAwesomeIcon icon="tools" className="mr-2" />
        Admin Dashboard
      </h2>

      <Link
        to="/admin/add-bus"
        className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4"
      >
        <FontAwesomeIcon icon="plus" className="mr-1" />
        Add New Bus
      </Link>

      <div className="bg-white rounded-xl p-4 shadow-md">
        <h3 className="text-xl font-semibold mb-4">
          <FontAwesomeIcon icon="clipboard-list" className="mr-2" />
          All Bookings
        </h3>

        {bookings.length === 0 ? (
          <p className="text-gray-500 italic">No bookings made yet.</p>
        ) : (
          bookings.map((b) => (
            <div key={b.id} className="border-b py-2">
              <p>
                <strong>{b.name}</strong> booked {b.seats} seat(s) on {b.route}
              </p>
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
