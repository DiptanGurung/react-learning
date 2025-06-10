import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, } from 'react-router-dom';
import Navbar from "./components/Navbar";
import AdminNavBar from "./components/AdminNavbar";
import LandingPage from "./components/LandingPage";
import LogIn from './components/LogIn';
import Register from './components/Register';
import AdminPage from './components/AdminPage';
import AdminPanel from './components/AdminPanel';
import OTPVerification from './components/OTPVerification';
import { UserProvider, UserContext } from './context/UserContext';
import { AdminProvider } from './context/AdminContext';

const Layout = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex flex-col min-h-screen">
      {user?.role === 'admin' ? <AdminNavBar /> : <Navbar />}
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => (
  <UserProvider>
    <AdminProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-otp" element={<OTPVerification />} />
            <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
            <Route path="/admin-panel" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
          </Route>
        </Routes>
      </Router>
    </AdminProvider>
  </UserProvider>
);

export default App;
