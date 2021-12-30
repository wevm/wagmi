import { Bytes } from 'ethers/lib/utils'

import { units } from '../constants'

export type Chain = {
  id: number
  name: AddEthereumChainParameter['chainName']
  nativeCurrency?: AddEthereumChainParameter['nativeCurrency']
  rpcUrls: AddEthereumChainParameter['rpcUrls']
  blockExplorers?: { name: string; url: string }[]
  testnet?: boolean
}

export type Message = Bytes | string

export type Unit = typeof units[number]
