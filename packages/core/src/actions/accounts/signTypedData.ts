import {
  Address,
  ResolvedConfig,
  TypedData,
  TypedDataToPrimitiveTypes,
} from 'abitype'
import { TypedDataField, providers } from 'ethers'

import { ConnectorNotFoundError } from '../../errors'
import { assertActiveChain, normalizeChainId } from '../../utils'
import { fetchSigner } from './fetchSigner'

export type SignTypedDataArgs<
  TTypedData extends TypedData,
  TSchema extends TypedDataToPrimitiveTypes<TTypedData>,
> = {
  /** Domain or domain signature for origin or contract */
  domain: {
    name?: string
    version?: string
    /**
     * Chain permitted for signing
     * If signer is not active on this chain, it will attempt to programmatically switch
     */
    chainId?: string | number | bigint
    verifyingContract?: Address
    salt?: ResolvedConfig['BytesType']
  }
  /** Named list of all type definitions */
  types: TTypedData
  /** Data to sign */
  value: TSchema[keyof TSchema] extends infer TValue
    ? { [x: string]: any } extends TValue
      ? Record<string, any>
      : TValue
    : never
}

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
