import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Localiza o elemento HTML com id='root' no DOM e cria a raiz da aplicação React
createRoot(document.getElementById('root')).render(
  <StrictMode> {/* Renderiza o componente principal App dentro do elemento #root */}
    <App />
  </StrictMode>,
)
