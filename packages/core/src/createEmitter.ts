import { EventEmitter } from 'eventemitter3'

type EventMap = Record<string, object | never>
type EventKey<eventMap extends EventMap> = string & keyof eventMap
type EventFn<parameters extends unknown[] = any[]> = (
  ...parameters: parameters
) => void
export type EventData<
  eventMap extends EventMap,
  eventName extends keyof eventMap,
> = (eventMap[eventName] extends [never] ? unknown : eventMap[eventName]) & {
  uid: string
}

export class Emitter<eventMap extends EventMap> {
  _emitter = new EventEmitter()

  constructor(public uid: string) {}

  on<key extends EventKey<eventMap>>(
    eventName: key,
    fn: EventFn<
      eventMap[key] extends [never]
        ? [{ uid: string }]
        : [data: eventMap[key] & { uid: string }]
    >,
  ) {
    this._emitter.on(eventName, fn as EventFn)
  }

  once<key extends EventKey<eventMap>>(
    eventName: key,
    fn: EventFn<
      eventMap[key] extends [never]
        ? [{ uid: string }]
        : [data: eventMap[key] & { uid: string }]
    >,
  ) {
    this._emitter.once(eventName, fn as EventFn)
  }

  off<key extends EventKey<eventMap>>(
    eventName: key,
    fn: EventFn<
      eventMap[key] extends [never]
        ? [{ uid: string }]
        : [data: eventMap[key] & { uid: string }]
    >,
  ) {
    this._emitter.off(eventName, fn as EventFn)
  }

  emit<key extends EventKey<eventMap>>(
    eventName: key,
    ...params: eventMap[key] extends [never] ? [] : [data: eventMap[key]]
  ) {
    const data = params[0]
    this._emitter.emit(eventName, { uid: this.uid, ...data })
  }

  listenerCount<key extends EventKey<eventMap>>(eventName: key) {
    return this._emitter.listenerCount(eventName)
  }
}

export function createEmitter<eventMap extends EventMap>(uid: string) {
  return new Emitter<eventMap>(uid)
}
