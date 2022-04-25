import * as React from 'react'
import type { BaseProvider } from '@ethersproject/providers'
import { GetProviderArgs, getProvider, watchProvider } from '@wagmi/core'

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
    const unwatch = watchProvider<TProvider>({ chainId }, (provider_) => {
      provider.current = provider_
      forceUpdate()
    })
    return unwatch
  }, [chainId, client, forceUpdate])

  return provider.current
}
