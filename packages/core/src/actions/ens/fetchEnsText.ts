import { getPublicClient } from '../viem'

export type FetchEnsTextArgs = {
  /** Name to lookup */
  name: string
  /** Key of the text record to lookup */
  key: string
  /** Chain id to use for Public Client */
  chainId?: number
}

export type FetchEnsTextResult = string | null

export async function fetchEnsText({
  name,
  key,
  chainId,
}: FetchEnsTextArgs): Promise<FetchEnsTextResult> {
  const publicClient = getPublicClient({ chainId })
  return publicClient.getEnsText({
    name,
    key,
  })
}
