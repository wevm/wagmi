import type { Config } from '../config.js'

export type GetChainIdReturnType = number

/** https://wagmi.sh/core/actions/getChainId */
export function getChainId(config: Config): GetChainIdReturnType {
  return config.state.chainId
}

///////////////////////////////////////////////////////////////////////////
// Watcher

export type WatchChainIdParameters = {
  onChange(data: GetChainIdReturnType): void
}

export type WatchChainIdReturnType = () => void

/** https://wagmi.sh/core/actions/getChainId#watcher */
export function watchChainId(
  config: Config,
  { onChange }: WatchChainIdParameters,
): WatchChainIdReturnType {
  return config.subscribe((state) => state.chainId, onChange)
}
