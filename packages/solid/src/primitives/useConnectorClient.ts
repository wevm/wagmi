import { useQueryClient } from '@tanstack/solid-query'
import type {
  Config,
  GetConnectorClientErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Compute, ConfigParameter } from '@wagmi/core/internal'
import {
  type GetConnectorClientData,
  type GetConnectorClientOptions,
  getConnectorClientQueryOptions,
} from '@wagmi/core/query'
import type { Accessor } from 'solid-js'
import { createEffect, createMemo, on } from 'solid-js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import { useConnection } from './useConnection.js'

/** https://wagmi.sh/solid/api/primitives/useConnectorClient */
export function useConnectorClient<
  config extends Config = ResolvedRegister['config'],
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetConnectorClientData<config, chainId>,
>(
  parameters: useConnectorClient.Parameters<
    config,
    chainId,
    selectData
  > = () => ({}),
): useConnectorClient.ReturnType<config, chainId, selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId(() => ({ config: config() }))
  const connection = useConnection(() => ({ config: config() }))
  const options = createMemo(() =>
    getConnectorClientQueryOptions<config, chainId>(config(), {
      ...(parameters() as any),
      chainId: parameters().chainId ?? chainId(),
      connector: parameters().connector ?? connection().connector,
    }),
  )
  const queryClient = useQueryClient()
  createEffect(
    on(
      () => connection().address,
      (currentAddress, previousAddress) => {
        if (!currentAddress && previousAddress) {
          // remove when account is disconnected
          queryClient.removeQueries({ queryKey: options().queryKey })
        } else if (currentAddress !== previousAddress) {
          // invalidate when address changes
          queryClient.invalidateQueries({ queryKey: options().queryKey })
        }
      },
      { defer: true },
    ),
  )
  return useQuery(options) as any
}

export namespace useConnectorClient {
  export type Parameters<
    config extends Config = Config,
    chainId extends
      config['chains'][number]['id'] = config['chains'][number]['id'],
    selectData = GetConnectorClientData<config, chainId>,
  > = Accessor<SolidParameters<config, chainId, selectData>>

  export type ReturnType<
    config extends Config = Config,
    chainId extends
      config['chains'][number]['id'] = config['chains'][number]['id'],
    selectData = GetConnectorClientData<config, chainId>,
  > = UseQueryReturnType<selectData, GetConnectorClientErrorType>

  export type SolidParameters<
    config extends Config = Config,
    chainId extends
      config['chains'][number]['id'] = config['chains'][number]['id'],
    selectData = GetConnectorClientData<config, chainId>,
  > = Compute<
    GetConnectorClientOptions<config, chainId, selectData> &
      ConfigParameter<config>
  >
}
