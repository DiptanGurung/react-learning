import React from 'react'

function button({text, bgcolor="blue", bordercolor="black"}) {
  console.log("Button is :", text);
  return (
    <div>
      <button className='w-[fit] px-10 py-1 rounded-xl text-white' style={{background:bgcolor}}>{text}</button>
    </div>
  )
}

export default button