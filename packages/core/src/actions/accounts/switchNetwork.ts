import { wagmiClient } from '../../client'
import { SwitchChainNotSupportedError } from '../../errors'
import { Chain } from '../../types'

export type SwitchNetworkArgs = {
  chainId: number
}

export type SwitchNetworkResult = Chain

export async function switchNetwork(
  args: SwitchNetworkArgs,
): Promise<SwitchNetworkResult> {
  if (!wagmiClient.connector?.switchChain)
    throw new SwitchChainNotSupportedError()

  const chain = await wagmiClient.connector.switchChain(args.chainId)
  return chain
}
