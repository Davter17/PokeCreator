import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-20 text-center">
      <div className="text-8xl mb-6">🔍</div>
      <h2 className="text-4xl font-extrabold text-primary mb-4">404</h2>
      <p className="text-xl text-gray-600 mb-8">La página que buscas no existe.</p>
      <Link to="/" className="btn btn-large btn-primary">
        Volver al inicio
      </Link>
    </section>
  )
}
