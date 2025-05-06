import React from 'react'

function Header() {
  return (
    <>
<div className='bg-blue-400 h-[80px] w-full flex flex-row justify-around'>
      
    <div className='w-[500px] flex justify-around items-center'>
      
        <div className='w-[600px] flex justify-around items-center'>
              <a href='#' className='text-white text-xl'>Home</a>
              <a href='#' className='text-white text-xl'>About</a>
              <a href='#' className='text-white text-xl'>Contact</a>
              <a href='#' className='text-white text-xl'>Help</a>
        </div>

    </div>

    <div className='w-full flex justify-end items-center'>
        <div className='w-[300px] flex justify-around items-center'>
            <a href='#' className='text-white text-xl'>Log In</a>
            <a href='#' className='text-white text-xl'>Register</a>
        </div>
    </div>
</div>
    </>
  )
}

export default Header