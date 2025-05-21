import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Home from './pages/Home';
import Library from './pages/Library';
import Search from './pages/Search';
import Layout from './components/Layout';
import Playlist from './pages/Playlist';
import Playlists from './data/Playlists';
import NowPlaying from './pages/NowPlaying';
import { AudioProvider } from './context/AudioContext';
import { AnimatePresence } from 'framer-motion';

function App() {
  const location = useLocation();

  return (
    <AudioProvider>
      <Layout>
        <AnimatePresence mode="wait">
          <div className="flex h-screen bg-zinc-900 text-white">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto p-4">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<Home />} />
                  <Route path="/library" element={<Library />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/playlists" element={<Playlists />} />
                  <Route path="/playlist/:id" element={<Playlist />} />
                  <Route path="/now-playing" element={<NowPlaying />} />
                </Routes>
              </div>
              <Player />
            </div>
          </div>
        </AnimatePresence>
      </Layout>
    </AudioProvider>
  );
}

export default App;
