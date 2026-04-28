import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'

export const SidebarWrapper = styled(Box)({
  width: 200,
  flexShrink: 0,
  backgroundColor: '#fafafa',
  borderRight: '1px solid #e0e0e0',
  padding: '24px 0',
})

export const SidebarTitle = styled(Typography)({
  fontSize: '0.7rem',
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#9e9e9e',
  padding: '0 20px',
  marginBottom: 12,
})

export const FirmnessItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected: boolean }>(({ selected }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '10px 20px',
  cursor: 'pointer',
  backgroundColor: selected ? '#ede7f6' : 'transparent',
  borderRight: selected ? '3px solid #7c4dff' : '3px solid transparent',
  transition: 'background-color 0.15s ease',
  '&:hover': {
    backgroundColor: selected ? '#ede7f6' : '#f0f0f0',
  },
}))

export const FirmnessLabel = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected: boolean }>(({ selected }) => ({
  fontSize: '0.85rem',
  fontWeight: selected ? 600 : 400,
  color: selected ? '#5e35b1' : '#424242',
  textTransform: 'capitalize',
}))

export const FirmnessDot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'dotcolor',
})<{ dotcolor: string }>(({ dotcolor }) => ({
  width: 10,
  height: 10,
  borderRadius: '50%',
  backgroundColor: dotcolor,
  flexShrink: 0,
}))
