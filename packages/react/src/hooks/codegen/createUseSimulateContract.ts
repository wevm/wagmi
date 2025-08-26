import type {
  Config,
  ResolvedRegister,
  SimulateContractErrorType,
  SimulateContractParameters,
} from '@wagmi/core'
import type { ScopeKeyParameter, UnionExactPartial } from '@wagmi/core/internal'
import type {
  SimulateContractData,
  SimulateContractQueryFnData,
  SimulateContractQueryKey,
} from '@wagmi/core/query'
import type {
  Abi,
  Address,
  ContractFunctionArgs,
  ContractFunctionName,
} from 'viem'

import type { ConfigParameter, QueryParameter } from '../../types/properties.js'
import { useChainId } from '../useChainId.js'
import { useConfig } from '../useConfig.js'
import {
  type UseSimulateContractReturnType,
  useSimulateContract,
} from '../useSimulateContract.js'

type stateMutability = 'nonpayable' | 'payable'

export type CreateUseSimulateContractParameters<
  abi extends Abi | readonly unknown[],
  address extends Address | Record<number, Address> | undefined = undefined,
  functionName extends
    | ContractFunctionName<abi, stateMutability>
    | undefined = undefined,
> = {
  abi: abi | Abi | readonly unknown[]
  address?: address | Address | Record<number, Address> | undefined
  functionName?:
    | functionName
    | ContractFunctionName<abi, stateMutability>
    | undefined
}

export type CreateUseSimulateContractReturnType<
  abi extends Abi | readonly unknown[],
  address extends Address | Record<number, Address> | undefined,
  functionName extends ContractFunctionName<abi, stateMutability> | undefined,
> = <
  name extends functionName extends ContractFunctionName<abi, stateMutability>
    ? functionName
    : ContractFunctionName<abi, stateMutability>,
  args extends ContractFunctionArgs<abi, stateMutability, name>,
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] | undefined = undefined,
  selectData = SimulateContractData<abi, name, args, config, chainId>,
>(
  parameters?: {
    abi?: undefined
    address?: address extends undefined ? Address : undefined
    functionName?: functionName extends undefined ? name : undefined
    chainId?: address extends Record<number, Address>
      ?
          | keyof address
          | (chainId extends keyof address ? chainId : never)
          | undefined
      : chainId | number | undefined
  } & UnionExactPartial<
    // TODO: Take `abi` and `address` from above and omit from below (currently breaks inference)
    SimulateContractParameters<abi, name, args, config, chainId>
  > &
    ScopeKeyParameter &
    ConfigParameter<config> &
    QueryParameter<
      SimulateContractQueryFnData<abi, name, args, config, chainId>,
      SimulateContractErrorType,
      selectData,
      SimulateContractQueryKey<abi, name, args, config, chainId>
    >,
) => UseSimulateContractReturnType<abi, name, args, config, chainId, selectData>

export function createUseSimulateContract<
  const abi extends Abi | readonly unknown[],
  const address extends
    | Address
    | Record<number, Address>
    | undefined = undefined,
  functionName extends
    | ContractFunctionName<abi, stateMutability>
    | undefined = undefined,
>(
  props: CreateUseSimulateContractParameters<abi, address, functionName>,
): CreateUseSimulateContractReturnType<abi, address, functionName> {
  if (props.address !== undefined && typeof props.address === 'object')
    return (parameters) => {
      const config = useConfig(parameters)
      const configChainId = useChainId({ config })
      const chainId =
        (parameters as { chainId?: number })?.chainId ?? configChainId
      return useSimulateContract({
        ...(parameters as any),
        ...(props.functionName ? { functionName: props.functionName } : {}),
        address: props.address?.[chainId],
        abi: props.abi,
      })
    }

  return (parameters) => {
    return useSimulateContract({
      ...(parameters as any),
      ...(props.address ? { address: props.address } : {}),
      ...(props.functionName ? { functionName: props.functionName } : {}),
      abi: props.abi,
    })
  }
}
