import { NavLink } from 'react-router-dom';
import { Home, Music, Search, ListMusic } from 'lucide-react';

export default function Navbar() {
  const navItems = [
    { to: '/', label: 'Home', icon: <Home size={20} /> },
    { to: '/search', label: 'Search', icon: <Search size={20} /> },
    { to: '/playlists', label: 'Playlists', icon: <ListMusic size={20} /> },
  ];

  return (
    <nav className="bg-zinc-900 border-b border-zinc-700 p-4 flex gap-8 justify-center sticky top-0 z-40 shadow-neon-pink">
      {navItems.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-2 text-zinc-400 hover:text-neonPink transition ${
              isActive ? 'text-neonPink font-semibold shadow-neon-pink animate-flicker' : ''
            }`
          }
        >
          {icon}
          <span className="hidden sm:inline">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
