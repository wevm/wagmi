import type { Account, Address, Chain, SendTransactionParameters } from 'viem'
import { estimateGas } from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { SelectChains } from '../types/chain.js'
import type {
  ChainIdParameter,
  ConnectorParameter,
} from '../types/properties.js'
import type { Evaluate, Omit, PartialBy } from '../types/utils.js'
import { assertActiveChain } from '../utils/assertActiveChain.js'
import { getConnectorClient } from './getConnectorClient.js'

export type PrepareSendTransactionParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  ///
  chains extends readonly Chain[] = SelectChains<config, chainId>,
> = Evaluate<
  {
    [key in keyof chains]: Omit<
      SendTransactionParameters<chains[key], Account, chains[key]>,
      'chain'
    >
  }[number]
> &
  Evaluate<ChainIdParameter<config, chainId>> &
  ConnectorParameter & {
    to: Address
  }

export type PrepareSendTransactionReturnType<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  ///
  chains extends readonly Chain[] = SelectChains<config, chainId>,
> = Evaluate<
  {
    [key in keyof chains]: Omit<
      SendTransactionParameters<chains[key], Account, chains[key]>,
      'account' | 'chain'
    > &
      PartialBy<
        { chainId: chainId; mode: 'prepared'; to: Address },
        chainId extends config['chains'][number]['id'] ? never : 'chainId'
      >
  }[number]
>

export type PrepareSendTransactionError = Error

/** https://alpha.wagmi.sh/core/actions/prepareSendTransaction */
export async function prepareSendTransaction<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(
  config: config,
  parameters: PrepareSendTransactionParameters<config, chainId>,
): Promise<PrepareSendTransactionReturnType<config, chainId>>

export async function prepareSendTransaction(
  config: Config,
  parameters: PrepareSendTransactionParameters,
): Promise<PrepareSendTransactionReturnType> {
  const { chainId, connector, ...rest } = parameters

  let account: Address | Account
  let activeChainId: number | undefined
  if (parameters.account) account = parameters.account
  else {
    const connectorClient = await getConnectorClient(config, {
      chainId,
      connector,
    })
    account = connectorClient.account
    activeChainId = connectorClient.chain.id
  }
  if (chainId) assertActiveChain(config, { activeChainId, chainId })

  const client = config.getClient({ chainId })
  let gas: bigint | undefined = parameters.gas ?? undefined
  if (typeof parameters.gas === 'undefined')
    gas = await estimateGas(client, {
      ...(rest as any),
      account,
    })

  return {
    ...parameters,
    gas,
    mode: 'prepared',
    chainId,
  } as PrepareSendTransactionReturnType
}
