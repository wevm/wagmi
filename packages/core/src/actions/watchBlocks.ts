import {
  type WatchBlocksParameters as viem_WatchBlocksParameters,
  type WatchBlocksReturnType as viem_WatchBlocksReturnType,
  watchBlocks as viem_watchBlocks,
} from 'viem/actions'

import type { BlockTag, Chain, Transport, WebSocketTransport } from 'viem'
import type { Config } from '../createConfig.js'
import type { SelectChains } from '../types/chain.js'
import type {
  ChainIdParameter,
  SyncConnectedChainParameter,
} from '../types/properties.js'
import type { IsNarrowable, UnionCompute } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'

export type WatchBlocksParameters<
  includeTransactions extends boolean = false,
  blockTag extends BlockTag = 'latest',
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  ///
  chains extends readonly Chain[] = SelectChains<config, chainId>,
> = {
  [key in keyof chains]: UnionCompute<
    viem_WatchBlocksParameters<
      config['_internal']['transports'][chains[key]['id']] extends infer transport extends
        Transport
        ? Transport extends transport
          ? WebSocketTransport
          : transport
        : WebSocketTransport,
      IsNarrowable<chains[key], Chain> extends true ? chains[key] : undefined,
      includeTransactions,
      blockTag
    > &
      ChainIdParameter<config, chainId> &
      SyncConnectedChainParameter
  >
}[number]

export type WatchBlocksReturnType = viem_WatchBlocksReturnType

// TODO: wrap in viem's `observe` to avoid duplicate invocations.
/** https://wagmi.sh/core/actions/watchBlocks */
export function watchBlocks<
  config extends Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  includeTransactions extends boolean = false,
  blockTag extends BlockTag = 'latest',
>(
  config: config,
  parameters: WatchBlocksParameters<
    includeTransactions,
    blockTag,
    config,
    chainId
  >,
): WatchBlocksReturnType {
  const { syncConnectedChain = config._internal.syncConnectedChain, ...rest } =
    parameters as WatchBlocksParameters

  let unwatch: WatchBlocksReturnType | undefined
  const listener = (chainId: number | undefined) => {
    if (unwatch) unwatch()

    const client = config.getClient({ chainId })
    const action = getAction(client, viem_watchBlocks, 'watchBlocks')
    unwatch = action(rest as viem_WatchBlocksParameters)
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
