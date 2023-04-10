import type { Account, PublicClient, Transport, WalletClient } from 'viem'

import type { Chain } from '../chains'

export type Hash = `0x${string}`

export type ChainProviderFn<TChain extends Chain = Chain> = (chain: TChain) => {
  chain: TChain
  rpcUrls: RpcUrls
} | null

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
