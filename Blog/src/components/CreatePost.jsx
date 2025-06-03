import React from 'react';
import { useAdmin } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const { post, updateField, createPost } = useAdmin();
  const navigate = useNavigate();

  const handleCreatePost = async () => {
    try {
      createPost();
      navigate('/admin-panel');
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <div className="p-4 border rounded mt-4 space-y-4">
      <input
        className="w-full border p-2 rounded"
        placeholder="title"
        value={post.title}
        onChange={(e) => updateField('title', e.target.value)}
      />
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Description"
        value={post.description}
        onChange={(e) => updateField('description', e.target.value)}
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="images"
        value={post.images}
        onChange={(e) => updateField('images', e.target.value)}
      />
      <button
        className="border p-2 rounded w-full"
        onClick={handleCreatePost}
      >
        Create Post
      </button>
    </div>
  );
};

export default CreatePost;
