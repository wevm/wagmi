import { BytesLike, providers } from 'ethers'

import { ConnectorNotFoundError } from '../../errors'
import { assertActiveChain, normalizeChainId } from '../../utils'
import { fetchSigner } from './fetchSigner'

export type SignTypedDataArgs = {
  /** Domain or domain signature for origin or contract */
  domain: {
    name?: string
    version?: string
    /**
     * Chain permitted for signing
     * If signer is not active on this chain, it will attempt to programmatically switch
     */
    chainId?: string | number | bigint
    verifyingContract?: string
    salt?: BytesLike
  }
  /** Named list of all type definitions */
  types: Record<string, Array<{ name: string; type: string }>>
  /** Data to sign */
  value: Record<string, any>
}

export type SignTypedDataResult = string

export async function signTypedData({
  domain,
  types,
  value,
}: SignTypedDataArgs): Promise<SignTypedDataResult> {
  const signer = await fetchSigner<providers.JsonRpcSigner>()
  if (!signer) throw new ConnectorNotFoundError()

  const { chainId: chainId_ } = domain
  const chainId = chainId_ ? normalizeChainId(chainId_) : undefined
  if (chainId) assertActiveChain({ chainId })

  // Method name may be changed in the future, see https://docs.ethers.io/v5/api/signer/#Signer-signTypedData
  return await signer._signTypedData(domain, types, value)
}
