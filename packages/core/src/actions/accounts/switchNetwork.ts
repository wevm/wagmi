import { getClient } from '../../client'
import {
  ConnectorNotFoundError,
  SwitchChainNotSupportedError,
} from '../../errors'
import { Chain } from '../../types'

export type SwitchNetworkArgs = {
  chainId: number
}

export type SwitchNetworkResult = Chain

export async function switchNetwork({
  chainId,
}: SwitchNetworkArgs): Promise<SwitchNetworkResult> {
  const client = getClient()
  const connector = client.connector
  if (!connector) throw new ConnectorNotFoundError()
  if (!connector?.switchChain) {
    const chains = connector.chains
    const activeChainId = await connector.getChainId()
    const activeChainName =
      chains.find((x) => x.id === activeChainId)?.name ??
      `Chain ${activeChainId}`
    const targetChainName =
      chains.find((x) => x.id === chainId)?.name ?? `Chain ${chainId}`
    throw new SwitchChainNotSupportedError({
      activeChainName,
      connector,
      targetChainName,
    })
  }

  return await connector.switchChain(chainId)
}
