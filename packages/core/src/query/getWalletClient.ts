import type { QueryObserverOptions } from '@tanstack/query-core'
import {
  type GetWalletClientErrorType,
  type GetWalletClientParameters,
  type GetWalletClientReturnType,
  getWalletClient,
} from '../actions/getWalletClient.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetWalletClientOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = Compute<
  ExactPartial<GetWalletClientParameters<config, chainId>> & ScopeKeyParameter
>

export function getWalletClientQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(config: config, options: GetWalletClientOptions<config, chainId> = {}) {
  return {
    enabled: Boolean(options.connector?.getProvider),
    gcTime: 0,
    queryFn: async (context) => {
      if (!options.connector?.getProvider)
        throw new Error('connector is required')
      const {
        connectorUid: _,
        scopeKey: _s,
        ...parameters
      } = context.queryKey[1]
      return getWalletClient(config, {
        ...parameters,
        connector: options.connector,
      }) as unknown as Promise<GetWalletClientReturnType<config, chainId>>
    },
    queryKey: getWalletClientQueryKey(options),
    staleTime: Number.POSITIVE_INFINITY,
  } as const satisfies QueryObserverOptions<
    GetWalletClientQueryFnData<config, chainId>,
    GetWalletClientErrorType,
    GetWalletClientData<config, chainId>,
    GetWalletClientQueryFnData<config, chainId>,
    GetWalletClientQueryKey<config, chainId>
  >
}

export type GetWalletClientQueryFnData<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = GetWalletClientReturnType<config, chainId>

export type GetWalletClientData<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = GetWalletClientQueryFnData<config, chainId>

export function getWalletClientQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(options: GetWalletClientOptions<config, chainId> = {}) {
  return [
    'walletClient',
    { ...filterQueryOptions(options), connectorUid: options.connector?.uid },
  ] as const
}

export type GetWalletClientQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = ReturnType<typeof getWalletClientQueryKey<config, chainId>>
