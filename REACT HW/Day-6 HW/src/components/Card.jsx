import React,{useState} from 'react'
import Button from './Button.jsx'

function card({ value }) {

  const [liked, setLiked] = useState(false);
  const [deleted, setDeleted] = useState(false);

const handleLikeToggle = () => {
    setLiked(prev => !prev);
  };

  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      setDeleted(true);
    }
  };

   if (deleted) return null;

  return (

    <div className='w-[350px] h-[450px] border-4 border-y-black flex flex-col justify-between py-4 items-center'>
      <h1 className='font-bold text-xl text-black-500'>PROFILE</h1>
      <h1 className='text-xl text-red-800 border-black'>{value?.name}</h1>

      <img className= 'h-[300px] w-[300px] mb-5 border-4 border-indigo-500 rounded-lg' 
      src= {value?.image} 
      alt= "Profile" />

      <div className='flex gap-2'>
          <Button liked = {liked} onClick={handleLikeToggle} onDeleteClick={handleDeleteClick}/>
          {/* <Button Dislike = {count2} onClick={handleClick2}/> */}
      </div>
</div>

  );
  }


export default card