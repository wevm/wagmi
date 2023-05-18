import type { Config } from '../config.js'

///////////////////////////////////////////////////////////////////////////
// Getter

export type GetChainIdReturnType = number

export function getChainId(config: Config): GetChainIdReturnType {
  return config.state.chainId
}

///////////////////////////////////////////////////////////////////////////
// Watcher

export type WatchChainIdParameters = {
  onChange(data: GetChainIdReturnType): void
}

export type WatchChainIdReturnType = () => void

export function watchChainId(
  config: Config,
  { onChange }: WatchChainIdParameters,
): WatchChainIdReturnType {
  return config.subscribe((state) => state.chainId, onChange)
}
