import * as React from 'react'
import {
  GetProviderArgs,
  Provider,
  getProvider,
  watchProvider,
} from '@wagmi/core'

import { useClient } from '../../context'
import { useForceUpdate } from '../utils'

export type UseProviderArgs = Partial<GetProviderArgs>

export function useProvider<TProvider extends Provider>({
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
