import React from "react";

export default function ProductCard({ product, addToCart }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
      <img
        src={product.image}
        alt={product.name}
        className="w-40 h-40 object-contain mb-4"
      />
      <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
      <p className="text-blue-600 font-bold">${product.price.toFixed(2)}</p>
      <button
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}