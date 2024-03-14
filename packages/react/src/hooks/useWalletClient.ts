'use client'

// Almost identical implementation to `useConnectorClient` (except for return type)
// Should update both in tandem

import { useQueryClient } from '@tanstack/react-query'
import type {
  Config,
  GetWalletClientErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import { type Evaluate, type Omit } from '@wagmi/core/internal'
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
    ConfigParameter<config> & {
      query?:
        | Evaluate<
            Omit<
              UseQueryParameters<
                GetWalletClientQueryFnData<config, chainId>,
                GetWalletClientErrorType,
                selectData,
                GetWalletClientQueryKey<config, chainId>
              >,
              'gcTime' | 'staleTime'
            >
          >
        | undefined
    }
>

export type UseWalletClientReturnType<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetWalletClientData<config, chainId>,
> = UseQueryReturnType<selectData, GetWalletClientErrorType>

/** https://wagmi.sh/react/api/hooks/useWalletClient */
export function useWalletClient<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetWalletClientData<config, chainId>,
>(
  parameters: UseWalletClientParameters<config, chainId, selectData> = {},
): UseWalletClientReturnType<config, chainId, selectData> {
  const { query = {}, ...rest } = parameters

  const config = useConfig(rest)
  const queryClient = useQueryClient()
  const { address, connector, status } = useAccount()
  const chainId = useChainId()

  const { queryKey, ...options } = getWalletClientQueryOptions<config, chainId>(
    config,
    {
      ...parameters,
      chainId: parameters.chainId ?? chainId,
      connector: parameters.connector ?? connector,
    },
  )
  const enabled = Boolean(status !== 'disconnected' && (query.enabled ?? true))

  // biome-ignore lint/nursery/useExhaustiveDependencies: `queryKey` not required
  useEffect(() => {
    // invalidate when address changes
    if (address) queryClient.invalidateQueries({ queryKey })
    else queryClient.removeQueries({ queryKey }) // remove when account is disconnected
  }, [address, queryClient])

  return useQuery({
    ...query,
    ...options,
    queryKey,
    enabled,
    staleTime: Infinity,
  } as any) as UseWalletClientReturnType<config, chainId, selectData>
}
