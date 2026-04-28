import { styled } from '@mui/material/styles'
import { Box, Stack, Typography } from '@mui/material'

export const CardWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 16px',
  borderRadius: 12,
  border: '1px solid #eeeeee',
  backgroundColor: '#ffffff',
  transition: 'box-shadow 0.15s ease',
  '&:hover': {
    boxShadow: theme.shadows[2],
  },
}))

export const CardLeftStack = styled(Stack)({
  alignItems: 'center',
})

export const BerryIcon = styled('span')({
  fontSize: '1.4rem',
  lineHeight: 1,
})

export const BerryName = styled(Typography)({
  fontWeight: 600,
  fontSize: '0.95rem',
  color: '#2d2d2d',
  textTransform: 'capitalize',
})

export const CardRight = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 6,
  justifyContent: 'flex-end',
  maxWidth: '55%',
})
