import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    allowedHosts: ['.ngrok-free.app'],
    
    proxy: {
      // Opción A: Agrega la nueva ruta específica (Más seguro)
      '/catalog/paintings': { // Ruta de datos (lista)
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
      },
      '/catalog/painting': { // 👈 NUEVO: Ruta de imágenes individuales
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
      },
      '/catalog/upload': { 
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
      },
      '/catalog/upload-batch': { 
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
      },
      '/catalog/search': { 
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
      },
      '/catalog/semantic-search': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
      },
      '/catalog/smart-search': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
      },
      '/catalog/emotion-search': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
      },
      '/catalog/emociones': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
      },
      '/catalog/stats': { 
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
      },
      '/catalog/estilos': { 
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
      },
      '/health': { 
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
      }
      // O BIEN, Opción B: Usa una expresión regular para atrapar todo lo que empiece por /catalog/
      // (Solo usa esto si NO tienes rutas de React que empiecen por /catalog/algo)
      // '^/catalog/.*': { ... } 
    }
  }
})