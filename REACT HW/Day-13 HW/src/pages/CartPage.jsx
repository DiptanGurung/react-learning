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

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Header cartCount={cartItems.length} />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 mb-2 rounded shadow flex items-center justify-between"
              >
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>${item.price.toFixed(2)}</p>
                </div>
                <div>
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
                </div>
              </div>
            ))}
            <p className="mt-1 text-sm text-gray-700">
              Total: ${total.toFixed(2)}
            </p>
            <Link
              to="/checkout"
              className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
