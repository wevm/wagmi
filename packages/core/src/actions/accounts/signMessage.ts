import type { ResolvedConfig } from 'abitype'

import type { EthersError, ProviderRpcError } from '../../errors'
import { ConnectorNotFoundError, UserRejectedRequestError } from '../../errors'
import { fetchSigner } from './fetchSigner'

export type SignMessageArgs = {
  /** Message to sign with wallet */
  message: string | Uint8Array
}

export type SignMessageResult = ResolvedConfig['BytesType']

export async function signMessage(
  args: SignMessageArgs,
): Promise<SignMessageResult> {
  try {
    const signer = await fetchSigner()
    if (!signer) throw new ConnectorNotFoundError()
    return (await signer.signMessage(
      args.message,
    )) as ResolvedConfig['BytesType']
  } catch (error) {
    if (
      (error as ProviderRpcError).code === 4001 ||
      (error as EthersError).code === 'ACTION_REJECTED'
    )
      throw new UserRejectedRequestError(error)
    throw error
  }
}
