import { styled } from '@mui/material/styles'
import { Box, TextField, Select } from '@mui/material'
import { radius } from '@/design-system'

export const ListWrapper = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '24px',
  overflow: 'hidden',
  minWidth: 0,
})

export const ControlsRow = styled(Box)({
  display: 'flex',
  gap: 12,
  marginBottom: 16,
  alignItems: 'center',
})

export const SearchField = styled(TextField)(({ theme }) => ({
  flex: 1,
  '& .MuiOutlinedInput-root': {
    borderRadius: 10,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : '#fafafa',
    fontSize: '0.9rem',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.divider,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.light ?? theme.palette.primary.main,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
  },
}))

export const SortSelect = styled(Select)(({ theme }) => ({
  borderRadius: 10,
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : '#fafafa',
  fontSize: '0.85rem',
  minWidth: 140,
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.divider,
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.light ?? theme.palette.primary.main,
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
}))

export const ScrollArea = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  paddingRight: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  scrollbarWidth: 'thin',
  scrollbarColor: `${theme.palette.divider} transparent`,
  '&::-webkit-scrollbar': {
    width: 4,
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.divider,
    borderRadius: 4,
  },
}))

export const EmptyMessage = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 200,
  color: theme.palette.text.disabled,
  fontSize: '0.9rem',
}))

export const ErrorState = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: 200,
  gap: 12,
})

export const SkeletonCard = styled(Box)(({ theme }) => ({
  borderRadius: radius.md,
  border: `1px solid ${theme.palette.divider}`,
  padding: '14px 16px',
  display: 'flex',
  alignItems: 'center',
  gap: 14,
}))

export const SkeletonBody = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
})
