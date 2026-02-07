import type {
  Config,
  ReadContractsErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Compute, ConfigParameter } from '@wagmi/core/internal'
import {
  type ReadContractsData,
  type ReadContractsOptions,
  readContractsQueryOptions,
} from '@wagmi/core/query'
import type { Accessor } from 'solid-js'
import { createMemo } from 'solid-js'
import type { ContractFunctionParameters } from 'viem'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

/** https://wagmi.sh/solid/api/primitives/useReadContracts */
export function useReadContracts<
  const contracts extends readonly unknown[],
  allowFailure extends boolean = true,
  config extends Config = ResolvedRegister['config'],
  selectData = ReadContractsData<contracts, allowFailure>,
>(
  parameters: useReadContracts.Parameters<
    contracts,
    allowFailure,
    config,
    selectData
  > = () => ({}),
): useReadContracts.ReturnType<contracts, allowFailure, selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId(() => ({ config: config() }))
  const contractsChainId = createMemo(() => {
    const firstChainId = (
      parameters().contracts?.[0] as { chainId?: number } | undefined
    )?.chainId
    if (
      ((parameters().contracts ?? []) as { chainId?: number }[]).every(
        (contract) => contract.chainId === firstChainId,
      )
    )
      return firstChainId
    return undefined
  })
  const options = createMemo(() =>
    readContractsQueryOptions(config(), {
      ...parameters(),
      chainId: contractsChainId() ?? chainId(),
    }),
  )
  return useQuery(options) as any
}

export namespace useReadContracts {
  export type Parameters<
    contracts extends readonly unknown[] = readonly ContractFunctionParameters[],
    allowFailure extends boolean = true,
    config extends Config = Config,
    selectData = ReadContractsData<contracts, allowFailure>,
  > = Accessor<SolidParameters<contracts, allowFailure, config, selectData>>

  export type ReturnType<
    contracts extends readonly unknown[] = readonly ContractFunctionParameters[],
    allowFailure extends boolean = true,
    selectData = ReadContractsData<contracts, allowFailure>,
  > = UseQueryReturnType<selectData, ReadContractsErrorType>

  export type SolidParameters<
    contracts extends readonly unknown[] = readonly ContractFunctionParameters[],
    allowFailure extends boolean = true,
    config extends Config = Config,
    selectData = ReadContractsData<contracts, allowFailure>,
  > = Compute<
    ReadContractsOptions<contracts, allowFailure, config, selectData> &
      ConfigParameter<config>
  >
}
