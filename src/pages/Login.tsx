import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin, CredentialResponse } from '@react-oauth/google'
import { useAuth } from '@/context/AuthContext'

const Login = () => {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/create')
    }
  }, [isAuthenticated, navigate])

  const handleSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      login(credentialResponse.credential)
      navigate('/create')
    }
  }

  const handleError = () => {
    console.error('Login Failed')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">PokeCreator</h1>
          <p className="text-gray-600">Crea tu Pokémon personalizado</p>
        </div>

        <div className="mb-6">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
            alt="Pikachu"
            className="w-32 h-32 mx-auto"
          />
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Iniciar Sesión
          </h2>
          <p className="text-gray-600 text-sm">
            Inicia sesión con tu cuenta de Google para comenzar
          </p>
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            useOneTap
            theme="filled_blue"
            size="large"
            text="signin_with"
            shape="rectangular"
          />
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Al iniciar sesión, aceptas nuestros{' '}
            <a href="#" className="text-blue-600 hover:underline">
              términos y condiciones
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
