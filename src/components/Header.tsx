import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b-2 border-primary">
      <nav className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              PokéCreator
            </h1>
          </Link>
          
          <div className="flex gap-2 sm:gap-4 items-center">
            {isAuthenticated ? (
              <>
                <Link to="/gallery" className="btn btn-secondary text-sm sm:text-base">
                  Mis Pokémon
                </Link>
                <Link to="/create" className="btn btn-primary text-sm sm:text-base">
                  Crear Pokémon
                </Link>
                
                {user && (
                  <div className="flex items-center gap-2 ml-2">
                    {user.picture && (
                      <img
                        src={user.picture}
                        alt={user.name}
                        className="w-8 h-8 rounded-full border-2 border-primary"
                      />
                    )}
                    <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                      {user.name}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="btn btn-secondary text-sm"
                    >
                      Salir
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login" className="btn btn-primary text-sm sm:text-base">
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
