import React from 'react';
import { Heart, HeartOff, Trash2 } from 'lucide-react';

function Button({ liked, onClick, onDeleteClick}) {
  return (
    <div className="flex items-center space-x-4">
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-xl font-semibold ${
        liked ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'
      }`}
    >
      {liked ?  (
        <span>Like<HeartOff className="inline-block ml-2" /></span>
    ) : (<span>Like <Heart className="inline-block ml-2" /></span>
    )}
    </button>

     <button
        onClick={onDeleteClick}
        className="p-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
        title="Delete"
      >
        <Trash2 />
      </button>
    </div>
  );
}

export default Button;
