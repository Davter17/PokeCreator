import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from '@/context/AuthContext'
import { DialogProvider } from '@/context/DialogContext'
import App from './App.tsx'
import './index.css'

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

if (!clientId) {
  console.error('VITE_GOOGLE_CLIENT_ID is not defined in environment variables')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={clientId}>
    <BrowserRouter>
      <AuthProvider>
        <DialogProvider>
          <App />
        </DialogProvider>
      </AuthProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>,
)
