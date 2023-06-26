import type { UserRejectedRequestError } from 'viem'

import { type Config } from '../config.js'
import { ConnectorNotFoundError } from '../errors/config.js'
import type { Evaluate } from '../types/utils.js'
import { getWalletClient } from './getWalletClient.js'

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
  const walletClient = await getWalletClient(config)
  if (!walletClient) throw new ConnectorNotFoundError()
  return walletClient.signMessage({ message })
}
