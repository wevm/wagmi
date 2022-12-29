import type {
  Narrow,
  TypedData,
  TypedDataDomain,
  TypedDataToPrimitiveTypes,
} from 'abitype'
import type { TypedDataField, providers } from 'ethers'

import type { EthersError, ProviderRpcError } from '../../errors'
import { ConnectorNotFoundError, UserRejectedRequestError } from '../../errors'
import { assertActiveChain, normalizeChainId } from '../../utils'
import { fetchSigner } from './fetchSigner'

export type SignTypedDataArgs<
  TTypedData extends TypedData | { [key: string]: unknown } = TypedData,
  TSchema = TTypedData extends TypedData
    ? TypedDataToPrimitiveTypes<TTypedData>
    : { [key: string]: any },
  TValue = TSchema[keyof TSchema],
> = {
  /** Domain or domain signature for origin or contract */
  domain: TypedDataDomain
  /** Named list of all type definitions */
  types: Narrow<TTypedData>
} & ({ [key: string]: any } extends TValue // Check if we were able to infer the shape of typed data
  ? {
      /**
       * Data to sign
       *
       * Use a [const assertion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) on {@link types} for type inference.
       */
      value: { [key: string]: unknown }
    }
  : {
      /** Data to sign */
      value: TValue
    })

export type SignTypedDataResult = string

export async function signTypedData<TTypedData extends TypedData>({
  domain,
  types,
  value,
}: SignTypedDataArgs<TTypedData>): Promise<SignTypedDataResult> {
  const signer = await fetchSigner<providers.JsonRpcSigner>()
  if (!signer) throw new ConnectorNotFoundError()

  const { chainId: chainId_ } = domain
  const chainId = chainId_ ? normalizeChainId(chainId_) : undefined
  if (chainId) assertActiveChain({ chainId, signer })

  const types_ = Object.entries(types)
    .filter(([key]) => key !== 'EIP712Domain')
    .reduce((types, [key, attributes]: [string, TypedDataField[]]) => {
      types[key] = attributes.filter((attr) => attr.type !== 'EIP712Domain')
      return types
    }, {} as Record<string, TypedDataField[]>)

  try {
    // Method name may be changed in the future, see https://docs.ethers.io/v5/api/signer/#Signer-signTypedData
    return await signer._signTypedData(domain, types_, value)
  } catch (error) {
    if (
      (error as ProviderRpcError).code === 4001 ||
      (error as EthersError).code === 'ACTION_REJECTED'
    )
      throw new UserRejectedRequestError(error)
    throw error
  }
}
