// components/PlaylistCard.jsx
import { Link } from 'react-router-dom';

export default function PlaylistCard({ playlist }) {
  return (
    <Link to={`/playlist/${playlist.id}`}>
      <div className="bg-gradient-to-br from-pink-500/20 to-purple-700/20 border border-pink-500/30 p-4 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-200 hover:bg-pink-500/30">
        <img
          src={playlist.cover}
          alt={playlist.title}
          className="rounded-xl w-full h-48 object-cover mb-3"
        />
        <h3 className="text-lg font-bold">{playlist.title}</h3>
        <p className="text-sm text-zinc-300">{playlist.description}</p>
      </div>
    </Link>
  );
}
