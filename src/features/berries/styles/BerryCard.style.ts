import { styled } from '@mui/material/styles'
import { keyframes } from '@emotion/react'
import { Box, Stack, Typography } from '@mui/material'
import { radius, shadows, transition } from '@/design-system'

const fadeIn = keyframes({
  from: { opacity: 0, transform: 'scale(0.9)' },
  to: { opacity: 1, transform: 'scale(1)' },
})

export const CardWrapper = styled('button', {
  shouldForwardProp: (prop) => prop !== 'accentColor',
})<{ accentColor: string }>(({ theme, accentColor }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 16px',
  borderRadius: radius.md,
  border: `1px solid ${theme.palette.divider}`,
  borderLeft: `3px solid ${accentColor}`,
  backgroundColor: theme.palette.background.paper,
  cursor: 'pointer',
  width: '100%',
  textAlign: 'left',
  transition: `box-shadow ${transition.fast}, transform ${transition.fast}, background-color ${transition.fast}`,
  '&:hover': {
    boxShadow: shadows.cardHover(theme.palette.mode),
    transform: 'translateY(-2px)',
    borderColor: accentColor,
    borderLeftColor: accentColor,
    backgroundColor:
      theme.palette.mode === 'dark' ? `${accentColor}0a` : theme.palette.background.paper,
  },
  '&:focus-visible': {
    outline: `2px solid ${accentColor}`,
    outlineOffset: 2,
  },
  '&:active': {
    transform: 'translateY(0)',
  },
}))

export const CardLeft = styled(Stack)({
  alignItems: 'center',
  minWidth: 0,
  flex: 1,
})

export const BerryImageContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'accentColor',
})<{ accentColor: string }>(({ accentColor }) => ({
  width: 44,
  height: 44,
  borderRadius: 10,
  overflow: 'hidden',
  flexShrink: 0,
  backgroundColor: `${accentColor}18`,
}))

export const BerryPlaceholder = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'accentColor',
})<{ accentColor: string }>(({ accentColor, theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `radial-gradient(circle at 35% 35%, ${accentColor}50, ${accentColor}1a)`,
  color: accentColor,
  fontWeight: 800,
  fontSize: '1.05rem',
  letterSpacing: '-0.02em',
  textTransform: 'uppercase',
  userSelect: 'none',
  fontFamily: theme.typography.fontFamily,
}))

export const BerryImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  imageRendering: 'pixelated',
  animation: `${fadeIn} 0.3s ease`,
})

export const BerryInfo = styled(Box)({
  minWidth: 0,
  flex: 1,
})

export const BerryName = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '0.9rem',
  color: theme.palette.text.primary,
  textTransform: 'capitalize',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}))

export const BerryMeta = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  display: 'flex',
  alignItems: 'center',
  gap: 4,
}))

export const BerryMetaDot = styled('span')(({ theme }) => ({
  display: 'inline-block',
  width: 3,
  height: 3,
  borderRadius: '50%',
  backgroundColor: theme.palette.divider,
  verticalAlign: 'middle',
}))

export const CardRight = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 5,
  justifyContent: 'flex-end',
  maxWidth: '48%',
  flexShrink: 0,
})
