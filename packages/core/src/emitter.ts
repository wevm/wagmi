import { EventEmitter } from 'eventemitter3'

type EventMap = Record<string, object | never>
type EventKey<T extends EventMap> = string & keyof T
type EventFn<T extends unknown[] = any[]> = (...args: T) => void
export type EventData<T extends EventMap, K extends keyof T> = (T[K] extends [
  never,
]
  ? unknown
  : T[K]) & {
  uid: string
}

export class Emitter<T extends EventMap> {
  private emitter = new EventEmitter()

  constructor(public uid: string) {}

  on<K extends EventKey<T>>(
    eventName: K,
    fn: EventFn<
      T[K] extends [never] ? [{ uid: string }] : [data: T[K] & { uid: string }]
    >,
  ) {
    this.emitter.on(eventName, fn as EventFn)
  }

  once<K extends EventKey<T>>(
    eventName: K,
    fn: EventFn<
      T[K] extends [never] ? [{ uid: string }] : [data: T[K] & { uid: string }]
    >,
  ) {
    this.emitter.once(eventName, fn as EventFn)
  }

  off<K extends EventKey<T>>(
    eventName: K,
    fn: EventFn<
      T[K] extends [never] ? [{ uid: string }] : [data: T[K] & { uid: string }]
    >,
  ) {
    this.emitter.off(eventName, fn as EventFn)
  }

  emit<K extends EventKey<T>>(
    eventName: K,
    ...params: T[K] extends [never] ? [] : [data: T[K]]
  ) {
    const data = params[0]
    this.emitter.emit(eventName, { uid: this.uid, ...data })
  }

  listenerCount<K extends EventKey<T>>(eventName: K) {
    return this.emitter.listenerCount(eventName)
  }
}

export function createEmitter<T extends EventMap>(uid: string) {
  return new Emitter<T>(uid)
}
