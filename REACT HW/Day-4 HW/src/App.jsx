import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/card'
import Button from './components/button'

function App() {

  const image ='https://media.gettyimages.com/id/1420922964/photo/gebirgslandschaft.jpg?s=612x612&w=0&k=20&c=bN6FDCHTdfYZ0OLEnAbqWONwIScuue0rqOCgdq5XRD8='

  const list = [
    { name: 'IRON MAN', image:'https://i.pinimg.com/originals/c4/c6/5e/c4c65e229ddf3f26df2daa3afcaa5c8a.jpg' },
    { name: 'HULK', image:'https://i.pinimg.com/originals/51/b5/8a/51b58a3e48d365a3b68cc97564fb37c2.jpg' },
    { name: 'CAPTAIN AMERICA', image:'https://wallpapers.com/images/hd/captain-america-movie-t36zbunahamn5lwn.jpg' },
    { name: 'THOR', image:'https://i.pinimg.com/originals/aa/1d/28/aa1d28172ced786c0f9c1539f7fd820b.jpg' },
    { name: 'HAWKEYE', image:'https://i.pinimg.com/originals/26/c8/53/26c8530bd812a3a6e810c54e6a3a9f70.jpg' },
    { name: 'BLACK WIDOW', image:'https://comicvine.gamespot.com/a/uploads/original/9/93477/2544794-the_avengers_black_widow_1.jpg' }
  ]

  return (
    <>
<div className='bg-black border-8 border-indigo-500 h-[full] p-10 w-full flex-row '>
      <div >
              <h1 className='text-2xl font-bold mb-5 tracking-widest text-indigo-600'>
                  AVENGERS ASSEMBLE!
              </h1>
      </div>     

        <div className='flex flex-row flex-wrap gap-6'>
          {
            list.map((value, index) => {
              return (
                <>
                  <Card key={index} value={value} />
                </>
                )
              })
          }
        </div>
</div>
  
</>
  )
}

export default App
