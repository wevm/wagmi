import type {
  Config,
  ResolvedRegister,
  SimulateContractErrorType,
} from '@wagmi/core'
import type { ConfigParameter } from '@wagmi/core/internal'
import {
  type SimulateContractData,
  type SimulateContractOptions,
  simulateContractQueryOptions,
} from '@wagmi/core/query'
import type { Accessor } from 'solid-js'
import { createMemo } from 'solid-js'
import type { Abi, ContractFunctionArgs, ContractFunctionName } from 'viem'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import { useConnection } from './useConnection.js'

/** https://wagmi.sh/solid/api/primitives/useSimulateContract */
export function useSimulateContract<
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  const args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  >,
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] | undefined = undefined,
  selectData = SimulateContractData<abi, functionName, args, config, chainId>,
>(
  parameters: useSimulateContract.Parameters<
    abi,
    functionName,
    args,
    config,
    chainId,
    selectData
  > = () => ({}) as any,
): useSimulateContract.ReturnType<
  abi,
  functionName,
  args,
  config,
  chainId,
  selectData
> {
  const config = useConfig(parameters)
  const connection = useConnection()
  const chainId = useChainId(() => ({ config: config() }))
  const options = createMemo(() =>
    simulateContractQueryOptions(config(), {
      ...(parameters() as any),
      account: parameters().account ?? connection().address,
      chainId: parameters().chainId ?? chainId(),
      connector: parameters().connector ?? connection().connector,
    }),
  )
  return useQuery(options) as any
}

export namespace useSimulateContract {
  export type Parameters<
    abi extends Abi | readonly unknown[] = Abi,
    functionName extends ContractFunctionName<
      abi,
      'nonpayable' | 'payable'
    > = ContractFunctionName<abi, 'nonpayable' | 'payable'>,
    args extends ContractFunctionArgs<
      abi,
      'nonpayable' | 'payable',
      functionName
    > = ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>,
    config extends Config = Config,
    chainId extends config['chains'][number]['id'] | undefined = undefined,
    selectData = SimulateContractData<abi, functionName, args, config, chainId>,
  > = Accessor<
    SolidParameters<abi, functionName, args, config, chainId, selectData>
  >

  export type ReturnType<
    abi extends Abi | readonly unknown[] = Abi,
    functionName extends ContractFunctionName<
      abi,
      'nonpayable' | 'payable'
    > = ContractFunctionName<abi, 'nonpayable' | 'payable'>,
    args extends ContractFunctionArgs<
      abi,
      'nonpayable' | 'payable',
      functionName
    > = ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>,
    config extends Config = Config,
    chainId extends config['chains'][number]['id'] | undefined = undefined,
    selectData = SimulateContractData<abi, functionName, args, config, chainId>,
  > = UseQueryReturnType<selectData, SimulateContractErrorType>

  export type SolidParameters<
    abi extends Abi | readonly unknown[] = Abi,
    functionName extends ContractFunctionName<
      abi,
      'nonpayable' | 'payable'
    > = ContractFunctionName<abi, 'nonpayable' | 'payable'>,
    args extends ContractFunctionArgs<
      abi,
      'nonpayable' | 'payable',
      functionName
    > = ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>,
    config extends Config = Config,
    chainId extends config['chains'][number]['id'] | undefined = undefined,
    selectData = SimulateContractData<abi, functionName, args, config, chainId>,
  > = SimulateContractOptions<
    abi,
    functionName,
    args,
    config,
    chainId,
    selectData
  > &
    ConfigParameter<config>
}
