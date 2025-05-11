import React, { useMemo, useState } from 'react'
import Button from './Button'


function Card({ value }) {
    const [like, setLike] = useState(0);

    const handleLike = () => {
        // alert("Handle like click");
        setLike(prev => prev + 1);
    }




    return (
        <div className='w-[250px] h-[400px] border border-black flex flex-col rounded-lg justify-between py-4 items-center'>
            <h1>Reels</h1>
            <hr className='border border-slate-500 w-full' />
            <h1>{value?.name}</h1>
            <div className='w-[250px] min-h-[250px] max-w-[250px] px-2'>
                <img className='w-full h-full object-cover' src={value?.image} alt="User-post" />
            </div>
            <div className='flex gap-2 my-2'>
                <Button className='bg-indigo-500 hover:bg-indigo-600 flex w-fit px-8 gap-1' onclick={handleLike}>
                    <span>{like}</span>
                    <span>Likes</span></Button>
                <Button className='bg-slate-500 hover:bg-slate-600'>Share</Button>
            </div>
        </div>
    );
}

export default Card