import type { BaseProvider } from '@ethersproject/providers'

import { client } from '../../client'
import { GetProviderResult, getProvider } from './getProvider'

export type WatchProviderCallback<
  TProvider extends BaseProvider = BaseProvider,
> = (provider: GetProviderResult<TProvider>) => void

export function watchProvider<TProvider extends BaseProvider = BaseProvider>(
  callback: WatchProviderCallback<TProvider>,
) {
  const handleChange = async () => callback(await getProvider<TProvider>())
  const unsubscribe = client.subscribe(({ provider }) => provider, handleChange)
  return unsubscribe
}
