import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Navigate } from 'react-router-dom';
import CreatePost from './CreatePost';
import { useAdmin } from '../context/AdminContext';

const AdminPanel = () => {
  const { user } = useContext(UserContext);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 border rounded space-y-4">
      <h2 className="text-2xl font-bold mb-4">Admin Panel - Create Post</h2>
      <CreatePost />
    </div>
  );
};

export default AdminPanel;
