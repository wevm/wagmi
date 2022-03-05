import { wagmiClient } from '../../client'
import { FetchSignerResult, fetchSigner } from './fetchSigner'

export type WatchSignerCallback = (signer: FetchSignerResult) => void

export function watchSigner(callback: WatchSignerCallback) {
  const handleChange = async () => callback(await fetchSigner())
  const unsubscribe = wagmiClient.subscribe(
    ({ connector }) => [connector],
    handleChange,
  )
  return unsubscribe
}
