'use client'

import { useQueryClient } from '@tanstack/react-query'
import type {
  Config,
  GetConnectorClientErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import { type Evaluate, type Omit } from '@wagmi/core/internal'
import {
  type GetConnectorClientData,
  type GetConnectorClientOptions,
  type GetConnectorClientQueryFnData,
  type GetConnectorClientQueryKey,
  getConnectorClientQueryOptions,
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

export type UseConnectorClientParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetConnectorClientData<config, chainId>,
> = Evaluate<
  GetConnectorClientOptions<config, chainId> &
    ConfigParameter<config> & {
      query?:
        | Evaluate<
            Omit<
              UseQueryParameters<
                GetConnectorClientQueryFnData<config, chainId>,
                GetConnectorClientErrorType,
                selectData,
                GetConnectorClientQueryKey<config, chainId>
              >,
              'gcTime' | 'staleTime'
            >
          >
        | undefined
    }
>

export type UseConnectorClientReturnType<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetConnectorClientData<config, chainId>,
> = UseQueryReturnType<selectData, GetConnectorClientErrorType>

/** https://wagmi.sh/react/api/hooks/useConnectorClient */
export function useConnectorClient<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetConnectorClientData<config, chainId>,
>(
  parameters: UseConnectorClientParameters<config, chainId, selectData> = {},
): UseConnectorClientReturnType<config, chainId, selectData> {
  const { query = {} } = parameters

  const config = useConfig(parameters)
  const queryClient = useQueryClient()
  const { address, connector, status } = useAccount()
  const chainId = useChainId()

  const { queryKey, ...options } = getConnectorClientQueryOptions<
    config,
    chainId
  >(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
    connector: parameters.connector ?? connector,
  })
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
  })
}
