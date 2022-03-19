import * as React from 'react'

// React Query doesn't provide the functionality to "refetch" with config (query key) as
// an argument. This hook is a workaround to provide a `getter` function that acts like
// a `refetch` with config.

export function useGetterWithConfig<T>(config_: Partial<T>) {
  const isMounted = React.useRef(false)
  const [config, setConfig] = React.useState<Partial<T>>(config_)

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (isMounted.current) setConfig(config_)
    isMounted.current = true
  }, [...Object.values(config_)])
  /* eslint-enable react-hooks/exhaustive-deps */

  const [forceEnabled, setForceEnabled] = React.useState(false)
  /* eslint-disable react-hooks/exhaustive-deps */
  const getter = React.useCallback(
    (refetch: () => void) => (config: T) => {
      setConfig(config)
      if (forceEnabled) refetch()
      else setForceEnabled(true)
    },
    [forceEnabled],
  )
  /* eslint-enable react-hooks/exhaustive-deps */

  return {
    config,
    forceEnabled,
    getter,
  }
}
