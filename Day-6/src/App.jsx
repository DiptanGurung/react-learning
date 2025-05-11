import React, { useState } from 'react'
import Button from './tests/Button'


// props
function App() {

  //Arrow function

  const [like, setLike] = useState(0);
  const [share, setShare] = useState(0);
  const [dislike, setDislike] = useState(0);

  let name = 'suva'
  const handleLike = () => {

    // alert("Handle is click");
    setLike(prev => prev + 1);
  }
  const handleShare = () => {

    // alert("Handle is click");
    setShare(prev => prev + 1);
  }

    const handleDislike = () => {

    // alert("Handle is click");
    setDislike(prev => prev + 1);
  }

  return (
    <>
      <h1>HamroLearn</h1>
      <div className='flex gap-8'>
        <Button like={like} className={`bg-red-300 ${className}`} onClick={handleLike} >Like</Button >
        <Button like={share} className={`bg-slate-400 w-[400px] text-white ${className}`} onClick={handleShare}>Share</Button >
        <Button like={dislike} className={`bg-orange-400 w-[400px] text-white ${className}`} onClick={handleDislike}>DisLike</Button >

      </div>
    </>
  )
}

export default App