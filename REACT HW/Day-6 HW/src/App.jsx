import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card.jsx'
import Button from './components/Button.jsx'

function App() {

  const image = 'https://t4.ftcdn.net/jpg/01/63/60/17/360_F_163601775_DriIiFarxcWQubICVcEyhV3NwELScVog.jpg'

  const list = [
    {name: 'Fire', image: 'https://media.gettyimages.com/id/131644363/photo/fire.jpg?s=612x612&w=0&k=20&c=jqWWrMBgudpMJ9QDphvsT92i0TN_2pli_lvuE2qTrfk= '},
    {name: 'Dark', image: 'https://media.istockphoto.com/id/157309886/photo/the-wall.jpg?s=612x612&w=0&k=20&c=z0X6vVWS92psPdJyCjbqXgeUjP3HukwJdP0zIlNq_dQ='},
    {name: 'Water', image: 'https://t3.ftcdn.net/jpg/01/17/70/02/360_F_117700241_O5vvaCvQbHf12JE2mmOghQqUlgqSXswm.jpg'},
    {name: 'Light', image: 'https://t4.ftcdn.net/jpg/01/63/60/17/360_F_163601775_DriIiFarxcWQubICVcEyhV3NwELScVog.jpg'}
  ]

  return (
    <>
<div className='bg-indigo-400 border-8 border-black h-[full] p-10 w-full flex flex-col'>
      <div >
              <h1 className='text-2xl font-bold mb-5 tracking-widest text-black'>
                  GRIMIORE
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
