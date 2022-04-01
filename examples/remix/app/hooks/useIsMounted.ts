import { useEffect, useState } from 'react'

export function useIsMounted() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return mounted
}
