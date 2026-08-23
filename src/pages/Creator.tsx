import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import type { PokemonData } from '@/types'
import { validateConcept, validatePokemonName, validateDescription, SECURITY_CONFIG } from '@/utils/security'
import { useDialog } from '@/context/DialogContext'
import ProgressBar from '@/components/creator/ProgressBar'
import Step1Concept from '@/components/creator/Step1Concept'
import Step3Customization from '@/components/creator/Step3Customization'
import Step4Result from '@/components/creator/Step4Result'

const TOTAL_STEPS = 2

export default function Creator() {
  const navigate = useNavigate()
  const location = useLocation()
  const { alert } = useDialog()
  const initialState = (location.state as { random?: boolean; pokemonData?: PokemonData } | null)?.pokemonData
  const [currentStep, setCurrentStep] = useState(initialState ? 2 : 0)
  const [pokemonData, setPokemonData] = useState<PokemonData>(initialState || {
    concept: '',
    types: [],
    name: '',
    primaryColor: '#3B4CCA',
    secondaryColor: '#FF5350',
    description: ''
  })

  const validateStep = (step: number): boolean => {
    switch(step) {
      case 0:
        return validateConcept(pokemonData.concept)
      case 1:
        return validatePokemonName(pokemonData.name)
          && pokemonData.types.length >= SECURITY_CONFIG.MAX_LENGTHS.MIN_TYPES
          && pokemonData.types.length <= SECURITY_CONFIG.MAX_LENGTHS.MAX_TYPES
          && validateDescription(pokemonData.description || 'placeholder')
      default:
        return true
    }
  }

  const handleNext = async () => {
    if (!validateStep(currentStep)) {
      const messages = [
        'Escribe un concepto base válido (sin espacios, máx. 20 caracteres)',
        'Completa el nombre y selecciona 1 o 2 tipos'
      ]
      await alert(messages[currentStep])
      return
    }

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSave = async (imageUrl: string) => {
    const savedPokemons = JSON.parse(localStorage.getItem('savedPokemons') || '[]')
    savedPokemons.push({
      ...pokemonData,
      id: Date.now(),
      imageUrl,
      createdAt: new Date().toISOString()
    })
    localStorage.setItem('savedPokemons', JSON.stringify(savedPokemons))
    await alert('¡Pokémon guardado exitosamente!', '¡Listo!')
    navigate('/gallery')
  }

  const handleReset = () => {
    setPokemonData({
      concept: '',
      types: [],
      name: '',
      primaryColor: '#3B4CCA',
      secondaryColor: '#FF5350',
      description: ''
    })
    setCurrentStep(0)
  }

  return (
    <section className="max-w-5xl mx-auto px-4 lg:px-8 py-12">
      <div className="bg-white rounded-2xl p-6 lg:p-12 shadow-lg">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">Diseña tu Pokémon</h2>

        <ProgressBar currentStep={currentStep} />

        <div className="mt-8">
          {currentStep === 0 && (
            <Step1Concept
              pokemonData={pokemonData}
              setPokemonData={setPokemonData}
            />
          )}

          {currentStep === 1 && (
            <Step3Customization
              pokemonData={pokemonData}
              setPokemonData={setPokemonData}
            />
          )}

          {currentStep === 2 && (
            <Step4Result
              pokemonData={pokemonData}
              onSave={handleSave}
              onReset={handleReset}
            />
          )}
        </div>

        {currentStep < TOTAL_STEPS && (
          <div className="flex justify-between mt-8 pt-8 border-t border-gray-200">
            <button
              onClick={handlePrev}
              className={`btn btn-secondary ${currentStep === 0 ? 'invisible' : ''}`}
            >
              ← Anterior
            </button>
            <button
              onClick={handleNext}
              className="btn btn-primary"
            >
              {currentStep === 1 ? 'Finalizar' : 'Siguiente →'}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
