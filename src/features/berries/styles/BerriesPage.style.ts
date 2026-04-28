import { styled } from '@mui/material/styles'
import { Box, Stack, Typography } from '@mui/material'

export const PageWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  minHeight: '100vh',
  padding: '40px 24px',
  backgroundColor: '#f5f7fa',
})

export const ContentCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  maxWidth: 960,
  minHeight: 600,
  backgroundColor: '#ffffff',
  borderRadius: 16,
  boxShadow: theme.shadows[4],
  overflow: 'hidden',
}))

export const FeedbackStack = styled(Stack)({
  alignItems: 'center',
})

export const ContentWrapper = styled(Box)({
  width: '100%',
  maxWidth: 960,
})

export const PageTitle = styled(Typography)({
  fontWeight: 700,
  fontSize: '1.5rem',
  color: '#2d2d2d',
  marginBottom: 24,
})
