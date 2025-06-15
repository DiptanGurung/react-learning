import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const ForgotPassword = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSendOtp = async () => {
    try {
      const response = await fetch('https://blogsitebackend-topcollec.onrender.com/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to send OTP');
      setStep(2);
    } catch (error) {
      setResponseMessage(`Error: ${error.message}`);
    }
  };

  const handleChangePassword = async () => {
    try {
      const response = await fetch('https://blogsitebackend-topcollec.onrender.com/api/auth/reset-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to change password');
      setResponseMessage('Password changed successfully!');
      setTimeout(onClose, 1500);
    } catch (error) {
      setResponseMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4 flex justify-center">Enter your email</h2>

        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mb-4 px-3 py-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleSendOtp}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full mb-4 px-3 py-2 border rounded"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="New Password"
                className="w-full mb-4 px-3 py-2 border rounded pr-10"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button
              onClick={handleChangePassword}
              className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            >
              Change Password
            </button>
          </>
        )}

        {responseMessage && (
          <p className="mt-4 text-sm text-red-600">{responseMessage}</p>
        )}

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
