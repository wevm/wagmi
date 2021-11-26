import { default as EventEmitter } from 'eventemitter3'

import { ConnectorError } from './errors'

export type Chain = {
  id: number
  name: AddEthereumChainParameter['chainName']
  nativeCurrency: AddEthereumChainParameter['nativeCurrency']
  rpcUrls: AddEthereumChainParameter['rpcUrls']
  blockExplorerUrls?: AddEthereumChainParameter['blockExplorerUrls']
  testnet?: boolean
}

export type Data = {
  account?: string
  chainId?: number
  provider?: any
}

export interface ConnectorEvents {
  change(data: Data): void
  connect(data: Data): void
  disconnect(): void
  error(error: ConnectorError): void
}

export interface ConnectorProps {
  name: string
  chains?: Chain[]
  provider: any
  ready: boolean

  connect(): Promise<Data>
  disconnect(): Promise<void>
  isAuthorized(): Promise<boolean>
  isConnected(): Promise<boolean>
  switchChain?(chainId: number): Promise<void>
}

export type Connector = ConnectorProps & EventEmitter<ConnectorEvents>

export abstract class BaseConnector
  extends EventEmitter<ConnectorEvents>
  implements Connector
{
  abstract name: string
  abstract provider: any
  abstract ready: boolean

  abstract connect(): Promise<Data>
  abstract disconnect(): Promise<void>
  abstract isAuthorized(): Promise<boolean>
  abstract isConnected(): Promise<boolean>
}
