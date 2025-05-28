import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../context/ProductContext";

export default function CategoryPage() {
  const { name } = useParams();
  const { products } = useContext(ProductContext);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const filtered = products.filter(
      (product) => product.category.toLowerCase() === name.toLowerCase()
    );
    setFilteredProducts(filtered);
  }, [products, name]);

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    const updatedCart = exists
      ? cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
      : [...cart, { ...product, quantity: 1 }];

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#11172a] to-black text-[#0ff]">
      <Header cartCount={totalCartCount} />
      <div className="p-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold capitalize mb-6">
          {name} Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.length === 0 ? (
            <p>No products found in this category.</p>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
