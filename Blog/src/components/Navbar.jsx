import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const Navbar = () => {
  const { user, login, logout } = useContext(UserContext);

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white p-4 shadow-md border-b">
      <div className='space-x-4'>
        <button>Home</button>
        <button>Contact</button>
        <button>Help</button>
      </div>
      <div className='space-x-4'>
        {user ? (
          <>
            <span>Welcome, {user.name}</span>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <>
            <button onClick={() => login("User")}>login</button>
            <button>Register</button>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar