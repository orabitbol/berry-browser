import type { BerryListItem } from '../../types'
import { FIRMNESS_LEVELS } from '../../constants'

const FLAVORS = ['spicy', 'sour', 'dry', 'sweet', 'bitter'] as const

const FIRMNESS_ALIASES: Record<string, string> = {
  ...Object.fromEntries(FIRMNESS_LEVELS.map((f) => [f, f])),
  'very soft': 'very-soft',
  'very hard': 'very-hard',
  'super hard': 'super-hard',
}

// Check longer firmness names first so "very-soft" matches before "soft".
const FIRMNESS_ENTRIES = Object.entries(FIRMNESS_ALIASES).sort(([a], [b]) => b.length - a.length)

function formatList(names: string[], limit = 8): string {
  if (names.length === 0) return 'none found'
  const shown = names.slice(0, limit)
  const rest = names.length - shown.length
  return rest > 0 ? `${shown.join(', ')}, and ${rest} more` : shown.join(', ')
}

export function processQuery(query: string, berries: BerryListItem[]): string {
  if (berries.length === 0) {
    return 'Berry data is still loading. Browse a firmness group first, then ask again.'
  }

  const q = query.toLowerCase().trim()

  if (/\b(help|what can|suggest|options|capabilities)\b/.test(q)) {
    return (
      'I can help you find:\n' +
      '• Smoothest, biggest, or smallest berry\n' +
      '• Berries by flavor: spicy, sour, dry, sweet, or bitter\n' +
      '• Berries by firmness level\n' +
      '• Highest natural gift power\n' +
      '• Compare two berries — try "compare cheri and pecha"\n\n' +
      'Just ask naturally!'
    )
  }

  if (/smooth/.test(q)) {
    const sorted = [...berries].sort((a, b) => a.smoothness - b.smoothness)
    const top = sorted[0]
    return (
      `The smoothest berry is **${top.name}** with a smoothness of ${top.smoothness}.\n` +
      'Lower smoothness = smoother in Pokémon contest mechanics.'
    )
  }

  if (/\b(big|large|biggest|largest)\b/.test(q)) {
    const sorted = [...berries].sort((a, b) => b.size - a.size)
    const top = sorted[0]
    return `The biggest berry is **${top.name}** at ${top.size}mm.`
  }

  if (/\b(small|tiny|smallest|tiniest)\b/.test(q)) {
    const sorted = [...berries].sort((a, b) => a.size - b.size)
    const top = sorted[0]
    return `The smallest berry is **${top.name}** at ${top.size}mm.`
  }

  if (/\b(gift power|natural gift|highest power|strongest gift)\b/.test(q)) {
    const sorted = [...berries].sort((a, b) => b.naturalGiftPower - a.naturalGiftPower)
    const top = sorted[0]
    return `The berry with the highest natural gift power is **${top.name}** at ${top.naturalGiftPower}.`
  }

  for (const flavor of FLAVORS) {
    if (q.includes(flavor)) {
      const matches = berries.filter((b) => b.flavors.some((f) => f.flavor.name === flavor))
      if (matches.length === 0) {
        return (
          `No ${flavor} berries were found in the currently loaded data.\n` +
          'Try browsing more firmness groups first.'
        )
      }
      const names = matches.map((b) => b.name)
      const label = flavor.charAt(0).toUpperCase() + flavor.slice(1)
      return `${label} berries (${matches.length}): ${formatList(names)}.`
    }
  }

  for (const [keyword, value] of FIRMNESS_ENTRIES) {
    if (q.includes(keyword)) {
      const matches = berries.filter((b) => b.firmness === value)
      if (matches.length === 0) {
        return `No berries with firmness "${keyword}" were found in the loaded data.`
      }
      const names = matches.map((b) => b.name)
      return `Berries with firmness **${keyword}** (${matches.length}): ${formatList(names)}.`
    }
  }

  const compareMatch = q.match(/compare\s+(\w+)\s+(?:and|vs\.?|versus)\s+(\w+)/)
  if (compareMatch) {
    const nameA = compareMatch[1]
    const nameB = compareMatch[2]
    const berryA = berries.find((b) => b.name.toLowerCase() === nameA)
    const berryB = berries.find((b) => b.name.toLowerCase() === nameB)
    if (!berryA && !berryB) {
      return `I couldn't find berries named "${nameA}" or "${nameB}" in the loaded data.`
    }
    if (!berryA) return `I couldn't find a berry named "${nameA}" in the loaded data.`
    if (!berryB) return `I couldn't find a berry named "${nameB}" in the loaded data.`
    return [
      `Comparing **${berryA.name}** vs **${berryB.name}**:`,
      `• Size: ${berryA.size}mm vs ${berryB.size}mm`,
      `• Smoothness: ${berryA.smoothness} vs ${berryB.smoothness}`,
      `• Firmness: ${berryA.firmness} vs ${berryB.firmness}`,
      `• Growth time: ${berryA.growthTime}h vs ${berryB.growthTime}h`,
      `• Gift power: ${berryA.naturalGiftPower} vs ${berryB.naturalGiftPower}`,
    ].join('\n')
  }

  const nameMatch = berries.find((b) => q.includes(b.name.toLowerCase()))
  if (nameMatch) {
    const b = nameMatch
    const flavors =
      b.flavors.length > 0
        ? b.flavors.map((f) => `${f.flavor.name} (${f.potency})`).join(', ')
        : 'no notable flavors'
    return [
      `**${b.name}**`,
      `• Size: ${b.size}mm`,
      `• Smoothness: ${b.smoothness}`,
      `• Firmness: ${b.firmness}`,
      `• Growth time: ${b.growthTime}h`,
      `• Natural gift power: ${b.naturalGiftPower}`,
      `• Flavors: ${flavors}`,
    ].join('\n')
  }

  return 'I can help with berry stats, flavors, firmness, and simple comparisons. Try one of the suggestions below.'
}
