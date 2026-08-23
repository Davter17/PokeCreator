import { Link, useNavigate } from 'react-router-dom'
import type { PokemonData } from '@/types'
import { POKEMON_TYPES } from '@/types'

const CONCEPTS = [
  'dragon', 'fenix', 'lobo', 'tigre', 'tortuga', 'serpiente',
  'aguila', 'demonio', 'angel', 'robot', 'samurai', 'fantasma',
  'guerrero', 'hada', 'sombra', 'hielo', 'tormenta', 'volcan'
]

const COLORS = [
  ['#FF5350', '#FFCB05'],
  ['#3B4CCA', '#6890F0'],
  ['#78C850', '#F08030'],
  ['#F8D030', '#F85888'],
  ['#7038F8', '#EE99AC'],
  ['#705848', '#B8B8D0'],
  ['#98D8D8', '#A040A0'],
  ['#E0C068', '#C03028'],
]

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateRandomPokemon(): PokemonData {
  const concept = randomItem(CONCEPTS)
  const numTypes = Math.random() < 0.5 ? 1 : 2
  const shuffledTypes = [...POKEMON_TYPES].sort(() => Math.random() - 0.5)
  const types = shuffledTypes.slice(0, numTypes).map(t => t.value)
  const [primaryColor, secondaryColor] = randomItem(COLORS)

  return {
    concept,
    types,
    name: concept.charAt(0).toUpperCase() + concept.slice(1) + Math.floor(Math.random() * 100),
    primaryColor,
    secondaryColor,
    description: ''
  }
}

export default function Home() {
  const navigate = useNavigate()

  const handleRandom = () => {
    const randomPokemon = generateRandomPokemon()
    navigate('/create', { state: { pokemonData: randomPokemon } })
  }

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-tight">
            Crea tu Pokémon Único
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-xl">
            Combina conceptos, tipos y colores para crear Pokémon únicos y compártelos con tus amigos
          </p>
          <div className="flex gap-4 flex-wrap justify-center md:justify-start">
            <Link to="/create" className="btn btn-large btn-accent">
              Comenzar a Crear
            </Link>
            <button onClick={handleRandom} className="btn btn-large btn-primary">
              🎲 Pokémon Aleatorio
            </button>
          </div>
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
