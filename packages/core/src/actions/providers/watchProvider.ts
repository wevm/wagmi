import { getClient } from '../../client'
import { Provider } from '../../types'
import { GetProviderArgs, GetProviderResult, getProvider } from './getProvider'

export type WatchProviderCallback<TProvider extends Provider = Provider> = (
  provider: GetProviderResult<TProvider>,
) => void

export function watchProvider<TProvider extends Provider = Provider>(
  args: GetProviderArgs,
  callback: WatchProviderCallback<TProvider>,
) {
  const client = getClient()
  const handleChange = async () => callback(getProvider<TProvider>(args))
  const unsubscribe = client.subscribe(({ provider }) => provider, handleChange)
  return unsubscribe
}
