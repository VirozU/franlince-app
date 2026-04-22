import { configureStore } from '@reduxjs/toolkit'
import catalogReducer from './catalogSlice'
import uploadReducer from './uploadSlice'
import searchReducer from './searchSlice'

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    upload: uploadReducer,
    search: searchReducer,
  },
})
