import axios from 'axios'
import type { BerryFirmnessResponse, BerryDetail, ItemDetail, BerryListItem } from '../types'
import type { FirmnessLevel } from '../constants'

const BASE_URL = 'https://pokeapi.co/api/v2'

const mapDetail = (detail: BerryDetail): BerryListItem => ({
  id: detail.id,
  name: detail.name,
  firmness: detail.firmness.name,
  flavors: detail.flavors.filter((f) => f.potency > 0),
  growthTime: detail.growth_time,
  smoothness: detail.smoothness,
  size: detail.size,
  soilDryness: detail.soil_dryness,
  naturalGiftPower: detail.natural_gift_power,
  naturalGiftType: detail.natural_gift_type.name,
  itemUrl: detail.item.url,
})

export const fetchBerriesByFirmness = async (firmness: FirmnessLevel): Promise<BerryListItem[]> => {
  const { data } = await axios.get<BerryFirmnessResponse>(`${BASE_URL}/berry-firmness/${firmness}`)

  const items = await Promise.all(
    data.berries.map(async (entry) => {
      const { data: detail } = await axios.get<BerryDetail>(entry.url)
      return mapDetail(detail)
    })
  )

  return items.sort((a, b) => a.name.localeCompare(b.name))
}

export const fetchBerrySprite = async (itemUrl: string): Promise<string | null> => {
  try {
    const { data } = await axios.get<ItemDetail>(itemUrl)
    return data.sprites.default
  } catch {
    return null
  }
}
