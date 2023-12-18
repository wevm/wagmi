import {
  type Abi,
  type Address,
  type ContractFunctionArgs,
  type ContractFunctionName,
} from 'viem'

import { type Config } from '../../createConfig.js'
import { type UnionEvaluate, type UnionOmit } from '../../types/utils.js'
import { getAccount } from '../getAccount.js'
import { getChainId } from '../getChainId.js'
import {
  type ReadContractParameters,
  type ReadContractReturnType,
  readContract,
} from '../readContract.js'

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
  config extends Config,
  functionName extends ContractFunctionName<abi, stateMutability>,
  args extends ContractFunctionArgs<abi, stateMutability, functionName>,
>(
  config: config,
  parameters: UnionEvaluate<
    UnionOmit<
      ReadContractParameters<abi, functionName, args, config>,
      omittedProperties
    >
  > &
    (address extends Record<number, Address>
      ? { chainId?: keyof address | undefined }
      : unknown),
) => Promise<ReadContractReturnType<abi, functionName, args>>

export function createReadContract<
  const abi extends Abi | readonly unknown[],
  const address extends
    | Address
    | Record<number, Address>
    | undefined = undefined,
>(
  c: CreateReadContractParameters<abi, address>,
): CreateReadContractReturnType<abi, address> {
  if (c.address !== undefined && typeof c.address === 'object')
    return (config, parameters) => {
      const configChainId = getChainId(config)
      const account = getAccount(config)
      const chainId =
        (parameters as { chainId?: number })?.chainId ??
        account.chainId ??
        configChainId
      const address = c.address?.[chainId]
      return readContract(config, { ...(parameters as any), ...c, address })
    }

  return (config, parameters) => {
    return readContract(config, { ...(parameters as any), ...c })
  }
}
