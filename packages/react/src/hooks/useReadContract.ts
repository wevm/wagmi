'use client'

import {
  type Config,
  type ReadContractErrorType,
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
> = UnionEvaluate<
  ReadContractOptions<abi, functionName, args, config> &
    ConfigParameter<config> & {
      query?:
        | UseQueryParameters<
            ReadContractQueryFnData<abi, functionName, args>,
            ReadContractErrorType,
            selectData,
            ReadContractQueryKey<abi, functionName, args, config>
          >
        | undefined
    }
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

/** https://alpha.wagmi.sh/react/api/hooks/useReadContract */
export function useReadContract<
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'pure' | 'view'>,
  args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
  config extends Config = ResolvedRegister['config'],
  selectData = ReadContractData<abi, functionName, args>,
>(
  parameters: UseReadContractParameters<
    abi,
    functionName,
    args,
    config,
    selectData
  > = {} as any,
): UseReadContractReturnType<abi, functionName, args, selectData> {
  const { abi, address, functionName, query = {} } = parameters

  const config = useConfig(parameters)
  const chainId = useChainId()

  const queryOptions = readContractQueryOptions(config, {
    ...(parameters as any),
    chainId: parameters.chainId ?? chainId,
  })
  const enabled = Boolean(
    address && abi && functionName && (query.enabled ?? true),
  )

  return useQuery({
    ...queryOptions,
    ...query,
    enabled,
    structuralSharing: query.structuralSharing ?? structuralSharing,
  })
}
