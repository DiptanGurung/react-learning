import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function CheckoutPage() {
  
  const [cartItems, setCartItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    if (saved.length === 0) {
      navigate("/cart");
    } else {
      setCartItems(saved);
    }
  }, [navigate]);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const order = {
      id: Date.now(),
      items: cartItems,
      total,
      date: new Date().toISOString(),
      userEmail: form.email,
    };

    const orderHistory = JSON.parse(localStorage.getItem("orders")) || [];
    orderHistory.push(order);
    localStorage.setItem("orders", JSON.stringify(orderHistory));

    localStorage.removeItem("cart");
    setCartItems([]);
    navigate("/thank-you");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header cartCount={cartItems.length} />
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Shipping Address"
            required
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <div className="text-right text-gray-800 font-medium">
            Total: ${total.toFixed(2)}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold transition"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}
