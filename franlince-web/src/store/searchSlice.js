import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { catalogApi } from '../api/catalogApi'

export const smartSearch = createAsyncThunk(
  'search/smartSearch',
  async ({ query, limit = 20, contentWeight = 0.6, emotionWeight = 0.4 }) => {
    const response = await catalogApi.smartSearch(query, {
      limit,
      contentWeight,
      emotionWeight
    })
    return response
  }
)

export const fetchEmociones = createAsyncThunk(
  'search/fetchEmociones',
  async () => {
    const response = await catalogApi.getEmociones()
    return response
  }
)

const initialState = {
  query: '',
  results: [],
  total: 0,
  searching: false,
  error: null,
  // Search type info
  searchType: null,  // 'contenido', 'emocion', 'hibrida'
  contentSearched: '',
  emotionSearched: '',
  // Suggestions
  suggestions: [
    'Flores coloridas para sala',
    'Paisaje con montañas',
    'Arte abstracto azul',
    'Retrato elegante',
    'Pintura marina con barcos',
    'Naturaleza muerta con frutas',
  ],
  emotionSuggestions: [
    'caballo que inspire libertad',
    'flores que transmitan paz',
    'paisaje con energía y aventura',
    'arte que evoque nostalgia',
    'pintura con alegría y color',
    'obra que inspire tranquilidad',
  ],
  recentSearches: [],
  // Available emotions
  emociones: [],
  loadingEmociones: false,
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload
    },
    clearResults: (state) => {
      state.results = []
      state.total = 0
      state.searchType = null
      state.contentSearched = ''
      state.emotionSearched = ''
    },
    addRecentSearch: (state, action) => {
      const search = action.payload
      state.recentSearches = [
        search,
        ...state.recentSearches.filter(s => s !== search)
      ].slice(0, 5)
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Smart search (hybrid)
      .addCase(smartSearch.pending, (state) => {
        state.searching = true
        state.error = null
      })
      .addCase(smartSearch.fulfilled, (state, action) => {
        state.searching = false
        state.results = action.payload.resultados
        state.total = action.payload.total
        state.searchType = action.payload.tipo_busqueda
        state.contentSearched = action.payload.contenido_buscado || ''
        state.emotionSearched = action.payload.emocion_buscada || ''
      })
      .addCase(smartSearch.rejected, (state, action) => {
        state.searching = false
        state.error = action.error.message
      })
      // Fetch emociones
      .addCase(fetchEmociones.pending, (state) => {
        state.loadingEmociones = true
      })
      .addCase(fetchEmociones.fulfilled, (state, action) => {
        state.loadingEmociones = false
        state.emociones = action.payload.emociones
      })
      .addCase(fetchEmociones.rejected, (state) => {
        state.loadingEmociones = false
      })
  },
})

export const { setQuery, clearResults, addRecentSearch, clearError } = searchSlice.actions
export default searchSlice.reducer
