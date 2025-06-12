import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';

const Login = () => {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
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
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 border rounded space-y-4">
        <h2 className="text-xl font-bold">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-red-500 text-white px-4 py-2 rounded"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setShowForgotPasswordModal(true)}
            className="text-blue-600 hover:underline text-sm"
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
