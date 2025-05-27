import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Box, Film, LogOut, Trash2, X } from "lucide-react";

export default function AdminPage() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const ADMIN_EMAIL = "admin@gmail.com";

  const [products, setProducts] = useState([]);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  useEffect(() => {
    if (!user || user.email !== ADMIN_EMAIL) {
      navigate("/", { replace: true });
    }

    const stored = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(stored);
  }, [user, navigate]);

  if (!user || user.email !== ADMIN_EMAIL) return null;

  const handleDelete = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  };

  const confirmLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-6">
      <div className="flex justify-between items-center mb-10">
        <h2 className="flex items-center text-4xl font-bold text-cyan-400 neon-text tracking-wide drop-shadow-lg gap-2">
          <Box className="w-10 h-10" /> Admin Command Center
        </h2>
        <button
          onClick={() => setShowLogoutDialog(true)}
          className="flex items-center gap-2 bg-red-700 hover:bg-pink-600 text-white font-semibold px-5 py-2 rounded shadow-lg transition-all"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
        <div
          className="bg-[#1a1a2e] border border-cyan-500/50 hover:border-cyan-300 neon-box p-6 rounded-lg cursor-pointer transition-all hover:shadow-cyan-500 flex items-start gap-4"
          onClick={() => navigate("/admin/products")}
        >
          <Box className="w-8 h-8 text-cyan-300 mt-1" />
          <div>
            <h3 className="text-2xl text-cyan-300 font-bold mb-2">Product Management</h3>
            <p className="text-gray-300">Create, update, and delete products from the store database.</p>
          </div>
        </div>
        <div
          className="bg-[#1a1a2e] border border-pink-500/50 hover:border-pink-400 neon-box p-6 rounded-lg cursor-pointer transition-all hover:shadow-pink-500 flex items-start gap-4"
          onClick={() => navigate("/admin/banners")}
        >
          <Film className="w-8 h-8 text-pink-400 mt-1" />
          <div>
            <h3 className="text-2xl text-pink-400 font-bold mb-2">Banner Control</h3>
            <p className="text-gray-300">Manage homepage banners and promotional visuals.</p>
          </div>
        </div>
      </div>

      <div className="bg-[#121212] border border-purple-700/40 rounded-lg p-6 shadow-lg">
        <h4 className="flex items-center gap-3 text-3xl font-bold mb-6 text-purple-400">
          <Box className="w-8 h-8" /> System Inventory
        </h4>

        <h5 className="text-xl font-semibold text-cyan-300 mb-4">Active Products</h5>

        {products.length === 0 ? (
          <p className="text-gray-500 italic">No products in the system.</p>
        ) : (
          <ul className="space-y-3">
            {products.map((p) => (
              <li
                key={p.id}
                className="flex justify-between items-center border border-cyan-600/30 bg-[#1a1a2e] p-4 rounded-lg hover:shadow-md transition-all"
              >
                <span>
                  <span className="text-white font-bold">{p.title}</span>{" "}
                  <span className="text-gray-400">— ${p.price.toFixed(2)} — {p.category}</span>
                </span>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="flex items-center gap-1 text-red-500 hover:text-pink-500 font-semibold"
                  aria-label={`Delete ${p.title}`}
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {showLogoutDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#1a1a2e] p-8 rounded-lg max-w-md w-full text-center shadow-lg border border-cyan-600">
            <h3 className="text-2xl text-cyan-300 mb-4 font-semibold">Confirm Logout</h3>
            <p className="mb-6 text-gray-300">Are you sure you want to logout?</p>
            <div className="flex justify-center gap-6">
              <button
                onClick={confirmLogout}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
              >
                Yes
              </button>
              <button
                onClick={() => setShowLogoutDialog(false)}
                className="px-6 py-2 border border-cyan-500 text-cyan-400 rounded hover:bg-cyan-600 hover:text-white transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
