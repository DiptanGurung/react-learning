import React from 'react'
import New from './New'

function Folder({ setCount }) {

  console.log('Folder');

  return (
    <>
      <div className='bg-green-500 mb-10 p-10'>
        <h1 className='flex flex-col'>file 3 - FOLDER</h1>

        <button className='bg-indigo-500 p-5' onClick={() => setCount(prev => prev - 1)}>Decrement</button>

      </div>

      <New />
    </>
  )
}

export default Folder