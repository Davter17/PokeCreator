import type { PokemonData } from '../../types'

interface Step1Props {
  pokemonData: PokemonData
  setPokemonData: React.Dispatch<React.SetStateAction<PokemonData>>
}

const animals = [
  { name: 'Dragón', icon: '🐉', description: 'Poderoso y majestuoso' },
  { name: 'Lobo', icon: '🐺', description: 'Ágil y feroz' },
  { name: 'Fénix', icon: '🦅', description: 'Místico y renovador' },
  { name: 'Tigre', icon: '🐯', description: 'Rápido y sigiloso' },
  { name: 'Tortuga', icon: '🐢', description: 'Resistente y sabio' },
  { name: 'Serpiente', icon: '🐍', description: 'Astuto y venenoso' }
]

export default function Step1AnimalSelection({ pokemonData, setPokemonData }: Step1Props) {
  const handleSelect = (animal: typeof animals[0]) => {
    setPokemonData({
      ...pokemonData,
      animal: { name: animal.name, icon: animal.icon }
    })
  }

  return (
    <div className="animate-fade-in">
      <h3 className="text-2xl font-semibold mb-6">Selecciona el Animal Base</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {animals.map((animal) => (
          <div
            key={animal.name}
            onClick={() => handleSelect(animal)}
            className={`bg-gray-50 border-2 rounded-xl p-6 text-center cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg ${
              pokemonData.animal?.name === animal.name
                ? 'border-primary bg-primary-light text-white'
                : 'border-gray-200 hover:border-primary'
            }`}
            role="button"
            tabIndex={0}
            aria-label={`Seleccionar ${animal.name}`}
          >
            <div className="text-5xl mb-2">{animal.icon}</div>
            <h4 className="text-lg font-semibold mb-1">{animal.name}</h4>
            <p className={`text-sm ${pokemonData.animal?.name === animal.name ? 'text-white/90' : 'text-gray-600'}`}>
              {animal.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
