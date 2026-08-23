import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { SavedPokemon, TYPE_GRADIENTS } from '@/types'
import { useDialog } from '@/context/DialogContext'

export default function Gallery() {
  const navigate = useNavigate()
  const { confirm } = useDialog()
  const [savedPokemons, setSavedPokemons] = useState<SavedPokemon[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('savedPokemons') || '[]')
    } catch {
      return []
    }
  })
  const [selectedPokemon, setSelectedPokemon] = useState<SavedPokemon | null>(null)

  const handleDelete = useCallback(async (id: number) => {
    const ok = await confirm('¿Estás seguro de que quieres eliminar este Pokémon?')
    if (!ok) return

    const updated = savedPokemons.filter(p => p.id !== id)
    localStorage.setItem('savedPokemons', JSON.stringify(updated))
    setSavedPokemons(updated)
    setSelectedPokemon(null)
  }, [savedPokemons, confirm])

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-primary mb-8">Mis Pokémon</h2>

        {savedPokemons.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎨</div>
            <p className="text-gray-600 mb-4">Aún no has creado ningún Pokémon</p>
            <button
              onClick={() => navigate('/create')}
              className="btn btn-primary"
            >
              Crear mi primer Pokémon
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {savedPokemons.map((pokemon) => {
                const primaryType = pokemon.types[0] || ''
                return (
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
                      <div
                        className="w-full h-32 mb-2 rounded-lg flex items-center justify-center text-white text-2xl font-bold capitalize"
                        style={{ background: `linear-gradient(135deg, ${pokemon.primaryColor}, ${pokemon.secondaryColor})` }}
                      >
                        {pokemon.concept?.slice(0, 2) || '🎨'}
                      </div>
                    )}
                    <h4 className="text-sm font-semibold mb-1 truncate">{pokemon.name}</h4>
                    <span className="text-xs text-gray-600 capitalize">{pokemon.types.join(' / ')}</span>
                  </div>
                )
              })}

              <div
                className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-4 min-h-[180px] flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-blue-50 transition-all"
                onClick={() => navigate('/create')}
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
                  <div
                    className="p-8 text-white"
                    style={{ background: `linear-gradient(135deg, ${selectedPokemon.primaryColor}, ${selectedPokemon.secondaryColor})` }}
                  >
                    {selectedPokemon.imageUrl ? (
                      <img
                        src={selectedPokemon.imageUrl}
                        alt={selectedPokemon.name}
                        className="w-full h-80 object-contain mb-4 bg-white/20 backdrop-blur-sm rounded-xl p-4"
                      />
                    ) : (
                      <div className="text-9xl text-center mb-4 capitalize">{selectedPokemon.concept?.slice(0, 2) || '🎨'}</div>
                    )}
                    <h3 className="text-3xl font-bold text-center mb-2">{selectedPokemon.name}</h3>
                    <p className="text-center mb-4">
                      <span className="inline-block bg-white/30 px-4 py-1 rounded-full text-sm font-semibold capitalize">
                        {selectedPokemon.types.join(' / ')}
                      </span>
                    </p>
                    <div className="flex justify-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full border-2 border-white/50" style={{ backgroundColor: selectedPokemon.primaryColor }} />
                        <span className="text-xs font-mono">{selectedPokemon.primaryColor}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full border-2 border-white/50" style={{ backgroundColor: selectedPokemon.secondaryColor }} />
                        <span className="text-xs font-mono">{selectedPokemon.secondaryColor}</span>
                      </div>
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
