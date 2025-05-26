import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Header cartCount={totalQuantity} />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500 italic">
            Your cart is empty.{" "}
            <Link to="/" className="text-blue-600 underline">
              Shop now
            </Link>.
          </p>
        ) : (
          <div>
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 mb-2 rounded shadow flex items-center justify-between"
              >
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p>${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="mr-2">Qty:</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity || 1}
                    onChange={(e) =>
                      updateQuantity(index, parseInt(e.target.value, 10))
                    }
                    className="w-16 border rounded px-2 py-1 text-center"
                  />
                  <button
                    onClick={() => removeItem(index)}
                    className="text-red-600 hover:text-red-800 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <p className="mt-4 text-lg font-medium text-gray-800">
              Total: ${total.toFixed(2)}
            </p>
            <Link
              to="/checkout"
              className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-500 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
