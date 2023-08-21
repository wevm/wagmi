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
  type UseQueryResult,
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
  config extends Config = ResolvedRegister['config'],
  selectData = ReadContractData<abi, functionName, args>,
> = UnionEvaluate<
  ReadContractOptions<config, abi, functionName, args> &
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
> = UseQueryResult<selectData, ReadContractError>

/** https://wagmi.sh/react/hooks/useContractRead */
export function useContractRead<
  config extends Config,
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'pure' | 'view'>,
  args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
  selectData = ReadContractData<abi, functionName, args>,
>(
  parameters: UseContractReadParameters<
    abi,
    functionName,
    args,
    config,
    selectData
  > = {} as UseContractReadParameters<
    abi,
    functionName,
    args,
    config,
    selectData
  >,
): UseContractReadReturnType<abi, functionName, args, selectData> {
  const { address, abi, functionName, ...query } = parameters
  const config = useConfig(parameters)

  const chainId = parameters.chainId ?? useChainId()
  const queryOptions = readContractQueryOptions(config, {
    ...parameters,
    chainId,
  } as ReadContractOptions<ResolvedRegister['config'], abi, functionName, args>)
  const enabled = Boolean(
    address && abi && functionName && (parameters.enabled ?? true),
  )

  return useQuery({
    ...queryOptions,
    ...(query as any),
    enabled,
    structuralSharing: query.structuralSharing ?? structuralSharing,
  }) as UseContractReadReturnType<abi, functionName, args, selectData>
}
