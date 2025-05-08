import React from 'react'
import Button from './button.jsx'

function Page({ value }) {

  console.log("List is :", value.image);

  return (

    <div className='w-[350px] h-[400px] border border-y-black flex flex-col justify-between py-4 items-center'>
      <h1>Profile</h1>
      <h1>{value?.name}</h1>

      <img className='h-[300px]' src={value?.image} alt="image" />

        <div className='flex gap-2'>
          <Button text={"Like"}/>
          <Button text={"Comment"}/>
        </div>
     </div>

  );
}

export default Page