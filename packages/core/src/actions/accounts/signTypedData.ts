import { BytesLike, providers } from 'ethers'

import { ChainMismatchError, ConnectorNotFoundError } from '../../errors'
import { normalizeChainId } from '../../utils'
import { fetchSigner } from './fetchSigner'
import { getNetwork } from './getNetwork'

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
  return await signer._signTypedData(domain, types, value)
}
