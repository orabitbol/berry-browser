import { FIRMNESS_LEVELS, FIRMNESS_COLORS } from '../constants'
import {
  SidebarWrapper,
  SidebarTitle,
  FirmnessItem,
  FirmnessLabel,
  FirmnessDot,
} from '../styles/FirmnessSidebar.style'

type Props = {
  selected: string | null
  onSelect: (firmness: string | null) => void
}

export function FirmnessSidebar({ selected, onSelect }: Props) {
  return (
    <SidebarWrapper>
      <SidebarTitle>Firmness</SidebarTitle>

      <FirmnessItem
        selected={selected === null}
        onClick={() => onSelect(null)}
      >
        <FirmnessDot dotcolor="#bdbdbd" />
        <FirmnessLabel selected={selected === null}>All</FirmnessLabel>
      </FirmnessItem>

      {FIRMNESS_LEVELS.map((level) => (
        <FirmnessItem
          key={level}
          selected={selected === level}
          onClick={() => onSelect(level === selected ? null : level)}
        >
          <FirmnessDot dotcolor={FIRMNESS_COLORS[level]} />
          <FirmnessLabel selected={selected === level}>{level}</FirmnessLabel>
        </FirmnessItem>
      ))}
    </SidebarWrapper>
  )
}
