import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from "./components/Navbar";
import AdminNavBar from "./components/AdminNavbar";
import LandingPage from "./components/LandingPage";
import LogIn from './components/LogIn';
import CreatePost from './components/CreatePost';
import Register from './components/Register';
import AdminPage from './components/AdminPage';
import AdminPanel from './components/AdminPanel';
import { UserProvider, UserContext } from './context/UserContext';
import { AdminProvider } from './context/AdminContext';
import React, { useContext } from 'react';

const Layout = ({ children }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex flex-col min-h-screen">
      {user?.role === 'admin' ? <AdminNavBar /> : <Navbar />}
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
};

const App = () => {
  return (
    <UserProvider>
      <AdminProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin-panel" element={<AdminPanel />} />
              <Route path="/admin-panel/create-post" element={<CreatePost />} />
            </Routes>
          </Layout>
        </Router>
      </AdminProvider>
    </UserProvider>
  );
};

export default App;
