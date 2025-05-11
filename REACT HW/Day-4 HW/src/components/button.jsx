import React, { useState } from 'react'

function button({text, bgcolor="blue", bordercolor="black", like, onClick}) {
  console.log("Button is :", like);
  return (
    <div>
      <button onClick= {onClick} className='w-[fit] px-10 py-1 rounded-xl text-white' style={{background:bgcolor}}>{like}</button>
    </div>
  )
}

export default button