import {
  type SendRawTransactionErrorType as viem_SendRawTransactionErrorType,
  type SendRawTransactionParameters as viem_SendRawTransactionParameters,
  type SendRawTransactionReturnType as viem_SendRawTransactionReturnType,
  sendRawTransaction as viem_sendRawTransaction,
} from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { BaseErrorType, ErrorType } from '../errors/base.js'
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

export type SendRawTransactionParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
> = Compute<
  viem_SendRawTransactionParameters &
    ChainIdParameter<config, chainId> &
    ConnectorParameter
>

export type SendRawTransactionReturnType = viem_SendRawTransactionReturnType

export type SendRawTransactionErrorType =
  // getConnectorClient()
  | GetConnectorClientErrorType
  // base
  | BaseErrorType
  | ErrorType
  // viem
  | viem_SendRawTransactionErrorType

/** https://wagmi.sh/core/api/actions/sendRawTransaction */
export async function sendRawTransaction<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(
  config: config,
  parameters: SendRawTransactionParameters<config, chainId>,
): Promise<SendRawTransactionReturnType> {
  const { chainId, connector, ...rest } = parameters

  const client = await getConnectorClient(config, { chainId, connector })

  const action = getAction(
    client,
    viem_sendRawTransaction,
    'sendRawTransaction',
  )

  return action(rest)
}
