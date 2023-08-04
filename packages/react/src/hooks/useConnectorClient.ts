import type { GetConnectorClientError, ResolvedRegister } from '@wagmi/core'
import { type Evaluate } from '@wagmi/core/internal'
import {
  type GetConnectorClientData,
  type GetConnectorClientOptions,
  type GetConnectorClientQueryFnData,
  type GetConnectorClientQueryKey,
  getConnectorClientQueryOptions,
} from '@wagmi/core/query'
import { useEffect } from 'react'

import {
  type UseQueryParameters,
  type UseQueryResult,
  useQuery,
} from '../utils/query.js'
import { useAccount } from './useAccount.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import { useQueryClient } from '@tanstack/react-query'

export type UseConnectorClientParameters<selectData = GetConnectorClientData> =
  Evaluate<
    GetConnectorClientOptions<ResolvedRegister['config']> &
      UseQueryParameters<
        GetConnectorClientQueryFnData,
        GetConnectorClientError,
        selectData,
        GetConnectorClientQueryKey<ResolvedRegister['config']>
      >
  >

export type UseConnectorClientReturnType<selectData = GetConnectorClientData> =
  UseQueryResult<selectData, GetConnectorClientError>

/** https://wagmi.sh/react/hooks/useConnectorClient */
export function useConnectorClient<selectData = GetConnectorClientData>(
  parameters: UseConnectorClientParameters<selectData> = {},
): UseConnectorClientReturnType<selectData> {
  const { gcTime = 0, staleTime = Infinity, ...query } = parameters
  const config = useConfig()
  const queryClient = useQueryClient()
  const { address, connector, status } = useAccount()

  const chainId = parameters.chainId ?? useChainId()
  const { queryKey, ...options } = getConnectorClientQueryOptions(config, {
    ...parameters,
    chainId,
    connector: parameters.connector ?? connector,
  })
  const enabled = Boolean(
    status !== 'disconnected' && (parameters.enabled ?? true),
  )

  // rome-ignore lint/nursery/useExhaustiveDependencies: `queryKey` not required
  useEffect(() => {
    // invalidate when address changes
    if (address) queryClient.invalidateQueries({ queryKey })
    else queryClient.removeQueries({ queryKey }) // remove when account is disconnected
  }, [address, queryClient])

  return useQuery({
    ...options,
    ...query,
    queryKey,
    enabled,
    gcTime,
    staleTime,
  })
}
