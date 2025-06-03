import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useAdmin } from '../context/AdminContext';

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const { posts, deletePost } = useAdmin();

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Landing Page</h1>

      {!user ? (
        <p className="text-center text-gray-600">Please log in to view user blogs.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div key={index} className="bg-white shadow-md rounded p-4 relative">
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="mt-2 text-gray-700">{post.description}</p>
                {post.images && (
                  <img
                    src={post.images}
                    alt={post.title}
                    className="mt-2 w-full h-40 object-cover rounded"
                  />
                )}

                {user.role === 'admin' && (
                  <button
                    onClick={() => deletePost(index)}
                    className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">No blog posts yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LandingPage;
