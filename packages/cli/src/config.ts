import type { Abi, Address } from 'abitype'

export type Contract<
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

export type ResolvedContract = Contract & {
  /** Generated string content */
  content: string
  meta: {
    abiName: string
    addressName?: string
    configName?: string
  } & { [key: string]: string }
}

export type Watch = {
  /** Command to run along with watch process */
  command?: () => void | Promise<void>
  /** Paths to watch for changes. */
  paths: string[]
  /** Callback that fires when file is added */
  onAdd?: (path: string) => Contract | Promise<Contract | undefined> | undefined
  /** Callback that fires when file changes */
  onChange: (
    path: string,
  ) => Contract | Promise<Contract | undefined> | undefined
  /** Callback that fires when file is removed */
  onRemove?: (path: string) => string | Promise<string> | undefined
}

export type PluginContent = { header: string[]; imports: string[] }
type RunResult = {
  content: PluginContent
  contracts: ResolvedContract[]
}
export type Plugin = {
  /** Contracts provided by plugin */
  contracts?(): Contract[] | Promise<Contract[]>
  /** Plugin name */
  name: string
  /** Run plugin logic */
  run?(config: {
    content: {
      header: string[]
      imports: string[]
    }
    contracts: ResolvedContract[]
    isTypeScript: boolean
  }): RunResult | Promise<RunResult>
  /**
   * Validate plugin configuration or other @wagmi/cli settings require for plugin.
   */
  validate?(): void | Promise<void>
  /** File system watch config */
  watch?: Watch
}

export type Config = {
  /** Contracts to generate code for */
  contracts?: Contract[]
  /** Output file path */
  out: string
  /** Plugins to run */
  plugins?: Plugin[]
}

export function defineConfig(
  config: Config | (() => Config | Promise<Config>),
) {
  return config
}

export const defaultConfig: Config = {
  out: 'src/generated.ts',
  contracts: [],
  plugins: [],
}
