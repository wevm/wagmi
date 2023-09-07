import type { Config } from '../createConfig.js'
import type { GetChainIdReturnType } from './getChainId.js'

export type WatchChainIdParameters<config extends Config = Config> = {
  onChange(data: GetChainIdReturnType<config>): void
}

export type WatchChainIdReturnType = () => void

/** https://alpha.wagmi.sh/core/actions/watchChainId */
export function watchChainId<config extends Config>(
  config: config,
  parameters: WatchChainIdParameters<config>,
): WatchChainIdReturnType {
  const { onChange } = parameters
  return config.subscribe((state) => state.chainId, onChange)
}
