import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBusContext } from '../context/BusContext';

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addBooking, buses } = useBusContext();

  const bus = buses.find((b) => b.id === parseInt(id));
  const [name, setName] = useState('');
  const [seats, setSeats] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    addBooking({
      id: Date.now(),
      name,
      route: `${bus.from} → ${bus.to}`,
      date: bus.date,
      time: bus.time,
      seats,
      price: bus.price,
    });
    navigate('/bookings');
  };

  if (!bus) return <div className="p-6">Bus not found</div>;

  return (
    <div className="min-h-screen bg-white p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">
        <FontAwesomeIcon icon="pen" className="mr-2" />
        Book {bus.name}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          required
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Number of Seats"
          min={1}
          required
          className="w-full p-2 border rounded"
          value={seats}
          onChange={(e) => setSeats(Number(e.target.value))}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
