'use client'

// Almost identical implementation to `useConnectorClient` (except for return type)
// Should update both in tandem

import { useQueryClient } from '@tanstack/react-query'
import type {
  Config,
  GetWalletClientErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Compute, Omit } from '@wagmi/core/internal'
import {
  type GetWalletClientData,
  type GetWalletClientOptions,
  type GetWalletClientQueryFnData,
  type GetWalletClientQueryKey,
  getWalletClientQueryOptions,
} from '@wagmi/core/query'
import { useEffect, useRef } from 'react'

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
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetWalletClientData<config, chainId>,
> = Compute<
  GetWalletClientOptions<config, chainId> &
    ConfigParameter<config> & {
      query?:
        | Compute<
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
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetWalletClientData<config, chainId>,
> = UseQueryReturnType<selectData, GetWalletClientErrorType>

/** https://wagmi.sh/react/api/hooks/useWalletClient */
export function useWalletClient<
  config extends Config = ResolvedRegister['config'],
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetWalletClientData<config, chainId>,
>(
  parameters: UseWalletClientParameters<config, chainId, selectData> = {},
): UseWalletClientReturnType<config, chainId, selectData> {
  const { query = {}, ...rest } = parameters

  const config = useConfig(rest)
  const queryClient = useQueryClient()
  const { address, connector, status } = useAccount({ config })
  const chainId = useChainId({ config })
  const activeConnector = parameters.connector ?? connector

  const { queryKey, ...options } = getWalletClientQueryOptions<config, chainId>(
    config,
    {
      ...parameters,
      chainId: parameters.chainId ?? chainId,
      connector: parameters.connector ?? connector,
    },
  )
  const enabled = Boolean(
    (status === 'connected' ||
      (status === 'reconnecting' && activeConnector?.getProvider)) &&
      (query.enabled ?? true),
  )

  const addressRef = useRef(address)
  // biome-ignore lint/correctness/useExhaustiveDependencies: `queryKey` not required
  useEffect(() => {
    const previousAddress = addressRef.current
    if (!address && previousAddress) {
      // remove when account is disconnected
      queryClient.removeQueries({ queryKey })
      addressRef.current = undefined
    } else if (address !== previousAddress) {
      // invalidate when address changes
      queryClient.invalidateQueries({ queryKey })
      addressRef.current = address
    }
  }, [address, queryClient])

  return useQuery({
    ...query,
    ...options,
    queryKey,
    enabled,
    staleTime: Number.POSITIVE_INFINITY,
  } as any) as UseWalletClientReturnType<config, chainId, selectData>
}
