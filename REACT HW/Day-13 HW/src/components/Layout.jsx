// components/Layout.jsx
import Navbar from './Navbar';
import Player from './Player';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white">
      <Navbar />
      <main className="p-6 max-w-7xl mx-auto">{children}</main>
      <Player />
    </div>
  );
}
