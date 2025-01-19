import type { Account, Client, TransactionRequest } from 'viem'
import {
  type ChainEIP712,
  type SendTransactionErrorType as viem_SendTransactionErrorType,
  type SendTransactionParameters as viem_SendTransactionParameters,
  type SendTransactionReturnType as viem_SendTransactionReturnType,
  sendTransaction as viem_sendTransaction,
} from 'viem/zksync'
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

export type SendEip712TransactionParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  ///
  chains extends readonly ChainEIP712[] = SelectChains<config, chainId>,
> = {
  [key in keyof chains]: Compute<
    Omit<
      viem_SendTransactionParameters<chains[key], Account, chains[key]>,
      'chain' | 'gas'
    > &
      ChainIdParameter<config, chainId> &
      ConnectorParameter
  >
}[number] & {
  /** Gas provided for transaction execution. */
  gas?: TransactionRequest['gas'] | null
}

export type SendEip712TransactionReturnType = viem_SendTransactionReturnType

export type SendEip712TransactionErrorType =
  // getConnectorClient()
  | GetConnectorClientErrorType
  // base
  | BaseErrorType
  | ErrorType
  // viem
  | viem_SendTransactionErrorType

/** https://wagmi.sh/core/api/actions/sendEip712Transaction */
export async function sendEip712Transaction<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(
  config: config,
  parameters: SendEip712TransactionParameters<config, chainId>,
): Promise<SendEip712TransactionReturnType> {
  const { account, chainId, connector, ...rest } = parameters

  let client: Client
  if (typeof account === 'object' && account?.type === 'local')
    client = config.getClient({ chainId })
  else
    client = await getConnectorClient(config, {
      account: account ?? undefined,
      chainId,
      connector,
    })

  const action = getAction(client, viem_sendTransaction, 'sendTransaction')
  const hash = await action({
    ...(rest as any),
    ...(account ? { account } : {}),
    chain: chainId ? { id: chainId } : undefined,
    gas: rest.gas ?? undefined,
  })

  return hash
}
