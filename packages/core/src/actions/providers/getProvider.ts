import { providers } from 'ethers'

import { getClient } from '../../client'

export type GetProviderArgs = {
  /** Chain id to use for provider */
  chainId?: number
}

export type GetProviderResult<
  TProvider extends providers.BaseProvider = providers.BaseProvider,
> = TProvider

export function getProvider<
  TProvider extends providers.BaseProvider = providers.BaseProvider,
>({ chainId }: GetProviderArgs = {}): GetProviderResult<TProvider> {
  const client = getClient<TProvider>()
  if (chainId && typeof client.config.provider === 'function')
    return client.config.provider({ chainId })
  return client.provider
}
