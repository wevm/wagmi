import type { Account, Chain } from 'viem'
import {
  type SendCallsErrorType as viem_SendCallsErrorType,
  type SendCallsParameters as viem_SendCallsParameters,
  type SendCallsReturnType as viem_SendCallsReturnType,
  sendCalls as viem_sendCalls,
} from 'viem/experimental'

import {
  type GetConnectorClientErrorType,
  getConnectorClient,
} from '../../actions/getConnectorClient.js'
import type { Config } from '../../createConfig.js'
import type { BaseErrorType, ErrorType } from '../../errors/base.js'
import type { SelectChains } from '../../types/chain.js'
import type {
  ChainIdParameter,
  ConnectorParameter,
} from '../../types/properties.js'
import type { Compute } from '../../types/utils.js'

export type SendCallsParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  ///
  chains extends readonly Chain[] = SelectChains<config, chainId>,
> = {
  [key in keyof chains]: Compute<
    Omit<viem_SendCallsParameters<chains[key], Account, chains[key]>, 'chain'> &
      ChainIdParameter<config, chainId> &
      ConnectorParameter
  >
}[number]

export type SendCallsReturnType = viem_SendCallsReturnType

export type SendCallsErrorType =
  // getConnectorClient()
  | GetConnectorClientErrorType
  // base
  | BaseErrorType
  | ErrorType
  // viem
  | viem_SendCallsErrorType

/** https://wagmi.sh/core/api/actions/sendCalls */
export async function sendCalls<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(
  config: config,
  parameters: SendCallsParameters<config, chainId>,
): Promise<SendCallsReturnType> {
  const { account, chainId, connector, calls, ...rest } = parameters

  const client = await getConnectorClient(config, {
    account,
    chainId,
    connector,
  })

  return viem_sendCalls(client, {
    ...(rest as any),
    ...(typeof account !== 'undefined' ? { account } : {}),
    calls,
    chain: chainId ? { id: chainId } : undefined,
  })
}
