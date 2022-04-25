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
  if (!client.connector?.switchChain) throw new SwitchChainNotSupportedError()

  const chain = await client.connector.switchChain(chainId)
  return chain
}
