import React, { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { Image, Tag, DollarSign, PlusCircle } from "lucide-react";

export default function AdminProducts() {
  const { addProduct } = useContext(ProductContext);
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      title: form.title.trim(),
      price: parseFloat(form.price),
      category: form.category.trim(),
      image: form.image.trim(),
    };
    addProduct(newProduct);
    setForm({ title: "", price: "", category: "", image: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] p-8 flex justify-center items-center">
      <form
        onSubmit={handleAdd}
        className="bg-[#1a1a2e] border border-cyan-500/70 neon-box p-10 rounded-lg shadow-lg max-w-md w-full space-y-8"
        style={{ maxWidth: "450px" }}
      >
        <h2 className="text-2xl font-bold text-cyan-400 mb-4 neon-text flex items-center gap-2">
          <PlusCircle className="w-6 h-6" />
          Add New Product
        </h2>

        <label className="block relative">
          <Image className="absolute left-3 top-3 w-4 h-4 text-cyan-400" />
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
            required
            className="pl-9 w-full bg-[#12121f] border border-cyan-700 rounded py-2 text-cyan-300 placeholder-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
          />
        </label>

        <label className="block relative">
          <Tag className="absolute left-3 top-3 w-4 h-4 text-pink-400" />
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Product Title"
            required
            className="pl-9 w-full bg-[#12121f] border border-pink-700 rounded py-2 text-pink-300 placeholder-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
          />
        </label>

        <label className="block relative">
          <DollarSign className="absolute left-3 top-3 w-4 h-4 text-green-400" />
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="pl-9 w-full bg-[#12121f] border border-green-700 rounded py-2 text-green-300 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
          />
        </label>

        <label className="block relative">
          <Tag className="absolute left-3 top-3 w-4 h-4 text-purple-400" />
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            required
            className="pl-9 w-full bg-[#12121f] border border-purple-700 rounded py-2 text-purple-300 placeholder-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 rounded shadow-lg transition text-sm"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
