import { BrowserRouter, Routes, Route, Link } from 'react-router'
import { HomeIcon, Info, Phone } from 'lucide-react'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'

function App() {

  return (
    <>
      <div>
        <nav className="bg-blue-400 shadow-md">

          <div className="container mx-auto px-6 py-4 flex justify-between items-center">

            <h1 className="text-2xl font-bold text-white">
              ROUTING
            </h1>

            <ul className="flex space-x-10 text-lg font-semibold text-white">
              <li>
                <HomeIcon className='w-5 h-5 flex' />
                <Link to="/" className="hover:text-red-500 transition-colors">Home</Link>
              </li>
              <li>
                <Info className='w-5 h-5 flex' />
                <Link to="/about" className="hover:text-red-500 transition-colors">About</Link>
              </li>
              <li>
                <Phone className='w-5 h-5 flex' />
                <Link to="/contact" className="hover:text-red-500 transition-colors">Contact</Link>
              </li>
            </ul>

          </div>

        </nav>


        <main className="w-full px-4 flex justify-center mt-20 text-xl hover:text-blue-600 font-bold">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App
