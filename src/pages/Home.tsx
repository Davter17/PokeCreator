import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-tight">
            Crea tu Pokémon Único
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-xl">
            Combina animales y habilidades para crear Pokémon únicos y compártelos con tus amigos
          </p>
          <Link to="/create" className="btn btn-large btn-accent">
            Comenzar a Crear
          </Link>
        </div>
        
        <div className="flex justify-center">
          <div className="w-full max-w-sm h-80 bg-gradient-to-br from-primary-light to-accent-light rounded-2xl shadow-2xl flex items-center justify-center text-8xl">
            🎨
          </div>
        </div>
      </div>
    </section>
  )
}
