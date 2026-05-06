import { FIRMNESS_LEVELS, FIRMNESS_COLORS, formatFirmness } from '../constants'
import type { FirmnessLevel } from '../constants'
import {
  SidebarWrapper,
  SidebarTitle,
  ActiveIndicator,
  FirmnessItem,
  FirmnessLabel,
  FirmnessDot,
} from '../styles/FirmnessSidebar.style'

type Props = {
  selected: FirmnessLevel
  onSelect: (firmness: FirmnessLevel) => void
}

export function FirmnessSidebar({ selected, onSelect }: Props) {
  const activeIndex = FIRMNESS_LEVELS.indexOf(selected)

  return (
    <SidebarWrapper>
      <SidebarTitle>Firmness</SidebarTitle>
      <ActiveIndicator itemIndex={activeIndex} aria-hidden />

      {FIRMNESS_LEVELS.map((level) => (
        <FirmnessItem
          key={level}
          selected={selected === level}
          onClick={() => onSelect(level)}
          aria-pressed={selected === level}
        >
          <FirmnessDot
            dotColor={FIRMNESS_COLORS[level]}
            selected={selected === level}
          />
          <FirmnessLabel selected={selected === level}>{formatFirmness(level)}</FirmnessLabel>
        </FirmnessItem>
      ))}
    </SidebarWrapper>
  )
}
