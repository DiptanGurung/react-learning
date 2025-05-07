import { useState } from "react";
import './App.css'

function Color() {

  const[color, setColor] = useState(0);

  return(
<>
<div className="flex flex-col my-10 h-[400px]">
    <div className='bg-purple-400 h-[50px] my-20 flex font-bold justify-center items-center'>
      My favourite color is: {color} !
    </div>
  <div className="flex flex-row justify-around h-[50px]">
    <button className='bg-red-500 w-[100px]' onClick={()=> setColor('red')}>Red</button>
    <button className='bg-blue-500 w-[100px]' onClick={()=> setColor('blue')}>Blue</button>
    <button className='bg-green-500 w-[100px]' onClick={()=> setColor('green')}>Green</button>
    <button className='bg-yellow-300 w-[100px]' onClick={()=> setColor('yellow')}>Yellow</button>
  </div>
</div>
</>
  )
}

export default Color;