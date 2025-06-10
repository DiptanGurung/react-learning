import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const OTPVerification = () => {
  const { verifyOTP, resendOTP } = useContext(UserContext);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [resendMessage, setResendMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await verifyOTP(otp);
      alert('OTP verified successfully! You can now login.');
      navigate('/login');
    } catch (err) {
      setError(err.message || 'OTP verification failed');
    }
  };

  const handleResend = async () => {
    setResendMessage('');
    try {
      await resendOTP();
      setResendMessage('OTP resent successfully! Check your email.');
    } catch (err) {
      setError('Failed to resend OTP: ' + (err.message || 'Unknown error'));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">OTP Verification</h2>
      <p>Please enter the 6-digit OTP sent to your email.</p>

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <input
          type="text"
          name="otp"
          maxLength="6"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter OTP"
          required
        />
        {error && <p className="text-red-600">{error}</p>}
        {resendMessage && <p className="text-green-600">{resendMessage}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Verify OTP
        </button>
      </form>

      <button
        onClick={handleResend}
        className="mt-4 text-blue-600 underline"
      >
        Resend OTP
      </button>
    </div>
  );
};

export default OTPVerification;