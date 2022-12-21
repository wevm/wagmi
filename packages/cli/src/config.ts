import type { Abi, Address } from 'abitype'

type TypeOrPromise<T> = T | Promise<T>

export type ContractConfig<
  TChainId extends number = number,
  RequiredChainId extends number | undefined = undefined,
> = {
  /**
   * Contract ABI
   */
  abi: Abi
  /**
   * Contract address or addresses.
   *
   * Accepts an object `{ [chainId]: address }` to support multiple chains.
   *
   * @example
   * '0x314159265dd8dbb310642f98f50c066173c1259b'
   *
   * @example
   * {
   *   1: '0x314159265dd8dbb310642f98f50c066173c1259b',
   *   5: '0x112234455c3a32fd11230c42e7bccd4a84e02010',
   * }
   */
  address?:
    | Address
    | (RequiredChainId extends number
        ? Record<RequiredChainId, Address> & Partial<Record<TChainId, Address>>
        : Record<TChainId, Address>)
  /**
   * Name of contract.
   *
   * Used for names of generated code.
   */
  name: string
}

export type Contract = ContractConfig & {
  /** Generated string content */
  content: string
  /** Meta info about contract */
  meta: {
    abiName: string
    addressName?: string
    configName?: string
  }
}

export type Watch = {
  /** Command to run along with watch process */
  command?: () => TypeOrPromise<void>
  /** Paths to watch for changes. */
  paths: string[]
  /** Callback that fires when file is added */
  onAdd?: (path: string) => TypeOrPromise<ContractConfig | undefined>
  /** Callback that fires when file changes */
  onChange: (path: string) => TypeOrPromise<ContractConfig | undefined>
  /** Callback that fires when file is removed */
  onRemove?: (path: string) => TypeOrPromise<string | undefined>
}

export type Plugin = {
  /** Contracts provided by plugin */
  contracts?(): TypeOrPromise<ContractConfig[]>
  /** Plugin name */
  name: string
  /** Run plugin logic */
  run?(config: {
    contracts: Contract[]
    isTypeScript: boolean
  }): TypeOrPromise<{
    imports?: string
    prepend?: string
    content: string
  }>
  /**
   * Validate plugin configuration or other @wagmi/cli settings require for plugin.
   */
  validate?(): TypeOrPromise<void>
  /** File system watch config */
  watch?: Watch
}

export type Config = {
  /** Contracts to generate code for */
  contracts?: ContractConfig[]
  /** Output file path */
  out: string
  /** Plugins to run */
  plugins?: Plugin[]
}

export function defineConfig(config: Config | (() => TypeOrPromise<Config>)) {
  return config
}

export const defaultConfig: Config = {
  out: 'src/generated.ts',
  contracts: [],
  plugins: [],
}
