import { useEffect } from 'react'
import type { PokemonData } from '@/types'
import { POKEMON_TYPES as TYPES } from '@/types'
import { SECURITY_CONFIG, sanitizeInput, validatePokemonName, validateDescription } from '@/utils/security'

interface Step3Props {
  pokemonData: PokemonData
  setPokemonData: React.Dispatch<React.SetStateAction<PokemonData>>
}

export default function Step3Customization({ pokemonData, setPokemonData }: Step3Props) {
  useEffect(() => {
    if (!pokemonData.primaryColor) {
      setPokemonData(prev => ({ ...prev, primaryColor: '#3B4CCA' }))
    }
    if (!pokemonData.secondaryColor) {
      setPokemonData(prev => ({ ...prev, secondaryColor: '#FF5350' }))
    }
  }, [])

  const nameError = pokemonData.name && !validatePokemonName(pokemonData.name)
    ? 'Solo letras, números y espacios (máx. 20 caracteres)'
    : ''
  const descError = pokemonData.description && !validateDescription(pokemonData.description)
    ? 'La descripción es demasiado larga (máx. 200 caracteres)'
    : ''

  const toggleType = (value: string) => {
    const isSelected = pokemonData.types.includes(value)
    if (isSelected) {
      setPokemonData({ ...pokemonData, types: pokemonData.types.filter(t => t !== value) })
    } else {
      if (pokemonData.types.length >= SECURITY_CONFIG.MAX_LENGTHS.MAX_TYPES) return
      setPokemonData({ ...pokemonData, types: [...pokemonData.types, value] })
    }
  }

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
            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-4 outline-none transition-all ${
              nameError
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
                : 'border-gray-300 focus:border-primary focus:ring-primary/10'
            }`}
            placeholder="Ej: Dracoflame"
            maxLength={SECURITY_CONFIG.MAX_LENGTHS.POKEMON_NAME}
            value={pokemonData.name}
            onChange={(e) => setPokemonData({ ...pokemonData, name: sanitizeInput(e.target.value) })}
            aria-required="true"
            aria-invalid={!!nameError}
          />
          {nameError && <p className="text-sm text-red-600 mt-1">{nameError}</p>}
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Tipo(s) — selecciona {SECURITY_CONFIG.MAX_LENGTHS.MIN_TYPES} o {SECURITY_CONFIG.MAX_LENGTHS.MAX_TYPES}
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {TYPES.map(type => {
              const isSelected = pokemonData.types.includes(type.value)
              const isDisabled = !isSelected && pokemonData.types.length >= SECURITY_CONFIG.MAX_LENGTHS.MAX_TYPES
              return (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => !isDisabled && toggleType(type.value)}
                  disabled={isDisabled}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold border-2 transition-all ${
                    isSelected
                      ? 'border-primary bg-primary text-white'
                      : isDisabled
                        ? 'border-gray-200 bg-gray-100 text-gray-300 cursor-not-allowed'
                        : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-primary'
                  }`}
                >
                  {type.label}
                </button>
              )
            })}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Seleccionados: {pokemonData.types.length}/{SECURITY_CONFIG.MAX_LENGTHS.MAX_TYPES}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="primaryColor" className="block font-semibold mb-2">
              Color Principal
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                id="primaryColor"
                value={pokemonData.primaryColor || '#3B4CCA'}
                onChange={(e) => setPokemonData({ ...pokemonData, primaryColor: e.target.value })}
                className="w-16 h-16 rounded-lg border-2 border-gray-300 cursor-pointer"
              />
              <span className="text-sm font-mono text-gray-600">
                {pokemonData.primaryColor || '#3B4CCA'}
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="secondaryColor" className="block font-semibold mb-2">
              Color Secundario
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                id="secondaryColor"
                value={pokemonData.secondaryColor || '#FF5350'}
                onChange={(e) => setPokemonData({ ...pokemonData, secondaryColor: e.target.value })}
                className="w-16 h-16 rounded-lg border-2 border-gray-300 cursor-pointer"
              />
              <span className="text-sm font-mono text-gray-600">
                {pokemonData.secondaryColor || '#FF5350'}
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg" style={{
          background: `linear-gradient(135deg, ${pokemonData.primaryColor || '#3B4CCA'}, ${pokemonData.secondaryColor || '#FF5350'})`
        }}>
          <p className="text-white text-center text-sm font-semibold drop-shadow">
            Vista previa de la paleta
          </p>
        </div>

        <div>
          <label htmlFor="pokemonDescription" className="block font-semibold mb-2">
            Descripción (Opcional)
          </label>
          <textarea
            id="pokemonDescription"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-y"
            placeholder="Describe las características únicas de tu Pokémon..."
            maxLength={SECURITY_CONFIG.MAX_LENGTHS.POKEMON_DESCRIPTION}
            rows={4}
            value={pokemonData.description}
            onChange={(e) => setPokemonData({ ...pokemonData, description: e.target.value })}
            aria-invalid={!!descError}
          />
          {descError && <p className="text-sm text-red-600 mt-1">{descError}</p>}
        </div>
      </div>
    </div>
  )
}
