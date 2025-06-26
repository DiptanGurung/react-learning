import React from 'react';
import { useBusContext } from '../context/BusContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AdminSeatMap = () => {
  const { buses, bookings, setBookings, setBuses } = useBusContext();

  const cancelSeat = (busId, seatNumber) => {
    const bus = buses.find((bus) => bus.id === busId);
    if (!bus || !window.confirm(`Cancel booking for seat ${seatNumber}?`)) return;

    const fullRoute = `${bus.from} → ${bus.to}`;

    setBookings((prevBookings) =>
      prevBookings
        .map((booking) =>
          booking.route === fullRoute &&
            booking.date === bus.date &&
            booking.time === bus.time &&
            booking.selectedSeats.includes(seatNumber)
            ? {
              ...booking,
              selectedSeats: booking.selectedSeats.filter((s) => s !== seatNumber),
              seats: booking.seats - 1,
            }
            : booking
        )
        .filter((b) => b.selectedSeats.length > 0)
    );

    setBuses((prev) =>
      prev.map((b) =>
        b.id === busId
          ? {
            ...b,
            reservedSeats: b.reservedSeats.filter((s) => s !== seatNumber),
          }
          : b
      )
    );
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">
        <FontAwesomeIcon icon="map" className="mr-2" />
        Admin Seat Map
      </h2>

      {buses.map((bus) => (
        <div
          key={bus.id}
          className="bg-white shadow rounded-lg mb-8 p-6 border border-gray-300"
        >
          <h3 className="text-xl font-semibold mb-3">
            {bus.name} ({bus.from} → {bus.to}) on {bus.date} at {bus.time}
          </h3>
          <div className="grid grid-cols-8 gap-2">
            {[...Array(40)].map((_, idx) => {
              const seatNum = idx + 1;
              const isReserved = bus.reservedSeats.includes(seatNum);
              return (
                <button
                  key={seatNum}
                  onClick={() => isReserved && cancelSeat(bus.id, seatNum)}
                  disabled={!isReserved}
                  aria-disabled={!isReserved}
                  className={`py-2 rounded text-sm font-bold ${isReserved
                      ? 'bg-gray-600 text-white hover:bg-gray-700 cursor-pointer'
                      : 'bg-green-200 text-gray-700 cursor-not-allowed'
                    }`}
                  title={isReserved ? 'Click to cancel booking' : 'Available'}
                >
                  {seatNum}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminSeatMap;
