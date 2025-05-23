import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AdminHome() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(stored);
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Home - Product List</h2>
      <Link
        to="/admin"
        className="mb-4 inline-block text-blue-600 underline"
      >
        Go to Product Management
      </Link>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul className="space-y-2">
          {products.map((p) => (
            <li key={p.id} className="border p-3 rounded">
              <strong>{p.title}</strong> — ${p.price.toFixed(2)} — {p.category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
