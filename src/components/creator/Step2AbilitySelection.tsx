import type { PokemonData } from '../../types'

interface Step2Props {
  pokemonData: PokemonData
  setPokemonData: React.Dispatch<React.SetStateAction<PokemonData>>
}

const abilities = [
  { value: 'levitate', name: 'Levitación', icon: '🪽' },
  { value: 'lightning-rod', name: 'Pararrayos', icon: '⚡' },
  { value: 'intimidate', name: 'Intimidación', icon: '😠' },
  { value: 'overgrow', name: 'Espesura', icon: '🌱' },
  { value: 'torrent', name: 'Torrente', icon: '💧' },
  { value: 'swarm', name: 'Enjambre', icon: '🐝' },
  { value: 'sturdy', name: 'Robustez', icon: '🛡️' },
  { value: 'chlorophyll', name: 'Clorofila', icon: '🌞' }
]


export default function Step2AbilitySelection({ pokemonData, setPokemonData }: Step2Props) {
  const handleToggle = (ability: typeof abilities[0]) => {
    const exists = pokemonData.abilities.find(a => a.value === ability.value)
    
    if (exists) {
      setPokemonData({
        ...pokemonData,
        abilities: pokemonData.abilities.filter(a => a.value !== ability.value)
      })
    } else {
      if (pokemonData.abilities.length >= 3) {
        alert('Solo puedes seleccionar hasta 3 habilidades')
        return
      }
      setPokemonData({
        ...pokemonData,
        abilities: [...pokemonData.abilities, ability]
      })
    }
  }

  return (
    <div className="animate-fade-in">
      <h3 className="text-2xl font-semibold mb-2">Elige las Habilidades</h3>
      <p className="text-gray-600 mb-6">Selecciona hasta 3 habilidades</p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4" style={{ display: 'grid' }}>
        {abilities.map((ability) => {
          const isSelected = pokemonData.abilities.some(a => a.value === ability.value)
          
          return (
            <div
              key={ability.value}
              onClick={() => handleToggle(ability)}
              style={{ 
                minHeight: '120px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              className={`border-2 rounded-xl p-6 text-center cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md ${
                isSelected
                  ? 'border-primary bg-primary text-white'
                  : 'border-gray-200 bg-gray-50 hover:border-primary'
              }`}
              role="button"
              tabIndex={0}
              aria-label={`${isSelected ? 'Deseleccionar' : 'Seleccionar'} ${ability.name}`}
            >
              <div className="text-4xl mb-2" style={{ fontSize: '2.5rem' }}>{ability.icon}</div>
              <span className="text-sm font-semibold">{ability.name}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
