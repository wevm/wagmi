import { client } from '../../client'
import { GetProviderResult, getProvider } from './getProvider'

export type WatchProviderCallback = (provider: GetProviderResult) => void

export function watchProvider(callback: WatchProviderCallback) {
  const handleChange = async () => callback(await getProvider())
  const unsubscribe = client.subscribe(({ provider }) => provider, handleChange)
  return unsubscribe
}
