import { FetchTokenArgs, FetchTokenResult, fetchToken } from '@wagmi/core'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useChainId, useQuery } from '../utils'

export type UseTokenArgs = Partial<FetchTokenArgs>

export type UseTokenConfig = QueryConfig<FetchTokenResult, Error>

export const queryKey = ({
  address,
  chainId,
  formatUnits,
}: Partial<FetchTokenArgs> & {
  chainId?: number
}) => [{ entity: 'token', address, chainId, formatUnits }] as const

const queryFn = ({
  queryKey: [{ address, formatUnits }],
}: QueryFunctionArgs<typeof queryKey>) => {
  if (!address) throw new Error('address is required')
  return fetchToken({ address, formatUnits })
}

export function useToken({
  address,
  formatUnits = 'ether',
  cacheTime,
  enabled = true,
  staleTime = 60 * 60 * 24, // 24 hours
  suspense,
  onError,
  onSettled,
  onSuccess,
}: UseTokenArgs & UseTokenConfig = {}) {
  const chainId = useChainId()

  return useQuery(queryKey({ address, chainId, formatUnits }), queryFn, {
    cacheTime,
    enabled: Boolean(enabled && address),
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })
}
