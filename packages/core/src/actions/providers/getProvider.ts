import { getClient } from '../../client'
import { Provider } from '../../types'

export type GetProviderArgs = {
  /** Chain id to use for provider */
  chainId?: number
}

export type GetProviderResult<TProvider extends Provider = Provider> = TProvider

export function getProvider<TProvider extends Provider = Provider>({
  chainId,
}: GetProviderArgs = {}): GetProviderResult<TProvider> {
  const client = getClient<TProvider>()
  if (chainId && typeof client.config.provider === 'function')
    return client.config.provider({ chainId })
  return client.provider
}
