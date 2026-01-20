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
  readContractsQueryOptions,
} from '@wagmi/core/query'
import { useMemo } from 'react'
import type { ContractFunctionParameters } from 'viem'
import type { ConfigParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseReadContractsParameters<
  contracts extends readonly unknown[] = readonly ContractFunctionParameters[],
  allowFailure extends boolean = true,
  config extends Config = Config,
  selectData = ReadContractsData<contracts, allowFailure>,
> = Compute<
  ReadContractsOptions<contracts, allowFailure, config, selectData> &
    ConfigParameter<config>
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
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const contractsChainId = useMemo(() => {
    const firstChainId = (
      parameters.contracts?.[0] as { chainId?: number } | undefined
    )?.chainId
    if (
      ((parameters.contracts ?? []) as { chainId?: number }[]).every(
        (contract) => contract.chainId === firstChainId,
      )
    )
      return firstChainId
    return undefined
  }, [parameters.contracts])
  const options = readContractsQueryOptions(config, {
    ...parameters,
    chainId: contractsChainId ?? chainId,
  })
  return useQuery(options) as any
}
