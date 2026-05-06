import { styled } from '@mui/material/styles'
import { keyframes } from '@emotion/react'
import { Box, Typography, LinearProgress, Chip } from '@mui/material'
import { radius } from '@/design-system'

const fadeIn = keyframes({
  from: { opacity: 0, transform: 'scale(0.92)' },
  to: { opacity: 1, transform: 'scale(1)' },
})

export const DrawerInner = styled(Box)(({ theme }) => ({
  width: 400,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflowY: 'auto',
  backgroundColor: theme.palette.background.paper,
  scrollbarWidth: 'thin',
  scrollbarColor: `${theme.palette.divider} transparent`,
}))

export const DrawerHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '20px 20px 16px',
  borderBottom: `1px solid ${theme.palette.divider}`,
  position: 'sticky',
  top: 0,
  backgroundColor: theme.palette.background.paper,
  zIndex: 1,
}))

export const DrawerTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.05rem',
  color: theme.palette.text.primary,
  textTransform: 'capitalize',
}))

export const DrawerBody = styled(Box)({
  flex: 1,
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
})

export const HeroSection = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'accentColor',
})<{ accentColor: string }>(({ accentColor }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 20,
  backgroundColor: `${accentColor}12`,
  borderRadius: radius.lg,
  padding: '20px',
  border: `1px solid ${accentColor}28`,
}))

export const LargeImageContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'accentColor',
})<{ accentColor: string }>(({ accentColor }) => ({
  width: 112,
  height: 112,
  borderRadius: radius.lg,
  overflow: 'hidden',
  backgroundColor: `${accentColor}18`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}))

export const LargePlaceholder = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'accentColor',
})<{ accentColor: string }>(({ accentColor, theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `radial-gradient(circle at 35% 35%, ${accentColor}50, ${accentColor}18)`,
  color: accentColor,
  fontWeight: 800,
  fontSize: '2.4rem',
  letterSpacing: '-0.03em',
  textTransform: 'uppercase',
  userSelect: 'none',
  fontFamily: theme.typography.fontFamily,
}))

export const LargeImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  imageRendering: 'pixelated',
  animation: `${fadeIn} 0.35s ease`,
})

export const HeroMeta = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
})

export const BerryFullName = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.3rem',
  color: theme.palette.text.primary,
  textTransform: 'capitalize',
  lineHeight: 1.2,
}))

export const FirmnessChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'bgColor',
})<{ bgColor: string }>(({ bgColor }) => ({
  backgroundColor: bgColor,
  fontWeight: 600,
  fontSize: '0.75rem',
  textTransform: 'capitalize',
  alignSelf: 'flex-start',
  '& .MuiChip-label': {
    color: '#fff',
  },
}))

export const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.68rem',
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: theme.palette.text.secondary,
  marginBottom: 12,
}))

export const FlavorRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  marginBottom: 8,
})

export const FlavorName = styled(Typography)(({ theme }) => ({
  fontSize: '0.8rem',
  color: theme.palette.text.secondary,
  textTransform: 'capitalize',
  width: 52,
  flexShrink: 0,
}))

export const FlavorBar = styled(LinearProgress, {
  shouldForwardProp: (prop) => prop !== 'barColor',
})<{ barColor: string }>(({ barColor }) => ({
  flex: 1,
  height: 6,
  borderRadius: 4,
  backgroundColor: `${barColor}22`,
  '& .MuiLinearProgress-bar': {
    backgroundColor: barColor,
    borderRadius: 4,
  },
}))

export const PotencyValue = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  width: 24,
  textAlign: 'right',
  flexShrink: 0,
}))

export const StatsGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '12px 16px',
})

export const StatItem = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
})

export const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.7rem',
  color: theme.palette.text.secondary,
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
}))

export const StatValue = styled(Typography)(({ theme }) => ({
  fontSize: '0.95rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
  textTransform: 'capitalize',
}))
