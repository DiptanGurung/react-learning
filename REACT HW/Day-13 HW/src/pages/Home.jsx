import React, { useContext, useState, useEffect } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../context/ProductContext";

export default function Home() {
  const { products } = useContext(ProductContext);
  const [cart, setCart] = useState(() => {
    // Load saved cart from localStorage on initial render
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");

  const addToCart = (product) => {
    const existingIndex = cart.findIndex((item) => item.id === product.id);
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
    product.title.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Header cartCount={cart.length} onSearch={handleSearch} />
      <main className="p-4 flex flex-wrap gap-8 ml-5 mt-5">
        {filteredProducts.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))
        )}
      </main>
    </div>
  );
}
