import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    try {
      const response = await fetch('https://blogsitebackend-topcollec.onrender.com/api/auth/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Password change failed.');
      }

      setSuccess(data.message || 'Password changed successfully!');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  const renderPasswordInput = (label, value, setValue, show, setShow) => (
    <div className="relative">
      <label className="block mb-1 font-medium">{label}</label>
      <input
        type={show ? 'text' : 'password'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full px-3 py-2 border rounded pr-10"
        required
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-[38px] text-gray-600"
      >
        {show ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-lg bg-indigo-500 shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex justify-center text-white">Change Password</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 text-white">
        {renderPasswordInput('Old Password', oldPassword, setOldPassword, showOld, setShowOld)}
        {renderPasswordInput('New Password', newPassword, setNewPassword, showNew, setShowNew)}
        {renderPasswordInput('Retype New Password', confirmPassword, setConfirmPassword, showConfirm, setShowConfirm)}

        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded hover:bg-blue-700"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
