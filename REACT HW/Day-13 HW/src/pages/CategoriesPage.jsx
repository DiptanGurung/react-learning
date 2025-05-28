import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

export default function CategoriesPage() {
  const { products } = useContext(ProductContext);

  const categories = useMemo(() => {
    const unique = new Set();
    products.forEach((product) => {
      if (product.category) {
        unique.add(product.category.toLowerCase());
      }
    });
    return Array.from(unique);
  }, [products]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#11172a] to-black text-[#0ff] p-8">
      <h2 className="text-3xl font-bold mb-6 text-cyan-400">Browse Categories</h2>
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
