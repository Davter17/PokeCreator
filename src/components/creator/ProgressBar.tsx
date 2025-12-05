interface ProgressBarProps {
  currentStep: number
}

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  const steps = [
    { number: 1, label: 'Animal Base' },
    { number: 2, label: 'Habilidades' },
    { number: 3, label: 'Personalización' },
    { number: 4, label: 'Resultado' }
  ]

  return (
    <div className="relative flex justify-between px-4 mb-12">
      <div className="absolute top-5 left-[10%] right-[10%] h-0.5 bg-gray-300 -z-10" />
      
      {steps.map((step, index) => (
        <div key={step.number} className="flex flex-col items-center gap-2 relative z-10 flex-1">
          <div 
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
              index <= currentStep
                ? 'bg-primary text-white shadow-md'
                : 'bg-gray-300 text-gray-600'
            }`}
          >
            {step.number}
          </div>
          <span className={`text-xs sm:text-sm text-center ${index <= currentStep ? 'text-primary font-semibold' : 'text-gray-500'}`}>
            {step.label}
          </span>
        </div>
      ))}
    </div>
  )
}
