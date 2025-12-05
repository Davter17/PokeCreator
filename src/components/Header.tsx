import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b-2 border-primary">
      <nav className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              PokéCreator
            </h1>
          </Link>
          
          <div className="flex gap-2 sm:gap-4">
            <Link to="/gallery" className="btn btn-secondary text-sm sm:text-base">
              Mis Pokémon
            </Link>
            <Link to="/create" className="btn btn-primary text-sm sm:text-base">
              Crear Pokémon
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
