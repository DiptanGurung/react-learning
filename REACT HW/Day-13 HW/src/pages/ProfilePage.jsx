import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ArrowLeft, LogOut } from "lucide-react";
import ConfirmLogoutModal from "../components/ConfirmLogoutModal";

export default function ProfilePage() {
  const { user, logout } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [profile, setProfile] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem("orders")) || {};
    setOrders(allOrders[user.email] || []);
    setProfile({ name: user.name || "", email: user.email });
  }, [user]);

  const deleteOrder = (indexToDelete) => {
    const allOrders = JSON.parse(localStorage.getItem("orders")) || {};
    const userOrders = allOrders[user.email] || [];
    const updatedUserOrders = userOrders.filter((_, index) => index !== indexToDelete);
    const updatedOrders = { ...allOrders, [user.email]: updatedUserOrders };
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setOrders(updatedUserOrders);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutModal(false);
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = () => {
    localStorage.setItem(
      "currentUserEmail",
      profile.email
    );

    alert("Profile updated.");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">User Profile</h2>

      <div className="mb-4 space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Name:
        </label>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleProfileChange}
          className="w-full px-4 py-2 border rounded"
        />

        <label className="block text-sm font-medium text-gray-700">
          Email:
        </label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleProfileChange}
          className="w-full px-4 py-2 border rounded"
        />

        <button
          onClick={handleSaveProfile}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Home
        </button>

        <button
          onClick={handleLogoutClick}
          className="bg-green-500 text-white text-sm px-2 py-1 rounded hover:bg-blue-600"
        >
          <LogOut className="inline-block w-4 h-4 mr-1" /> Logout
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-4">Your Orders</h3>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <ul className="space-y-4 mt-4">
          {orders.map((order, index) => (
            <li key={index} className="border p-4 rounded bg-white shadow">
              <p className="font-semibold">Order #{index + 1}</p>
              <p className="text-sm text-gray-600 mb-2">
                Placed on: {new Date(order.date || order.createdAt).toLocaleString()}
              </p>
              <ul className="list-disc ml-6 text-sm">
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.title || item.name} × {item.quantity || 1}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-sm text-gray-500">Total: ${order.total.toFixed(2)}</p>
              <button
                onClick={() => deleteOrder(index)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
              >
                Delete Order
              </button>
            </li>
          ))}
        </ul>
      )}

      <ConfirmLogoutModal
        isOpen={showLogoutModal}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </div>
  );
}
