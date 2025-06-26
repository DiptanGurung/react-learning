import React from 'react';
import { useBusContext } from '../context/BusContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MyBookings = () => {
  const {
    bookings,
    setBookings,
    buses,
    setBuses,
    currentUser,
    isLoggedIn,
  } = useBusContext();

  const userBookings = isLoggedIn
    ? bookings.filter((b) => b.userId === currentUser?.id)
    : [];

  const handleDelete = (id) => {
    const bookingToDelete = bookings.find((b) => b.id === id);
    if (!bookingToDelete) return;

    if (window.confirm('Are you sure you want to cancel this booking?')) {
      const updatedBookings = bookings.filter((b) => b.id !== id);
      setBookings(updatedBookings);

      setBuses((prev) =>
        prev.map((bus) =>
          bus.name === bookingToDelete.name &&
          bus.from === bookingToDelete.route.split(' → ')[0] &&
          bus.to === bookingToDelete.route.split(' → ')[1]
            ? {
                ...bus,
                reservedSeats: bus.reservedSeats.filter(
                  (s) => !bookingToDelete.selectedSeats.includes(s)
                ),
              }
            : bus
        )
      );

      alert('Booking cancelled and seats released.');
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        <FontAwesomeIcon icon="clipboard-list" className="mr-2" />
        My Bookings
      </h2>
      {userBookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        userBookings.map((b) => (
          <div
            key={b.id}
            className="border rounded p-4 mb-3 shadow-sm hover:shadow-md transition"
          >
            <p><strong>Name:</strong> {b.name}</p>
            <p><strong>Route:</strong> {b.route}</p>
            <p><strong>Date:</strong> {b.date}</p>
            <p><strong>Time:</strong> {b.time}</p>
            <p><strong>Seats:</strong> {b.selectedSeats?.join(', ')}</p>
            <p><strong>Total:</strong> NPR {b.seats * b.price}</p>
            <button
              onClick={() => handleDelete(b.id)}
              className="mt-2 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
            >
              Cancel Booking
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBookings;
