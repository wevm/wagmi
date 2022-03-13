import * as React from 'react'

export const useIsMounted = () => {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  return mounted
}
