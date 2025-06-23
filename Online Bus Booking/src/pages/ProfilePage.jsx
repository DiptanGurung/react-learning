import React, { useState } from 'react';
import { useBusContext } from '../context/BusContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProfilePage = () => {
  const { currentUser, bookings, setBookings, logoutUser } = useBusContext();
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [editing, setEditing] = useState(false);

  if (!currentUser) {
    return (
      <div className="p-6 text-center text-red-600">
        Please log in to view your profile.
      </div>
    );
  }

  const userBookings = bookings.filter(b => b.userId === currentUser.id);

  const handleSave = () => {
    // For demo, just update local state — you can expand to update context or backend
    currentUser.name = name;
    currentUser.email = email;
    setEditing(false);
    alert('Profile updated!');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-3xl font-bold mb-6 text-blue-700 flex items-center">
        <FontAwesomeIcon icon="user" className="mr-2" />
        My Profile
      </h2>

      <div className="mb-6">
        <label className="block font-semibold mb-1">Name:</label>
        {editing ? (
          <input
            className="w-full p-2 border rounded"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        ) : (
          <p>{name}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-1">Email:</label>
        {editing ? (
          <input
            className="w-full p-2 border rounded"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        ) : (
          <p>{email}</p>
        )}
      </div>

      {editing ? (
        <div className="space-x-4">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Save
          </button>
          <button
            onClick={() => setEditing(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setEditing(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Edit Profile
        </button>
      )}

      <hr className="my-6" />

      <h3 className="text-2xl font-semibold mb-4">My Bookings</h3>

      {userBookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <ul className="space-y-3">
          {userBookings.map((b) => (
            <li key={b.id} className="border rounded p-3 bg-gray-50">
              <p>
                <strong>Route:</strong> {b.route}
              </p>
              <p>
                <strong>Date:</strong> {b.date} at {b.time}
              </p>
              <p>
                <strong>Seats:</strong> {b.selectedSeats.join(', ')}
              </p>
              <p>
                <strong>Total:</strong> NPR {b.seats * b.price}
              </p>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={logoutUser}
        className="mt-8 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
