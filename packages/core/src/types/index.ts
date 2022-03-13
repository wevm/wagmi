import { units } from '../constants'
import './declarations'

export type Chain = {
  id: number
  name: AddEthereumChainParameter['chainName']
  nativeCurrency?: AddEthereumChainParameter['nativeCurrency']
  rpcUrls: AddEthereumChainParameter['rpcUrls']
  blockExplorers?: { name: string; url: string }[]
  testnet?: boolean
}

export type Unit = typeof units[number]
