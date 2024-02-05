import { type Config } from '../createConfig.js'
import { type GetChainsReturnType } from './getChains.js'

export type WatchChainsParameters = {
  onChange(chains: GetChainsReturnType, prevChains: GetChainsReturnType): void
}

export type WatchChainsReturnType = () => void

/** https://wagmi.sh/core/api/actions/watchChains */
export function watchChains(
  config: Config,
  parameters: WatchChainsParameters,
): WatchChainsReturnType {
  const { onChange } = parameters
  return config._internal.chains.subscribe((chains, prevChains) => {
    onChange(chains, prevChains)
  })
}
