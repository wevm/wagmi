import * as React from 'react'
import type { BaseProvider } from '@ethersproject/providers'
import { GetProviderArgs, getProvider } from '@wagmi/core'

import { useClient } from '../../context'
import { useForceUpdate } from '../utils'

export type UseProviderArgs = Partial<GetProviderArgs>

export function useProvider<TProvider extends BaseProvider>({
  chainId,
}: UseProviderArgs = {}) {
  const forceUpdate = useForceUpdate()
  const client = useClient<TProvider>()
  const provider = React.useRef(getProvider<TProvider>({ chainId }))

  React.useEffect(() => {
    const unsubscribe = client.subscribe(
      (state) => state.provider,
      () => {
        provider.current = getProvider({ chainId })
        forceUpdate()
      },
    )
    return unsubscribe
  }, [chainId, client, forceUpdate])

  return provider.current
}
