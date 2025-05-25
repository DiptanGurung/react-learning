import React, { useContext, useState } from "react";
import { ShoppingCart, Search, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Header({ cartCount, onSearch }) {
  const [searchInput, setSearchInput] = useState("");
  const { user, logout } = useContext(AuthContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    if (onSearch) onSearch(value);
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">NEOMart</Link>

      <div className="flex items-center gap-4">
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
          <ShoppingCart className="h-6 w-6 text-gray-700" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>

        {user && (
          <>
            <Link to="/orders" className="text-sm text-blue-600 hover:underline">
              My Orders
            </Link>
            <Link to="/profile" className="text-sm text-gray-700 hover:underline">
              Profile
            </Link>
          </>
        )}

        {user ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">{user.email}</span>
            <button
              onClick={logout}
              className="bg-red-500 text-white text-sm px-2 py-1 rounded hover:bg-red-600"
            >
              <LogOut className="inline-block w-4 h-4 mr-1" /> Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="text-blue-600 hover:underline text-sm">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
