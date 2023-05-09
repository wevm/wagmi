import type {
  Account,
  PublicClient as PublicClient_,
  Transport,
  WalletClient as WalletClient_,
} from 'viem'

import type { Chain } from '../chains'

export type Hash = `0x${string}`

export type ChainProviderFn<TChain extends Chain = Chain> = (chain: TChain) => {
  chain: TChain
  rpcUrls: RpcUrls
} | null

export type PublicClient<
  TTransport extends Transport = Transport,
  TChain extends Chain = Chain,
> = PublicClient_<TTransport, TChain> & { chains?: Chain[] }
export type WebSocketPublicClient<
  TTransport extends Transport = Transport,
  TChain extends Chain = Chain,
> = PublicClient_<TTransport, TChain> & {
  chains?: Chain[]
}

export type RpcUrls = {
  http: readonly string[]
  webSocket?: readonly string[]
}

export type WalletClient<
  TTransport extends Transport = Transport,
  TChain extends Chain = Chain,
  TAccount extends Account = Account,
> = WalletClient_<TTransport, TChain, TAccount>

export type Unit = 'ether' | 'gwei' | 'wei' | number
