import type { Chain } from 'viem'
import type { Config } from '../createConfig.js'
import { deepEqual } from '../utils/deepEqual.js'

export type GetChainsReturnType<config extends Config = Config> = readonly [
  ...config['chains'],
  ...Chain[],
]

let previousChains: readonly Chain[] = []

/** https://wagmi.sh/core/api/actions/getChains */
export function getChains<config extends Config>(
  config: config,
): GetChainsReturnType<config> {
  const chains = config.chains
  if (deepEqual(previousChains, chains))
    return previousChains as GetChainsReturnType<config>
  previousChains = chains
  return chains as unknown as GetChainsReturnType<config>
}
