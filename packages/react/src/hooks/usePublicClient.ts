'use client'

import {
  type Config,
  type GetPublicClientParameters,
  type GetPublicClientReturnType,
  type ResolvedRegister,
  getPublicClient,
  watchPublicClient,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector.js'

import type { ConfigParameter } from '../types/properties.js'
import { useConfig } from './useConfig.js'

export type UsePublicClientParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | number | undefined =
    | config['chains'][number]['id']
    | undefined,
> = Compute<
  GetPublicClientParameters<config, chainId> & ConfigParameter<config>
>

export type UsePublicClientReturnType<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | number | undefined =
    | config['chains'][number]['id']
    | undefined,
> = GetPublicClientReturnType<config, chainId>

/** https://wagmi.sh/react/api/hooks/usePublicClient */
export function usePublicClient<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] | number | undefined =
    | config['chains'][number]['id']
    | undefined,
>(
  parameters: UsePublicClientParameters<config, chainId> = {},
): UsePublicClientReturnType<config, chainId> {
  const config = useConfig(parameters)

  return useSyncExternalStoreWithSelector(
    (onChange) => watchPublicClient(config, { onChange }),
    () => getPublicClient(config, parameters),
    () => getPublicClient(config, parameters),
    (x) => x,
    (a, b) => a?.uid === b?.uid,
  ) as any
}
