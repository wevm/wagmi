import type { RpcError } from 'viem'

import { type Config } from '../config.js'
import { type Evaluate } from '../internal.js'

export type GetBlockNumberParameters<config extends Config = Config> = Evaluate<
  Pick<import('viem').GetBlockNumberParameters, 'maxAge'> & {
    chainId?: config['chains'][number]['id'] | undefined
  }
>

export type GetBlockNumberReturnType =
  | import('viem').GetBlockNumberReturnType
  | undefined

export type GetBlockNumberError =
  | RpcError
  // base
  | Error

/** https://wagmi.sh/core/actions/getBlockNumber */
export function getBlockNumber<config extends Config>(
  config: config,
  parameters: GetBlockNumberParameters<config> = {},
): Promise<GetBlockNumberReturnType> {
  const { chainId } = parameters
  const publicClient = config.getPublicClient({ chainId })
  return publicClient?.getBlockNumber(parameters)
}

///////////////////////////////////////////////////////////////////////////
// Watcher

export type WatchBlockNumberParameters<config extends Config = Config> =
  Evaluate<
    Pick<
      import('viem').WatchBlockNumberParameters,
      'onBlockNumber' | 'onError'
    > & {
      chainId?: config['chains'][number]['id'] | undefined
      syncConnectedChain?: boolean
    }
  >

export type WatchBlockNumberReturnType =
  import('viem').WatchBlockNumberReturnType

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

    const publicClient = config.getPublicClient({ chainId })
    unwatch = publicClient?.watchBlockNumber({
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
