import { configureStore } from '@reduxjs/toolkit'
import berriesReducer from '../features/berries/berriesSlice'

export const store = configureStore({
  reducer: {
    berries: berriesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
