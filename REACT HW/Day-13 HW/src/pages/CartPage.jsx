import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Trash2, Rocket } from "lucide-react";
import Header from "../components/Header";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const updateQuantity = (index, quantity) => {
    if (quantity < 1) return;
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = quantity;
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const total = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <Header cartCount={totalQuantity} />

      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-3xl font-bold neon-text text-cyan-300 mb-6 border-b border-cyan-500 pb-2 tracking-wide flex items-center gap-2">
          <ShoppingCart className="text-cyan-400 w-7 h-7" />
          Your Cyber Cart
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-pink-400 italic">
            Your cart is empty.{" "}
            <Link to="/" className="underline hover:text-cyan-300">
              Shop now
            </Link>
          </p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="bg-[#1f1f2e] border border-cyan-500/30 shadow-lg rounded-xl p-5 flex justify-between items-center hover:shadow-cyan-500/30 transition-all"
              >
                <div>
                  <h3 className="text-lg font-bold text-cyan-400">{item.title}</h3>
                  <p className="text-sm text-pink-300">${item.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-[#2a2a3a] px-2 py-1 rounded-lg border border-cyan-400">
                    <label className="text-xs text-gray-300">Qty</label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity || 1}
                      onChange={(e) =>
                        updateQuantity(index, parseInt(e.target.value, 10))
                      }
                      className="w-14 text-center bg-transparent text-white border-b border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={() => removeItem(index)}
                    className="text-sm text-red-500 hover:text-pink-500 transition-colors font-semibold border border-red-500 px-3 py-1 rounded-lg hover:bg-red-800/20 flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-6 border-t border-cyan-600 pt-4">
              <p className="text-xl font-semibold text-green-400">
                Total: <span className="text-white">${total.toFixed(2)}</span>
              </p>
              <Link
                to="/checkout"
                className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl shadow-xl hover:scale-105 transform transition-all hover:shadow-cyan-500/50 font-semibold"
              >
                <Rocket className="w-5 h-5" />
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
