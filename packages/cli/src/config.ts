type Contract = {
  /** Name used for naming contract objects */
  name: string
  /** Address or ENS name of contract */
  addressOrName: string
}

type Config = {
  contracts: Contract[]
}

export function defineConfig(config: Config) {
  return config
}

export const defaultConfig = defineConfig({
  contracts: [],
})
