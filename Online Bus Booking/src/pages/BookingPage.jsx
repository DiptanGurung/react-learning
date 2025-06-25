import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBusContext } from '../context/BusContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addBooking, buses, isLoggedIn, currentUser } = useBusContext();

  const bus = buses.find((b) => b.id === parseInt(id));
  const [name, setName] = useState(currentUser?.name || '');
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);


  if (!bus) return <div className="p-6">Bus not found</div>;

  const reserved = bus.reservedSeats || [];

  const handleSeatClick = (seatNumber) => {
    if (reserved.includes(seatNumber)) return;
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((s) => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLoggedIn || !currentUser) {
      alert('You must be logged in to make a booking.');
      return;

    }

    if (!selectedSeats.length) {
      alert('Please select at least one seat.');
      return;
    }

    const buses = {
      id: Date.now(),
      name,
      route: `${bus.from} → ${bus.to}`,
      date: bus.date,
      time: bus.time,
      seats: selectedSeats.length,
      selectedSeats,
      price: bus.price,
    };

    const booking = {
      id: Date.now(),
      name,
      route: `${bus.from} → ${bus.to}`,
      date: bus.date,
      time: bus.time,
      seats: selectedSeats.length,
      selectedSeats,
      price: bus.price,
    };

    addBooking(booking);
    navigate('/summary', { state: booking });
  };

  return (
    <div className="min-h-screen bg-white p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        <FontAwesomeIcon icon="ticket-alt" className="mr-2" />
        Book Seats on {bus.name}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Full Name"
          required
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div>
          <h3 className="font-semibold mb-2">Select Your Seats:</h3>

          <div className="flex space-x-4 text-sm mb-3">
            <span className="bg-green-200 px-2 py-1 rounded">Available</span>
            <span className="bg-red-500 text-white px-2 py-1 rounded">Selected</span>
            <span className="bg-gray-400 text-white px-2 py-1 rounded">Reserved</span>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {[...Array(40)].map((_, index) => {
              const seatNumber = index + 1;
              const isSelected = selectedSeats.includes(seatNumber);
              const isReserved = reserved.includes(seatNumber);

              return (
                <button
                  type="button"
                  key={seatNumber}
                  onClick={() => handleSeatClick(seatNumber)}
                  disabled={isReserved}
                  className={`w-full py-2 rounded text-sm font-bold transition ${isReserved
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : isSelected
                      ? 'bg-red-500 text-white'
                      : 'bg-green-200 hover:bg-green-300'
                    }`}
                >
                  Seat {seatNumber}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Confirm Booking ({selectedSeats.length} seat
          {selectedSeats.length !== 1 && 's'})
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
