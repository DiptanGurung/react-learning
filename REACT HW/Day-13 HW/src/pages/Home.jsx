import { useAudio } from '../context/AudioContext';
import { testTrack } from '../data/tracks';
import { Playlists } from '../data/Playlists';
import PlaylistCard from '../components/PlaylistCard';
import PageWrapper from '../components/PageWrapper';

function Home() {
  const { dispatch } = useAudio();

  const handlePlay = () => {
    dispatch({ type: 'SET_TRACK', payload: testTrack });
    dispatch({ type: 'PLAY' });
  };

  return (
    <PageWrapper>
      <div>
        <h1 className="text-5xl font-bold neon-text mb-6">Welcome to NEOSonic</h1>
        <p className="text-zinc-400">Your ultimate cyberpunk music experience.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-zinc-800 p-4 rounded-lg hover:bg-zinc-700 transition">
            <img src={testTrack.cover} alt="cover" className="rounded mb-2" />
            <h2 className="text-xl font-semibold">{testTrack.title}</h2>
            <p className="text-sm text-zinc-400">{testTrack.artist}</p>
            <button
              onClick={handlePlay}
              className="mt-2 bg-green-500 hover:bg-green-600 px-4 py-1 text-sm rounded"
            >
              ▶ Play
            </button>
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-6">Featured Playlists</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Playlists.map((p) => (
              <PlaylistCard key={p.id} playlist={p} />
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Home;
