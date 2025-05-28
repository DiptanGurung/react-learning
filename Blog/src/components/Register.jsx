import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { login } = useContext(UserContext);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(password, name);
    navigate('/');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 border rounded space-y-4 shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border p-2 w-full rounded"
      />

      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border p-2 w-full rounded"
      />

      <button
        type="submit"
        className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Register
      </button>
    </form>
  );
};

export default Register;
