import { useState, useEffect, useRef, useCallback } from 'react'
import type { PokemonData } from '@/types'
import { sanitizeInput } from '@/utils/security'
import { useDialog } from '@/context/DialogContext'
import ShareModal from '@/components/ShareModal'

interface Step4Props {
  pokemonData: PokemonData
  onSave: (imageUrl: string) => void
  onReset: () => void
}

const MAX_RETRIES = 3
const IMAGE_TIMEOUT = 120000
const RETRY_DELAY = 5000

function escapeXml(value: string): string {
  const entities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&apos;',
    '"': '&quot;'
  }
  return value.replace(/[&<>'"]/g, c => entities[c] || c)
}

function buildFallbackImage(pokemonData: PokemonData): string {
  const primary = pokemonData.primaryColor || '#3B4CCA'
  const secondary = pokemonData.secondaryColor || '#FF5350'
  const concept = escapeXml(sanitizeInput(pokemonData.concept || 'creature'))
  const name = escapeXml(pokemonData.name || 'Mi Pokemon')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
    <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${primary}"/><stop offset="1" stop-color="${secondary}"/></linearGradient></defs>
    <rect width="512" height="512" rx="48" fill="url(#bg)"/>
    <ellipse cx="256" cy="270" rx="130" ry="150" fill="#fff" opacity=".92"/>
    <path d="M150 160 Q160 110 200 130 L190 170 Z" fill="${primary}" opacity=".8"/>
    <path d="M362 160 Q352 110 312 130 L322 170 Z" fill="${primary}" opacity=".8"/>
    <circle cx="210" cy="250" r="18" fill="#222"/><circle cx="302" cy="250" r="18" fill="#222"/>
    <circle cx="216" cy="244" r="6" fill="#fff"/><circle cx="308" cy="244" r="6" fill="#fff"/>
    <path d="M225 300q31 25 62 0" fill="none" stroke="#222" stroke-width="8" stroke-linecap="round"/>
    <text x="256" y="430" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" font-weight="700" fill="#fff">${name}</text>
    <text x="256" y="462" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" fill="#fff" opacity=".8">${concept}</text>
  </svg>`
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

export default function Step4Result({ pokemonData, onSave, onReset }: Step4Props) {
  const { alert } = useDialog()
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)
  const [usingFallback, setUsingFallback] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [imgKey, setImgKey] = useState(0)
  const [debugLogs, setDebugLogs] = useState<string[]>([])
  const [showDebug, setShowDebug] = useState(false)
  const retryCount = useRef(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isLoadingRef = useRef(false)

  const log = useCallback((msg: string) => {
    const ts = new Date().toLocaleTimeString()
    const entry = `[${ts}] ${msg}`
    console.log('[Step4Result]', entry)
    setDebugLogs(prev => [...prev, entry])
  }, [])

  const buildPromptUrl = useCallback(() => {
    const concept = sanitizeInput(pokemonData.concept || 'creature')
    const prompt = `cute pokemon ${concept}`
    const seed = Date.now() + retryCount.current * 1000
    return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&model=turbo&seed=${seed}`
  }, [pokemonData])

  const useFallback = useCallback(() => {
    log('Usando imagen de respaldo local')
    const fallbackUrl = buildFallbackImage(pokemonData)
    setImageUrl(fallbackUrl)
    setImgKey(k => k + 1)
    setImageLoading(false)
    setImageError(false)
    setUsingFallback(true)
    isLoadingRef.current = false
  }, [pokemonData, log])

  const startLoading = useCallback(() => {
    if (isLoadingRef.current) return
    isLoadingRef.current = true

    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setUsingFallback(false)
    log(`Intento ${retryCount.current + 1}/${MAX_RETRIES}`)
    setImageLoading(true)
    setImageError(false)
    const url = buildPromptUrl()
    log(`URL: ${url}`)
    setImageUrl(url)
    setImgKey(k => k + 1)

    timeoutRef.current = setTimeout(() => {
      log('TIMEOUT 120s')
      isLoadingRef.current = false
      retryCount.current++
      if (retryCount.current < MAX_RETRIES) {
        log(`Esperando ${RETRY_DELAY / 1000}s antes de reintentar...`)
        setTimeout(() => startLoading(), RETRY_DELAY)
      } else {
        useFallback()
      }
    }, IMAGE_TIMEOUT)
  }, [buildPromptUrl, log, useFallback])

  useEffect(() => {
    log(`Montado: concept="${pokemonData.concept}" types=[${pokemonData.types}]`)
    retryCount.current = 0
    isLoadingRef.current = false
    startLoading()
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      isLoadingRef.current = false
    }
  }, [])

  const handleImageLoad = () => {
    log('ONLOAD: Imagen cargada!')
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    isLoadingRef.current = false
    setImageLoading(false)
    setImageError(false)
    setUsingFallback(false)
    retryCount.current = 0
  }

  const handleImageError = () => {
    log(`ONERROR (intento ${retryCount.current + 1})`)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    isLoadingRef.current = false
    retryCount.current++
    if (retryCount.current < MAX_RETRIES) {
      const delay = RETRY_DELAY * retryCount.current
      log(`Reintento ${retryCount.current + 1} en ${delay / 1000}s`)
      setTimeout(() => startLoading(), delay)
    } else {
      useFallback()
    }
  }

  const regenerateImage = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    isLoadingRef.current = false
    retryCount.current = 0
    startLoading()
  }

  const handleSave = async () => {
    if (imageLoading) {
      await alert('Por favor espera a que la imagen termine de generarse')
      return
    }
    onSave(imageUrl)
  }

  return (
    <>
      <div className="animate-fade-in max-w-xl mx-auto">
        <h3 className="text-2xl font-semibold mb-6 text-center">¡Tu Pokémon está listo!</h3>

        <div className="rounded-2xl p-8 mb-8 shadow-2xl text-white" style={{
          background: `linear-gradient(135deg, ${pokemonData.primaryColor || '#3B4CCA'}, ${pokemonData.secondaryColor || '#FF5350'})`
        }}>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl h-80 flex items-center justify-center mb-6 overflow-hidden relative">
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="text-center">
                  <div className="animate-spin text-6xl mb-4">⚡</div>
                  <span className="text-lg font-semibold">Generando imagen con IA...</span>
                  <p className="text-sm mt-2 opacity-80">Esto puede tomar hasta 2 minutos</p>
                </div>
              </div>
            )}
            <img
              key={imgKey}
              src={imageUrl}
              alt={pokemonData.name}
              className="w-full h-full object-contain p-4"
              referrerPolicy="no-referrer"
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={{ opacity: imageLoading ? 0 : 1, transition: 'opacity 0.3s' }}
            />
          </div>

          <div className="text-center">
            <h4 className="text-3xl font-bold mb-2">{pokemonData.name || 'Mi Pokémon'}</h4>

            <div className="flex gap-2 justify-center flex-wrap mb-4">
              {pokemonData.types.map((type) => (
                <span key={type} className="inline-block bg-white/30 px-4 py-1 rounded-full text-sm font-semibold capitalize">
                  {type}
                </span>
              ))}
            </div>

            {usingFallback && (
              <p className="text-xs bg-yellow-500/30 rounded-lg px-3 py-1 mb-3 inline-block">
                ⚠️ IA no disponible — mostrando imagen de respaldo
              </p>
            )}

            <p className="text-sm opacity-95 leading-relaxed mb-4">
              {pokemonData.description ||
                `Un Pokémon único basado en el concepto "${pokemonData.concept}".`
              }
            </p>

            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full border-2 border-white/50" style={{ backgroundColor: pokemonData.primaryColor }} />
                <span className="text-xs font-mono">{pokemonData.primaryColor}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full border-2 border-white/50" style={{ backgroundColor: pokemonData.secondaryColor }} />
                <span className="text-xs font-mono">{pokemonData.secondaryColor}</span>
              </div>
            </div>

            <div className="flex gap-2 justify-center flex-wrap">
              <button
                onClick={regenerateImage}
                className="text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all"
                disabled={imageLoading}
              >
                🔄 Regenerar Imagen
              </button>
              <button
                onClick={() => setShowDebug(!showDebug)}
                className="text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all"
              >
                🐛 Debug
              </button>
            </div>
          </div>
        </div>

        {showDebug && (
          <div className="bg-gray-900 text-green-400 rounded-lg p-4 mb-4 max-h-64 overflow-y-auto font-mono text-xs">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-bold">Debug Log</span>
              <div className="flex gap-2">
                <button onClick={() => setDebugLogs([])} className="text-xs bg-gray-700 px-2 py-1 rounded text-white hover:bg-gray-600">Limpiar</button>
                <button onClick={() => imageUrl && window.open(imageUrl, '_blank')} className="text-xs bg-gray-700 px-2 py-1 rounded text-white hover:bg-gray-600">Abrir URL</button>
              </div>
            </div>
            {debugLogs.map((entry, i) => (
              <div key={i} className="mb-1 break-all">{entry}</div>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <button onClick={() => setIsShareModalOpen(true)} className="btn btn-large btn-primary w-full">
            Compartir Imagen
          </button>
          <button onClick={handleSave} className="btn btn-large btn-secondary w-full" disabled={imageLoading}>
            {imageLoading ? 'Generando imagen...' : 'Guardar Pokémon'}
          </button>
          <button onClick={onReset} className="btn btn-outline w-full">
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
