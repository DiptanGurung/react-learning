import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BusProvider } from './context/BusContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BusProvider>
      <App />
    </BusProvider>
  </StrictMode>,
)
