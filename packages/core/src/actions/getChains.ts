import { type Chain } from 'viem'
import { type Config } from '../createConfig.js'
import { deepEqual } from '../utils/deepEqual.js'

export type GetChainsReturnType = readonly [Chain, ...Chain[]]

let previousChains: readonly Chain[] = []

/** https://wagmi.sh/core/api/actions/getChains */
export function getChains(config: Config): GetChainsReturnType {
  const chains = config.chains
  if (deepEqual(previousChains, chains))
    return previousChains as GetChainsReturnType
  previousChains = chains
  return chains
}
