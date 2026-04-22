import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { catalogApi } from '../api/catalogApi'

export const uploadPainting = createAsyncThunk(
  'upload/uploadPainting',
  async (file) => {
    const response = await catalogApi.uploadPainting(file)
    return response
  }
)

export const uploadPaintingsBatch = createAsyncThunk(
  'upload/uploadPaintingsBatch',
  async (files) => {
    const response = await catalogApi.uploadPaintingsBatch(files)
    return response
  }
)

const initialState = {
  preview: null,
  uploading: false,
  result: null,
  history: [],
  error: null,
}

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    setPreview: (state, action) => {
      state.preview = action.payload
    },
    clearPreview: (state) => {
      state.preview = null
    },
    clearResult: (state) => {
      state.result = null
    },
    clearError: (state) => {
      state.error = null
    },
    clearHistory: (state) => {
      state.history = []
    },
  },
  extraReducers: (builder) => {
    builder
      // Upload single
      .addCase(uploadPainting.pending, (state) => {
        state.uploading = true
        state.error = null
        state.result = null
      })
      .addCase(uploadPainting.fulfilled, (state, action) => {
        state.uploading = false
        state.result = action.payload
        state.preview = null
        // Add to history
        if (action.payload.success) {
          state.history.unshift(action.payload.data)
        }
      })
      .addCase(uploadPainting.rejected, (state, action) => {
        state.uploading = false
        state.error = action.error.message
      })
      // Upload batch
      .addCase(uploadPaintingsBatch.pending, (state) => {
        state.uploading = true
        state.error = null
      })
      .addCase(uploadPaintingsBatch.fulfilled, (state, action) => {
        state.uploading = false
        state.result = action.payload
        // Add all to history
        if (action.payload.pinturas) {
          state.history = [...action.payload.pinturas, ...state.history]
        }
      })
      .addCase(uploadPaintingsBatch.rejected, (state, action) => {
        state.uploading = false
        state.error = action.error.message
      })
  },
})

export const { setPreview, clearPreview, clearResult, clearError, clearHistory } = uploadSlice.actions
export default uploadSlice.reducer
