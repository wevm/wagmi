import { UserRejectedRequestError as UserRejectedRequestError_ } from 'viem'
import type { SignMessageReturnType } from 'viem'

import { ConnectorNotFoundError, UserRejectedRequestError } from '../../errors'
import { fetchSigner } from './fetchSigner'

export type SignMessageArgs = {
  /** Message to sign with wallet */
  message: string
}

export type SignMessageResult = SignMessageReturnType

export async function signMessage(
  args: SignMessageArgs,
): Promise<SignMessageResult> {
  try {
    const signer = await fetchSigner()
    if (!signer) throw new ConnectorNotFoundError()
    return await signer.signMessage({
      message: args.message,
    })
  } catch (error) {
    // TODO(viem-migration): test this
    if (error instanceof UserRejectedRequestError_)
      throw new UserRejectedRequestError(error)
    throw error
  }
}
