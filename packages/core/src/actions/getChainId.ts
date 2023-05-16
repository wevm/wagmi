import type { Config } from '../config.js'

///////////////////////////////////////////////////////////////////////////
// Getter

export function getChainId(config: Config) {
  return config.state.chainId
}

///////////////////////////////////////////////////////////////////////////
// Watcher

export function watchChainId(
  config: Config,
  { onChange }: { onChange: (chainId: number) => void },
) {
  return config.subscribe((state) => state.chainId, onChange)
}
