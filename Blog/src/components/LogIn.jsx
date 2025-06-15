import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import ForgotPassword from './ForgotPassword';

const Login = () => {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/');
      }
    } catch (err) {
      alert('Login failed: ' + err.message);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-10 p-6 border rounded space-y-4 bg-indigo-500 shadow-md"
      >
        <h2 className="text-xl font-bold flex justify-center">LOGIN</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-pink-500 hover:bg-red-500 text-white px-4 py-2 ml-10 rounded"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setShowForgotPasswordModal(true)}
            className="bg-pink-500 hover:bg-red-500 text-white px-4 py-2 rounded mr-10"
          >
            Forgot Password?
          </button>
        </div>
      </form>

      {showForgotPasswordModal && (
        <ForgotPassword onClose={() => setShowForgotPasswordModal(false)} />
      )}
    </>
  );
};

export default Login;
