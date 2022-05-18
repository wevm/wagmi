import { BigNumberish, BytesLike, providers } from 'ethers'

import {
  ConnectorNotFoundError,
  ProviderRpcError,
  UserRejectedRequestError,
} from '../../errors'
import { fetchSigner } from './fetchSigner'

export interface TypedDataDomain {
  name?: string
  version?: string
  chainId?: BigNumberish
  verifyingContract?: string
  salt?: BytesLike
}

export interface TypedDataField {
  name: string
  type: string
}

export type SignTypedDataArgs = {
  /** Domain or domain signature for origin or contract */
  domain: TypedDataDomain
  /** Named list of all type definitions */
  types: Record<string, Array<TypedDataField>>
  /** Data to sign */
  value: Record<string, any>
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
