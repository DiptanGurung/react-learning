import React, { createContext, useState, useContext } from 'react';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [post, setPost] = useState({ title: '', description: '', images: '' });

  const updateField = (field, value) => {
    setPost((prev) => ({ ...prev, [field]: value }));
  };

  const createPost = () => {
    console.log('Creating post:', post);
    setPost({ title: '', description: '', images: '' });
  };

  return (
    <AdminContext.Provider value={{ post, updateField, createPost }}>
      {children}
    </AdminContext.Provider>
  );
};
