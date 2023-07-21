import type { Abi, Chain } from 'viem'
import type { ExtractAbiFunction } from 'viem'
import {
  type SimulateContractParameters,
  type SimulateContractReturnType,
  simulateContract,
} from 'viem/actions'

import { type Config } from '../config.js'
import { ConnectorNotFoundError } from '../errors/config.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { Evaluate, PartialBy } from '../types/utils.js'
import { assertActiveChain } from '../utils/assertActiveChain.js'
import { getConnectorClient } from './getConnectorClient.js'

export type PrepareWriteContractParameters<
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
    SimulateContractParameters<abi, functionName, chains[key]>,
    'chain'
  >
}[number] &
  Evaluate<ChainIdParameter<config, chainId>>

export type PrepareWriteContractReturnType<
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
> = Evaluate<
  {
    [key in keyof chains]: Omit<
      SimulateContractReturnType<
        readonly [
          ExtractAbiFunction<abi extends Abi ? abi : Abi, functionName>,
        ],
        functionName,
        chains[key]
      >,
      'chain'
    > &
      PartialBy<
        { chainId: chainId; mode: 'prepared' },
        chainId extends config['chains'][number]['id'] ? never : 'chainId'
      >
  }[number]
>

export type PrepareWriteContractError = Error

/** https://wagmi.sh/core/actions/prepareWriteContract */
export async function prepareWriteContract<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  const abi extends Abi | readonly unknown[],
  functionName extends string,
>(
  config: config,
  parameters: PrepareWriteContractParameters<
    config,
    chainId,
    abi,
    functionName
  >,
): Promise<PrepareWriteContractReturnType<config, chainId, abi, functionName>> {
  const { chainId } = parameters

  const connectorClient = await getConnectorClient(config, { chainId })
  if (!connectorClient) throw new ConnectorNotFoundError()
  if (chainId) assertActiveChain(config, { chainId })

  const client = config.getClient({ chainId })
  const { result, request } = await simulateContract(client, {
    ...parameters,
    account: parameters.account ?? connectorClient.account,
  } as SimulateContractParameters)

  const minimizedAbi = (parameters.abi as Abi).filter(
    (abiItem) => 'name' in abiItem && abiItem.name === parameters.functionName,
  )

  return {
    mode: 'prepared',
    request: {
      ...request,
      abi: minimizedAbi,
      chainId,
    },
    result,
  } as unknown as PrepareWriteContractReturnType<
    config,
    chainId,
    abi,
    functionName
  >
}
