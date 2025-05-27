export default function ProductCard({ product, addToCart }) {
  return (
    <div className="bg-[#111122] border border-cyan-500 rounded-xl p-4 w-60 flex flex-col shadow-[0_0_15px_#0ff] hover:shadow-[0_0_25px_#0ff] transition-shadow duration-300">
      <div className="relative overflow-hidden rounded-md border border-cyan-600 shadow-[inset_0_0_15px_#0ff] mb-3 aspect-[4/3]">
        <img
          src={product.image || "https://via.placeholder.com/150"}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <h3 className="text-cyan-400 font-bold text-lg tracking-wide truncate mb-1">
        {product.title}
      </h3>
      <p className="text-pink-400 font-mono text-sm mb-3">${product.price.toFixed(2)}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-auto bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-500 text-white font-semibold py-2 rounded-lg shadow-lg hover:scale-105 transform transition-all"
      >
        Add to Cart
      </button>
    </div>
  );
}
