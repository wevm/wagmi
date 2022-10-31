import { FetchTokenArgs, FetchTokenResult, fetchToken } from '@wagmi/core'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useChainId, useQuery } from '../utils'

export type UseTokenArgs = Partial<FetchTokenArgs>
export type UseTokenConfig = QueryConfig<FetchTokenResult, Error>

type QueryKeyArgs = Partial<FetchTokenArgs> & {
  chainId?: number
}
type QueryKeyConfig = Pick<UseTokenConfig, 'contextKey'> & {
  activeChainId?: number
  signerAddress?: string
}

function queryKey({
  address,
  chainId,
  contextKey,
  formatUnits,
}: QueryKeyArgs & QueryKeyConfig) {
  return [
    { entity: 'token', address, chainId, contextKey, formatUnits },
  ] as const
}

function queryFn({
  queryKey: [{ address, chainId, formatUnits }],
}: QueryFunctionArgs<typeof queryKey>) {
  if (!address) throw new Error('address is required')
  return fetchToken({ address, chainId, formatUnits })
}

export function useToken({
  address,
  chainId: chainId_,
  formatUnits = 'ether',
  cacheTime,
  contextKey,
  enabled = true,
  staleTime = 1_000 * 60 * 60 * 24, // 24 hours
  suspense,
  onError,
  onSettled,
  onSuccess,
}: UseTokenArgs & UseTokenConfig = {}) {
  const chainId = useChainId({ chainId: chainId_ })

  return useQuery(
    queryKey({ address, chainId, contextKey, formatUnits }),
    queryFn,
    {
      cacheTime,
      enabled: Boolean(enabled && address),
      staleTime,
      suspense,
      onError,
      onSettled,
      onSuccess,
    },
  )
}
