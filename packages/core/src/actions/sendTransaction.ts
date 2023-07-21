import type {
  Account,
  Address,
  Chain,
  SendTransactionParameters as viem_SendTransactionParameters,
  SendTransactionReturnType as viem_SendTransactionReturnType,
} from 'viem'
import { sendTransaction as viem_sendTransaction } from 'viem/actions'

import type { Config } from '../config.js'
import { ConnectorNotFoundError } from '../errors/config.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { Evaluate } from '../types/utils.js'
import { assertActiveChain } from '../utils/assertActiveChain.js'
import { getConnectorClient } from './getConnectorClient.js'

export type SendTransactionParameters<
  config extends Config = Config,
  chainId extends
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
  ///
  chains extends readonly Chain[] = chainId extends config['chains'][number]['id']
    ? [Extract<config['chains'][number], { id: chainId }>]
    : config['chains'],
> = Evaluate<
  {
    [key in keyof chains]: Omit<
      viem_SendTransactionParameters<chains[key], Account>,
      'account' | 'chain'
    >
  }[number]
> &
  Evaluate<ChainIdParameter<config, chainId>> & {
    mode?: 'prepared'
    to: Address
  }

// TODO(major): Just return the hash (not inside)
export type SendTransactionReturnType = {
  hash: viem_SendTransactionReturnType
}

export type SendTransactionError = Error

export async function sendTransaction<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
>(
  config: config,
  parameters: SendTransactionParameters<config, chainId>,
): Promise<SendTransactionReturnType>

/** https://wagmi.sh/core/actions/sendTransaction */
export async function sendTransaction(
  config: Config,
  parameters: SendTransactionParameters,
): Promise<SendTransactionReturnType> {
  const { chainId, ...rest } = parameters

  const client = await getConnectorClient(config, { chainId })
  if (!client) throw new ConnectorNotFoundError()
  if (chainId) assertActiveChain(config, { chainId })

  const hash = await viem_sendTransaction(client, {
    ...(rest as viem_SendTransactionParameters),
    // Setting to `null` to not validate inside `viem_sendTransaction`
    // since we already validated above
    chain: null,
  })

  return { hash }
}
