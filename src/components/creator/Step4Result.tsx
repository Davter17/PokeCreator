import { useState, useEffect } from 'react'
import type { PokemonData } from '../../types'
import ShareModal from '../ShareModal'

interface Step4Props {
  pokemonData: PokemonData
  onSave: (imageUrl: string) => void
  onReset: () => void
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

export default function Step4Result({ pokemonData, onSave, onReset }: Step4Props) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const [imageUrl, setImageUrl] = useState('')

  const gradient = typeGradients[pokemonData.type] || 'from-primary to-accent'

  useEffect(() => {
    generatePokemonImage()
  }, [pokemonData])

  const generatePokemonImage = () => {
    setImageLoading(true)

    // Crear prompt detallado para la IA
    const abilities = pokemonData.abilities.map(a => a.name).join(', ')
    const prompt = `A cute fantasy creature pokemon style, based on a ${pokemonData.animal?.name}, 
      with ${pokemonData.type} type powers, abilities: ${abilities}, 
      ${pokemonData.color} colored, ${pokemonData.description || 'mystical and powerful'}, 
      digital art, high quality, centered, white background, full body`
    
    // URL de Pollinations.ai para generación de imágenes con seed único
    const seed = Date.now()
    const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&nologo=true&model=flux&seed=${seed}`
    
    setImageUrl(pollinationsUrl)
    
    // Precargar imagen
    const img = new Image()
    img.onload = () => {
      setImageLoading(false)
    }
    img.onerror = () => {
      setImageLoading(false)
      console.error('Error al cargar la imagen')
    }
    img.src = pollinationsUrl
  }

  const regenerateImage = () => {
    generatePokemonImage()
  }

  const handleSave = () => {
    if (!imageUrl) {
      alert('Por favor espera a que la imagen termine de generarse')
      return
    }
    console.log('Guardando Pokémon con imageUrl:', imageUrl)
    onSave(imageUrl)
  }

  return (
    <>
      <div className="animate-fade-in max-w-xl mx-auto">
        <h3 className="text-2xl font-semibold mb-6 text-center">¡Tu Pokémon está listo!</h3>
        
        <div className={`bg-gradient-to-br ${gradient} rounded-2xl p-8 mb-8 shadow-2xl text-white`}>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl h-80 flex items-center justify-center mb-6 overflow-hidden">
            {imageLoading ? (
              <div className="text-center">
                <div className="animate-spin text-6xl mb-4">⚡</div>
                <span className="text-lg font-semibold">Generando imagen con IA...</span>
                <p className="text-sm mt-2 opacity-80">Esto puede tomar unos segundos</p>
              </div>
            ) : (
              <img 
                src={imageUrl} 
                alt={pokemonData.name}
                className="w-full h-full object-contain p-4"
              />
            )}
          </div>

          <div className="text-center">
            <h4 className="text-3xl font-bold mb-2">{pokemonData.name || 'Mi Pokémon'}</h4>
            <span className="inline-block bg-white/30 px-4 py-1 rounded-full text-sm font-semibold mb-4 capitalize">
              {pokemonData.type || 'Desconocido'}
            </span>
            
            <div className="flex gap-2 justify-center flex-wrap mb-4">
              {pokemonData.abilities.map((ability) => (
                <span key={ability.value} className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                  {ability.icon} {ability.name}
                </span>
              ))}
            </div>

            <p className="text-sm opacity-95 leading-relaxed mb-4">
              {pokemonData.description || 
                `Un Pokémon único creado combinando ${pokemonData.animal?.name || 'un animal'} con poderes especiales.`
              }
            </p>

            <button 
              onClick={regenerateImage}
              className="text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all"
              disabled={imageLoading}
            >
              🔄 Regenerar Imagen
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button 
            onClick={() => setIsShareModalOpen(true)}
            className="btn btn-large btn-primary w-full"
          >
            Compartir Imagen
          </button>
          <button 
            onClick={handleSave}
            className="btn btn-large btn-secondary w-full"
            disabled={imageLoading}
          >
            {imageLoading ? 'Generando imagen...' : 'Guardar Pokémon'}
          </button>
          <button 
            onClick={onReset}
            className="btn btn-outline w-full"
          >
            Crear Otro
          </button>
        </div>
      </div>

      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)}
        pokemonName={pokemonData.name}
        imageUrl={imageUrl}
      />
    </>
  )
}
