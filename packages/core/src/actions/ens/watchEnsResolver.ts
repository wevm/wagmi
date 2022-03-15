import { client } from '../../client'
import {
  FetchEnsResolverArgs,
  FetchEnsResolverResult,
  fetchEnsResolver,
} from './fetchEnsResolver'

export type WatchEnsResolverCallback = (
  resolver: FetchEnsResolverResult,
) => void

export function watchEnsResolver(
  args: FetchEnsResolverArgs,
  callback: WatchEnsResolverCallback,
) {
  const handleChange = async () => callback(await fetchEnsResolver(args))
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
