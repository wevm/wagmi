import { ContractInterface } from './types'

export type SourceFn = (config: {
  address: string
  chainId?: number
}) => Promise<ContractInterface>

export type Contract = {
  /** Name used for contract objects */
  name: string
  /** Address of contract */
  address: `0x${string}`
  /** Chain id of contract */
  chainId?: number
  /** Contract interface source */
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
