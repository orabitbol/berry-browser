import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/store'
import { fetchBerriesByFirmness, fetchBerrySprite } from './services/berryService'
import type { FirmnessLevel } from './constants'
import type { BerryListItem } from './types'

export interface FirmnessEntry {
  data: BerryListItem[]
  loading: boolean
  error: string | null
  loaded: boolean
}

interface BerriesState {
  berriesByFirmness: Partial<Record<FirmnessLevel, FirmnessEntry>>
  sprites: Partial<Record<number, string | null>>
}

const initialState: BerriesState = {
  berriesByFirmness: {},
  sprites: {},
}

export const loadBerriesForFirmness = createAsyncThunk(
  'berries/loadForFirmness',
  (firmness: FirmnessLevel) => fetchBerriesByFirmness(firmness),
  {
    condition: (firmness, { getState }) => {
      const entry = (getState() as RootState).berries.berriesByFirmness[firmness]
      return !entry?.loaded && !entry?.loading
    },
  }
)

export const loadSprite = createAsyncThunk(
  'berries/loadSprite',
  async ({ id, itemUrl }: { id: number; itemUrl: string }) => {
    const url = await fetchBerrySprite(itemUrl)
    return { id, url }
  },
  {
    condition: ({ id }, { getState }) => {
      const { sprites } = (getState() as RootState).berries
      return !(id in sprites)
    },
  }
)

const berriesSlice = createSlice({
  name: 'berries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadBerriesForFirmness.pending, (state, action) => {
        const firmness = action.meta.arg
        state.berriesByFirmness[firmness] = { data: [], loading: true, error: null, loaded: false }
      })
      .addCase(loadBerriesForFirmness.fulfilled, (state, action) => {
        const firmness = action.meta.arg
        state.berriesByFirmness[firmness] = {
          data: action.payload,
          loading: false,
          error: null,
          loaded: true,
        }
      })
      .addCase(loadBerriesForFirmness.rejected, (state, action) => {
        const firmness = action.meta.arg
        state.berriesByFirmness[firmness] = {
          data: [],
          loading: false,
          error: action.error.message ?? 'Something went wrong',
          loaded: false,
        }
      })
      .addCase(loadSprite.fulfilled, (state, action) => {
        state.sprites[action.payload.id] = action.payload.url
      })
  },
})

export default berriesSlice.reducer

export const selectFirmnessEntry =
  (firmness: FirmnessLevel) =>
  (state: RootState): FirmnessEntry | undefined =>
    state.berries.berriesByFirmness[firmness]

export const selectSprites = (state: RootState) => state.berries.sprites

export const selectAllLoadedBerries = createSelector(
  (state: RootState) => state.berries.berriesByFirmness,
  (byFirmness) => Object.values(byFirmness).flatMap((entry) => entry?.data ?? []),
)
