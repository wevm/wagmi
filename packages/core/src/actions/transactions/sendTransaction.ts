import { providers } from 'ethers'

import { getClient } from '../../client'
import {
  ChainMismatchError,
  ConnectorNotFoundError,
  ProviderRpcError,
  UserRejectedRequestError,
} from '../../errors'
import { Chain } from '../../types'

export type SendTransactionArgs = {
  /**
   * Chain id to use for write
   * If signer is not active on this chain, it will attempt to programmatically switch
   */
  chainId?: number
  /** Object to use when creating transaction */
  request: providers.TransactionRequest
}

export type SendTransactionResult = providers.TransactionResponse

export async function sendTransaction({
  chainId,
  request,
}: SendTransactionArgs): Promise<SendTransactionResult> {
  const { connector } = getClient()
  if (!connector) throw new ConnectorNotFoundError()

  try {
    let chain: Chain | undefined
    if (chainId) {
      const activeChainId = await connector.getChainId()
      // Try to switch chain to provided `chainId`
      if (chainId !== activeChainId) {
        if (connector.switchChain) chain = await connector.switchChain(chainId)
        else
          throw new ChainMismatchError({
            activeChain:
              connector.chains.find((x) => x.id === activeChainId)?.name ??
              `Chain ${activeChainId}`,
            targetChain:
              connector.chains.find((x) => x.id === chainId)?.name ??
              `Chain ${chainId}`,
          })
      }
    }

    const signer = await connector.getSigner({ chainId: chain?.id })
    return await signer.sendTransaction(request)
  } catch (error) {
    if ((<ProviderRpcError>error).code === 4001)
      throw new UserRejectedRequestError(error)
    throw error
  }
}
