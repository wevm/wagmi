import { TypedData, TypedDataDomain, TypedDataToPrimitiveTypes } from 'abitype'
import { TypedDataField, providers } from 'ethers'

import { ConnectorNotFoundError } from '../../errors'
import { assertActiveChain, normalizeChainId } from '../../utils'
import { fetchSigner } from './fetchSigner'

type GetValue<TSchema = unknown> = TSchema[keyof TSchema] extends infer TValue
  ? // Check if we were able to infer the shape of typed data
    { [key: string]: any } extends TValue
    ? {
        /**
         * Data to sign
         *
         * Use a [const assertion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) on {@link types} for type inference.
         */
        value: Record<string, any>
      }
    : {
        /** Data to sign */
        value: TValue
      }
  : never

export type SignTypedDataArgs<
  TTypedData extends TypedData,
  TSchema extends TypedDataToPrimitiveTypes<TTypedData>,
> = {
  /** Domain or domain signature for origin or contract */
  domain: TypedDataDomain
  /** Named list of all type definitions */
  types: TTypedData
} & GetValue<TSchema>

export type SignTypedDataResult = string

export async function signTypedData<
  TTypedData extends TypedData,
  TSchema extends TypedDataToPrimitiveTypes<TTypedData>,
>({
  domain,
  types,
  value,
}: SignTypedDataArgs<TTypedData, TSchema>): Promise<SignTypedDataResult> {
  const signer = await fetchSigner<providers.JsonRpcSigner>()
  if (!signer) throw new ConnectorNotFoundError()

  const { chainId: chainId_ } = domain
  const chainId = chainId_ ? normalizeChainId(chainId_) : undefined
  if (chainId) assertActiveChain({ chainId })

  // Method name may be changed in the future, see https://docs.ethers.io/v5/api/signer/#Signer-signTypedData
  return await signer._signTypedData(
    domain,
    <Record<string, Array<TypedDataField>>>(<unknown>types),
    value,
  )
}
