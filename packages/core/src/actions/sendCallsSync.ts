import type { Account, Chain } from 'viem'
import {
  type SendCallsSyncErrorType as viem_SendCallsSyncErrorType,
  type SendCallsSyncParameters as viem_SendCallsSyncParameters,
  type SendCallsSyncReturnType as viem_SendCallsSyncReturnType,
  sendCallsSync as viem_sendCallsSync,
} from 'viem/actions'

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

export type SendCallsSyncParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  calls extends readonly unknown[] = readonly unknown[],
  ///
  chains extends readonly Chain[] = SelectChains<config, chainId>,
> = {
  [key in keyof chains]: Compute<
    Omit<
      viem_SendCallsSyncParameters<chains[key], Account, chains[key], calls>,
      'chain'
    > &
      ChainIdParameter<config, chainId> &
      ConnectorParameter
  >
}[number]

export type SendCallsSyncReturnType = viem_SendCallsSyncReturnType

export type SendCallsSyncErrorType =
  // getConnectorClient()
  | GetConnectorClientErrorType
  // base
  | BaseErrorType
  | ErrorType
  // viem
  | viem_SendCallsSyncErrorType

/** https://wagmi.sh/core/api/actions/sendCallsSync */
export async function sendCallsSync<
  const calls extends readonly unknown[],
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(
  config: config,
  parameters: SendCallsSyncParameters<config, chainId, calls>,
): Promise<SendCallsSyncReturnType> {
  const { account, chainId, connector, calls, ...rest } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  const action = getAction(client, viem_sendCallsSync, 'sendCallsSync')
  return action({
    ...(rest as any),
    ...(typeof account !== 'undefined' ? { account } : {}),
    calls,
    chain: chainId ? { id: chainId } : undefined,
  })
}
