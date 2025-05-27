import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { User, Mail, MapPin, CreditCard, Lock, Receipt } from "lucide-react";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", address: "" });

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
      email: form.email,
      status: "Pending",
    };

    const stored = JSON.parse(localStorage.getItem("orders")) || [];
    stored.push(order);

    localStorage.setItem("orders", JSON.stringify(stored));
    localStorage.setItem("currentUserEmail", form.email);
    localStorage.removeItem("cart");

    setCartItems([]);
    navigate("/thank-you");
  };

  const isFormValid = form.name && form.email && form.address;

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <Header cartCount={cartItems.length} />

      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-cyan-300 mb-6 border-b border-cyan-500 pb-2 tracking-wide flex items-center gap-2">
          <Lock className="w-6 h-6 text-cyan-400" />
          Secure Cyber Checkout
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-[#1f1f2e] p-6 rounded-xl shadow-lg border border-cyan-400/20 space-y-4"
        >
          <div className="flex items-center gap-3">
            <User className="text-cyan-400" />
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full bg-transparent border-b border-cyan-400 focus:outline-none text-white py-2 px-1 placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center gap-3">
            <Mail className="text-cyan-400" />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full bg-transparent border-b border-cyan-400 focus:outline-none text-white py-2 px-1 placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="text-cyan-400 mt-2" />
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Shipping Address"
              required
              className="w-full bg-transparent border-b border-cyan-400 focus:outline-none text-white py-2 px-1 placeholder:text-gray-400"
              rows={3}
            />
          </div>

          <div className="mt-6 border-t border-cyan-500 pt-4">
            <div className="flex justify-between text-cyan-300 font-semibold items-center gap-1">
              <Receipt className="w-5 h-5" />
              <span>Items Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-pink-400 mt-1 text-sm">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-green-400 text-lg font-bold mt-3 border-t border-cyan-400 pt-2">
              <span>Total Payable</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-500 px-6 py-3 rounded-xl text-white font-bold shadow-xl hover:scale-105 transition-all ${!isFormValid ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            <CreditCard className="w-5 h-5" />
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}
