import * as React from 'react'
import { FetchSignerResult, fetchSigner, watchSigner } from '@wagmi/core'

export function useSigner() {
  const [signer, setSigner] = React.useState<FetchSignerResult>(null)
  React.useEffect(() => {
    ;(async () => {
      setSigner(await fetchSigner())
    })()
  }, [])

  React.useEffect(() => {
    const unwatch = watchSigner(setSigner)
    return unwatch
  }, [])

  return { data: signer }
}
