import React from "react";
import { Link } from "react-router-dom";
import { PartyPopper, MailCheck, Home } from "lucide-react";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center text-white px-6">
      <div className="text-center space-y-6 max-w-xl">
        <div className="flex justify-center">
          <PartyPopper className="w-16 h-16 text-cyan-400 animate-bounce" />
        </div>

        <h1 className="text-4xl font-extrabold text-cyan-300 tracking-wide">
          Thank You for Your Order!
        </h1>

        <p className="text-pink-400 text-lg">
          Your cyber goods are being prepared for warp-speed delivery.{" "}
          <span className="text-cyan-200">You'll receive a confirmation email shortly.</span>
        </p>

        <div className="flex items-center justify-center gap-2 text-green-400 font-semibold">
          <MailCheck className="w-5 h-5" />
          <span>Email sent to your registered address</span>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-6 bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:scale-105 transition-transform"
        >
          <Home className="w-5 h-5" />
          Return to Home
        </Link>
      </div>
    </div>
  );
}
