import React from "react";
import { Link } from "react-router-dom";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6 text-center">
      <h2 className="text-3xl font-bold mb-4 text-green-700">Thank You!</h2>
      <p className="mb-6 text-gray-700">
        Your order has been placed successfully.
      </p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded shadow transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
