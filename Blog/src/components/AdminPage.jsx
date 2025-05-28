import React from 'react';
import AdminNavBar from '../components/AdminNavbar';
import CreatePost from '../components/CreatePost';

const AdminPage = () => {
  
  return (
    <div className="max-w-2xl mx-auto border p-6 rounded space-y-4">
      <div className="border p-2 rounded w-fit">Admin</div>
      <AdminNavBar />
      <CreatePost />
    </div>
  );
};

export default AdminPage;
