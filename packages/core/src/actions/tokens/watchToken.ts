import { client } from '../../client'
import { FetchTokenArgs, FetchTokenResult, fetchToken } from './fetchToken'

export type WatchTokenCallback = (address: FetchTokenResult) => void

export function watchToken(args: FetchTokenArgs, callback: WatchTokenCallback) {
  const handleChange = async () => callback(await fetchToken(args))
  const unsubscribe = client.subscribe(
    ({ provider }) => [provider],
    handleChange,
  )
  return unsubscribe
}
