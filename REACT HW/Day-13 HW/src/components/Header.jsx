import React, { useContext, useState, useEffect, useRef } from "react";
import { ShoppingCart, Search, LogOut, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ConfirmLogoutModal from "./ConfirmLogoutModal";

export default function Header({ cartCount, onSearch }) {
  const [searchInput, setSearchInput] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const dropdownRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    if (onSearch) onSearch(value);
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
    setDropdownOpen(false);
  };
  const confirmLogout = () => {
    logout();
    setShowLogoutModal(false);
  };
  const cancelLogout = () => setShowLogoutModal(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dropdownOpen]);

  return (
    <>
      <header className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-4 shadow-xl border-b border-[#00ffff50] backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="text-3xl font-bold tracking-wider text-cyan-400 neon-text glow"
          >
            NEO<span className="text-pink-500">Mart</span>
          </Link>

          <div className="flex items-center gap-6">
            <div className="relative">
              <input
                type="search"
                aria-label="Search products"
                value={searchInput}
                onChange={handleChange}
                placeholder="Search..."
                className="bg-[#1c1c1e] text-white placeholder-gray-400 rounded-full pl-4 pr-10 py-1.5 border border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              />
              <Search className="absolute right-2 top-2 h-4 w-4 text-cyan-400" />
            </div>

            <Link to="/cart" className="relative group" aria-label="Shopping cart">
              <ShoppingCart className="w-6 h-6 text-cyan-400 transition-transform group-hover:scale-110" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs px-1.5 py-0.5 rounded-full shadow-lg">
                  {cartCount}
                </span>
              )}
            </Link>

            {user && (
              <Link
                to="/orders"
                className="text-sm text-white hover:text-cyan-400 transition-all"
              >
                My Orders
              </Link>
            )}

            {user && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="p-2 rounded-full hover:bg-cyan-500/20"
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                  aria-label="User settings"
                >
                  <Settings className="w-5 h-5 text-cyan-300" />
                </button>

                {dropdownOpen && (
                  <nav
                    className="fixed right-6 top-16 mt-2 bg-[#1c1c1e] border border-cyan-500 rounded shadow-lg w-56 z-[9999]"
                    role="menu"
                    aria-label="User settings menu"
                  >
                    <div className="px-4 py-2 text-sm text-gray-300 border-b border-cyan-700">
                      {user.name || user.email}
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-white hover:bg-cyan-600"
                      role="menuitem"
                      tabIndex={0}
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogoutClick}
                      className="w-full text-left px-4 py-2 text-white bg-red-600 hover:bg-pink-600"
                      role="menuitem"
                    >
                      <LogOut className="inline-block w-4 h-4 mr-2" /> Logout
                    </button>
                  </nav>
                )}
              </div>
            )}

            {!user && (
              <Link
                to="/login"
                className="text-sm text-white hover:text-cyan-400 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      <ConfirmLogoutModal
        isOpen={showLogoutModal}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </>
  );
}
