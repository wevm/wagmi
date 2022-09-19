import { getClient } from '../../client'
import { Provider } from '../../types'

export type GetProviderArgs = {
  /** Chain id to use for provider */
  chainId?: number
}

export type GetProviderResult<TProvider extends Provider = Provider> = TProvider

const providers = new Map()

export function getProvider<TProvider extends Provider = Provider>({
  chainId,
}: GetProviderArgs = {}): GetProviderResult<TProvider> {
  const client = getClient<TProvider>()
  if (chainId && typeof client.config.provider === 'function') {
    if (providers.get(chainId)) return providers.get(chainId)

    const provider = client.config.provider({ chainId })
    providers.set(chainId, provider)
    return provider
  }
  return client.provider
}
