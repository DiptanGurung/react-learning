import React, { useState } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

export default function Home() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header cartCount={cart.length} />
      <main className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </main>
    </div>
  );
}