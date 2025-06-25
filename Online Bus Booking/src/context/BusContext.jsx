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

    setBookings((prev) => [...prev, bookingWithUser]);

    setBuses((prevBuses) =>
      prevBuses.map((bus) =>
        bus.name === newBooking.name &&
        bus.from === newBooking.route.split(' → ')[0] &&
        bus.to === newBooking.route.split(' → ')[1]
          ? {
              ...bus,
              reservedSeats: [
                ...(bus.reservedSeats || []),
                ...newBooking.selectedSeats,
              ],
            }
          : bus
      )
    );
  };

  const addBus = (newBus) => {
    setBuses((prev) => [...prev, { id: Date.now(), reservedSeats: [], ...newBus }]);
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
