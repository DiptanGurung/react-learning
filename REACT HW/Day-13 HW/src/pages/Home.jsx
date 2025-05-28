import React, { useContext, useState, useEffect } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../context/ProductContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const { products } = useContext(ProductContext);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [banners, setBanners] = useState([]);

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

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "cart") {
        setCart(e.newValue ? JSON.parse(e.newValue) : []);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const storedBanners = JSON.parse(localStorage.getItem("banners")) || [];
    setBanners(storedBanners);
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm)
  );

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const sliderSettings = {
    autoplay: true,
    infinite: true,
    speed: 400,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#11172a] to-black text-[#0ff]">
      <Header cartCount={totalCartCount} onSearch={handleSearch} />

      {banners.length > 0 && (
        <div className="mx-auto max-w-4xl mt-6 mb-12 rounded-xl overflow-hidden border border-[#0ff] shadow-[0_0_20px_#0ff]">
          <Slider {...sliderSettings}>
            {banners.map((url, i) => (
              <div
                key={i}
                className="relative w-full aspect-[21/9] bg-black overflow-hidden"
              >
                <img
                  src={url}
                  alt={`Banner ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ))}
          </Slider>
        </div>
      )}

      <main className="p-8 max-w-7xl mx-auto space-y-12">
        {filteredProducts.length === 0 ? (
          <p className="text-[#0ff] text-center text-lg">No products found.</p>
        ) : (
          Object.entries(
            filteredProducts.reduce((acc, product) => {
              const category = product.category || "Uncategorized";
              if (!acc[category]) acc[category] = [];
              acc[category].push(product);
              return acc;
            }, {})
          ).map(([category, items]) => (
            <section key={category}>
              <h2 className="text-2xl font-bold text-cyan-300 mb-4 border-b border-cyan-500 pb-2">
                {category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items.map((product) => (
                  <ProductCard key={product.id} product={product} addToCart={addToCart} />
                ))}
              </div>
            </section>
          ))
        )}
      </main>

    </div>
  );
}
