import type {
  Config,
  ReadContractsErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type ReadContractsData,
  type ReadContractsOptions,
  type ReadContractsQueryFnData,
  type ReadContractsQueryKey,
  readContractsQueryOptions,
  structuralSharing,
} from '@wagmi/core/query'
import type { ContractFunctionParameters } from 'viem'

import { type CreateQueryReturnType, createQuery } from '$lib/query.svelte.js'
import type { RuneParameters, RuneReturnType } from '$lib/types.js'
import type { ConfigParameter, QueryParameter } from '../types.js'
import { useChainId } from './useChainId.svelte.js'
import { useConfig } from './useConfig.svelte.js'

export type UseReadContractsParameters<
  contracts extends readonly unknown[] = readonly ContractFunctionParameters[],
  allowFailure extends boolean = true,
  config extends Config = Config,
  selectData = ReadContractsData<contracts, allowFailure>,
> = RuneParameters<
  Compute<
    ReadContractsOptions<contracts, allowFailure, config> &
      ConfigParameter<config> &
      QueryParameter<
        ReadContractsQueryFnData<contracts, allowFailure>,
        ReadContractsErrorType,
        selectData,
        ReadContractsQueryKey<contracts, allowFailure, config>
      >
  >
>

export type UseReadContractsReturnType<
  contracts extends readonly unknown[] = readonly ContractFunctionParameters[],
  allowFailure extends boolean = true,
  selectData = ReadContractsData<contracts, allowFailure>,
> = RuneReturnType<CreateQueryReturnType<selectData, ReadContractsErrorType>>

/** https://wagmi.sh/react/api/hooks/useReadContracts */
export function useReadContracts<
  const contracts extends readonly unknown[],
  allowFailure extends boolean = true,
  config extends Config = ResolvedRegister['config'],
  selectData = ReadContractsData<contracts, allowFailure>,
>(
  parameters: UseReadContractsParameters<
    contracts,
    allowFailure,
    config,
    selectData
  > = () => ({}),
): UseReadContractsReturnType<contracts, allowFailure, selectData> {
  const { contracts = [], query = {} } = $derived(parameters())

  const config = $derived.by(useConfig(parameters))
  const chainId = $derived.by(useChainId(() => ({ config })))

  const options = $derived(
    readContractsQueryOptions<config, contracts, allowFailure>(config, {
      ...parameters(),
      chainId,
    }),
  )

  const enabled = $derived(() => {
    let isContractsValid = false
    for (const contract of contracts) {
      const { abi, address, functionName } =
        contract as ContractFunctionParameters
      if (!abi || !address || !functionName) {
        isContractsValid = false
        break
      }
      isContractsValid = true
    }
    return Boolean(isContractsValid && (query.enabled ?? true))
  })

  return createQuery(() => ({
    ...options,
    ...query,
    enabled,
    structuralSharing: query.structuralSharing ?? structuralSharing,
  }))
}
