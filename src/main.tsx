import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import App from './App.tsx'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { AppQueryClient } from '@/api'
import { useThemeStore } from '@/stores/themeStore'
import './styles/index.css'
import './i18n'

function ThemedToaster() {
  const theme = useThemeStore((s) => s.theme)
  return <Toaster position="top-right" richColors theme={theme} closeButton />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={AppQueryClient}>
        <BrowserRouter>
          <App />
          <ThemedToaster />
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
)
