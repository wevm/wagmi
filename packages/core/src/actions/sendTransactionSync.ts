import type {
  Account,
  Chain,
  Client,
  TransactionRequest,
  SendTransactionSyncErrorType as viem_SendTransactionSyncErrorType,
  SendTransactionSyncParameters as viem_SendTransactionSyncParameters,
  SendTransactionSyncReturnType as viem_SendTransactionSyncReturnType,
} from 'viem'
import { sendTransactionSync as viem_sendTransactionSync } from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { BaseErrorType, ErrorType } from '../errors/base.js'
import type { SelectChains } from '../types/chain.js'
import type {
  ChainIdParameter,
  ConnectorParameter,
} from '../types/properties.js'
import type { Compute } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'
import {
  type GetConnectorClientErrorType,
  getConnectorClient,
} from './getConnectorClient.js'

export type SendTransactionSyncParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  ///
  chains extends readonly Chain[] = SelectChains<config, chainId>,
> = {
  [key in keyof chains]: Compute<
    Omit<
      viem_SendTransactionSyncParameters<chains[key], Account, chains[key]>,
      'chain' | 'gas'
    > &
      ChainIdParameter<config, chainId> &
      ConnectorParameter
  >
}[number] & {
  /** Gas provided for transaction execution. */
  gas?: TransactionRequest['gas'] | null
}

export type SendTransactionSyncReturnType = viem_SendTransactionSyncReturnType

export type SendTransactionSyncErrorType =
  // getConnectorClient()
  | GetConnectorClientErrorType
  // base
  | BaseErrorType
  | ErrorType
  // viem
  | viem_SendTransactionSyncErrorType

/** https://wagmi.sh/core/api/actions/sendTransactionSync */
export async function sendTransactionSync<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(
  config: config,
  parameters: SendTransactionSyncParameters<config, chainId>,
): Promise<SendTransactionSyncReturnType> {
  const { account, chainId, connector, ...rest } = parameters

  let client: Client
  if (typeof account === 'object' && account?.type === 'local')
    client = config.getClient({ chainId })
  else
    client = await getConnectorClient(config, {
      account: account ?? undefined,
      assertChainId: false,
      chainId,
      connector,
    })

  const action = getAction(
    client,
    viem_sendTransactionSync,
    'sendTransactionSync',
  )
  const hash = await action({
    ...(rest as any),
    ...(account ? { account } : {}),
    chain: chainId ? { id: chainId } : null,
    gas: rest.gas ?? undefined,
  })

  return hash
}
