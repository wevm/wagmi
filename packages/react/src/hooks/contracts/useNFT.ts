import type { FetchNFTArgs, FetchNFTResult } from '@wagmi/core'
import { fetchNFT } from '@wagmi/core'

import type { QueryConfig, QueryFunctionArgs } from '../../types'
import { useChainId, useQuery } from '../utils'

export type UseNFTArgs = Partial<FetchNFTArgs>
export type UseNFTConfig = QueryConfig<FetchNFTResult, Error>

type QueryKeyArgs = Partial<FetchNFTArgs> & {
  chainId?: number
}
type QueryKeyConfig = Pick<UseNFTConfig, 'scopeKey'> & {
  activeChainId?: number
  signerAddress?: string
}

function queryKey({
  address,
  chainId,
  id,
  scopeKey,
}: QueryKeyArgs & QueryKeyConfig) {
  return [{ entity: 'nft', address, chainId, id, scopeKey }] as const
}

function queryFn({
  queryKey: [{ address, chainId, id }],
}: QueryFunctionArgs<typeof queryKey>) {
  if (!address) throw new Error('address is required')
  if (!id) throw new Error('id is required')
  return fetchNFT({ address, chainId, id })
}

export function useNFT({
  address,
  chainId: chainId_,
  id,
  cacheTime,
  enabled = true,
  scopeKey,
  staleTime = 1_000 * 60 * 60 * 24, // 24 hours
  suspense,
  onError,
  onSettled,
  onSuccess,
}: UseNFTArgs & UseNFTConfig = {}) {
  const chainId = useChainId({ chainId: chainId_ })

  return useQuery(queryKey({ address, chainId, id, scopeKey }), queryFn, {
    cacheTime,
    enabled: Boolean(enabled && address),
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })
}
