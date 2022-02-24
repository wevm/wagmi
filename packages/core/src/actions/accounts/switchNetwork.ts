import { wagmiClient } from '../../client'
import { SwitchChainError } from '../../errors'

export type SwitchNetworkArgs = {
  chainId: number
}

export async function switchNetwork({ chainId }: SwitchNetworkArgs) {
  if (!wagmiClient.connector?.switchChain)
    return { data: undefined, error: new SwitchChainError() }

  const chain = await wagmiClient.connector.switchChain(chainId)
  return chain
}
