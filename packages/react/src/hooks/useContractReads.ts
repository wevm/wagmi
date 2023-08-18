import { type ReadContractError, type ResolvedRegister } from '@wagmi/core'
import { type Evaluate } from '@wagmi/core/internal'
import {
  type ReadContractsData,
  type ReadContractsOptions,
  type ReadContractsQueryFnData,
  type ReadContractsQueryKey,
  readContractsQueryOptions,
} from '@wagmi/core/query'
import { useMemo } from 'react'
import type { ContractParameters, MulticallContract } from 'viem'

import {
  type UseQueryParameters,
  type UseQueryResult,
  structuralSharing,
  useQuery,
} from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseContractReadsParameters<
  contracts extends readonly unknown[] = readonly MulticallContract[],
  allowFailure extends boolean = true,
  selectData = ReadContractsData<contracts, allowFailure>,
> = Evaluate<
  ReadContractsOptions<ResolvedRegister['config'], contracts, allowFailure> &
    UseQueryParameters<
      ReadContractsQueryFnData<contracts, allowFailure>,
      ReadContractError,
      selectData,
      ReadContractsQueryKey<ResolvedRegister['config'], contracts, allowFailure>
    >
>

export type UseContractReadsReturnType<
  contracts extends readonly unknown[] = readonly MulticallContract[],
  allowFailure extends boolean = true,
  selectData = ReadContractsData<contracts, allowFailure>,
> = UseQueryResult<selectData, ReadContractError>

// /** https://wagmi.sh/react/hooks/useContractReads */
export function useContractReads<
  const contracts extends readonly unknown[],
  allowFailure extends boolean = true,
  selectData = ReadContractsData<contracts, allowFailure>,
>(
  parameters: UseContractReadsParameters<
    contracts,
    allowFailure,
    selectData
  > = {},
): UseContractReadsReturnType<contracts, allowFailure, selectData> {
  const { contracts = [], ...query } = parameters
  const config = useConfig()

  const chainId = useChainId()
  const queryOptions = readContractsQueryOptions(config, {
    ...parameters,
    chainId,
    contracts: contracts as ContractParameters[],
  })
  const enabled = useMemo(() => {
    let isContractsValid = false
    for (const contract of contracts as ContractParameters[]) {
      const { abi, address, functionName } = contract
      if (!abi || !address || !functionName) {
        isContractsValid = false
        break
      }
      isContractsValid = true
    }
    return Boolean(isContractsValid && (parameters.enabled ?? true))
  }, [contracts, parameters.enabled])

  return useQuery({
    ...queryOptions,
    ...(query as any),
    enabled,
    structuralSharing: query.structuralSharing ?? structuralSharing,
  }) as UseContractReadsReturnType<contracts, allowFailure, selectData>
}
