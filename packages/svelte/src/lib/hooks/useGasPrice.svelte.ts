import type {
  Config,
  GetGasPriceErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type GetGasPriceData,
  type GetGasPriceOptions,
  type GetGasPriceQueryFnData,
  type GetGasPriceQueryKey,
  getGasPriceQueryOptions,
} from '@wagmi/core/query'

import { type CreateQueryReturnType, createQuery } from '$lib/query.svelte.js'
import type { RuneParameters, RuneReturnType } from '$lib/types.js'
import type { ConfigParameter, QueryParameter } from '../types.js'
import { useChainId } from './useChainId.svelte.js'
import { useConfig } from './useConfig.svelte.js'

export type UseGasPriceParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetGasPriceData,
> = RuneParameters<
  Compute<
    GetGasPriceOptions<config, chainId> &
      ConfigParameter<config> &
      QueryParameter<
        GetGasPriceQueryFnData,
        GetGasPriceErrorType,
        selectData,
        GetGasPriceQueryKey<config, chainId>
      >
  >
>

export type UseGasPriceReturnType<selectData = GetGasPriceData> =
  RuneReturnType<CreateQueryReturnType<selectData, GetGasPriceErrorType>>

/** https://wagmi.sh/react/api/hooks/useGasPrice */
export function useGasPrice<
  config extends Config = ResolvedRegister['config'],
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetGasPriceData,
>(
  parameters: UseGasPriceParameters<config, chainId, selectData> = () => ({}),
): UseGasPriceReturnType<selectData> {
  const { query = {} } = $derived(parameters())

  const config = $derived.by(useConfig(parameters))
  const configChainId = $derived.by(useChainId(() => ({ config })))
  const chainId = $derived(parameters().chainId ?? configChainId)

  const options = $derived(
    getGasPriceQueryOptions(config, {
      ...parameters(),
      chainId,
    }),
  )

  return createQuery(() => ({ ...query, ...options }))
}
