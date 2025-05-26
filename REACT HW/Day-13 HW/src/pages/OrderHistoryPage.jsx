import React, { useEffect, useState } from "react";
import Header from "../components/Header";

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    const currentUserEmail = localStorage.getItem("currentUserEmail");
    if (!currentUserEmail) return;

    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const userOrders = allOrders.filter(order => order.email === currentUserEmail);

    const allOrdersWithStatus = userOrders.map(order => ({
      ...order,
      status: order.status || "Pending",
    }));

    setOrders(allOrdersWithStatus);
  }, []);

  const deleteOrder = (orderId) => {
    const currentUserEmail = localStorage.getItem("currentUserEmail");
    if (!currentUserEmail) {
      console.warn("No current user email found.");
      return;
    }

    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const updatedOrders = allOrders.filter(order => order.id.toString() !== orderId.toString());

    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    setOrders(updatedOrders.filter(order => order.email === currentUserEmail));
  };

  const handleDeleteClick = (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      deleteOrder(orderId);
    }
  };

  const filteredOrders =
    activeTab === "All"
      ? orders
      : orders.filter((order) => order.status === activeTab);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header cartCount={0} />
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Your Order History</h2>

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

        {filteredOrders.length === 0 ? (
          <p className="text-gray-500 italic">No {activeTab.toLowerCase()} orders.</p>
        ) : (
          filteredOrders
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((order) => (
              <div key={order.id} className="bg-white p-4 mb-4 rounded shadow-sm">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    {new Date(order.date).toLocaleString()}
                  </p>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      order.status === "Pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : order.status === "Completed"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <p className="text-gray-800 font-medium mt-1 mb-2">
                  Total: ${order.total.toFixed(2)}
                </p>

                <ul className="text-sm text-gray-700 space-y-1 mb-2">
                  {order.items.map((item, i) => (
                    <li key={i}>
                      • {item.title} × {item.quantity} — $
                      {(item.price * item.quantity).toFixed(2)}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleDeleteClick(order.id)}
                  className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-green-500 text-sm"
                >
                  Delete
                </button>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
