import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || '' 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const catalogApi = {
  // === CATALOGACIÓN ===
  
  /**
   * Sube una pintura y la cataloga automáticamente
   */
  uploadPainting: async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await api.post('/catalog/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  },

  /**
   * Sube múltiples pinturas
   */
  uploadPaintingsBatch: async (files) => {
    const formData = new FormData()
    files.forEach(file => formData.append('files', file))
    
    const response = await api.post('/catalog/upload-batch', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  },

  // === CONSULTAS ===
  
  /**
   * Obtiene lista de pinturas con paginación
   */
    getPaintings: async ({ estilo, limit = 20, offset = 0 } = {}) => {
      const response = await api.get('/catalog/paintings', {
      params: {
        estilo,
        limit,
        offset
      }
    });
    return response.data
  },

  /**
   * Obtiene detalle de una pintura
   */
  getPainting: async (id) => {
    const response = await api.get(`/catalog/painting/${id}`)
    return response.data
  },

  /**
   * Obtiene la URL de la imagen de una pintura
   */
  getPaintingImageUrl: (id) => {
    return `${API_BASE_URL}/catalog/painting/${id}/image`
  },

  /**
   * Elimina una pintura
   */
  deletePainting: async (id) => {
    const response = await api.delete(`/catalog/painting/${id}`)
    return response.data
  },

  // === BÚSQUEDA ===

  /**
   * Búsqueda inteligente híbrida (contenido + emoción)
   * Detecta automáticamente si el query tiene componente emocional
   */
  smartSearch: async (query, options = {}) => {
    const {
      limit = 20,
      contentWeight = 0.6,
      emotionWeight = 0.4,
      minContentSimilarity = 0.22,
      minEmotionSimilarity = 0.20
    } = options

    const params = new URLSearchParams()
    params.append('query', query)
    params.append('limit', limit)
    params.append('content_weight', contentWeight)
    params.append('emotion_weight', emotionWeight)
    params.append('min_content_similarity', minContentSimilarity)
    params.append('min_emotion_similarity', minEmotionSimilarity)

    const response = await api.get(`/catalog/smart-search?${params}`)
    return response.data
  },

  /**
   * Obtiene lista de emociones disponibles
   */
  getEmociones: async () => {
    const response = await api.get('/catalog/emociones')
    return response.data
  },

  // === ESTADÍSTICAS ===
  
  /**
   * Obtiene estadísticas del catálogo
   */
  getStats: async () => {
    const response = await api.get('/catalog/stats')
    return response.data
  },

}

export default catalogApi
