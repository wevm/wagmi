import * as Fathom from 'fathom-client'
import { useRouter } from 'next/router'
import * as React from 'react'

export function useFathom() {
  const router = useRouter()

  React.useEffect(() => {
    Fathom.load(process.env.NEXT_PUBLIC_FATHOM_ID ?? '', {
      includedDomains: ['wagmi.sh'],
    })

    function onRouteChangeComplete() {
      Fathom.trackPageview()
    }
    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete)

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
