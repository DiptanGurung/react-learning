import React from "react";
import { ShoppingCart, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header({ cartCount }) {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">NEOMart</Link>
      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
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
      </div>
    </header>
  );
}