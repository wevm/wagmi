import { CallOverrides, Contract, providers } from 'ethers'

import { getClient } from '../../client'
import {
  ChainMismatchError,
  ConnectorNotFoundError,
  ProviderRpcError,
  UserRejectedRequestError,
} from '../../errors'
import { Chain } from '../../types'
import { GetContractArgs, getContract } from './getContract'

export type WriteContractConfig = GetContractArgs & {
  /**
   * Chain id to use for write
   * If signer is not active on this chain, it will attempt to programmatically switch
   */
  chainId?: number
  /** Method to call on contract */
  functionName: string
  /** Arguments to pass contract method */
  args?: any | any[]
  overrides?: CallOverrides
}

export type WriteContractResult = providers.TransactionResponse

export async function writeContract<TContract extends Contract = Contract>({
  addressOrName,
  args,
  chainId,
  contractInterface,
  functionName,
  overrides,
  signerOrProvider,
}: WriteContractConfig): Promise<WriteContractResult> {
  const { connector } = getClient()
  if (!connector) throw new ConnectorNotFoundError()

  const params = [
    ...(Array.isArray(args) ? args : args ? [args] : []),
    ...(overrides ? [overrides] : []),
  ]

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
    const contract = getContract<TContract>({
      addressOrName,
      contractInterface,
      signerOrProvider,
    })
    const contractWithSigner = contract.connect(signer)
    const contractFunction = contractWithSigner[functionName]
    if (!contractFunction)
      console.warn(
        `"${functionName}" does not exist in interface for contract "${addressOrName}"`,
      )
    return (await contractFunction(...params)) as providers.TransactionResponse
  } catch (error) {
    if ((<ProviderRpcError>error).code === 4001)
      throw new UserRejectedRequestError(error)
    throw error
  }
}
