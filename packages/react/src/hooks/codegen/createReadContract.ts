import {
  type Config,
  type ReadContractErrorType,
  type ReadContractParameters,
  type ResolvedRegister,
} from '@wagmi/core'
import {
  type UnionEvaluate,
  type UnionOmit,
  type UnionPartial,
} from '@wagmi/core/internal'
import {
  type ReadContractData,
  type ReadContractQueryFnData,
  type ReadContractQueryKey,
} from '@wagmi/core/query'
import {
  type Abi,
  type Address,
  type ContractFunctionArgs,
  type ContractFunctionName,
} from 'viem'

import type { ConfigParameter, QueryParameter } from '../../types/properties.js'
import { useAccount } from '../useAccount.js'
import { useChainId } from '../useChainId.js'
import {
  type UseReadContractReturnType,
  useReadContract,
} from '../useReadContract.js'

export type CreateReadContract<
  abi extends Abi | readonly unknown[],
  address extends Address | Record<number, Address> | undefined = undefined,
> = {
  abi: abi
  address?: address
}

export function createReadContract<
  const abi extends Abi | readonly unknown[],
  const address extends
    | Address
    | Record<number, Address>
    | undefined = undefined,
>(config: CreateReadContract<abi, address>) {
  type stateMutability = 'pure' | 'view'
  type omittedProperties =
    | 'abi'
    | (typeof config.address extends undefined ? never : 'address')

  type UseReadContractParameters<
    abi extends Abi | readonly unknown[] = Abi,
    functionName extends ContractFunctionName<
      abi,
      stateMutability
    > = ContractFunctionName<abi, stateMutability>,
    args extends ContractFunctionArgs<
      abi,
      stateMutability,
      functionName
    > = ContractFunctionArgs<abi, stateMutability, functionName>,
    config extends Config = Config,
    selectData = ReadContractData<abi, functionName, args>,
  > = UnionEvaluate<
    UnionPartial<
      UnionOmit<
        ReadContractParameters<abi, functionName, args, config>,
        omittedProperties
      >
    > &
      ConfigParameter<config> &
      QueryParameter<
        ReadContractQueryFnData<abi, functionName, args>,
        ReadContractErrorType,
        selectData,
        ReadContractQueryKey<abi, functionName, args, config>
      >
  >

  if (config.address !== undefined && typeof config.address === 'object')
    return <
      const abi extends typeof config.abi,
      functionName extends ContractFunctionName<abi, stateMutability>,
      const args extends ContractFunctionArgs<
        abi,
        stateMutability,
        functionName
      >,
      config extends Config = ResolvedRegister['config'],
      selectData = ReadContractData<abi, functionName, args>,
    >(
      parameters?: UseReadContractParameters<
        abi,
        functionName,
        args,
        config
      > & { chainId?: keyof typeof config.address | undefined },
    ): UseReadContractReturnType<abi, functionName, args, selectData> => {
      const configChainId = useChainId()
      const account = useAccount()
      const chainId = parameters?.chainId ?? account.chainId ?? configChainId
      const address = config.address![chainId]
      return useReadContract({ ...(parameters as any), ...config, address })
    }

  return <
    const abi extends typeof config.abi,
    functionName extends ContractFunctionName<abi, stateMutability>,
    const args extends ContractFunctionArgs<abi, stateMutability, functionName>,
    config extends Config = ResolvedRegister['config'],
    selectData = ReadContractData<abi, functionName, args>,
  >(
    parameters?: UseReadContractParameters<abi, functionName, args, config>,
  ): UseReadContractReturnType<abi, functionName, args, selectData> => {
    return useReadContract({ ...(parameters as any), ...config })
  }
}
