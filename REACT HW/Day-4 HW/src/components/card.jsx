import React,{useState} from 'react'
import Button from './button.jsx'

function card({ value }) {

  const [count, setCount] = useState(0);

  console.log("Count", count)
  
  const handleClick=()=> {
    setCount(count=> count + 1);
    // alert("{handleClick}")
  console.log("Total likes:", count + 1);
}

  console.log("List is :", value.image);

  return (

    <div className='w-[350px] h-[450px] border-4 border-y-white flex flex-col justify-between py-4 items-center'>
      <h1 className='font-bold text-xl text-red-500'>PROFILE</h1>
      <h1 className='text-xl text-blue-500'>{value?.name}</h1>

      <img className='h-[300px] mb-5 border-4 border-indigo-500 rounded-lg' src={value?.image} alt="image" />

      <div className='flex gap-2'>
          <Button like = {count} onClick={handleClick} />
          {/* <Button text={"Dislike"}/> */}
      </div>
</div>

  );
  }


export default card