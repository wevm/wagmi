import { type Abi } from 'viem'
import type { ContractFunctionArgs, ContractFunctionName } from 'viem'
import {
  type ReadContractParameters as viem_ReadContractParameters,
  type ReadContractReturnType as viem_ReadContractReturnType,
  readContract as viem_readContract,
} from 'viem/actions'

import { type Config } from '../config.js'
import type { ChainIdParameter } from '../types/properties.js'

export type ReadContractParameters<
  config extends Config = Config,
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
> = viem_ReadContractParameters<abi, functionName, args> &
  ChainIdParameter<config>

export type ReadContractReturnType<
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
> = viem_ReadContractReturnType<abi, functionName, args>

export type ReadContractError = Error

/** https://wagmi.sh/core/actions/readContract */
export function readContract<
  config extends Config,
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'pure' | 'view'>,
  args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
>(
  config: config,
  parameters: ReadContractParameters<config, abi, functionName, args>,
): Promise<ReadContractReturnType<abi, functionName, args>> {
  const { chainId } = parameters
  const client = config.getClient({ chainId })
  return viem_readContract(client, parameters as any)
}
