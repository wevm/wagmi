import { getClient } from '../../client'
import { SwitchChainNotSupportedError } from '../../errors'
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
  if (!connector?.switchChain)
    throw new SwitchChainNotSupportedError({ connector })

  return await connector.switchChain(chainId)
}
