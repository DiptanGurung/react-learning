import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { AuthContext } from "../context/AuthContext";

export default function OrdersPage() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    console.log("All orders in storage:", allOrders);
    const userOrders = allOrders.filter(order => order.email === user.email);
    console.log(`Orders for user ${user.email}:`, userOrders);
    setOrders(userOrders);
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header cartCount={0} />
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">My Orders</h2>
        {orders.length === 0 ? (
          <p className="text-gray-500 italic">You haven’t placed any orders yet.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-white p-4 mb-4 rounded shadow">
              <p className="text-sm text-gray-500">Order ID: #{order.id}</p>
              <p className="text-sm text-gray-500 mb-2">
                Date: {new Date(order.createdAt).toLocaleString()}
              </p>
              <ul className="divide-y">
                {order.items.map((item, idx) => (
                  <li key={idx} className="py-2 flex justify-between">
                    <span>{item.title} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-2 font-semibold">
                Total: $
                {order.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
