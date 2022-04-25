import type { BaseProvider } from '@ethersproject/providers'

import { getClient } from '../../client'
import { GetProviderArgs, GetProviderResult, getProvider } from './getProvider'

export type WatchProviderCallback<
  TProvider extends BaseProvider = BaseProvider,
> = (provider: GetProviderResult<TProvider>) => void

export function watchProvider<TProvider extends BaseProvider = BaseProvider>(
  args: GetProviderArgs,
  callback: WatchProviderCallback<TProvider>,
) {
  const client = getClient()
  const handleChange = async () => callback(getProvider<TProvider>(args))
  const unsubscribe = client.subscribe(({ provider }) => provider, handleChange)
  return unsubscribe
}
