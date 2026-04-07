import type {
  Config,
  ReadContractErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { ConfigParameter, UnionCompute } from '@wagmi/core/internal'
import {
  type ReadContractData,
  type ReadContractOptions,
  readContractQueryOptions,
} from '@wagmi/core/query'
import type { Accessor } from 'solid-js'
import { createMemo } from 'solid-js'
import type { Abi, ContractFunctionArgs, ContractFunctionName } from 'viem'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

/** https://wagmi.sh/solid/api/primitives/useReadContract */
export function useReadContract<
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'pure' | 'view'>,
  const args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
  config extends Config = ResolvedRegister['config'],
  selectData = ReadContractData<abi, functionName, args>,
>(
  parameters: useReadContract.Parameters<
    abi,
    functionName,
    args,
    config,
    selectData
  > = () => ({}) as any,
): useReadContract.ReturnType<abi, functionName, args, selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId(() => ({ config: config() }))
  const options = createMemo(() =>
    readContractQueryOptions(config(), {
      ...(parameters() as any),
      chainId: parameters().chainId ?? chainId(),
    }),
  )
  return useQuery(options) as any
}

export namespace useReadContract {
  export type Parameters<
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
  > = Accessor<SolidParameters<abi, functionName, args, config, selectData>>

  export type ReturnType<
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

  export type SolidParameters<
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
    ReadContractOptions<abi, functionName, args, config, selectData> &
      ConfigParameter<config>
  >
}
