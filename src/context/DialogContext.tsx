import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import Modal from '@/components/Modal'

interface DialogOptions {
  message: string
  title: string
  type: 'alert' | 'confirm'
  resolve: (value: boolean | void) => void
}

interface DialogContextType {
  alert: (message: string, title?: string) => Promise<void>
  confirm: (message: string, title?: string) => Promise<boolean>
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)

export const useDialog = () => {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider')
  }
  return context
}

interface DialogProviderProps {
  children: ReactNode
}

export const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
  const [options, setOptions] = useState<DialogOptions | null>(null)

  const close = useCallback(() => {
    setOptions(null)
  }, [])

  const alert = useCallback((message: string, title = 'Aviso') => {
    return new Promise<void>((resolve) => {
      setOptions({ message, title, type: 'alert', resolve: () => resolve() })
    })
  }, [])

  const confirm = useCallback((message: string, title = 'Confirmar') => {
    return new Promise<boolean>((resolve) => {
      setOptions({ message, title, type: 'confirm', resolve: (value: boolean) => resolve(value) })
    })
  }, [])

  const handleConfirm = () => {
    options?.resolve(true)
    close()
  }

  const handleCancel = () => {
    options?.resolve(false)
    close()
  }

  const handleAlertClose = () => {
    options?.resolve()
    close()
  }

  const value: DialogContextType = { alert, confirm }

  return (
    <DialogContext.Provider value={value}>
      {children}
      {options && (
        <Modal isOpen={!!options} onClose={options.type === 'alert' ? handleAlertClose : handleCancel} title={options.title}>
          <p className="text-gray-700 mb-6">{options.message}</p>
          <div className="flex justify-end gap-3">
            {options.type === 'confirm' && (
              <button onClick={handleCancel} className="btn btn-secondary">
                Cancelar
              </button>
            )}
            <button onClick={options.type === 'alert' ? handleAlertClose : handleConfirm} className="btn btn-primary">
              {options.type === 'alert' ? 'Aceptar' : 'Confirmar'}
            </button>
          </div>
        </Modal>
      )}
    </DialogContext.Provider>
  )
}
