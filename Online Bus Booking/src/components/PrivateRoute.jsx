import React from 'react';
import { Navigate } from 'react-router-dom';
import { useBusContext } from '../context/BusContext';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useBusContext();

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
