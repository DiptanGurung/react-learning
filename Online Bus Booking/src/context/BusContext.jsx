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
  },
  {
    id: 2,
    name: 'Mountain Express',
    from: 'Kathmandu',
    to: 'Chitwan',
    time: '10:30 AM',
    date: '2025-06-25',
    price: 1000,
  },
  {
    id: 3,
    name: 'NightLine Service',
    from: 'Pokhara',
    to: 'Butwal',
    time: '09:00 PM',
    date: '2025-06-26',
    price: 950,
  },
];

export const BusProvider = ({ children }) => {
  const [buses] = useState(initialBuses);
  const [bookings, setBookings] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const addBooking = (booking) => {
    setBookings((prev) => [...prev, booking]);
  };

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <BusContext.Provider value={{ buses, bookings, addBooking, isLoggedIn, login, logout }}>
      {children}
    </BusContext.Provider>
  );
};

export const useBusContext = () => useContext(BusContext);
