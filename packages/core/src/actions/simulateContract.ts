import type { Abi, Chain, ExtractAbiFunction } from 'viem'
import {
  type SimulateContractParameters as viem_SimulateContractParameters,
  type SimulateContractReturnType as viem_SimulateContractReturnType,
  simulateContract as viem_simulateContract,
} from 'viem/actions'

import { type Config } from '../config.js'
import { ConnectorNotFoundError } from '../errors/config.js'
import type { SelectChains } from '../types/chain.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { Evaluate, PartialBy } from '../types/utils.js'
import { assertActiveChain } from '../utils/assertActiveChain.js'
import { getConnectorClient } from './getConnectorClient.js'

export type SimulateContractParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends string = string,
  ///
  chains extends readonly Chain[] = SelectChains<config['chains'], chainId>,
> = {
  [key in keyof chains]: Evaluate<
    Evaluate<
      Omit<
        viem_SimulateContractParameters<abi, functionName, chains[key]>,
        'chain'
      >
    > &
      ChainIdParameter<config, chainId>
  >
}[number]

export type SimulateContractReturnType<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends string = string,
  ///
  chains extends readonly Chain[] = SelectChains<config['chains'], chainId>,
> = {
  [key in keyof chains]: viem_SimulateContractReturnType<
    readonly [ExtractAbiFunction<abi extends Abi ? abi : Abi, functionName>],
    functionName,
    chains[key]
  > extends infer type extends viem_SimulateContractReturnType
    ? {
        request: Evaluate<
          Omit<type['request'], 'chain'> &
            PartialBy<
              {
                __mode: 'prepared'
                chainId: chainId
              },
              chainId extends config['chains'][number]['id'] ? never : 'chainId'
            >
        >
        result: type['result']
      }
    : never
}[number]

export type SimulateContractError = Error

/** https://wagmi.sh/core/actions/simulateContract */
export async function simulateContract<
  config extends Config,
  const abi extends Abi | readonly unknown[],
  functionName extends string,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
>(
  config: config,
  parameters: SimulateContractParameters<config, chainId, abi, functionName>,
): Promise<SimulateContractReturnType<config, chainId, abi, functionName>> {
  const { chainId } = parameters

  const connectorClient = await getConnectorClient(config, { chainId })
  if (!connectorClient) throw new ConnectorNotFoundError()
  if (chainId) assertActiveChain(config, { chainId })

  const client = config.getClient({ chainId })

  const { result, request } = await viem_simulateContract(client, {
    ...parameters,
    account: parameters.account ?? connectorClient.account,
  } as viem_SimulateContractParameters)

  return {
    result,
    request: {
      ...request,
      __mode: 'prepared',
      chainId,
    },
  } as unknown as SimulateContractReturnType<config, chainId, abi, functionName>
}
