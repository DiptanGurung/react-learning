import React from 'react';
import AdminNavBar from '../components/AdminNavbar';
import CreatePost from '../components/CreatePost';

const AdminPage = () => {

  return (
    <div className="max-w-3xl mx-auto p-6 border rounded space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <CreatePost />
    </div>
  );
};

export default AdminPage;
