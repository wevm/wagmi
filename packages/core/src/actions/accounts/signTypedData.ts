import {
  Address,
  ResolvedConfig,
  TypedData,
  TypedDataToPrimitiveTypes,
} from 'abitype'
import { TypedDataField, providers } from 'ethers'

import { ChainMismatchError, ConnectorNotFoundError } from '../../errors'
import { normalizeChainId } from '../../utils'
import { fetchSigner } from './fetchSigner'
import { getNetwork } from './getNetwork'

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

  const { chain: activeChain, chains } = getNetwork()
  const { chainId: chainId_ } = domain
  if (chainId_) {
    const chainId = normalizeChainId(chainId_)
    const activeChainId = activeChain?.id

    if (chainId !== activeChain?.id) {
      throw new ChainMismatchError({
        activeChain:
          chains.find((x) => x.id === activeChainId)?.name ??
          `Chain ${activeChainId}`,
        targetChain:
          chains.find((x) => x.id === chainId)?.name ?? `Chain ${chainId}`,
      })
    }
  }

  // Method name may be changed in the future, see https://docs.ethers.io/v5/api/signer/#Signer-signTypedData
  return await signer._signTypedData(
    domain,
    <Record<string, Array<TypedDataField>>>(<unknown>types),
    value,
  )
}
