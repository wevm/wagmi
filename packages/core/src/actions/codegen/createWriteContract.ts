import type {
  Abi,
  Account,
  Address,
  Chain,
  ContractFunctionArgs,
  ContractFunctionName,
  WriteContractParameters as viem_WriteContractParameters,
} from 'viem'

import type { Config } from '../../createConfig.js'
import type { SelectChains } from '../../types/chain.js'
import type {
  ChainIdParameter,
  ConnectorParameter,
} from '../../types/properties.js'
import type {
  Compute,
  UnionCompute,
  UnionStrictOmit,
} from '../../types/utils.js'
import { getChainId } from '../getChainId.js'
import {
  type WriteContractReturnType,
  writeContract,
} from '../writeContract.js'

type stateMutability = 'nonpayable' | 'payable'

export type CreateWriteContractParameters<
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

export type CreateWriteContractReturnType<
  abi extends Abi | readonly unknown[],
  address extends Address | Record<number, Address> | undefined,
  functionName extends ContractFunctionName<abi, stateMutability> | undefined,
> = <
  config extends Config,
  name extends functionName extends ContractFunctionName<abi, stateMutability>
    ? functionName
    : ContractFunctionName<abi, stateMutability>,
  args extends ContractFunctionArgs<abi, stateMutability, name>,
  chainId extends config['chains'][number]['id'],
  ///
  allFunctionNames = ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  chains extends readonly Chain[] = SelectChains<config, chainId>,
  omittedProperties extends 'abi' | 'address' | 'functionName' =
    | 'abi'
    | (address extends undefined ? never : 'address')
    | (functionName extends undefined ? never : 'functionName'),
>(
  config: config,
  parameters: UnionCompute<
    {
      [key in keyof chains]: UnionStrictOmit<
        viem_WriteContractParameters<
          abi,
          name,
          args,
          chains[key],
          Account,
          chains[key],
          allFunctionNames
        >,
        omittedProperties | 'chain'
      >
    }[number] &
      (address extends Record<number, Address>
        ? {
            chainId?:
              | keyof address
              | (chainId extends keyof address ? chainId : never)
              | undefined
          }
        : Compute<ChainIdParameter<config, chainId>>) &
      ConnectorParameter & {
        /** @deprecated */
        __mode?: 'prepared'
      }
  >,
) => Promise<WriteContractReturnType>

export function createWriteContract<
  const abi extends Abi | readonly unknown[],
  const address extends
    | Address
    | Record<number, Address>
    | undefined = undefined,
  functionName extends
    | ContractFunctionName<abi, stateMutability>
    | undefined = undefined,
>(
  c: CreateWriteContractParameters<abi, address, functionName>,
): CreateWriteContractReturnType<abi, address, functionName> {
  if (c.address !== undefined && typeof c.address === 'object')
    return (config, parameters) => {
      const chainId = (() => {
        if (parameters.chainId) return parameters.chainId
        return getChainId(config)
      })()
      return writeContract(config, {
        ...(parameters as any),
        ...(c.functionName ? { functionName: c.functionName } : {}),
        address: chainId ? c.address?.[chainId] : undefined,
        abi: c.abi,
      })
    }

  return (config, parameters) => {
    return writeContract(config, {
      ...(parameters as any),
      ...(c.address ? { address: c.address } : {}),
      ...(c.functionName ? { functionName: c.functionName } : {}),
      abi: c.abi,
    })
  }
}
