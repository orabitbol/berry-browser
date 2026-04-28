export const FIRMNESS_LEVELS = [
  'very-soft',
  'soft',
  'hard',
  'very-hard',
  'super-hard',
] as const

export type FirmnessLevel = (typeof FIRMNESS_LEVELS)[number]

export const FIRMNESS_COLORS: Record<FirmnessLevel, string> = {
  'very-soft': '#a8e6cf',
  soft: '#88d8b0',
  hard: '#f9a825',
  'very-hard': '#ef6c00',
  'super-hard': '#b71c1c',
}
