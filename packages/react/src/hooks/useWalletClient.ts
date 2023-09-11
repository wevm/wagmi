'use client'

// Almost identical implementation to `useConnectorClient` (except for return type)
// Should update both in tandem

import { useQueryClient } from '@tanstack/react-query'
import type {
  Config,
  GetWalletClientError,
  ResolvedRegister,
} from '@wagmi/core'
import { type Evaluate } from '@wagmi/core/internal'
import {
  type GetWalletClientData,
  type GetWalletClientOptions,
  type GetWalletClientQueryFnData,
  type GetWalletClientQueryKey,
  getWalletClientQueryOptions,
} from '@wagmi/core/query'
import { useEffect } from 'react'

import type { ConfigParameter } from '../types/properties.js'
import {
  type UseQueryParameters,
  type UseQueryReturnType,
  useQuery,
} from '../utils/query.js'
import { useAccount } from './useAccount.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseWalletClientParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetWalletClientData<config, chainId>,
> = Evaluate<
  GetWalletClientOptions<config, chainId> &
    UseQueryParameters<
      GetWalletClientQueryFnData<config, chainId>,
      GetWalletClientError,
      selectData,
      GetWalletClientQueryKey<config, chainId>
    > &
    ConfigParameter<config>
>

export type UseWalletClientReturnType<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetWalletClientData<config, chainId>,
> = UseQueryReturnType<selectData, GetWalletClientError>

/** https://alpha.wagmi.sh/react/api/hooks/useWalletClient */
export function useWalletClient<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetWalletClientData<config, chainId>,
>(
  parameters: UseWalletClientParameters<config, chainId, selectData> = {},
): UseWalletClientReturnType<config, chainId, selectData> {
  const { gcTime = 0, staleTime = Infinity, ...query } = parameters

  const config = useConfig(parameters)
  const queryClient = useQueryClient()
  const { address, connector, status } = useAccount()
  const chainId = useChainId()

  const { queryKey, ...options } = getWalletClientQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
    connector: parameters.connector ?? connector,
  })
  const enabled = Boolean(
    status !== 'disconnected' && (parameters.enabled ?? true),
  )

  // biome-ignore lint/nursery/useExhaustiveDependencies: `queryKey` not required
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
