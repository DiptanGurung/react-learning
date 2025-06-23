import React from 'react';
import { useBusContext } from '../context/BusContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AdminSeatMap = () => {
  const { buses, bookings, setBookings, setBuses } = useBusContext();

  // Cancel booking by seat on a bus
  const cancelSeat = (busId, seatNumber) => {
    if (!window.confirm(`Cancel booking for seat ${seatNumber}?`)) return;

    // Remove booking(s) with this seat on this bus
    setBookings((prev) =>
      prev.filter(
        (b) =>
          !(b.route.includes(buses.find((bus) => bus.id === busId)?.from) &&
            b.selectedSeats.includes(seatNumber))
      )
    );

    // Remove seat from reservedSeats
    setBuses((prev) =>
      prev.map((bus) =>
        bus.id === busId
          ? {
              ...bus,
              reservedSeats: bus.reservedSeats.filter((s) => s !== seatNumber),
            }
          : bus
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
            {bus.name} ({bus.from} → {bus.to})
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
                  className={`py-2 rounded text-sm font-bold ${
                    isReserved
                      ? 'bg-red-600 text-white hover:bg-red-700 cursor-pointer'
                      : 'bg-green-200 text-gray-700 cursor-default'
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
