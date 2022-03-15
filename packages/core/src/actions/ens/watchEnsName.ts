import { client } from '../../client'
import {
  FetchEnsNameArgs,
  FetchEnsNameResult,
  fetchEnsName,
} from './fetchEnsName'

export type WatchEnsNameCallback = (name: FetchEnsNameResult) => void

export function watchEnsName(
  args: FetchEnsNameArgs,
  callback: WatchEnsNameCallback,
) {
  const handleChange = async () => callback(await fetchEnsName(args))
  const unsubscribe = client.subscribe(
    ({ connector, provider }) => ({ connector, provider }),
    handleChange,
    {
      equalityFn: (selected, previous) =>
        selected.connector === previous.connector &&
        selected.provider === previous.provider,
    },
  )
  return unsubscribe
}
