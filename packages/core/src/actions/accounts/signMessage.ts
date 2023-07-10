import type { SignMessageReturnType, Hex, ByteArray } from 'viem'

import { ConnectorNotFoundError } from '../../errors'
import { getWalletClient } from '../viem'

export type SignMessageArgs = {
  /** Message to sign with wallet */
  message: string | { raw: Hex | ByteArray }
}

export type SignMessageResult = SignMessageReturnType

export async function signMessage(
  args: SignMessageArgs,
): Promise<SignMessageResult> {
  const walletClient = await getWalletClient()
  if (!walletClient) throw new ConnectorNotFoundError()
  return await walletClient.signMessage({
    message: args.message,
  })
}
