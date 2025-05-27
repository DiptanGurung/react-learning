// src/pages/CategoriesPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("https://fakestoreapi.com/products/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 text-white">
      <h2 className="text-3xl font-bold mb-4 text-cyan-400">Browse Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat}
            to={`/category/${encodeURIComponent(cat)}`}
            className="block p-4 bg-[#1c1c1e] rounded-lg border border-cyan-500 text-center capitalize hover:bg-cyan-600 transition"
          >
            {cat}
          </Link>
        ))}
      </div>
    </div>
  );
}
