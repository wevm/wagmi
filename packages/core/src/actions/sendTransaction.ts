import type {
  Account,
  Address,
  Chain,
  SendTransactionParameters as viem_SendTransactionParameters,
  SendTransactionReturnType as viem_SendTransactionReturnType,
} from 'viem'
import { sendTransaction as viem_sendTransaction } from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { SelectChains } from '../types/chain.js'
import type {
  ChainIdParameter,
  ConnectorParameter,
} from '../types/properties.js'
import type { Evaluate } from '../types/utils.js'
import { assertActiveChain } from '../utils/assertActiveChain.js'
import { getConnectorClient } from './getConnectorClient.js'

export type SendTransactionParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  ///
  chains extends readonly Chain[] = SelectChains<config, chainId>,
> = {
  [key in keyof chains]: Evaluate<
    Omit<
      viem_SendTransactionParameters<chains[key], Account, chains[key]>,
      'account' | 'chain'
    > &
      ChainIdParameter<config, chainId> &
      ConnectorParameter & {
        mode?: 'prepared'
        to: Address
      }
  >
}[number]

// TODO(major): Just return the hash (not inside object)
export type SendTransactionReturnType = {
  hash: viem_SendTransactionReturnType
}

export type SendTransactionError = Error

/** https://alpha.wagmi.sh/core/actions/sendTransaction */
export async function sendTransaction<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(
  config: config,
  parameters: SendTransactionParameters<config, chainId>,
): Promise<SendTransactionReturnType> {
  const { chainId, connector, ...rest } = parameters

  const client = await getConnectorClient(config, { chainId, connector })
  if (chainId)
    assertActiveChain(config, { activeChainId: client.chain.id, chainId })

  const hash = await viem_sendTransaction(client, {
    ...(rest as unknown as viem_SendTransactionParameters),
    // Setting to `null` to not validate inside `viem_sendTransaction`
    // since we already validated above
    chain: null,
  } as viem_SendTransactionParameters)

  return { hash }
}
