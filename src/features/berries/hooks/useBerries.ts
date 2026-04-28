import { useState, useEffect, useCallback } from 'react'
import type { Berry } from '../types'
import { fetchBerries } from '../services/berryService'

export function useBerries() {
  const [berries, setBerries] = useState<Berry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError(false)
    try {
      setBerries(await fetchBerries())
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load()
  }, [load])

  return { berries, loading, error, load }
}
