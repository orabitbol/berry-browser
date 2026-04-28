import { styled } from '@mui/material/styles'
import { Box, TextField } from '@mui/material'

export const ListWrapper = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '24px',
  overflow: 'hidden',
})

export const SearchField = styled(TextField)({
  marginBottom: 20,
  '& .MuiOutlinedInput-root': {
    borderRadius: 10,
    backgroundColor: '#fafafa',
  },
})

export const ScrollArea = styled(Box)({
  flex: 1,
  overflowY: 'auto',
  paddingRight: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
})

export const EmptyMessage = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  color: '#9e9e9e',
  fontSize: '0.95rem',
})
