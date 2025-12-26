import type {
  Config,
  ReadContractErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { UnionCompute } from '@wagmi/core/internal'
import {
  type ReadContractData,
  type ReadContractOptions,
  type ReadContractQueryFnData,
  type ReadContractQueryKey,
  readContractQueryOptions,
} from '@wagmi/core/query'
import { type Accessor, createMemo } from 'solid-js'
import type { Abi, ContractFunctionArgs, ContractFunctionName, Hex } from 'viem'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type SolidReadContractParameters<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends ContractFunctionName<
    abi,
    'pure' | 'view'
  > = ContractFunctionName<abi, 'pure' | 'view'>,
  args extends ContractFunctionArgs<
    abi,
    'pure' | 'view',
    functionName
  > = ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
  config extends Config = Config,
  selectData = ReadContractData<abi, functionName, args>,
> = UnionCompute<
  ReadContractOptions<abi, functionName, args, config> &
    ConfigParameter<config> &
    QueryParameter<
      ReadContractQueryFnData<abi, functionName, args>,
      ReadContractErrorType,
      selectData,
      ReadContractQueryKey<abi, functionName, args, config>
    >
>

export type UseReadContractParameters<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends ContractFunctionName<
    abi,
    'pure' | 'view'
  > = ContractFunctionName<abi, 'pure' | 'view'>,
  args extends ContractFunctionArgs<
    abi,
    'pure' | 'view',
    functionName
  > = ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
  config extends Config = Config,
  selectData = ReadContractData<abi, functionName, args>,
> = Accessor<
  SolidReadContractParameters<abi, functionName, args, config, selectData>
>

export type UseReadContractReturnType<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends ContractFunctionName<
    abi,
    'pure' | 'view'
  > = ContractFunctionName<abi, 'pure' | 'view'>,
  args extends ContractFunctionArgs<
    abi,
    'pure' | 'view',
    functionName
  > = ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
  selectData = ReadContractData<abi, functionName, args>,
> = UseQueryReturnType<selectData, ReadContractErrorType>

export function useReadContract<
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'pure' | 'view'>,
  const args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
  config extends Config = ResolvedRegister['config'],
  selectData = ReadContractData<abi, functionName, args>,
>(
  parameters: UseReadContractParameters<
    abi,
    functionName,
    args,
    config,
    selectData
  > = () => ({}) as any,
): UseReadContractReturnType<abi, functionName, args, selectData> {
  const config = useConfig(parameters)
  const configChainId = useChainId(() => ({ config: config() }))

  const queryOptions = createMemo(() => {
    const params = parameters()
    const { abi, address, chainId, functionName, query = {} } = params
    // @ts-ignore
    const code = params.code as Hex | undefined

    const options = readContractQueryOptions<config, abi, functionName, args>(
      config(),
      { ...(params as any), chainId: chainId ?? configChainId() },
    )

    const enabled = Boolean(
      (address || code) && abi && functionName && (query.enabled ?? true),
    )

    return {
      ...query,
      ...options,
      enabled,
      // structuralSharing not needed for Solid's fine-grained reactivity
    }
  })

  return useQuery(queryOptions)
}
