import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const { register } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    profileImage: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      alert('Registration successful! Check your email for verification.');
      navigate('/verify-otp');
    } catch (err) {
      alert('Registration failed: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 border rounded space-y-4 bg-indigo-500 shadow-md">
      <h2 className="text-2xl font-bold mb-4 flex justify-center">REGISTER</h2>

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded pr-10"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2.5 text-gray-600"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <div>
        <label className="block mb-1">Profile Image</label>
        <input
          type="file"
          name="profileImage"
          accept="image/*"
          onChange={handleChange}
          className="block w-full border p-2 rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-pink-500 text-white px-4 py-2 rounded hover:bg-red-500"
      >
        Register
      </button>
    </form>
  );
};

export default Register;
