import React from "react";

export default function ConfirmLogoutModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1a1a2e] p-8 rounded-lg max-w-md w-full text-center shadow-lg border border-cyan-600">
        <h3 className="text-2xl text-cyan-300 mb-4 font-semibold">Confirm Logout</h3>
        <p className="mb-6 text-gray-300">Are you sure you want to log out?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-2 border border-cyan-500 text-cyan-400 rounded hover:bg-cyan-600 hover:text-white transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
