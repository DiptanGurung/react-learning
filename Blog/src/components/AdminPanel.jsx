import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Navigate } from 'react-router-dom';
import { AdminProvider } from '../context/AdminContext';
import CreatePost from './CreatePost';

const AdminPanel = () => {
  const { user } = useContext(UserContext);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return (
    <AdminProvider>
      <div className="space-y-4">
        <CreatePost />
      </div>
    </AdminProvider>
  );
};

export default AdminPanel;
