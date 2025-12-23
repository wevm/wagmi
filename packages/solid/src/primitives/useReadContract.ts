import type { Config, ResolvedRegister } from '@wagmi/core'
import type { UnionCompute } from '@wagmi/core/internal'
import {
  type ReadContractData,
  type ReadContractOptions,
  type ReadContractQueryFnData,
  type ReadContractQueryKey,
  readContractQueryOptions,
} from '@wagmi/core/query'
import type { Accessor } from 'solid-js'
import type {
  Abi,
  ContractFunctionArgs,
  ContractFunctionName,
  ReadContractErrorType,
} from 'viem'
import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useConfig } from './useConfig.js'

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

export function useReadContract<
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'pure' | 'view'>,
  const args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
  config extends Config = ResolvedRegister['config'],
  selectData = ReadContractData<abi, functionName, args>,
>(
  params: Accessor<
    UseReadContractParameters<abi, functionName, args, config, selectData>
  >,
): UseReadContractReturnType<abi, functionName, args, selectData> {
  const config = useConfig(params)

  return useQuery(() => {
    const { address, abi, functionName, query = {} } = params()
    // @ts-ignore
    const code = params().code as Hex | undefined

    const options = readContractQueryOptions<config, abi, functionName, args>(
      config(),
      params(),
    )
    const enabled = Boolean(
      (address || code) && abi && functionName && (query?.enabled ?? true),
    )

    return {
      ...options,
      ...query,
      enabled,
    }
  })
}
