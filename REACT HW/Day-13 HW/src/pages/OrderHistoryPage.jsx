import React, { useEffect, useState } from "react";
import Header from "../components/Header";

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(history);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header cartCount={0} />
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Your Order History</h2>
        {orders.length === 0 ? (
          <p className="text-gray-500 italic">No past orders.</p>
        ) : (
          orders
            .sort((a, b) => b.id - a.id)
            .map((order) => (
              <div
                key={order.id}
                className="bg-white p-4 mb-4 rounded shadow-sm"
              >
                <p className="text-sm text-gray-500">
                  {new Date(order.date).toLocaleString()}
                </p>
                <p className="text-gray-800 font-medium mb-2">
                  Total: ${order.total.toFixed(2)}
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  {order.items.map((item, i) => (
                    <li key={i}>
                      • {item.title} × {item.quantity} — $
                      {(item.price * item.quantity).toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
