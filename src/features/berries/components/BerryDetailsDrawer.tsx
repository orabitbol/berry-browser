import { useEffect } from 'react'
import { Drawer, IconButton, Chip, Divider } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { loadSprite, selectSprites } from '../berriesSlice'
import { FIRMNESS_COLORS, FLAVOR_COLORS, formatFirmness } from '../constants'
import type { FirmnessLevel } from '../constants'
import type { BerryListItem } from '../types'
import {
  DrawerInner,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  HeroSection,
  LargeImageContainer,
  LargeImage,
  LargePlaceholder,
  HeroMeta,
  BerryFullName,
  FirmnessChip,
  SectionTitle,
  FlavorRow,
  FlavorName,
  FlavorBar,
  PotencyValue,
  StatsGrid,
  StatItem,
  StatLabel,
  StatValue,
} from '../styles/BerryDetailsDrawer.style'

const MAX_POTENCY = 40

type Props = {
  berry: BerryListItem | null
  onClose: () => void
}

export function BerryDetailsDrawer({ berry, onClose }: Props) {
  const dispatch = useAppDispatch()
  const sprites = useAppSelector(selectSprites)

  useEffect(() => {
    if (berry) {
      dispatch(loadSprite({ id: berry.id, itemUrl: berry.itemUrl }))
    }
  }, [berry, dispatch])

  const spriteUrl = berry ? sprites[berry.id] : undefined
  const accentColor = berry
    ? (FIRMNESS_COLORS[berry.firmness as FirmnessLevel] ?? '#9e9e9e')
    : '#9e9e9e'

  return (
    <Drawer anchor="right" open={berry != null} onClose={onClose}>
      <DrawerInner
        role="dialog"
        aria-label={berry ? `${berry.name} details` : 'Berry details'}
      >
        {berry && (
          <>
            <DrawerHeader>
              <DrawerTitle>{berry.name}</DrawerTitle>
              <IconButton onClick={onClose} size="small" aria-label="Close details">
                <CloseIcon fontSize="small" />
              </IconButton>
            </DrawerHeader>

            <DrawerBody>
              <HeroSection accentColor={accentColor}>
                <LargeImageContainer accentColor={accentColor}>
                  {typeof spriteUrl === 'string' ? (
                    <LargeImage src={spriteUrl} alt={berry.name} loading="lazy" />
                  ) : (
                    <LargePlaceholder accentColor={accentColor}>
                      {berry.name[0]}
                    </LargePlaceholder>
                  )}
                </LargeImageContainer>

                <HeroMeta>
                  <BerryFullName>{berry.name} berry</BerryFullName>
                  <FirmnessChip
                    label={formatFirmness(berry.firmness)}
                    size="small"
                    bgColor={FIRMNESS_COLORS[berry.firmness as FirmnessLevel] ?? '#e0e0e0'}
                  />
                  <Chip label={berry.naturalGiftType} size="small" variant="outlined" />
                </HeroMeta>
              </HeroSection>

              {berry.flavors.length > 0 && (
                <>
                  <Divider />
                  <div>
                    <SectionTitle>Flavors</SectionTitle>
                    {berry.flavors.map(({ flavor, potency }) => (
                      <FlavorRow key={flavor.name}>
                        <FlavorName>{flavor.name}</FlavorName>
                        <FlavorBar
                          variant="determinate"
                          value={(potency / MAX_POTENCY) * 100}
                          barColor={FLAVOR_COLORS[flavor.name] ?? '#9e9e9e'}
                        />
                        <PotencyValue>{potency}</PotencyValue>
                      </FlavorRow>
                    ))}
                  </div>
                </>
              )}

              <Divider />

              <div>
                <SectionTitle>Stats</SectionTitle>
                <StatsGrid>
                  <StatItem>
                    <StatLabel>Growth time</StatLabel>
                    <StatValue>{berry.growthTime}h</StatValue>
                  </StatItem>
                  <StatItem>
                    <StatLabel>Smoothness</StatLabel>
                    <StatValue>{berry.smoothness}</StatValue>
                  </StatItem>
                  <StatItem>
                    <StatLabel>Size</StatLabel>
                    <StatValue>{berry.size}mm</StatValue>
                  </StatItem>
                  <StatItem>
                    <StatLabel>Soil dryness</StatLabel>
                    <StatValue>{berry.soilDryness}</StatValue>
                  </StatItem>
                  <StatItem>
                    <StatLabel>Gift power</StatLabel>
                    <StatValue>{berry.naturalGiftPower}</StatValue>
                  </StatItem>
                  <StatItem>
                    <StatLabel>Gift type</StatLabel>
                    <StatValue>{berry.naturalGiftType}</StatValue>
                  </StatItem>
                </StatsGrid>
              </div>
            </DrawerBody>
          </>
        )}
      </DrawerInner>
    </Drawer>
  )
}
