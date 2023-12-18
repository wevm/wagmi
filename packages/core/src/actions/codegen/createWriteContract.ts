import {
  type Abi,
  type Account,
  type Address,
  type Chain,
  type ContractFunctionArgs,
  type ContractFunctionName,
  type WriteContractParameters as viem_WriteContractParameters,
} from 'viem'

import { type Config } from '../../createConfig.js'
import { type SelectChains } from '../../types/chain.js'
import {
  type ChainIdParameter,
  type ConnectorParameter,
} from '../../types/properties.js'
import {
  type Evaluate,
  type UnionEvaluate,
  type UnionOmit,
} from '../../types/utils.js'
import { getAccount } from '../getAccount.js'
import { getChainId } from '../getChainId.js'
import {
  type WriteContractReturnType,
  writeContract,
} from '../writeContract.js'

type stateMutability = 'nonpayable' | 'payable'

export type CreateWriteContractParameters<
  abi extends Abi | readonly unknown[],
  address extends Address | Record<number, Address> | undefined = undefined,
> = {
  abi: abi | Abi | readonly unknown[]
  address?: address | Address | Record<number, Address> | undefined
}

export type CreateWriteContractReturnType<
  abi extends Abi | readonly unknown[],
  address extends Address | Record<number, Address> | undefined,
> = <
  config extends Config,
  functionName extends ContractFunctionName<abi, stateMutability>,
  args extends ContractFunctionArgs<abi, stateMutability, functionName>,
  chainId extends config['chains'][number]['id'],
  ///
  allFunctionNames = ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  chains extends readonly Chain[] = SelectChains<config, chainId>,
  omittedProperties extends 'abi' | 'address' =
    | 'abi'
    | (address extends undefined ? never : 'address'),
>(
  config: config,
  parameters: UnionEvaluate<
    {
      [key in keyof chains]: UnionOmit<
        viem_WriteContractParameters<
          abi,
          functionName,
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
        : Evaluate<ChainIdParameter<config, chainId>>) &
      ConnectorParameter & { __mode?: 'prepared' }
  >,
) => Promise<WriteContractReturnType>

export function createWriteContract<
  const abi extends Abi | readonly unknown[],
  const address extends
    | Address
    | Record<number, Address>
    | undefined = undefined,
>(
  c: CreateWriteContractParameters<abi, address>,
): CreateWriteContractReturnType<abi, address> {
  if (c.address !== undefined && typeof c.address === 'object')
    return (config, parameters) => {
      const configChainId = getChainId(config)
      const account = getAccount(config)

      let chainId
      if (parameters.chainId) chainId = parameters.chainId
      else if (
        (parameters as unknown as { account: Address | Account | undefined })
          .account &&
        (parameters as unknown as { account: Address | Account | undefined })
          .account === account.address
      )
        chainId = account.chainId
      else if (
        (parameters as unknown as { account: Address | Account | undefined })
          .account === undefined
      )
        chainId = account.chainId
      else chainId = configChainId

      const address = chainId ? c.address?.[chainId] : undefined
      return writeContract(config, { ...(parameters as any), ...c, address })
    }

  return (config, parameters) => {
    return writeContract(config, { ...(parameters as any), ...c })
  }
}
