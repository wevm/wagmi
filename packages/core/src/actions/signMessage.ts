import type { UserRejectedRequestError } from 'viem'
import { signMessage as viem_signMessage } from 'viem/actions'

import { type Config } from '../config.js'
import { ConnectorNotFoundError } from '../errors/config.js'
import type { Evaluate, Omit } from '../types/utils.js'
import { getConnectorClient } from './getConnectorClient.js'

export type SignMessageParameters = Evaluate<
  Omit<import('viem').SignMessageParameters, 'account'>
>

export type SignMessageReturnType = import('viem').SignMessageReturnType

export type SignMessageError =
  | ConnectorNotFoundError
  | UserRejectedRequestError
  // base
  | Error

/** https://wagmi.sh/core/actions/signMessage */
export async function signMessage(
  config: Config,
  { message }: SignMessageParameters,
): Promise<SignMessageReturnType> {
  const client = await getConnectorClient(config)
  if (!client) throw new ConnectorNotFoundError()
  return viem_signMessage(client, { message })
}
