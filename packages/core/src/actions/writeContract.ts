import type {
  Abi,
  Account,
  Chain,
  ContractFunctionArgs,
  ContractFunctionName,
  WriteContractParameters as viem_WriteContractParameters,
  WriteContractReturnType as viem_WriteContractReturnType,
} from 'viem'
import { writeContract as viem_writeContract } from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { SelectChains } from '../types/chain.js'
import type {
  ChainIdParameter,
  ConnectorParameter,
} from '../types/properties.js'
import type { Evaluate, UnionOmit } from '../types/utils.js'
import { assertActiveChain } from '../utils/assertActiveChain.js'
import { getConnectorClient } from './getConnectorClient.js'
import {
  type SimulateContractParameters,
  simulateContract,
} from './simulateContract.js'

export type WriteContractParameters<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends ContractFunctionName<
    abi,
    'nonpayable' | 'payable'
  > = ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  > = ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>,
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  ///
  chains extends readonly Chain[] = SelectChains<config, chainId>,
> = {
  [key in keyof chains]: UnionOmit<
    viem_WriteContractParameters<
      abi,
      functionName,
      args,
      chains[key],
      Account,
      chains[key]
    >,
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

/** https://alpha.wagmi.sh/core/actions/writeContract */
export async function writeContract<
  config extends Config,
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  >,
  chainId extends config['chains'][number]['id'],
>(
  config: config,
  parameters: WriteContractParameters<abi, functionName, args, config, chainId>,
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
      rest as unknown as SimulateContractParameters<
        abi,
        functionName,
        args,
        config,
        chainId
      >,
    )
    request = simulateRequest
  }

  const hash = await viem_writeContract(client, {
    ...(request as any),
    // Setting to `null` to not validate inside `viem_writeContract` since we
    // already validated above with `assertActiveChain` and in `simulateContract`
    chain: null,
  })

  return { hash }
}
