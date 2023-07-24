import type { Abi } from 'viem'
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
  functionName extends string = string,
> = viem_ReadContractParameters<abi, functionName> & ChainIdParameter<config>

export type ReadContractReturnType<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends string = string,
> = viem_ReadContractReturnType<abi, functionName>

export type ReadContractError = Error

/** https://wagmi.sh/core/actions/readContract */
export function readContract<
  config extends Config,
  const abi extends Abi | readonly unknown[],
  functionName extends string,
>(
  config: config,
  parameters: ReadContractParameters<config, abi, functionName>,
): Promise<ReadContractReturnType<abi, functionName>> {
  const { chainId } = parameters
  const client = config.getClient({ chainId })
  return viem_readContract(client, parameters)
}
