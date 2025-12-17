import { useQueryClient } from '@tanstack/solid-query'
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
import type { Accessor } from 'solid-js'
import { createEffect, createMemo, on } from 'solid-js'

import type { ConfigParameter } from '../types/properties.js'
import {
  type SolidQueryParameters,
  type UseQueryReturnType,
  useQuery,
} from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import { useConnection } from './useConnection.js'

export type SolidUseConnectorClientParameters<
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
              SolidQueryParameters<
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

export type UseConnectorClientParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetConnectorClientData<config, chainId>,
> = Accessor<SolidUseConnectorClientParameters<config, chainId, selectData>>

export type UseConnectorClientReturnType<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetConnectorClientData<config, chainId>,
> = UseQueryReturnType<selectData, GetConnectorClientErrorType>

/** https://wagmi.sh/solid/api/primitives/useConnectorClient */
export function useConnectorClient<
  config extends Config = ResolvedRegister['config'],
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetConnectorClientData<config, chainId>,
>(
  parameters: UseConnectorClientParameters<
    config,
    chainId,
    selectData
  > = () => ({}),
): UseConnectorClientReturnType<config, chainId, selectData> {
  const config = useConfig(parameters)
  const queryClient = useQueryClient()
  const connection = useConnection(() => ({
    config: config(),
  }))
  const configChainId = useChainId(() => ({ config: config() }))

  const queryOptions = createMemo(() => {
    const {
      chainId = configChainId(),
      connector = connection().connector,
      query = {},
    } = parameters()
    const { queryKey, ...options } = getConnectorClientQueryOptions<
      config,
      chainId
    >(config(), {
      ...parameters(),
      chainId,
      connector,
    })
    const enabled = Boolean(connection().status === 'connected' && connector)

    return {
      ...query,
      ...options,
      queryKey,
      enabled: query.enabled ?? enabled,
      staleTime: Number.POSITIVE_INFINITY,
    }
  })

  createEffect(
    on(
      () => connection().address,
      (currentAddress, previousAddress) => {
        if (!currentAddress && previousAddress) {
          // remove when account is disconnected
          queryClient.removeQueries({ queryKey: queryOptions().queryKey })
        } else if (currentAddress !== previousAddress) {
          // invalidate when address changes
          queryClient.invalidateQueries({ queryKey: queryOptions().queryKey })
        }
      },
      { defer: true },
    ),
  )

  return useQuery(queryOptions)
}
