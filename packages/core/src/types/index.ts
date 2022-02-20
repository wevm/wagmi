import { BigNumber } from 'ethers'

import { units } from '../constants'
import './declarations'

export type { WithProvider } from './actions'

export type Balance = {
  decimals: number
  formatted: string
  symbol: string
  unit: Unit | number
  value: BigNumber
}

export type Chain = {
  id: number
  name: AddEthereumChainParameter['chainName']
  nativeCurrency?: AddEthereumChainParameter['nativeCurrency']
  rpcUrls: AddEthereumChainParameter['rpcUrls']
  blockExplorers?: { name: string; url: string }[]
  testnet?: boolean
}

export type Unit = typeof units[number]
