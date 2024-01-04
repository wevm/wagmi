import { type Abi } from 'viem'
import type { ContractFunctionArgs, ContractFunctionName } from 'viem'
import {
  type ReadContractErrorType as viem_ReadContractErrorType,
  type ReadContractParameters as viem_ReadContractParameters,
  type ReadContractReturnType as viem_ReadContractReturnType,
  readContract as viem_readContract,
} from 'viem/actions'

import { type Config } from '../createConfig.js'
import { type ChainIdParameter } from '../types/properties.js'

export type ReadContractParameters<
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

export type ReadContractErrorType = viem_ReadContractErrorType

/** https://wagmi.sh/core/api/actions/readContract */
export function readContract<
  config extends Config,
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'pure' | 'view'>,
  args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
>(
  config: config,
  parameters: ReadContractParameters<abi, functionName, args, config>,
): Promise<ReadContractReturnType<abi, functionName, args>> {
  const { chainId } = parameters
  const client = config.getClient({ chainId })
  return viem_readContract(client, parameters as any)
}
