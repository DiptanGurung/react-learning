import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Page from './components/page.jsx'
import Button from './components/button.jsx'


function App() {

  const image ='https://media.gettyimages.com/id/1420922964/photo/gebirgslandschaft.jpg?s=612x612&w=0&k=20&c=bN6FDCHTdfYZ0OLEnAbqWONwIScuue0rqOCgdq5XRD8='

  const list = [
    { name: 'Iron Man', image:'https://i.pinimg.com/originals/c4/c6/5e/c4c65e229ddf3f26df2daa3afcaa5c8a.jpg' },
    { name: 'Hulk', image:'https://i.pinimg.com/originals/51/b5/8a/51b58a3e48d365a3b68cc97564fb37c2.jpg' },
    { name: 'Captain America', image:'https://wallpapers.com/images/hd/captain-america-movie-t36zbunahamn5lwn.jpg' },
    { name: 'Thor', image:'https://i.pinimg.com/originals/aa/1d/28/aa1d28172ced786c0f9c1539f7fd820b.jpg' },
    { name: 'Hawkeye', image:'https://i.pinimg.com/originals/26/c8/53/26c8530bd812a3a6e810c54e6a3a9f70.jpg' }
  ]

  return (
    <>
  <div className='min-h-screen w-[full] bg-cyan-500 flex flex-col gap-4 justify-center items-center'>
        <h1 className='text-2xl font-bold'>
          Avengers
        </h1>
        
        <div className='flex flex-col gap-4'>
          {
            list.map((value, index) => {
              return (
                <>
                  <Page key={index} value={value}/>
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
