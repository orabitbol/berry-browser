import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import { transition } from '@/design-system'

const ITEM_HEIGHT = 46

export const SidebarWrapper = styled(Box)(({ theme }) => ({
  width: 210,
  flexShrink: 0,
  backgroundColor: theme.palette.mode === 'dark' ? '#17152d' : '#faf8ff',
  borderRight: `1px solid ${theme.palette.divider}`,
  padding: '24px 0 24px',
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    borderRight: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: '16px',
    gap: 8,
  },
}))

export const SidebarTitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.68rem',
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: theme.palette.text.secondary,
  padding: '0 20px',
  marginBottom: 8,
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}))

export const ActiveIndicator = styled('span', {
  shouldForwardProp: (prop) => prop !== 'itemIndex',
})<{ itemIndex: number }>(({ itemIndex, theme }) => ({
  position: 'absolute',
  right: 0,
  top: 56 + itemIndex * ITEM_HEIGHT,
  width: 3,
  height: ITEM_HEIGHT,
  backgroundColor: theme.palette.primary.main,
  borderRadius: '3px 0 0 3px',
  transition: 'top 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}))

export const FirmnessItem = styled('button', {
  shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected: boolean }>(({ selected, theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '0 20px',
  height: ITEM_HEIGHT,
  width: '100%',
  cursor: 'pointer',
  backgroundColor: selected
    ? theme.palette.mode === 'dark'
      ? 'rgba(167,139,250,0.15)'
      : '#ede7f6'
    : 'transparent',
  border: 'none',
  outline: 'none',
  textAlign: 'left',
  transition: `background-color ${transition.fast}`,
  '&:hover': {
    backgroundColor: selected
      ? theme.palette.mode === 'dark'
        ? 'rgba(167,139,250,0.15)'
        : '#ede7f6'
      : theme.palette.mode === 'dark'
        ? 'rgba(255,255,255,0.05)'
        : '#f0f0f0',
  },
  '&:focus-visible': {
    boxShadow: `inset 0 0 0 2px ${theme.palette.primary.main}`,
  },
  [theme.breakpoints.down('sm')]: {
    width: 'auto',
    height: 36,
    padding: '0 14px',
    borderRadius: 18,
    border: selected
      ? `1.5px solid ${theme.palette.primary.main}`
      : `1.5px solid ${theme.palette.divider}`,
    backgroundColor: selected
      ? theme.palette.mode === 'dark'
        ? 'rgba(167,139,250,0.15)'
        : '#ede7f6'
      : 'transparent',
  },
}))

export const FirmnessLabel = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected: boolean }>(({ selected, theme }) => ({
  fontSize: '0.85rem',
  fontWeight: selected ? 600 : 400,
  color: selected
    ? theme.palette.mode === 'dark'
      ? '#c4b5fd'
      : '#5e35b1'
    : theme.palette.text.primary,
  transition: `color ${transition.fast}`,
}))

export const FirmnessDot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'dotColor' && prop !== 'selected',
})<{ dotColor: string; selected: boolean }>(({ dotColor, selected }) => ({
  width: 10,
  height: 10,
  borderRadius: '50%',
  backgroundColor: dotColor,
  flexShrink: 0,
  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
  transform: selected ? 'scale(1.35)' : 'scale(1)',
  boxShadow: selected ? `0 0 0 3px ${dotColor}50` : 'none',
}))
