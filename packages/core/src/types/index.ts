import { providers } from 'ethers'

import {
  BlockExplorer,
  BlockExplorerName,
  RpcProviderName,
  units,
} from '../constants'

export type Chain = {
  id: number
  name: AddEthereumChainParameter['chainName']
  network: string
  nativeCurrency?: AddEthereumChainParameter['nativeCurrency']
  rpcUrls: { [key in RpcProviderName]?: string } & {
    [key: string]: string
    default: string
  }
  blockExplorers?: {
    [key in BlockExplorerName]: BlockExplorer
  } & {
    [key: string]: BlockExplorer
    default: BlockExplorer
  }
  testnet?: boolean
}

export type ChainProvider<
  TProvider extends Provider = Provider,
  TWebSocketProvider extends WebSocketProvider = WebSocketProvider,
> = (chain: Chain) => {
  chain: Chain
  provider: () => ProviderWithFallbackConfig<TProvider>
  webSocketProvider?: () => TWebSocketProvider
} | null

export type FallbackProviderConfig = Omit<
  providers.FallbackProviderConfig,
  'provider'
>
export type ProviderWithFallbackConfig<TProvider extends Provider = Provider> =
  TProvider & FallbackProviderConfig

export type Provider = providers.BaseProvider
export type WebSocketProvider = providers.WebSocketProvider

export type Unit = typeof units[number]

declare global {
  type AddEthereumChainParameter = {
    /** A 0x-prefixed hexadecimal string */
    chainId: string
    chainName: string
    nativeCurrency?: {
      name: string
      /** 2-6 characters long */
      symbol: string
      decimals: number
    }
    rpcUrls: string[]
    blockExplorerUrls?: string[]
    /** Currently ignored. */
    iconUrls?: string[]
  }

  type WatchAssetParams = {
    /** In the future, other standards will be supported */
    type: 'ERC20'
    options: {
      /** Address of token contract */
      address: string
      /** Number of token decimals */
      decimals: number
      /** String url of token logo */
      image?: string
      /** A ticker symbol or shorthand, up to 5 characters */
      symbol: string
    }
  }

  type InjectedProviderFlags = {
    isBraveWallet?: true
    isCoinbaseWallet?: true
    isFrame?: true
    isMetaMask?: true
    isOpera?: true
    isTally?: true
    isTokenary?: true
    isTrust?: true
  }

  type InjectedProviders = InjectedProviderFlags & {
    isMetaMask: true
    /** Only exists in MetaMask as of 2022/04/03 */
    _events: {
      connect?: () => void
    }
    /** Only exists in MetaMask as of 2022/04/03 */
    _state?: {
      accounts?: string[]
      initialized?: boolean
      isConnected?: boolean
      isPermanentlyDisconnected?: boolean
      isUnlocked?: boolean
    }
  }

  interface Ethereum extends InjectedProviders {
    on?: (...args: any[]) => void
    removeListener?: (...args: any[]) => void
    providers?: Ethereum[]

    /**
     * EIP-747: Add wallet_watchAsset to Provider
     * https://eips.ethereum.org/EIPS/eip-747
     */
    request(args: {
      method: 'wallet_watchAsset'
      params: WatchAssetParams
    }): Promise<boolean>

    /**
     * EIP-1193: Ethereum Provider JavaScript API
     * https://eips.ethereum.org/EIPS/eip-1193
     */
    request(args: { method: 'eth_accounts' }): Promise<string[]>
    request(args: { method: 'eth_chainId' }): Promise<string>
    request(args: { method: 'eth_requestAccounts' }): Promise<string[]>

    /**
     * EIP-1474: Remote procedure call specification
     * https://eips.ethereum.org/EIPS/eip-1474
     */
    request(args: { method: 'web3_clientVersion' }): Promise<string>

    /**
     * EIP-3085: Wallet Add Ethereum Chain RPC Method
     * https://eips.ethereum.org/EIPS/eip-3085
     */
    request(args: {
      method: 'wallet_addEthereumChain'
      params: AddEthereumChainParameter[]
    }): Promise<null>
    /**
     * EIP-3326: Wallet Switch Ethereum Chain RPC Method
     * https://eips.ethereum.org/EIPS/eip-3326
     */
    request(args: {
      method: 'wallet_switchEthereumChain'
      params: [{ chainId: string }]
    }): Promise<null>
  }

  interface Window {
    ethereum?: Ethereum
  }
}
