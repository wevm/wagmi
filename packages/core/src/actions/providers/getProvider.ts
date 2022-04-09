import type { BaseProvider } from '@ethersproject/providers'

import { getClient } from '../../client'

export type GetProviderArgs = {
  /** Chain id to use for provider */
  chainId?: number
}

export type GetProviderResult<TProvider extends BaseProvider = BaseProvider> =
  TProvider

export function getProvider<TProvider extends BaseProvider = BaseProvider>({
  chainId,
}: GetProviderArgs = {}): GetProviderResult<TProvider> {
  const client = getClient<TProvider>()
  if (chainId && typeof client.config.provider === 'function')
    return client.config.provider({ chainId })
  return client.provider
}
