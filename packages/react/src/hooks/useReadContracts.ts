'use client'

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
import { useMemo } from 'react'
import type { ContractFunctionParameters } from 'viem'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseReadContractsParameters<
  contracts extends readonly unknown[] = readonly ContractFunctionParameters[],
  allowFailure extends boolean = true,
  config extends Config = Config,
  selectData = ReadContractsData<contracts, allowFailure>,
> = Compute<
  ReadContractsOptions<contracts, allowFailure, config> &
    ConfigParameter<config> &
    QueryParameter<
      ReadContractsQueryFnData<contracts, allowFailure>,
      ReadContractsErrorType,
      selectData,
      ReadContractsQueryKey<contracts, allowFailure, config>
    >
>

export type UseReadContractsReturnType<
  contracts extends readonly unknown[] = readonly ContractFunctionParameters[],
  allowFailure extends boolean = true,
  selectData = ReadContractsData<contracts, allowFailure>,
> = UseQueryReturnType<selectData, ReadContractsErrorType>

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
  > = {},
): UseReadContractsReturnType<contracts, allowFailure, selectData> {
  const { contracts = [], query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const contractsChainId = useMemo(() => {
    if (contracts.length === 0) return undefined
    const firstChainId = (contracts[0] as { chainId?: number }).chainId
    if (
      (contracts as { chainId?: number }[]).every(
        (contract) => contract.chainId === firstChainId,
      )
    )
      return firstChainId
    return undefined
  }, [contracts])

  const options = readContractsQueryOptions<config, contracts, allowFailure>(
    config,
    { ...parameters, chainId: contractsChainId ?? chainId },
  )

  const enabled = useMemo(() => {
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
  }, [contracts, query.enabled])

  return useQuery({
    ...options,
    ...query,
    enabled,
    structuralSharing: query.structuralSharing ?? structuralSharing,
  })
}
