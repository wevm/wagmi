import { client } from '../../client'
import { FetchSignerResult, fetchSigner } from './fetchSigner'

export type WatchSignerCallback = (data: FetchSignerResult) => void

export function watchSigner(callback: WatchSignerCallback) {
  const handleChange = async () => callback(await fetchSigner())
  const unsubscribe = client.subscribe(
    ({ data, connector }) => [data?.account, data?.chain, connector],
    handleChange,
  )
  return unsubscribe
}
