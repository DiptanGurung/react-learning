import React, { useEffect, useState } from "react";
import Header from "../components/Header";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

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
              <div key={index} className="bg-white p-4 mb-2 rounded shadow">
                <h3 className="font-semibold">{item.name}</h3>
                <p>${item.price.toFixed(2)}</p>
              </div>
            ))}
            <p className="mt-4 font-bold">Total: ${total.toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
}