import { wagmiClient } from '../../client'
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
  const unsubscribe = wagmiClient.subscribe(
    ({ connector, provider }) => [connector, provider],
    handleChange,
  )
  return unsubscribe
}
