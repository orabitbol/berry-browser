import { createTheme } from '@mui/material/styles'

const sharedTypography = {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
}

const sharedComponents = {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none' as const,
        borderRadius: 10,
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 8,
      },
    },
  },
}

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#6d28d9' },
    secondary: { main: '#7c4dff' },
    background: {
      default: '#f5f3ff',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a2e',
      secondary: '#6b7280',
    },
    divider: '#e8e0f7',
  },
  typography: sharedTypography,
  components: sharedComponents,
})

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#a78bfa' },
    secondary: { main: '#8b5cf6' },
    background: {
      default: '#0d0b1e',
      paper: '#1c1831',
    },
    text: {
      primary: '#f1f0f7',
      secondary: '#9ca3af',
    },
    divider: '#2d2a45',
  },
  typography: sharedTypography,
  components: sharedComponents,
})

export function getTheme(mode: 'light' | 'dark') {
  return mode === 'dark' ? darkTheme : lightTheme
}
