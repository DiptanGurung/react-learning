import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './FontAwesome';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomePage from './pages/HomePage';
import BusList from './pages/BusList';
import BookingPage from './pages/Bookingpage';
import LoginPage from './pages/LoginPage';
import MyBookings from './pages/MyBookings';
import PrivateRoute from './components/PrivateRoute';
import AdminDashboard from './pages/AdminDashboard';
import AddBus from './pages/AddBus';
import BookingSummary from './pages/BookingSummary';
import AdminSeatMap from './pages/AdminSeatMap';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/buses" element={<BusList />} />
        <Route path="/book/:id" element={<BookingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/bookings" element={<MyBookings />} />
        <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>}/>
        <Route path="/admin-seatmap" element={<AdminSeatMap />} />
        <Route path="/admin/add-bus" element={<PrivateRoute><AddBus /></PrivateRoute>}/>
        <Route path="/summary" element={<BookingSummary />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
