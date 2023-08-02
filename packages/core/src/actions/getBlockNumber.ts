import {
  type GetBlockNumberParameters as viem_GetBlockNumberParameters,
  type GetBlockNumberReturnType as viem_GetBlockNumberReturnType,
  type WatchBlockNumberParameters as viem_WatchBlockNumberParameters,
  type WatchBlockNumberReturnType as viem_WatchBlockNumberReturnType,
  getBlockNumber as viem_getBlockNumber,
  watchBlockNumber as viem_watchBlockNumber,
} from 'viem/actions'

import { type Config } from '../config.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { Evaluate } from '../types/utils.js'

export type GetBlockNumberParameters<config extends Config = Config> = Evaluate<
  viem_GetBlockNumberParameters & ChainIdParameter<config>
>

export type GetBlockNumberReturnType = viem_GetBlockNumberReturnType

export type GetBlockNumberError = Error

/** https://wagmi.sh/core/actions/getBlockNumber */
export function getBlockNumber<config extends Config>(
  config: config,
  parameters: GetBlockNumberParameters<config> = {},
): Promise<GetBlockNumberReturnType> {
  const { chainId } = parameters
  const client = config.getClient({ chainId })
  return viem_getBlockNumber(client, parameters)
}

///////////////////////////////////////////////////////////////////////////
// Watcher

export type WatchBlockNumberParameters<config extends Config = Config> =
  Evaluate<
    Pick<viem_WatchBlockNumberParameters, 'onBlockNumber' | 'onError'> &
      ChainIdParameter<config> & {
        syncConnectedChain?: boolean | undefined
      }
  >

export type WatchBlockNumberReturnType = viem_WatchBlockNumberReturnType

// TODO: wrap in viem's `observe` to avoid duplicate invocations.
/** https://wagmi.sh/core/actions/getBlockNumber#watcher */
export function watchBlockNumber<config extends Config>(
  config: config,
  parameters: WatchBlockNumberParameters<config>,
): WatchBlockNumberReturnType {
  const {
    onBlockNumber,
    onError,
    syncConnectedChain = config._internal.syncConnectedChain,
  } = parameters

  let unwatch: WatchBlockNumberReturnType | undefined
  const listener = (chainId: number | undefined) => {
    if (unwatch) unwatch()

    const client = config.getClient({ chainId })
    unwatch = viem_watchBlockNumber(client, {
      onBlockNumber,
      onError,
      poll: true,
    })
    return unwatch
  }

  // set up listener for block number changes
  const unlisten = listener(parameters.chainId)

  // set up subscriber for connected chain changes
  let unsubscribe: (() => void) | undefined
  if (syncConnectedChain && !parameters.chainId)
    unsubscribe = config.subscribe(
      ({ chainId }) => chainId,
      async (chainId) => {
        const blockNumber = await getBlockNumber(config, {
          chainId,
        })
        onBlockNumber(blockNumber!, undefined)
        return listener(chainId)
      },
    )

  return () => {
    unlisten?.()
    unsubscribe?.()
  }
}
