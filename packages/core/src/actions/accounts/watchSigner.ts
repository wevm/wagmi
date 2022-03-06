import { wagmiClient } from '../../client'
import { FetchSignerResult, fetchSigner } from './fetchSigner'

export type WatchSignerCallback = (data: FetchSignerResult) => void

export function watchSigner(callback: WatchSignerCallback) {
  const handleChange = async () => callback(await fetchSigner())
  const unsubscribe = wagmiClient.subscribe(
    ({ data, connector }) => [data?.account, data?.chain, connector],
    handleChange,
  )
  return unsubscribe
}
