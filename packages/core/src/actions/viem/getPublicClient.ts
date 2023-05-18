import { getConfig } from '../../config'
import type { PublicClient } from '../../types'

export type GetPublicClientArgs = {
  /** Chain id to use for public client. */
  chainId?: number
}

export type GetPublicClientResult<
  TPublicClient extends PublicClient = PublicClient,
> = TPublicClient

export function getPublicClient<
  TPublicClient extends PublicClient = PublicClient,
>({ chainId }: GetPublicClientArgs = {}): GetPublicClientResult<TPublicClient> {
  const config = getConfig<TPublicClient>()
  if (chainId) return config.getPublicClient({ chainId }) || config.publicClient
  return config.publicClient
}
