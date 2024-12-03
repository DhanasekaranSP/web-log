import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './styles/global.scss'
import { LandingPage } from './components/LandingPage'
import PostDetails from './pages/posts/[slug]'
import { Layout } from './components/Layout'

function App() {
  return (
    <BrowserRouter>
      <LandingPage>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/post/:slug" element={<PostDetails />} />
          <Route path="*" element={<p>Page Not Found</p>} />
        </Routes>
      </LandingPage>
    </BrowserRouter>
  )
}

export default App
