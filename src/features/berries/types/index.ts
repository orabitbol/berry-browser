export type FlavorEntry = {
  flavor: { name: string; url: string }
  potency: number
}

export type BerryListItem = {
  id: number
  name: string
  firmness: string
  flavors: FlavorEntry[]
  growthTime: number
  smoothness: number
  size: number
  soilDryness: number
  naturalGiftPower: number
  naturalGiftType: string
  itemUrl: string
}

export type BerryFirmnessResponse = {
  id: number
  name: string
  berries: Array<{ name: string; url: string }>
}

export type BerryDetail = {
  id: number
  name: string
  firmness: { name: string; url: string }
  flavors: FlavorEntry[]
  growth_time: number
  smoothness: number
  size: number
  soil_dryness: number
  natural_gift_power: number
  natural_gift_type: { name: string; url: string }
  item: { name: string; url: string }
}

export type ItemDetail = {
  sprites: {
    default: string | null
  }
}
