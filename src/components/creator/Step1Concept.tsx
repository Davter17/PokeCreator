import type { PokemonData } from '@/types'
import { SECURITY_CONFIG, validateConcept, sanitizeInput } from '@/utils/security'

interface Step1Props {
  pokemonData: PokemonData
  setPokemonData: React.Dispatch<React.SetStateAction<PokemonData>>
}

export default function Step1Concept({ pokemonData, setPokemonData }: Step1Props) {
  const concept = pokemonData.concept
  const isValid = validateConcept(concept)
  const showError = concept.length > 0 && !isValid

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <h3 className="text-2xl font-semibold mb-2">Concepto Base</h3>
      <p className="text-gray-600 mb-6">
        Escribe una palabra (sin espacios, máx. {SECURITY_CONFIG.MAX_LENGTHS.POKEMON_CONCEPT} caracteres) que describa la base de tu Pokémon.
      </p>

      <input
        type="text"
        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-4 outline-none transition-all ${
          showError
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
            : 'border-gray-300 focus:border-primary focus:ring-primary/10'
        }`}
        placeholder="Ej: dragón, fénix, robot, samurai..."
        maxLength={SECURITY_CONFIG.MAX_LENGTHS.POKEMON_CONCEPT}
        value={concept}
        onChange={(e) => setPokemonData({ ...pokemonData, concept: sanitizeInput(e.target.value).replace(/\s/g, '') })}
        aria-required="true"
        aria-invalid={showError}
        autoFocus
      />

      <div className="flex justify-between items-center mt-2">
        {showError ? (
          <p className="text-sm text-red-600">
            {concept.includes(' ') ? 'No se permiten espacios' : 'Máximo 20 caracteres'}
          </p>
        ) : (
          <p className="text-sm text-gray-400">Sin espacios, una sola palabra</p>
        )}
        <span className="text-sm text-gray-400">{concept.length}/{SECURITY_CONFIG.MAX_LENGTHS.POKEMON_CONCEPT}</span>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Ejemplos:</strong> dragón, fénix, robot, samurai, tigre, serpiente, fantasma, guerrero, hada, demonio...
        </p>
      </div>
    </div>
  )
}
