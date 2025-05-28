import { useState } from 'react'
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import { UserProvider } from './context/UserContext'

const App = () => {

  return (
    <>
      <UserProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className='flex-1'>
            <LandingPage />
          </div>
        </div>
      </UserProvider>
    </>
  )
}

export default App
