import { getClient } from '../../client'
import { FetchSignerResult, fetchSigner } from './fetchSigner'

export type WatchSignerCallback = (data: FetchSignerResult) => void

export function watchSigner(callback: WatchSignerCallback) {
  const client = getClient()
  const handleChange = async () => callback(await fetchSigner())
  const unsubscribe = client.subscribe(
    ({ data, connector }) => ({
      account: data?.account,
      chainId: data?.chain?.id,
      connector,
    }),
    handleChange,
    {
      equalityFn: (selected, previous) =>
        selected.account === previous.account &&
        selected.chainId === previous.chainId &&
        selected.connector === previous.connector,
    },
  )
  return unsubscribe
}
