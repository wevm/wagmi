import type {
  Abi,
  Account,
  Chain,
  WriteContractParameters as viem_WriteContractParameters,
  WriteContractReturnType as viem_WriteContractReturnType,
} from 'viem'
import { writeContract as viem_writeContract } from 'viem/actions'

import type { Config } from '../config.js'
import type {
  ChainIdParameter,
  ConnectorParameter,
} from '../types/properties.js'
import type { Evaluate, Omit } from '../types/utils.js'
import { assertActiveChain } from '../utils/assertActiveChain.js'
import { getConnectorClient } from './getConnectorClient.js'
import {
  type SimulateContractParameters,
  simulateContract,
} from './simulateContract.js'

export type WriteContractParameters<
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
  Evaluate<ChainIdParameter<config, chainId>> &
  ConnectorParameter & {
    __mode?: 'prepared'
  }

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
  const { chainId, connector, __mode, ...rest } = parameters

  const client = await getConnectorClient(config, { chainId, connector })

  let request
  if (__mode === 'prepared') {
    if (chainId)
      assertActiveChain(config, { activeChainId: client.chain.id, chainId })
    request = rest
  } else {
    const { request: simulateRequest } = await simulateContract(
      config,
      rest as SimulateContractParameters<config, chainId, abi, functionName>,
    )
    request = simulateRequest
  }

  const hash = await viem_writeContract(client, {
    ...request,
    // Setting to `null` to not validate inside `viem_writeContract` since we
    // already validated above with `assertActiveChain` and in `simulateContract`
    chain: null,
  } as viem_WriteContractParameters)

  return { hash }
}
