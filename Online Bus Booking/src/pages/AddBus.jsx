import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBusContext } from '../context/BusContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddBus = () => {
  const { addBus } = useBusContext();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    from: '',
    to: '',
    time: '',
    date: '',
    price: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBus(form);
    alert('Bus added!');
    navigate('/buses');
  };

  return (
    <div className="min-h-screen bg-white p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        <FontAwesomeIcon icon="bus-alt" className="mr-2" />
        Add New Bus
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {['name', 'from', 'to', 'time', 'date', 'price'].map((field) => (
          <input
            key={field}
            type={field === 'price' ? 'number' : 'text'}
            name={field}
            placeholder={field[0].toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Bus
        </button>
      </form>
    </div>
  );
};

export default AddBus;
