import type {
  Abi,
  Account,
  Chain,
  ExtractAbiFunction,
  WriteContractParameters as viem_WriteContractParameters,
  WriteContractReturnType as viem_WriteContractReturnType,
} from 'viem'
import { writeContract as viem_writeContract } from 'viem/actions'

import type { Config } from '../config.js'
import { ConnectorNotFoundError } from '../errors/config.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { Evaluate, Omit } from '../types/utils.js'
import { assertActiveChain } from '../utils/assertActiveChain.js'
import { getConnectorClient } from './getConnectorClient.js'
import {
  type PrepareWriteContractParameters,
  prepareWriteContract,
} from './prepareWriteContract.js'

type WriteContractPreparedParameters<
  config extends Config = Config,
  chainId extends
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends string = string,
  ///
  chains extends readonly Chain[] = chainId extends config['chains'][number]['id']
    ? [Extract<config['chains'][number], { id: chainId }>]
    : config['chains'],
> = {
  [key in keyof chains]: {
    mode: 'prepared'
    request: viem_WriteContractParameters<
      readonly [ExtractAbiFunction<abi extends Abi ? abi : Abi, functionName>],
      functionName,
      chains[key],
      Account
    >
  }
}[number] &
  Evaluate<ChainIdParameter<config, chainId>>

type WriteContractUnpreparedParameters<
  config extends Config = Config,
  chainId extends
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends string = string,
  ///
  chains extends readonly Chain[] = chainId extends config['chains'][number]['id']
    ? [Extract<config['chains'][number], { id: chainId }>]
    : config['chains'],
> = {
  [key in keyof chains]: Omit<
    viem_WriteContractParameters<abi, functionName, chains[key], Account>,
    'account' | 'chain'
  >
}[number] &
  Evaluate<ChainIdParameter<config, chainId>> & {
    mode?: never
  }

export type WriteContractParameters<
  config extends Config = Config,
  chainId extends
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends string = string,
> =
  | WriteContractPreparedParameters<config, chainId, abi, functionName>
  | WriteContractUnpreparedParameters<config, chainId, abi, functionName>

// TODO(major): Just return the hash (not inside object)
export type WriteContractReturnType = {
  hash: viem_WriteContractReturnType
}

export type WriteContractError = Error

/** https://wagmi.sh/core/actions/writeContract */
export async function writeContract<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  const abi extends Abi | readonly unknown[],
  functionName extends string,
>(
  config: config,
  parameters: WriteContractParameters<config, chainId, abi, functionName>,
): Promise<WriteContractReturnType> {
  const { chainId, mode, ...rest } = parameters

  const client = await getConnectorClient(config, { chainId })
  if (!client) throw new ConnectorNotFoundError()

  let request: viem_WriteContractParameters
  if (mode === 'prepared' && 'request' in rest) {
    if (chainId) assertActiveChain(config, { chainId })
    request = rest.request as viem_WriteContractParameters
  } else {
    const res = await prepareWriteContract(
      config,
      rest as PrepareWriteContractParameters,
    )
    request = res.request
  }

  const hash = await viem_writeContract(client, {
    ...request,
    // Setting to `null` to not validate inside `viem_writeContract`
    // since we already validated above
    chain: null,
  } as viem_WriteContractParameters)

  return { hash }
}
