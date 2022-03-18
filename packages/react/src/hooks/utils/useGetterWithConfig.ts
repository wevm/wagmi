import * as React from 'react'

// React Query doesn't provide the functionality to "refetch" with config (query key) as
// an argument. This hook is a workaround to provide a `getter` function that acts like
// a `refetch` with config.

export function useGetterWithConfig<T>(config_: Partial<T>) {
  const isMounted = React.useRef(false)
  const [config, setConfig] = React.useState<Partial<T>>(config_)

  React.useEffect(() => {
    if (isMounted.current) {
      setConfig(config_)
    }
    isMounted.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...Object.values(config_)])

  const [forceEnabled, setForceEnabled] = React.useState(false)

  const getter = React.useCallback(
    (refetch: () => void) => (config: T) => {
      setConfig(config)
      if (forceEnabled) refetch()
      else setForceEnabled(true)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [forceEnabled],
  )

  return {
    config,
    forceEnabled,
    getter,
  }
}
