import { getClient } from '../../client'
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
  const client = getClient<TPublicClient>()
  if (chainId) return client.getPublicClient({ chainId }) || client.publicClient
  return client.publicClient
}
