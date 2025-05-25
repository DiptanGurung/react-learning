export default function ProductCard({ product, addToCart }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-60">
      <img
        src={product.image || "https://via.placeholder.com/150"}
        alt={product.title}
        className="w-full h-40 object-cover rounded-md mb-2"
      />
      <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
      <p className="text-gray-600">${product.price.toFixed(2)}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}
