import { client } from '../../client'
import {
  GetWebSocketProviderResult,
  getWebSocketProvider,
} from './getWebSocketProvider'

export type WatchWebSocketProviderCallback = (
  webSocketProvider: GetWebSocketProviderResult,
) => void

export function watchWebSocketProvider(
  callback: WatchWebSocketProviderCallback,
) {
  const handleChange = async () => callback(await getWebSocketProvider())
  const unsubscribe = client.subscribe(({ provider }) => provider, handleChange)
  return unsubscribe
}
