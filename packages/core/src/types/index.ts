import type { Ethereum } from '@wagmi/connectors'
import type {
  Account,
  FallbackTransportConfig,
  PublicClient,
  Transport,
  WalletClient,
} from 'viem'

import type { Chain } from '../chains'

export type Hash = `0x${string}`

export type ChainProviderFn<TChain extends Chain = Chain> = (chain: TChain) => {
  chain: TChain
  rpcUrls: RpcUrls
} | null

export type FallbackProviderConfig = Pick<
  FallbackTransportConfig,
  'rank' | 'retryCount' | 'retryDelay'
>
export type ProviderWithFallbackConfig<TProvider extends Provider = Provider> =
  TProvider & FallbackProviderConfig

export type Provider<TChain extends Chain = Chain> = PublicClient<
  Transport,
  TChain
> & { chains?: Chain[] }
export type WebSocketProvider<TChain extends Chain = Chain> = PublicClient<
  Transport,
  TChain
> & {
  chains?: Chain[]
}

export type RpcUrls = {
  http: readonly string[]
  webSocket?: readonly string[]
}

export type Signer<
  TTransport extends Transport = Transport,
  TChain extends Chain = Chain,
  TAccount extends Account = Account,
> = WalletClient<TTransport, TChain, TAccount>

export type Unit = 'ether' | 'gwei' | 'wei' | number

declare global {
  interface Window {
    ethereum?: Ethereum
  }
}
