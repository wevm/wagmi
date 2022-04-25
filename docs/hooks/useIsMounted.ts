import * as React from 'react'

export function useIsMounted() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  return mounted
}
