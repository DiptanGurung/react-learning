import React from 'react'
import { useState } from 'react'

function App() {

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("on submit", " userName: ", userName, " email: ", email, " password: ", password);
    alert("Click handleSubmit");
    // setList((prev)=>[...prev,{email,userName,password}])
  }

  return (
    <div className='w-full min-h-screen bg-slate-300'>
      <h1>Form Learn</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2 px-20 py-10 bg-slate-400 w-[600px]'>
        <div>
          <label htmlFor="useName">userName:</label>
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type="text" className='border-2 border-red-200 outline-none px-1' />
        </div>
        <div>
          <label htmlFor="email">email:</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email" className='border-2 border-red-200 outline-none px-1' />
        </div>
        <div>
          <label htmlFor="password">password:</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password" className='border-2 border-red-200 outline-none px-1' />

        </div>

        <div>
          <label htmlFor="image">chose Image</label>
          <input type="file" />

        </div>

        {/* <button onClick={handleSubmit} className='w-fit px-10 py-2 bg-indigo-500 rounded-md'>submit</button> */}
        <input type="submit" value="Submit" className='bg-indigo-200 w-fit rounded-lg px-10 py-1' />
      </form>
    </div>
  )
}

export default App