import type { SignMessageReturnType } from 'viem'

import { ConnectorNotFoundError } from '../../errors'
import { fetchSigner } from './fetchSigner'

export type SignMessageArgs = {
  /** Message to sign with wallet */
  message: string
}

export type SignMessageResult = SignMessageReturnType

export async function signMessage(
  args: SignMessageArgs,
): Promise<SignMessageResult> {
  const signer = await fetchSigner()
  if (!signer) throw new ConnectorNotFoundError()
  return await signer.signMessage({
    message: args.message,
  })
}
