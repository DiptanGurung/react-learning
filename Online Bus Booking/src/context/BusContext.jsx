import React, { createContext, useContext, useState } from 'react';

const BusContext = createContext();

const initialBuses = [
  {
    id: 1,
    name: 'Deluxe Travels',
    from: 'Kathmandu',
    to: 'Pokhara',
    time: '08:00 AM',
    date: '2025-06-25',
    price: 1200,
    reservedSeats: [],
  },
  {
    id: 2,
    name: 'Mountain Express',
    from: 'Kathmandu',
    to: 'Chitwan',
    time: '10:30 AM',
    date: '2025-06-25',
    price: 1000,
    reservedSeats: [],
  },
  {
    id: 3,
    name: 'NightLine Service',
    from: 'Pokhara',
    to: 'Butwal',
    time: '09:00 PM',
    date: '2025-06-26',
    price: 950,
    reservedSeats: [],
  },
];

export const BusProvider = ({ children }) => {
  const [buses, setBuses] = useState(initialBuses);
  const [bookings, setBookings] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const addBooking = (newBooking) => {
    const bookingWithUser = {
      ...newBooking,
      userId: currentUser?.id || null,
    };

    const isDuplicate = bookings.some((b) =>
      b.userId === bookingWithUser.userId &&
      b.route === bookingWithUser.route &&
      b.date === bookingWithUser.date &&
      b.time === bookingWithUser.time &&
      b.selectedSeats.some((seat) =>
        bookingWithUser.selectedSeats.includes(seat)
      )
    );

    if (isDuplicate) {
      alert("You've already booked one or more of these seats.");
      return;
    }

    setBookings((prev) => [...prev, bookingWithUser]);

    setBuses((prevBuses) =>
      prevBuses.map((bus) =>
        bus.name === bookingWithUser.name &&
        bus.from === bookingWithUser.route.split(' → ')[0] &&
        bus.to === bookingWithUser.route.split(' → ')[1]
          ? {
              ...bus,
              reservedSeats: [
                ...(bus.reservedSeats || []),
                ...bookingWithUser.selectedSeats,
              ],
            }
          : bus
      )
    );
  };

  const addBus = (newBus) => {
    setBuses((prev) => [
      ...prev,
      { id: Date.now(), reservedSeats: [], ...newBus },
    ]);
  };

  const loginUser = (user) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  return (
    <BusContext.Provider
      value={{
        buses,
        setBuses,
        bookings,
        setBookings,
        addBooking,
        addBus,
        isLoggedIn,
        loginUser,
        logoutUser,
        currentUser,
      }}
    >
      {children}
    </BusContext.Provider>
  );
};

export const useBusContext = () => useContext(BusContext);
