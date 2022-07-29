import { ContractInterface } from 'ethers'

import { SourceFn } from './sources'

type Contract = {
  /** Name used for naming contract objects */
  name: string
  /** Address of contract */
  address: `0x${string}`
  /** Chain id of contract */
  chainId: number
  /**
   * Contract interface source
   */
  source: ContractInterface | SourceFn
}

export type Config = {
  contracts: Contract[]
}

export function defineConfig(config: Config) {
  return config
}

export const defaultConfig = defineConfig({
  contracts: [],
})
