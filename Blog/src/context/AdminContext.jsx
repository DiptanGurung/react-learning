import React, { createContext, useState, useContext } from 'react';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [post, setPost] = useState({ title: '', description: '', images: '' });
  const [posts, setPosts] = useState([]);

  const updateField = (field, value) => {
    setPost((prev) => ({ ...prev, [field]: value }));
  };

  const createPost = () => {
    console.log('Creating post:', post);
    setPost({ title: '', description: '', images: '' });
    setPosts((prev) => [...prev, post]);
  };

  return (
    <AdminContext.Provider value={{ post, posts, updateField, createPost }}>
      {children}
    </AdminContext.Provider>
  );
};
