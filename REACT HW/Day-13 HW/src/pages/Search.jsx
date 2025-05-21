// pages/Search.jsx
import { useState } from 'react';
import { Playlists } from '../data/Playlists';
import { testTrack } from '../data/tracks'; // Assume you have a tracks.js or merge tracks from playlists
import PlaylistCard from '../components/PlaylistCard';
import { useAudio } from '../context/AudioContext';
import PageWrapper from '../components/PageWrapper';

function Search() {
  const { dispatch } = useAudio();
  const [query, setQuery] = useState('');

  // Gather all tracks from playlists
  const allTracks = playlists.flatMap(p => p.tracks || []);

  // Filter tracks and playlists by query (case-insensitive)
  const filteredTracks = allTracks.filter(
    (t) =>
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      t.artist.toLowerCase().includes(query.toLowerCase())
  );
  const filteredPlaylists = Playlists.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  const playTrack = (track) => {
    dispatch({ type: 'SET_TRACK', payload: track });
    dispatch({ type: 'PLAY' });
  };

  return (
    <PageWrapper>
      <div>
        <h1 className="text-5xl font-bold neon-text mb-6">Search NEOSonic</h1>
        <input
          type="text"
          placeholder="Search tracks or playlists..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 mb-8 rounded-lg bg-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

        {query ? (
          <>
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">Tracks</h2>
              {filteredTracks.length ? (
                <div className="space-y-4">
                  {filteredTracks.map((track) => (
                    <div
                      key={track.id}
                      className="flex items-center justify-between bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 cursor-pointer"
                      onClick={() => playTrack(track)}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={track.cover}
                          alt={track.title}
                          className="w-12 h-12 rounded"
                        />
                        <div>
                          <h3 className="text-lg font-semibold">{track.title}</h3>
                          <p className="text-sm text-zinc-400">{track.artist}</p>
                        </div>
                      </div>
                      <button className="text-green-500">▶</button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-400">No matching tracks found.</p>
              )}
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Playlists</h2>
              {filteredPlaylists.length ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filteredPlaylists.map((p) => (
                    <PlaylistCard key={p.id} playlist={p} />
                  ))}
                </div>
              ) : (
                <p className="text-zinc-400">No matching playlists found.</p>
              )}
            </section>
          </>
        ) : (
          <p className="text-zinc-400">Start typing to search tracks or playlists.</p>
        )}
      </div>
    </PageWrapper>
  );
}

export default Search;
