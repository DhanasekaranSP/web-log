import { BrowserRouter } from 'react-router-dom'
import './styles/global.scss'
import { LandingPage } from './components/LandingPage'

function App() {
  return (
    <BrowserRouter>
      <LandingPage />
    </BrowserRouter>
  )
}

export default App
