import type {
  Narrow,
  TypedData,
  TypedDataDomain,
  TypedDataToPrimitiveTypes,
} from 'abitype'
import type { TypedDataField, providers } from 'ethers'

import { ConnectorNotFoundError } from '../../errors'
import { assertActiveChain, normalizeChainId } from '../../utils'
import { fetchSigner } from './fetchSigner'

export type SignTypedDataArgs<TTypedData = unknown> = {
  /** Domain or domain signature for origin or contract */
  domain: TypedDataDomain
  /** Named list of all type definitions */
  types: Narrow<TTypedData>
} & (TTypedData extends TypedData
  ? TypedDataToPrimitiveTypes<TTypedData> extends infer TSchema
    ? TSchema[keyof TSchema] extends infer TValue
      ? // Check if we were able to infer the shape of typed data
        { [key: string]: any } extends TValue
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
          }
      : never
    : never
  : never)

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

  // Method name may be changed in the future, see https://docs.ethers.io/v5/api/signer/#Signer-signTypedData
  return signer._signTypedData(
    domain,
    types as unknown as Record<string, TypedDataField[]>,
    value,
  )
}
