'use client'

import {
  type Config,
  type ReadContractError,
  type ResolvedRegister,
} from '@wagmi/core'
import { type UnionEvaluate } from '@wagmi/core/internal'
import {
  type ReadContractData,
  type ReadContractOptions,
  type ReadContractQueryFnData,
  type ReadContractQueryKey,
  readContractQueryOptions,
} from '@wagmi/core/query'
import {
  type Abi,
  type ContractFunctionArgs,
  type ContractFunctionName,
} from 'viem'

import type { ConfigParameter } from '../types/properties.js'
import {
  type UseQueryParameters,
  type UseQueryReturnType,
  structuralSharing,
  useQuery,
} from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseContractReadParameters<
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
> = UnionEvaluate<
  ReadContractOptions<abi, functionName, args, config> &
    UseQueryParameters<
      ReadContractQueryFnData<abi, functionName, args>,
      ReadContractError,
      selectData,
      ReadContractQueryKey<config, abi, functionName, args>
    > &
    ConfigParameter<config>
>

export type UseContractReadReturnType<
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
> = UseQueryReturnType<selectData, ReadContractError>

/** https://alpha.wagmi.sh/react/api/hooks/useContractRead */
export function useContractRead<
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'pure' | 'view'>,
  args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
  config extends Config = ResolvedRegister['config'],
  selectData = ReadContractData<abi, functionName, args>,
>(
  parameters?: UseContractReadParameters<
    abi,
    functionName,
    args,
    config,
    selectData
  >,
): UseContractReadReturnType<abi, functionName, args, selectData>

export function useContractRead(
  parameters: UseContractReadParameters = {},
): UseContractReadReturnType {
  const { address, abi, functionName, ...query } = parameters
  const config = useConfig(parameters)
  const chainId = useChainId()

  const queryOptions = readContractQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  const enabled = Boolean(
    address && abi && functionName && (parameters.enabled ?? true),
  )

  return useQuery({
    ...queryOptions,
    ...query,
    enabled,
    structuralSharing: query.structuralSharing ?? structuralSharing,
  })
}
