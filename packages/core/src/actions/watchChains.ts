import type { Config } from '../createConfig.js'
import type { GetChainsReturnType } from './getChains.js'

export type WatchChainsParameters<config extends Config = Config> = {
  onChange(
    chains: GetChainsReturnType<config>,
    prevChains: GetChainsReturnType<config>,
  ): void
}

export type WatchChainsReturnType = () => void

/**
 * @internal
 * We don't expose this because as far as consumers know, you can't chainge (lol) `config.chains` at runtime.
 * Setting `config.chains` via `config._internal.chains.setState(...)` is an extremely advanced use case that's not worth documenting or supporting in the public API at this time.
 */
export function watchChains<config extends Config>(
  config: config,
  parameters: WatchChainsParameters<config>,
): WatchChainsReturnType {
  const { onChange } = parameters
  return config._internal.chains.subscribe((chains, prevChains) => {
    onChange(
      chains as unknown as GetChainsReturnType<config>,
      prevChains as unknown as GetChainsReturnType<config>,
    )
  })
}
