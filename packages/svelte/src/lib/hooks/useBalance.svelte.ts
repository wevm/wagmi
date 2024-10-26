import type { Config, GetBalanceErrorType, ResolvedRegister } from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import type { GetBalanceQueryFnData } from '@wagmi/core/query'
import {
  type GetBalanceData,
  type GetBalanceOptions,
  type GetBalanceQueryKey,
  getBalanceQueryOptions,
} from '@wagmi/core/query'

import { useChainId } from '$lib/hooks/useChainId.svelte.js'
import { useConfig } from '$lib/hooks/useConfig.svelte.js'
import { type CreateQueryReturnType, createQuery } from '$lib/query.svelte.js'
import type {
  ConfigParameter,
  QueryParameter,
  RuneParameters,
  RuneReturnType,
} from '$lib/types.js'

export type UseBalanceParameters<
  config extends Config = Config,
  selectData = GetBalanceData,
> = RuneParameters<
  Compute<
    GetBalanceOptions<config> &
      ConfigParameter<config> &
      QueryParameter<
        GetBalanceQueryFnData,
        GetBalanceErrorType,
        selectData,
        GetBalanceQueryKey<config>
      >
  >
>

export type UseBalanceReturnType<selectData = GetBalanceData> = RuneReturnType<
  CreateQueryReturnType<selectData, GetBalanceErrorType>
>

/** https://wagmi.sh/react/api/hooks/useBalance */
export function useBalance<
  config extends Config = ResolvedRegister['config'],
  selectData = GetBalanceData,
>(
  parameters: UseBalanceParameters<config, selectData> = () => ({}),
): UseBalanceReturnType<selectData> {
  const { address, query = {} } = $derived(parameters())

  const config = $derived.by(useConfig(parameters))
  const chainId = $derived.by(useChainId(parameters))

  const options = $derived(
    getBalanceQueryOptions(config, {
      ...parameters(),
      chainId: parameters().chainId ?? chainId,
    }),
  )
  const enabled = $derived(Boolean(address && (query.enabled ?? true)))

  return createQuery(() => ({ ...query, ...options, enabled }))
}
