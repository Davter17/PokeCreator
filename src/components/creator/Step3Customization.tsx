import type { PokemonData } from '../../types'

interface Step3Props {
  pokemonData: PokemonData
  setPokemonData: React.Dispatch<React.SetStateAction<PokemonData>>
}

const types = [
  { value: 'normal', label: 'Normal' },
  { value: 'fire', label: 'Fuego' },
  { value: 'water', label: 'Agagua' },
  { value: 'grass', label: 'Planta' },
  { value: 'electric', label: 'Eléctrico' },
  { value: 'ice', label: 'Hielo' },
  { value: 'fighting', label: 'Lucha' },
  { value: 'poison', label: 'Veneno' },
  { value: 'ground', label: 'Tierra' },
  { value: 'flying', label: 'Volador' },
  { value: 'psychic', label: 'Psíquico' },
  { value: 'bug', label: 'Bicho' },
  { value: 'rock', label: 'Roca' },
  { value: 'ghost', label: 'Fantasma' },
  { value: 'dragon', label: 'Dragón' },
  { value: 'dark', label: 'Siniestro' },
  { value: 'steel', label: 'Acero' },
  { value: 'fairy', label: 'Hada' }
];

const colors = [
  { value: 'red', label: 'Rojo', class: 'bg-red-500' },
  { value: 'blue', label: 'Azul', class: 'bg-blue-500' },
  { value: 'green', label: 'Verde', class: 'bg-green-500' },
  { value: 'yellow', label: 'Amarillo', class: 'bg-yellow-400' },
  { value: 'purple', label: 'Morado', class: 'bg-purple-500' },
  { value: 'pink', label: 'Rosa', class: 'bg-pink-400' },
  { value: 'brown', label: 'Marrón', class: 'bg-amber-800' },
  { value: 'orange', label: 'Naranja', class: 'bg-orange-500' },
  { value: 'black', label: 'Negro', class: 'bg-neutral-900' },
  { value: 'gray', label: 'Gris', class: 'bg-gray-500' },
];

export default function Step3Customization({ pokemonData, setPokemonData }: Step3Props) {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6">Personaliza tu Pokémon</h3>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="pokemonName" className="block font-semibold mb-2">
            Nombre del Pokémon
          </label>
          <input
            type="text"
            id="pokemonName"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
            placeholder="Ej: Dracoflame"
            maxLength={20}
            value={pokemonData.name}
            onChange={(e) => setPokemonData({ ...pokemonData, name: e.target.value })}
            aria-required="true"
          />
        </div>

        <div>
          <label htmlFor="pokemonType" className="block font-semibold mb-2">
            Tipo Principal
          </label>
          <select
            id="pokemonType"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
            value={pokemonData.type}
            onChange={(e) => setPokemonData({ ...pokemonData, type: e.target.value })}
          >
            <option value="">Selecciona un tipo</option>
            {types.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-2">Color Principal</label>
          <div className="flex gap-4 flex-wrap">
            {colors.map(color => (
              <div key={color.value} className="relative">
                <input
                  type="radio"
                  id={`color-${color.value}`}
                  name="color"
                  value={color.value}
                  checked={pokemonData.color === color.value}
                  onChange={(e) => setPokemonData({ ...pokemonData, color: e.target.value })}
                  className="sr-only"
                />
                <label
                  htmlFor={`color-${color.value}`}
                  className={`block w-12 h-12 rounded-full cursor-pointer border-4 transition-all ${color.class} ${
                    pokemonData.color === color.value
                      ? 'border-gray-900 scale-110 shadow-md'
                      : 'border-transparent hover:scale-105'
                  }`}
                  aria-label={color.label}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="pokemonDescription" className="block font-semibold mb-2">
            Descripción (Opcional)
          </label>
          <textarea
            id="pokemonDescription"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-y"
            placeholder="Describe las características únicas de tu Pokémon..."
            maxLength={200}
            rows={4}
            value={pokemonData.description}
            onChange={(e) => setPokemonData({ ...pokemonData, description: e.target.value })}
          />
        </div>
      </div>
    </div>
  )
}
