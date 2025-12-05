import { useState } from 'react'

interface SavedPokemon {
  id: number
  name: string
  type: string
  imageUrl?: string
  animal?: { name: string; icon: string }
  abilities: Array<{ name: string; icon: string; value: string }>
  description?: string
  color?: string
}

export default function Gallery() {
  const [selectedPokemon, setSelectedPokemon] = useState<SavedPokemon | null>(null)
  const savedPokemons: SavedPokemon[] = JSON.parse(localStorage.getItem('savedPokemons') || '[]')

  const handleDelete = (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar este Pokémon?')) {
      const updated = savedPokemons.filter(p => p.id !== id)
      localStorage.setItem('savedPokemons', JSON.stringify(updated))
      setSelectedPokemon(null)
      window.location.reload()
    }
  }

  const typeGradients: Record<string, string> = {
    fire: 'from-pokemon-fire to-accent',
    water: 'from-pokemon-water to-primary',
    grass: 'from-pokemon-grass to-green-400',
    electric: 'from-pokemon-electric to-secondary',
    psychic: 'from-pokemon-psychic to-accent-light',
    dark: 'from-pokemon-dark to-gray-700',
    dragon: 'from-pokemon-dragon to-primary'
  }

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-primary mb-8">Mis Pokémon</h2>
        
        {savedPokemons.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎨</div>
            <p className="text-gray-600 mb-4">Aún no has creado ningún Pokémon</p>
            <button 
              onClick={() => window.location.href = '/create'}
              className="btn btn-primary"
            >
              Crear mi primer Pokémon
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {savedPokemons.map((pokemon) => (
                <div 
                  key={pokemon.id}
                  onClick={() => setSelectedPokemon(pokemon)}
                  className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:border-primary hover:-translate-y-1 hover:shadow-lg transition-all"
                >
                  {pokemon.imageUrl ? (
                    <img 
                      src={pokemon.imageUrl} 
                      alt={pokemon.name}
                      className="w-full h-32 object-contain mb-2 rounded-lg"
                    />
                  ) : (
                    <div className="text-5xl mb-2">{pokemon.animal?.icon || '🎨'}</div>
                  )}
                  <h4 className="text-sm font-semibold mb-1 truncate">{pokemon.name}</h4>
                  <span className="text-xs text-gray-600 capitalize">{pokemon.type}</span>
                </div>
              ))}
          
              <div 
                className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-4 min-h-[180px] flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-blue-50 transition-all"
                onClick={() => window.location.href = '/create'}
              >
                <div className="text-4xl mb-2 font-light">+</div>
                <p className="text-sm font-semibold">Crear Nuevo</p>
              </div>
            </div>

            {selectedPokemon && (
              <div 
                className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                onClick={() => setSelectedPokemon(null)}
              >
                <div 
                  className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className={`bg-gradient-to-br ${typeGradients[selectedPokemon.type] || 'from-primary to-accent'} p-8 text-white`}>
                    {selectedPokemon.imageUrl ? (
                      <img 
                        src={selectedPokemon.imageUrl} 
                        alt={selectedPokemon.name}
                        className="w-full h-80 object-contain mb-4 bg-white/20 backdrop-blur-sm rounded-xl p-4"
                      />
                    ) : (
                      <div className="text-9xl text-center mb-4">{selectedPokemon.animal?.icon || '🎨'}</div>
                    )}
                    <h3 className="text-3xl font-bold text-center mb-2">{selectedPokemon.name}</h3>
                    <p className="text-center mb-4">
                      <span className="inline-block bg-white/30 px-4 py-1 rounded-full text-sm font-semibold capitalize">
                        {selectedPokemon.type}
                      </span>
                    </p>
                    <div className="flex gap-2 justify-center flex-wrap mb-4">
                      {selectedPokemon.abilities?.map((ability) => (
                        <span key={ability.value} className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                          {ability.icon} {ability.name}
                        </span>
                      ))}
                    </div>
                    {selectedPokemon.description && (
                      <p className="text-sm opacity-95 text-center leading-relaxed">
                        {selectedPokemon.description}
                      </p>
                    )}
                  </div>
                  <div className="p-6 flex gap-4">
                    {selectedPokemon.imageUrl && (
                      <a 
                        href={selectedPokemon.imageUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-primary flex-1"
                      >
                        Ver Imagen Completa
                      </a>
                    )}
                    <button 
                      onClick={() => handleDelete(selectedPokemon.id)}
                      className="btn btn-outline text-red-600 border-red-600 hover:bg-red-50"
                    >
                      Eliminar
                    </button>
                    <button 
                      onClick={() => setSelectedPokemon(null)}
                      className="btn btn-secondary"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
