import { useState } from 'react'
import { CircularProgress, Typography, Button } from '@mui/material'
import { useBerries } from '../hooks/useBerries'
import { FirmnessSidebar } from './FirmnessSidebar'
import { BerryList } from './BerryList'
import {
  PageWrapper,
  FeedbackStack,
  ContentWrapper,
  ContentCard,
  PageTitle,
} from '../styles/BerriesPage.style'

export function BerriesPage() {
  const { berries, loading, error, load } = useBerries()
  const [selectedFirmness, setSelectedFirmness] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const visibleBerries = berries
    .filter((b) => !selectedFirmness || b.firmness === selectedFirmness)
    .filter((b) => b.name.toLowerCase().includes(search.toLowerCase()))

  if (loading) {
    return (
      <PageWrapper>
        <FeedbackStack direction="column" spacing={2}>
          <CircularProgress color="secondary" />
          <Typography color="text.secondary">Loading berries…</Typography>
        </FeedbackStack>
      </PageWrapper>
    )
  }

  if (error) {
    return (
      <PageWrapper>
        <FeedbackStack direction="column" spacing={2}>
          <Typography color="error">Failed to load berries.</Typography>
          <Button variant="outlined" color="secondary" onClick={load}>
            Retry
          </Button>
        </FeedbackStack>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <ContentWrapper>
        <PageTitle>Berry Browser</PageTitle>
        <ContentCard>
          <FirmnessSidebar
            selected={selectedFirmness}
            onSelect={setSelectedFirmness}
          />
          <BerryList
            berries={visibleBerries}
            search={search}
            onSearchChange={setSearch}
          />
        </ContentCard>
      </ContentWrapper>
    </PageWrapper>
  )
}
