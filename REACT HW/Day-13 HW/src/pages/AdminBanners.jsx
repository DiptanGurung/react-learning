import React, { useState, useEffect } from "react";
import { ImagePlus, Trash2 } from "lucide-react";

export default function AdminBanners() {
  const [banners, setBanners] = useState(() => {
    return JSON.parse(localStorage.getItem("banners")) || [];
  });
  const [bannerInput, setBannerInput] = useState("");

  useEffect(() => {
    localStorage.setItem("banners", JSON.stringify(banners));
  }, [banners]);

  const handleAdd = () => {
    const trimmed = bannerInput.trim();
    if (!trimmed) return;
    const updated = [...banners, trimmed];
    setBanners(updated);
    setBannerInput("");
  };

  const handleDelete = (index) => {
    const updated = banners.filter((_, i) => i !== index);
    setBanners(updated);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center p-8">
      <div className="w-full max-w-[2200px] mx-auto px-8 py-12 bg-[#0f1624] rounded-lg shadow-neon">
        <h3 className="text-4xl font-semibold mb-8 text-purple-400 flex justify-center">Banner Manager</h3>

        <div className="flex gap-8 mb-10">
          <input
            type="text"
            value={bannerInput}
            onChange={(e) => setBannerInput(e.target.value)}
            placeholder="Paste banner image URL..."
            className="flex-1 border border-cyan-600 bg-gray-800 text-cyan-200 px-8 py-5 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button
            onClick={handleAdd}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded shadow transition text-xl font-semibold"
          >
            Add
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto rounded bg-gray-800 p-4 shadow-inner">
          {banners.length === 0 ? (
            <p className="italic text-gray-400">No banners added yet.</p>
          ) : (
            <ul className="space-y-4">
              {banners.map((url, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between bg-gray-700 p-4 rounded shadow-sm"
                >
                  <img
                    src={url}
                    alt={`Banner ${i + 1}`}
                    className="h-20 object-cover rounded mr-4"
                  />
                  <button
                    onClick={() => handleDelete(i)}
                    className="flex items-center gap-2 text-red-500 hover:text-red-700 font-semibold"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
