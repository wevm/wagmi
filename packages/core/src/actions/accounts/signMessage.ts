import { Bytes } from 'ethers'

import { wagmiClient } from '../../client'
import { ConnectorNotFoundError, UserRejectedRequestError } from '../../errors'

export type SignMessageArgs = {
  /** Message to sign with wallet */
  message: Bytes | string
}

type Signature = string
export type SignMessageResult = Signature

export async function signMessage(
  args: SignMessageArgs,
): Promise<SignMessageResult> {
  const { connector } = wagmiClient

  if (!connector) throw new ConnectorNotFoundError()

  try {
    const signer = await connector.getSigner()
    const signature = await signer.signMessage(args.message)
    return signature
  } catch (error_) {
    let error: Error = <Error>error_
    if ((<ProviderRpcError>error_).code === 4001)
      error = new UserRejectedRequestError()
    throw error
  }
}
