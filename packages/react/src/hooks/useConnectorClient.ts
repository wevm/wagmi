'use client'

import { useQueryClient } from '@tanstack/react-query'
import type {
  Config,
  GetConnectorClientErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Compute, Omit } from '@wagmi/core/internal'
import {
  type GetConnectorClientData,
  type GetConnectorClientOptions,
  type GetConnectorClientQueryFnData,
  type GetConnectorClientQueryKey,
  getConnectorClientQueryOptions,
} from '@wagmi/core/query'
import { useEffect, useRef } from 'react'

import type { ConfigParameter } from '../types/properties.js'
import {
  type UseQueryParameters,
  type UseQueryReturnType,
  useQuery,
} from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import { useConnection } from './useConnection.js'

export type UseConnectorClientParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetConnectorClientData<config, chainId>,
> = Compute<
  GetConnectorClientOptions<config, chainId> &
    ConfigParameter<config> & {
      query?:
        | Compute<
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
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetConnectorClientData<config, chainId>,
> = UseQueryReturnType<selectData, GetConnectorClientErrorType>

/** https://wagmi.sh/react/api/hooks/useConnectorClient */
export function useConnectorClient<
  config extends Config = ResolvedRegister['config'],
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetConnectorClientData<config, chainId>,
>(
  parameters: UseConnectorClientParameters<config, chainId, selectData> = {},
): UseConnectorClientReturnType<config, chainId, selectData> {
  const { query = {}, ...rest } = parameters

  const config = useConfig(rest)
  const chainId = useChainId({ config })
  const { address, connector } = useConnection({ config })
  const options = getConnectorClientQueryOptions<config, chainId>(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
    connector: parameters.connector ?? connector,
  })
  const enabled = options.enabled && (query.enabled ?? true)

  const queryClient = useQueryClient()
  const addressRef = useRef(address)
  // biome-ignore lint/correctness/useExhaustiveDependencies: `queryKey` not required
  useEffect(() => {
    const previousAddress = addressRef.current
    if (!address && previousAddress) {
      // remove when account is disconnected
      queryClient.removeQueries({ queryKey: options.queryKey })
      addressRef.current = undefined
    } else if (address !== previousAddress) {
      // invalidate when address changes
      queryClient.invalidateQueries({ queryKey: options.queryKey })
      addressRef.current = address
    }
  }, [address, queryClient])
  return useQuery({ ...query, ...options, enabled })
}
