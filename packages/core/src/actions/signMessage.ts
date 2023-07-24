import {
  type SignMessageParameters as viem_SignMessageParameters,
  type SignMessageReturnType as viem_SignMessageReturnType,
  signMessage as viem_signMessage,
} from 'viem/actions'

import { type Config } from '../config.js'
import { ConnectorNotFoundError } from '../errors/config.js'
import type { Evaluate, Omit } from '../types/utils.js'
import { getConnectorClient } from './getConnectorClient.js'

export type SignMessageParameters = Evaluate<
  Omit<viem_SignMessageParameters, 'account'>
>

export type SignMessageReturnType = viem_SignMessageReturnType

export type SignMessageError = Error

/** https://wagmi.sh/core/actions/signMessage */
export async function signMessage(
  config: Config,
  parameters: SignMessageParameters,
): Promise<SignMessageReturnType> {
  const client = await getConnectorClient(config)
  if (!client) throw new ConnectorNotFoundError()
  return viem_signMessage(client, parameters)
}
