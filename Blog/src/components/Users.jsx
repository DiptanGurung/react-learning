import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Users = () => {
  const { user } = useContext(UserContext);

  const users = [
    { id: 1, name: 'Alice', role: 'user' },
    { id: 2, name: 'Bob', role: 'admin' },
    { id: 3, name: 'Charlie', role: 'user' }
  ];

  if (!user || user.role !== 'admin') {
    return (
      <div className="text-center mt-10 text-red-500">
        Access Denied: Admins only
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <ul className="space-y-2">
        {users.map(u => (
          <li
            key={u.id}
            className="p-4 border rounded shadow flex justify-between"
          >
            <span>{u.name}</span>
            <span className="text-sm text-gray-500">{u.role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
