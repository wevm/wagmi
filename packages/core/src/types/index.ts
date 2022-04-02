import {
  BlockExplorer,
  BlockExplorerName,
  RpcProviderName,
  units,
} from '../constants'
import './declarations'

export type Chain = {
  id: number
  name: AddEthereumChainParameter['chainName']
  nativeCurrency?: AddEthereumChainParameter['nativeCurrency']
  rpcUrls: { [key in RpcProviderName]?: string } & {
    default: string | string[]
  }
  blockExplorers?: {
    [key in BlockExplorerName]?: BlockExplorer
  } & {
    default: BlockExplorer | BlockExplorer[]
  }
  testnet?: boolean
}

export type Unit = typeof units[number]
