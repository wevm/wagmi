import { Bytes } from 'ethers/lib/utils'

import { ConnectorNotFoundError, UserRejectedRequestError } from '../../errors'
import { fetchSigner } from './fetchSigner'

export type SignMessageArgs = {
  /** Message to sign with wallet */
  message: Bytes | string
}

type Signature = string
export type SignMessageResult = Signature

export async function signMessage(
  args: SignMessageArgs,
): Promise<SignMessageResult> {
  try {
    const signer = await fetchSigner()
    if (!signer) throw new ConnectorNotFoundError()
    return await signer.signMessage(args.message)
  } catch (error_) {
    let error: Error = <Error>error_
    if ((<ProviderRpcError>error_).code === 4001)
      error = new UserRejectedRequestError()
    throw error
  }
}
