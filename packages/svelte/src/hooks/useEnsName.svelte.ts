import type { Config, GetEnsNameErrorType, ResolvedRegister } from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type GetEnsNameData,
  type GetEnsNameOptions,
  type GetEnsNameQueryFnData,
  type GetEnsNameQueryKey,
  getEnsNameQueryOptions,
} from '@wagmi/core/query'
import { type CreateQueryReturnType, createQuery } from '../query.svelte.js'
import type {
  ConfigParameter,
  QueryParameter,
  RuneParameters,
  RuneReturnType,
} from '../types.js'
import { useChainId } from './useChainId.svelte.js'
import { useConfig } from './useConfig.svelte.js'

export type UseEnsNameParameters<
  config extends Config = Config,
  selectData = GetEnsNameData,
> = RuneParameters<
  Compute<
    GetEnsNameOptions<config> &
      ConfigParameter<config> &
      QueryParameter<
        GetEnsNameQueryFnData,
        GetEnsNameErrorType,
        selectData,
        GetEnsNameQueryKey<config>
      >
  >
>

export type UseEnsNameReturnType<selectData = GetEnsNameData> = RuneReturnType<
  CreateQueryReturnType<selectData, GetEnsNameErrorType>
>

/** https://wagmi.sh/react/api/hooks/useEnsName */
export function useEnsName<
  config extends Config = ResolvedRegister['config'],
  selectData = GetEnsNameData,
>(
  parameters: UseEnsNameParameters<config, selectData> = () => ({}),
): UseEnsNameReturnType<selectData> {
  const { address, query = {} } = $derived(parameters())

  const config = $derived.by(useConfig(parameters))
  const chainId = $derived.by(useChainId(() => ({ config })))

  const options = $derived(
    getEnsNameQueryOptions(config, {
      ...parameters(),
      chainId: parameters().chainId ?? chainId,
    }),
  )

  const enabled = $derived(Boolean(address && (query.enabled ?? true)))

  return createQuery(() => ({ ...query, ...options, enabled }))
}
