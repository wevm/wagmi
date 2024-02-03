import { createQueryClient } from '@tanstack/solid-query'
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

import type { ConfigParameter } from '../types/properties.ts'
import {
  type CreateQueryParameters,
  type CreateQueryReturnType,
  createQuery,
} from '../utils/query.ts'
import { createAccount } from './createAccount.ts'
import { createConfig } from './createConfig.ts'
import { createChainId } from './createChainId.ts'
import { createEffect } from 'solid-js'

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
              CreateQueryParameters<
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

export type CreateConnectorClientReturnType<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetConnectorClientData<config, chainId>,
> = CreateQueryReturnType<selectData, GetConnectorClientErrorType>

/** https://wagmi.sh/react/api/hooks/useConnectorClient */
export function useConnectorClient<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetConnectorClientData<config, chainId>,
>(
  parameters: UseConnectorClientParameters<config, chainId, selectData> = {},
): CreateConnectorClientReturnType<config, chainId, selectData> {
  const { query = {} } = parameters

  const config = createConfig(parameters)
  const queryClient = createQueryClient()
  const { account } = createAccount()
  const { chain } = createChainId()

  const { queryKey, ...options } = getConnectorClientQueryOptions<
    config,
    chainId
  >(config, {
    ...parameters,
    chainId: parameters.chainId ?? chain.id,
    connector: parameters.connector ?? account?.connector,
  })
  const enabled = Boolean(status !== 'disconnected' && (query.enabled ?? true))

  createEffect(() => {
    // invalidate when address changes
    if (account.address) queryClient.invalidateQueries({ queryKey })
    else queryClient.removeQueries({ queryKey }) // remove when account is disconnected
  })

  return createQuery(()=>({
    ...query,
    ...options,
    queryKey,
    enabled,
    staleTime: Infinity,
  }))
}
