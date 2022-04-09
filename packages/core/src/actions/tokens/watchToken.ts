import { getClient } from '../../client'
import { FetchTokenArgs, FetchTokenResult, fetchToken } from './fetchToken'

export type WatchTokenCallback = (address: FetchTokenResult) => void

export function watchToken(args: FetchTokenArgs, callback: WatchTokenCallback) {
  const client = getClient()
  const handleChange = async () => callback(await fetchToken(args))
  const unsubscribe = client.subscribe(({ provider }) => provider, handleChange)
  return unsubscribe
}
