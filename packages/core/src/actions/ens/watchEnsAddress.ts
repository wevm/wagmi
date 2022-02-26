import { wagmiClient } from '../../client'
import {
  FetchEnsAddressArgs,
  FetchEnsAddressResult,
  fetchEnsAddress,
} from './fetchEnsAddress'

export type WatchEnsAddressCallback = (address: FetchEnsAddressResult) => void

export function watchEnsAddress(
  args: FetchEnsAddressArgs,
  callback: WatchEnsAddressCallback,
) {
  const handleChange = async () => callback(await fetchEnsAddress(args))
  const unsubscribe = wagmiClient.subscribe(
    ({ connector, provider }) => [connector, provider],
    handleChange,
  )
  return unsubscribe
}
