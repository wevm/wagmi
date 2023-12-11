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

type stateMutability = 'pure' | 'view'

export type CreateReadContractParameters<
  abi extends Abi | readonly unknown[],
  address extends Address | Record<number, Address> | undefined = undefined,
> = {
  abi: abi | Abi | readonly unknown[]
  address?: address | Address | Record<number, Address> | undefined
}

export type CreateReadContractReturnType<
  abi extends Abi | readonly unknown[],
  address extends Address | Record<number, Address> | undefined,
  ///
  omittedProperties extends 'abi' | 'address' | 'chainId' =
    | 'abi'
    | (address extends undefined ? never : 'address')
    | (address extends Record<number, Address> ? 'chainId' : never),
> = <
  functionName extends ContractFunctionName<abi, stateMutability>,
  args extends ContractFunctionArgs<abi, stateMutability, functionName>,
  config extends Config = ResolvedRegister['config'],
  selectData = ReadContractData<abi, functionName, args>,
>(
  parameters?: UnionEvaluate<
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
  > &
    (address extends Record<number, Address>
      ? { chainId?: keyof address | undefined }
      : unknown),
) => UseReadContractReturnType<abi, functionName, args, selectData>

export function createReadContract<
  const abi extends Abi | readonly unknown[],
  const address extends
    | Address
    | Record<number, Address>
    | undefined = undefined,
>(
  config: CreateReadContractParameters<abi, address>,
): CreateReadContractReturnType<abi, address> {
  if (config.address !== undefined && typeof config.address === 'object')
    return (parameters) => {
      const configChainId = useChainId()
      const account = useAccount()
      const chainId =
        (parameters as { chainId?: number })?.chainId ??
        account.chainId ??
        configChainId
      const address = config.address?.[chainId]
      return useReadContract({ ...(parameters as any), ...config, address })
    }

  return (parameters) => {
    return useReadContract({ ...(parameters as any), ...config })
  }
}
