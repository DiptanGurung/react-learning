import React from 'react'
import Padd from './padd'


function Demo() {
  return (

<>
    <div className='w-full min-h-[500px] bg-blue-300 flex flex-row justify-around items-center'>

      <div className='h-[100px] w-[200px] bg-red-400'>
        1
      </div>
      <div className='h-[100px] w-[200px] bg-purple-400'>
        2
      </div>
      <div className='h-[100px] w-[200px] bg-green-400'>
        3
      </div>
    </div>

<Padd/>
</>
    
  )
}

export default Demo