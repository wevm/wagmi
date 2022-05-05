import { providers } from 'ethers'

import { getClient } from '../../client'
import { GetProviderArgs, GetProviderResult, getProvider } from './getProvider'

export type WatchProviderCallback<
  TProvider extends providers.BaseProvider = providers.BaseProvider,
> = (provider: GetProviderResult<TProvider>) => void

export function watchProvider<
  TProvider extends providers.BaseProvider = providers.BaseProvider,
>(args: GetProviderArgs, callback: WatchProviderCallback<TProvider>) {
  const client = getClient()
  const handleChange = async () => callback(getProvider<TProvider>(args))
  const unsubscribe = client.subscribe(({ provider }) => provider, handleChange)
  return unsubscribe
}
