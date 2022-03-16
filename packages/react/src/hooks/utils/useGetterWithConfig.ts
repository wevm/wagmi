import { useCallback, useEffect, useRef, useState } from 'react'

// React Query doesn't provide the functionality to "refetch" with config (query key) as
// an argument. This hook is a workaround to provide a `getter` function that acts like
// a `refetch` with config.

export const useGetterWithConfig = <T>(config_: Partial<T>) => {
  const isMounted = useRef(false)
  const [config, setConfig] = useState<Partial<T>>(config_)
  useEffect(() => {
    if (isMounted.current) {
      setConfig(config_)
    }
    isMounted.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...Object.values(config_)])

  const [forceEnabled, setForceEnabled] = useState(false)

  const getter = useCallback(
    (refetch: () => void) => (config: T) => {
      setConfig(config)
      if (forceEnabled) {
        refetch()
      } else {
        setForceEnabled(true)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return {
    config,
    forceEnabled,
    getter,
  }
}
