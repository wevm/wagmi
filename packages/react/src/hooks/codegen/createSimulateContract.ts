import {
  type Config,
  type ResolvedRegister,
  type SimulateContractErrorType,
  type SimulateContractParameters,
} from '@wagmi/core'
import {
  type ScopeKeyParameter,
  type UnionOmit,
  type UnionPartial,
} from '@wagmi/core/internal'
import {
  type SimulateContractData,
  type SimulateContractQueryFnData,
  type SimulateContractQueryKey,
} from '@wagmi/core/query'
import {
  type Abi,
  type Address,
  type ContractFunctionArgs,
  type ContractFunctionName,
} from 'viem'
import type { ConfigParameter, QueryParameter } from '../../types/properties.js'
import type { UseSimulateContractReturnType } from '../useSimulateContract.js'

type stateMutability = 'nonpayable' | 'payable'

export type CreateSimulateContractParameters<
  abi extends Abi | readonly unknown[],
  address extends Address | Record<number, Address> | undefined = undefined,
> = {
  abi: abi | Abi | readonly unknown[]
  address?: address | Address | Record<number, Address> | undefined
}

export type CreateSimulateContractReturnType<
  abi extends Abi | readonly unknown[],
  address extends Address | Record<number, Address> | undefined,
> = <
  functionName extends ContractFunctionName<abi, stateMutability>,
  args extends ContractFunctionArgs<abi, stateMutability, functionName>,
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] | undefined = undefined,
  selectData = SimulateContractData<abi, functionName, args, config, chainId>,
  ///
  omittedProperties extends 'abi' | 'address' | 'chainId' =
    | 'abi'
    | (address extends undefined ? never : 'address')
    | (address extends Record<number, Address> ? 'chainId' : never),
>(
  parameters?: {
    functionName: functionName
    chainId?: address extends Record<number, Address>
      ?
          | keyof address
          | (chainId extends keyof address ? chainId : never)
          | undefined
      : chainId | number | undefined
  } & UnionPartial<
    // TODO: Omit breaks overloads
    UnionOmit<
      SimulateContractParameters<abi, functionName, args, config, chainId>,
      omittedProperties
    >
  > &
    ScopeKeyParameter &
    ConfigParameter<config> &
    QueryParameter<
      SimulateContractQueryFnData<abi, functionName, args, config, chainId>,
      SimulateContractErrorType,
      selectData,
      SimulateContractQueryKey<abi, functionName, args, config, chainId>
    >,
) => UseSimulateContractReturnType<
  abi,
  functionName,
  args,
  config,
  chainId,
  selectData
>

export declare function createSimulateContract<
  const abi extends Abi | readonly unknown[],
  const address extends
    | Address
    | Record<number, Address>
    | undefined = undefined,
>(
  config: CreateSimulateContractParameters<abi, address>,
): CreateSimulateContractReturnType<abi, address>

// {
//   if (config.address !== undefined && typeof config.address === 'object')
//     return (parameters) => {}
//   return (parameters) => {}
// }
