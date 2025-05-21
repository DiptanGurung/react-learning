import { Playlists as playlists } from '../data/Playlists';
import PageWrapper from '../components/PageWrapper';
import { Link } from 'react-router-dom';

export default function Playlists() {
  return (
    <PageWrapper>
      <h1 className="text-4xl font-bold mb-8 text-pink-500 neon-text">Playlists</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {playlists.map((playlist) => (
          <Link
            to={`/playlist/${playlist.id}`}
            key={playlist.id}
            className="group bg-zinc-900 rounded-xl overflow-hidden shadow-lg hover:shadow-neon-pink transition-shadow"
          >
            <img
              src={playlist.cover}
              alt={playlist.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-neonPink group-hover:animate-pulse">
                {playlist.title}
              </h2>
              <p className="text-zinc-400 text-sm mt-1">{playlist.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </PageWrapper>
  );
}
