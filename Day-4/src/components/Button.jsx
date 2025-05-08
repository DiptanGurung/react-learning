import React from 'react'

function Button({text, bgcolor="green"}) {
  console.log("Button is :", text);
  return (
    <div>
      <button className='w-[fit] px-10 py-2 bg-indigo-500 rounded-xl text-white' style={{background:bgcolor}}>{text}</button>
    </div>
  )
}

export default Button