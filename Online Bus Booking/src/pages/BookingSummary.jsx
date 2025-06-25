import React, { useEffect, useState, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Confetti from 'react-confetti';
import { useReactToPrint } from 'react-to-print';
import { QRCodeCanvas } from 'qrcode.react';

const BookingSummary = () => {
  const location = useLocation();
  const booking = location.state;
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [showConfetti, setShowConfetti] = useState(true);
  const componentRef = useRef();

  useEffect(() => {
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);

    const timer = setTimeout(() => setShowConfetti(false), 7000);

    const audio = new Audio('sounds/success.mp3');
    audio.play();

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if (!booking) {
    return (
      <div className="p-6 text-red-600">
        <strong>Error:</strong> No booking data found.
      </div>
    );
  }

  const qrData = JSON.stringify({
    name: booking.name,
    route: booking.route,
    date: booking.date,
    time: booking.time,
    seats: booking.selectedSeats,
    total: booking.seats * booking.price,
  });

  return (
    <div className="min-h-screen bg-white p-6 max-w-xl mx-auto text-center relative">
      {showConfetti && <Confetti width={dimensions.width} height={dimensions.height} />}

      <div ref={componentRef} className="bg-gray-100 rounded-xl shadow-md p-6 text-left space-y-3">
        <h2 className="text-3xl font-bold text-green-600 mb-4 flex items-center justify-center">
          <FontAwesomeIcon icon="check-circle" className="mr-2" />
          Booking Confirmed!
        </h2>

        <p><strong>Name:</strong> {booking.name}</p>
        <p><strong>Route:</strong> {booking.route}</p>
        <p><strong>Date:</strong> {booking.date}</p>
        <p><strong>Time:</strong> {booking.time}</p>
        <p><strong>Seats:</strong> {booking.selectedSeats.join(', ')}</p>
        <p><strong>Total:</strong> NPR {booking.seats * booking.price}</p>

        <div className="mt-4 flex justify-center">
          <QRCodeCanvas value={qrData} size={150} />
        </div>
      </div>

      <div className="mt-6 space-x-4 flex justify-center">
        <button
          onClick={handlePrint}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Print / Download Ticket
        </button>

        <Link
          to="/"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Home
        </Link>

        <Link
          to="/bookings"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          My Bookings
        </Link>
      </div>
    </div>
  );
};

export default BookingSummary;
