import type { Account, Chain, SendTransactionParameters } from 'viem'
import { estimateGas } from 'viem/actions'

import type { Config } from '../config.js'
import { ConnectorNotFoundError } from '../errors/config.js'
import type { ChainId } from '../types/properties.js'
import type { Evaluate, Omit } from '../types/utils.js'
import { assertActiveChain } from '../utils/assertActiveChain.js'
import { getConnectorClient } from './getConnectorClient.js'

export type PrepareSendTransactionParameters<
  config extends Config = Config,
  chainId extends
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
> = Evaluate<
  Omit<
    SendTransactionParameters<
      Extract<
        config['chains'][number],
        { id: chainId }
      > extends infer chain extends Chain
        ? chain
        : config['chains'][number],
      Account
    >,
    'account' | 'chain'
  > &
    ChainId<config, chainId>
>

export type PrepareSendTransactionReturnType<
  config extends Config = Config,
  chainId extends
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
> = Evaluate<
  Omit<
    SendTransactionParameters<
      Extract<
        config['chains'][number],
        { id: chainId }
      > extends infer chain extends Chain
        ? chain
        : config['chains'][number],
      Account
    >,
    'account' | 'chain'
  > &
    ChainId<config, chainId> & {
      mode: 'prepared'
    }
>

export type PrepareSendTransactionError = Error

/** https://wagmi.sh/core/actions/prepareSendTransaction */
export async function prepareSendTransaction<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
>(
  config: Config,
  parameters: PrepareSendTransactionParameters<config, chainId>,
): Promise<PrepareSendTransactionReturnType<config, chainId>> {
  const { chainId, ...rest } = parameters

  const connectorClient = await getConnectorClient(config)
  if (!connectorClient) throw new ConnectorNotFoundError()
  if (chainId) assertActiveChain(config, { chainId })

  const client = config.getClient({ chainId })
  let gas: bigint | undefined = parameters.gas ?? undefined
  if (typeof parameters.gas === 'undefined')
    gas = await estimateGas(client, {
      ...(rest as any),
      account: connectorClient.account,
    })

  return {
    ...parameters,
    gas,
    mode: 'prepared',
    chainId,
  } as PrepareSendTransactionReturnType<config, chainId>
}
