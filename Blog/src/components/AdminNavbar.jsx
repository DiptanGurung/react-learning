import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminNavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-around p-4 border rounded">
      <button onClick={() => navigate('/admin-panel/create-post')}>
        Create Post
      </button>
      <button onClick={() => navigate('/admin-panel/posts')}>
        View All Posts
      </button>
      <button onClick={() => navigate('/admin-panel/settings')}>
        Setting
      </button>
    </div>
  );
};

export default AdminNavBar;
