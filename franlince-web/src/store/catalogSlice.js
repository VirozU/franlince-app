import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { catalogApi } from '../api/catalogApi'

// Async thunks
export const fetchPaintings = createAsyncThunk(
  'catalog/fetchPaintings',
  async ({ estilo, limit, offset } = {}) => {
    const response = await catalogApi.getPaintings({ estilo, limit, offset })
    return response
  }
)

export const fetchPaintingDetail = createAsyncThunk(
  'catalog/fetchPaintingDetail',
  async (id) => {
    const response = await catalogApi.getPainting(id)
    return response
  }
)

export const deletePainting = createAsyncThunk(
  'catalog/deletePainting',
  async (id) => {
    await catalogApi.deletePainting(id)
    return id
  }
)

export const fetchStats = createAsyncThunk(
  'catalog/fetchStats',
  async () => {
    const response = await catalogApi.getStats()
    return response
  }
)

const initialState = {
  paintings: [],
  total: 0,
  currentPainting: null,
  stats: null,
  filters: {
    estilo: null,
    limit: 20,
    offset: 0,
  },
  loading: false,
  error: null,
}

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearCurrentPainting: (state) => {
      state.currentPainting = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch paintings
      .addCase(fetchPaintings.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPaintings.fulfilled, (state, action) => {
        state.loading = false
        state.paintings = action.payload.pinturas
        state.total = action.payload.total
      })
      .addCase(fetchPaintings.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // Fetch painting detail
      .addCase(fetchPaintingDetail.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPaintingDetail.fulfilled, (state, action) => {
        state.loading = false
        state.currentPainting = action.payload
      })
      .addCase(fetchPaintingDetail.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // Delete painting
      .addCase(deletePainting.fulfilled, (state, action) => {
        state.paintings = state.paintings.filter(p => p.id !== action.payload)
        state.total -= 1
      })
      // Fetch stats
      .addCase(fetchStats.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.loading = false
        state.stats = action.payload
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { setFilters, clearCurrentPainting, clearError } = catalogSlice.actions
export default catalogSlice.reducer
