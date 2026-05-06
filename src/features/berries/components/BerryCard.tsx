import { useEffect, useRef } from 'react'
import { Chip } from '@mui/material'
import type { BerryListItem } from '../types'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { loadSprite, selectSprites } from '../berriesSlice'
import { FIRMNESS_COLORS, formatFirmness } from '../constants'
import type { FirmnessLevel } from '../constants'
import {
  CardWrapper,
  CardLeft,
  CardRight,
  BerryImageContainer,
  BerryImage,
  BerryPlaceholder,
  BerryInfo,
  BerryName,
  BerryMeta,
  BerryMetaDot,
} from '../styles/BerryCard.style'

type Props = {
  berry: BerryListItem
  onSelect: (id: number) => void
}

export function BerryCard({ berry, onSelect }: Props) {
  const dispatch = useAppDispatch()
  const sprites = useAppSelector(selectSprites)
  const spriteUrl = sprites[berry.id]
  const accentColor = FIRMNESS_COLORS[berry.firmness as FirmnessLevel] ?? '#9e9e9e'
  const cardRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          dispatch(loadSprite({ id: berry.id, itemUrl: berry.itemUrl }))
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [berry.id, berry.itemUrl, dispatch])

  return (
    <CardWrapper
      ref={cardRef}
      accentColor={accentColor}
      onClick={() => onSelect(berry.id)}
      aria-label={`View ${berry.name.charAt(0).toUpperCase() + berry.name.slice(1)} details`}
    >
      <CardLeft direction="row" spacing={1.5}>
        <BerryImageContainer accentColor={accentColor}>
          {typeof spriteUrl === 'string' ? (
            <BerryImage src={spriteUrl} alt={berry.name} loading="lazy" />
          ) : (
            <BerryPlaceholder accentColor={accentColor}>
              {berry.name[0]}
            </BerryPlaceholder>
          )}
        </BerryImageContainer>

        <BerryInfo>
          <BerryName>{berry.name}</BerryName>
          <BerryMeta>
            {formatFirmness(berry.firmness)}
            <BerryMetaDot />
            {berry.growthTime}h
          </BerryMeta>
        </BerryInfo>
      </CardLeft>

      <CardRight>
        {berry.flavors.slice(0, 3).map(({ flavor }) => (
          <Chip
            key={flavor.name}
            label={flavor.name}
            size="small"
            variant="outlined"
            color="secondary"
          />
        ))}
      </CardRight>
    </CardWrapper>
  )
}
