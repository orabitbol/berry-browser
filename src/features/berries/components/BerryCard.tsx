import { Chip } from '@mui/material'
import type { Berry } from '../types'
import {
  CardWrapper,
  CardLeftStack,
  CardRight,
  BerryIcon,
  BerryName,
} from '../styles/BerryCard.style'

type Props = {
  berry: Berry
}

export function BerryCard({ berry }: Props) {
  return (
    <CardWrapper>
      <CardLeftStack direction="row" spacing={1.5}>
        <BerryIcon>🍒</BerryIcon>
        <BerryName>{berry.name}</BerryName>
      </CardLeftStack>
      <CardRight>
        {berry.flavors.map((flavor) => (
          <Chip
            key={flavor}
            label={flavor}
            size="small"
            variant="outlined"
            color="secondary"
          />
        ))}
      </CardRight>
    </CardWrapper>
  )
}
