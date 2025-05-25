import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ProductContext } from "../context/ProductContext";
import { useNavigate, Link } from "react-router-dom";

export default function AdminPage() {
  const { user, logout } = useContext(AuthContext);
  const { products, addProduct, deleteProduct } = useContext(ProductContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
  });

  const ADMIN_EMAIL = "admin@gmail.com";

  useEffect(() => {
    if (!user || user.email !== ADMIN_EMAIL) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

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
    setForm({ title: "", price: "", category: "" });
  };

  const handleDelete = (id) => {
    deleteProduct(id);
  };

  if (!user || user.email !== ADMIN_EMAIL) {
    return null;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
        <div className="flex gap-4 items-center">
          <Link
            to="/admin-home"
            className="text-blue-600 hover:underline font-semibold"
          >
            ← Back to Admin Home
          </Link>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow-sm transition"
          >
            Logout
          </button>
        </div>
      </div>

      <form
        onSubmit={handleAdd}
        className="bg-white p-6 rounded-lg shadow-md mb-10 space-y-5"
      >
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Product Title"
          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category (e.g., Electronics)"
          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md shadow-md transition"
        >
          Add Product
        </button>
      </form>

      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Product List</h3>
        {products.length === 0 ? (
          <p className="text-gray-500 italic">No products available.</p>
        ) : (
          <ul className="space-y-3">
            {products.map((p) => (
              <li
                key={p.id}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm"
              >
                <div>
                  <p className="font-medium text-gray-900">{p.title}</p>
                  <p className="text-sm text-gray-600">
                    ${p.price.toFixed(2)} — {p.category}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-red-600 hover:text-red-800 font-semibold transition"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
