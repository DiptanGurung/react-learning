import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ArrowLeft } from "lucide-react";

export default function ProfilePage() {
  const { user, logout } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem("orders")) || {};
    setOrders(allOrders[user.email] || []);
  }, [user]);

  const deleteOrder = (indexToDelete) => {
    const allOrders = JSON.parse(localStorage.getItem("orders")) || {};
    const userOrders = allOrders[user.email] || [];

    const updatedUserOrders = userOrders.filter((_, index) => index !== indexToDelete);
    const updatedOrders = { ...allOrders, [user.email]: updatedUserOrders };
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setOrders(updatedUserOrders);
  };

  const updateOrderStatus = (index, newStatus) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = newStatus;
    setOrders(updatedOrders);

    const allOrders = JSON.parse(localStorage.getItem("orders")) || {};
    allOrders[user.email] = updatedOrders;
    localStorage.setItem("orders", JSON.stringify(allOrders));
  };

  const filteredOrders =
    activeTab === "All"
      ? orders
      : orders.filter((order) => order.status === activeTab);

  const renderOrders = () => (
    filteredOrders.length === 0 ? (
      <p className="text-gray-500 mt-4">No {activeTab.toLowerCase()} orders.</p>
    ) : (
      <ul className="space-y-4 mt-4">
        {filteredOrders.map((order, index) => (
          <li key={index} className="border p-4 rounded bg-white shadow">
            <p className="font-semibold">Order #{index + 1}</p>
            <p className="text-sm text-gray-600 mb-2">
              Placed on: {new Date(order.date).toLocaleString()}
            </p>
            <ul className="list-disc ml-6">
              {order.items.map((item, i) => (
                <li key={i}>
                  {item.name} x {item.quantity || 1}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-sm text-gray-500">Name: {order.name}</p>
            <p className="text-sm text-gray-500">Address: {order.address}</p>
            <div className="mt-4">
              <label className="text-sm font-medium mr-2">Status:</label>
              <select
                value={order.status}
                onChange={(e) =>
                  updateOrderStatus(orders.indexOf(order), e.target.value)
                }
                className="border px-2 py-1 rounded"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <button
                onClick={() => deleteOrder(orders.indexOf(order))}
                className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 self-start"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    )
  );

  return (

    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">User Profile</h2>
      <p className="mb-4">Logged in as: <strong>{user.email}</strong></p>
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Home
        </button>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="flex space-x-4 border-b pb-2 mb-4">
        {["All", "Pending", "Completed", "Cancelled"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-t ${activeTab === tab
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {renderOrders()}
    </div>
  );
}
