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
    ({ connector, provider }) => [connector, provider],
    handleChange,
  )
  return unsubscribe
}
