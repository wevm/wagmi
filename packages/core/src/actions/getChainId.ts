import type { Config } from '../config.js'

export type GetChainIdReturnType<config extends Config = Config> =
  config['chains'][number]['id']

/** https://wagmi.sh/core/actions/getChainId */
export function getChainId<config extends Config>(
  config: config,
): GetChainIdReturnType<config> {
  return config.state.chainId
}

///////////////////////////////////////////////////////////////////////////
// Watcher

export type WatchChainIdParameters<config extends Config = Config> = {
  onChange(data: GetChainIdReturnType<config>): void
}

export type WatchChainIdReturnType = () => void

/** https://wagmi.sh/core/actions/getChainId#watcher */
export function watchChainId<config extends Config>(
  config: config,
  parameters: WatchChainIdParameters<config>,
): WatchChainIdReturnType {
  const { onChange } = parameters
  return config.subscribe((state) => state.chainId, onChange)
}
