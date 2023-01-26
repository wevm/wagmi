import type { Ethereum } from '@wagmi/connectors'
import type {
  Address,
  ResolvedConfig,
  TypedData,
  TypedDataDomain,
  TypedDataToPrimitiveTypes,
} from 'abitype'
import type { Signer as BaseSigner, BigNumber, providers } from 'ethers'

import type { Chain } from '../chains'
import type { units } from '../constants'

declare module 'abitype' {
  export interface Config {
    // TODO: Drop `BigNumber` once ethers supports `bigint` natively
    BigIntType: BigNumber
    IntType: number
  }
}

declare module 'ethers/lib/utils.js' {
  export function getAddress(address: string): Address
  export function isAddress(address: string): address is Address
  export function verifyTypedData<
    TTypedData extends TypedData,
    TSchema extends TypedDataToPrimitiveTypes<TTypedData>,
  >(
    domain: TypedDataDomain,
    types: TTypedData,
    value: TSchema[keyof TSchema] extends infer TValue
      ? { [x: string]: any } extends TValue
        ? Record<string, any>
        : TValue
      : never,
    signature:
      | {
          r: string
          s?: string
          _vs?: string
          recoveryParam?: number
          v?: number
        }
      | ResolvedConfig['BytesType']
      | string,
  ): string
}

export type Hash = `0x${string}`

export type ChainProviderFn<
  TChain extends Chain = Chain,
  TProvider extends Provider = providers.BaseProvider,
  TWebSocketProvider extends WebSocketProvider = providers.WebSocketProvider,
> = (chain: TChain) => {
  chain: TChain
  provider: () => ProviderWithFallbackConfig<TProvider>
  webSocketProvider?: () => TWebSocketProvider
} | null

export type FallbackProviderConfig = Omit<
  providers.FallbackProviderConfig,
  'provider'
>
export type ProviderWithFallbackConfig<TProvider extends Provider = Provider> =
  TProvider & FallbackProviderConfig

export type Provider = providers.BaseProvider & { chains?: Chain[] }
export type WebSocketProvider = providers.WebSocketProvider & {
  chains?: Chain[]
}

export type Signer = BaseSigner

export type Unit = (typeof units)[number]

declare global {
  interface Window {
    ethereum?: Ethereum
  }
}
