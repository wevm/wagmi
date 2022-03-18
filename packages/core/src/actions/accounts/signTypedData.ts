import { JsonRpcSigner } from '@ethersproject/providers'
import { TypedDataDomain, TypedDataField } from '@ethersproject/abstract-signer'

import { ConnectorNotFoundError, UserRejectedRequestError } from '../../errors'
import { fetchSigner } from './fetchSigner'

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
    return await (<JsonRpcSigner>signer)._signTypedData(
      args.domain,
      args.types,
      args.value,
    )
  } catch (error_) {
    let error: Error = <Error>error_
    if ((<ProviderRpcError>error_).code === 4001)
      error = new UserRejectedRequestError()
    throw error
  }
}
