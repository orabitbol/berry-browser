export const FIRMNESS_LEVELS = [
  'very-soft',
  'soft',
  'hard',
  'very-hard',
  'super-hard',
] as const

export type FirmnessLevel = (typeof FIRMNESS_LEVELS)[number]

export const FIRMNESS_COLORS: Record<FirmnessLevel, string> = {
  'very-soft': '#81c784',
  soft: '#4db6ac',
  hard: '#f9a825',
  'very-hard': '#ef6c00',
  'super-hard': '#c62828',
}

export const FLAVOR_COLORS: Record<string, string> = {
  spicy: '#ef5350',
  dry: '#42a5f5',
  sweet: '#ec407a',
  bitter: '#66bb6a',
  sour: '#ffa726',
}

export const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Name A–Z' },
  { value: 'name-desc', label: 'Name Z–A' },
  { value: 'growth-time', label: 'Growth Time' },
  { value: 'size', label: 'Size' },
  { value: 'smoothness', label: 'Smoothness' },
  { value: 'natural-gift-power', label: 'Gift Power' },
] as const

export type SortOption = (typeof SORT_OPTIONS)[number]['value']

export function formatFirmness(firmness: string): string {
  return firmness.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}
