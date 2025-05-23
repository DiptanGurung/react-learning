import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom"; 

export default function CheckoutPage() {
  const navigate = useNavigate(); 
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState(""); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("You must be logged in to place an order.");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const { name, address, city, zip } = form;
    const orders = JSON.parse(localStorage.getItem("orders")) || {};
    const newOrder = {
      items: cart,
      name,
      address: `${address}, ${city}, ${zip}`,
      date: new Date().toISOString(),
      status: "Pending",
    };

    const updatedOrders = orders[user.email]
      ? [...orders[user.email], newOrder]
      : [newOrder];

    localStorage.setItem(
      "orders",
      JSON.stringify({
        ...orders,
        [user.email]: updatedOrders,
      })
    );

    localStorage.removeItem("cart"); 
    setMessage("Order placed successfully!");
    setSubmitted(true);

    setTimeout(() => {
      navigate("/"); 
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header cartCount={0} />
      <div className="p-6 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        {submitted ? (
          <p className="bg-white p-4 rounded shadow text-green-600">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
            <input
              type="text"
              name="zip"
              placeholder="ZIP Code"
              value={form.zip}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Place Order
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
