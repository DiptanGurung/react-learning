import React from 'react'

function Container() {
  return (
<>
<div className='text-black text-xl font-bold bg-blue-500 w-full h-[400px] flex flex-col'>
  <h1 className='flex justify-center'>Practice</h1>
    <div className='text-black text-xl w-full h-[300px] flex justify-around'>
        <div className='text-black text-xl w-[500px] flex flex-col'>
        <h1 className='flex justify-center underline'>IMAGE</h1>
          <img src='https://imgs.search.brave.com/66JYkwMg6-lQmOUoau0iUbRZOMk0oyNFH3CQrqrEQZw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vcGljanVt/Ym8uY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy9jYWxtaW5nLW5h/dHVyZS13YWxscGFw/ZXItZnJlZS1pbWFn/ZS5qcGVnP3c9NjAw/JnF1YWxpdHk9ODA'></img>
        </div>
        <div className='text-black text-xl w-[500px] flex flex-col items-center'>
        <h1 className='flex justify-center items-center underline'>QUOTE</h1>
          <p>A lake is a landscape's most beautiful and expressive feature. It is Earth's eye; looking into which the beholder measures the depth of his own nature.</p>
        </div>
    </div>
</div>
  
</>
  )
}

export default Container