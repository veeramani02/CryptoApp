import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CryptoProvider } from './Context/CryptoContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <CryptoProvider>
    <App />
  </CryptoProvider>
  </StrictMode>
)
