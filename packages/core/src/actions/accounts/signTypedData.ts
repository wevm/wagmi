import { BytesLike, providers } from 'ethers'

import { getClient } from '../../client'
import {
  ChainMismatchError,
  ConnectorNotFoundError,
  ProviderRpcError,
  UserRejectedRequestError,
} from '../../errors'
import { Chain } from '../../types'
import { normalizeChainId } from '../../utils'

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
  const { connector } = getClient()
  if (!connector) throw new ConnectorNotFoundError()

  try {
    const { chainId } = domain
    let chain: Chain | undefined
    if (chainId) {
      const chainId_ = normalizeChainId(chainId)
      const activeChainId = await connector.getChainId()
      // Try to switch chain to provided `chainId`
      if (chainId !== activeChainId) {
        if (connector.switchChain) chain = await connector.switchChain(chainId_)
        else
          throw new ChainMismatchError({
            activeChain:
              connector.chains.find((x) => x.id === activeChainId)?.name ??
              `Chain ${activeChainId}`,
            targetChain:
              connector.chains.find((x) => x.id === chainId_)?.name ??
              `Chain ${chainId_}`,
          })
      }
    }

    const signer = await connector.getSigner({ chainId: chain?.id })
    // Method name may be changed in the future, see https://docs.ethers.io/v5/api/signer/#Signer-signTypedData
    return await (<providers.JsonRpcSigner>signer)._signTypedData(
      domain,
      types,
      value,
    )
  } catch (error) {
    if ((<ProviderRpcError>error).code === 4001)
      throw new UserRejectedRequestError(error)
    throw error
  }
}
