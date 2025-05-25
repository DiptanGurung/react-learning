import React, { useContext, useState } from "react";
import { ShoppingCart, Search, LogOut, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ConfirmLogoutModal from "./ConfirmLogoutModal";

export default function Header({ cartCount, onSearch }) {
  const [searchInput, setSearchInput] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    if (onSearch) onSearch(value);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
    setDropdownOpen(false);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutModal(false);
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <header className="bg-gradient-to-r from-blue-500 to-indigo-500 shadow p-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">NEOMart</Link>

        <div className="flex items-center gap-4 relative">
          <div className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={handleChange}
              placeholder="Search products"
              className="border rounded-full px-4 py-1 w-64 focus:outline-none"
            />
            <Search className="absolute right-3 top-2 h-4 w-4 text-gray-500" />
          </div>

          <Link to="/cart" className="relative">
            <ShoppingCart className="h-6 w-6 text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {user && (
            <>
              <Link to="/orders" className="text-sm text-white hover:underline">
                My Orders
              </Link>

              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="text-white hover:bg-white/10 p-2 rounded-full"
                >
                  <Settings className="w-5 h-5" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded w-48 z-10 overflow-hidden">
                    <div className="px-4 py-2 text-sm text-gray-500 border-b">
                      {user.name || user.email}
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogoutClick}
                      className="w-full text-left px-4 py-2 text-white bg-red-500 hover:bg-blue-500"
                    >
                      <LogOut className="inline-block w-4 h-4 mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {!user && (
            <Link to="/login" className="text-white hover:underline text-sm">
              Login
            </Link>
          )}
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
