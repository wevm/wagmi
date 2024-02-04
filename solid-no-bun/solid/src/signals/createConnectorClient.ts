import { useQueryClient, type FunctionedParams } from '@tanstack/solid-query'
import type {
  Config,
  GetConnectorClientErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import { Omit, type Evaluate } from '@wagmi/core/internal'
import {
  type GetConnectorClientData,
  type GetConnectorClientOptions,
  type GetConnectorClientQueryFnData,
  type GetConnectorClientQueryKey,
  getConnectorClientQueryOptions,
} from '@wagmi/core/query'

import type { ConfigParameter } from '../types/properties.js'
import {
  type CreateQueryParameters,
  type CreateQueryReturnType,
  createQuery,
} from '../utils/query.js'
import { createAccount } from './createAccount.js'
import { createConfig } from './createConfig.js'
import { createChainId } from './createChainId.js'
import { createEffect } from 'solid-js'

export type CreateConnectorClientParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetConnectorClientData<config, chainId>,
> = FunctionedParams<Evaluate<
  GetConnectorClientOptions<config, chainId> &
    ConfigParameter<config> & {
      query?:
        | Evaluate<
            Omit<
              ReturnType<CreateQueryParameters<
                GetConnectorClientQueryFnData<config, chainId>,
                GetConnectorClientErrorType,
                selectData,
                GetConnectorClientQueryKey<config, chainId>
              >>,
              'gcTime' | 'staleTime'
            >
          >
        | undefined
    }
>>

export type CreateConnectorClientReturnType<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetConnectorClientData<config, chainId>,
> = CreateQueryReturnType<selectData, GetConnectorClientErrorType>

/** https://wagmi.sh/react/api/hooks/useConnectorClient */
export function createConnectorClient<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetConnectorClientData<config, chainId>,
>(
  parameters: CreateConnectorClientParameters<config, chainId, selectData> = ()=>({}),
): CreateConnectorClientReturnType<config, chainId, selectData> {
  const { query = {} } = parameters()

  const config = createConfig(parameters)
  const queryClient = useQueryClient()
  const { account } = createAccount()
  const { chain } = createChainId()

  const { queryKey, ...options } = getConnectorClientQueryOptions<
    config,
    chainId
  >(config, {
    ...parameters(),
    chainId: parameters().chainId ?? chain.id,
    connector: parameters().connector ?? account?.connector,
  })
  const enabled = Boolean(account.status !== 'disconnected' && (query?.enabled ?? true))

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
