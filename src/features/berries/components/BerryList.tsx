import { useMemo, useState } from 'react'
import { Skeleton, MenuItem, InputLabel, FormControl, Typography, Button } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { loadBerriesForFirmness, selectFirmnessEntry } from '../berriesSlice'
import { useDebounce } from '../hooks/useDebounce'
import { SORT_OPTIONS } from '../constants'
import type { FirmnessLevel, SortOption } from '../constants'
import type { BerryListItem } from '../types'
import { BerryCard } from './BerryCard'
import {
  ListWrapper,
  ControlsRow,
  SearchField,
  SortSelect,
  ScrollArea,
  EmptyMessage,
  ErrorState,
  SkeletonCard,
  SkeletonBody,
} from '../styles/BerryList.style'

function filterBerries(list: BerryListItem[], search: string) {
  const term = search.toLowerCase()
  return list.filter((b) => b.name.toLowerCase().includes(term))
}

function sortBerries(list: BerryListItem[], sortBy: SortOption) {
  return [...list].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc': return a.name.localeCompare(b.name)
      case 'name-desc': return b.name.localeCompare(a.name)
      case 'growth-time': return a.growthTime - b.growthTime
      case 'size': return a.size - b.size
      case 'smoothness': return a.smoothness - b.smoothness
      case 'natural-gift-power': return b.naturalGiftPower - a.naturalGiftPower
    }
  })
}

const SKELETON_COUNT = 6

type Props = {
  firmness: FirmnessLevel
  onBerrySelect: (id: number) => void
}

export function BerryList({ firmness, onBerrySelect }: Props) {
  const dispatch = useAppDispatch()
  const entry = useAppSelector(selectFirmnessEntry(firmness))

  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('name-asc')
  const debouncedSearch = useDebounce(search, 600)

  const isLoading = !entry || entry.loading
  const isError = !!entry && !entry.loading && !entry.loaded && !!entry.error
  const list = useMemo(() => entry?.data ?? [], [entry])

  const visibleBerries = useMemo(
    () => sortBerries(filterBerries(list, debouncedSearch), sortBy),
    [list, debouncedSearch, sortBy]
  )

  return (
    <ListWrapper>
      <ControlsRow>
        <SearchField
          placeholder="Search berries…"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          slotProps={{ htmlInput: { 'aria-label': 'Search berries' } }}
          disabled={isLoading}
        />
        <FormControl size="small">
          <InputLabel id="sort-label">Sort</InputLabel>
          <SortSelect
            labelId="sort-label"
            label="Sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            disabled={isLoading}
          >
            {SORT_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </SortSelect>
        </FormControl>
      </ControlsRow>

      <ScrollArea>
        {isLoading ? (
          Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <SkeletonCard key={i}>
              <Skeleton variant="rounded" width={44} height={44} />
              <SkeletonBody>
                <Skeleton width="40%" height={18} />
                <Skeleton width="25%" height={14} />
              </SkeletonBody>
              <Skeleton width={80} height={24} />
            </SkeletonCard>
          ))
        ) : isError ? (
          <ErrorState>
            <Typography variant="body2" color="error">
              {entry.error}
            </Typography>
            <Button
              size="small"
              variant="outlined"
              color="secondary"
              onClick={() => dispatch(loadBerriesForFirmness(firmness))}
            >
              Retry
            </Button>
          </ErrorState>
        ) : visibleBerries.length === 0 ? (
          <EmptyMessage>No berries match your search</EmptyMessage>
        ) : (
          visibleBerries.map((berry) => (
            <BerryCard key={berry.id} berry={berry} onSelect={onBerrySelect} />
          ))
        )}
      </ScrollArea>
    </ListWrapper>
  )
}
