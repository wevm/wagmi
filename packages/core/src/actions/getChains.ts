import type { Chain } from 'viem'
import type { Config } from '../createConfig.js'
import { deepEqual } from '../utils/deepEqual.js'

export type GetChainsReturnType<config extends Config = Config> =
  config['chains']

const previousChainsByConfig = new WeakMap<Config, readonly Chain[]>()

/** https://wagmi.sh/core/api/actions/getChains */
export function getChains<config extends Config>(
  config: config,
): GetChainsReturnType<config> {
  const previousChains = previousChainsByConfig.get(config)
  const chains = config.chains

  if (previousChains && deepEqual(previousChains, chains))
    return previousChains as GetChainsReturnType<config>

  previousChainsByConfig.set(config, chains)
  return chains as unknown as GetChainsReturnType<config>
}
