import React, { useState } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

export default function Home() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const addToCart = (product) => {
    // console.log("Adding to cart:", product);
    const existingIndex = cart.findIndex(item => item.id === product.id);
    let updatedCart;

    if (existingIndex !== -1) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += 1;
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Header cartCount={cart.length} onSearch={handleSearch} />
      <main className="p-4 flex flex-wrap gap-8 ml-5 mt-5">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </main>
    </div>
  );
}