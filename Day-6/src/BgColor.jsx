import React, { useState } from 'react'


function BgColor() {

  const [color, setColor] = useState("olive");
  return (
    <>
      <div className='w-full min-h-[100vh] ' style={{ backgroundColor: color }}>
        <div className=' w-[1000px] bg-white flex justify-around py-3 px-10 fixed bottom-1 left-2 rounded-xl' >

          <button
            onClick={() => setColor("red")}
            className='text-black text-xl rounded-md px-3 py-1' style={{ backgroundColor: "red" }}>
            Red
          </button>
          <button
            onClick={() => setColor("green")}
            className='text-black text-xl rounded-md px-3 py-1' style={{ backgroundColor: "green" }}>
            Green
          </button>
          <button
            onClick={() => setColor("yellow")}
            className='text-black text-xl rounded-md px-3 py-1' style={{ backgroundColor: "yellow" }}>
            Yellow
          </button>
          <button
            onClick={() => setColor("orange")}
            className='text-black text-xl rounded-md px-3 py-1' style={{ backgroundColor: "orange" }}>
            Orange
          </button>
          <button
            onClick={() => setColor("blue")}
            className='text-black text-xl rounded-md px-3 py-1' style={{ backgroundColor: "blue" }}>
            Blue
          </button>
          <button
            onClick={() => setColor("gray")}
            className='text-black text-xl rounded-md px-3 py-1' style={{ backgroundColor: "gray" }}>
            Gray
          </button>
        </div>


      </div>
    </>
  )
}

export default BgColor;