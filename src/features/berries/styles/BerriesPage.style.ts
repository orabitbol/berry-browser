import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import { gradients, shadows, radius } from '@/design-system'

export const PageWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  minHeight: '100vh',
  padding: '40px 20px 60px',
  background: gradients.pageBg(theme.palette.mode),
}))

export const ContentWrapper = styled(Box)({
  width: '100%',
  maxWidth: 1000,
})

export const PageHeader = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  marginBottom: 24,
})

export const PageTitleGroup = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
})

export const PageTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '1.75rem',
  letterSpacing: '-0.03em',
  lineHeight: 1.1,
  background: gradients.titleText(theme.palette.mode),
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}))

export const TitleAccent = styled('span')(({ theme }) => ({
  display: 'block',
  width: 36,
  height: 3,
  borderRadius: 2,
  background: gradients.titleText(theme.palette.mode),
}))

export const PageSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
  fontWeight: 400,
}))

export const ToggleWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  flexShrink: 0,
  paddingTop: 4,
})

export const ToggleLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.72rem',
  fontWeight: 500,
  color: theme.palette.text.secondary,
  userSelect: 'none',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
}))

export const DarkModeToggle = styled('button', {
  shouldForwardProp: (prop) => prop !== 'isDark',
})<{ isDark: boolean }>(({ isDark, theme }) => ({
  position: 'relative',
  width: 48,
  height: 26,
  borderRadius: 13,
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  flexShrink: 0,
  backgroundColor: isDark ? '#5b21b6' : '#ddd6fe',
  boxShadow: isDark
    ? '0 0 0 1px rgba(124,58,237,0.6), 0 0 16px rgba(109,40,217,0.4)'
    : 'inset 0 1px 3px rgba(0,0,0,0.10)',
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 3,
  },
}))

export const ToggleThumb = styled('span', {
  shouldForwardProp: (prop) => prop !== 'isDark',
})<{ isDark: boolean }>(({ isDark }) => ({
  position: 'absolute',
  top: 3,
  left: isDark ? 25 : 3,
  width: 20,
  height: 20,
  borderRadius: '50%',
  backgroundColor: '#ffffff',
  boxShadow: '0 1px 3px rgba(0,0,0,0.22)',
  transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  display: 'block',
}))

export const ContentCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  minHeight: 640,
  backgroundColor: theme.palette.background.paper,
  borderRadius: radius.xl,
  boxShadow: shadows.card(theme.palette.mode),
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    minHeight: 'auto',
  },
}))
