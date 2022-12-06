import type { Chain } from '../../chains'
import { getClient } from '../../client'
import {
  ConnectorNotFoundError,
  SwitchChainNotSupportedError,
} from '../../errors'

export type SwitchNetworkArgs = {
  chainId: number
}

export type SwitchNetworkResult = Chain

export async function switchNetwork({
  chainId,
}: SwitchNetworkArgs): Promise<SwitchNetworkResult> {
  const { connector } = getClient()
  if (!connector) throw new ConnectorNotFoundError()
  if (!connector.switchChain)
    throw new SwitchChainNotSupportedError({
      connector,
    })

  return connector.switchChain(chainId)
}
