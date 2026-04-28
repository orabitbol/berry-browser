import axios from 'axios'
import type { BerryListResponse, BerryDetail } from '../types'

const BASE_URL = 'https://pokeapi.co/api/v2'

const mapBerryDetail = (detail: BerryDetail) => ({
  id: detail.id,
  name: detail.name,
  firmness: detail.firmness.name,
  flavors: detail.flavors
    .filter((f) => f.potency > 0)
    .map((f) => f.flavor.name),
})

export const fetchBerries = async () => {
  const list = await axios.get<BerryListResponse>(`${BASE_URL}/berry?limit=64`)
  const requests = list.data.results.map((entry) =>
    axios.get<BerryDetail>(entry.url)
  )
  const responses = await Promise.all(requests)
  return responses
    .map((r) => mapBerryDetail(r.data))
    .sort((a, b) => a.name.localeCompare(b.name))
}
