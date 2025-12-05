import Modal from './Modal'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  pokemonName: string
  imageUrl?: string
}

export default function ShareModal({ isOpen, onClose, pokemonName, imageUrl }: ShareModalProps) {
  const shareUrl = imageUrl || window.location.href

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
    alert('¡Link copiado al portapapeles!')
  }

  const shareOnWhatsApp = () => {
    const text = `¡Acabo de crear a ${pokemonName}! 🎨✨ ${shareUrl}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')
  }

  const shareOnTwitter = () => {
    const text = `¡Acabo de crear a ${pokemonName}! 🎨✨`
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`, '_blank')
  }

  const downloadImage = async () => {
    if (!imageUrl) {
      alert('La imagen aún no está lista')
      return
    }

    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${pokemonName.toLowerCase().replace(/\s/g, '-') || 'pokemon'}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Error al descargar:', err)
      // Fallback: abrir imagen en nueva pestaña
      window.open(imageUrl, '_blank')
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Compartir tu Pokémon">
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button 
          onClick={shareOnWhatsApp}
          className="flex flex-col items-center gap-2 p-4 border-2 border-gray-300 rounded-lg hover:border-primary hover:-translate-y-0.5 hover:shadow-md transition-all"
        >
          <span className="text-3xl">📱</span>
          <span className="text-sm font-semibold">WhatsApp</span>
        </button>
        <button 
          onClick={shareOnFacebook}
          className="flex flex-col items-center gap-2 p-4 border-2 border-gray-300 rounded-lg hover:border-primary hover:-translate-y-0.5 hover:shadow-md transition-all"
        >
          <span className="text-3xl">📘</span>
          <span className="text-sm font-semibold">Facebook</span>
        </button>
        <button 
          onClick={shareOnTwitter}
          className="flex flex-col items-center gap-2 p-4 border-2 border-gray-300 rounded-lg hover:border-primary hover:-translate-y-0.5 hover:shadow-md transition-all"
        >
          <span className="text-3xl">🐦</span>
          <span className="text-sm font-semibold">Twitter</span>
        </button>
        <button 
          onClick={downloadImage}
          className="flex flex-col items-center gap-2 p-4 border-2 border-gray-300 rounded-lg hover:border-primary hover:-translate-y-0.5 hover:shadow-md transition-all"
        >
          <span className="text-3xl">📥</span>
          <span className="text-sm font-semibold">Descargar</span>
        </button>
      </div>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={shareUrl}
          readOnly
          className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg text-sm bg-gray-50"
        />
        <button onClick={copyToClipboard} className="btn btn-primary">
          Copiar Link
        </button>
      </div>
    </Modal>
  )
}
