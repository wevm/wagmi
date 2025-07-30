import type { Chain, Transport, WebSocketTransport } from 'viem'
import {
  type WatchBlockNumberParameters as viem_WatchBlockNumberParameters,
  type WatchBlockNumberReturnType as viem_WatchBlockNumberReturnType,
  watchBlockNumber as viem_watchBlockNumber,
} from 'viem/actions'
import type { Config } from '../createConfig.js'
import type { SelectChains } from '../types/chain.js'
import type {
  ChainIdParameter,
  SyncConnectedChainParameter,
} from '../types/properties.js'
import type { UnionCompute } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'

export type WatchBlockNumberParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  ///
  chains extends readonly Chain[] = SelectChains<config, chainId>,
> = {
  [key in keyof chains]: UnionCompute<
    viem_WatchBlockNumberParameters<
      config['_internal']['transports'][chains[key]['id']] extends infer transport extends
        Transport
        ? Transport extends transport
          ? WebSocketTransport
          : transport
        : WebSocketTransport
    > &
      ChainIdParameter<config, chainId> &
      SyncConnectedChainParameter
  >
}[number]

export type WatchBlockNumberReturnType = viem_WatchBlockNumberReturnType

// TODO: wrap in viem's `observe` to avoid duplicate invocations.
/** https://wagmi.sh/core/api/actions/watchBlockNumber */
export function watchBlockNumber<
  config extends Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
>(
  config: config,
  parameters: WatchBlockNumberParameters<config, chainId>,
): WatchBlockNumberReturnType {
  const { syncConnectedChain = config._internal.syncConnectedChain, ...rest } =
    parameters as WatchBlockNumberParameters

  let unwatch: WatchBlockNumberReturnType | undefined
  const listener = (chainId: number | undefined) => {
    if (unwatch) unwatch()

    const client = config.getClient({ chainId })
    const action = getAction(client, viem_watchBlockNumber, 'watchBlockNumber')
    unwatch = action(rest as viem_WatchBlockNumberParameters)
    return unwatch
  }

  // set up listener for block number changes
  const unlisten = listener(parameters.chainId)

  // set up subscriber for connected chain changes
  let unsubscribe: (() => void) | undefined
  if (syncConnectedChain && !parameters.chainId)
    unsubscribe = config.subscribe(
      ({ chainId }) => chainId,
      async (chainId) => listener(chainId),
    )

  return () => {
    unlisten?.()
    unsubscribe?.()
  }
}
