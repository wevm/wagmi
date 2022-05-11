import type { providers } from 'ethers'

import {
  ConnectorNotFoundError,
  ProviderRpcError,
  UserRejectedRequestError,
} from '../../errors'
import { fetchSigner } from './fetchSigner'

type SignTypedData = Parameters<providers.JsonRpcSigner['_signTypedData']>

export type SignTypedDataArgs = {
  /** Domain or domain signature for origin or contract */
  domain: SignTypedData[0]
  /** Named list of all type definitions */
  types: SignTypedData[1]
  /** Data to sign */
  value: SignTypedData[2]
}

export type SignTypedDataResult = string

export async function signTypedData(
  args: SignTypedDataArgs,
): Promise<SignTypedDataResult> {
  try {
    const signer = await fetchSigner()
    if (!signer) throw new ConnectorNotFoundError()
    // Method name may be changed in the future, see https://docs.ethers.io/v5/api/signer/#Signer-signTypedData
    return await (<providers.JsonRpcSigner>signer)._signTypedData(
      args.domain,
      args.types,
      args.value,
    )
  } catch (error) {
    if ((<ProviderRpcError>error).code === 4001)
      throw new UserRejectedRequestError(error)
    throw error
  }
}
