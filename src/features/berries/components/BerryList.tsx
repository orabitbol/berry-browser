import type { Berry } from '../types'
import { BerryCard } from './BerryCard'
import {
  ListWrapper,
  SearchField,
  ScrollArea,
  EmptyMessage,
} from '../styles/BerryList.style'

type Props = {
  berries: Berry[]
  search: string
  onSearchChange: (value: string) => void
}

export function BerryList({ berries, search, onSearchChange }: Props) {
  return (
    <ListWrapper>
      <SearchField
        placeholder="Search berries…"
        size="small"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        fullWidth
      />
      <ScrollArea>
        {berries.length === 0 ? (
          <EmptyMessage>No berries found</EmptyMessage>
        ) : (
          berries.map((berry) => <BerryCard key={berry.id} berry={berry} />)
        )}
      </ScrollArea>
    </ListWrapper>
  )
}
