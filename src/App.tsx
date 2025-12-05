import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Creator from './pages/Creator'
import Gallery from './pages/Gallery'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="create" element={<Creator />} />
        <Route path="gallery" element={<Gallery />} />
      </Route>
    </Routes>
  )
}

export default App
