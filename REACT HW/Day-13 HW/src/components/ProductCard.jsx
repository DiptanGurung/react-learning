import React from "react";

export default function ProductCard({ product, addToCart }) {
  return (
    <div className="w-full max-w-sm border rounded-xl p-3 shadow hover:shadow-md transition duration-200">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-32 object-contain rounded"
      />
      <h2 className="text-base font-medium mt-2">{product.name}</h2>
      <p className="text-sm text-gray-700">${product.price.toFixed(2)}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-2 bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700">
        Add to Cart
      </button>
    </div>
  );
}
