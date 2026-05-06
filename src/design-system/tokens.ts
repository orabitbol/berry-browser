export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
} as const

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 40,
} as const

export const zIndex = {
  assistant: 1300,
  fab: 1301,
} as const

export const transition = {
  fast: '0.15s ease',
  normal: '0.2s ease',
  smooth: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
} as const

export const gradients = {
  pageBg: (mode: string) =>
    mode === 'dark'
      ? 'linear-gradient(135deg, #0d0b1e 0%, #13112a 50%, #0c1020 100%)'
      : 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 30%, #f0f4ff 70%, #f8f8ff 100%)',
  purple: (mode: string) =>
    mode === 'dark'
      ? 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)'
      : 'linear-gradient(135deg, #6d28d9 0%, #7c4dff 100%)',
  purpleSubtle: (mode: string) =>
    mode === 'dark'
      ? 'linear-gradient(135deg, rgba(91,33,182,0.35) 0%, rgba(109,40,217,0.15) 100%)'
      : 'linear-gradient(135deg, rgba(109,40,217,0.07) 0%, rgba(124,77,255,0.04) 100%)',
  titleText: (mode: string) =>
    mode === 'dark'
      ? 'linear-gradient(135deg, #c4b5fd 0%, #a78bfa 50%, #818cf8 100%)'
      : 'linear-gradient(135deg, #5b21b6 0%, #6d28d9 50%, #7c4dff 100%)',
}

export const shadows = {
  card: (mode: string) =>
    mode === 'dark'
      ? '0 8px 40px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)'
      : '0 8px 40px rgba(109,40,217,0.10), 0 2px 8px rgba(0,0,0,0.05)',
  cardHover: (mode: string) =>
    mode === 'dark'
      ? '0 12px 32px rgba(0,0,0,0.5), 0 4px 12px rgba(124,58,237,0.2)'
      : '0 8px 24px rgba(109,40,217,0.18), 0 2px 8px rgba(0,0,0,0.06)',
  panel: (mode: string) =>
    mode === 'dark'
      ? '0 20px 60px rgba(0,0,0,0.7), 0 4px 16px rgba(0,0,0,0.4), 0 0 0 1px rgba(167,139,250,0.12)'
      : '0 20px 60px rgba(109,40,217,0.15), 0 4px 16px rgba(0,0,0,0.08), 0 0 0 1px rgba(109,40,217,0.08)',
  fab: (mode: string) =>
    mode === 'dark'
      ? '0 4px 24px rgba(124,58,237,0.5), 0 2px 8px rgba(0,0,0,0.4)'
      : '0 4px 24px rgba(109,40,217,0.4), 0 2px 8px rgba(0,0,0,0.15)',
  fabHover: (mode: string) =>
    mode === 'dark'
      ? '0 6px 32px rgba(124,58,237,0.65)'
      : '0 6px 32px rgba(109,40,217,0.55)',
}
