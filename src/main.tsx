import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Layout } from './components/Layout.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Layout />
      <App />
    </BrowserRouter>
  </StrictMode>,
)
