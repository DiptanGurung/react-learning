import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from "./components/Navbar";
import AdminNavBar from "./components/AdminNavbar";
import LandingPage from "./components/LandingPage";
import LogIn from './components/LogIn';
import Register from './components/Register';
import AdminPage from './components/AdminPage';
import AdminPanel from './components/AdminPanel';

import { UserProvider, UserContext } from './context/UserContext';
import { AdminProvider } from './context/AdminContext';

const Layout = ({ children }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex flex-col min-h-screen">
      {user?.role === 'admin' ? <AdminNavBar /> : <Navbar />}
      <main className="flex-1 p-4">{children}</main>
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
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>}
            />
            <Route
              path="/admin-panel"
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </AdminProvider>
  </UserProvider>
);

export default App;