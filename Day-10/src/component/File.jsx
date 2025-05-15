import React from 'react'
import Folder from './Folder'

function File({ setCount }) {

  console.log('File');

  return (
    <>
      <div className='bg-blue-500 mb-10 mt-10 p-10'>
        <h1 className='flex flex-col'>file 2 - {count}</h1>

        <button className='bg-orange-500 p-5' onClick={() => setCount(prev => prev + 1)}>Increment</button>

      </div>

      <Folder setCount={setCount}/>
    </>
  )

}

export default File