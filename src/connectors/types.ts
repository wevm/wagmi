import { EventEmitter } from 'events'
import { Account, Network } from '../types'

export type Data = {
  account?: Account
  chainId?: Network
  provider?: any
}

type EventMap = {
  change: Data
  disconnect: undefined
  error: Error
}

type EventKey<T extends EventMap> = string & keyof T
type EventReceiver<T> = (params: T) => void

interface IEmitter<T extends EventMap> {
  on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void
  off<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void
  emit<K extends EventKey<T>>(
    eventName: K,
    ...params: T[K] extends undefined ? [undefined?] : [T[K]]
  ): void
}

export abstract class Emitter implements IEmitter<EventMap> {
  private emitter = new EventEmitter()

  on<K extends EventKey<EventMap>>(
    eventName: K,
    fn: EventReceiver<EventMap[K]>,
  ) {
    this.emitter.on(eventName, fn)
  }

  off<K extends EventKey<EventMap>>(
    eventName: K,
    fn: EventReceiver<EventMap[K]>,
  ) {
    this.emitter.off(eventName, fn)
  }

  emit<K extends EventKey<EventMap>>(
    eventName: K,
    ...params: EventMap[K] extends undefined ? [undefined?] : [EventMap[K]]
  ) {
    // TODO: Why is params an array
    this.emitter.emit(eventName, params[0])
  }
}

export abstract class Connector extends Emitter {
  abstract name: string

  abstract activate(): Promise<Data>
  abstract deactivate(): void
  abstract getAccount(): Promise<string>
  abstract getChainId(): Promise<Network>
  abstract getProvider(): Promise<unknown>
}
