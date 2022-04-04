import type { BaseProvider } from '@ethersproject/providers'

import { getClient } from '../../client'

export type GetProviderResult<TProvider extends BaseProvider = BaseProvider> =
  TProvider

export function getProvider<
  TProvider extends BaseProvider = BaseProvider,
>(): GetProviderResult<TProvider> {
  return getClient<TProvider>().provider
}
