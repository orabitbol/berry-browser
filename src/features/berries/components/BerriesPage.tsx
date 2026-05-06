import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded'
import NightlightRoundedIcon from '@mui/icons-material/NightlightRounded'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { loadBerriesForFirmness, selectFirmnessEntry } from '../berriesSlice'
import { FirmnessSidebar } from './FirmnessSidebar'
import { BerryList } from './BerryList'
import {
  PageWrapper,
  ContentWrapper,
  ContentCard,
  PageTitle,
  TitleAccent,
  PageSubtitle,
  PageHeader,
  PageTitleGroup,
  ToggleWrapper,
  DarkModeToggle,
  ToggleThumb,
} from '../styles/BerriesPage.style'
import type { FirmnessLevel } from '../constants'
import type { BerryListItem } from '../types'
import { BerryAssistant } from './BerryAssistant/BerryAssistant'

const BerryDetailsDrawer = lazy(() =>
  import('./BerryDetailsDrawer').then((m) => ({ default: m.BerryDetailsDrawer }))
)

type Props = {
  colorMode: 'light' | 'dark'
  toggleColorMode: () => void
}

export function BerriesPage({ colorMode, toggleColorMode }: Props) {
  const dispatch = useAppDispatch()

  const [selectedFirmness, setSelectedFirmness] = useState<FirmnessLevel>('soft')
  const [selectedBerryId, setSelectedBerryId] = useState<number | null>(null)

  useEffect(() => {
    dispatch(loadBerriesForFirmness(selectedFirmness))
  }, [selectedFirmness, dispatch])

  const list = useAppSelector(
    (state) => selectFirmnessEntry(selectedFirmness)(state)?.data ?? []
  )

  const selectedBerry = useMemo(
    (): BerryListItem | null =>
      selectedBerryId != null ? (list.find((b) => b.id === selectedBerryId) ?? null) : null,
    [list, selectedBerryId]
  )

  const handleFirmnessSelect = (firmness: FirmnessLevel) => {
    setSelectedFirmness(firmness)
    setSelectedBerryId(null)
  }

  return (
    <>
      <PageWrapper>
        <ContentWrapper>
          <PageHeader>
            <PageTitleGroup>
              <PageTitle>Berry Browser</PageTitle>
              <TitleAccent />
              <PageSubtitle>Browse berries from the PokéAPI</PageSubtitle>
            </PageTitleGroup>
            <ToggleWrapper>
              <DarkModeToggle
                isDark={colorMode === 'dark'}
                role="switch"
                aria-checked={colorMode === 'dark'}
                aria-label={colorMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                onClick={toggleColorMode}
              >
                <ToggleThumb isDark={colorMode === 'dark'}>
                  <WbSunnyRoundedIcon />
                  <NightlightRoundedIcon />
                </ToggleThumb>
              </DarkModeToggle>
            </ToggleWrapper>
          </PageHeader>

          <ContentCard>
            <FirmnessSidebar selected={selectedFirmness} onSelect={handleFirmnessSelect} />
            <BerryList firmness={selectedFirmness} onBerrySelect={setSelectedBerryId} />
          </ContentCard>
        </ContentWrapper>

        <Suspense fallback={null}>
          <BerryDetailsDrawer
            berry={selectedBerry}
            onClose={() => setSelectedBerryId(null)}
          />
        </Suspense>
      </PageWrapper>

      <BerryAssistant />
    </>
  )
}
