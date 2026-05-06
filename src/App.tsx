import { useMemo, useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { getTheme } from './theme'
import { BerriesPage } from './features/berries/components/BerriesPage'

function getInitialMode(): 'light' | 'dark' {
  const saved = localStorage.getItem('colorMode')
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function App() {
  const [colorMode, setColorMode] = useState<'light' | 'dark'>(getInitialMode)

  const toggleColorMode = () => {
    setColorMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light'
      localStorage.setItem('colorMode', next)
      return next
    })
  }

  const theme = useMemo(() => getTheme(colorMode), [colorMode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BerriesPage colorMode={colorMode} toggleColorMode={toggleColorMode} />
    </ThemeProvider>
  )
}

export default App
