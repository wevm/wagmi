import { getClient } from '../../client'
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
  const client = getClient()
  const handleChange = async () => callback(await fetchEnsName(args))
  const unsubscribe = client.subscribe(({ provider }) => provider, handleChange)
  return unsubscribe
}
