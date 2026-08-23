import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import ProtectedRoute from '@/components/ProtectedRoute'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Creator from '@/pages/Creator'
import Gallery from '@/pages/Gallery'
import NotFound from '@/pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route
          path="create"
          element={
            <ProtectedRoute>
              <Creator />
            </ProtectedRoute>
          }
        />
        <Route
          path="gallery"
          element={
            <ProtectedRoute>
              <Gallery />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
