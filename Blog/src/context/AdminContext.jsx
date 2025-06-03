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
    if (!post.title || !post.description) {
      alert("Please fill out all required fields.");
      return;
    }

    setPosts((prev) => [...prev, post]);
    setPost({ title: '', description: '', images: '' });
  };

  const deletePost = (index) => {
    setPosts((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <AdminContext.Provider value={{ post, posts, updateField, createPost, deletePost }}>
      {children}
    </AdminContext.Provider>
  );
};
