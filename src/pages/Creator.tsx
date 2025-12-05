import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { PokemonData } from '../types'
import ProgressBar from '../components/creator/ProgressBar'
import Step1AnimalSelection from '../components/creator/Step1AnimalSelection'
import Step2AbilitySelection from '../components/creator/Step2AbilitySelection'
import Step3Customization from '../components/creator/Step3Customization'
import Step4Result from '../components/creator/Step4Result'

export default function Creator() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [pokemonData, setPokemonData] = useState<PokemonData>({
    animal: null,
    abilities: [],
    name: '',
    type: '',
    color: '',
    description: ''
  })

  const validateStep = (step: number): boolean => {
    switch(step) {
      case 0:
        return pokemonData.animal !== null
      case 1:
        return pokemonData.abilities.length > 0
      case 2:
        return pokemonData.name.trim() !== '' && pokemonData.type !== ''
      default:
        return true
    }
  }

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      const messages = [
        'Por favor, selecciona un animal base',
        'Selecciona al menos una habilidad',
        'Completa el nombre y tipo de tu Pokémon'
      ]
      alert(messages[currentStep])
      return
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSave = (imageUrl: string) => {
    const savedPokemons = JSON.parse(localStorage.getItem('savedPokemons') || '[]')
    savedPokemons.push({
      ...pokemonData,
      id: Date.now(),
      imageUrl,
      createdAt: new Date().toISOString()
    })
    localStorage.setItem('savedPokemons', JSON.stringify(savedPokemons))
    alert('¡Pokémon guardado exitosamente!')
    navigate('/gallery')
  }

  const handleReset = () => {
    setPokemonData({
      animal: null,
      abilities: [],
      name: '',
      type: '',
      color: '',
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
            <Step1AnimalSelection
              pokemonData={pokemonData}
              setPokemonData={setPokemonData}
            />
          )}
          
          {currentStep === 1 && (
            <Step2AbilitySelection
              pokemonData={pokemonData}
              setPokemonData={setPokemonData}
            />
          )}
          
          {currentStep === 2 && (
            <Step3Customization
              pokemonData={pokemonData}
              setPokemonData={setPokemonData}
            />
          )}
          
          {currentStep === 3 && (
            <Step4Result
              pokemonData={pokemonData}
              onSave={handleSave}
              onReset={handleReset}
            />
          )}
        </div>

        {currentStep < 3 && (
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
              {currentStep === 2 ? 'Finalizar' : 'Siguiente →'}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
