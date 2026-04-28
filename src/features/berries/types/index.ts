export type Berry = {
  id: number
  name: string
  firmness: string
  flavors: string[]
}

export type BerryListResponse = {
  count: number
  next: string | null
  previous: string | null
  results: { name: string; url: string }[]
}

export type FlavorEntry = {
  flavor: { name: string; url: string }
  potency: number
}

export type BerryDetail = {
  id: number
  name: string
  firmness: { name: string; url: string }
  flavors: FlavorEntry[]
}
